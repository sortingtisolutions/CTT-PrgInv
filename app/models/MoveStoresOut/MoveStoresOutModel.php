<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class MoveStoresOutModel extends Model
{
    public function __construct()
    {
      parent::__construct();
    }

	// Listado de Tipos de movimiento   ***
	public function listExchange()
	{
		$qry = "SELECT ex1.ext_id, ex1.ext_code, ex1.ext_type, ex1.ext_description, ex1.ext_link,
					ex2.ext_id as ext_id_a, ex2.ext_code as ext_code_a, ex2.ext_type as ext_type_a, 
					ex2.ext_description as ext_description_a
				FROM ctt_type_exchange AS ex1
				LEFT JOIN ctt_type_exchange AS ex2 ON ex2.ext_link = ex1.ext_id 
				WHERE ex1.ext_type = 'S';";
		return $this->db->query($qry);
	}

// Listado de Almacecnes
    public function listStores()
    {
		$qry = "SELECT * FROM ctt_stores 
				WHERE str_name  NOT LIKE 'SUBARRENDO%'
				AND str_name NOT IN ('SERVICIOS','EXPENDABLES')";
		return $this->db->query($qry);
    }

// Listado de catalogos
	public function listCategories()
    {
		//$store = $this->db->real_escape_string($store);
        $qry = "SELECT * FROM ctt_categories WHERE cat_status = 1";
        return $this->db->query($qry);
    }

// Listado de Productos
	public function listProducts($param)
	{
		$strId = $this->db->real_escape_string($param['strId']);
		$word = $this->db->real_escape_string($param['word']);

		$qry ="SELECT sr.ser_id,sr.ser_sku,sr.ser_serial_number,sr.ser_cost,st.str_id,st.stp_quantity,
				sr.prd_id, pr.prd_name,pr.prd_coin_type
				FROM ctt_products AS pr
				INNER JOIN ctt_series AS sr ON sr.prd_id = pr.prd_id
				INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id
			WHERE sr.ser_status = 1 AND st.stp_quantity > 0
			AND st.str_id=$strId AND (upper(pr.prd_name) LIKE '%$word%' OR upper(pr.prd_sku) LIKE '%$word%') 
			ORDER BY pr.prd_sku;";

		/* $qry = "SELECT * FROM ctt_products AS pr
					INNER JOIN ctt_series AS sr ON sr.prd_id = pr.prd_id
					INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id
				WHERE sr.ser_status = 1 AND st.stp_quantity > 0
				AND st.str_id='$strId' 
				order by st.str_id;";  */

	/*	$qry = "SELECT sr.ser_id,sr.ser_sku,sr.ser_serial_number,sr.ser_cost,st.str_id,st.stp_quantity,
		pd.prd_name,pd.prd_coin_type 
		FROM ctt_products AS pd 
		INNER JOIN ctt_series AS sr ON sr.prd_id = pd.prd_id
		INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id
		INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
		INNER JOIN ctt_categories AS ct ON ct.cat_id = sb.cat_id
		WHERE sr.ser_status = 1 AND ct.cat_id = $catId;"; */

		return $this->db->query($qry);
	}	
// Listado de Movimientos
	public function listExchanges($guid)
	{
		$guid = $this->db->real_escape_string($guid);
		$qry = "SELECT * FROM ctt_stores_exchange WHERE exc_guid = '$guid' ORDER BY exc_date DESC;";
		return $this->db->query($qry);
	}

// Registra los movimientos entre almacenes
	public function NextExchange()
	{
		$qry = "INSERT INTO ctt_counter_exchange (con_status) VALUES ('1');	";
		$this->db->query($qry);
		return $this->db->insert_id;
	}

// Registra los movimientos entre almacenes
	public function SaveExchange($param, $user)
	{

		$employee_data = explode("|",$user);
		$exc_sku_product 	= $this->db->real_escape_string($param['sku']);
		$exc_product_name 	= $this->db->real_escape_string($param['pnm']);
		$exc_quantity 		= $this->db->real_escape_string($param['qty']);
		$exc_serie_product	= $this->db->real_escape_string($param['ser']);
		$exc_store			= $this->db->real_escape_string($param['str']);
		$exc_comments		= $this->db->real_escape_string($param['com']);
		$exc_proyect		= $this->db->real_escape_string($param['prj']);
		$exc_employee_name	= $this->db->real_escape_string($employee_data[2]);
		$ext_code			= $this->db->real_escape_string($param['cod']);
		$ext_id				= $this->db->real_escape_string($param['idx']);
		$folio				= $this->db->real_escape_string($param['fol']);

		$qry = "INSERT INTO ctt_stores_exchange (exc_sku_product, exc_product_name, exc_quantity, 
				exc_serie_product, exc_store, exc_comments, exc_proyect, exc_employee_name, 
				ext_code, ext_id, con_id)
				VALUES ('$exc_sku_product', '$exc_product_name', $exc_quantity, 
				'$exc_serie_product', '$exc_store', '$exc_comments', '$exc_proyect', 
				'$exc_employee_name', '$ext_code', $ext_id, $folio); ";
		$this->db->query($qry);

		return $folio;
	}

// Registra los movimientos entre almacenes origen
	public function UpdateStoresSource($param)
	{
		$idSer 			= $this->db->real_escape_string($param['serid']);
		$idStrSrc 		= $this->db->real_escape_string($param['strid']);
		$quantity 		= $this->db->real_escape_string($param['qty']);
		$prdid 		= $this->db->real_escape_string($param['prdid']);

		$qry = "SELECT fun_reststock($prdid) FROM DUAL; ";
		$resultfun = $this->db->query($qry);

		/* $qry1 = "UPDATE ctt_series SET ser_status=0 
				 WHERE ser_id=$idSer;";
        $resultup = $this->db->query($qry1);  */
				
		$qry2 = "UPDATE ctt_stores_products 
				SET stp_quantity = stp_quantity - $quantity 
				WHERE str_id = $idStrSrc and ser_id = $idSer;";

		return $this->db->query($qry2);
	}

// Busca si existe asignado un almacen con este producto
	public function SechingProducts($param)
	{
		$idSer = $this->db->real_escape_string($param['serid']);
		$storId = $this->db->real_escape_string($param['strid']);

		$qry = "SELECT count(*) as items 
				FROM ctt_stores_products 
				WHERE ser_id = $idSer AND str_id = $storId;";
		return $this->db->query($qry);
	}
	
// Actualizala cantidad de productos en un almacen destino
	public function UpdateProducts($param)
	{
		$idSer 			= $this->db->real_escape_string($param['serid']);
		$idStrSrc 		= $this->db->real_escape_string($param['strid']);
		$quantity 		= $this->db->real_escape_string($param['qty']);

		

		$qry = "UPDATE ctt_stores_products 
				SET stp_quantity = stp_quantity + {$quantity} 
				WHERE str_id = {$idStrSrc} and  ser_id = {$idSer};";
		return $this->db->query($qry);
	}

// Agrega el registro de relación almacen producto
	public function InsertProducts($param)
	{
		$idSer 			= $this->db->real_escape_string($param['serid']);
		$idStrSrc 		= $this->db->real_escape_string($param['strid']);
		$quantity 		= $this->db->real_escape_string($param['qty']);
		$prd_id		= $this->db->real_escape_string($param['prdid']);


		$qry = "INSERT INTO ctt_stores_products (stp_quantity, str_id, ser_id, prd_id ) 
				VALUES ($quantity, $idStrSrc, $idSer, $prd_id);";
		return $this->db->query($qry);
	}

}
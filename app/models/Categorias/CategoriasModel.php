<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class CategoriasModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveCategoria($params)
	{

		$cat_name = $this->db->real_escape_string($params['cat_name']);
		$str_id = $this->db->real_escape_string($params['str_id']);


			$qry = "INSERT INTO ctt_categories(cat_name, cat_status, str_id)
					VALUES (UPPER('$cat_name'),1,'$str_id')";
			$this->db->query($qry);	
			$cat_id = $this->db->insert_id;
			
			return $cat_id;
	}
// Optiene los Usuaios existentes
	public function GetCategorias()
	{
		$qry = "SELECT ct.*, st.str_name,'0' AS cantidad 
				FROM ctt_categories  	AS ct 
				INNER JOIN ctt_stores	AS st ON st.str_id = ct.str_id
				WHERE ct.cat_status = 1 and st.str_status=1 ORDER BY ct.cat_id;";

		return $this->db->query($qry);
		
	}

    public function GetCategoria($params)
	{
		$qry = "SELECT cat_id, cat_name, str_id FROM ctt_categories WHERE cat_id = ".
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
			"cat_name" =>$row[1],
			"str_id" =>$row[2]);
		}
		return $item;
	}


    public function UpdateCategoria($params)
	{
		$cat_name 	= $this->db->real_escape_string($params['cat_name']);
		$cat_id 	= $this->db->real_escape_string($params['cat_id']);
		$str_id 	= $this->db->real_escape_string($params['str_id']);

		$qry = "UPDATE ctt_categories
				SET cat_name = UPPER('$cat_name'),
					str_id = '$str_id'
				WHERE cat_id = $cat_id;";
		return 	$this->db->query($qry);	
	}

    //borra proveedor
	public function DeleteCategoria($params)
	{
        $cat_id 	= $this->db->real_escape_string($params['cat_id']);

		$qry = "UPDATE ctt_categories
                    SET cat_status = 0
                    WHERE cat_id = '$cat_id';";
		return $this->db->query($qry);
            
	}

	public function listSeries($params)
    {
        $prodId = $this->db->real_escape_string($params['catId']);
        $qry = "SELECT  se.ser_id, se.ser_sku, p.prd_name, se.ser_serial_number, 
			date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
			se.ser_cost, se.ser_situation, se.ser_stage, se.ser_status, se.ser_comments
			FROM  ctt_products AS p
			INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
			INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id  AND ct.cat_status = 1
			INNER JOIN ctt_series                AS se ON se.prd_id = p.prd_id
			WHERE ct.cat_id = ($prodId) AND p.prd_level IN ('P') 
			ORDER BY se.ser_sku;";
        return $this->db->query($qry);
    }
	public function countQuantity($params)
    {
        $catId = $this->db->real_escape_string($params['catId']);
        $qry = "SELECT '$catId' as cat_id, ifnull(sum(sp.stp_quantity),0) as cantidad 
		FROM  ctt_stores_products AS sp
		INNER JOIN ctt_series               AS sr ON sr.ser_id = sp.ser_id
		INNER JOIN ctt_products				AS p ON p.prd_id = sr.prd_id
		INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id
		INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id
		WHERE sr.ser_status = 1 AND p.prd_level IN ('P')
		and ct.cat_id= $catId;";
        return $this->db->query($qry);
    }

}
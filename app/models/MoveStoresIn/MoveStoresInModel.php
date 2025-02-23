<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class MoveStoresInModel extends Model
{
    public function __construct()
    {
      parent::__construct();
    }

// Listado de Tipos de movimiento  *****
    public function listExchange()
    {
        $qry = "SELECT ex1.ext_id, ex1.ext_code, ex1.ext_type, ex1.ext_description, ex1.ext_link,
                    ex2.ext_id as ext_id_a, ex2.ext_code as ext_code_a, ex2.ext_type as ext_type_a, ex2.ext_description as ext_description_a,
                    ex1.ext_elements
                FROM ctt_type_exchange AS ex1
                LEFT JOIN ctt_type_exchange AS ex2 ON ex2.ext_link = ex1.ext_id 
                WHERE ex1.ext_type = 'E';";
        return $this->db->query($qry);
    }

// Listado de Almacecnes
    public function listStores()
    {
        $qry = "SELECT * FROM ctt_stores WHERE str_status = 1";
        return $this->db->query($qry);
    }

// Listado de proveedores
    public function listSuppliers()
    {
        $qry = "SELECT * FROM ctt_suppliers WHERE sup_status = 1 AND sut_id NOT IN (3);";
        return $this->db->query($qry);
    }
   
// Listado de Facturas
    public function listInvoice($param)
    {
        $extId = $this->db->real_escape_string($param['extId']);

        $dotId='0';
        if($extId==9 or $extId==11) { $dotId='1';}
        elseif($extId==10) { $dotId='4'; }

        $qry = "SELECT doc_id, doc_name FROM ctt_documents WHERE dot_id IN ($dotId)";
        return $this->db->query($qry);
    }
       
// Listado de Monedas
    public function listCoins()
    {
        $qry = "SELECT cin_id, cin_code, cin_name FROM ctt_coins WHERE cin_status = 1;";
        return $this->db->query($qry);
    }
      
// Listado de categorias
    public function listCategories()
    {
        $qry = "SELECT * FROM ctt_categories WHERE cat_status  = 1;";
        return $this->db->query($qry);
    }

// Listado de Productos
    public function listProducts($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        
        $qry = "SELECT pd.prd_id, pd.prd_sku, pd.prd_name, (
                    SELECT ifnull(max(convert(substring(ser_sku,8,3), signed integer)),0) + 1 
                    FROM ctt_series WHERE prd_id = pd.prd_id) as serNext, 
                    sb.sbc_name, ct.cat_name
                FROM ctt_products AS pd 
                INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
                INNER JOIN ctt_categories AS ct ON ct.cat_id = sb.cat_id
                WHERE pd.prd_status = '1' AND pd.prd_level IN ('P', 'A') AND ct.cat_id = $catId;";
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
        $con_id			    = $this->db->real_escape_string($param['fol']);
        $exc_sku_product 	= $this->db->real_escape_string($param['sku']);
        $exc_product_name 	= $this->db->real_escape_string($param['pnm']);
        $exc_quantity 		= $this->db->real_escape_string($param['qty']);
        $exc_serie_product	= $this->db->real_escape_string($param['ser']);
        $exc_store			= $this->db->real_escape_string($param['str']);
        $exc_comments		= $this->db->real_escape_string($param['com']);
        $ext_code			= $this->db->real_escape_string($param['cod']);
        $ext_id				= $this->db->real_escape_string($param['idx']);
        $cin_id				= $this->db->real_escape_string($param['cin']);
        $prd_id 			= $this->db->real_escape_string($param['prd']);
		$str_id 	    	= $this->db->real_escape_string($param['sti']);
        $ser_cost           = $this->db->real_escape_string($param['cos']);
        $sup_id             = $this->db->real_escape_string($param['sup']);
        $doc_id             = $this->db->real_escape_string($param['doc']);
        $pet_id             = $this->db->real_escape_string($param['pet']);
        $cpe_id             = $this->db->real_escape_string($param['cpe']);
        $bra_id             = $this->db->real_escape_string($param['bra']);
        $ctotal            = $this->db->real_escape_string($param['cto']);
        $necono             = $this->db->real_escape_string($param['nec']);

        $exc_employee_name	= $this->db->real_escape_string($employee_data[2]);
        $ser_status         = '1';
        $ser_situation      = 'D';
        $ser_stage          = 'D';
        // $ser_lonely         = '1';
        $ser_behaviour      = 'C';

		$qry1 = "INSERT INTO ctt_series (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, 
                    ser_behaviour, prd_id, sup_id, cin_id,ser_brand,ser_cost_import,ser_import_petition,
                    ser_sum_ctot_cimp,ser_no_econo,str_id,ser_comments) 
                VALUES ('$exc_sku_product', '$exc_serie_product', '$ser_cost', '$ser_status', '$ser_situation', 
                '$ser_stage', '$ser_behaviour', '$prd_id', '$sup_id', '$cin_id', '$bra_id', '$cpe_id', '$pet_id',
                '$ctotal', '$necono','$str_id','$exc_comments');";

        $this->db->query($qry1);
        $serId = $this->db->insert_id;

        $qry2 = "INSERT INTO ctt_stores_exchange (exc_sku_product, exc_product_name, 
                            exc_quantity, exc_serie_product, exc_store, exc_comments,  
                            exc_employee_name, ext_code, ext_id, cin_id, con_id) 
                VALUES ('$exc_sku_product', '$exc_product_name', $exc_quantity, '$exc_serie_product', 
                        '$exc_store', '$exc_comments', '$exc_employee_name', '$ext_code', $ext_id, 
                        $cin_id, $con_id );";
        $this->db->query($qry2);

		$qry3 = "INSERT INTO ctt_stores_products (stp_quantity, str_id, ser_id, prd_id) 
                 VALUES ($exc_quantity, $str_id, $serId, $prd_id);";
        $this->db->query($qry3);

		$qry4 = "INSERT INTO ctt_products_documents (prd_id, doc_id, dcp_source) 
                VALUES ($serId, $doc_id, 'S');";
        $this->db->query($qry4);

        $qry5 = "SELECT fun_addstock($prd_id) FROM DUAL;";
        $resultfun = $this->db->query($qry5);

        return $con_id ;
    }

}
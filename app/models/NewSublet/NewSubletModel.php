<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class NewSubletModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Tipos de movimiento  *****
    public function listExchange()
    {
        $qry = "SELECT pj.pjt_id, pj.pjt_number, pj.pjt_name  
            FROM ctt_projects AS pj
            WHERE pj.pjt_status in ('2','4','7','8')
            ORDER BY pj.pjt_id DESC;";

        return $this->db->query($qry);
    }

// Listado de Almacecnes
    public function listStores()
    {
        $qry = "SELECT * FROM ctt_stores 
                WHERE str_status = 1 and str_name LIKE 'SUBARRENDO%' ";
        return $this->db->query($qry);
    }

// Listado de proveedores
    public function listSuppliers()
    {
        $qry = "  SELECT * FROM ctt_suppliers WHERE sup_status = 1 AND sut_id NOT IN (3);";
        return $this->db->query($qry);
    }
   
// Listado de Facturas
    public function listInvoice($param)
    {
        $extId = $this->db->real_escape_string($param['extId']);
        $dotId='0';
        if($extId==9)
        {
            $dotId='1';
        } elseif($extId==10)
        {
            $dotId='4'; 
        }

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
        $qry = "SELECT * FROM ctt_categories 
                WHERE cat_status  = 1 AND cat_name NOT LIKE 'PAQUETE%';";
        return $this->db->query($qry);
    }

    public function listSubCategories($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        $qry = "SELECT * FROM ctt_subcategories 
                WHERE sbc_status = 1 AND cat_id=$catId;";
        return $this->db->query($qry);
    }


// Listado de Productos
    public function listProducts($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        
        $qry = "SELECT pd.prd_id, pd.prd_sku, pd.prd_name, (
                    SELECT ifnull(max(convert(substring( ser_sku,8,4), signed integer)),0) + 1 
                    FROM ctt_series WHERE prd_id = pd.prd_id AND ser_behaviour = 'C'
                ) as serNext, sb.sbc_name, ct.cat_name
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
    public function SaveSubletting($param, $user)
    {
        //$employee_data = explode("|",$user);
        $con_id	    = $this->db->real_escape_string($param['fol']);
        $prod_sku	= $this->db->real_escape_string($param['sku']);
        $prod_name 	= $this->db->real_escape_string($param['pnm']);
        $price		= $this->db->real_escape_string($param['prc']);
        $skuserie	= $this->db->real_escape_string($param['sks']);
        $seriename	= $this->db->real_escape_string($param['srnm']);
        $coin	= $this->db->real_escape_string($param['coi']);
        //$quantity	= $this->db->real_escape_string($param['qty']);
        $brand		= $this->db->real_escape_string($param['brd']);
        $strtdate	= $this->db->real_escape_string($param['sdt']);
        $enddate	= $this->db->real_escape_string($param['edt']);
        $store		= $this->db->real_escape_string($param['str']);
		$category	= $this->db->real_escape_string($param['ctg']);
        $subcategory= $this->db->real_escape_string($param['sbctg']);
        $id_sup   = $this->db->real_escape_string($param['idsup']);
        $proyect    = $this->db->real_escape_string($param['pry']);
        $comments    = $this->db->real_escape_string($param['com']);
        $supplier  = $this->db->real_escape_string($param['sup']);

        //$exc_employee_name	= $this->db->real_escape_string($employee_data[2]);
        $ser_status         = '1';
        $ser_situation      = 'D';
        $ser_stage          = 'D';
        // $ser_lonely         = '1';
        $ser_behaviour      = 'R';
        //return "hecho";

        $qry = "INSERT INTO ctt_products_paso (
            prd_sku, prd_name, prd_english_name, prd_code_provider, prd_name_provider, 
            prd_model, prd_price, prd_visibility, prd_comments, prd_level, prd_lonely, 
            prd_insured, sbc_id, srv_id, cin_id, prd_status) 
        VALUES ('$prod_sku', UPPER('$prod_name'), '', '', UPPER('$supplier'), 
            '', '$price', '', UPPER('$comments'), '', '', '', '$subcategory', 
            '', '$coin', '1' );";
        $this->db->query($qry);
        $prdId = $this->db->insert_id;
        
        // SERIE
		$qry1 = "INSERT INTO ctt_series_paso (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, 
                    ser_stage, ser_behaviour, prd_id, sup_id, cin_id,ser_brand,ser_cost_import,
                    ser_import_petition, ser_sum_ctot_cimp, ser_no_econo, str_id, ser_comments) 
                VALUES ('$skuserie', '$prod_sku', '$price', '$ser_status', '$ser_situation', 
                '$ser_stage', '$ser_behaviour', '$prdId', '$id_sup', '$coin', '$brand', '', '',
                '', '','$store','$comments');";

        $this->db->query($qry1);
        $serId = $this->db->insert_id;

        // SUBLETTING
        $qry2 = "INSERT INTO ctt_subletting (sub_id, sub_price, sub_quantity, sub_date_start, sub_date_end, sub_comments, 
                    ser_id, sup_id, prj_id, cin_id,prd_id) 
                VALUES (null, '$price', '1', '$strtdate', '$enddate', 
                '$comments', '$serId', '$id_sup', '$proyect','$coin','$prdId');";
        $this->db->query($qry2);

        return $con_id;
    }

}
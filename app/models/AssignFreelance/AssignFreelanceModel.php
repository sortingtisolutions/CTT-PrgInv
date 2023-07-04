<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AssignFreelanceModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Tipos de movimiento  *****
    public function listProyects()
    {
        $qry = "SELECT pj.pjt_id, pj.pjt_number, pj.pjt_name,  DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project, 
                DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
                pj.pjt_location, pj.pjt_status, pj.cuo_id, pj.loc_id, co.cus_id, co.cus_parent, lo.loc_type_location,
                pt.pjttp_name
            FROM ctt_projects AS pj
            INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
            INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
            LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
            ORDER BY pj.pjt_id DESC;";

        return $this->db->query($qry);
    }

// Listado de Almacecnes
/*
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
    }*/
      
// Listado de Areas
    public function listAreas()
    {
        $qry = "SELECT DISTINCT free.free_area_id, are.are_name FROM ctt_freelances AS free INNER JOIN ctt_areas AS are ON are.are_id=free.free_area_id";
        return $this->db->query($qry);
    }

    public function listFreelances($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        $qry = "SELECT free.free_id, free.free_cve, free.free_name, free.free_area_id, free.free_rfc, free.free_address, free.free_phone, free.free_email, free.free_unit, free.free_plates, free.free_license, free.free_fed_perm, free.free_clase, free.`free_año` FROM ctt_freelances AS free LEFT JOIN ctt_assign_proyect AS ass ON ass.free_id=free.free_id WHERE ass.ass_status IS NULL AND free.free_area_id=  $catId;";
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
    public function SaveFreelanceProy($param, $user)
    {
        //$employee_data = explode("|",$user);
        $pry_id	= $this->db->real_escape_string($param['pry']);
        $free_id 	= $this->db->real_escape_string($param['free']);
        $area_id		= $this->db->real_escape_string($param['area']);
        $sdate	= $this->db->real_escape_string($param['sdate']);
        $edate	= $this->db->real_escape_string($param['edate']);
        $com	= $this->db->real_escape_string($param['com']);


        $qry = "INSERT INTO ctt_assign_proyect (
            pjt_id, free_id, ass_date_start, ass_date_end, ass_coments, 
            ass_status) 
        VALUES (
            '$pry_id', '$free_id ', ' $sdate', '$edate', '$com','1'
        );";
        $this->db->query($qry);
        $ass_Id = $this->db->insert_id;
        //PRODUCT
        /*
        $query = "SELECT COUNT(*) FROM ctt_products WHERE prd_sku = '$prod_sku'";
        $res = $this->db->query($query);
        if ($res->num_rows > 0) {
            $query = "SELECT prd_id FROM ctt_products WHERE prd_sku = '$prod_sku'";
            $res = $this->db->query($query);
            $resp = $res->fetch_assoc();
            $prdId = $resp['prd_id'];
        }else{
            $qry = "INSERT INTO ctt_products_paso (
                prd_sku, prd_name, prd_english_name, prd_code_provider, prd_name_provider, 
                prd_model, prd_price, prd_visibility, prd_comments, prd_level, prd_lonely, 
                prd_insured, sbc_id, srv_id, cin_id, prd_status) 
            VALUES (
                '$prod_sku', UPPER('$prod_name'), '', '', UPPER('$supplier'), 
                '', '$price', '', UPPER('$comments'), '', 
                '', '', '$subcategory', '', '$coin', '1'
            );";
            $this->db->query($qry);
            $prdId = $this->db->insert_id;

        }*/
        /*
        $qry = "INSERT INTO ctt_products_paso (
            prd_sku, prd_name, prd_english_name, prd_code_provider, prd_name_provider, 
            prd_model, prd_price, prd_visibility, prd_comments, prd_level, prd_lonely, 
            prd_insured, sbc_id, srv_id, cin_id, prd_status) 
        VALUES (
            '$prod_sku', UPPER('$prod_name'), '', '', UPPER('$supplier'), 
            '', '$price', '', UPPER('$comments'), '', 
            '', '', '$subcategory', '', '$coin', '1'
        );";
        $this->db->query($qry);
        $prdId = $this->db->insert_id;
        
        // SERIE
		$qry1 = "INSERT INTO ctt_series_paso (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, 
                    ser_behaviour, prd_id, sup_id, cin_id,ser_brand,ser_cost_import,ser_import_petition,
                    ser_sum_ctot_cimp,ser_no_econo,str_id,ser_comments) 
                VALUES ('$skuserie', '$prod_sku', '$price', '$ser_status', '$ser_situation', 
                '$ser_stage', '$ser_behaviour', '$prdId', '$id_sup', '$coin', '$brand', '', '',
                '', '','','$comments');";

        $this->db->query($qry1);
        $serId = $this->db->insert_id;

        // SUBLETTING
        $qry2 = "INSERT INTO ctt_subletting_paso (sub_id, sub_price, sub_quantity, sub_date_start, sub_date_end, sub_comments, 
                    ser_id, sup_id, prj_id, cin_id,prd_id) 
                VALUES (null, '$price', '1', '$strtdate', '$enddate', 
                '$comments', '$serId', '$id_sup', '$proyect','$coin','$prdId');";
        $this->db->query($qry2);*/

        return $ass_Id;
    }

}
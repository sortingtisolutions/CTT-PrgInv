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
                WHERE cat_status  = 1 AND cat_name NOT LIKE 'PAQUETE%' AND cat_id=30;";
        return $this->db->query($qry);
    }

    public function listProducts2()
    {
        $qry = "SELECT * FROM ctt_products AS prd WHERE prd.prd_visibility=1 AND prd.prd_level='S';";
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
        $sku	    = $this->db->real_escape_string($param['sku']);
        $prc	= $this->db->real_escape_string($param['prc']);
        $sprc 	= $this->db->real_escape_string($param['sprc']);
        $sbclt		= $this->db->real_escape_string($param['sbclt']);
        $sbdt	= $this->db->real_escape_string($param['sbdt']);

        $sbl	= $this->db->real_escape_string($param['sbl']);
        $nmprv	= $this->db->real_escape_string($param['nmprv']);
        //$quantity	= $this->db->real_escape_string($param['qty']);
        $nmprvc		= $this->db->real_escape_string($param['nmprvc']);
        $sdt	= $this->db->real_escape_string($param['sdt']);
        $edt	= $this->db->real_escape_string($param['edt']);
        
        $str		= $this->db->real_escape_string($param['str']);
		$ctg	= $this->db->real_escape_string($param['ctg']);
        $sbctg= $this->db->real_escape_string($param['sbctg']);
        $idsup   = $this->db->real_escape_string($param['idsup']);
        $com    = $this->db->real_escape_string($param['com']);

        $sup    = $this->db->real_escape_string($param['sup']);
        $pnm  = $this->db->real_escape_string($param['pnm']);
        $srsk    = $this->db->real_escape_string($param['srsk']);
        $prd  = $this->db->real_escape_string($param['prd']);
        

        //$exc_employee_name	= $this->db->real_escape_string($employee_data[2]);
        $ser_status         = '1';
        $ser_situation      = 'D';
        $ser_stage          = 'D';
        // $ser_lonely         = '1';
        $ser_behaviour      = 'C';
        //return "hecho";


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
        $qry = "INSERT INTO ctt_products_paso (
            prd_sku, prd_name, prd_english_name, prd_code_provider, prd_name_provider, 
            prd_model, prd_price, prd_visibility, prd_comments, prd_level, prd_lonely, 
            prd_insured, sbc_id, srv_id, cin_id, prd_status) 
        VALUES (
            '$sku', UPPER('$pnm'), '', '', UPPER('$sup'), 
            '', '$prc', '', UPPER('$com'), '', 
            '', '', '$sbctg', '', '1', '1'
        );";
        $this->db->query($qry);
        $prdId = $this->db->insert_id;
        
        // SERIE
		$qry1 = "INSERT INTO ctt_series_paso (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, 
                    ser_behaviour, prd_id, sup_id, cin_id,ser_brand,ser_cost_import,ser_import_petition,
                    ser_sum_ctot_cimp,ser_no_econo,str_id,ser_comments) 
                VALUES ('$srsk', '$sku', '$prc', '$ser_status', '$ser_situation', 
                '$ser_stage', '$ser_behaviour', '$prdId', '$idsup', '1', '', '', '',
                '', '','','$com');";

        $this->db->query($qry1);
        $serId = $this->db->insert_id;

        // SUBLETTING
        $qry2 = "INSERT INTO ctt_subletting_paso (sub_id, sub_price, sub_quantity, sub_date_start, sub_date_end, sub_comments, 
                    ser_id, sup_id, prj_id, cin_id,prd_id) 
                VALUES (null, '$sprc', '1', '$sdt', '$edt', 
                '$com', '$serId', '$idsup', '0','1','$prdId');";
        $this->db->query($qry2);

        return $prdId;
    }

}
<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsPriceListModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

// Listado de categorias   ****
public function listCategories()
{
    $qry = "SELECT cat_id, cat_name FROM ctt_categories WHERE cat_status = 1;";
    return $this->db->query($qry);
}

// Listado de Productos
public function listProducts($params)
    {
        $catId = $this->db->real_escape_string($params['catId']);
        $grp = $this->db->real_escape_string($params['grp']);
        $num = $this->db->real_escape_string($params['num']);

        $qry = "SELECT 
                    p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name,  
                    p.prd_stock - p.prd_reserved as prd_stock,  p.prd_reserved,
                    p.prd_price, cn.cin_code AS prd_coin_type,  p.prd_english_name, p.prd_level, 
                    IFNULL(dc.doc_id, 0) AS doc_id, ct.cat_id
                FROM  ctt_products AS p
                INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id 	AND sc.sbc_status = 1
                INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id 	AND ct.cat_status = 1
                INNER JOIN ctt_services             AS sv ON sv.srv_id = p.srv_id 	AND sv.srv_status = 1
                LEFT JOIN ctt_series                AS sr ON sr.prd_id = p.prd_id   AND sr.ser_situation='D'
                LEFT JOIN ctt_coins                 AS cn ON cn.cin_id = p.cin_id
                LEFT JOIN ctt_products_documents    AS dc ON dc.prd_id = p.prd_id   AND dc.dcp_source = 'P'
                WHERE prd_status = 1 AND p.prd_visibility = 1 
                GROUP BY 
                    p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                    p.prd_price, p.prd_coin_type, p.prd_english_name 
                ORDER BY p.prd_sku;";

        return $this->db->query($qry);
    }


// Listado de Documentos
    public function listDocuments($params)
    {
        $qry = "SELECT dp.*, dc.doc_name 
                FROM ctt_products_documents AS dp
                INNER JOIN ctt_documents AS dc ON dc.doc_id = dp.doc_id
                WHERE dc.dot_id=2;";
        return $this->db->query($qry);
    }

// Listado de seriales
    public function listSeries($params)
    {
        $prodId = $this->db->real_escape_string($params['prdId']);
        $qry = "SELECT 
                      se.ser_id
                    , se.ser_sku
                    , se.ser_serial_number
                    , se.ser_cost
                    , date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry
                    , se.ser_situation
                    , se.ser_stage
                    , CASE WHEN se.ser_behaviour = 'R' THEN 'SUBABRRENDADO' ELSE '' END comportamiento
                    , '' AS comments
                    , pd.prd_sku 
                    , pd.prd_name
                    , sp.stp_quantity
                    , st.str_name
                FROM ctt_series as se
                INNER JOIN ctt_products AS pd ON pd.prd_id = se.prd_id 
                LEFT JOIN ctt_stores_products AS sp ON sp.ser_id = se.ser_id
                LEFT JOIN ctt_stores As st ON st.str_id = sp.str_id 
                WHERE se.prd_id IN ($prodId) AND se.ser_situation='D' AND sp.stp_quantity > 0
                ORDER BY se.prd_id, se.ser_sku;";
        return $this->db->query($qry);
    }


// Lista productos del paquete
    public function listProductPackages($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $prdName = $this->db->real_escape_string($params['prdName']);

        $qry = "SELECT p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                    '$prdName' as paquete,
                    IFNULL((
                        SELECT sum(sp.stp_quantity) FROM ctt_series AS sr
                        INNER JOIN ctt_stores_products AS sp ON sp.ser_id = sr.ser_id AND sr.ser_situation='D'
                        WHERE sr.prd_id= p.prd_id
                    ),0) AS quantity, 
                    p.prd_price, cn.cin_code AS prd_coin_type,  p.prd_english_name, p.prd_level
                FROM  ctt_products AS p
                INNER JOIN ctt_products_packages    AS pk ON pk.prd_id = p.prd_id
                INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
                INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id  AND ct.cat_status = 1
                INNER JOIN ctt_services             AS sv ON sv.srv_id = p.srv_id   AND sv.srv_status = 1
                LEFT  JOIN ctt_coins                AS cn ON cn.cin_id = p.cin_id
                WHERE prd_status = 1 AND p.prd_visibility = 1 AND pk.prd_parent = trim($prdId)
                GROUP BY p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                        p.prd_price, p.prd_coin_type, p.prd_english_name 
                ORDER BY p.prd_sku;";
        return $this->db->query($qry);
    }

// Lista de productos reservados por projecto
    public function listProductsReserve($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);   
        $prdLv = $this->db->real_escape_string($params['prdLv']);
        $prdNm = $this->db->real_escape_string($params['prdNm']);


        if ($prdLv == 'K'){
            $qry = "SELECT '$prdNm' as name, sr.ser_sku, sr.ser_serial_number, sr.ser_situation, pj.pjt_name, 
                        date_format( pj.pjt_date_start, '%Y-%m-%d') AS pjt_date_start, 
                        date_format( pj.pjt_date_end, '%Y-%m-%d') AS pjt_date_end
                    FROM ctt_products_packages as pk 
                    INNER JOIN ctt_products AS pd ON pd.prd_id = pk.prd_id
                    INNER JOIN ctt_series AS sr ON sr.prd_id = pk.prd_id
                    LEFT JOIN ctt_projects_detail AS dt ON dt.pjtdt_id = sr.pjtdt_id
                    LEFT JOIN ctt_projects_content AS ct ON ct.pjtcn_id = dt.pjtvr_id
                    LEFT JOIN ctt_projects AS pj ON pj.pjt_id = ct.pjt_id
                    WHERE pk.prd_parent = $prdId  ORDER BY pd.prd_name,  pj.pjt_name DESC;
                    ";
        } else {
            $qry = "SELECT '$prdNm' as name, sr.ser_sku, sr.ser_serial_number, sr.ser_situation, pj.pjt_name, 
                        date_format( pj.pjt_date_start, '%Y-%m-%d') as pjt_date_start, 
                        date_format( pj.pjt_date_end, '%Y-%m-%d') as pjt_date_end
                    FROM ctt_products as pd 
                    INNER JOIN ctt_series AS sr ON sr.prd_id = pd.prd_id
                    LEFT JOIN ctt_projects_detail AS dt ON dt.pjtdt_id = sr.pjtdt_id
                    LEFT JOIN ctt_projects_content AS ct ON ct.pjtvr_id = dt.pjtvr_id
                    LEFT JOIN ctt_projects AS pj ON pj.pjt_id = ct.pjt_id
                    WHERE pd.prd_id = $prdId AND sr.ser_situation<>'D' ORDER BY pd.prd_name,  pj.pjt_name DESC;
                ";
        }
        return $this->db->query($qry);

    }


}

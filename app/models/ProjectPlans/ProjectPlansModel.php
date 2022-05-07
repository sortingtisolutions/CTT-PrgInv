<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectPlansModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    
// Listado de proyectos
    public function listProjects($params)
    {
        // Debe leer todos los proyectos que se encuentren en estaus 2 - Presupuesto
        $pjId = $this->db->real_escape_string($params['pjId']);

        $qry = "SELECT 
                    pj.pjt_id  
                    , pj.pjt_number 
                    , pj.pjt_name  
                    , DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project 
                    , DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start 
                    , DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end
                    , pj.pjt_location 
                    , pj.pjt_status 
                    , pj.cuo_id 
                    , pj.loc_id 
                    , co.cus_id 
                    , co.cus_parent 
                    , lo.loc_type_location 
                    , pt.pjttp_name 
                    , pt.pjttp_id
                    , '$pjId' as pjId
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_status = '2' ORDER BY pj.pjt_id DESC;
                ";
        return $this->db->query($qry);
    }    
        
// Listado de versiones
    public function listVersion($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry = "SELECT * FROM ctt_version WHERE pjt_id = $pjtId AND ver_status = 'R' ORDER BY ver_date DESC;";
        return $this->db->query($qry);
    }    

// Listado de contenido de projecto
    public function listBudgets($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry1 = "DELETE FROM ctt_projects_mice WHERE pjt_id = $pjtId;";
        $this->db->query($qry1);

        $qry2 = "INSERT INTO ctt_projects_mice 
                 SELECT pjtcn_id , 'N' as pjtcn_action, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_prod_price, pjtcn_quantity
                    , pjtcn_quantity as pjtcn_quantity_ant, pjtcn_days_base, pjtcn_days_cost
                    , pjtcn_discount_base, pjtcn_days_trip, pjtcn_discount_trip, pjtcn_days_test
                    , pjtcn_discount_test, pjtcn_insured, pjtcn_prod_level, pjtcn_section, pjtcn_status, ver_id, prd_id, pjt_id
                 FROM ctt_projects_content WHERE pjt_id = $pjtId;";
        $this->db->query($qry2);


        $qry3 = "SELECT pc.*, pj.pjt_id, sb.sbc_name,
                    date_format(pj.pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                    date_format(pj.pjt_date_end, '%Y%m%d') AS pjt_date_end, pd.srv_id,
                    CASE 
                        WHEN pjtcn_prod_level ='K' THEN 
                            (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = pc.prd_id)
                        WHEN pjtcn_prod_level ='P' THEN 
                            (SELECT prd_stock FROM ctt_products WHERE prd_id = pc.prd_id)
                        ELSE 
                            (SELECT prd_stock FROM ctt_products WHERE prd_id = pc.prd_id)
                        END AS bdg_stock
                FROM ctt_projects_content AS pc
                INNER JOIN ctt_projects AS pj ON pj.pjt_id = pc.pjt_id
                INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
                LEFT JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
                WHERE pc.pjt_id = $pjtId ORDER BY pc.pjtcn_id ASC;";
        return $this->db->query($qry3);

    } 

    
// Listado de clientes
    public function listCustomers($params)
    {
        $prd = $this->db->real_escape_string($params['prm']);

        $qry = "SELECT cs.*, ct.cut_name FROM ctt_customers AS cs
                INNER JOIN ctt_customers_type AS ct ON ct.cut_id = cs.cut_id
                WHERE cs.cus_status = 1 ORDER BY cs.cus_name;";
        return $this->db->query($qry);
    }    

// Listado de relaciones de clientes
    public function listCustomersOwn($params)
    {
        $qry = "SELECT * FROM ctt_customers_owner";
        return $this->db->query($qry);
    }    

// Listado de descuentos
    public function listDiscounts($params)
    {
        $level = $this->db->real_escape_string($params['level']);
        $qry = "SELECT * FROM ctt_discounts WHERE dis_level = $level ORDER BY dis_discount;";
        return $this->db->query($qry);
    }    

        
// Listado de tipos de proyectos
    public function listProjectsType($params)
    {

        $qry = "SELECT * FROM ctt_projects_type ORDER BY pjttp_name;";
        return $this->db->query($qry);
    }    



// Listado de productos
    public function listProducts($params)
    {

        $word = $this->db->real_escape_string($params['word']);
        $dstr = $this->db->real_escape_string($params['dstr']);
        $dend = $this->db->real_escape_string($params['dend']);

        $qry = "SELECT pd.prd_id, pd.prd_sku, pd.prd_name, pd.prd_price, pd.prd_level, pd.prd_insured, 
                        sb.sbc_name,
                CASE 
                    WHEN prd_level ='K' THEN 
                        (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = pd.prd_id)
                    WHEN prd_level ='P' THEN 
                        (SELECT prd_stock FROM ctt_products WHERE prd_id = pd.prd_id)
                    ELSE 
                        (SELECT prd_stock FROM ctt_products WHERE prd_id = pd.prd_id)
                    END AS stock
            FROM ctt_products AS pd
            INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
            WHERE pd.prd_status = 1 AND pd.prd_visibility = 1 
                AND upper(pd.prd_name) LIKE '%$word%' OR upper(pd.prd_sku) LIKE '%$word%'
            ORDER BY pd.prd_name ;";
        return $this->db->query($qry);
    } 

    
// Listado los comentarios del proyecto
    public function listComments($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjId']);


        $qry = "SELECT com_id, com_date,com_user, com_comment 
                FROM ctt_comments 
                WHERE com_source_section = 'projects' 
                AND com_action_id = $pjtId
                ORDER BY com_date ASC;";
        return $this->db->query($qry);
    }    



    
// Lista los relacionados al producto
    public function listProductsRelated($params)
    {

        $type = $this->db->real_escape_string($params['type']);
        $prdId = $this->db->real_escape_string($params['prdId']);


        if ($type == 'K'){
            $qry = "SELECT pr.*, sc.sbc_name, ct.cat_name 
                    FROM ctt_products AS pr
                    INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                    INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                    WHERE prd_id = $prdId AND pr.prd_status = 1 AND sc.sbc_status = 1 AND ct.cat_status = 1
                        UNION
                    SELECT pr.*, sc.sbc_name, ct.cat_name 
                    FROM ctt_products_packages AS pk
                    INNER JOIN ctt_products AS pr ON pr.prd_id = pk.prd_id
                    INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                    INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                    WHERE pk.prd_parent = $prdId AND pr.prd_status = 1 AND sc.sbc_status = 1 AND ct.cat_status = 1;";
            return $this->db->query($qry);

        } else if($type == 'P') {
            $qry = "SELECT pr.*, sc.sbc_name, ct.cat_name 
                    FROM ctt_products AS pr
                    INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                    INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                    WHERE prd_id = $prdId AND pr.prd_status = 1 AND sc.sbc_status = 1 AND ct.cat_status = 1
                        UNION
                    SELECT pr.*, sc.sbc_name, ct.cat_name 
                    FROM ctt_accesories AS ac
                    INNER JOIN ctt_products AS pr ON pr.prd_id = ac.prd_id
                    INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                    INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                    WHERE ac.acr_parent = $prdId AND pr.prd_status = 1 AND sc.sbc_status = 1 AND ct.cat_status = 1;";
            return $this->db->query($qry);

        } else {
            $qry = "SELECT * FROM ctt_products WHERE prd_id = $prdId";
            return $this->db->query($qry);

        }
    }

// Listado de stock del productos
public function stockProdcuts($params)
{

    $prdId = $this->db->real_escape_string($params['prdId']);

    $qry = "SELECT
                pr.prd_name, ifnull(pj.pjt_name,'') as pjt_name, sr.ser_sku, sr.ser_serial_number, 
                sr.ser_situation, ifnull(pe.pjtpd_day_start,'') as pjtpd_day_start, 
                ifnull(pe.pjtpd_day_end,'') as pjtpd_day_end, pr.prd_id 
            FROM ctt_series                 AS sr
            INNER JOIN ctt_products         AS pr ON pr.prd_id = sr.prd_id
            LEFT JOIN ctt_projects_detail   AS pd ON pd.pjtdt_id = sr.pjtdt_id
            LEFT JOIN ctt_projects_content  AS pc ON pc.pjtcn_id = pd.pjtcn_id
            LEFT JOIN ctt_projects          AS pj ON pj.pjt_id = pc.pjt_id
            LEFT JOIN ctt_projects_periods  AS pe ON pe.pjtdt_id = sr.pjtdt_id
            WHERE sr.prd_id = $prdId;";
    return $this->db->query($qry);
} 


/** ====== Actualiza cifras e la tabla temporal ==============================================  */
    public function updateMice($params)
    {
        $pjtId      = $this->db->real_escape_string($params['pjtId']);
        $prdId      = $this->db->real_escape_string($params['prdId']);
        $field      = $this->db->real_escape_string($params['field']);
        $value      = $this->db->real_escape_string($params['value']);
        $section    = $this->db->real_escape_string($params['section']);
        $action     = $this->db->real_escape_string($params['action']);

        $qry1 = "UPDATE ctt_projects_mice 
                SET $field = $value,  pjtvr_action = '$action'
                WHERE pjt_id = $pjtId AND prd_id = $prdId AND pjtvr_section = $section AND (pjtvr_action = 'N' OR pjtvr_action = 'U');";
        $this->db->query($qry1);

        $qry2 = "UPDATE ctt_projects_mice 
                SET $field = $value
                WHERE pjt_id = $pjtId AND prd_id = $prdId AND pjtvr_section = $section AND pjtvr_action = 'A';";
        return $this->db->query($qry2);

    }

    
// Agrega Comentario
    public function InsertComment($params, $userParam)
    {

        $group = explode('|',$userParam);

        $user   = $group[2];
        $pjtId  = $this->db->real_escape_string($params['pjtId']);
        $comSrc = $this->db->real_escape_string($params['comSrc']);
        $comComment  = $this->db->real_escape_string($params['comComment']);

        $qry1 = "INSERT INTO ctt_comments (
                        com_source_section, 
                        com_action_id, 
                        com_user, 
                        com_comment, 
                        com_status
                ) VALUES (
                        '$comSrc', 
                        $pjtId, 
                        '$user',
                        '$comComment',
                        1
                );";
        $this->db->query($qry1);
        $comId = $this->db->insert_id;

        $qry2 = "   SELECT com_id, com_date, com_user, com_comment 
                    FROM ctt_comments 
                    WHERE com_id = $comId;";
        return $this->db->query($qry2);


    }


/** ====== Actualiza los datos del proyecto ==================================================  */
    public function UpdateProject($params)
    {
        $cuo_id         = $this->db->real_escape_string($params['cuoId']);
        $cus_id         = $this->db->real_escape_string($params['cusId']); 
        $cus_Parent     = $this->db->real_escape_string($params['cusParent']);

        $qry01 = "  UPDATE      ctt_customers_owner 
                        SET     cus_id      = '$cus_id', 
                                cus_parent  = '$cus_Parent'
                        WHERE   cuo_id      = '$cuo_id';";

        $this->db->query($qry01);

        $pjt_id                 = $this->db->real_escape_string($params['projId']); 
        $pjt_name               = $this->db->real_escape_string($params['pjtName']); 
        $pjt_date_start         = $this->db->real_escape_string($params['pjtDateStart']);
        $pjt_date_end           = $this->db->real_escape_string($params['pjtDateEnd']); 
        $pjt_location           = $this->db->real_escape_string($params['pjtLocation']);
        $pjt_type               = $this->db->real_escape_string($params['pjtType']);
        $loc_id                 = $this->db->real_escape_string($params['locId']);


        $qry02 = "UPDATE    ctt_projects
                    SET    pjt_name        = '$pjt_name', 
                            pjt_date_start  = '$pjt_date_start', 
                            pjt_date_end    = '$pjt_date_end',
                            pjt_location    = '$pjt_location', 
                            pjttp_id        = '$pjt_type',  
                            cuo_id          = '$cuo_id',
                            loc_id          = '$loc_id'
                    WHERE   pjt_id          =  $pjt_id;
                    ";
        $this->db->query($qry02);

        return $pjt_id;

    }



// Promueve proyecto
    public function PromoteProject($params)
    {
        /* Actualiza el estado en 2 convirtiendolo en presupuesto  */
        $pjtId                  = $this->db->real_escape_string($params['pjtId']);
        $qry = "UPDATE ctt_projects SET pjt_status = '3' WHERE pjt_id = $pjtId;";
        $this->db->query($qry);

        return $pjtId;

    }

    


// Agrega Version
    public function SaveVersion($params)
    {
        $pjtId      = $this->db->real_escape_string($params['pjtId']);
        $verCode    = $this->db->real_escape_string($params['verCode']);
        $verCurr    = '1';
        $verStatus  = 'R';

        $qry1 = "UPDATE ctt_version SET ver_current = 0 WHERE pjt_id = $pjtId";
        $this->db->query($qry1);

        $qry2 = "INSERT INTO ctt_version (ver_code, pjt_id, ver_current, ver_status) VALUES ('$verCode', $pjtId, $verCurr, '$verStatus');";
        $this->db->query($qry2);
        $result = $this->db->insert_id;
        return $result . '|' . $pjtId;
    }



/** ====== Agrega producto a la tabla temporal ===============================================  */
    public function AddProductMice($params)
    {
        $pjtvr_prod_sku         = $params['pjtcn_prod_sku'];
        $pjtvr_prod_name        = $params['pjtcn_prod_name'];
        $pjtvr_prod_price       = $params['pjtcn_prod_price'];
        $pjtvr_quantity         = $params['pjtcn_quantity'];
        $pjtvr_quantity_ant     = $params['pjtcn_quantity'];
        $pjtvr_days_base        = $params['pjtcn_days_base'];
        $pjtvr_days_cost        = $params['pjtcn_days_cost'];
        $pjtvr_discount_base    = $params['pjtcn_discount_base'];
        $pjtvr_days_trip        = $params['pjtcn_days_trip'];
        $pjtvr_discount_trip    = $params['pjtcn_discount_trip'];
        $pjtvr_days_test        = $params['pjtcn_days_test'];
        $pjtvr_discount_test    = $params['pjtcn_discount_test'];
        $pjtvr_insured          = $params['pjtcn_insured'];
        $pjtvr_prod_level       = $params['pjtcn_prod_level'];
        $pjtvr_section          = $params['pjtcn_section'];
        $pjtvr_status           = '1';
        $ver_id                 = $params['ver_id'];
        $prd_id                 = $params['prd_id'];
        $pjt_id                 = $params['pjt_id'];
        $pjtvr_action           = 'A';

        $qry = "INSERT INTO ctt_projects_mice (
            pjtvr_prod_sku, 
            pjtvr_action, 
            pjtvr_prod_name, 
            pjtvr_prod_price, 
            pjtvr_quantity, 
            pjtvr_quantity_ant, 
            pjtvr_days_base, 
            pjtvr_days_cost, 
            pjtvr_discount_base, 
            pjtvr_days_trip, 
            pjtvr_discount_trip, 
            pjtvr_days_test, 
            pjtvr_discount_test, 
            pjtvr_insured, 
            pjtvr_prod_level, 
            pjtvr_section, 
            pjtvr_status, 
            ver_id, 
            prd_id, 
            pjt_id 
        ) VALUES (
            '$pjtvr_prod_sku',
            '$pjtvr_action',
            '$pjtvr_prod_name',
            '$pjtvr_prod_price',
            '$pjtvr_quantity',
            '$pjtvr_quantity_ant',
            '$pjtvr_days_base',
            '$pjtvr_days_cost',
            '$pjtvr_discount_base',
            '$pjtvr_days_trip',
            '$pjtvr_discount_trip',
            '$pjtvr_days_test',
            '$pjtvr_discount_test',
            '$pjtvr_insured',
            '$pjtvr_prod_level',
            '$pjtvr_section',
            '$pjtvr_status',
            '$ver_id',
            '$prd_id',
            '$pjt_id'
        );
        ";
        $this->db->query($qry);
        $result = $this->db->insert_id;

    }

/** ====== Actualiza contenido de la version =================================================  */
    public function SaveBudget($params)
    {
        $pjtId     = $params['pjtId'];
        $verId     = $params['verId'];
        $qry1 = "DELETE FROM ctt_projects_version WHERE ver_id = $verId;";
        $this->db->query($qry1);

        $qry2 = "INSERT INTO ctt_projects_version (
                        pjtvr_id, pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost, 
                        pjtvr_discount_base, pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, 
                        pjtvr_prod_level, pjtvr_section, pjtvr_status, ver_id, prd_id, pjt_id
                )  SELECT 
                        pjtvr_id, pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost, 
                        pjtvr_discount_base, pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, 
                        pjtvr_prod_level, pjtvr_section, pjtvr_status, ver_id, prd_id, pjt_id 
                    FROM ctt_projects_mice WHERE pjtvr_action != 'D' AND pjt_id = $pjtId;
            ";
        $this->db->query($qry2);

        $qry3 = "DELETE FROM ctt_projects_content WHERE pjt_id = $pjtId;";
        $this->db->query($qry3);

        $qry4 = "INSERT INTO ctt_projects_content
                 SELECT * FROM ctt_projects_version WHERE ver_id = $verId;";
        $this->db->query($qry4);

        $qry5 = "SELECT * FROM ctt_projects_mice WHERE pjt_id = $pjtId;";
        return $this->db->query($qry5);

    }
/** ====== Agrega contenido de la nueva version ==============================================  */
    public function SaveBudgetAs($params)
    {
        $pjtvr_prod_sku           = $params['pjtvrSku'];
        $pjtvr_prod_level         = $params['pjtvrLevel'];
        $pjtvr_section            = $params['pjtvrSection'];
        $pjtvr_prod_name          = str_replace('°','"',$params['pjtvrProduc']);
        $pjtvr_prod_price         = $params['pjtvrPricBs'];
        $pjtvr_quantity           = $params['pjtvrQtysBs'];
        $pjtvr_days_base          = $params['pjtvrDaysBs'];
        $pjtvr_days_cost          = $params['pjtvrDaysCs'];
        $pjtvr_discount_base      = $params['pjtvrDescBs'];
        $pjtvr_days_trip          = $params['pjtvrDaysTp'];
        $pjtvr_discount_trip      = $params['pjtvrDescTp'];
        $pjtvr_days_test          = $params['pjtvrDaysTr'];
        $pjtvr_discount_test      = $params['pjtvrDescTr'];
        $pjtvr_insured            = $params['pjtvrInsured'];
        $ver_id                   = $params['verId'];
        $prd_id                   = $params['prdId'];
        $pjt_id                   = $params['pjtId'];
        $rowCurent                = $params['rowCurent'];

        $qry = "INSERT INTO ctt_projects_version (
                    pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_prod_level, pjtvr_section, 
                    pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost, pjtvr_discount_base, pjtvr_days_trip, 
                    pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, 
                    ver_id, prd_id, pjt_id 
                ) VALUES (
                    '$pjtvr_prod_sku',
                    '$pjtvr_prod_name',
                    '$pjtvr_prod_price',
                    '$pjtvr_prod_level',
                    '$pjtvr_section',
                    '$pjtvr_quantity',
                    '$pjtvr_days_base',
                    '$pjtvr_days_cost',
                    '$pjtvr_discount_base',
                    '$pjtvr_days_trip',
                    '$pjtvr_discount_trip',
                    '$pjtvr_days_test',
                    '$pjtvr_discount_test',
                    '$pjtvr_insured',
                    '$ver_id',
                    '$prd_id',
                    '$pjt_id'
                );
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
            
            return $ver_id.'|'.$pjt_id.'|'.$rowCurent;
    }

/** ====== Elimina los periodos de las series correspondientes al periodo ====================  */
    public function cleanPeriods($params)
    {
        $pjtId = $this->db->real_escape_string($params);
        $qry = "DELETE FROM ctt_projects_periods WHERE pjtdt_id IN (
                    SELECT DISTINCT pjtdt_id FROM ctt_projects_detail AS pdt 
                    INNER JOIN ctt_projects_content AS pcn ON pcn.pjtcn_id = pdt.pjtcn_id
                    WHERE pcn.pjt_id = $pjtId
                );";
        return $this->db->query($qry);
    }

/** ====== Restaura las series del proyecto a productos disponibles ==========================  */
    public function restoreSeries($params)
    {
        $pjtId = $this->db->real_escape_string($params);
        $qry = "UPDATE ctt_series 
                SET ser_situation = 'D', ser_stage ='D', pjtdt_id = 0 
                WHERE pjtdt_id IN (
                    SELECT DISTINCT pjtdt_id FROM ctt_projects_detail AS pdt 
                    INNER JOIN ctt_projects_content AS pcn ON pcn.pjtcn_id = pdt.pjtcn_id
                    WHERE pcn.pjt_id = $pjtId
                );";
        return $this->db->query($qry);
    }

/** ====== Elimina los registros del detalle del proyecto  ===================================  */
    public function cleanDetail($params)
    {
        $pjtId = $this->db->real_escape_string($params);
        $qry = "DELETE FROM ctt_projects_detail WHERE pjtcn_id IN  (
                    SELECT pjtcn_id FROM ctt_projects_content WHERE pjt_id = $pjtId
                );";
        return $this->db->query($qry);
    }

/** ====== Elimina los registros del contenido del proyecto  =================================  */
    public function cleanContent($params)
    {
        $pjtId = $this->db->real_escape_string($params);
        $qry = "DELETE FROM ctt_projects_content WHERE pjt_id = $pjtId;";
        return $this->db->query($qry);
    }


/** ====== Agrega los registros del contenido del proyecto  =================================  */
    public function restoreContent($params)
    {
        $verId = $this->db->real_escape_string($params);
        $qry1 = "INSERT INTO ctt_projects_content
                    SELECT * FROM ctt_projects_version WHERE ver_id = $verId;";
        $this->db->query($qry1);

        $qry2 = "SELECT * 
                FROM ctt_projects_content AS pc
                INNER JOIN ctt_version AS vr ON vr.ver_id = pc.ver_id
                INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
                INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
                WHERE pc.ver_id = $verId;";
        return $this->db->query($qry2);
    }
    public function SettingSeries($params)
    {
        $prodId   = $this->db->real_escape_string($params['prodId']);
        $dtinic   = $this->db->real_escape_string($params['dtinic']);
        $dtfinl   = $this->db->real_escape_string($params['dtfinl']);
        $pjetId   = $this->db->real_escape_string($params['pjetId']);
        $detlId   = $this->db->real_escape_string($params['detlId']);


        $qry = "SELECT ser_id, ser_sku FROM ctt_series WHERE prd_id = $prodId 
                AND pjtdt_id = 0
                ORDER BY ser_reserve_count asc LIMIT 1;";
        $result =  $this->db->query($qry);
        
        $series = $result->fetch_object();
        if ($series != null){
            $serie  = $series->ser_id; 
            $sersku  = $series->ser_sku; 

            $qry1 = "UPDATE ctt_series 
                        SET 
                            ser_situation = 'EA',
                            ser_stage = 'R',
                            ser_reserve_count = ser_reserve_count + 1
                            WHERE ser_id = $serie;";
            $this->db->query($qry1);

        }else {
            $serie  = null; 
            $sersku  = 'Pendiente' ;
        }

        
        $qry2 = "INSERT INTO ctt_projects_detail (
                    pjtdt_belongs, pjtdt_prod_sku, ser_id, prd_id, pjtcn_id
                ) VALUES (
                    '$detlId', '$sersku', '$serie',  '$prodId',  '$pjetId'
                );        ";

        $this->db->query($qry2);
        $pjtdtId = $this->db->insert_id;

        if ( $serie != null){
            $qry3 = "UPDATE ctt_series 
                        SET 
                            pjtdt_id = '$pjtdtId'
                        WHERE ser_id = $serie;";
            $this->db->query($qry3);
        }

        $qry4 = "INSERT INTO ctt_projects_periods 
                    (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs ) 
                VALUES 
                    ('$dtinic', '$dtfinl', '$pjtdtId', '$detlId')";


        $this->db->query($qry4);

        return  $pjtdtId;
        
    }

    public function GetAccesories($params)
    {
        $prodId        = $this->db->real_escape_string($params);
        $qry = "SELECT pd.* FROM ctt_products AS pd
                INNER JOIN ctt_accesories AS ac ON ac.prd_id = pd.prd_id 
                WHERE ac.acr_parent = $prodId;";
        return $this->db->query($qry);

    }
    public function GetProducts($params)
    {
        $prodId        = $this->db->real_escape_string($params);
        $qry = "SELECT pd.* 
                FROM ctt_products_packages AS pk 
                INNER JOIN ctt_products AS pd ON pd.prd_id = pk.prd_id
                WHERE  pk.prd_parent = $prodId;";
        return $this->db->query($qry);

    }
/** END */




}
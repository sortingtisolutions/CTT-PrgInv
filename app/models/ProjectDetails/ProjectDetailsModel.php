<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectDetailsModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    
/** ====== Listado de proyectos ==============================================================  */

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
                    , pj.pjt_time
                    , pj.pjt_location 
                    , pj.pjt_status 
                    , pj.cuo_id 
                    , pj.loc_id 
                    , co.cus_id 
                    , co.cus_parent 
                    , pj.pjt_parent 
                    , lo.loc_type_location 
                    , pt.pjttp_name 
                    , pt.pjttp_id
                    , '$pjId' as pjId
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_status in ('3','4') ORDER BY pj.pjt_id DESC;
                ";
        return $this->db->query($qry);


    }    
    
/** ====== Listado de proyectos padre ========================================================  */        
    public function listProjectsParents($params)
    {
        // Debe leer todos los proyectos que se encuentren en estaus 40 - Cotización
        $qry = "SELECT pjt_id, pjt_name  
                FROM ctt_projects 
                WHERE pjt_status = '40' ORDER BY pjt_name ASC;
                ";
        return $this->db->query($qry);
    }    


/** ====== Listado de versiones ==============================================================  */
    public function listVersion($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry3 = "SELECT * FROM ctt_version WHERE pjt_id = $pjtId AND ver_status = 'P' ORDER BY ver_date DESC;";
        return $this->db->query($qry3);
    }    

/** ====== Listado de contenido del proyecto =================================================  */
    public function listBudgets($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $verId = $this->db->real_escape_string($params['verId']);

        $qry3 = "DELETE FROM ctt_projects_mice WHERE pjt_id = $pjtId;";
        $this->db->query($qry3);

        $qry4 = "INSERT INTO ctt_projects_mice (
                    pjtvr_id, pjtvr_action, pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_quantity_ant, pjtvr_days_base, pjtvr_days_cost, pjtvr_discount_base, 
                    pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, pjtvr_prod_level, pjtvr_section, pjtvr_status, ver_id, prd_id, pjt_id
                )
                SELECT pjtvr_id, 'N' AS pjtvr_action, pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_quantity AS pjtvr_quantity_ant, pjtvr_days_base, pjtvr_days_cost, pjtvr_discount_base, 
                    pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, pjtvr_prod_level, pjtvr_section, pjtvr_status, ver_id, prd_id, pjt_id 
                FROM ctt_projects_version 
                WHERE ver_id = $verId;
                ";
        $this->db->query($qry4);

        $qry5 = "SELECT pc.*, pj.pjt_id, sb.sbc_name,
                    date_format(pj.pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                    date_format(pj.pjt_date_end, '%Y%m%d') AS pjt_date_end, pd.srv_id,
                    CASE 
                        WHEN pjtvr_prod_level ='K' THEN 
                            (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = pc.prd_id)
                        WHEN pjtvr_prod_level ='P' THEN 
                            (SELECT prd_stock FROM ctt_products WHERE prd_id = pc.prd_id)
                        ELSE 
                            (SELECT prd_stock FROM ctt_products WHERE prd_id = pc.prd_id)
                        END AS bdg_stock
                FROM ctt_projects_version AS pc
                INNER JOIN ctt_projects AS pj ON pj.pjt_id = pc.pjt_id
                INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
                LEFT JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
                WHERE pc.ver_id = $verId ;";
        return $this->db->query($qry5);

    } 
    
    
/** ====== Listado clientes ==================================================================  */
    public function listCustomers($params)
    {
        $prd = $this->db->real_escape_string($params['prm']);

        $qry = "SELECT cs.*, ct.cut_name FROM ctt_customers AS cs
                INNER JOIN ctt_customers_type AS ct ON ct.cut_id = cs.cut_id
                WHERE cs.cus_status = 1 ORDER BY cs.cus_name;";
        return $this->db->query($qry);
    }    

/** ====== Listado de relaciones de clientes =================================================  */
    public function listCustomersOwn($params)
    {
        $qry = "SELECT * FROM ctt_customers_owner";
        return $this->db->query($qry);
    }    

/** ====== Listado de descuentos =============================================================  */
    public function listDiscounts($params)
    {
        $level = $this->db->real_escape_string($params['level']);
        $qry = "SELECT * FROM ctt_discounts WHERE dis_level = $level ORDER BY dis_discount;";
        return $this->db->query($qry);
    }    

        
/** ====== Listado de los tipos de proyecto ==================================================  */
    public function listProjectsType($params)
    {

        $qry = "SELECT * FROM ctt_projects_type ORDER BY pjttp_name;";
        return $this->db->query($qry);
    }    



/** ====== Listado de productos ==============================================================  */
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

    
/** ====== Lista los comentarios registrados al proyecto =====================================  */
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


















/** ====== Listado de productos relacionados como accesosrios ================================  */
    public function listProductsRelated($params)
    {

        $type = $this->db->real_escape_string($params['type']);
        $prdId = $this->db->real_escape_string($params['prdId']);

        $qry = "SELECT pr.prd_id, pr.prd_sku, pj.pjtdt_prod_sku, pr.prd_name
                    , pr.prd_level
                    , ct.cat_name
                    , ac.acr_parent
                    , ROW_NUMBER() OVER (PARTITION BY pr.prd_sku ORDER BY sr.ser_sku DESC) AS reng
                FROM ctt_projects_detail AS pj
                INNER JOIN ctt_products AS pr ON pr.prd_id = pj.prd_id
                INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                LEFT JOIN ctt_series as sr ON sr.prd_id = pj.prd_id AND sr.pjtdt_id = pj.pjtdt_id
                LEFT JOIN ctt_accesories AS ac ON ac.prd_id = pr.prd_id
                INNER JOIN ctt_projects_content AS cn ON cn.pjtcn_id = pj.pjtcn_id
                WHERE  cn.prd_id  = $prdId ORDER BY reng, pr.prd_level DESC;";
        return $this->db->query($qry);

    }

/** ====== Muestra el inventario de productos en almacen =====================================  */
    public function stockProducts($params)
    {

        $prdId = $this->db->real_escape_string($params['prdId']);

        $qry = "SELECT  ifnull(pdt.pjtdt_prod_sku,'') as pjtdt_prod_sku, 
                        ifnull(ser.ser_sku,'') as ser_sku, 
                        ifnull(ser.ser_serial_number,'') as ser_serial_number, 
                        ifnull(ser.ser_situation,'') as ser_situation, 
                        ifnull(pjt.pjt_name,'') as pjt_name,
                        ifnull(ped.pjtpd_day_start,'') AS pjtpd_day_start, 
                        ifnull(ped.pjtpd_day_end,'') AS pjtpd_day_end
                FROM  ctt_series AS ser     
                LEFT JOIN ctt_projects_detail AS pdt ON pdt.ser_id = ser.ser_id 
                LEFT JOIN ctt_projects_content AS pcn ON pcn.pjtcn_id = pdt.pjtcn_id
                LEFT JOIN ctt_projects AS pjt ON pjt.pjt_id = pcn.pjt_id
                LEFT JOIN ctt_projects_periods AS ped ON ped.pjtdt_id = pdt.pjtdt_id
                WHERE ser.prd_id = $prdId;";
        return $this->db->query($qry);
    } 


/** ====== cuenta los productos que no se tiene en existencia y estan solicitados  ===========  */
    public function countPending($params)
    {

        $pjtcnId    = $this->db->real_escape_string($params['pjtcnId']);
        $prdId      = $this->db->real_escape_string($params['prdId']);

        $qry = "SELECT '$prdId' AS prd_id, '$pjtcnId' AS pjtcn_id, count(*) as counter
                  FROM  ctt_projects_detail 
                 WHERE  pjtcn_id = $pjtcnId
                   AND  pjtdt_prod_sku = 'Pendiente'; ";

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

/** ====== Agrega un nuevo comentario ========================================================  */
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



/** ====== Promueve el presupuesto proyecto ==================================================  */
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
        $pjt_time               = $this->db->real_escape_string($params['pjtTime']); 
        $pjt_location           = $this->db->real_escape_string($params['pjtLocation']);
        $pjt_type               = $this->db->real_escape_string($params['pjtType']);
        $loc_id                 = $this->db->real_escape_string($params['locId']);


        $qry02 = "UPDATE    ctt_projects
                    SET     pjt_name        = '$pjt_name', 
                            pjt_date_start  = '$pjt_date_start', 
                            pjt_date_end    = '$pjt_date_end',
                            pjt_time        = '$pjt_time',
                            pjt_location    = '$pjt_location', 
                            pjttp_id        = '$pjt_type',  
                            cuo_id          = '$cuo_id',
                            loc_id          = '$loc_id'
                    WHERE   pjt_id          =  $pjt_id;
                    ";
        $this->db->query($qry02);

        return $pjt_id;

    }




/** ====== Cancela proyecto ===============================================================  */
public function cancelProject($params)
{
    $pjtId         = $this->db->real_escape_string($params['pjtId']);
    $verId         = $this->db->real_escape_string($params['verId']);

    $qry = "UPDATE ctt_projects SET pjt_status = '5' WHERE pjt_id = $pjtId;";
    $this->db->query($qry);  

    return $pjtId.'|'. $verId;
}  

    

/** ====== Guarda una nueva version ==========================================================  */
    public function SaveVersion($params)
    {
        $pjtId      = $this->db->real_escape_string($params['pjtId']);
        $verCode    = $this->db->real_escape_string($params['verCode']);
        $verActive  = '1';
        $verMaster  = '1';
        $verStatus  = 'P';

        $qry1 = "UPDATE ctt_version SET ver_active = 0, ver_master = 0 WHERE pjt_id = $pjtId;";
        $this->db->query($qry1);

        $qry2 = "INSERT INTO ctt_version 
                        (ver_code,   pjt_id, ver_active, ver_master,  ver_status) 
                 VALUES ('$verCode', $pjtId, $verActive, $verMaster, '$verStatus');";
        $this->db->query($qry2);
        $result = $this->db->insert_id;
        return $result . '|' . $pjtId;
    }



/** ====== Agrega producto a la tabla temporal ===============================================  */
    public function AddProductMice($params)
    {
        $pjtvr_prod_sku         = $params['pjtvr_prod_sku'];
        $pjtvr_prod_name        = $params['pjtvr_prod_name'];
        $pjtvr_prod_price       = $params['pjtvr_prod_price'];
        $pjtvr_quantity         = $params['pjtvr_quantity'];
        $pjtvr_quantity_ant     = $params['pjtvr_quantity'];
        $pjtvr_days_base        = $params['pjtvr_days_base'];
        $pjtvr_days_cost        = $params['pjtvr_days_cost'];
        $pjtvr_discount_base    = $params['pjtvr_discount_base'];
        $pjtvr_days_trip        = $params['pjtvr_days_trip'];
        $pjtvr_discount_trip    = $params['pjtvr_discount_trip'];
        $pjtvr_days_test        = $params['pjtvr_days_test'];
        $pjtvr_discount_test    = $params['pjtvr_discount_test'];
        $pjtvr_insured          = $params['pjtvr_insured'];
        $pjtvr_prod_level       = $params['pjtvr_prod_level'];
        $pjtvr_section          = $params['pjtvr_section'];
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
    public function settingMasterVersion($pjtId, $verId)
    {
        $qry1 = "UPDATE ctt_version SET ver_master = 0, ver_active = 0 WHERE pjt_id = $pjtId;";
        $this->db->query($qry1);
        
        $qry2 = "UPDATE ctt_version SET ver_master = 1, ver_active = 1 WHERE ver_id = $verId;";
        return $this->db->query($qry2);

    }
    public function settingProjectVersion($pjtId, $verId)
    {
        $qry1 = "DELETE FROM ctt_projects_version WHERE ver_id = $verId;";
        $this->db->query($qry1);
        
        $qry2 = "INSERT INTO ctt_projects_version (
                    pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost, 
                    pjtvr_discount_base, pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, 
                    pjtvr_prod_level, pjtvr_section, pjtvr_status, ver_id, prd_id, pjt_id)  
                SELECT 
                    pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost, 
                    pjtvr_discount_base, pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, 
                    pjtvr_prod_level, pjtvr_section, pjtvr_status, ver_id, prd_id, pjt_id 
                FROM ctt_projects_mice WHERE pjtvr_action != 'D' AND pjt_id = $pjtId;";
        return $this->db->query($qry2);

     }
    public function settingProjectContent($pjtId, $verId)
    {
        $qry1 = "DELETE FROM ctt_projects_content WHERE pjt_id = $pjtId;";
        $this->db->query($qry1);
        
        $qry2 = "INSERT INTO ctt_projects_content
                 SELECT * FROM ctt_projects_version WHERE ver_id = $verId;";
        return $this->db->query($qry2);

     }
  
     public function getProjectVersion($pjtId)
     {
        $qry1 = "SELECT * FROM ctt_projects_content as pc 
                 INNER JOIN ctt_projects AS pj ON pj.pjt_id = pc.pjt_id
                 INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
                 WHERE pj.pjt_id = $pjtId;";
        return $this->db->query($qry1);
       
     }
  
    public function getVersionMice($verId)
    {
            $qry1 = "SELECT * 
                     FROM ctt_projects_mice AS pc
                     INNER JOIN ctt_version AS vr ON vr.ver_id = pc.ver_id
                     INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
                     INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
                     WHERE pc.ver_id = $verId;";
            return $this->db->query($qry1);
     }

/** ====== Agrega contenido de la nueva version ==============================================  */
    public function settinProjectVersion($pjtId, $verId )
    {
 
        $qry = "INSERT INTO ctt_projects_version (
                    pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost,
                    pjtvr_discount_base, pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured,
                    pjtvr_prod_level, pjtvr_section, pjtvr_status, ver_id, prd_id, pjt_id
                )
                SELECT 
                    pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost,
                    pjtvr_discount_base, pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured,
                    pjtvr_prod_level, pjtvr_section, pjtvr_status, '$verId' as ver_id, prd_id, pjt_id
                FROM ctt_projects_mice WHERE pjt_id = $pjtId;";

        return $this->db->query($qry);
            
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


/** ====== Agrega los registros del contenido del proyecto  ==================================  */
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

/** ====== Elimina los registros de detalle y series  ========================================  */
    public function KillQuantityDetail($params)
    {
        $pjtcnId = $this->db->real_escape_string($params['pjetId']);
        $qry1 = "WITH elements AS (
                        SELECT *,
                            ROW_NUMBER() OVER (partition by prd_id ORDER BY pjtdt_prod_sku DESC) AS reng
                        FROM ctt_projects_detail WHERE pjtcn_id = $pjtcnId ORDER BY pjtdt_prod_sku)
                SELECT pjtdt_id FROM elements WHERE reng =1;";
        $result =  $this->db->query($qry1);
 
        while($row = $result->fetch_assoc()){
            $pjtdtId = $row["pjtdt_id"];
            $qry2 = "UPDATE ctt_series 
                        SET ser_situation = 'D', 
                            ser_stage = 'D', 
                            pjtdt_id = 0 
                      WHERE pjtdt_id = $pjtdtId;";
            $this->db->query($qry2);

            $qry3 = "DELETE FROM ctt_projects_detail WHERE pjtdt_id = $pjtdtId;";
            $this->db->query($qry3);

            $qry4 = "DELETE FROM ctt_projects_periods WHERE pjtdt_id = $pjtdtId;";
            $this->db->query($qry4);

        }
        return '1';
    }

/** ====== Asigna las series y el detalle del producto al detalle del proyecto  ==============  */
    public function SettingSeries($params)
    {
        $prodId   = $this->db->real_escape_string($params['prodId']);
        $dtinic   = $this->db->real_escape_string($params['dtinic']);
        $dtfinl   = $this->db->real_escape_string($params['dtfinl']);
        $pjetId   = $this->db->real_escape_string($params['pjetId']);
        $detlId   = $this->db->real_escape_string($params['detlId']);

        // Busca serie quese encuentre disponible y obtiene el id
        $qry1 = "SELECT ser_id, ser_sku FROM ctt_series WHERE prd_id = $prodId 
                 AND pjtdt_id = 0
                 ORDER BY ser_reserve_count asc LIMIT 1;";
        $result =  $this->db->query($qry1);
        
        $series = $result->fetch_object();
        if ($series != null){
            $serie  = $series->ser_id; 
            $sersku  = $series->ser_sku; 

            // Si la encuentra coloca la etapa y el estatus a la serie
            $qry2 = "UPDATE ctt_series 
                        SET 
                            ser_situation = 'EA',
                            ser_stage = 'R',
                            ser_reserve_count = ser_reserve_count + 1
                    WHERE   ser_id = $serie;";
            $this->db->query($qry2);

        }else {
            $serie  = null; 
            $sersku  = 'Pendiente' ;
        }
        
        // Agrega el registro en el detalle con los datos de la serie
        $qry3 = "INSERT INTO ctt_projects_detail (
                    pjtdt_belongs, pjtdt_prod_sku, ser_id, prd_id, pjtcn_id
                ) VALUES (
                    '$detlId', '$sersku', '$serie',  '$prodId',  '$pjetId'
                );        ";
        $this->db->query($qry3);
        $pjtdtId = $this->db->insert_id;

        if ( $serie != null){
            // Asigna el id del detalle en la serie correspondiente
            $qry4 = "UPDATE ctt_series 
                        SET 
                            pjtdt_id = '$pjtdtId'
                        WHERE ser_id = $serie;";
            $this->db->query($qry4);
        }

        // Agrega los periodos desiganados a la serie 
        $qry5 = "INSERT INTO ctt_projects_periods 
                    (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs) 
                VALUES 
                    ('$dtinic', '$dtfinl', '$pjtdtId', '$detlId')";
        $this->db->query($qry5);

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


/** ==========================================================================================  */




}
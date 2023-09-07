<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class BudgetModel extends Model
{
    public function __construct()
    {
      parent::__construct();
    }

// Listado de clientes
    public function listCustomers($params)
    {
        $prd = $this->db->real_escape_string($params['prm']);
        //  $qry = "SELECT cs.cus_id,cs.cus_name,cs.cus_address,cs.cus_email,cs.cus_phone,cs.cus_qualification, ct.cut_name,cs.cut_id 
        $qry = "SELECT cs.cus_id,cs.cus_name,cs.cus_address,cs.cus_email,cs.cus_phone,cs.cus_qualification, ct.cut_name, cs.cut_id
                FROM ctt_customers AS cs
                INNER JOIN ctt_customers_type AS ct ON ct.cut_id = cs.cut_id
                WHERE cs.cus_status = 1 ORDER BY cs.cus_name;";
        return $this->db->query($qry);
    }    

// Listado de proyectos
    public function listProjects($params)
    {
        // Debe leer todos los proyectos que se encuentren en estaus 1 - Cotización
        $pjId = $this->db->real_escape_string($params['pjId']);

        $qry = "SELECT 
                    pj.pjt_id  
                    , pj.pjt_number , pj.pjt_name  
                    , DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project 
                    , DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start 
                    , DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end 
                    , pj.pjt_time, pj.pjt_location, ed.edos_id
                    , pj.pjt_status 
                    , pj.cuo_id, pj.loc_id 
                    , co.cus_id, co.cus_parent 
                    , pj.pjt_parent , lo.loc_type_location 
                    , pt.pjttp_name , pt.pjttp_id
                    , pj.pjttc_id
                    , '$pjId' as pjId
                    , pj.pjt_how_required
                    , pjt_trip_go, pjt_trip_back
                    , pjt_to_carry_on, pjt_to_carry_out
                    , pjt_test_tecnic, pjt_test_look
                FROM ctt_projects AS pj
                LEFT JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                LEFT JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
				LEFT JOIN ctt_estados_mex AS ed ON ed.edos_id = pj.edos_id		
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_status in ('1', '40') ORDER BY pj.pjt_id DESC;
                ";
        return $this->db->query($qry);
    }    
	
	public function getLocationType(){
        $qry = "SELECT loc_id, loc_type_location
                FROM ctt_location; ";
        return $this->db->query($qry);
    } 		
    
    public function ListLocationsEdos($params){
        $pjtId = $this->db->real_escape_string($params['prj_id']);
        $qry = "SELECT * FROM ctt_locacion_estado AS ldo 
        INNER JOIN ctt_estados_mex AS edo ON ldo.edos_id=edo.edos_id WHERE ldo.pjt_id='$pjtId';";
        return $this->db->query($qry);
    } 
    // Listado de proyectos padre
    public function listProjectsParents($params)
    {
        // Debe leer todos los proyectos que se encuentren en estaus 40 - Cotización
        $qry = "SELECT pjt_id, pjt_name, pjt_number 
                FROM ctt_projects 
                WHERE pjt_status = '40' ORDER BY pjt_name ASC;
                ";
        return $this->db->query($qry);
    }    
  
// Listado de tipos de proyectos
    public function listProjectsType($params)
    {

        $qry = "SELECT * FROM ctt_projects_type ORDER BY pjttp_name;";
        return $this->db->query($qry);
    }    
    
// Listado de tipos de llamados
    public function listProjectsTypeCalled($params)
    {

        $qry = "SELECT * FROM ctt_projects_type_called ORDER BY pjttc_id";
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

// Listado de relaciones
    public function listCustomersDef($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);
        $cutId = $this->db->real_escape_string($params['cutId']);

        if ($cutId == 1){
            $subQry = "SELECT cuo_id, cus_id AS cus_id, $cutId AS cut_id FROM ctt_customers_owner WHERE cus_parent = $cusId";
        } else {
            $subQry = "SELECT cuo_id, cus_parent AS cus_id, $cutId AS cut_id FROM ctt_customers_owner WHERE cus_id = $cusId";
        }
        
        $qry = $subQry;
        return $this->db->query($qry);
    }    

   
// Listado de relaciones total
    public function listCustomersOwn($params)
    {
        $qry = "SELECT * FROM ctt_customers_owner";
        return $this->db->query($qry);
    }    

// Listado de claves de Relaciones
    public function listProjectsDef($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);

        $qry = "SELECT cuo_id,cus_id,cus_parent 
                FROM ctt_customers_owner 
                WHERE cus_id = $cusId OR cus_parent = $cusId;";
        return $this->db->query($qry);
    }    

    // Listado de clientes
    public function getEdosRepublic($params)
    {
        $prd = $this->db->real_escape_string($params['prm']);
        
        $qry = "SELECT edos_id,edos_name,edos_abrev
                FROM ctt_estados_mex ORDER BY edos_id;";
        return $this->db->query($qry);
    }    
// Listado de versiones
    public function listVersion($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry = "SELECT * FROM ctt_version WHERE pjt_id = $pjtId AND ver_status = 'C' ORDER BY ver_date DESC;";
        return $this->db->query($qry);
    }    

 
// Listado de cotizaciones
    public function listBudgets($params)
    {
        $verId = $this->db->real_escape_string($params['verId']);

        $qry = "SELECT bg.*, pj.pjt_id, sb.sbc_name,
                    date_format(pj.pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                    date_format(pj.pjt_date_end, '%Y%m%d') AS pjt_date_end, 
                    CASE 
                        WHEN bdg_prod_level ='K' THEN 
                            (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = bg.prd_id)
                        WHEN bdg_prod_level ='P' THEN 
                            (SELECT prd_stock FROM ctt_products WHERE prd_id = bg.prd_id)
                        ELSE 
                            (SELECT prd_stock FROM ctt_products WHERE prd_id = bg.prd_id)
                        END AS bdg_stock
                FROM ctt_budget AS bg
                INNER JOIN ctt_version AS vr ON vr.ver_id = bg.ver_id
                INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
                LEFT JOIN ctt_products AS pd ON pd.prd_id = bg.prd_id
                LEFT JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
                WHERE bg.ver_id = $verId ORDER BY bdg_order ASC;";

        return $this->db->query($qry);
    }    


// Listado de descuentos
public function listDiscounts($params)
{
    $level = $this->db->real_escape_string($params['level']);
    $qry = "SELECT * FROM ctt_discounts WHERE dis_level = $level ORDER BY dis_discount;";
    return $this->db->query($qry);
}    

// ******* Listado de productos
    public function listProducts($params)
    {
        $word = $this->db->real_escape_string($params['word']);
        
        $qry = "SELECT pd.prd_id, pd.prd_sku, pd.prd_name, pd.prd_price, pd.prd_level, 
                        pd.prd_insured, sb.sbc_name,cat_name,
                CASE 
                    WHEN prd_level ='K' THEN 
                        (SELECT prd_stock
                                FROM ctt_products WHERE prd_id = pd.prd_id)
                    WHEN prd_level ='P' THEN 
                        (SELECT prd_stock-fun_buscarentas(pd.prd_sku) 
                                FROM ctt_products WHERE prd_id = pd.prd_id)
                    ELSE 
                        (SELECT prd_stock-fun_buscarentas(pd.prd_sku) 
                                FROM ctt_products WHERE prd_id = pd.prd_id)
                    END AS stock
            FROM ctt_products AS pd
            INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
            INNER JOIN ctt_categories AS ct ON ct.cat_id=sb.cat_id
            WHERE (upper(pd.prd_name) LIKE '%$word%' OR upper(pd.prd_sku) LIKE '%$word%')
                AND pd.prd_status = 1 AND pd.prd_visibility = 1 AND sb.cat_id NOT IN (16)
            ORDER BY pd.prd_name;";
        return $this->db->query($qry);
    } 

    public function listProducts2($params)
    {
        $word = $this->db->real_escape_string($params['word']);
        $qry = "SELECT * from ctt_vw_list_products
            WHERE (upper(prd_name) LIKE '%$word%' OR upper(prd_sku) LIKE '%$word%');";
        return $this->db->query($qry);
    } 
    // Listar productos ***Ed
    public function listProducts3($params)
    {
        $word = $this->db->real_escape_string($params['word']);
        $sbc_id = $this->db->real_escape_string($params['dstr']);
        $qry = "SELECT * from ctt_vw_list_products2
            WHERE (upper(prd_name) LIKE '%$word%' OR upper(prd_sku) LIKE '%$word%') AND sbc_id = '$sbc_id';";
        return $this->db->query($qry);
    } 
    // Listado de categorias
    public function listCategories()
    {
        $qry = "SELECT * FROM ctt_categories 
                WHERE cat_status  = 1 ";
        return $this->db->query($qry);
    }
    // Listado de subcategoria
    public function listSubCategories($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        $qry = "SELECT * FROM ctt_subcategories 
                WHERE sbc_status = 1 AND cat_id=$catId order by sbc_name";
        return $this->db->query($qry);
    }
    // Datos del proyecto padre
    public function getProjectParent($param)
    {
        $projId = $this->db->real_escape_string($param['projId']);
        $qry = "SELECT pjt.pjttp_name, pjt.pjttp_id,pj.pjt_time, cuo.cuo_id, cuo.cus_id, cuo.cus_parent,
        pj.pjt_how_required, pj.loc_id, pj.pjt_id FROM ctt_projects AS pj
        INNER JOIN ctt_projects_type AS pjt ON pjt.pjttp_id = pj.pjttp_id
        INNER JOIN ctt_customers_owner AS cuo ON cuo.cuo_id = pj.cuo_id
        WHERE pj.pjt_id= '$projId' LIMIT 1;";
        return $this->db->query($qry);
    }


// Listado de productos con subarrendo
public function listProductsSub($params)
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
                    (SELECT prd_stock-fun_buscarentas(pd.prd_sku) FROM ctt_products WHERE prd_id = pd.prd_id)
                ELSE 
                    (SELECT prd_stock-fun_buscarentas(pd.prd_sku) FROM ctt_products WHERE prd_id = pd.prd_id)
                END AS stock
        FROM ctt_products AS pd
        INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
        INNER JOIN ctt_subletting AS sbl ON sbl.prd_id = pd.prd_id
        WHERE (upper(pd.prd_name) LIKE '%$word%' OR upper(pd.prd_sku) LIKE '%$word%')
            AND pd.prd_status = 1 AND pd.prd_visibility = 1 AND sb.cat_id NOT IN (16)
            ORDER BY pd.prd_name;";
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
        // cambio ac.prd_id por prd_parent
    } else if($type == 'P') {
        $qry = "SELECT pr.*, sc.sbc_name, ct.cat_name 
                FROM ctt_products AS pr
                INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                WHERE prd_id = $prdId AND pr.prd_status = 1 AND sc.sbc_status = 1 AND ct.cat_status = 1
                    UNION
                SELECT pr.*, sc.sbc_name, ct.cat_name 
                FROM ctt_accesories AS ac
                INNER JOIN ctt_products AS pr ON pr.prd_id = ac.prd_parent  
                INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                WHERE ac.prd_parent = $prdId AND pr.prd_status = 1 AND sc.sbc_status = 1 AND ct.cat_status = 1;";
        return $this->db->query($qry);

    } else {
        $qry = "SELECT * FROM ctt_products WHERE prd_id = $prdId";
        return $this->db->query($qry);
    }
}


// ************************ Listado de stock del productos
public function stockProdcuts($params)
{

    $prdId = $this->db->real_escape_string($params['prdId']);

    $qry = "SELECT
                pr.prd_name, ifnull(pj.pjt_name,'') as pjt_name, sr.ser_sku, sr.ser_serial_number, 
                sr.ser_situation, ifnull(pe.pjtpd_day_start,'') as pjtpd_day_start, 
                ifnull(pe.pjtpd_day_end,'') as pjtpd_day_end, pr.prd_id 
            FROM ctt_series                 AS sr
            INNER JOIN ctt_products         AS pr ON pr.prd_id      = sr.prd_id
            LEFT JOIN ctt_projects_detail   AS pd ON pd.pjtdt_id    = sr.pjtdt_id
            LEFT JOIN ctt_projects_content  AS pc ON pc.pjtvr_id    = pd.pjtvr_id
            LEFT JOIN ctt_projects          AS pj ON pj.pjt_id      = pc.pjt_id
            LEFT JOIN ctt_projects_periods  AS pe ON pe.pjtdt_id    = sr.pjtdt_id
            WHERE sr.prd_id = $prdId;";
    return $this->db->query($qry);
} 


// ************************ Agrega Version
    public function SaveVersion($params)
    {
        $pjtId                  = $this->db->real_escape_string($params['pjtId']);
        $verCode                = $this->db->real_escape_string($params['verCode']);
        $discount                = $this->db->real_escape_string($params['discount']);

        $qry = "INSERT INTO ctt_version (ver_code, pjt_id, ver_discount_insured) 
                VALUES ('$verCode', $pjtId, $discount);";
        $this->db->query($qry);
        $result = $this->db->insert_id;
        return $result . '|' . $pjtId;
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


// Agrega Cotizaciones
    public function SaveBudget($params)
    {
        $bdg_prod_sku           = $params['bdgSku'];
        $bdg_prod_level         = $params['bdgLevel'];
        $bdg_section            = $params['bdgSection'];
        $bdg_prod_name          = str_replace('°','"',$params['bdgProduc']);
        /* $bdg_prod_name          = str_replace('¿','\'',$bdg_prod_name); */
        $bdg_prod_price         = $params['bdgPricBs'];
        $bdg_quantity           = $params['bdgQtysBs'];
        $bdg_days_base          = $params['bdgDaysBs'];
        $bdg_days_cost          = $params['bdgDaysCs'];
        $bdg_discount_base      = $params['bdgDescBs'];
        $bdg_discount_insured   = $params['bdgDescIn'];
        $bdg_days_trip          = $params['bdgDaysTp'];
        $bdg_discount_trip      = $params['bdgDescTp'];
        $bdg_days_test          = $params['bdgDaysTr'];
        $bdg_discount_test      = $params['bdgDescTr'];
        $bdg_insured            = $params['bdgInsured'];
        $bdg_order              = $params['bdgOrder'];
        $ver_id                 = $params['verId'];
        $prd_id                 = $params['prdId'];
        $pjtId                 = $params['pjtId'];

        $qry = "INSERT INTO ctt_budget (
                    bdg_prod_sku, bdg_prod_name, bdg_prod_price, bdg_prod_level, bdg_section, 
                    bdg_quantity, bdg_days_base, bdg_days_cost, bdg_discount_base, bdg_discount_insured, 
                    bdg_days_trip, bdg_discount_trip, bdg_days_test, bdg_discount_test,bdg_insured, 
                    bdg_order, ver_id, prd_id ) 
                VALUES (
                    '$bdg_prod_sku', REPLACE('$bdg_prod_name','\¿','\''),    
                    '$bdg_prod_price', '$bdg_prod_level', 
                    '$bdg_section',  '$bdg_quantity', 
                    '$bdg_days_base',  '$bdg_days_cost',           
                    '$bdg_discount_base', '$bdg_discount_insured',   
                    '$bdg_days_trip', '$bdg_discount_trip', 
                    '$bdg_days_test', '$bdg_discount_test', 
                    '$bdg_insured', '$bdg_order', 
                    '$ver_id', 
                    '$prd_id' );
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
        return $pjtId;
    }


// Agrega nuevo proyecto
    public function SaveProject($params,$name)
    {
        $cuo            = $this->db->real_escape_string($params['cuoId']);
        $cusId          = $this->db->real_escape_string($params['cusId']); 
        $cusParent      = $this->db->real_escape_string($params['cusParent']);
        $cuoId          = $cuo;

        if ($cuo == '0'){
            $qry01 = "INSERT INTO ctt_customers_owner (cus_id, cus_parent)
                        VALUES ($cusId, $cusParent);";

            $this->db->query($qry01);
            $cuoId = $this->db->insert_id;  
        }

        $pjt_name               = $this->db->real_escape_string($params['pjtName']); 
        $pjt_date_start         = $this->db->real_escape_string($params['pjtDateStart']);
        $pjt_date_end           = $this->db->real_escape_string($params['pjtDateEnd']); 
        $pjt_time               = $this->db->real_escape_string($params['pjtTime']); 
        $pjt_location           = $this->db->real_escape_string($params['pjtLocation']);
        $pjt_type               = $this->db->real_escape_string($params['pjtType']);
        $cuo_id                 = $cuoId;
        $loc_id                 = $this->db->real_escape_string($params['locId']);
        $pjttc_id               = $this->db->real_escape_string($params['pjttcId']);
        $pjt_parent             = $this->db->real_escape_string($params['pjtParent']);
        $pjt_status             = $this->db->real_escape_string($params['pjtStatus']);
        $pjt_how_required       = $this->db->real_escape_string($params['pjtHowRequired']);
        $pjt_trip_go            = $this->db->real_escape_string($params['pjtTripGo']);
        $pjt_trip_back          = $this->db->real_escape_string($params['pjtTripBack']);
        $pjt_to_carry_on        = $this->db->real_escape_string($params['pjtToCarryOn']);
        $pjt_to_carry_out       = $this->db->real_escape_string($params['pjtToCarryOut']);
        $pjt_test_tecnic        = $this->db->real_escape_string($params['pjtTestTecnic']);
        $pjt_test_look          = $this->db->real_escape_string($params['pjtTestLook']);
        $usr                    = $this->db->real_escape_string($params['usr']);
        $empid                  = $this->db->real_escape_string($params['empid']);
        $empname                = $this->db->real_escape_string($params['empname']);/* 
        $edos_id                = $this->db->real_escape_string($params['edos_id']); */

        $qry02 = "INSERT INTO ctt_projects (pjt_parent, pjt_name, pjt_date_start, pjt_date_end, pjt_time, pjt_location, pjt_status, 
                    pjt_how_required, pjt_trip_go, pjt_trip_back, pjt_to_carry_on, pjt_to_carry_out, pjt_test_tecnic, pjt_test_look,
                    pjttp_id, pjttc_id, cuo_id, loc_id) 
                 VALUES ('$pjt_parent', '$pjt_name', '$pjt_date_start', '$pjt_date_end', '$pjt_time', 
                    '$pjt_location', '$pjt_status', '$pjt_how_required', '$pjt_trip_go', '$pjt_trip_back',
                    '$pjt_to_carry_on', '$pjt_to_carry_out', '$pjt_test_tecnic', '$pjt_test_look',
                    '$pjt_type', $pjttc_id, $cuo_id, $loc_id);";
        $this->db->query($qry02);
        $pjtId = $this->db->insert_id;

        $pjt_number = 'P' . str_pad($pjtId, 4, "0", STR_PAD_LEFT);

        $qry03 = "UPDATE ctt_projects SET pjt_number = '$pjt_number'
                  WHERE pjt_id = $pjtId;";
        $this->db->query($qry03);

        $qry04 = "INSERT INTO ctt_who_attend_projects(pjt_id,usr_id,emp_id,emp_fullname,are_id)
                  VALUES ($pjtId,$usr,$empid,'$empname',1);";
        $this->db->query($qry04);

        $wtaId = $this->db->insert_id; 

        if ($loc_id == 2 || $loc_id == 4) { // *** Ed
            $qry5 = "UPDATE    ctt_locacion_estado
            SET    pjt_id            = '$pjtId'
            WHERE   pjt_id              =  '0';";
            $this->db->query($qry5); 
        }
       
        return $pjtId;

    }


// ******************* Actualiza los datos del proyecto
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
    $pjttc_id               = $this->db->real_escape_string($params['pjttcId']);
    $loc_id                 = $this->db->real_escape_string($params['locId']);
    $pjt_how_required       = $this->db->real_escape_string($params['pjtHowRequired']);
    $pjt_trip_go            = $this->db->real_escape_string($params['pjtTripGo']);
    $pjt_trip_back          = $this->db->real_escape_string($params['pjtTripBack']);
    $pjt_to_carry_on        = $this->db->real_escape_string($params['pjtToCarryOn']);
    $pjt_to_carry_out       = $this->db->real_escape_string($params['pjtToCarryOut']);
    $pjt_test_tecnic        = $this->db->real_escape_string($params['pjtTestTecnic']);
    $pjt_test_look          = $this->db->real_escape_string($params['pjtTestLook']);
	$edos_id                 = $this->db->real_escape_string($params['edos_id']);																																																								

    $qry02 = "UPDATE    ctt_projects
                 SET    pjt_name            = '$pjt_name', 
                        pjt_date_start      = '$pjt_date_start', 
                        pjt_date_end        = '$pjt_date_end',
                        pjt_time            = '$pjt_time',
                        pjt_location        = '$pjt_location', 
                        pjt_how_required    = '$pjt_how_required',
                        pjt_trip_go         = '$pjt_trip_go',
                        pjt_trip_back       = '$pjt_trip_back',
                        pjt_to_carry_on     = '$pjt_to_carry_on',
                        pjt_to_carry_out    = '$pjt_to_carry_out',
                        pjt_test_tecnic     = '$pjt_test_tecnic',
                        pjt_test_look       = '$pjt_test_look',
                        pjttp_id            = '$pjt_type',  
                        cuo_id              = '$cuo_id',
                        loc_id              = '$loc_id',
                        pjttc_id            = '$pjttc_id',
                        edos_id             = '$edos_id'
                WHERE   pjt_id              =  $pjt_id;
                ";
    $this->db->query($qry02);

    return $pjt_id;

}

// ************************ Promueve proyecto
public function saveBudgetList($params)
{
    $verId = $this->db->real_escape_string($params['verId']);

    $qry = "SELECT *, ucase(date_format(vr.ver_date, '%d-%b-%Y %H:%i')) as ver_date_real,
                CONCAT_WS(' - ' , date_format(pj.pjt_date_start, '%d-%b-%Y'), date_format(pj.pjt_date_end, '%d-%b-%Y')) as period
            FROM ctt_budget AS bg
            INNER JOIN ctt_version AS vr ON vr.ver_id = bg.ver_id
            INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
            INNER JOIN ctt_projects_type AS pt ON pt.pjttp_id = pj.pjttp_id
            INNER JOIN ctt_location AS lc ON lc.loc_id = pj.loc_id
            INNER JOIN ctt_products AS pd ON pd.prd_id = bg.prd_id
            INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
            INNER JOIN ctt_customers AS cu ON cu.cus_id = co.cus_id
            WHERE bg.ver_id =  $verId;";
    return $this->db->query($qry);
}


/** ==== PROMUEVE LA COTIZACION A PRESUPUESTO ==========================================================  */
/** ==== Proyecto ======================================================================================  */
    public function PromoteProject($params)
    {
        /* Actualiza el estado en 2 convirtiendolo en presupuesto  */
        $pjtId                  = $this->db->real_escape_string($params['pjtId']);
        $qry = "UPDATE ctt_projects SET pjt_status = '2' WHERE pjt_id = $pjtId;";
        $this->db->query($qry);

        return $pjtId;

    }

/** ==== Numero de version =============================================================================  */
    public function PromoteVersion($params)
    {
        $pjtId         = $this->db->real_escape_string($params['pjtId']);
        $verId         = $this->db->real_escape_string($params['verId']);

        $qry = "UPDATE ctt_version SET ver_status = 'R', ver_active = '1', ver_master = '1', ver_code = 'R0001' 
                WHERE ver_id = $verId;";
        return $this->db->query($qry);

    }

/** ==== Traslada cotización a nueva version del proyecto ==============================================  */
    public function SaveProjectContent($params){

        $verId        = $this->db->real_escape_string($params['verId']);

        $qry1 = "INSERT INTO ctt_projects_version (
                    pjtvr_prod_sku,  pjtvr_prod_name,  pjtvr_prod_price, pjtvr_prod_level,   pjtvr_section,  pjtvr_quantity, 
                    pjtvr_days_base, pjtvr_days_cost, pjtvr_discount_base, pjtvr_discount_insured, pjtvr_days_trip, pjtvr_discount_trip, 
                    pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, pjtvr_order, ver_id, prd_id, pjt_id)
                SELECT 
                    bg.bdg_prod_sku, bg.bdg_prod_name, bg.bdg_prod_price, bg.bdg_prod_level, bg.bdg_section, bg.bdg_quantity,  
                    bg.bdg_days_base, bg.bdg_days_cost, bg.bdg_discount_base, bg.bdg_discount_insured, bg.bdg_days_trip, bg.bdg_discount_trip,
                    bg.bdg_days_test, bg.bdg_discount_test, bg.bdg_insured, bg.bdg_order, bg.ver_id, bg.prd_id, vr.pjt_id 
                FROM ctt_budget AS bg
                INNER JOIN ctt_version AS vr ON vr.ver_id = bg.ver_id
                WHERE bg.ver_id = $verId ORDER BY bg.bdg_order asc;";
        $this->db->query($qry1);

        $qry2 = "INSERT INTO ctt_projects_content (
                    pjtcn_prod_sku, pjtcn_prod_name, pjtcn_prod_price, pjtcn_quantity, pjtcn_days_base, pjtcn_days_cost, pjtcn_discount_base, pjtcn_discount_insured, 
                    pjtcn_days_trip, pjtcn_discount_trip, pjtcn_days_test, pjtcn_discount_test, pjtcn_insured, pjtcn_prod_level, pjtcn_section, 
                    pjtcn_status, pjtcn_order, ver_id, prd_id, pjt_id, pjtvr_id)
                SELECT 
                    pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, pjtvr_quantity, pjtvr_days_base, pjtvr_days_cost, pjtvr_discount_base, pjtvr_discount_insured, 
                    pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test, pjtvr_discount_test, pjtvr_insured, pjtvr_prod_level, pjtvr_section, 
                    pjtvr_status, pjtvr_order, ver_id, prd_id, pjt_id, pjtvr_id
                FROM ctt_projects_version WHERE ver_id = $verId ORDER BY pjtvr_order;";

        return $this->db->query($qry2);

    }

    public function SaveLocations($params){
        $loc        = $this->db->real_escape_string($params['loc']);
        $edo        = $this->db->real_escape_string($params['edo']);
        $prjId        = $this->db->real_escape_string($params['prjId']);

        $qry1 = "INSERT INTO ctt_locacion_estado(
                    lce_location,  edos_id, pjt_id)
                VALUES('$loc','$edo','$prjId');";
        $this->db->query($qry1);

        return $loc;
    }

    
/** ==== Obtiene el contenido del proyecto =============================================================  */
    public function GetProjectContent($params)
    {
        $pjtId        = $this->db->real_escape_string($params['pjtId']);
        $verId        = $this->db->real_escape_string($params['verId']);

        $qry = "SELECT *               
            FROM ctt_projects_content AS pc
            INNER JOIN ctt_version AS vr ON vr.ver_id = pc.ver_id
            INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
            INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
            WHERE pc.ver_id = $verId;";
        return $this->db->query($qry);
    }

/** ==== Realiza los ajustes a las series, periodos y detalle del proyecto  ============================  */
    public function SettingSeries($params)
    {
        $pjetId   = $this->db->real_escape_string($params['pjetId']);  // este es el valor pjtvr_id
        $prodId   = $this->db->real_escape_string($params['prodId']);
        $dtinic   = $this->db->real_escape_string($params['dtinic']);
        $dtfinl   = $this->db->real_escape_string($params['dtfinl']);
        $detlId   = $this->db->real_escape_string($params['detlId']);

        $qry = "SELECT ser_id, ser_sku, (ser_reserve_count + 1) as ser_reserve_count  
                FROM ctt_series WHERE prd_id = $prodId 
                AND pjtdt_id = 0 LIMIT 1;";  // solo trae un registro
        $result =  $this->db->query($qry);
        
        $series = $result->fetch_object();
        if ($series != null){
            $serie  = $series->ser_id; 
            $sersku  = $series->ser_sku;
            $ser_reserve_count  = $series->ser_reserve_count; 

            $qry2 = "INSERT INTO ctt_projects_detail (
                pjtdt_belongs, pjtdt_prod_sku, ser_id, prd_id, pjtvr_id ) 
                VALUES ('$detlId', '$sersku', '$serie',  '$prodId',  '$pjetId'
                ); ";
            $this->db->query($qry2);
            $pjtdtId = $this->db->insert_id;

            $qry1 = "UPDATE ctt_series SET ser_situation = 'EA', ser_stage = 'R',
                        ser_reserve_count = $ser_reserve_count,
                        pjtdt_id = '$pjtdtId'
                    WHERE ser_id = $serie;";
            $this->db->query($qry1);

        } else {
            $serie  = null; 
            $sersku  = 'Pendiente' ;
            
            $qry2 = "INSERT INTO ctt_projects_detail (
                pjtdt_belongs, pjtdt_prod_sku, ser_id, prd_id, pjtvr_id ) 
                VALUES ('$detlId', '$sersku', '$serie',  '$prodId',  '$pjetId'
                ); ";

            $this->db->query($qry2);
            $pjtdtId = $this->db->insert_id;
        }

        $qry4 = "INSERT INTO ctt_projects_periods 
                    (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs ) 
                VALUES ('$dtinic', '$dtfinl', '$pjtdtId', '$detlId');";
        $this->db->query($qry4);

        return  $pjtdtId;
    }


    public function GetAccesories($params)
    {
        $prodId   = $this->db->real_escape_string($params['prodId']);
        $serId   = $this->db->real_escape_string($params['serId']);

        $qry = "SELECT ser_id FROM ctt_projects_detail 
                WHERE pjtdt_id = $serId LIMIT 1;";
        $result =  $this->db->query($qry);

        $locserid = $result->fetch_object();
        if ($locserid != null){
            $locser  = $locserid->ser_id; 
            
            $qry1 = "SELECT pr.prd_id,pr.prd_name,pr.prd_price 
            FROM ctt_products AS pr
            INNER JOIN ctt_accesories AS ac ON ac.ser_parent = pr.prd_id 
            WHERE ac.prd_parent = $prodId AND ac.prd_id=$locser;";
        } 

        return $this->db->query($qry1);
    }
// **************************
    public function GetProducts($params)
    {
        $prodId        = $this->db->real_escape_string($params);

        $qry = "SELECT pd.* , pk.pck_quantity
                FROM ctt_products_packages AS pk 
                INNER JOIN ctt_products AS pd ON pd.prd_id = pk.prd_id
                WHERE  pk.prd_parent = $prodId;";
        return $this->db->query($qry);

    }

// Actualiza las fechas del proyecto
public function UpdatePeriodProject($params)
    {
        $pjtId                  = $this->db->real_escape_string($params['pjtId']);
        $pjtDateStart           = $this->db->real_escape_string($params['pjtDateStart']);
        $pjtDateEnd             = $this->db->real_escape_string($params['pjtDateEnd']);
        $qry = "UPDATE ctt_projects 
                SET pjt_date_start   = '$pjtDateStart', 
                    pjt_date_end     = '$pjtDateEnd' 
                WHERE pjt_id = $pjtId;";
        $this->db->query($qry);

        return $pjtId;
    }

    // Listado los comentarios del proyecto
    public function listChangeProd($params)
        {
            $catsub = $this->db->real_escape_string($params['catsub']);

            $qry = "SELECT prd_id, prd_sku, prd_name FROM ctt_products 
                    WHERE substr(prd_sku,1,4)='$catsub' AND prd_level='P'
                    ORDER BY prd_id;";

            return $this->db->query($qry);
        }    
// **************************
    public function getExistTrip($params)
    {
        $pjtvrId    = $this->db->real_escape_string($params['pjtvrId']);
        $prdId      = $this->db->real_escape_string($params['prdId']);

        $qry = "SELECT COUNT(*) AS existrip 
                FROM ctt_budget
                WHERE bdg_days_trip<>0 AND ver_id=$pjtvrId";

        return $this->db->query($qry);
    } 
// **************************
    public function listReordering($params)
    {
        $verId      = $this->db->real_escape_string($params['verId']);

        $qry = "SELECT bdg_id, bdg_prod_sku,bdg_section,bdg_order
                FROM ctt_budget AS bg
                INNER JOIN ctt_subcategories AS sb 
                ON sb.cat_id=substr(bdg_prod_sku,1,2) AND sb.sbc_code=substr(bdg_prod_sku,3,2)
                LEFT JOIN ctt_category_subcategories AS cs ON cs.sbc_id = sb.sbc_id 
        		LEFT JOIN ctt_category_report AS cr ON cr.crp_id = cs.crp_id 
                WHERE ver_id=$verId
                GROUP BY bdg_id,bdg_prod_sku,bdg_section,bdg_order 
                ORDER BY bdg_section,sb.sbc_order_print,bdg_id, cr.crp_id, cs.cts_id, SUBSTR(bdg_prod_sku,1,4);"; // *** Ed

        $result =  $this->db->query($qry);
                
        return $this->db->query($qry);
    } 

    public function upReorderingProducts($params)
    {
        $valnew      = $this->db->real_escape_string($params['valnew']);
        $bdgid      = $this->db->real_escape_string($params['bdg_id']);

        $qry = "UPDATE ctt_budget SET bdg_order=$valnew
		        WHERE bdg_id=$bdgid;";
    
        return $this->db->query($qry);
    } 
    // eliminar locacion
    function DeleteLocation($params){
        $loc_id = $this->db->real_escape_string($params['loc_id']);
        $qry1 = "DELETE FROM ctt_locacion_estado 
        WHERE lce_id = '$loc_id';
        ";
        $this->db->query($qry1);
        return $loc_id;
    }

     /** ==== Obtiene el contenido del proyecto =============================================================  */
     public function GetContentDetails($params)
     {
         $pjtId        = $this->db->real_escape_string($params['pjtId']);
         $verId        = $this->db->real_escape_string($params['verId']);
 
         $qry = "SELECT pd.pjtdt_id, pd.pjtdt_prod_sku, pd.ser_id,
                         pd.prd_id, pd.pjtvr_id, pj.pjt_date_start,pc.pjtcn_days_base,
                         pc.pjtcn_days_trip, pc.pjtcn_days_test 
                 FROM ctt_projects_detail AS pd
                 INNER JOIN ctt_projects_content AS pc ON pc.pjtvr_id=pd.pjtvr_id
                 INNER JOIN ctt_projects AS pj ON pj.pjt_id=pc.pjt_id
                 WHERE pc.ver_id = $verId AND pd.ser_id>0; ";
         return $this->db->query($qry);
     }
 
     public function SettingSeriesAcc($params)
     {
         $pjtdtid   = $this->db->real_escape_string($params['pjtdtid']);
         $serId   = $this->db->real_escape_string($params['serid']);
         $prodId   = $this->db->real_escape_string($params['prodId']);
         $pjtvrid   = $this->db->real_escape_string($params['pjtvrid']);  // este es el valor pjtvr_id
         $dtinic   = $this->db->real_escape_string($params['dtinic']);
         $dtfinl   = $this->db->real_escape_string($params['dtfinl']);
     
         $qry = "SELECT count(ser_id) as ser_id  
                 FROM ctt_series WHERE prd_id_acc = $serId ;";  // solo trae un registro
         $result =  $this->db->query($qry);
         
         $series = $result->fetch_object();
         $countserie  = $series->ser_id; 
         if ($countserie != 0){
 
             $qry2 = "INSERT INTO ctt_projects_detail (
                 pjtdt_belongs, pjtdt_prod_sku, ser_id, prd_id, pjtvr_id )
                 SELECT '$pjtdtid', a.ser_sku, a.ser_id, a.prd_id, '$pjtvrid'
                 FROM ctt_series a WHERE a.prd_id_acc='$serId'; ";
             $this->db->query($qry2);
             $pjtdtId = $this->db->insert_id;
 
             $qry1 = "UPDATE ctt_series SET ser_situation = 'EA', ser_stage = 'R',
                         ser_reserve_count = ser_reserve_count + 1
                     WHERE prd_id_acc = $serId;";
             $this->db->query($qry1);
 
             $qry4 = "INSERT INTO ctt_projects_periods 
                         (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs ) 
                     SELECT '$dtinic','$dtfinl', dt.pjtdt_id, dt.pjtdt_belongs
                     FROM ctt_projects_detail dt 
                     INNER JOIN ctt_series sr ON sr.ser_id=dt.ser_id
                     WHERE sr.prd_id_acc=$serId;";
             $this->db->query($qry4);
 
         } 
 
         return  $pjtdtid;
     }
 
     public function SettingSeriesFUN($params)
     {
         $pjtId        = $this->db->real_escape_string($params['pjtId']);
         $verId        = $this->db->real_escape_string($params['verId']);
     
         $qry = "SELECT Fun_ProcessBackAccesories('$verId', '$pjtId') as bandsucess
                 FROM DUAL;";  // solo regresa un registro
         $result =  $this->db->query($qry);
         
         return  $result;
     }

     public function AddProcessCrontab($params)
     {
         $pjtId        = $this->db->real_escape_string($params['pjtId']);
         $verId        = $this->db->real_escape_string($params['verId']);
     
         $qry = "INSERT INTO prc_into_crontab(pjt_id, ver_id, prc_status) 
                    VALUES ($pjtId,$verId,0)";  

        $this->db->query($qry);
        $result = $this->db->insert_id;
         
         return  $result;
     }
}
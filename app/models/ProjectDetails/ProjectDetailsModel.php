<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectDetailsModel extends Model
{

    public function __construct()
    {
        parent::__construct();
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

    
// Listado de proyectos
    public function listProjects($params)
    {

        $qry = "SELECT pj.pjt_id, pj.pjt_number, pj.pjt_name,  DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project, 
                    DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
                    pj.pjt_location, pj.pjt_status, pj.cuo_id, pj.loc_id, co.cus_id, co.cus_parent, lo.loc_type_location,
                    pt.pjttp_name
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_status in (2,5) ORDER BY pj.pjt_id DESC;
                ";
        return $this->db->query($qry);
    }    


// Promueve proyecto
    public function saveProjectList($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qry = "SELECT *, ucase(date_format(pj.pjt_date_project, '%d-%b-%Y %H:%i')) as ver_date_real,
                    CONCAT_WS(' - ' , date_format(pj.pjt_date_start, '%d-%b-%Y'), date_format(pj.pjt_date_end, '%d-%b-%Y')) as period
                FROM ctt_projects_content AS pc
                INNER JOIN ctt_projects AS pj ON pj.pjt_id = pc.pjt_id
                INNER JOIN ctt_projects_type AS pt ON pt.pjttp_id = pj.pjttp_id
                INNER JOIN ctt_location AS lc ON lc.loc_id = pj.loc_id
                INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_customers AS cu ON cu.cus_id = co.cus_id
                WHERE pc.pjt_id = $pjtId";
        return $this->db->query($qry);
    }

// Listado de descuentos
    public function listDiscounts($params)
    {
        $level = $this->db->real_escape_string($params['level']);
        $qry = "SELECT * FROM ctt_discounts WHERE dis_level = $level ORDER BY dis_discount;";
        return $this->db->query($qry);
    }    
// Listado de claves de Relaciones
    public function listProjectsDef($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);

        $qry = "SELECT * FROM ctt_customers_owner WHERE cus_id = $cusId OR cus_parent = $cusId;";
        return $this->db->query($qry);
    }    

// Listado de contenido de projecto
    public function listBudgets($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $dstr = $this->db->real_escape_string($params['dstr']);
        $dend = $this->db->real_escape_string($params['dend']);

        $qry = "SELECT pc.*, pj.pjt_id, sb.sbc_name,
                date_format(pj.pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                date_format(pj.pjt_date_end, '%Y%m%d') AS pjt_date_end, pd.srv_id,
                CASE 
                    WHEN pjtcn_prod_level ='K' THEN 
                        (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = pc.prd_id)
                    WHEN pjtcn_prod_level ='P' THEN 
                        (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                        INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                        WHERE prd_id =  pc.prd_id
                        AND  pjtdt_id = 0 AND sr.ser_status = 1
                        )
                    ELSE 
                        (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                        INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                        WHERE prd_id =  pc.prd_id
                        AND  pjtdt_id = 0 AND sr.ser_status = 1
                        )
                    END AS bdg_stock
            FROM ctt_projects_content AS pc
            INNER JOIN ctt_projects AS pj ON pj.pjt_id = pc.pjt_id
            INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
            LEFT JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
            WHERE pc.pjt_id = $pjtId ORDER BY pc.pjtcn_id ASC;";
        return $this->db->query($qry);
    } 
    


// Listado de productos
    public function listProducts($params)
    {

        $word = $this->db->real_escape_string($params['word']);
        $dstr = $this->db->real_escape_string($params['dstr']);
        $dend = $this->db->real_escape_string($params['dend']);

        $qry = "SELECT pd.prd_id, pd.prd_sku, pd.prd_name, pd.prd_price, pd.prd_level, pd.prd_insured, pd.srv_id, sb.sbc_name,
                CASE 
                    WHEN prd_level ='K' THEN 
                        (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = pd.prd_id)
                    WHEN prd_level ='P' THEN 
                        (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                        INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                        WHERE prd_id =  pd.prd_id
                        AND  pjtdt_id = 0 AND sr.ser_status = 1
                        )
                    ELSE 
                        (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                        INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                        WHERE prd_id =  pd.prd_id
                        AND  pjtdt_id = 0 AND sr.ser_status = 1
                        )
                    END AS stock
            FROM ctt_products AS pd
            INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
            WHERE pd.prd_status = 1 AND pd.prd_visibility = 1 
                AND upper(pd.prd_name) LIKE '%$word%' OR upper(pd.prd_sku) LIKE '%$word%'
            ORDER BY pd.prd_name ;";
        return $this->db->query($qry);
    } 


// Obtiene el conteo de los productos faltantes
    public function counterPending($params){
        $pjtcnId = $this->db->real_escape_string($params['pjtcnId']);
        $prdId = $this->db->real_escape_string($params['prdId']);
        $quantity = $this->db->real_escape_string($params['quantity']);

        $qry = "SELECT '$pjtcnId' AS pjtcn_id, '$prdId' AS prd_id, '$quantity' AS qty, count(*) as pend
                FROM ctt_projects_detail 
                WHERE pjtcn_id = $pjtcnId
                AND pjtdt_prod_sku = 'Pendiente';";
        return $this->db->query($qry);
    }
 
// Actualiza las fechas del proyecto
    public function UpdatePeriodProject($params)
    {
        $pjtId                  = $this->db->real_escape_string($params['pjtId']);
        $pjtDateStart           = $this->db->real_escape_string($params['pjtDateStart']);
        $pjtDateEnd             = $this->db->real_escape_string($params['pjtDateEnd']);
        $qry = "UPDATE ctt_projects SET pjt_date_start = '$pjtDateStart', pjt_date_end = '$pjtDateEnd' WHERE pjt_id = $pjtId;";
        $this->db->query($qry);


        $qry1 = "UPDATE ctt_projects_periods 
                    SET pjtpd_day_start = '$pjtDateStart' 
                    WHERE pjtpd_day_start < '$pjtDateStart' 
                    AND pjtdt_id in (
                        SELECT pjtdt_id FROM ctt_projects_content AS pc
                        INNER JOIN ctt_projects_detail AS pd ON pd.pjtcn_id = pc.pjtcn_id
                        WHERE pjt_id = '$pjtId'
                    );";
        $this->db->query($qry1);

        $qry2 = " UPDATE ctt_projects_periods 
                    SET pjtpd_day_end = '$pjtDateEnd' 
                    WHERE pjtpd_day_end > '$pjtDateEnd' 
                    AND pjtdt_id in (
                        SELECT pjtdt_id FROM ctt_projects_content AS pc
                        INNER JOIN ctt_projects_detail AS pd ON pd.pjtcn_id = pc.pjtcn_id
                        WHERE pjt_id = '$pjtId'
                    );";

        $this->db->query($qry2);

        return $pjtId;
        
    }




// Incrementa la cantidad de un producto
    public function increaseQuantity($params)
    {

        $pjtcn_id       = $this->db->real_escape_string($params['pjtcn_id']);
        $pjtcn_quantity = $this->db->real_escape_string($params['pjtcn_quantity']);

        $qry = "UPDATE ctt_projects_content SET pjtcn_quantity = pjtcn_quantity + $pjtcn_quantity WHERE pjtcn_id = $pjtcn_id ";
        $this->db->query($qry);

        $qry1 = "   SELECT * FROM ctt_projects_content AS pj
                    INNER JOIN ctt_products AS pd ON pd.prd_id = pj.prd_id
                    WHERE pjtcn_id = $pjtcn_id; ";
        return $this->db->query($qry1);


    }

// Disminuye la cantidad de un producto
    public function decreaseQuantity($params)
    {

        $pjtcnId    = $this->db->real_escape_string($params['pjtcnid']);
        $pos        = $this->db->real_escape_string($params['pos']);

        $qry1 = "UPDATE ctt_projects_content SET pjtcn_quantity = pjtcn_quantity -1 WHERE pjtcn_id = $pjtcnId;";
        $this->db->query($qry1);

        $qry2 = "WITH elements AS (
                    SELECT *,
                        ROW_NUMBER() OVER (partition by prd_id ORDER BY pjtdt_prod_sku asc) AS reng
                    FROM ctt_projects_detail WHERE pjtcn_id = $pjtcnId ORDER BY pjtdt_prod_sku)
                SELECT pjtdt_id FROM elements WHERE reng = $pos;";
        $result =  $this->db->query($qry2);
        $res2 = $result;

        while($row = $result->fetch_assoc()){
            $pjtdtId = $row["pjtdt_id"];
            $qry3 = "UPDATE ctt_series 
                        SET ser_reserve_start = null, 
                            ser_reserve_end = null, 
                            ser_situation = 'D', 
                            ser_stage = 'D', 
                            pjtdt_id = 0 
                    WHERE   pjtdt_id = $pjtdtId;";
                    
            $this->db->query($qry3);

            $qry4 = "DELETE FROM ctt_projects_detail WHERE pjtdt_id = $pjtdtId;";
            $this->db->query($qry4);

        }
        return '1';

    }

    public function killProduct($params){
        $pjtcnId       = $this->db->real_escape_string($params["pjtcnid"]);

        $qr1 = "DELETE FROM ctt_projects_periods 
                WHERE pjtdt_id IN (
                    SELECT pjtdt_id FROM ctt_projects_detail 
                    WHERE pjtcn_id = $pjtcnId
                );";
        $this->db->query($qr1);

        $qr2 = "UPDATE ctt_series SET pjtdt_id=0, ser_reserve_count = ser_reserve_count-1 
                WHERE pjtdt_id in (
                    SELECT pjtdt_id FROM ctt_projects_detail 
                    WHERE pjtcn_id = $pjtcnId
                );";
        $this->db->query($qr2);

        $qr3 = "DELETE FROM ctt_projects_detail WHERE pjtcn_id = $pjtcnId;";
        $this->db->query($qr3);


        $qr4 = "DELETE FROM ctt_projects_content WHERE pjtcn_id = $pjtcnId;";
        return $this->db->query($qr4);
    }


    
// Lista los relacionados al producto
    public function listProductsRelated($params)
    {
        $pjtcnId       = $this->db->real_escape_string($params["pjtcnid"]);

        $qry = "SELECT pr.prd_id, pr.prd_sku, pj.pjtdt_prod_sku, pr.prd_name
                    , pr.prd_level
                    , ct.cat_name
                    , ROW_NUMBER() OVER (partition by pr.prd_sku ORDER BY sr.ser_sku desc) AS reng
                FROM ctt_projects_detail AS pj
                INNER JOIN ctt_products AS pr ON pr.prd_id = pj.prd_id
                INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
                INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
                LEFT JOIN ctt_series as sr ON sr.prd_id = pj.prd_id AND sr.pjtdt_id = pj.pjtdt_id
                WHERE pj.pjtcn_id = $pjtcnId order by pj.pjtdt_id;"; //order by reng, pr.prd_sku; ";
        return $this->db->query($qry);
    }
    
// Lista los relacionados al producto para periodos
    public function listProductsAsigned($params)
    {
        $pjtcnId        = $this->db->real_escape_string($params["pjtcnid"]);
        $prdId          = $this->db->real_escape_string($params["prdId"]);

        $qry = "SELECT 
                    pp.pjtpd_id
                , DATE_FORMAT(pp.pjtpd_day_start, '%Y%m%d') AS pjtpd_day_start
                , DATE_FORMAT(pp.pjtpd_day_end, '%Y%m%d') AS pjtpd_day_end
                , pd.pjtdt_id
                , pd.pjtdt_prod_sku
                , pd.ser_id
                , pd.prd_id
                , pd.pjtcn_id
                , pp.pjtpd_sequence
                FROM ctt_projects_periods AS pp
                INNER JOIN ctt_projects_detail AS pd ON pd.pjtdt_id = pp.pjtdt_id
                WHERE pd.pjtcn_id = '$pjtcnId' AND pd.prd_id = '$prdId'
                ORDER BY pd.pjtdt_prod_sku, pp.pjtpd_day_start, pp.pjtpd_sequence;
                ";
        return $this->db->query($qry);
    }
    
//  Lista los Projectos
    public function getProjectContent($pjtcn_id, $dayIni, $dayFnl){

        $pjtcn_id       = $this->db->real_escape_string($pjtcn_id);
        $dayIni         = $this->db->real_escape_string($dayIni);
        $dayFnl         = $this->db->real_escape_string($dayFnl);

        $qry = "   SELECT pc.*, pj.pjt_id, 
                        date_format(pj.pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                        date_format(pj.pjt_date_end, '%Y%m%d') AS pjt_date_end, pd.srv_id,
                        CASE 
                            WHEN pjtcn_prod_level ='K' THEN 
                                (SELECT count(*) FROM ctt_products_packages WHERE prd_parent = pc.prd_id)
                            WHEN pjtcn_prod_level ='P' THEN 
                                (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                                INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                                WHERE prd_id =  pc.prd_id
                                AND sr.pjtdt_id = 0
                                AND sr.ser_status = 1
                                )
                            ELSE 
                                (SELECT ifnull(SUM(stp_quantity),0) FROM ctt_series AS sr 
                                INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id 
                                WHERE prd_id =  pc.prd_id
                                AND sr.pjtdt_id = 0
                                AND sr.ser_status = 1
                                )
                            END AS bdg_stock
                    FROM ctt_projects_content AS pc
                    INNER JOIN ctt_projects AS pj ON pj.pjt_id = pc.pjt_id
                    INNER JOIN ctt_products AS pd ON pd.prd_id = pc.prd_id
                    WHERE pc.pjtcn_id = $pjtcn_id order by pc.pjtcn_id; ";

        return $this->db->query($qry);
    }


//  Agrega un nuevo producto
    public function addNewProductContent($params)
    {

        $pjtcn_prod_sku         = $this->db->real_escape_string($params['pjtcnProdSku']);
        $pjtcn_prod_name        = $this->db->real_escape_string($params['pjtcnProdName']);
        $pjtcn_prod_price       = $this->db->real_escape_string($params['pjtcnProdPrice']);
        $pjtcn_quantity         = $this->db->real_escape_string($params['pjtcnQuantity']);
        $pjtcn_days_base        = $this->db->real_escape_string($params['pjtcnDaysBase']);
        $pjtcn_discount_base    = $this->db->real_escape_string($params['pjtcnDiscountBase']);
        $pjtcn_days_trip        = $this->db->real_escape_string($params['pjtcnDaysTrip']);
        $pjtcn_discount_trip    = $this->db->real_escape_string($params['pjtcnDiscountTrip']);
        $pjtcn_days_test        = $this->db->real_escape_string($params['pjtcnDaysTest']);
        $pjtcn_discount_test    = $this->db->real_escape_string($params['pjtcnDiscountTest']);
        $pjtcn_insured          = $this->db->real_escape_string($params['pjtcnInsured']);
        $pjtcn_prod_level       = $this->db->real_escape_string($params['pjtcnProdLevel']);
        $prd_id                 = $this->db->real_escape_string($params['prdId']);
        $pjt_id                 = $this->db->real_escape_string($params['pjtId']);
        $dtinic                 = $this->db->real_escape_string($params['serReserveStart']);
        $dtfinl                 = $this->db->real_escape_string($params['serReserveEnd']);

        $qry = "INSERT INTO ctt_projects_content (
                    pjtcn_prod_sku,     pjtcn_prod_name,        pjtcn_prod_price,       pjtcn_quantity,
                    pjtcn_days_base,    pjtcn_discount_base,    pjtcn_days_trip,        pjtcn_discount_trip, 
                    pjtcn_days_test,    pjtcn_discount_test,    pjtcn_insured,          pjtcn_prod_level,
                    prd_id, pjt_id) 
                VALUES (
                    '$pjtcn_prod_sku',  '$pjtcn_prod_name',     '$pjtcn_prod_price',    '$pjtcn_quantity',
                    '$pjtcn_days_base', '$pjtcn_discount_base', '$pjtcn_days_trip',     '$pjtcn_discount_trip',
                    '$pjtcn_days_test', '$pjtcn_discount_test', '$pjtcn_insured',       '$pjtcn_prod_level',
                    '$prd_id','$pjt_id');
                ";

        $this->db->query($qry);
        $pjtcnId = $this->db->insert_id;

        return $pjtcnId;

    }

//  Actualiza los días y descuentos
    public function updateData($field, $pjtcnId, $data)
    {
        $qry = "UPDATE ctt_projects_content set $field = '$data' WHERE pjtcn_id = $pjtcnId;";
        return $this->db->query($qry);
    }
//  Actualiza los días y descuentos
    public function updatePeriods($field, $pjtcnId, $data)
    {
        $qry = "UPDATE ctt_projects_content set $field = '$data' WHERE pjtcn_id = $pjtcnId;";
        return $this->db->query($qry);
    }


//  Asigna las series y el detalle del producto agregado
    public function SettingSeries($params)
    {
        $prodId   = $this->db->real_escape_string($params['prodId']);
        $dtinic   = $this->db->real_escape_string($params['dtinic']);
        $dtfinl   = $this->db->real_escape_string($params['dtfinl']);
        $pjetId   = $this->db->real_escape_string($params['pjetId']);
        $detlId   = $this->db->real_escape_string($params['detlId']);

        $qry = "SELECT ser_id, ser_sku FROM ctt_series WHERE prd_id = $prodId 
                AND pjtdt_id = 0
                ORDER BY LEFT(RIGHT(ser_sku, 4),1) asc, ser_reserve_count asc LIMIT 1;";
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
            $sersku  = 'Pendiente';
        }

        
        $qry2 = "INSERT INTO ctt_projects_detail (
                    pjtdt_belongs, pjtdt_prod_sku, ser_id, prd_id, pjtcn_id
                ) VALUES (
                    '$detlId', '$sersku', '$serie',  '$prodId',  '$pjetId'
                );";

        $this->db->query($qry2);
        $pjtdtId = $this->db->insert_id;
        
        $qry3 = "INSERT INTO ctt_projects_periods (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs) 
                    VALUES 
                ('$dtinic', '$dtfinl', '$pjtdtId', '$detlId')";

        $this->db->query($qry3);
        

        if ( $serie != null){
            $qry4 = "UPDATE ctt_series 
                    SET 
                        pjtdt_id = '$pjtdtId'
                        WHERE ser_id = $serie;";
            $this->db->query($qry4);
        }
        return  $pjtdtId;
    }


//  Obtiene los accesorios relacionados
    public function GetAccesories($params)
    {
        $prodId = $this->db->real_escape_string($params);

        $qry = "SELECT pd.* FROM ctt_products AS pd
                INNER JOIN ctt_accesories AS ac ON ac.prd_id = pd.prd_id 
                WHERE ac.acr_parent = $prodId;";
        return $this->db->query($qry);

    }

    
//  Obtiene los productos del paquete
    public function GetProducts($params)
    {
        $prodId        = $this->db->real_escape_string($params);
        $qry = "SELECT pd.* 
                FROM ctt_products_packages AS pk 
                INNER JOIN ctt_products AS pd ON pd.prd_id = pk.prd_id
                WHERE  pk.prd_parent = $prodId;";
        return $this->db->query($qry);

    }


//  Obtiene los accesorios relacionados
    public function cancelProject($params)
    {
        $pjtId = $this->db->real_escape_string($params["pjtId"]);

        $qry = "UPDATE ctt_projects SET pjt_status = 3 WHERE  pjt_id = $pjtId;";
        $this->db->query($qry);

        return $pjtId ;

    }

//  Actualiza los rangos de periodos por serie
    public function settingRangePeriods($params)
    {
        $pjtdtId        = $this->db->real_escape_string($params['pjtdtId']);
        $sequenc        = $this->db->real_escape_string($params['sequenc']);
        $datestr        = $this->db->real_escape_string($params['datestr']);
        $dateend        = $this->db->real_escape_string($params['dateend']);

        $qry = "SELECT count(*) AS getway FROM ctt_projects_periods WHERE pjtdt_id = $pjtdtId AND pjtpd_sequence = $sequenc; ";
        $result =  $this->db->query($qry);
        $res = $result->fetch_object(); 

        $setKey  = $res->getway; 

        if ($setKey == '0'){
            $qrr = "INSERT INTO ctt_projects_periods 
                        (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs, pjtpd_sequence)
                    SELECT 
                        '$datestr' as pjtpd_day_start
                        , '$dateend' as pjtpd_day_end 
                        , pjtdt_id
                        , pjtdt_belongs
                        , '$sequenc' as pjtpd_sequence
                    FROM ctt_projects_periods WHERE (pjtdt_id = $pjtdtId OR pjtdt_belongs = $pjtdtId) AND pjtpd_sequence = 1  ;";
            $this->db->query($qrr);
        } else {
            $qrr = "UPDATE ctt_projects_periods 
                    SET 
                        pjtpd_day_start = '$datestr',
                        pjtpd_day_end = '$dateend' 
                    WHERE (pjtdt_id = $pjtdtId OR pjtdt_belongs = $pjtdtId) AND pjtpd_sequence = $sequenc;";
            $this->db->query($qrr);
        }

        return $setKey;

    }

//  Actualiza los rangos de periodos por serie
    public function deleteRangePeriods($params)
    {
        $pjtdtId        = $this->db->real_escape_string($params['pjtdtId']);
        $sequenc        = $this->db->real_escape_string($params['sequenc']);

        $qry = "DELETE FROM ctt_projects_periods WHERE (pjtdt_id = $pjtdtId OR pjtdt_belongs = $pjtdtId) AND pjtpd_sequence > $sequenc;";
        return $this->db->query($qry);


    }

}
<?php
defined('BASEPATH') or exit('No se permite acceso directo');
require( ROOT . PATH_ASSETS.  'ssp.class.php' );

class ProductsModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }


// Listado de categorias  ****
    public function listCategories()
    {
        $qry = "SELECT cat_id, cat_name FROM ctt_categories WHERE cat_status = 1;";
        return $this->db->query($qry);
    }

// Listado de categorias
    public function listSubcategories()
    {
        $qry = "SELECT cat_id, sbc_id, sbc_name, sbc_code FROM ctt_subcategories WHERE sbc_status = 1;";
        return $this->db->query($qry);
    }

// Listado de servicios
    public function listServices()
    {
        $qry = "SELECT srv_id, srv_name, srv_description FROM ctt_services WHERE srv_status = 1;";
        return $this->db->query($qry);
    }

// Listado de tipos de moneda
    public function listCoins()
    {
        $qry = "SELECT * FROM ctt_coins WHERE cin_status = 1;";
        return $this->db->query($qry);
    }


// Listado de fichas técnicas
    public function listDocument()
    {
        $qry = "SELECT doc_id, doc_name FROM ctt_documents WHERE dot_id = 2;";
        return $this->db->query($qry);
    }

    
// Listado de facturas
public function listInvoice()
{
    $qry = "SELECT doc_id, doc_name FROM ctt_documents WHERE dot_id IN (1,4,5) order by doc_name;";
    return $this->db->query($qry);
}

// Obtiene el siguiente SKU
    public function getNextSku($sbcId)
    {
        $qry = "SELECT ifnull(max(convert(substring(prd_sku,5,3), signed integer)),0) + 1 AS next
                FROM ctt_products  WHERE sbc_id = $sbcId;";
        return $this->db->query($qry);
    }


// Obtiene la lista de productos
    public function tableProducts($params)
    {

        $table = 'ctt_vw_products';  
        $primaryKey = 'producid';
        $catId= $this->db->real_escape_string($params['catId']);
        $filter = $this->db->real_escape_string($params['filter']) == '0' ? "'P','A'" : "'P'";
        // writeToConsole($table);

        $where =  "cat_id =" . $catId . " AND prodtype in (" . $filter . ")"; 

        $columns = array(
            array( 'db' => 'editable', 'dt' => 'editable' ),
            array( 'db' => 'producid', 'dt' => 'producid' ),
            array( 'db' => 'produsku', 'dt' => 'produsku' ),
            array( 'db' => 'prodname', 'dt' => 'prodname' ),
            array( 'db' => 'prodpric', 'dt' => 'prodpric' ),
            array( 'db' => 'prodqtty', 'dt' => 'prodqtty' ),
            array( 'db' => 'prodtype', 'dt' => 'prodtype' ),
            array( 'db' => 'typeserv', 'dt' => 'typeserv' ),
            array( 'db' => 'prodcoin', 'dt' => 'prodcoin' ),
            array( 'db' => 'prddocum', 'dt' => 'prddocum' ),
            array( 'db' => 'subcateg', 'dt' => 'subcateg' ),
            array( 'db' => 'categori', 'dt' => 'categori' ),
            array( 'db' => 'prodengl', 'dt' => 'prodengl' ),
            array( 'db' => 'prdcomme', 'dt' => 'prdcomme' )
        );

        $sql_details = array(
            'user' => USER,
            'pass' => PASSWORD,
            'db'   => DB_NAME,
            'host' => HOST,
            'charset' => 'utf8',
        );

        return json_encode(
            SSP::complex( $_POST, $sql_details, $table, $primaryKey, $columns, null, $where )
        );
    }

    public function writeToConsole($dt)
    {
        $console = $dt;
        if (is_array($console)){
            $console = implode(',', $console);
        }
        echo "<script>console.log('console: " . $console . "') </script>";
    }


// Listado de Productos
    public function listProducts($params)
    {
        $catId = $this->db->real_escape_string($params['catId']);
        $grp = $this->db->real_escape_string($params['grp']);
        $num = $this->db->real_escape_string($params['num']);

        $qry = "SELECT 
                    p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, 
                    CASE 
                        WHEN p.prd_level IN ('P','A') THEN  ifnull(sum(sp.stp_quantity),0)
                        ELSE 0 
                    END AS quantity, 
                    p.prd_price, cn.cin_code AS prd_coin_type,  p.prd_english_name, p.prd_level, IFNULL(dt.doc_id, 0) AS doc_id, dt.doc_name, ct.cat_id,
                    sv.srv_name, p.prd_comments
                FROM  ctt_products AS p
                INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
                INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id  AND ct.cat_status = 1
                INNER JOIN ctt_services             AS sv ON sv.srv_id = p.srv_id   AND sv.srv_status = 1
                LEFT JOIN ctt_series                AS sr ON sr.prd_id = p.prd_id
                LEFT JOIN ctt_stores_products       AS sp ON sp.ser_id = sr.ser_id
                LEFT JOIN ctt_coins                 AS cn ON cn.cin_id = p.cin_id
                LEFT JOIN ctt_products_documents    AS dc ON dc.prd_id = p.prd_id  AND dc.dcp_source = 'P'
                LEFT JOIN ctt_documents 			AS dt ON dt.doc_id = dc.doc_id AND dt.dot_id = 2  
                WHERE prd_status = 1 AND p.prd_level IN ('A', 'P') AND ct.cat_id = $catId AND p.prd_visibility=1
                GROUP BY p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, p.prd_price, p.prd_coin_type, p.prd_english_name 
                ORDER BY p.prd_sku ;";
        return $this->db->query($qry);
    }
    public function listProducts2()
    {
        $qry = "SELECT prd_id,prd_sku,prd_name 
                FROM ctt_products as A WHERE A.prd_visibility=1 AND A.prd_level='P';";
        return $this->db->query($qry);
    }
    
    // Listado de Productos
    public function listSeries($params)
    {
        $prodId = $this->db->real_escape_string($params['prdId']);
        $qry = "SELECT DISTINCT se.ser_id , se.ser_sku, se.ser_serial_number, se.ser_cost
                    , date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry
                    , se.ser_situation , se.ser_stage
                    , CASE WHEN se.ser_behaviour = 'R' THEN 'SUBABRRENDADO' ELSE '' END comportamiento
                    , se.ser_comments, pd.prd_sku, pd.prd_name, pd.prd_id, sp.stp_quantity, st.str_name
                    , ifnull(dc.doc_id,0) AS doc_id, dc.doc_name, dc.dot_id, se.ser_brand,se.ser_cost_import
                    , ser_import_petition, ser_no_econo
                FROM ctt_series as se
                INNER JOIN ctt_products AS pd ON pd.prd_id = se.prd_id 
                LEFT JOIN ctt_stores_products AS sp ON sp.ser_id = se.ser_id
                LEFT JOIN ctt_stores As st ON st.str_id = sp.str_id 
                LEFT JOIN ctt_products_documents AS dt ON dt.prd_id = se.ser_id
                LEFT JOIN ctt_documents AS dc ON dc.doc_id = dt.doc_id
                WHERE se.prd_id IN ($prodId) AND sp.stp_quantity > 0
                ORDER BY se.prd_id, se.ser_sku;";
        return $this->db->query($qry);
    }


// Obtiene datos del producto selecionado
    public function getSelectProduct($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $qry = "SELECT pr.*, 
                    ifnull((
                            SELECT dt.doc_id FROM ctt_products_documents AS dc 
                            LEFT JOIN ctt_documents AS dt ON dt.doc_id = dc.doc_id AND  dt.dot_id = 2
                            WHERE  dt.dot_id = 2 AND dc.prd_id = pr.prd_id
                            ),0) AS docum, 
                    ifnull((
                            SELECT dc.dcp_id FROM ctt_products_documents AS dc 
                            LEFT JOIN ctt_documents AS dt ON dt.doc_id = dc.doc_id AND  dt.dot_id = 2
                            WHERE  dt.dot_id = 2 AND dc.prd_id = pr.prd_id
                            ),0) AS documId
                FROM ctt_products AS pr
                WHERE pr.prd_id = $prdId limit 1;";

        return $this->db->query($qry);
    }


// Obtiene datos de la serie selecionada
    public function getSelectSerie($params)
    {
        $serId = $this->db->real_escape_string($params['serId']);
        $qry = "SELECT sr.ser_id, sr.ser_sku, sr.ser_serial_number, 
                date_format(sr.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
                sp.sup_business_name, sr.ser_cost, sr.ser_comments, 
                ifnull(dc.doc_id,0) As doc_id, dc.doc_name, dt.dot_id, dt.dot_name, 
                ds.dcp_source, ifnull(ds.dcp_id,0) AS dcp_id,sr.ser_brand,
                sr.ser_cost_import, sr.ser_import_petition, sr.ser_no_econo, sr.cin_id
                FROM ctt_series AS sr
                LEFT JOIN ctt_products_documents AS ds ON ds.prd_id = sr.ser_id
                LEFT JOIN ctt_documents AS dc ON dc.doc_id = ds.doc_id
                LEFT JOIN ctt_documents_type AS dt ON dt.dot_id = dc.dot_id AND dt.dot_id = 1
                LEFT JOIN ctt_suppliers AS sp on sp.sup_id = sr.sup_id
                WHERE sr.ser_id = $serId ORDER BY dcp_id DESC LIMIT 1;";
        return $this->db->query($qry);
    }


// Guarda los cambios de un producto
    public function saveEdtProduct($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $prdNm = $this->db->real_escape_string($params['prdNm']);
        $prdSk = $this->db->real_escape_string($params['prdSk']);
        $prdMd = $this->db->real_escape_string($params['prdMd']);
        $prdPr = $this->db->real_escape_string($params['prdPr']);
        $prdEn = $this->db->real_escape_string($params['prdEn']);
        $prdCd = $this->db->real_escape_string($params['prdCd']);
        $prdNp = $this->db->real_escape_string($params['prdNp']);
        $prdCm = $this->db->real_escape_string($params['prdCm']);
        $prdVs = $this->db->real_escape_string($params['prdVs']);
        $prdLv = $this->db->real_escape_string($params['prdLv']);
        $prdLn = $this->db->real_escape_string($params['prdLn']);
        $prdAs = $this->db->real_escape_string($params['prdAs']);
        $prdSb = $this->db->real_escape_string($params['prdSb']);
        $prdCn = $this->db->real_escape_string($params['prdCn']);
        $prdSv = $this->db->real_escape_string($params['prdSv']);
        $prdDc = $this->db->real_escape_string($params['prdDc']);
        $prdDi = $this->db->real_escape_string($params['prdDi']);

        $qry = "UPDATE ctt_products
                SET
                        prd_sku             = UPPER('$prdSk'),
                        prd_name            = UPPER('$prdNm'),
                        prd_english_name    = UPPER('$prdEn'),
                        prd_code_provider   = UPPER('$prdCd'),
                        prd_name_provider   = UPPER('$prdNp'),
                        prd_model           = UPPER('$prdMd'),
                        prd_price           = UPPER('$prdPr'),
                        prd_visibility      = UPPER('$prdVs'),
                        prd_comments        = UPPER('$prdCm'),
                        prd_lonely          = UPPER('$prdLn'),
                        prd_insured         = UPPER('$prdAs'),
                        sbc_id              = UPPER('$prdSb'),
                        srv_id              = UPPER('$prdSv'),
                        cin_id              = UPPER('$prdCn')
                WHERE   prd_id              = '$prdId';";
        $this->db->query($qry);

            if ($prdDi == '0' && $prdDc > '0' ){
                $qry1 = "INSERT INTO ctt_products_documents 
                            (dcp_source, prd_id, doc_id) 
                        VALUES
                            ('P', '$prdId', '$prdDc')
                        ";
                        $this->db->query($qry1);
                        $prdDc = $this->db->insert_id;

            } elseif($prdDi > '0' && $prdDc > '0'){
                $qry1 = "UPDATE ctt_products_documents 
                         SET  doc_id = '$prdDc'
                         WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);

            } elseif ($prdDi > '0' && $prdDc == '0'){
                $qry1 = "DELETE FROM ctt_products_documents 
                         WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);
            } 
            
        return $prdId .'|'. $prdDc;
    }



// Guarda los cambios de una serie
public function saveEdtSeries($params)
{
    $serId = $this->db->real_escape_string($params['serId']);
    $serSr = $this->db->real_escape_string($params['serSr']);
    $serDt = $this->db->real_escape_string($params['serDt']);
    $serCm = $this->db->real_escape_string($params['serCm']);
    $serDi = $this->db->real_escape_string($params['serDi']);
    $serBr = $this->db->real_escape_string($params['serBr']);
    $serNp = $this->db->real_escape_string($params['serNp']);
    $serCi = $this->db->real_escape_string($params['serCi']);
    $serNe = $this->db->real_escape_string($params['serNe']);
    $serDc = $this->db->real_escape_string($params['serDc']);
   
    $qry = "UPDATE ctt_series
            SET ser_serial_number   = UPPER('$serSr'),
                ser_date_registry   = '$serDt',
                ser_brand           = UPPER('$serBr'),
                ser_import_petition = UPPER('$serNp'),
                ser_cost_import     = UPPER('$serCi'),
                ser_no_econo        = UPPER('$serNe'),
                ser_comments        = UPPER('$serCm')
            WHERE ser_id  = '$serId';";
    $this->db->query($qry);

        if ($serDi == '0' && $serDc > '0' ){
            $qry1 = "INSERT INTO ctt_products_documents 
                        (dcp_source, prd_id, doc_id) 
                    VALUES
                        ('S', '$serId', '$serDc')
                    ";
                    $this->db->query($qry1);
                    $serDc = $this->db->insert_id;

        } elseif($serDi > '0' && $serDc > '0'){
            $qry1 = "UPDATE ctt_products_documents 
                     SET  doc_id = '$serDc'
                     WHERE dcp_id = '$serDi';
                    ";
                    $this->db->query($qry1);

        } elseif ($serDi > '0' && $serDc == '0'){
            $qry1 = "DELETE FROM ctt_products_documents 
                     WHERE dcp_id = '$serDi';
                    ";
                    $this->db->query($qry1);
        } 
        
    return $serId .'|'. $serDc;
}


// Guarda nuevo producto
    public function saveNewProduct($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $prdNm = $this->db->real_escape_string($params['prdNm']);
        $prdSk = $this->db->real_escape_string($params['prdSk']);
        $prdMd = $this->db->real_escape_string($params['prdMd']);
        $prdPr = $this->db->real_escape_string($params['prdPr']);
        $prdEn = $this->db->real_escape_string($params['prdEn']);
        $prdCd = $this->db->real_escape_string($params['prdCd']);
        $prdNp = $this->db->real_escape_string($params['prdNp']);
        $prdCm = $this->db->real_escape_string($params['prdCm']);
        $prdVs = $this->db->real_escape_string($params['prdVs']);
        $prdLv = $this->db->real_escape_string($params['prdLv']);
        $prdLn = $this->db->real_escape_string($params['prdLn']);
        $prdAs = $this->db->real_escape_string($params['prdAs']);
        $prdCt = $this->db->real_escape_string($params['prdCt']);
        $prdSb = $this->db->real_escape_string($params['prdSb']);
        $prdCn = $this->db->real_escape_string($params['prdCn']);
        $prdSv = $this->db->real_escape_string($params['prdSv']);
        $prdDc = $this->db->real_escape_string($params['prdDc']);
        $prdDi = $this->db->real_escape_string($params['prdDi']);
        $prdSt = '1';
        $NxtId ='';

        if ($prdLv == 'P'){

            $NxtId = "SELECT ifnull(max(convert(substring(prd_sku,5,3), signed integer)),0) + 1 AS next
                FROM ctt_products  WHERE sbc_id = $prdSb;";
            $rss = $this->db->query($NxtId);

            if ($row = $rss->fetch_row()) {
                $skires = trim($row[0]);
                $NxtId = str_pad($skires, 3, "0", STR_PAD_LEFT);
            }
        }
        
        $prdSk .=  $NxtId ;

        $qry = "INSERT INTO ctt_products (
                    prd_sku, prd_name, prd_english_name, prd_code_provider, prd_name_provider, 
                    prd_model, prd_price, prd_visibility, prd_comments, prd_level, prd_lonely, 
                    prd_insured, sbc_id, srv_id, cin_id, prd_status) 
                VALUES (
                    '$prdSk', UPPER('$prdNm'), UPPER('$prdEn'), UPPER('$prdCd'), UPPER('$prdNp'), 
                    UPPER('$prdMd'), '$prdPr', '$prdVs', UPPER('$prdCm'), '$prdLv', 
                    '$prdLn', '$prdAs', '$prdSb', '$prdSv', '$prdCn', '$prdSt'
                );";
        $this->db->query($qry);
        $prdId = $this->db->insert_id;

            if ($prdDi == '0'&& $prdDc > '0' ){
                $qry1 = "INSERT INTO ctt_products_documents 
                            (dcp_source, prd_id, doc_id) 
                        VALUES
                            ('P', '$prdId', '$prdDc')
                        ";
                        $this->db->query($qry1);

            } elseif($prdDi > '0' && $prdDc > '0'){
                $qry1 = "UPDATE ctt_products_documents 
                        SET  doc_id = '$prdDc'
                        WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);

            } elseif ($prdDi > '0' && $prdDc == '0'){
                $qry1 = "DELETE FROM ctt_products_documents 
                        WHERE dcp_id = '$prdDi';
                        ";
                        $this->db->query($qry1);
            } 
            return  $prdCt;
    }

// Guarda nuevo producto
    public function deleteProduct($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $qry1 = "UPDATE ctt_products SET prd_status = '0' WHERE prd_id = $prdId; ";
        $this->db->query($qry1);
        
        $qry2 = "UPDATE ctt_series SET ser_status = '0' WHERE prd_id = $prdId; ";
        $this->db->query($qry2);

        $qry3 = "UPDATE ctt_stores_products AS sp
                INNER JOIN  ctt_series AS sr ON sr.ser_id = sp.ser_id
                SET sp.stp_quantity = 0
                WHERE sr.prd_id = $prdId; ";
        $this->db->query($qry3);
        
        return $prdId;
    }

    
// Guarda nuevo producto
    public function deleteSerie($params)
    {
        $serId = $this->db->real_escape_string($params['serId']);
        $prdId = $this->db->real_escape_string($params['prdId']);

        $qry1 = "UPDATE ctt_series SET ser_status = '0' WHERE ser_id = $serId;";
        $this->db->query($qry1);

        $qry2 = "UPDATE ctt_stores_products SET stp_quantity = 0 WHERE ser_id = $serId;";
        $this->db->query($qry2);

        return $serId.'|'.$prdId;
    }

    public function maxAccesorio($params)
    {
        $prdsku = $this->db->real_escape_string($params['prdsku']);

        $qry = "SELECT '$prdsku' as prdsku, fun_buscamaxacc('$prdsku') AS maxacc FROM DUAL;";
        return $this->db->query($qry);
 
    }
}


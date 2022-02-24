<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class CustomersModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }


// Listado de categorias
    public function listCustomers()
    {
        $qry = "SELECT * FROM ctt_customers as cus
                INNER JOIN ctt_customers_type as ct ON cus.cut_id = ct.cut_id
                ORDER BY cus_id desc LIMIT 10;";
        return $this->db->query($qry);
    }

    // Obtiene datos del producto selecionado
    public function getSelectCustomer($params)
    {
        $prdId = $this->db->real_escape_string($params['prdId']);
        $qry = "SELECT * FROM ctt_customers AS cus
                INNER JOIN ctt_customers_type AS ct ON cus.cut_id = ct.cut_id
                WHERE cus.cus_id = $prdId limit 1;";

        return $this->db->query($qry);
    }


// Listado de fichas técnicas
    public function listCustType()
    {
        $qry = "SELECT * FROM ctt_customers_type;";
        return $this->db->query($qry);
    }

    
// Listado de facturas
public function listScores()
{
    $qry = "SELECT scr_id, scr_values, scr_description FROM ctt_scores;";
    return $this->db->query($qry);
}

// Obtiene el siguiente SKU
    public function getNextSku($sbcId)
    {
        $qry = "SELECT ifnull(max(convert(substring(prd_sku,5,3), signed integer)),0) + 1 AS next
                FROM ctt_products  WHERE sbc_id = $sbcId;";
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
                WHERE prd_status = 1 AND p.prd_level IN ('A', 'P') AND ct.cat_id = $catId
                GROUP BY p.prd_id, p.prd_sku, p.prd_name, ct.cat_name, sc.sbc_name, sv.srv_name, p.prd_price, p.prd_coin_type, p.prd_english_name 
                ORDER BY p.prd_sku ;";
        return $this->db->query($qry);
    }


// Guarda los cambios de un producto
    public function saveEditCustomer($params)
    {
        $cusId =    $this->db->real_escape_string($params['cusId']);
        $cusName =  $this->db->real_escape_string($params['cusName']);
        $cusCont =  $this->db->real_escape_string($params['cusCont']);
        $cusAdrr =  $this->db->real_escape_string($params['cusAdrr']);
        $cusEmail = $this->db->real_escape_string($params['cusEmail']);
        $cusRFC = $this->db->real_escape_string($params['cusRFC']);
        $cusPhone = $this->db->real_escape_string($params['cusPhone']);
        $cusPhone2 = $this->db->real_escape_string($params['cusPhone2']);
        $cusICod = $this->db->real_escape_string($params['cusICod']);
        $cusQualy = $this->db->real_escape_string($params['cusQualy']);
        $cusProsp = $this->db->real_escape_string($params['cusProsp']);
        $cusStat = $this->db->real_escape_string($params['cusStat']);
        $cusSpon = $this->db->real_escape_string($params['cusSpon']);
        $TypeProd = $this->db->real_escape_string($params['TypeProd']);
        $cusLegalR = $this->db->real_escape_string($params['cusLegalR']);
        $cusLegalA = $this->db->real_escape_string($params['cusLegalA']);
        $cusContr = $this->db->real_escape_string($params['cusContr']);

 
            $qry = "UPDATE ctt_customers 
                        SET cus_name=       UPPER('$cusName'),
                        cus_contact=        UPPER('$cusCont'),
                        cus_address=        UPPER('$cusAdrr'),
                        cus_email=              ('$cusEmail'),
                        cus_rfc=            UPPER('$cusRFC'),
                        cus_phone=              ('$cusPhone'),
                        cus_phone_2=            ('$cusPhone2'),
                        cus_internal_code=  UPPER('$cusICod'),
                        cus_qualification=  UPPER('$cusQualy'),
                        cus_prospect=       UPPER('$cusProsp'),
                        cus_sponsored=      UPPER('$cusSpon'),
                        cus_legal_representative=UPPER('$cusLegalR'),
                        cus_legal_act=      UPPER('$cusLegalA'),
                        cus_contract=       UPPER('$cusContr'),
                        cut_id=                 ('$TypeProd'),
                        cus_status=             ('$cusStat') 
                        WHERE cus_id ='$cusId';";

        $this->db->query($qry);
        return $cusId;
       /* $qry = "UPDATE ctt_products
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
     */
            /* if ($prdDi == '0'&& $prdDc > '0' ){
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
            
 */
    }



// Guarda los cambios de una serie
public function saveEdtSeries($params)
{
    $serId = $this->db->real_escape_string($params['serId']);
    $serSr = $this->db->real_escape_string($params['serSr']);
    $serDt = $this->db->real_escape_string($params['serDt']);
    $serCm = $this->db->real_escape_string($params['serCm']);
    $serDi = $this->db->real_escape_string($params['serDi']);
    $serDc = $this->db->real_escape_string($params['serDc']);
   
    $qry = "UPDATE ctt_series
            SET
                    ser_serial_number   = UPPER('$serSr'),
                    ser_date_registry   = '$serDt',
                    ser_comments        = UPPER('$serCm')
            WHERE   ser_id              = '$serId';";
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

        } elseif ($prdDi > '0' && $serDc == '0'){
            $qry1 = "DELETE FROM ctt_products_documents 
                     WHERE dcp_id = '$serDi';
                    ";
                    $this->db->query($qry1);
        } 
        
    return $serId .'|'. $serDc;
}


// Guarda nuevo producto
    public function saveNewCustomer($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);
        $cusName = $this->db->real_escape_string($params['cusName']);
        $cusCont = $this->db->real_escape_string($params['cusCont']);
        $cusAdrr = $this->db->real_escape_string($params['cusAdrr']);
        $cusEmail = $this->db->real_escape_string($params['cusEmail']);
        $cusRFC = $this->db->real_escape_string($params['cusRFC']);
        $cusPhone = $this->db->real_escape_string($params['cusPhone']);
        $cusPhone2 = $this->db->real_escape_string($params['cusPhone2']);
        $cusICod = $this->db->real_escape_string($params['cusICod']);
        $cusQualy = $this->db->real_escape_string($params['cusQualy']);
        $cusProsp = $this->db->real_escape_string($params['cusProsp']);
        $cusSpon = $this->db->real_escape_string($params['cusSpon']);
        $cusLegalR = $this->db->real_escape_string($params['cusLegalR']);
        $cusLegalA = $this->db->real_escape_string($params['cusLegalA']);
        $cusContr = $this->db->real_escape_string($params['cusContr']);
        $cusStat = $this->db->real_escape_string($params['cusStat']);
      
        $qry="INSERT INTO ctt_customers(cus_id, cus_name, cus_contact, cus_address, cus_email, cus_rfc, 
                cus_phone, cus_phone_2, cus_internal_code, cus_qualification, cus_prospect, cus_sponsored, 
                cus_legal_representative, cus_legal_act, cus_contract, cut_id, cus_status) 
                VALUES ('', UPPER('$cusName'),UPPER('$cusCont'),UPPER('$cusAdrr'),'$cusEmail',UPPER('$cusRFC'),
                '$cusPhone','$cusPhone2',UPPER('$cusICod'),'$cusQualy','$cusProsp','$cusSpon',
                '$cusLegalR','$cusLegalA','$cusContr',0,'$cusStat') ;";

        $this->db->query($qry);
        $prdId = $this->db->insert_id;

        $cusId = $prdId;

        $qr2 = "UPDATE ctt_customers SET cus_fill = (
            WITH fields AS (
                SELECT 'cus_name' as concepto,    coalesce(LENGTH(cus_name)     < 1, 1, 0) as emptyField FROM ctt_customers WHERE cus_id = $cusId UNION
                SELECT 'cus_address' as concepto, coalesce(LENGTH(cus_address)  < 1, 1, 0) as emptyField FROM ctt_customers WHERE cus_id = $cusId UNION
                SELECT 'cus_email' as concepto,   coalesce(LENGTH(cus_email)    < 1, 1, 0) as emptyField FROM ctt_customers WHERE cus_id = $cusId UNION
                SELECT 'cus_rfc' as concepto,     coalesce(LENGTH(cus_rfc)      < 1, 1, 0) as emptyField FROM ctt_customers WHERE cus_id = $cusId UNION
                SELECT 'cus_phone' as concepto,   coalesce(LENGTH(cus_phone)    < 1, 1, 0) as emptyField FROM ctt_customers WHERE cus_id = $cusId UNION
                SELECT 'cus_legal_representative' as concepto, coalesce(LENGTH(cus_legal_representative) < 1, 1, 0) as emptyField FROM ctt_customers WHERE cus_id = $cusId
            )
            SELECT (1-sum(emptyField)/6)*100 AS perc FROM fields )
        WHERE cus_id = $cusId";
        $this->db->query($qr2);

        return  $prdId;
    }

// ELIMINAR UN REGISTRO DE UN CLIENTE
    public function deleteCustomers($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);

        $qry3 = "DELETE FROM ctt_customers WHERE cus_id=$cusId;";
        $this->db->query($qry3);
        return $cusId;
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
}


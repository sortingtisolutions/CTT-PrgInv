<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class CustomersModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }


// Listado de categorias   ****
public function listCustomers()
{
    $qry = "SELECT * FROM ctt_customers AS cus
            INNER JOIN ctt_customers_type AS ct ON cus.cut_id = ct.cut_id
            ORDER BY cus_id desc;";
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


// Guarda los cambios de un producto
    public function saveEditCustomer($params)
    {
        $cusId =    $this->db->real_escape_string($params['cusId']);
        $cusName =  $this->db->real_escape_string($params['cusName']);
        $cusEmail = $this->db->real_escape_string($params['cusEmail']);
        $cusPhone = $this->db->real_escape_string($params['cusPhone']);
        $cusAdrr =  $this->db->real_escape_string($params['cusAdrr']);
        $cusRFC =   $this->db->real_escape_string($params['cusRFC']);
        $TypeProd = $this->db->real_escape_string($params['TypeProd']);
        $cusQualy = $this->db->real_escape_string($params['cusQualy']);
        $cusStat =  $this->db->real_escape_string($params['cusStat']);
        $cusICod =  $this->db->real_escape_string($params['cusICod']);
        $cusSatC =  $this->db->real_escape_string($params['cusSatC']);
        $cusDirector = $this->db->real_escape_string($params['cusDirector']);
        $cusLegRepre = $this->db->real_escape_string($params['cusLegRepre']);
        $cusLegPhone = $this->db->real_escape_string($params['cusLegPhone']);
        $cusLegEmail = $this->db->real_escape_string($params['cusLegEmail']);
        $cusCont =  $this->db->real_escape_string($params['cusCont']);
        $cusContEmail = $this->db->real_escape_string($params['cusContEmail']);
        $cusContPhone = $this->db->real_escape_string($params['cusContPhone']);
        $cusWorkC = $this->db->real_escape_string($params['cusWorkC']);
        $cusInvoi = $this->db->real_escape_string($params['cusInvoi']);

            $qry = "UPDATE ctt_customers 
                        SET cus_name=       UPPER('$cusName'),
                        cus_email=              '$cusEmail',
                        cus_phone=              '$cusPhone',
                        cus_address=        UPPER('$cusAdrr'),
                        cus_rfc=            UPPER('$cusRFC'),
                        cut_id=                 '$TypeProd',
                        cus_qualification=  UPPER('$cusQualy'),
                        cus_status=             '$cusStat',
                        cus_cve_cliente=        '$cusICod',
                        cus_code_sat=           '$cusSatC',
                        cus_legal_director=UPPER('$cusDirector'),
                        cus_legal_representative=UPPER('$cusLegRepre'),
                        cus_legal_email=        '$cusLegEmail',
                        cus_lega_phone=         '$cusLegPhone',
                        cus_contact_name=        UPPER('$cusCont'),
                        cus_contact_phone=      '$cusContPhone',
                        cus_contact_email=      '$cusContEmail',
                        cus_work_ctt=           '$cusWorkC',
                        cus_last_invoice=       '$cusInvoi'                       
                        WHERE cus_id ='$cusId';";
        $this->db->query($qry);
        return $cusId;
       
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


// Guarda nuevo producto
    public function saveNewCustomer($params)
    {
        $cusId =    $this->db->real_escape_string($params['cusId']);
        $cusName =  $this->db->real_escape_string($params['cusName']);
        $cusEmail = $this->db->real_escape_string($params['cusEmail']);
        $cusPhone = $this->db->real_escape_string($params['cusPhone']);
        $cusAdrr =  $this->db->real_escape_string($params['cusAdrr']);
        $cusRFC =   $this->db->real_escape_string($params['cusRFC']);
        $typeProd = $this->db->real_escape_string($params['typeProd']);
        $cusQualy = $this->db->real_escape_string($params['cusQualy']);
        $cusStat =  $this->db->real_escape_string($params['cusStat']);
        $cusICod =  $this->db->real_escape_string($params['cusICod']);
        $cusSatC =  $this->db->real_escape_string($params['cusSatC']);
        $cusDirector = $this->db->real_escape_string($params['cusDirector']);
        $cusLegRepre = $this->db->real_escape_string($params['cusLegRepre']);
        $cusLegPhone = $this->db->real_escape_string($params['cusLegPhone']);
        $cusLegEmail = $this->db->real_escape_string($params['cusLegEmail']);
        $cusCont =  $this->db->real_escape_string($params['cusCont']);
        $cusContEmail = $this->db->real_escape_string($params['cusContEmail']);
        $cusContPhone = $this->db->real_escape_string($params['cusContPhone']);
        $cusWorkC = $this->db->real_escape_string($params['cusWorkC']);
        $cusInvoi = $this->db->real_escape_string($params['cusInvoi']);
      
        /* $qry="INSERT INTO ctt_customers(cus_id, cus_name, cus_contact, cus_address, cus_email, cus_rfc, 
                cus_phone, cus_phone_2, cus_internal_code, cus_qualification, cus_prospect, cus_sponsored, 
                cus_legal_representative, cus_legal_act, cus_contract, cut_id, cus_status) 
                VALUES ('', UPPER('$cusName'),UPPER('$cusCont'),UPPER('$cusAdrr'),'$cusEmail',UPPER('$cusRFC'),
                '$cusPhone','$cusPhone2',UPPER('$cusICod'),'$cusQualy','$cusProsp','$cusSpon',
                '$cusLegRepre','$cusLegalA','$cusContr','$typeProd','$cusStat') ;"; */
            $qry="INSERT INTO ctt_customers( cus_cve_cliente, cus_code_sat, cus_name, cus_email, cus_phone, 
                            cus_address, cus_rfc, cus_qualification, cus_status, cus_legal_director, 
                            cus_legal_representative, cus_legal_email, cus_lega_phone, cus_contact_name, 
                            cus_contact_phone, cus_contact_email, cus_work_ctt, cus_last_invoice, cut_id) 
                VALUES ('$cusICod','$cusSatC',UPPER('$cusName'),'$cusEmail','$cusPhone',UPPER('$cusAdrr'),UPPER('$cusRFC'),
                        UPPER('$cusQualy'),$cusStat,UPPER('$cusDirector'),UPPER('$cusLegRepre'),'$cusLegEmail','$cusLegPhone',
                        UPPER('$cusCont'),'$cusContPhone',  '$cusContEmail','$cusWorkC','$cusInvoi',$typeProd);";

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


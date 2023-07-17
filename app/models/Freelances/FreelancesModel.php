<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class FreelancesModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }


// Listado de categorias   ****
public function listFreelances()
{
    $qry = "SELECT * FROM ctt_freelances AS fre
            ORDER BY free_id desc;";
    return $this->db->query($qry);
}

    // Obtiene datos del producto selecionado
public function getSelectFreelance($params)
{
    $prdId = $this->db->real_escape_string($params['prdId']);
    $qry = "SELECT * FROM ctt_freelances AS free
            
            WHERE free.free_id = $prdId limit 1;";

    return $this->db->query($qry);
}


// Listado de fichas técnicas
public function listAreas()
{
    $qry = "SELECT * FROM ctt_areas;";
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
    public function saveEditFreelance($params)
    {
        $freeId =    $this->db->real_escape_string($params['freeId']);
        $freeName =  $this->db->real_escape_string($params['freeName']);
        $freeClave = $this->db->real_escape_string($params['freeClave']);
        $freeAreaId = $this->db->real_escape_string($params['freeAreaId']);
        $freeRFC =  $this->db->real_escape_string($params['freeRFC']);
        $freeAdrr =   $this->db->real_escape_string($params['freeAdrr']);
        $freeEmail = $this->db->real_escape_string($params['freeEmail']);
        $freePhone = $this->db->real_escape_string($params['freePhone']);
        $freeUnitMovil =  $this->db->real_escape_string($params['freeUnitMovil']);
        $freePlaUnidad =  $this->db->real_escape_string($params['freePlaUnidad']);
        $freeNumLicencia =  $this->db->real_escape_string($params['freeNumLicencia']);
        $freePerFederal = $this->db->real_escape_string($params['freePerFederal']);
        $freeClaUnidad = $this->db->real_escape_string($params['freeClaUnidad']);
        $freeAnUnidad = $this->db->real_escape_string($params['freeAnUnidad']);

            $qry = "UPDATE ctt_freelances
                        SET free_cve=       '$freeClave',
                        free_name=              UPPER('$freeName'),
                        free_area_id=              '$freeAreaId',
                        free_rfc=        UPPER('$freeRFC'),
                        free_address=             UPPER('$freeAdrr'),
                        free_phone=                 '$freePhone',
                        free_email=  '$freeEmail',
                        free_unit=              UPPER('$freeUnitMovil'),
                        free_plates=         UPPER('$freePlaUnidad'),
                        free_license=            UPPER('$freeNumLicencia'),
                        free_fed_perm= UPPER('$freePerFederal'),
                        free_clase= UPPER('$freeClaUnidad'),
                        free_año=         UPPER('$freeAnUnidad')                     
                        WHERE free_id ='$freeId';";
        $this->db->query($qry);
        return $freeId;
       
    }


// Guarda nuevo producto
    public function saveNewFreelance($params)
    {
        $freeId =    $this->db->real_escape_string($params['freeId']);
        $freeName =  $this->db->real_escape_string($params['freeName']);
        $freeClave = $this->db->real_escape_string($params['freeClave']);
        $freeAreaId = $this->db->real_escape_string($params['freeAreaId']);
        $freeRFC =  $this->db->real_escape_string($params['freeRFC']);
        $freeAdrr =   $this->db->real_escape_string($params['freeAdrr']);
        $freeEmail = $this->db->real_escape_string($params['freeEmail']);
        $freePhone = $this->db->real_escape_string($params['freePhone']);
        $freeUnitMovil =  $this->db->real_escape_string($params['freeUnitMovil']);
        $freePlaUnidad =  $this->db->real_escape_string($params['freePlaUnidad']);
        $freeNumLicencia =  $this->db->real_escape_string($params['freeNumLicencia']);
        $freePerFederal = $this->db->real_escape_string($params['freePerFederal']);
        $freeClaUnidad = $this->db->real_escape_string($params['freeClaUnidad']);
        $freeAnUnidad = $this->db->real_escape_string($params['freeAnUnidad']);
      
        /* $qry="INSERT INTO ctt_customers(cus_id, cus_name, cus_contact, cus_address, cus_email, cus_rfc, 
                cus_phone, cus_phone_2, cus_internal_code, cus_qualification, cus_prospect, cus_sponsored, 
                cus_legal_representative, cus_legal_act, cus_contract, cut_id, cus_status) 
                VALUES ('', UPPER('$cusName'),UPPER('$cusCont'),UPPER('$cusAdrr'),'$cusEmail',UPPER('$cusRFC'),
                '$cusPhone','$cusPhone2',UPPER('$cusICod'),'$cusQualy','$cusProsp','$cusSpon',
                '$cusLegRepre','$cusLegalA','$cusContr','$typeProd','$cusStat') ;"; */
        $qry="INSERT INTO ctt_freelances( free_cve, free_name, free_area_id, free_rfc, 
                            free_address, free_phone, free_email, free_unit, free_plates, 
                            free_license, free_fed_perm, free_clase, free_año) 
                VALUES ('$freeClave',UPPER('$freeName'),'$freeAreaId',UPPER('$freeRFC'),UPPER('$freeAdrr'),
                        '$freePhone','$freeEmail' ,UPPER('$freeUnitMovil'),UPPER('$freePlaUnidad'),UPPER('$freeNumLicencia'),UPPER('$freePerFederal'),
                        UPPER('$freeClaUnidad'),UPPER('$freeAnUnidad'));";

        $this->db->query($qry);
        $freeId = $this->db->insert_id;
/*
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
        $this->db->query($qr2);*/

        return  $freeId;
    }

// ELIMINAR UN REGISTRO DE UN CLIENTE
    public function deleteFreelances($params)
    {
        $cusId = $this->db->real_escape_string($params['cusId']);

        $qry3 = "DELETE FROM ctt_freelances WHERE free_id=$cusId;";
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


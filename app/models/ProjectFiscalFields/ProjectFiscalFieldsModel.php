<?php
defined('BASEPATH') or exit('No se permite acceso directo');
require( ROOT . PATH_ASSETS.  'ssp.class.php' );

class ProjectFiscalFieldsModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }


// Obtiene la lista de productos   *****
    public function tableProjects($params)
    {

        $table = 'ctt_vw_projects';  
        $primaryKey = 'projecid';

        $columns = array(
            array( 'db' => 'custfill', 'dt' => 'custfill' ),
            array( 'db' => 'smarlock', 'dt' => 'smarlock' ),
            array( 'db' => 'editable', 'dt' => 'editable' ),
            array( 'db' => 'projecid', 'dt' => 'projecid' ),
            array( 'db' => 'projnumb', 'dt' => 'projnumb' ),
            array( 'db' => 'projname', 'dt' => 'projname' ),
            array( 'db' => 'custname', 'dt' => 'custname' ),
            array( 'db' => 'dateinit', 'dt' => 'dateinit' ),
            array( 'db' => 'datefnal', 'dt' => 'datefnal' ),
            array( 'db' => 'projloca', 'dt' => 'projloca' )
        );

        $sql_details = array(
            'user' => USER,
            'pass' => PASSWORD,
            'db'   => DB_NAME,
            'host' => HOST,
            'charset' => 'utf8',
        );

        return json_encode(
            SSP::simple( $_POST, $sql_details, $table, $primaryKey, $columns)
        );
    }

// Cambia el estatus del projecto
    public function updateStatus($params)
    {
        $pjtId      = $this->db->real_escape_string($params['pjtId']);
        $pjtStatus  = $this->db->real_escape_string($params['pjtStatus']);

        $qry = "UPDATE  ctt_projects
                SET     pjt_status          = '$pjtStatus'
                WHERE   pjt_id              = '$pjtId';";
        $this->db->query($qry);

        return $pjtId;
    }

// Cambia el estatus del projecto
    public function updateInfoCustomer($params)
    {
        $cusId          = $this->db->real_escape_string($params['cusId']);
        $cusName        = $this->db->real_escape_string($params['cusName']);
        $cusAddress     = $this->db->real_escape_string($params['cusAddress']);
        $cusEmail       = $this->db->real_escape_string($params['cusEmail']);
        $cusRFC         = $this->db->real_escape_string($params['cusRFC']);
        $cusPhone       = $this->db->real_escape_string($params['cusPhone']);
        $cusLegalRep    = $this->db->real_escape_string($params['cusLegalRep']);

        $qr1 = "UPDATE  ctt_customers
                SET     
                    cus_name                    = '$cusName',
                    cus_address                 = '$cusAddress',
                    cus_email                   = '$cusEmail',
                    cus_rfc                     = '$cusRFC',
                    cus_phone                   = '$cusPhone',
                    cus_legal_representative    = '$cusLegalRep'
                WHERE   cus_id                  = '$cusId';";
        $this->db->query($qr1);


        //++++++++ Actualiza el porcentaje de faltantes para datos fiscales ++++++//
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

        return $cusId;
    }

// Obtiene la información del cliente
    public function getCustomerFields($params)
    {
        $cusId      = $this->db->real_escape_string($params['cusId']);
        $qry = "SELECT cus.*, cut.cut_name FROM ctt_customers as cus
                INNER JOIN ctt_customers_type as cut ON cus.cut_id = cut.cut_id
                WHERE cus.cus_id = $cusId;";
        return $this->db->query($qry);

    }

}
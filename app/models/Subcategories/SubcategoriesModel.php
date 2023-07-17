<?php
defined('BASEPATH') or exit('No se permite acceso directo');
require( ROOT . PATH_ASSETS.  'ssp.class.php' );

class SubcategoriesModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}



// Obtiene el listado de las subcategorias activas   *****
    public function listCategories($params)
    {
        $qry = "SELECT ct.cat_id, ct.cat_name, ct.str_id
                FROM  ctt_categories    AS ct 
                WHERE ct.cat_status = 1 ORDER BY ct.cat_id;";

        return $this->db->query($qry);
    }

// Obtiene el listado de las subcategorias activas
    public function tableSubcategories($params)
    {

        $table = 'ctt_vw_subcategories';  
        $primaryKey = 'subcatid';
        $columns = array(
            array( 'db' => 'editable', 'dt' => 'editable' ),
            array( 'db' => 'subcatid', 'dt' => 'subcatid' ),
            array( 'db' => 'subccode', 'dt' => 'subccode' ),
            array( 'db' => 'subcname', 'dt' => 'subcname' ),
            array( 'db' => 'catgname', 'dt' => 'catgname' ),
            array( 'db' => 'catgcode', 'dt' => 'catgcode' ),
            array( 'db' => 'quantity', 'dt' => 'quantity' ),
            array( 'db' => 'ordprint', 'dt' => 'ordprint' ),
        );
        $sql_details = array(
            'user' => USER,
            'pass' => PASSWORD,
            'db'   => DB_NAME,
            'host' => HOST,
            'charset' => 'utf8',
        );

        return json_encode(
            SSP::simple( $_POST, $sql_details, $table, $primaryKey, $columns )
        );

    }

    
// Obtiene el listado de las subcategorias activas
    public function listSubcategories($params)
    {

        $qry = "SELECT sc.sbc_id, sc.sbc_code, sc.sbc_name, ct.cat_name, 
                        ct.cat_id, '0' as quantity, sbc_order_print 
                FROM  ctt_subcategories        AS sc   
                INNER JOIN ctt_categories      AS ct ON ct.cat_id = sc.cat_id
                WHERE sc.sbc_status = '1' AND ct.cat_status = '1' 
                ORDER BY ct.cat_id, sc.sbc_id";

        return $this->db->query($qry);
    }

// Obtiene la lista de series relacionadas a la subcategoria
    public function listSeries($params)
    {
        $sbcId = $this->db->real_escape_string($params['sbcId']);
        $qry = "SELECT  se.ser_id, se.ser_sku, pr.prd_name, se.ser_serial_number, 
                        date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
                        se.ser_cost, se.ser_situation, se.ser_stage, se.ser_status, ifnull(se.ser_comments,'') AS ser_comments
                FROM  ctt_products                   AS pr
                INNER JOIN ctt_subcategories         AS sc ON sc.sbc_id = pr.sbc_id  AND sc.sbc_status = 1
                INNER JOIN ctt_series                AS se ON se.prd_id = pr.prd_id
                WHERE sc.sbc_id = '$sbcId' AND pr.prd_level IN ('P') 
                ORDER BY se.ser_sku;";
        return $this->db->query($qry);
    }

    
// Obtiene el listado de las subcategorias activas
    public function SaveSubcategory($params)
    {
        $sbcName = $this->db->real_escape_string($params['sbcName']);
        $sbcCode = $this->db->real_escape_string($params['sbcCode']);
        $catId = $this->db->real_escape_string($params['catId']);
        $sbcOrd = $this->db->real_escape_string($params['sbcOrd']);

        $qry = "INSERT INTO ctt_subcategories(sbc_code, sbc_name, sbc_status, cat_id, sbc_order_print)
                VALUES('$sbcCode',UPPER('$sbcName'),1,'$catId', '$sbcOrd')";
        $this->db->query($qry);	
        $sbcId = $this->db->insert_id;
		return $sbcId;
    }

// Actualiza la subcategorias seleccionada
    public function UpdateSubcategory($params)
    {
        $sbcId      = $this->db->real_escape_string($params['sbcId']);
        $sbcName    = $this->db->real_escape_string($params['sbcName']);
        $sbcCode    = $this->db->real_escape_string($params['sbcCode']);
        $catId      = $this->db->real_escape_string($params['catId']);
        $sbcOrd     = $this->db->real_escape_string($params['sbcOrd']);

        $qry = "UPDATE ctt_subcategories
                SET   sbc_name      = UPPER(REPLACE('$sbcName','\°','\"')),
                      sbc_code      = '$sbcCode',
                      cat_id        = '$catId',
                      sbc_order_print  = '$sbcOrd'
                WHERE sbc_id    = '$sbcId';";

        $this->db->query($qry);	

        /* $qry2 = "UPDATE ctt_subcategories
        SET   sbc_name  = REPLACE(sbc_name,'\°','\"')
        WHERE sbc_id    = '$sbcId';";

        $this->db->query($qry2);	
 */
        return $sbcId;
    }
//UPPER('$sbcName'),

// Actualiza el status de la subcategorias a eliminar
    public function DeleteSubcategory($params)
    {
        $sbcid      = $this->db->real_escape_string($params['sbcId']);

        $qry = "UPDATE ctt_subcategories SET sbc_status = '0'
                WHERE sbc_id  = '$sbcid';";

        $this->db->query($qry);	
        return $sbcid;
    }


// Obtiene el STOCK
    public function countQuantity($params)
    {
        $sbcId = $this->db->real_escape_string($params['sbcId']);
        $qry = "SELECT '$sbcId' as sbc_id, ifnull(sum(sp.stp_quantity),0) as cantidad 
                FROM  ctt_stores_products           AS sp
                INNER JOIN ctt_series               AS sr ON sr.ser_id = sp.ser_id
                INNER JOIN ctt_products             AS pr ON pr.prd_id = sr.prd_id
                INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = pr.sbc_id
                WHERE sr.ser_status = 1 AND pr.prd_level IN ('P','K')
                AND sc.sbc_id= $sbcId;";
        return $this->db->query($qry);
    }
}
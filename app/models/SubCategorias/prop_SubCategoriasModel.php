<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class SubCategoriasModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

// Obtiene las categorias
    public function GetCategories($params)
    {
        $qry = "SELECT ct.cat_id, ct.cat_name, ct.str_id
                FROM  ctt_categories    AS ct 
                WHERE ct.cat_status = 1 ORDER BY ct.cat_id;";
        
        return $this->db->query($qry);
    }
    


    // Optiene las subcategorias existentes
    public function getSubcategories($params)
    {

        $catId = $this->db->real_escape_string($params['catId']);
    
        $qry = "SELECT sc.*, ct.*, '0' as cantidad 
                FROM  ctt_subcategories        AS sc   
                INNER JOIN ctt_categories      AS ct ON ct.cat_id = sc.cat_id
                WHERE sc.sbc_status = '1' AND ct.cat_status = '1' ";
        return $this->db->query($qry);
    }


    public function GetListSubcategories($request)
    {
        $qry = "SELECT sbc_id, sbc_code, sbc_name, cat_id FROM ctt_subcategories
                WHERE sbc_status=1 ORDER by cat_id, sbc_code; ";
      
        return $this->db->query($qry);
    }


//Guarda proveedor
    public function SaveSubCategoria($params)
    {

        $sbcName = $this->db->real_escape_string($params['sbcName']);
        $sbcCode = $this->db->real_escape_string($params['sbcCode']);
        $catId = $this->db->real_escape_string($params['catId']);


        $qry = "INSERT INTO ctt_subcategories(sbc_code, sbc_name, sbc_status, cat_id)
                VALUES('$sbcCode','$sbcName',1,'$catId')";
        $this->db->query($qry);	
        $sbc_id = $this->db->insert_id;
		return $sbc_id;

    }

    public function GetSubCategoria($params)
    {

        $catId = $this->db->real_escape_string($params['catId']);
        $qry = "SELECT sbc_id, sbc_code, sbc_name, cat_id FROM ctt_subcategories WHERE sbc_id = '$catId';";
        return $this->db->query($qry);
    }

//  ---- Actualiza datos de la subcategoría ----
    public function UpdateSubcategoria($params)
    {

        $sbcId      = $this->db->real_escape_string($params['sbcId']);
        $sbcName    = $this->db->real_escape_string($params['sbcName']);
        $sbcCode    = $this->db->real_escape_string($params['sbcCode']);
        $catId      = $this->db->real_escape_string($params['catId']);
        $qry = "UPDATE ctt_subcategories
                SET 
                     sbc_name   = '$sbcName'
                    ,sbc_code   = '$sbcCode'
                    ,cat_id     = '$catId'
                WHERE sbc_id =  $sbcId;";

        $this->db->query($qry);	
        return $sbcId;	

    }

// ---- Proces de borrar subcategoria cambia el status a 0 ----
    public function DeleteSubcategoria($params)
    {
        $sbcId      = $this->db->real_escape_string($params['sbcId']);
        $qry = "UPDATE ctt_subcategories
                   SET sbc_status = 0
                WHERE sbc_id = $sbcId;";
        $this->db->query($qry);
        return $sbcId;
     }

    public function listSeries($params)
    {
        $sbcId = $this->db->real_escape_string($params['sbcId']);
        $qry = "SELECT  se.ser_id, se.ser_sku, p.prd_name, se.ser_serial_number, 
            date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
            se.ser_cost, se.ser_situation, se.ser_stage, se.ser_status, se.ser_comments
            FROM  ctt_products AS p
            INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
            INNER JOIN ctt_series                AS se ON se.prd_id = p.prd_id
            WHERE sc.sbc_id = ($sbcId) AND p.prd_level IN ('P') 
            ORDER BY se.ser_sku;";
        return $this->db->query($qry);
    }

    public function countQuantity($params)
    {
        $sbcId = $this->db->real_escape_string($params['sbcId']);
        $qry = "SELECT '$sbcId' as sbc_id, ifnull(sum(sp.stp_quantity),0) as cantidad 
                FROM  ctt_stores_products AS sp
                INNER JOIN ctt_series               AS sr ON sr.ser_id = sp.ser_id
                INNER JOIN ctt_products				AS p ON p.prd_id = sr.prd_id
                INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id
                WHERE sr.ser_status = 1 AND p.prd_level IN ('P','K')
                AND sc.sbc_id= $sbcId;";
        return $this->db->query($qry);
    }
}
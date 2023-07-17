<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class StoreProductsListModel extends Model
{
    public function __construct()
    {
      parent::__construct();
    }

// Listado de Tipos de mivimiento  ******
    public function listExchange()
    {
        $qry = "SELECT ex1.ext_id, ex1.ext_code, ex1.ext_type, ex1.ext_description, ex1.ext_link,
                        ex2.ext_id as ext_id_a, ex2.ext_code as ext_code_a, ex2.ext_type as ext_type_a, ex2.ext_description as ext_description_a
                FROM ctt_type_exchange AS ex1
                LEFT JOIN ctt_type_exchange AS ex2 ON ex2.ext_link = ex1.ext_id 
                WHERE ex1.ext_type = 'S';";
        return $this->db->query($qry);
    }

// Listado de Almacecnes
    public function listStores()
    {
        $qry = "  SELECT * FROM ctt_stores";
        return $this->db->query($qry);
    }
// Listado de Productos
    public function listProducts($store)
    {
        $store = $this->db->real_escape_string($store);
        $qry = "SELECT * FROM ctt_products AS pr
                INNER JOIN ctt_series AS sr ON sr.prd_id = pr.prd_id
                INNER JOIN ctt_stores_products AS st ON st.ser_id = sr.ser_id
                WHERE sr.ser_status = 1 AND st.stp_quantity > 0 AND st.str_id = $store;";
        return $this->db->query($qry);
    }	

// Listado de Movimientos
    public function listExchanges($guid)
    {
        $guid = $this->db->real_escape_string($guid);
        $qry = "SELECT * FROM ctt_stores_exchange WHERE exc_guid = '$guid' ORDER BY exc_date DESC;";
        return $this->db->query($qry);
    }


// Busca si existe asignado un almacen con este producto
    public function SechingProducts($param)
    {
        $prodId = $this->db->real_escape_string($param['prd']);
        $storId = $this->db->real_escape_string($param['str']);

        $qry = "SELECT count(*) as items FROM ctt_stores_products WHERE ser_id = $prodId AND str_id = $storId;";
        return $this->db->query($qry);
    }

// Actualizala cantidad de productos en un almacen destino
    public function UpdateProducts($param)
    {
        $idPrd 			= $this->db->real_escape_string($param['prd']);
        $idStrSrc 		= $this->db->real_escape_string($param['str']);
        $quantity 		= $this->db->real_escape_string($param['qty']);

        $qry = "UPDATE ctt_stores_products SET stp_quantity = stp_quantity + {$quantity} WHERE str_id = {$idStrSrc} and  ser_id = {$idPrd};";
        return $this->db->query($qry);
    }


// Agrega el registro de relación almacen producto
    public function InsertProducts($param)
    {
        $idPrd 			= $this->db->real_escape_string($param['prd']);
        $idStrSrc 		= $this->db->real_escape_string($param['str']);
        $quantity 		= $this->db->real_escape_string($param['qty']);

        $qry = "INSERT INTO ctt_stores_products (stp_quantity, str_id, ser_id) VALUES ($quantity, $idStrSrc, $idPrd);";
        return $this->db->query($qry);
    }

// Obtiene del detalle del projeto 
    public function listDetailProject()
    {
        $qry = "SELECT 
                    prdt.pjtdt_prod_sku AS cve_art
                    , prod.prd_name as descr 
                    , 'undefined' AS uni_med
                    , substring(prdt.pjtdt_prod_sku,1,4) AS linea
                    , '0.0000' as peso
                FROM ctt_projects_detail AS prdt
                INNER JOIN ctt_products AS prod ON prod.prd_id = prdt.prd_id 
                INNER JOIN ctt_projects_content AS prjt ON prjt.pjtcn_id = prdt.pjtcn_id
                WHERE prdt.pjtdt_prod_sku != 'Pendiente' AND prjt.pjt_id = 1 ;";
        return $this->db->query($qry);



        // [martes 04:11 p. m.] Erick Nava Hernández
        // [dbo].[insertar_PROD]
        // @cve_art varchar(20),
        // @descr varchar(40),
        // @uni_med varchar(10),
        // @linea varchar(5),
        // @peso float


    }	
}
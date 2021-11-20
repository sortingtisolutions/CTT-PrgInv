<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsSalablesListModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }




// Obtiene las ventas
    public function Sales()
    {
        $qry = "SELECT * FROM ctt_sales ORDER BY sal_date DESC; ";
        return $this->db->query($qry);
    }

// Obtiene el detalle de ventas
    public function SalesDetail($params)
    {

        $salId = $this->db->real_escape_string($params['salId']);

        $qry = "SELECT * FROM ctt_sales_details WHERE sal_id = $salId; ";
        return $this->db->query($qry);
    }

}
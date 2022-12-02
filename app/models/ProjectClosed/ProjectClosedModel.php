<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectClosedModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }


/* -- Listado de proyectos  ------------------------------------- */    
    public function listProjects($params)
    {
        $qry = "SELECT pjt_id, pjt_name FROM ctt_projects WHERE pjt_status IN (3,4) AND pjt_date_start < curdate();";
        return $this->db->query($qry);

    }


/* -- Listado de contenido de proyecto seleccionado  -------------- */
    public function projectContent($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry = "SELECT dt.ser_id, dt.prd_id, dt.pjtdt_prod_sku, cn.pjtcn_prod_name, cn.pjtcn_prod_price, ifnull(sr.ser_comments,'') AS ser_comments
                    , (cn.pjtcn_prod_price * cn.pjtcn_days_cost) - (cn.pjtcn_prod_price * cn.pjtcn_discount_base) * cn.pjtcn_days_cost + (cn.pjtcn_prod_price * cn.pjtcn_days_trip) - ((cn.pjtcn_prod_price * cn.pjtcn_discount_trip) * cn.pjtcn_days_trip) + (cn.pjtcn_prod_price * cn.pjtcn_days_test) -  (cn.pjtcn_prod_price * cn.pjtcn_discount_test) * cn.pjtcn_days_test as costo
                FROM ctt_projects_detail AS dt
                INNER JOIN ctt_projects_content AS cn ON cn.pjtvr_id = dt.pjtvr_id AND cn.prd_id = dt.prd_id
                LEFT JOIN ctt_series AS sr ON sr.ser_id = dt.ser_id
                WHERE cn.pjt_id = $pjtId;";
        return $this->db->query($qry);

    }
    


/* -- Listado ventas de expendables  --------------------------------------------------------- */
    public function saleExpendab($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry = "SELECT sum(sd.sld_quantity * sd.sld_price) AS expendables
                FROM ctt_sales_details AS sd
                INNER JOIN ctt_sales as sl on sl.sal_id = sd.sal_id
                WHERE pjt_id =  $pjtId;";
        return $this->db->query($qry);

    }




}
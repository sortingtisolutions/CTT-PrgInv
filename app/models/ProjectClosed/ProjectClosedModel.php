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
        $qry = "SELECT pjt_id, pjt_name FROM ctt_projects 
                WHERE pjt_status IN (8,9);"; /* AND pjt_date_start < curdate();"; */
        return $this->db->query($qry);

    }

    /* -- Listado de proyectos  ------------------------------------- */    
    public function listChgStatus($params)
    {
        $qry = "SELECT * FROM ctt_project_change_reason";
        return $this->db->query($qry);

    }

/* -- Listado de contenido de proyecto seleccionado  -------------- */
    public function projectContent($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

       /*  $qry = "SELECT dt.ser_id, dt.prd_id, dt.pjtdt_prod_sku, cn.pjtcn_prod_name, cn.pjtcn_prod_price, 
                    ifnull(sr.ser_comments,'') AS ser_comments, ifnull(sr.ser_status,'1') as ser_status, cn.pjtcn_quantity,
                    (cn.pjtcn_prod_price * cn.pjtcn_days_cost) - (cn.pjtcn_prod_price * cn.pjtcn_discount_base) * cn.pjtcn_days_cost + (cn.pjtcn_prod_price * cn.pjtcn_days_trip) - ((cn.pjtcn_prod_price * cn.pjtcn_discount_trip) * cn.pjtcn_days_trip) + (cn.pjtcn_prod_price * cn.pjtcn_days_test) -  (cn.pjtcn_prod_price * cn.pjtcn_discount_test) * cn.pjtcn_days_test as costo
                FROM ctt_projects_detail AS dt
                INNER JOIN ctt_projects_content AS cn ON cn.pjtvr_id = dt.pjtvr_id AND cn.prd_id = dt.prd_id
                LEFT JOIN ctt_series AS sr ON sr.ser_id = dt.ser_id
                WHERE cn.pjt_id = $pjtId;"; */

            $qry = "SELECT * , 
                    ifnull(sr.ser_comments,'') AS ser_comments, ifnull(sr.ser_status,'1') as ser_status, cn.pjtcn_quantity,
                    (cn.pjtcn_prod_price * cn.pjtcn_days_cost) - (cn.pjtcn_prod_price * cn.pjtcn_discount_base) * cn.pjtcn_days_cost + (cn.pjtcn_prod_price * cn.pjtcn_days_trip) - ((cn.pjtcn_prod_price * cn.pjtcn_discount_trip) * cn.pjtcn_days_trip) + (cn.pjtcn_prod_price * cn.pjtcn_days_test) -  (cn.pjtcn_prod_price * cn.pjtcn_discount_test) * cn.pjtcn_days_test as costo
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

    public function saveDocumentClosure($params)
    {
        $cusId          = $this->db->real_escape_string($params['cusId']);
        $cloTotProy     =  $this->db->real_escape_string($params['cloTotProy']);
        $cloTotMaint    = $this->db->real_escape_string($params['cloTotMaint']);
        $cloTotExpen    = $this->db->real_escape_string($params['cloTotExpen']);
        $cloTotCombu    =  $this->db->real_escape_string($params['cloTotCombu']);
        $cloTotDisco    =  $this->db->real_escape_string($params['cloTotDisco']);
        $cloCommen      = $this->db->real_escape_string($params['cloCommen']);
        $pjtid          = $this->db->real_escape_string($params['pjtid']);
        $usrid          = $this->db->real_escape_string($params['usrid']);
        $verid          = $this->db->real_escape_string($params['verid']);
      
            $qry="INSERT INTO ctt_documents_closure(clo_total_proyects, clo_total_maintenance, 
            clo_total_expendables, clo_total_diesel, clo_total_discounts, clo_flag_send, 
            clo_fecha_cierre, clo_comentarios, cus_id, pjt_id, usr_id, ver_id)
            VALUES ($cloTotProy,$cloTotMaint,$cloTotExpen,$cloTotCombu,$cloTotDisco,
                0,SYSDATE(),$cloCommen,$cusId,$pjtid,$usrid,$verid);";

        $this->db->query($qry);
        $prdId = $this->db->insert_id;

        return  $prdId;
    }


}
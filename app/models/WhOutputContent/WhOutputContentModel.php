<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class WhOutputContentModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

    // Listado de proyectos
    public function listProjects()
    {
        /* $store = $this->db->real_escape_string();*/
        $qry = "SELECT pt.pjttp_name, pj.pjt_name, pj.pjt_number,
        DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, 
        DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
        DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y %H:%i ') AS pjt_date_project, 
        pj.pjt_location, pj.cuo_id, '1' as analyst, '33' as freelance, pj.pjt_id
        FROM ctt_projects AS pj INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id 
        LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id 
        WHERE pj.pjt_id='1' ORDER BY pjt_date_start ASC";
        return $this->db->query($qry);
    }    

// Listado de Productos de Proyecto asigando
    public function listDetailProds()
    {
/*        $store = $this->db->real_escape_string($store);*/
        $qry = "SELECT 
        pd.pjtdt_id, pd.pjtdt_prod_sku, pd.pjtdt_prod_name, pd.pjtdt_quantity, pd.ser_id,pd.pjtdt_prod_level 
        FROM ctt_projects_content AS pc INNER JOIN ctt_projects_detail AS pd 
        ON pd.pjtcn_id = pc.pjtcn_id WHERE pc.pjt_id = 1 order by 1,4;";
        return $this->db->query($qry);
    }    
}
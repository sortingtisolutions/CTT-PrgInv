<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectPlansModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    
// Listado de proyectos
    public function listProjects($params)
    {
        // Debe leer todos los proyectos que se encuentren en estaus 2 - Presupuesto
        $pjId = $this->db->real_escape_string($params['pjId']);

        $qry = "SELECT 
                    pj.pjt_id  
                    , pj.pjt_number 
                    , pj.pjt_name  
                    , DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project 
                    , DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start 
                    , DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end 
                    , pj.pjt_location 
                    , pj.pjt_status 
                    , pj.cuo_id 
                    , pj.loc_id 
                    , co.cus_id 
                    , co.cus_parent 
                    , lo.loc_type_location 
                    , pt.pjttp_name 
                    , pt.pjttp_id
                    , '$pjId' as pjId
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_status = '2' ORDER BY pj.pjt_id DESC;
                ";
        return $this->db->query($qry);
    }    




        
// Listado de versiones
    public function listVersion($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry = "SELECT * FROM ctt_version WHERE pjt_id = $pjtId AND ver_status = 'P' ORDER BY ver_date DESC;";
        return $this->db->query($qry);
    }    



}
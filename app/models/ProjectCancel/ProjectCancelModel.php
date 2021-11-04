<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectCancelModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    public function listProjects($params)
    {
        // $pjtId = $this->db->real_escape_string($params['pjtId']);    
        $qry = "SELECT 
                    pj.pjt_id, pj.pjt_number, pj.pjt_name, 
                    DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS date_regs,
                    DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS date_ini,
                    DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS date_end,
                    cl.cus_name
                FROM ctt_projects AS pj
                INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                INNER JOIN ctt_customers AS cl ON cl.cus_id = co.cus_id
                WHERE pj.pjt_status = 3";
        return $this->db->query($qry);

    }

    public function CancelProject($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qr1 = "UPDATE ctt_projects
                   SET pjt_status = '4'
                 WHERE pjt_id = $pjtId;";
        
        $this->db->query($qr1);

        $qr2 = "UPDATE ctt_series
                    SET 
                        ser_reserve_start = NULL,
                        ser_reserve_end = NULL,
                        ser_situation ='D',
                        ser_stage = 'D',
                        pjtdt_id = 0
                WHERE pjtdt_id IN (
                SELECT pjtdt_id FROM ctt_projects_detail WHERE pjtcn_id IN (
                    SELECT pjtcn_id FROM ctt_projects_content WHERE pjt_id = $pjtId 
                ));";
        $this->db->query($qr2);

        $qr3 = "UPDATE ctt_subletting SET sub_date_end = now() WHERE prj_id = $pjtId;";
        $this->db->query($qr3);

        return $pjtId;
    }
}
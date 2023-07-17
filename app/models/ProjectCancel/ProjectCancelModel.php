<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectCancelModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    //LISTA DE PROYECTOS A CANCELAR ****
    public function listProjects($params)
    {
        // $pjtId = $this->db->real_escape_string($params['pjtId']);    
        $qry = "SELECT pj.pjt_id, pj.pjt_number, pj.pjt_name, 
		DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS date_regs,
		DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS date_ini,
		DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS date_end,
		cl.cus_name, ps.pjs_name
		FROM ctt_projects AS pj
		LEFT JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
		LEFT JOIN ctt_customers AS cl ON cl.cus_id = co.cus_id
		INNER JOIN ctt_projects_status AS ps ON ps.pjs_status=pj.pjt_status
		WHERE pj.pjt_status in (2,4,40,6);";
        return $this->db->query($qry);

    }
/** Habilita el projecto                                                           ====  */    
    public function EnableProject($params)
    {
        /* Actualiza el estado en 3, status de proyecto   */
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qr1 = "UPDATE ctt_projects
                SET pjt_status = '3'
                WHERE pjt_id = $pjtId;";
        
        $this->db->query($qr1);

        return $pjtId;
    }

/** Elimina los periodos de las series correspondientes al periodo                 ====  */
    public function cleanPeriods($params)
    {
        $pjtId = $this->db->real_escape_string($params);
        $qry = "DELETE FROM ctt_projects_periods WHERE pjtdt_id IN (
                    SELECT DISTINCT pjtdt_id FROM ctt_projects_detail AS pdt 
                    INNER JOIN ctt_projects_content AS pcn ON pcn.pjtcn_id = pdt.pjtcn_id
                    WHERE pcn.pjt_id = $pjtId );";
        return $this->db->query($qry);
    }

    
/** Restaura las series del proyecto a productos disponibles                       ====  */
    public function restoreSeries($params)
    {
        $pjtId = $this->db->real_escape_string($params);
        $qry = "UPDATE ctt_series 
                SET ser_situation = 'D', ser_stage ='D', pjtdt_id = 0 
                WHERE pjtdt_id IN (
                    SELECT DISTINCT pjtdt_id FROM ctt_projects_detail AS pdt 
                    INNER JOIN ctt_projects_content AS pcn ON pcn.pjtcn_id = pdt.pjtcn_id
                    WHERE pcn.pjt_id = $pjtId );";
        return $this->db->query($qry);
    }

/** Elimina los registros del detalle del proyecto                                 ====  */
    public function cleanDetail($params)
    {
        $pjtId = $this->db->real_escape_string($params);
        $qry = "DELETE FROM ctt_projects_detail WHERE pjtcn_id IN  (
                    SELECT pjtcn_id FROM ctt_projects_content WHERE pjt_id = $pjtId
                );";
        return $this->db->query($qry);
    }

/** Cancela el proyecto definitivamente                                            ====  */
    public function CancelProject($params)
    {
        /* Actualiza el estado en 6, status de cancelado definitivamente   */
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qr1 = "UPDATE ctt_projects
                SET pjt_status = '6'
                WHERE pjt_id = $pjtId;";
        
        $this->db->query($qr1);

        $qr3 = "UPDATE ctt_subletting SET sub_date_end = now() WHERE prj_id = $pjtId;";
        $this->db->query($qr3);

        return $pjtId;
    }

}
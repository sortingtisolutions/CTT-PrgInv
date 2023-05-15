<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AssignProjectsModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

    // Listado de proyectos    ******
    public function listUsersP($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT usr.usr_id, emp.emp_fullname,emp.emp_number FROM ctt_users AS usr
                RIGHT JOIN ctt_employees AS emp ON emp.emp_id=usr.emp_id
                WHERE (emp.emp_id != 1 OR emp.emp_fullname != 'Super Usuario')
                AND are_id=3;";

        return $this->db->query($qry);
    }

    public function listUsersA($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT usr.usr_id, emp.emp_fullname,emp.emp_number FROM ctt_users AS usr
                RIGHT JOIN ctt_employees AS emp ON emp.emp_id=usr.emp_id
                WHERE (emp.emp_id != 1 OR emp.emp_fullname != 'Super Usuario')
                AND are_id in (1,2);";

        return $this->db->query($qry);
    }
// Listado de Productos de Proyecto asigando
    public function listDetailProds($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT pj.pjt_id, pj.pjt_name, pj.pjt_number, pt.pjttp_name,
                DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, 
                DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
                DATE_FORMAT(pj.pjt_date_last_motion,'%d/%m/%Y %H:%i ') AS pjt_date_project, 
                pj.pjt_location, pj.pjt_status,pj.pjt_id, pj.pjt_whomake, pj.pjt_whoattend
                FROM ctt_projects AS pj
                INNER JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id 
                WHERE pj.pjt_status in ('4','7','8')
                ORDER BY pjt_date_start ASC;";
        return $this->db->query($qry);
    }
    
    /** ==== Obtiene el contenido del proyecto =============================================================  */

    public function updateUsers($params)
    {
        $pjtid		= $this->db->real_escape_string($params['pjtid']);
        $whoP		= $this->db->real_escape_string($params['whoP']);
        $whoA		= $this->db->real_escape_string($params['whoA']);

        $qry = "UPDATE ctt_projects SET pjt_whomake='$whoP', pjt_whoattend='$whoA'
                WHERE pjt_id=$pjtid;";  

        $folio = $this->db->query($qry);
        return $folio;
    }

}

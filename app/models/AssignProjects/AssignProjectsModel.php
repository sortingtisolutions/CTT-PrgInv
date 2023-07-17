<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AssignProjectsModel extends Model
{
    public function __construct()
    {
      parent::__construct();
    }

// Listado de usuarios de programacion   ******
    public function listUsersP($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT usr.usr_id,emp.emp_id, emp.emp_fullname,emp.emp_number 
                FROM ctt_users AS usr
                RIGHT JOIN ctt_employees AS emp ON emp.emp_id=usr.emp_id
                WHERE (emp.emp_id != 1 OR emp.emp_fullname != 'Super Usuario')
                AND are_id in (1);";

        return $this->db->query($qry);
    }
//  Lista de usuarios de camara  ***********
    public function listUsersC($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT usr.usr_id,emp.emp_id, emp.emp_fullname,emp.emp_number FROM ctt_users AS usr
                RIGHT JOIN ctt_employees AS emp ON emp.emp_id=usr.emp_id
                WHERE (emp.emp_id != 1 OR emp.emp_fullname != 'Super Usuario')
                AND are_id in (2);";

        return $this->db->query($qry);
    }

    //  Lista de usuarios de almacen Iluminacion  ***********
    public function listUsersA($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT usr.usr_id,emp.emp_id, emp.emp_fullname,emp.emp_number FROM ctt_users AS usr
                RIGHT JOIN ctt_employees AS emp ON emp.emp_id=usr.emp_id
                WHERE (emp.emp_id != 1 OR emp.emp_fullname != 'Super Usuario')
                AND are_id in (3);";

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
    
    // Listado de Productos de Proyecto asigando
    public function listUsersOnProj($params)
    {
        $pjtid = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT whoatd_id,pjt_id,usr_id,emp_id,emp_fullname,are_id 
                FROM ctt_who_attend_projects
                WHERE pjt_id=$pjtid";
        return $this->db->query($qry);
    }
    /** ==== Obtiene el contenido del proyecto =============================================================  */

    public function updateUsers($params)
    {
        $pjtid		= $this->db->real_escape_string($params['pjtid']);
        $areid		= $this->db->real_escape_string($params['areid']);
        $empid		= $this->db->real_escape_string($params['empid']);
        $empname	= $this->db->real_escape_string($params['empname']);
        $usrid	    = $this->db->real_escape_string($params['usrid']);

        /* $qry = "UPDATE ctt_who_attend_projects 
                SET emp_id='$empid', emp_fullname='$empname'
                WHERE pjt_id=$pjtid and are_id=$areid;";  
        $folio = $this->db->query($qry); */

        $qry = "SELECT fun_updateuser($pjtid,$areid,$empid,'$empname',$usrid) 
                AS valresult
                FROM DUAL;";  

        // $bandupdate = $this->db->query($qry);
        return $this->db->query($qry);
    }

}

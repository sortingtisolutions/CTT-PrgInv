<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AssignFreelanceModel extends Model
{
    public function __construct()
    {
      parent::__construct();
    }

// Listado de Tipos de movimiento  *****
    public function listProyects()
    {
        $qry = "SELECT pj.pjt_id, pj.pjt_number, pj.pjt_name,  
                    DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y') AS pjt_date_project, 
                    DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, 
                    DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
                    pj.pjt_location, pj.pjt_status, pj.cuo_id, pj.loc_id, co.cus_id, 
                    co.cus_parent, lo.loc_type_location, pt.pjttp_name
                FROM ctt_projects AS pj
                LEFT JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                LEFT JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                ORDER BY pj.pjt_id DESC;";

        return $this->db->query($qry);
    }
      
// Listado de Areas
    public function listAreas()
    {
        $qry = "SELECT DISTINCT free.free_area_id, are.are_name 
                FROM ctt_freelances AS free 
                INNER JOIN ctt_areas AS are ON are.are_id=free.free_area_id";
        return $this->db->query($qry);
    }

    public function listFreelances($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        $qry = "SELECT free.free_id, free.free_cve, free.free_name, free.free_area_id, 
                free.free_rfc, free.free_address, free.free_phone, free.free_email, 
                free.free_unit, free.free_plates, free.free_license, free.free_fed_perm, 
                free.free_clase, free.`free_año` 
                FROM ctt_freelances AS free 
                LEFT JOIN ctt_assign_proyect AS ass ON ass.free_id=free.free_id 
                WHERE free.free_area_id= '$catId' AND NOT EXISTS (SELECT 1
                FROM ctt_assign_proyect AS assi
                WHERE assi.free_id = free.free_id AND assi.ass_status = 1
                );";
        return $this->db->query($qry);
    }
    public function listFreelance2($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        $qry = "SELECT free.free_id, free.free_cve, free.free_name, free.free_area_id, 
                free.free_rfc, free.free_address, free.free_phone, free.free_email, free.free_unit, 
                free.free_plates, free.free_license, free.free_fed_perm, free.free_clase, free.`free_año` 
                FROM ctt_freelances AS free 
                LEFT JOIN ctt_assign_proyect AS ass ON ass.free_id=free.free_id 
                WHERE free.free_area_id=  $catId AND NOT EXISTS (SELECT 1
            FROM ctt_assign_proyect AS assi
            WHERE assi.free_id = free.free_id AND assi.ass_status = 1
            );";
        return $this->db->query($qry);
    }

// Listado de Productos
    public function listProducts($param)
    {
        $catId = $this->db->real_escape_string($param['catId']);
        
        $qry = "SELECT pd.prd_id, pd.prd_sku, pd.prd_name, (
                    SELECT ifnull(max(convert(substring( ser_sku,8,4), signed integer)),0) + 1 
                    FROM ctt_series WHERE prd_id = pd.prd_id AND ser_behaviour = 'C'
                ) as serNext, sb.sbc_name, ct.cat_name
                FROM ctt_products AS pd 
                INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
                INNER JOIN ctt_categories AS ct ON ct.cat_id = sb.cat_id
                WHERE pd.prd_status = '1' AND pd.prd_level IN ('P', 'A') AND ct.cat_id = $catId;";
        return $this->db->query($qry);
    }	

// Registra los movimientos entre almacenes
public function NextExchange()
{
    $qry = "INSERT INTO ctt_counter_exchange (con_status) VALUES ('1');	";
    $this->db->query($qry);
    return $this->db->insert_id;
}

// Registra los movimientos entre almacenes
    public function SaveFreelanceProy($param, $user)
    {
        //$employee_data = explode("|",$user);
        $pry_id	= $this->db->real_escape_string($param['pry']);
        $free_id 	= $this->db->real_escape_string($param['free']);
        $area_id		= $this->db->real_escape_string($param['area']);
        $sdate	= $this->db->real_escape_string($param['sdate']);
        $edate	= $this->db->real_escape_string($param['edate']);
        $com	= $this->db->real_escape_string($param['com']);

        $qry = "INSERT INTO ctt_assign_proyect (
            pjt_id, free_id, ass_date_start, ass_date_end, ass_coments, 
            ass_status) 
        VALUES (
            '$pry_id', '$free_id ', ' $sdate', '$edate', '$com','1'
        );";
        $this->db->query($qry);
        $ass_Id = $this->db->insert_id;

        return $free_id;
    }
    
    public function listFreelances2($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qry = "SELECT free.free_id, free.free_cve, free.free_name, free.free_area_id, 
                free.free_rfc, free.free_address, free.free_phone, free.free_email, 
                free.free_unit, free.free_plates, free.free_license, free.free_fed_perm, 
                free.free_clase, free.`free_año`, prd.pjt_id, prd.pjt_name, are.are_id, are.are_name,
                ass.ass_id,ass.ass_date_start, ass.ass_date_end, ass.ass_coments
                FROM ctt_freelances AS free 
                INNER JOIN ctt_areas AS are ON are.are_id=free.free_area_id
                LEFT JOIN ctt_assign_proyect  AS ass ON ass.free_id=free.free_id
                LEFT JOIN ctt_projects AS prd ON prd.pjt_id= ass.pjt_id 
                WHERE prd.pjt_id = '$pjtId' AND ass_status";
        
        return $this->db->query($qry);
    }  
    public function listAssign()
    {
        $qry = "SELECT free.free_id, free.free_cve, free.free_name, free.free_area_id, 
                free.free_rfc, free.free_address, free.free_phone, free.free_email, 
                free.free_unit, free.free_plates, free.free_license, free.free_fed_perm, 
                free.free_clase, free.`free_año`, prd.pjt_id, prd.pjt_name, are.are_id, are.are_name,
                ass.ass_id,ass.ass_date_start, ass.ass_date_end, ass.ass_coments
                FROM ctt_freelances AS free 
                INNER JOIN ctt_areas AS are ON are.are_id=free.free_area_id
                LEFT JOIN ctt_assign_proyect  AS ass ON ass.free_id=free.free_id
                LEFT JOIN ctt_projects AS prd ON prd.pjt_id= ass.pjt_id";
        
        return $this->db->query($qry);
    }  

    public function UpdateAssignFreelance($param)
    {
        
        $ass_id	= $this->db->real_escape_string($param['ass']);
        $pry_id	= $this->db->real_escape_string($param['pry']);
        $free_id 	= $this->db->real_escape_string($param['free']);
        $area_id		= $this->db->real_escape_string($param['area']);
        $sdate	= $this->db->real_escape_string($param['sdate']);
        $edate	= $this->db->real_escape_string($param['edate']);
        $com	= $this->db->real_escape_string($param['com']);

        $qry = "UPDATE ctt_assign_proyect
                    SET pjt_id     =       '$pry_id',
                    free_id        =       '$free_id',
                    ass_date_start =       '$sdate',
                    ass_date_end   =        '$edate',
                    ass_coments    =        '$com',
                    ass_status      =       '1'                 
                    WHERE ass_id ='$ass_id';";
        $this->db->query($qry);
        return $ass_id;
       
    }
    // ACTUALIZA ESTATUS DE UN FREELANCE
    public function DeleteAssignFreelance($params)
	{
        $ass_id 	= $this->db->real_escape_string($params['ass_id']);
		$qry = "UPDATE ctt_assign_proyect
				SET ass_status = null
				WHERE ass_id = $ass_id";
        return $this->db->query($qry);
	}

}
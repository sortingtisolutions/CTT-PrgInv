<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class WhOutputsModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

// Obtiene el siguiente SKU   ******
    public function getNextSku($sbcId)
    {
        $qry = "SELECT ifnull(max(convert(substring(prd_sku,5,3), signed integer)),0) + 1 AS next
                FROM ctt_products  WHERE sbc_id = $sbcId;";
        return $this->db->query($qry);
    }

// Listado de Productos
    public function listProjects($params)
    {
        //$catId = $this->db->real_escape_string($params['catId']);

        $qry = "SELECT pt.pjttp_name, pj.pjt_name, pj.pjt_number,
                DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, 
                DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
                DATE_FORMAT(pj.pjt_date_last_motion,'%d/%m/%Y %H:%i ') AS pjt_date_project, 
                pj.pjt_location, pj.pjt_status,pj.pjt_id
                FROM ctt_projects AS pj 
                LEFT JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id 
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id 
                WHERE pj.pjt_status in ('4','7','8') ORDER BY pjt_date_start ASC;";
        return $this->db->query($qry);
    }

    public function getSelectProject($params)
    {
        /* $prdId = $this->db->real_escape_string($params['prdId']); */
        $qry = "SELECT pjtcn_id,pjtcn_prod_sku,pjtcn_prod_name,pjtcn_quantity,pjtcn_prod_level
                FROM ctt_projects_content AS pj
                WHERE pj.pjt_id = 1 limit 1;";

        return $this->db->query($qry);
    }

    public function UpdateSeriesToWork($params)
    {
        $pjtid = $this->db->real_escape_string($params['pjtid']);

        $qry2 = "UPDATE ctt_projects SET pjt_status='7'
                WHERE pjt_id=$pjtid AND pjt_status='4';";

        $chprj = $this->db->query($qry2);

        $qry = "UPDATE ctt_series AS ser
                INNER JOIN ctt_projects_detail AS pjd ON pjd.ser_id=ser.ser_id
                INNER JOIN ctt_projects_version AS pjv ON pjv.pjtvr_id=pjd.pjtvr_id
                INNER JOIN ctt_version AS ver ON ver.ver_id=pjv.ver_id
                INNER JOIN ctt_projects AS pjt ON pjt.pjt_id=pjv.pjt_id
                SET ser.ser_stage='TA'
                WHERE pjt.pjt_id=$pjtid AND pjt.pjt_status='4';";
        return $this->db->query($qry);

    }

}

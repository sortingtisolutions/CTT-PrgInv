<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class CollectAccountsModel extends Model
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

        $qry = "SELECT * FROM ctt_collect_accounts AS clt
                LEFT JOIN ctt_customers AS cus ON cus.cus_id=clt.cus_id
                LEFT JOIN ctt_projects AS pjt ON pjt.pjt_id=clt.pjt_id
                ORDER BY clt.clt_date_generated,clt.clt_deadline ASC;";
        return $this->db->query($qry);
    }

    public function getSelectProject($params)
    {
        /* $prdId = $this->db->real_escape_string($params['prdId']); */
        $qry = "SELECT pjtcn_id,pjtcn_prod_sku,pjtcn_prod_name,pjtcn_quantity,pjtcn_prod_level
                FROM ctt_projects_content AS pj
                WHERE pj.pjt_id IN ('8','9') limit 1;";

        return $this->db->query($qry);
    }

    public function UpdateSeriesToWork($params)
    {
        $pjtid = $this->db->real_escape_string($params['pjtid']);

        $qry = "UPDATE ctt_series AS ser
                INNER JOIN ctt_projects_detail AS pjd ON pjd.ser_id=ser.ser_id
                INNER JOIN ctt_projects_version AS pjv ON pjv.pjtvr_id=pjd.pjtvr_id
                INNER JOIN ctt_version AS ver ON ver.ver_id=pjv.ver_id
                INNER JOIN ctt_projects AS pjt ON pjt.pjt_id=pjv.pjt_id
                SET ser.ser_stage='TA'
                WHERE (ver.ver_active=1 AND pjt.pjt_id=$pjtid AND pjt.pjt_status=4);";

        return $this->db->query($qry);
    }

}

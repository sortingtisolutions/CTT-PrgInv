<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class WorkInputContentModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

    // Listado de proyectos    ******
    public function listProjects($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT pt.pjttp_name, pj.pjt_name, pj.pjt_number,
                DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start,
                DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end,
                DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y %H:%i ') AS pjt_date_project,
                pj.pjt_location, cus.cus_name, '1' as analyst, '33' as freelance, pj.pjt_id
                FROM ctt_projects AS pj 
                INNER JOIN ctt_customers_owner AS cuw ON cuw.cuo_id=pj.cuo_id
                INNER JOIN ctt_customers AS cus ON cus.cus_id=cuw.cus_id
                INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_id=$pjt_id ORDER BY pjt_date_start ASC;";

        return $this->db->query($qry);
    }

// Listado de Productos de Proyecto asigando
    public function listDetailProds($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT pjtcn_id, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_quantity, 
                pjtcn_prod_level, pjt_id, pjtcn_status, pjtcn_order
                FROM ctt_projects_content WHERE pjt_id=$pjt_id order by pjtcn_order;";
        return $this->db->query($qry);
    }

   // Listado de Motivos para mantenimiento
   public function listSeries($params)
   {
        $pjtcnid = $this->db->real_escape_string($params['pjtcnid']);
       
        $qry = "SELECT *
                FROM ctt_reason_maintenance;";

       return $this->db->query($qry);
   }


   public function listSeriesFree($params)
   {
       $ser_id = $this->db->real_escape_string($params['serid']);
       $serorg = $this->db->real_escape_string($params['serorg']);

        $qry = "SELECT '$serorg' as id_orig, ser_id, ser_sku, ser_serial_number, 
                ser_situation, ser_stage, pr.prd_name, pr.prd_sku
                FROM ctt_series AS sr
                INNER JOIN ctt_products as pr on sr.prd_id = pr.prd_id
                WHERE sr.ser_sku LIKE '$ser_id%' and sr.ser_situation='D' and sr.ser_status=1;";
            
       return $this->db->query($qry);
   }

    // check de Productos
    public function checkSeries($params)
    {
        /* $pjtcnid = $this->db->real_escape_string($params['pjtcnid']);
        // $updt = "update ctt_series set ser_situation = 'TA', ser_stage = 'TA' 
        //         where ser_sku = '$pjtcnid' and ser_situation = 'EA'";

        $updt = "update ctt_series set ser_stage = 'TA' 
                where ser_sku = '$pjtcnid' and ser_situation = 'EA'";

         $this->db->query($updt);
         return $pjtcnid; */
        
    }

}

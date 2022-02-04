<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class WhOutputContentModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

    // Listado de proyectos
    public function listProjects($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT pt.pjttp_name, pj.pjt_name, pj.pjt_number,
        DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start,
        DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end,
        DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y %H:%i ') AS pjt_date_project,
        pj.pjt_location, pj.cuo_id, '1' as analyst, '33' as freelance, pj.pjt_id
        FROM ctt_projects AS pj INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
        LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
        WHERE pj.pjt_id=$pjt_id ORDER BY pjt_date_start ASC;";
        return $this->db->query($qry);
    }

// Listado de Productos de Proyecto asigando
    public function listDetailProds($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);
        $qry = "SELECT pjtcn_id, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_quantity, pjtcn_prod_level, pjt_id
        FROM ctt_projects_content WHERE pjt_id=$pjt_id order by 2;";
        return $this->db->query($qry);
    }

   // Listado de Productos
   public function listSeries($params)
   {
       $pjtcnid = $this->db->real_escape_string($params['pjtcnid']);
       $qry = "SELECT pd.pjtdt_id, pd.pjtdt_prod_sku, pr.prd_name, pr.prd_level,
       pr.prd_status,pd.ser_id,pd.pjtcn_id, sr.ser_serial_number
       FROM ctt_projects_detail pd INNER JOIN ctt_products pr
        ON pd.pjtcn_id=$pjtcnid and pd.prd_id=pr.prd_id
        LEFT JOIN ctt_series sr ON sr.ser_id = pd.ser_id
        order by 2 desc;";
       return $this->db->query($qry);
   }

   public function listSeriesFree($params)
   {
       $pjtser_id = $this->db->real_escape_string($params['pjtser_id']);
       $serorg = $this->db->real_escape_string($params['serorg']);
       $qry = "SELECT '$serorg' as id_orig, ser_id, ser_sku, ser_serial_number, ser_situation, ser_stage, pr.prd_name
       FROM ctt_series
        inner join ctt_products as pr on ctt_series.prd_id = pr.prd_id
       WHERE ser_sku like '$pjtser_id%' and ser_situation='D' and ser_status=1;";
      // WHERE ser_id=$pjtser_id and ser_situation='D' and ser_status=1 and ppjtdt_id=0;";
       return $this->db->query($qry);
   }

    // check de Productos
    public function checkSeries($params)
    {
        $pjtcnid = $this->db->real_escape_string($params['pjtcnid']);
        $updt = "update ctt_series set ser_situation = 'TA', ser_stage = 'TA' where ser_sku = '$pjtcnid'";

        //echo "<script type='text/javascript'>console.log('Consulta')</script>";
         $this->db->query($updt);
        //var_dump("Estado UPDATE".$update);


        /*$qry = "SELECT pd.pjtdt_id, pd.pjtdt_prod_sku, pr.prd_name, pr.prd_level,
       pr.prd_status,pd.ser_id,pd.pjtcn_id
       FROM ctt_projects_detail pd INNER JOIN ctt_products pr
       ON pd.pjtcn_id=$pjtcnid and pd.prd_id=pr.prd_id order by 2 desc;";
        return $this->db->query($qry);*/
// retonar ambos id el actual y el nuevo
        return $pjtcnid;
    }


}

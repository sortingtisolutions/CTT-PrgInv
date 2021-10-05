<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class WhOutputContentModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

    // Listado de proyectos
    public function listProjects()
    {
        /* $store = $this->db->real_escape_string();*/
        $qry = "SELECT pt.pjttp_name, pj.pjt_name, pj.pjt_number,
        DATE_FORMAT(pj.pjt_date_start,'%d/%m/%Y') AS pjt_date_start, 
        DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end, 
        DATE_FORMAT(pj.pjt_date_project,'%d/%m/%Y %H:%i ') AS pjt_date_project, 
        pj.pjt_location, pj.cuo_id, '1' as analyst, '33' as freelance, pj.pjt_id
        FROM ctt_projects AS pj INNER JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id 
        LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id 
        WHERE pj.pjt_id='1' ORDER BY pjt_date_start ASC;";
        return $this->db->query($qry);
    }    

// Listado de Productos de Proyecto asigando
    public function listDetailProds()
    {
/*        $store = $this->db->real_escape_string($store);*/
        $qry = "SELECT pjtcn_id, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_quantity, pjtcn_prod_level, pjt_id 
        FROM ctt_projects_content WHERE pjt_id='1' order by 2;";
        return $this->db->query($qry);
    }    

   // Listado de Productos
   public function listSeries()
   {
/*       $prodId = $this->db->real_escape_string($params['prdId']); */
       $qry = "SELECT pjtdt_id, pjtdt_prod_sku, pjtdt_prod_name, pjtdt_prod_level, 
       pjtdt_status, ser_id, pjtcn_id 
       FROM ctt_projects_detail WHERE pjtcn_id=2 order by 2,5 desc;";
       return $this->db->query($qry);
   }
   
   public function listSeriesFree()
   {
/*       $prodId = $this->db->real_escape_string($params['prdId']); */
       $qry = "SELECT ser_id, ser_sku, ser_serial_number, ser_situation, ser_stage 
       FROM ctt_series 
       WHERE ser_sku like '090A009A007%' and ser_situation='D' and ser_status=1 and pjtdt_id=0;";
       return $this->db->query($qry);
   }
   
}
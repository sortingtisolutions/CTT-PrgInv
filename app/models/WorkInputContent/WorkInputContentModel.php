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
                pj.pjt_location, cus.cus_name, pj.pjt_id
                FROM ctt_projects AS pj 
                LEFT JOIN ctt_customers_owner AS cuw ON cuw.cuo_id=pj.cuo_id
                LEFT JOIN ctt_customers AS cus ON cus.cus_id=cuw.cus_id
                LEFT JOIN ctt_location AS lo ON lo.loc_id = pj.loc_id
                LEFT JOIN ctt_projects_type As pt ON pt.pjttp_id = pj.pjttp_id
                WHERE pj.pjt_id=$pjt_id ORDER BY pjt_date_start ASC;";

        return $this->db->query($qry);
    }

// Listado de Productos de Proyecto asigando
    public function listDetailProds($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);
        $empid = $this->db->real_escape_string($params['empid']);

        if ($empid==1){
            $qry = "SELECT pjtcn_id, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_quantity, 
            pjtcn_prod_level, pjt_id, pjtcn_status, pjtcn_order
            FROM ctt_projects_content WHERE pjt_id=$pjt_id order by pjtcn_order;";
        }
        else{
            $qry = "SELECT pjtcn_id, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_quantity, 
            pjtcn_prod_level, pjt_id, pjtcn_status, pjtcn_order,SUBSTR(pjc.pjtcn_prod_sku,1,2)
            FROM ctt_projects_content AS pjc
            INNER JOIN ctt_categories AS cat ON lpad(cat.cat_id,2,'0')=SUBSTR(pjc.pjtcn_prod_sku,1,2)
            INNER JOIN ctt_employees AS em ON em.are_id=cat.are_id
            WHERE pjc.pjt_id=$pjt_id AND em.emp_id=$empid
            ORDER BY pjc.pjtcn_order;";
        }
        return $this->db->query($qry);
    }

    public function listFreelances($params)
    {
        $pjt_id = $this->db->real_escape_string($params['pjt_id']);

        $qry = "SELECT fr.free_id,fr.free_name,ar.are_name FROM ctt_freelances AS fr
                INNER JOIN ctt_areas AS ar ON ar.are_id=fr.free_area_id
                INNER JOIN ctt_assign_proyect AS ap ON ap.free_id=fr.free_id
                WHERE ap.pjt_id=$pjt_id 
                ORDER BY are_name";

        return $this->db->query($qry);
    }

    public function listSeries($params)
   {
        $pjtcnid = $this->db->real_escape_string($params['pjtcnid']);
       
        $qry = "SELECT pdt.pjtdt_id, pdt.pjtdt_prod_sku, prd.prd_name, prd.prd_level, prd.prd_status, pdt.ser_id, pdt.pjtvr_id, 
                sr.ser_sku, sr.ser_serial_number, sr.ser_situation, sr.ser_stage
                FROM ctt_projects_content AS pcn
                INNER JOIN ctt_projects_version as pjv ON pcn.pjtvr_id=pjv.pjtvr_id
                INNER JOIN ctt_projects_detail AS pdt ON pcn.pjtvr_id=pdt.pjtvr_id
                INNER JOIN ctt_series AS sr ON pdt.ser_id=sr.ser_id
                LEFT JOIN ctt_products AS prd ON prd.prd_id=pdt.prd_id
                WHERE pcn.pjtcn_id=$pjtcnid AND prd.prd_level!='A' 
                ORDER BY pdt.pjtdt_prod_sku;";

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

   // Listado de Motivos para mantenimiento
   public function listReason($params)
   {
        $pjtcnid = $this->db->real_escape_string($params['pjtcnid']);
       
        $qry = "SELECT * FROM ctt_project_change_reason;";

       return $this->db->query($qry);
   }


    // check de Productos
    public function checkSeries($params)
    {
        $serId = $this->db->real_escape_string($params['serId']);

        $updt = "UPDATE ctt_series 
                SET ser_situation='D', ser_stage = 'D', pjtdt_id=0
                WHERE ser_id = $serId;";

         $this->db->query($updt);
         return $serId;
    }
    // listar los datos de las series que coinciden
    public function getSeries($params){
        $serSku = $this->db->real_escape_string($params['serSku']);
        $prjid = $this->db->real_escape_string($params['prjid']);
        $qry = "SELECT * FROM ctt_series AS sr 
        INNER JOIN ctt_products AS pd ON pd.prd_id = sr.prd_id
        INNER JOIN ctt_projects_detail AS pjd ON pjd.ser_id = sr.ser_id
        INNER JOIN ctt_projects_content AS ct ON ct.pjtvr_id=pjd.pjtvr_id
        WHERE ct.pjt_id=$prjid and pjd.ser_id>0 AND sr.ser_sku like '$serSku%';";

       return $this->db->query($qry);
    }
    public function ActualizaSeries($params){
        $serid		= $this->db->real_escape_string($params['serid']);

        $qry = "UPDATE ctt_series SET ser_situation='D', ser_stage = 'D', pjtdt_id=0
                WHERE ser_id=$serid;";  
        $folio = $this->db->query($qry);
        return $folio;
    }
    public function regMaintenance($params)
    {
        $serId = $this->db->real_escape_string($params['serId']);
        $codstag = $this->db->real_escape_string($params['codstag']);
        $codmot = $this->db->real_escape_string($params['codmot']);
        $prjid = $this->db->real_escape_string($params['prjid']);

        $qryins = "INSERT INTO ctt_products_maintenance 
                                (pmt_date_register,ser_id, pjt_id, pjtcr_id, mts_id) 
                    VALUES (CURRENT_TIMESTAMP, $serId, $prjid, $codmot, 1);";
        $this->db->query($qryins);
        $mainId = $this->db->insert_id;

        $updt = "UPDATE ctt_series 
                    SET ser_situation='M', ser_stage = '$codstag'
                WHERE ser_id = $serId;";
        
         $this->db->query($updt);

         return $serId;
        
    }

    // check de Productos
    public function createTblResp($params)
    {
        $prjid = $this->db->real_escape_string($params['prjid']);
        $prjnum = $this->db->real_escape_string($params['prjnum']);

        $updt = "CREATE TABLE CLOSE_PROYECT_".$prjnum." SELECT pjd.pjtdt_id, pjd.pjtdt_prod_sku, pjd.pjtvr_id, 
                pjtcn_id, pjtcn_prod_sku, pjtcn_quantity, pjtcn_days_base, pjtcn_days_cost, 
                pjtcn_discount_base, pjtcn_discount_insured, pjtcn_days_trip, pjtcn_discount_trip, 
                pjtcn_days_test, pjtcn_discount_test ,pjtcn_insured, pjtcn_prod_level, pjtcn_section, 
                pjtcn_order, ver_id, pjt_id, 
                sr.ser_id, ser_sku, ser_serial_number,ser_situation, ser_stage, 
                prd.prd_id, prd_name, prd_price, sbc_id 
                FROM ctt_projects_detail AS pjd
                INNER JOIN ctt_projects_content AS pjc ON pjc.pjtvr_id=pjd.pjtvr_id
                INNER JOIN ctt_series AS sr ON sr.ser_id=pjd.ser_id
                INNER JOIN ctt_products AS prd ON prd.prd_id=sr.prd_id
                WHERE pjc.pjt_id=$prjid;";

         $this->db->query($updt);
         return $prjid;
        
    }

}

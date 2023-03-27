<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class WhOutputContentModel extends Model
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

        $qry = "SELECT pjtcn_id, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_quantity, 
                pjtcn_prod_level, pjt_id, pjtcn_status, pjtcn_order
                FROM ctt_projects_content WHERE pjt_id=$pjt_id order by pjtcn_order;";
        return $this->db->query($qry);
    }

   // Listado de Productos
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
                WHERE pcn.pjtcn_id=$pjtcnid ORDER BY pdt.pjtdt_prod_sku;";

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
        $pjtcnid = $this->db->real_escape_string($params['pjtcnid']);
        /* $updt = "update ctt_series set ser_situation = 'TA', ser_stage = 'TA' 
                where ser_sku = '$pjtcnid' and ser_situation = 'EA'";
 */
        $updt = "UPDATE ctt_series set ser_stage = 'TA' 
                where ser_sku = '$pjtcnid' and ser_situation = 'EA'";

         $this->db->query($updt);
         return $pjtcnid;

        /*$qry = "SELECT pd.pjtdt_id, pd.pjtdt_prod_sku, pr.prd_name, pr.prd_level,
       pr.prd_status,pd.ser_id,pd.pjtcn_id
       FROM ctt_projects_detail pd INNER JOIN ctt_products pr
       ON pd.pjtcn_id=$pjtcnid and pd.prd_id=pr.prd_id order by 2 desc;";
        return $this->db->query($qry);*/
        
    }

    
    /** ==== Obtiene el contenido del proyecto =============================================================  */
   
    public function NextExchange()
    {
        $qry = "INSERT INTO ctt_counter_exchange (con_status) VALUES ('1');	";
        $this->db->query($qry);

        return $this->db->insert_id;
    }

    public function ActualizaSeries($params)
    {
        $serid		= $this->db->real_escape_string($params['serid']);

       /*  $qry = "UPDATE ctt_series AS ser
                INNER JOIN ctt_projects_detail pjd ON pjd.ser_id=ser.ser_id
                INNER JOIN ctt_projects_content AS ct ON ct.ver_id=pjd.pjtvr_id
                INNER JOIN ctt_projects AS pj ON pj.pjt_id=ct.pjt_id
                SET ser.ser_stage='UP'
                WHERE pj.pjt_id=$pjtid;"; */

        $qry = "UPDATE ctt_series SET ser_stage='UP'
                WHERE ser_id=$serid;";
        
        $folio = $this->db->query($qry);
        return $folio;
    }

public function SaveExchange($param, $user)
	{
		$employee_data = explode("|",$user);
        $folio				= $this->db->real_escape_string($param['folio']);

		$exc_sku_product 	= $this->db->real_escape_string($param['prdsku']);
		$exc_product_name 	= $this->db->real_escape_string($param['prdnam']);
		$exc_quantity 		= $this->db->real_escape_string($param['cntqty']);
		$exc_serie_product	= $this->db->real_escape_string($param['serid']);
		$exc_store			= $this->db->real_escape_string($param['strid']);
		$exc_comments		= '';
		$exc_proyect		= $this->db->real_escape_string($param['prjId']);
		$exc_employee_name	= $this->db->real_escape_string($employee_data[2]);
		$ext_code			= 'SRP';
		$ext_id				= '7';

		$qry = "INSERT INTO ctt_stores_exchange (exc_sku_product, exc_product_name, exc_quantity, 
				exc_serie_product, exc_store, exc_comments, exc_proyect, exc_employee_name, 
				ext_code, ext_id, con_id)
				VALUES ('$exc_sku_product', '$exc_product_name', $exc_quantity, 
				'$exc_serie_product', '$exc_store', '$exc_comments', '$exc_proyect', 
				'$exc_employee_name', '$ext_code', $ext_id, $folio); ";
		$this->db->query($qry);
		return $folio;
	}

    public function GetProjectDetail($params)
    {
        $pjtid        = $this->db->real_escape_string($params['pjtid']);

        $qry = "SELECT stp.stp_id,(stp.stp_quantity-1) AS stp_quantity, stp.str_id, stp.ser_id, stp.prd_id,
                ct.pjtcn_prod_sku,ct.pjtcn_prod_name,ct.pjtcn_quantity,ct.pjt_id
                FROM ctt_stores_products AS stp
                INNER JOIN ctt_projects_detail AS pjd ON pjd.ser_id=stp.ser_id
                INNER JOIN ctt_projects_content AS ct ON ct.pjtvr_id=pjd.pjtvr_id
                WHERE ct.pjt_id=$pjtid and pjd.ser_id>0;";

        return $this->db->query($qry);
    }

    public function UpdateProducts($param)
	{
        $stpid 		= $this->db->real_escape_string($param['stpid']);
        $quantity 	= $this->db->real_escape_string($param['stpqty']);
		/* $idStrSrc 	= $this->db->real_escape_string($param['strid']);
        $serid 		= $this->db->real_escape_string($param['serid']);
        $prodId 	= $this->db->real_escape_string($param['prodId']); */
		
		$qry = "UPDATE ctt_stores_products 
                SET stp_quantity = $quantity 
                WHERE stp_id = $stpid;";
		return $this->db->query($qry);
	}

    public function GetOutProject($params)
    {
        $pjtid = $this->db->real_escape_string($params['pjtid']);
        
        $updt = "UPDATE ctt_projects SET pjt_status = '7' 
                WHERE pjt_id = '$pjtid' AND pjt_status = '4'";

         /* $this->db->query($updt); */
         return $this->db->query($updt);
        
    }

}

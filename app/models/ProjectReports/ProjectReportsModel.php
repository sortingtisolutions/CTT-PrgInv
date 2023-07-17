<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProjectReportsModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }


/* -- Listado de proyectos  ------------------------------------- */    
    public function listAnalysts($params)
    {
        $qry = "SELECT emp_id, emp_fullname FROM ctt_employees WHERE pos_id=8;";
        return $this->db->query($qry);

    }

    public function listCustomers($params)
    {
        $qry = "SELECT emp_id, emp_fullname FROM ctt_employees WHERE pos_id=8;";
        return $this->db->query($qry);

    }

/* -- Listado de contenido de proyecto seleccionado  -------------- */
    public function projectContent($params)
    {
        $fechaIni = $this->db->real_escape_string($params['fechaIni']);
        $fechaFin = $this->db->real_escape_string($params['fechaFin']);
        $findAna = $this->db->real_escape_string($params['findAna']);
        $findCli = $this->db->real_escape_string($params['findCli']);
        $bandera = $this->db->real_escape_string($params['bandera']);

/*         if ($bandera == '0' ){
            $qry = "SELECT  pjt.pjt_name, pjttp.pjttp_name,SUM(pjtcn_prod_price) AS allsum,cust.cus_name 
                FROM ctt_projects_content AS pjc
                INNER JOIN ctt_projects as pjt ON  pjc.pjt_id=pjt.pjt_id
                INNER JOIN ctt_projects_type AS pjttp ON pjttp.pjttp_id=pjt.pjttp_id
                LEFT JOIN ctt_customers_owner AS cusow ON cusow.cuo_id=pjt.cuo_id
                LEFT JOIN ctt_customers AS cust ON cust.cus_id=cusow.cus_id
                GROUP BY pjt.pjt_name,pjttp.pjttp_name,cust.cus_name;";
           
        } elseif($bandera == '1'){
            $qry = "SELECT  pjt.pjt_name, pjttp.pjttp_name,SUM(pjtcn_prod_price) AS allsum,cust.cus_name 
                FROM ctt_projects_content AS pjc
                INNER JOIN ctt_projects as pjt ON  pjc.pjt_id=pjt.pjt_id
                INNER JOIN ctt_projects_type AS pjttp ON pjttp.pjttp_id=pjt.pjttp_id
                LEFT JOIN ctt_customers_owner AS cusow ON cusow.cuo_id=pjt.cuo_id
                LEFT JOIN ctt_customers AS cust ON cust.cus_id=cusow.cus_id
                WHERE pjt.pjt_date_start >= $fechaIni AND 
                pjt.pjt_date_end <= $fechaFin
                GROUP BY pjt.pjt_name,pjttp.pjttp_name,cust.cus_name;";
           
        } elseif ($bandera == '2'){
            $qry = "SELECT  pjt.pjt_name, pjttp.pjttp_name,SUM(pjtcn_prod_price) AS allsum, cust.cus_name 
                FROM ctt_projects_content AS pjc
                INNER JOIN ctt_projects as pjt ON  pjc.pjt_id=pjt.pjt_id
                INNER JOIN ctt_projects_type AS pjttp ON pjttp.pjttp_id=pjt.pjttp_id
                LEFT JOIN ctt_customers_owner AS cusow ON cusow.cuo_id=pjt.cuo_id
                LEFT JOIN ctt_customers AS cust ON cust.cus_id=cusow.cus_id
                WHERE pjt.pjt_date_start >= $fechaIni 
                AND pjt.pjt_date_end <= $fechaFin
                GROUP BY pjt.pjt_name,pjttp.pjttp_name,cust.cus_name;";
        }  */

       /*  $qry = "SELECT dt.ser_id, dt.prd_id, dt.pjtdt_prod_sku, cn.pjtcn_prod_name, cn.pjtcn_prod_price, ifnull(sr.ser_comments,'') AS ser_comments
                    , (cn.pjtcn_prod_price * cn.pjtcn_days_cost) - (cn.pjtcn_prod_price * cn.pjtcn_discount_base) * cn.pjtcn_days_cost + (cn.pjtcn_prod_price * cn.pjtcn_days_trip) - ((cn.pjtcn_prod_price * cn.pjtcn_discount_trip) * cn.pjtcn_days_trip) + (cn.pjtcn_prod_price * cn.pjtcn_days_test) -  (cn.pjtcn_prod_price * cn.pjtcn_discount_test) * cn.pjtcn_days_test as costo
                FROM ctt_projects_detail AS dt
                INNER JOIN ctt_projects_content AS cn ON cn.pjtvr_id = dt.pjtvr_id AND cn.prd_id = dt.prd_id
                LEFT JOIN ctt_series AS sr ON sr.ser_id = dt.ser_id
                WHERE cn.pjt_id = $pjtId;"; */

            $qry = "SELECT  pjt.pjt_name, pjttp.pjttp_name,SUM(pjtcn_prod_price) AS allsum, cust.cus_name 
                FROM ctt_projects_content AS pjc
                LEFT JOIN ctt_projects as pjt ON  pjc.pjt_id=pjt.pjt_id
                LEFT JOIN ctt_projects_type AS pjttp ON pjttp.pjttp_id=pjt.pjttp_id
                LEFT JOIN ctt_customers_owner AS cusow ON cusow.cuo_id=pjt.cuo_id
                LEFT JOIN ctt_customers AS cust ON cust.cus_id=cusow.cus_id
                WHERE pjt.pjt_date_start >= '2022-01-01' 
                AND pjt.pjt_date_end <= '2023-06-12' 
                GROUP BY pjt.pjt_name,pjttp.pjttp_name,cust.cus_name;";
        return $this->db->query($qry);
    }
    


/* -- Listado ventas de expendables  --------------------------------------------------------- */
    public function saleExpendab($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);

        $qry = "SELECT sum(sd.sld_quantity * sd.sld_price) AS expendables
                FROM ctt_sales_details AS sd
                INNER JOIN ctt_sales as sl on sl.sal_id = sd.sal_id
                WHERE pjt_id =  $pjtId;";
        return $this->db->query($qry);

    }




}
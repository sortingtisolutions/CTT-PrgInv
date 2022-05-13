<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class PeriodsModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    
/** ====== Obtiene el periodo total del proyecto  ============================================  */
    function getPeriodProject($params){
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qry = "SELECT 
                    date_format(pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                    date_format(pjt_date_end, '%Y%m%d') AS pjt_date_end 
                FROM ctt_projects 
                WHERE pjt_id = $pjtId;";
        return $this->db->query($qry);
    }

/** ====== Obtiene los periodos de las series  ===============================================  */
    function getPeriodSeries($params){
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $prdId = $this->db->real_escape_string($params['prdId']);
        $qry = "SELECT 
                      pp.pjtpd_id
                    , DATE_FORMAT(pp.pjtpd_day_start, '%Y%m%d') AS start
                    , DATE_FORMAT(pp.pjtpd_day_end, '%Y%m%d') AS end
                    , pd.pjtdt_id
                    , pd.pjtdt_prod_sku
                    , pd.ser_id
                    , concat(pd.pjtdt_id,'-', ifnull(sr.ser_serial_number,'0')) as serie
                    , pd.prd_id
                    , pd.pjtcn_id
                    , pp.pjtpd_sequence
                FROM ctt_projects_periods AS pp
                INNER JOIN ctt_projects_detail AS pd ON pd.pjtdt_id = pp.pjtdt_id
                INNER JOIN ctt_projects_content AS cn ON cn.pjtcn_id = pd.pjtcn_id
                LEFT JOIN ctt_series As sr ON sr.ser_id = pd.ser_id
                WHERE cn.pjt_id = '$pjtId' AND pd.prd_id = '$prdId'
                ORDER BY pd.pjtdt_prod_sku, pp.pjtpd_day_start, pp.pjtpd_sequence;";
        return $this->db->query($qry);
    }
}
<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class PeriodsModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }

    
/** ====== Obtiene el periodo total del proyecto  ==========================  */
    public function getPeriodProject($params){
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qry = "SELECT 
                    date_format(pjt_date_start, '%Y%m%d') AS pjt_date_start, 
                    date_format(pjt_date_end, '%Y%m%d') AS pjt_date_end 
                FROM ctt_projects 
                WHERE pjt_id = $pjtId;";
        return $this->db->query($qry);
    }

/** ====== Obtiene los periodos de las series  ===============================  */
    public function getPeriodSeries($params){
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
                    , pd.pjtvr_id
                    , pp.pjtpd_sequence
                FROM ctt_projects_periods AS pp
                INNER JOIN ctt_projects_detail AS pd ON pd.pjtdt_id = pp.pjtdt_id
                INNER JOIN ctt_projects_content AS cn ON cn.pjtvr_id = pd.pjtvr_id
                LEFT JOIN ctt_series As sr ON sr.ser_id = pd.ser_id
                WHERE cn.pjt_id = '$pjtId' AND pd.prd_id = '$prdId'
                ORDER BY pd.pjtdt_prod_sku, pp.pjtpd_day_start, pp.pjtpd_sequence;";
        return $this->db->query($qry);
    }

/** ==== Gruarda los periodos correspondientes ===============================================  */
    public function deletePeriods($params)
    {
        $pjtdtId = $this->db->real_escape_string($params['pjtdtId']);

        $qry1 = "DELETE FROM ctt_projects_periods WHERE pjtdt_id IN ($pjtdtId);";
        $this->db->query($qry1);

        $qry2 = "DELETE FROM ctt_projects_periods WHERE pjtdt_belongs IN ($pjtdtId);";
        $this->db->query($qry2);

        return 1;
    }    


/** ==== Gruarda los periodos correspondientes ===============================================  */
    public function savePeriods($params)
    {
        $pjtdtId    = $this->db->real_escape_string($params['pjtdtId']);
        $sequency   = $this->db->real_escape_string($params['sequency']);
        $start      = $this->db->real_escape_string($params['start']);
        $end        = $this->db->real_escape_string($params['end']);

        $qry1 = "INSERT INTO ctt_projects_periods
                    (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs, pjtpd_sequence)
                SELECT 
                    '$start' as pjtpd_day_start, '$end' as pjtpd_day_end, 
                    pjtdt_id, pjtdt_belongs, '$sequency' as pjtdt_sequence  
                FROM ctt_projects_detail WHERE pjtdt_id = $pjtdtId;";
        $this->db->query($qry1);

        $qry2 = "INSERT INTO ctt_projects_periods
                    (pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs, pjtpd_sequence)
                SELECT 
                    '$start' as pjtpd_day_start, '$end' as pjtpd_day_end, 
                    pjtdt_id, pjtdt_belongs, '$sequency' as pjtdt_sequence  
                FROM ctt_projects_detail WHERE pjtdt_belongs = $pjtdtId;";
        $this->db->query($qry2);
        
        return 1;

    }
}
<?php
defined('BASEPATH') or exit('No se permite acceso directo');
require( ROOT . PATH_ASSETS.  'ssp.class.php' );

class PaymentsAppliedModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}


// Obtiene el listado de las subcategorias activas
    public function listPaymentsApplied($params)
    {
        $qry = "SELECT * FROM ctt_payments_applied AS pym
                LEFT JOIN ctt_collect_accounts AS clt ON clt.clt_id=pym.clt_id
                LEFT JOIN ctt_projects AS pjt ON pjt.pjt_id=pym.pjt_id
                LEFT JOIN ctt_way_topay AS wtp ON wtp.wtp_id=pym.wtp_id
                ORDER BY pym.pym_id DESC;";

        return $this->db->query($qry);
    }

// Obtiene el listado de las subcategorias activas
    public function listProjects($params)
    {
        $qry = "SELECT * FROM ctt_projects WHERE pjt_status='8'
                ORDER BY 1 DESC;";

        return $this->db->query($qry);
    }

    
// Obtiene el listado de las subcategorias activas
    public function SaveSubcategory($params)
    {
        $sbcName = $this->db->real_escape_string($params['sbcName']);
        $sbcCode = $this->db->real_escape_string($params['sbcCode']);
        $catId = $this->db->real_escape_string($params['catId']);


        $qry = "INSERT INTO ctt_subcategories(sbc_code, sbc_name, sbc_status, cat_id)
                VALUES('$sbcCode',UPPER('$sbcName'),1,'$catId')";
        $this->db->query($qry);	
        $sbcId = $this->db->insert_id;
		return $sbcId;
    }

// Actualiza la subcategorias seleccionada
    public function UpdateSubcategory($params)
    {
        $sbcId      = $this->db->real_escape_string($params['sbcId']);
        $sbcName    = $this->db->real_escape_string($params['sbcName']);
        $sbcCode    = $this->db->real_escape_string($params['sbcCode']);
        $catId      = $this->db->real_escape_string($params['catId']);

        $qry = "UPDATE ctt_subcategories
                SET 
                      sbc_name  = UPPER('$sbcName'),
                      sbc_code  = '$sbcCode',
                      cat_id    = '$catId'
                WHERE sbc_id    = '$sbcId';";

        $this->db->query($qry);	
        return $sbcId;
    }

// Actualiza el status de la subcategorias a eliminar
    public function DeleteSubcategory($params)
    {
        $sbcid      = $this->db->real_escape_string($params['sbcId']);

        $qry = "UPDATE ctt_subcategories SET sbc_status = '0'
                WHERE sbc_id  = '$sbcid';";

        $this->db->query($qry);	
        return $sbcid;
    }

}
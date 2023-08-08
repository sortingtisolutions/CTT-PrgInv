<?php
defined('BASEPATH') or exit('No se permite acceso directo');
require( ROOT . PATH_ASSETS.  'ssp.class.php' );

class ListMaintenanceModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

    // Obtiene el listado de las subcategorias activas
    public function listReasons($params)
    {
        $qry = "SELECT * FROM ctt_project_change_reason ORDER BY 1;";

        return $this->db->query($qry);
    }

    // Obtiene el listado de las subcategorias activas
    public function saveReasons($params)
    {
        $descReas = $this->db->real_escape_string($params['descReas']);
        $defReas = $this->db->real_escape_string($params['defReas']);
        $codeMotiv = $this->db->real_escape_string($params['codeMotiv']);


        $qry = "INSERT INTO ctt_project_change_reason (pjtcr_definition, 
                        pjtcr_description, pjtcr_code_stage) 
                VALUES ('$defReas', '$descReas', '$codeMotiv');";
        $this->db->query($qry);	
        $pjtcr_id = $this->db->insert_id;
		return $pjtcr_id;
    }

    // Actualiza la subcategorias seleccionada
    public function updateReasons($params)
    {
        $pjtcrId      = $this->db->real_escape_string($params['pjtcrId']);
        $descReas    = $this->db->real_escape_string($params['descReas']);
        $defReas    = $this->db->real_escape_string($params['defReas']);
        $codeMotiv      = $this->db->real_escape_string($params['codeMotiv']);

        $qry = "UPDATE ctt_project_change_reason
                SET 
                    pjtcr_description  = UPPER('$descReas'),
                    pjtcr_definition  = '$defReas',
                    pjtcr_code_stage    = '$codeMotiv'
                WHERE pjtcr_id = '$pjtcrId';";

        $this->db->query($qry);	
        return $pjtcrId;
    }

    // Actualiza el status de la subcategorias a eliminar
    public function deleteReason($params)
    {
        $pjtcrId  = $this->db->real_escape_string($params['pjtcrId']);

        $qry = "DELETE FROM ctt_project_change_reason
                WHERE pjtcr_id  = '$pjtcrId';";

        $this->db->query($qry);	
        return $pjtcrId;
    }

}
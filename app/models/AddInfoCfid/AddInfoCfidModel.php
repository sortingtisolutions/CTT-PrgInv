<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AddInfoCfidModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

	// Obtiene los proyectos con posibilidad de CFDI ****
	public function listProjectsCfdi()
	{
		$qry = "SELECT pj.pjt_id,pjt_name, pjt_number, pjttp_name, cus_name, cus_rfc,cus_phone,
						cus_address,cus_email,cus_cve_cliente,cus_contact_name,cus_contact_phone,
						pjt_location,DATE_FORMAT(pj.pjt_date_end,'%d/%m/%Y') AS pjt_date_end,
						cfdi_distancia,cfid_transporte_ctt,cfdi_operador_movil,cfdi_unidad_movil,
						cfdi_placas,cfdi_permiso_fed,cfdi_cantidad_eq, cu.cus_id
				FROM ctt_projects AS pj
				left JOIN ctt_customers_owner AS co ON co.cuo_id=pj.cuo_id
				INNER JOIN ctt_customers AS cu ON cu.cus_id=co.cus_id
				INNER JOIN ctt_customers_type ct ON ct.cut_id=cu.cut_id
				INNER JOIN ctt_projects_type pt ON pt.pjttp_id=pj.pjttp_id
				LEFT JOIN ctt_infocfdi inf ON inf.pjt_id=pj.pjt_id
				WHERE pj.pjt_status IN (1,2,4);";
		return $this->db->query($qry);
	}

	//Guarda proveedor
	public function saveExtraCfdi($params)
	{
		$pjtId      	= $this->db->real_escape_string($params['pjtId']);
        $pjtname     	= $this->db->real_escape_string($params['pjtname']);
        $distcfdi      	= $this->db->real_escape_string($params['distcfdi']);
        $trancfdi      	= $this->db->real_escape_string($params['trancfdi']);
        $operacfdi   	= $this->db->real_escape_string($params['operacfdi']);
        $unidcfdi    	= $this->db->real_escape_string($params['unidcfdi']);
		$placacfdi      = $this->db->real_escape_string($params['placacfdi']);
        $permfed    	= $this->db->real_escape_string($params['permfed']);
        $projqty     	= $this->db->real_escape_string($params['projqty']);
		/* $resexis     	= $this->db->real_escape_string($params['resexis']); */

		$qry = "SELECT IF( EXISTS(SELECT pjt_id FROM ctt_infocfdi
				WHERE pjt_id = $pjtId), 1, 0) as resexis;";
		
		$result= $this->db->query($qry);
		$iddetail = $result->fetch_object();
            if ($iddetail != null){
                $resexis  = $iddetail->resexis; 
            } 
		
		if($resexis==0){
				$qry1 = "INSERT INTO ctt_infocfdi(cfdi_distancia, cfid_transporte_ctt, 
							cfdi_operador_movil, cfdi_unidad_movil, cfdi_placas, 
							cfdi_permiso_fed, cfdi_cantidad_eq, pjt_id) 
				VALUES ('$distcfdi','$trancfdi','$operacfdi','$unidcfdi',
						'$placacfdi','$permfed','$projqty','$pjtId')";

			$this->db->query($qry1);
			$comId = $this->db->insert_id;

		} elseif($resexis==1){
				$qry2 = "UPDATE ctt_infocfdi
							SET cfdi_distancia='$distcfdi', cfid_transporte_ctt='$trancfdi',
							cfdi_operador_movil='$operacfdi', cfdi_unidad_movil='$unidcfdi',
							cfdi_placas='$placacfdi', cfdi_permiso_fed='$permfed',
							cfdi_cantidad_eq='$projqty' 
						WHERE pjt_id='$pjtId';";

			$comId=$this->db->query($qry2);
		}	
		return $comId;
	}

	public function CheckExist($params)
	{
		$pjtId      	= $this->db->real_escape_string($params['pjtId']);

		$qry = "SELECT IF( EXISTS(SELECT pjt_id FROM ctt_infocfdi
				WHERE pjt_id = $pjtId), 1, 0) as resexis;";
		
		return $this->db->query($qry);
	}

    public function GetProveedor($params)
	{
	
	}

    public function ActualizaProveedor($params)
	{
     
	}

    //borra proveedor
	public function DeleteProveedores($params)
	{

	}

	public function GetTipoProveedores()
	{

	}

}
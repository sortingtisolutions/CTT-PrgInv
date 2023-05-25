<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AddInfoCfidModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}

// Obtiene los proveedores existentes  ****
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
		/* $idSup 		= $this->db->real_escape_string($params['id']);

		$qry = "SELECT sup_id, sup_business_name, sup_trade_name, sup_contact, sup_rfc, sup_email, sup_phone, sup_phone_extension, 
				sup_status, sup_credit, sup_credit_days, sup_balance, sup_money_advance, sup_advance_amount, sup_comments, 
				sut_id, sup_proof_tax_situation, sup_id_international_supplier, sup_description_id_is, sup_bank, sup_way_pay, sup_clabe 
				FROM ctt_suppliers
        WHERE sup_id = $idSup ;";

		$result = $this->db->query($qry);

		if($row = $result->fetch_row()){
			$item = array("sup_id" =>$row[0],

			"sup_business_name" =>$row[1], 
			"sup_trade_name" =>$row[2], 
			"sup_contact" =>$row[3], 
			"sup_rfc" =>$row[4], 
			"sup_email" =>$row[5], 
			"sup_phone" =>$row[6], 
			"sup_phone_extension" =>$row[7], 
			"sup_status" =>$row[8], 
			"sup_credit" =>$row[9], 
			"sup_credit_days" =>$row[10], 
			"sup_balance" =>$row[11], 
			"sup_money_advance" =>$row[12], 
			"sup_advance_amount" =>$row[13], 
			"sup_comments" =>$row[14], 
			"sut_id" =>$row[15], 
			"sup_proof_tax_situation" =>$row[16], 
			"sup_id_international_supplier" =>$row[17], 
			"sup_description_id_is" =>$row[18], 
			"sup_bank" =>$row[19], 
			"sup_way_pay" =>$row[20], 
			"sup_clabe" =>$row[21]); 
		}
		return $item; */
	}


    public function ActualizaProveedor($params)
	{
       /*  $estatus = 0;
			try {

				$qry = " UPDATE ctt_suppliers
                SET sup_business_name = '".$params['NomProveedor']."'
                ,sup_trade_name = '".$params['NomComercial']."'
				,sup_contact = '".$params['ContactoProveedor']."'
				,sup_rfc = '".$params['RfcProveedor']."'
				,sup_email = '".$params['EmailProveedor']."'
				,sup_phone = '".$params['PhoneProveedor']."'
				,sup_phone_extension = '".$params['PhoneAdicional']."'
				,sup_status = '1'
				,sup_credit = '".$params['selectCredito']."'
				,sup_credit_days = '".$params['DiasCredito']."'
				,sup_balance = '".$params['MontoCredito']."'
				,sup_money_advance = '".$params['selectAnticipo']."'
				,sup_advance_amount = '".$params['MontoAnticipo']."'
				,sut_id = '".$params['tipoProveedorId']."'
				,sup_proof_tax_situation = '".$params['selectConstancia']."'
				,sup_id_international_supplier = '".$params['ProveInternacional']."'
				,sup_description_id_is = '".$params['DatoDescripcion']."'
				,sup_bank = '".$params['DatoBanco']."'
				,sup_way_pay = '".$params['selectFormaPago']."'
				,sup_clabe = '".$params['DatoClabe']."'
				WHERE Sup_id = ".$params['IdProveedor'].";";

				$this->db->query($qry);	
				$estatus = $params['IdProveedor'];
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus; */
	}

    //borra proveedor
	public function DeleteProveedores($params)
	{
       /*  $estatus = 0;
        try {
            $qry = "UPDATE ctt_suppliers
                    SET sup_status = 0
                    WHERE sup_id in (".$params['IdProveedor'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus; */
	}

	public function GetTipoProveedores()
	{
		/* $qry = "SELECT sut_id,sut_name FROM ctt_suppliers_type WHERE sut_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("sut_id" =>$row[0],
						"sut_name" =>$row[1]);
			array_push($lista, $item);
		}
		return $lista; */
	}

}
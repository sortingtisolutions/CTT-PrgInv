<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProveedoresModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

// Obtiene los proveedores existentes  ****
	public function GetProveedores()
	{
		/* $qry = "SELECT sp.sup_id, sp.sup_business_name, sp.sup_contact, sp.sup_rfc, sp.sup_email, sp.sup_phone , 
				sp.sut_id, ts.sut_name
				FROM ctt_suppliers AS sp
				LEFT JOIN ctt_suppliers_type AS ts on ts.sut_id = sp.sut_id
				WHERE sp.sup_status = 1;"; */

		$qry = "SELECT sup_id, sup_business_name, sup_trade_name, sup_contact, sup_rfc, sup_email, 
				sup_phone, sup_phone_extension, sup_status, sup_credit, sup_credit_days, sup_balance, 
				sup_money_advance, sup_advance_amount, sup_comments, sp.sut_id, sup_proof_tax_situation, 
				sup_id_international_supplier, sup_description_id_is, sup_bank, sup_way_pay, 
				sup_clabe, ts.sut_name
				FROM ctt_suppliers AS sp
				LEFT JOIN ctt_suppliers_type AS ts on ts.sut_id = sp.sut_id
				WHERE sp.sup_status = 1;";
		return $this->db->query($qry);
	}

    public function GetProveedor($params)
	{
		$idSup 		= $this->db->real_escape_string($params['id']);

		$qry = "SELECT sup_id, sup_business_name, sup_trade_name, sup_contact, sup_rfc, sup_email, sup_phone, sup_phone_extension, 
				sup_status, sup_credit, sup_credit_days, sup_balance, sup_money_advance, sup_advance_amount, sup_comments, 
				sut_id, sup_proof_tax_situation, sup_id_international_supplier, sup_description_id_is, sup_bank, sup_way_pay, sup_clabe 
				FROM ctt_suppliers
        WHERE sup_id = $idSup ;";

		$result = $this->db->query($qry);

		if($row = $result->fetch_row()){
			$item = array("sup_id" =>$row[0],
			/* "sup_business_name" =>$row[1],
			"sup_contact"=>$row[2],
			"sup_rfc"=>$row[3],
			"sup_email"=>$row[4],
			"sup_phone"=>$row[5],
			"sut_id"=>$row[6]);
			"sup_id",  */

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
		return $item;
	}

//Guarda proveedor
public function SaveProveedores($params)
{
	$estatus = 0;
		try {
			/* $qry = "INSERT INTO ctt_suppliers (sup_business_name, sup_contact, sup_rfc, sup_email, sup_phone,sup_status, sut_id)
			VALUES('".$params['NomProveedor']."','".$params['ContactoProveedor']."','".$params['RfcProveedor']."','".$params['EmailProveedor']."','".$params['PhoneProveedor']."',1,'".$params['tipoProveedorId']."');";
			$this->db->query($qry);	 */

			$qry = "INSERT INTO ctt_suppliers (sup_business_name, sup_trade_name, sup_contact, 
					sup_rfc, sup_email, sup_phone, sup_phone_extension, sup_status, sup_credit, sup_credit_days, 
					sup_balance, sup_money_advance, sup_advance_amount, sut_id, sup_proof_tax_situation, 
					sup_id_international_supplier, sup_description_id_is, sup_way_pay, sup_bank, sup_clabe) 
					VALUES ('".$params['NomProveedor']."','".$params['NomComercial']."','".$params['ContactoProveedor']."',
					'".$params['RfcProveedor']."','".$params['EmailProveedor']."','".$params['PhoneProveedor']."',
					'".$params['PhoneAdicional']."', '1', '".$params['selectCredito']."','".$params['DiasCredito']."',
					'".$params['MontoCredito']."','".$params['selectAnticipo']."','".$params['MontoAnticipo']."',
					'".$params['tipoProveedorId']."','".$params['selectConstancia']."','".$params['ProveInternacional']."',
					'".$params['DatoDescripcion']."','".$params['selectFormaPago']."','".$params['DatoBanco']."','".$params['DatoClabe']."');";

			$this->db->query($qry);	

			$qry = "SELECT MAX(sup_id) AS id FROM ctt_suppliers;";
			$result = $this->db->query($qry);
			if ($row = $result->fetch_row()) {
				$lastid = trim($row[0]);
			}

			$estatus = $lastid;
		} catch (Exception $e) {
			$estatus = 0;
		}
	return $estatus;
}
    public function ActualizaProveedor($params)
	{
        $estatus = 0;
			try {
                /* $qry = " UPDATE ctt_suppliers
                SET sup_business_name = '".$params['NomProveedor']."'
                ,sup_contact = '".$params['ContactoProveedor']."'
                ,sup_rfc = '".$params['RfcProveedor']."' 
                ,sup_email = '".$params['EmailProveedor']."'
				,sut_id = '".$params['tipoProveedorId']."'
                ,sup_phone = '".$params['PhoneProveedor']."'
                WHERE Sup_id = ".$params['IdProveedor'].";"; */

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
		return $estatus;
	}

    //borra proveedor
	public function DeleteProveedores($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_suppliers
                    SET sup_status = 0
                    WHERE sup_id in (".$params['IdProveedor'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}

	public function GetTipoProveedores()
	{
		$qry = "SELECT sut_id,sut_name FROM ctt_suppliers_type WHERE sut_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("sut_id" =>$row[0],
						"sut_name" =>$row[1]);
			array_push($lista, $item);
		}
		return $lista;
	}



}
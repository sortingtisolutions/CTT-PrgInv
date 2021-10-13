<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AlmacenesModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveAlmacen($params)
	{
        $estatus = 0;
			try {
                $qry = "INSERT INTO ctt_stores(str_name, str_type,str_status, emp_id) 
                VALUES ('".$params['NomAlmacen']."','".$params['tipoAlmacen']."',1,'".$params['EncargadoAlmacen']."')";
                $this->db->query($qry);	
				$qry = "SELECT MAX(str_id) AS id FROM ctt_stores;";
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
// Optiene los Usuaios existentes
	public function GetAlmacenes()
	{
	/*	$qry = "SELECT str_id, str_name, str_type, str.emp_id , emp_fullname  FROM ctt_stores AS str
				LEFT JOIN ctt_employees AS emp ON emp.emp_id = str.emp_id
				WHERE str.str_status = 1;"; */
		$qry = "SELECT str.str_id, str.str_name, str.str_type, str.emp_id, str.emp_fullname,
				ifnull(sum(sp.stp_quantity),0) as cantidad 
				FROM  ctt_stores 					AS str
				LEFT JOIN ctt_stores_products      AS sp ON str.str_id=sp.str_id
				WHERE str.str_status = 1 
				GROUP BY str.str_id, str.str_name, str.str_type, str.emp_id, str.emp_fullname
				ORDER BY str.str_id;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("str_id" =>$row[0],
						"str_name" =>$row[1],
						"str_type"=>$row[2],
						"emp_id"=>$row[3],
						"emp_fullname"=>$row[4],
						"cantidad"=>$row[5]);
			array_push($lista, $item);
		}
		return $lista;
	}

    public function GetAlmacen($params)
	{
		$qry = "SELECT str_id, str_name, str_type, emp_id, emp_fullname  FROM ctt_stores WHERE str_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("str_id" =>$row[0],
			"str_name" =>$row[1],
			"str_type"=>$row[2],
			"emp_id"=>$row[3],
			"emp_fullname"=>$row[4]);
		}
		return $item;
	}


    public function ActualizaAlmacen($params)
	{
        $estatus = 0;
			try {
                $qry = " UPDATE ctt_stores
                SET str_name = '".$params['NomAlmacen']."'
                ,str_type ='".$params['tipoAlmacen']."'
				,emp_fullname ='".$params['EncargadoAlmacen']."'

                WHERE str_id = ".$params['IdAlmacen'].";";

				$this->db->query($qry);	
				$estatus = $params['IdAlmacen'];
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteAlmacen($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_stores
                    SET str_status = 0
                    WHERE str_id in (".$params['IdAlmacen'].")";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}


	public function GetEncargadosAlmacen()
	{
		$qry = "SELECT emp_id, emp_fullname FROM ctt_employees WHERE emp_status = 1;";
		$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("emp_id" =>$row[0],
						  "emp_fullname" =>$row[1]);
			array_push($lista, $item);
		}
		return $lista;
	}
	
	public function listSeries($params)
    {
        $prodId = $this->db->real_escape_string($params['strId']);
        $qry = "SELECT  se.ser_id, se.ser_sku, se.ser_serial_number, 
				date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
				se.ser_cost, se.ser_situation, se.ser_stage, se.ser_status,se.ser_comments
				FROM ctt_series as se 
				LEFT JOIN ctt_stores_products AS sp ON sp.ser_id = se.ser_id
				WHERE sp.str_id IN ($prodId) AND sp.stp_quantity > 0
				ORDER BY se.ser_sku;";
        return $this->db->query($qry);
    }

}
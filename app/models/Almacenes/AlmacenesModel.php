<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class AlmacenesModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

//Guarda proveedor  ***
	public function SaveAlmacen($params)
	{
		$str_name 	= $this->db->real_escape_string($params['str_name']);
		$str_type 	= $this->db->real_escape_string($params['str_type']);
		$emp_name 	= $this->db->real_escape_string($params['emp_name']);

		$qry = "INSERT INTO ctt_stores(str_name, str_type,str_status, emp_fullname) 
				VALUES (UPPER('$str_name'),UPPER('$str_type'),1,UPPER('$emp_name'))";
		$this->db->query($qry);	
		$str_id = $this->db->insert_id;
		return $str_id;

	}
	
// Optiene los Usuaios existentes
	public function GetAlmacenes($params)
	{
	
		$qry = "SELECT str.str_id, str.str_name, UPPER(str.str_type) as str_type, str.emp_id, str.emp_fullname,
				'0' as cantidad 
				FROM  ctt_stores AS str
				LEFT JOIN ctt_stores_products AS sp ON str.str_id = sp.str_id
				WHERE str.str_status = 1 
				GROUP BY str.str_id, str.str_name, str.str_type, str.emp_id, str.emp_fullname
				ORDER BY str.str_id;";
		return $this->db->query($qry);
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

    public function UpdateAlmacen($params)
	{

		$str_id 	= $this->db->real_escape_string($params['str_id']);
		$str_name 	= $this->db->real_escape_string($params['str_name']);
		$str_type 	= $this->db->real_escape_string($params['str_type']);
		$emp_name 	= $this->db->real_escape_string($params['emp_name']);

		$qry = " UPDATE ctt_stores
					SET str_name 		= UPPER('$str_name'),
						str_type 		= UPPER('$str_type'),
						emp_fullname 	= UPPER('$emp_name')
				WHERE str_id = '$str_id';";
		$this->db->query($qry);	
			
		return $str_id;
	}

    //borra proveedor
	public function DeleteAlmacen($params)
	{
        $str_id 	= $this->db->real_escape_string($params['str_id']);
		$qry = "UPDATE ctt_stores
				SET str_status = 0
				WHERE str_id = $str_id";
        return $this->db->query($qry);
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
        /* $qry = "SELECT  se.ser_id, se.ser_sku, se.ser_serial_number, 
						date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
						se.ser_cost, se.ser_situation, se.ser_stage, se.ser_status,se.ser_comments
				FROM ctt_series as se 
				LEFT JOIN ctt_stores_products AS sp ON sp.ser_id = se.ser_id
				WHERE sp.str_id IN ($prodId) AND sp.stp_quantity > 0
				ORDER BY se.ser_sku;"; */
			$qry = "SELECT prd.prd_sku, prd.prd_name, sum(sp.stp_quantity) as cantidad, prd.prd_level
			FROM ctt_products as prd
			INNER JOIN ctt_series as se ON prd.prd_id=se.prd_id
			INNER JOIN ctt_stores_products AS sp ON sp.ser_id = se.ser_id
			where sp.str_id IN ($prodId) and se.ser_status=1
			group by prd.prd_sku, prd.prd_name, prd.prd_level
			ORDER BY se.ser_sku;";
        return $this->db->query($qry);
    }

	public function countQuantity($params)
    {
        $strId = $this->db->real_escape_string($params['strId']);
        $qry = "SELECT sp.str_id, ifnull(sum(sp.stp_quantity),0) AS cantidad
				FROM  ctt_stores_products AS sp
				INNER JOIN ctt_series AS sr ON sr.ser_id = sp.ser_id
				WHERE sp.str_id = $strId AND sr.pjtdt_id = 0;";
        return $this->db->query($qry);
    }

}
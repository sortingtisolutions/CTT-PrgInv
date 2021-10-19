<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class SubCategoriasModel extends Model
{

	public function __construct()
	{
		parent::__construct();
	}
//Guarda proveedor
	public function SaveSubCategoria($params)
	{
        $estatus = 0;
			try {
                $qry = "INSERT INTO ctt_subcategories(sbc_code, sbc_name, sbc_status, cat_id)
                VALUES('".$params['CodSubCategoria']."','".$params['NomSubCategoria']."',1,'".$params['idCategoria']."')";
                $this->db->query($qry);	

				$qry = "SELECT MAX(sbc_id) AS id FROM ctt_subcategories;";
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
// Optiene las subcategorias existentes
	public function GetSubCategorias($request)
	{
		$qryExt = "";
		if($request["idCategoria"] != "0"){
			$qryExt = "and u.cat_id = ".$request["idCategoria"];
		}
	/*	$qry = "SELECT sc.sbc_id, sc.sbc_code, sc.sbc_name,ct.cat_name,sc.cat_id,
				CASE 
					WHEN p.prd_level = 'P' THEN  ifnull(sum(sp.stp_quantity),0)
					ELSE 0 
				END AS cantidad 
				FROM  ctt_products AS p
				INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
				INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id  AND ct.cat_status = 1
				LEFT JOIN ctt_series                AS sr ON sr.prd_id = p.prd_id
				LEFT JOIN ctt_stores_products       AS sp ON sp.ser_id = sr.ser_id
				WHERE prd_status = 1 AND p.prd_level IN ('P','K') 
				GROUP BY sbc_id, sbc_code, sbc_name , cat_id 
				ORDER BY sc.cat_id,sc.sbc_id;"; */
		$qry = "SELECT sc.sbc_id, sc.sbc_code, sc.sbc_name,ct.cat_name,sc.cat_id,'0' as cantidad 
				FROM  ctt_subcategories        AS sc   
				INNER JOIN ctt_categories      AS ct ON ct.cat_id = sc.cat_id
				WHERE sc.sbc_status = 1 and ct.cat_status=1;";
		return $this->db->query($qry);
	}

    public function GetSubCategoria($params)
	{
		$qry = "SELECT sbc_id, sbc_code, sbc_name, cat_id FROM ctt_subcategories WHERE sbc_id = ".$params['id'].";";
		$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("sbc_id" =>$row[0],
			"sbc_code" =>$row[1],
            "sbc_name" =>$row[2],
            "cat_id" =>$row[3]);
		}
		return $item;
	}

    public function ActualizaSubCategoria($params)
	{
        $estatus = 0;
			try {
                $qry = "UPDATE ctt_subcategories
                SET sbc_code = '".$params['CodSubCategoria']."'
                ,sbc_name = '".$params['NomSubCategoria']."'
                ,cat_id = '".$params['idCategoria']."'
                WHERE sbc_id =  ".$params['IdSubCategoria'].";";

				$this->db->query($qry);	
				$estatus = $params['IdSubCategoria'];
			} catch (Exception $e) {
				$estatus = 0;
			}
		return $estatus;
	}

    //borra proveedor
	public function DeleteSubCategoria($params)
	{
        $estatus = 0;
        try {
            $qry = "UPDATE ctt_subcategories
                    SET sbc_status = 0
                    WHERE sbc_id in (".$params['IdSubCategoria'].");";
            $this->db->query($qry);
            $estatus = 1;
        } catch (Exception $e) {
            $estatus = 0;
        }
		return $estatus;
	}
	public function listSeries($params)
    {
        $sbcId = $this->db->real_escape_string($params['sbcId']);
        $qry = "SELECT  se.ser_id, se.ser_sku, p.prd_name, se.ser_serial_number, 
			date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
			se.ser_cost, se.ser_situation, se.ser_stage, se.ser_status, se.ser_comments
			FROM  ctt_products AS p
			INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
			INNER JOIN ctt_series                AS se ON se.prd_id = p.prd_id
			WHERE sc.sbc_id = ($sbcId) AND p.prd_level IN ('P') 
			ORDER BY se.ser_sku;";
        return $this->db->query($qry);
    }

	public function GetCategorias($params)
	{
		$qry = "SELECT ct.cat_id, ct.cat_name, ct.str_id
				FROM  ctt_categories    AS ct 
				WHERE ct.cat_status = 1 ORDER BY ct.cat_id;";
		/*$result = $this->db->query($qry);
		$lista = array();
		while ($row = $result->fetch_row()){
			$item = array("cat_id" =>$row[0],
						"cat_name" =>$row[1],
						"str_id" =>$row[2],
						"str_name" =>$row[3]);
			array_push($lista, $item);
		}
		return $lista;*/
		return $this->db->query($qry);
	}
	
	public function ListSubCategorias($request)
	{
		$qry = "SELECT sbc_id, sbc_code, sbc_name, cat_id FROM ctt_subcategories
				WHERE sbc_status=1 ORDER by cat_id, sbc_code; ";
		/*$result = $this->db->query($qry);
		if($row = $result->fetch_row()){
			$item = array("sbc_id" =>$row[0],
					"sbc_code" =>$row[1],
					"sbc_name" =>$row[2],
					"cat_id" =>$row[3]);
		}
		return $item; */
		return $this->db->query($qry);
	}

	public function countQuantity($params)
    {
        $sbcatId = $this->db->real_escape_string($params['sbcatId']);
        $qry = "SELECT '$sbcatId' as sbcat_id, ifnull(sum(sp.stp_quantity),0) as cantidad 
		FROM  ctt_stores_products AS sp
		INNER JOIN ctt_series               AS sr ON sr.ser_id = sp.ser_id
		INNER JOIN ctt_products				AS p ON p.prd_id = sr.prd_id
		INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id
		WHERE sr.ser_status = 1 AND p.prd_level IN ('P','K')
		and sc.sbc_id= $sbcatId;";
        return $this->db->query($qry);
    }
}
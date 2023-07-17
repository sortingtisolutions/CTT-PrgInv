<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class CategoriasModel extends Model
{
	public function __construct()
	{
		parent::__construct();
	}

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

// Optiene los Usuaios existentes
	public function GetCategorias()
	{
		$qry = "SELECT ct.*, st.str_name,'0' AS cantidad , ar.are_name
				FROM ctt_categories  	AS ct 
				INNER JOIN ctt_stores	AS st ON st.str_id = ct.str_id
				LEFT JOIN ctt_areas as ar on ar.are_id=ct.are_id
				WHERE ct.cat_status = 1 and st.str_status=1 ORDER BY ct.cat_id;";

		return $this->db->query($qry);
	}

    public function listAreas($params)
	{
		$qry = "SELECT * FROM ctt_areas
				WHERE are_id in (2,3) AND are_status = 1 ORDER BY are_id;";

		return $this->db->query($qry);
	}


    public function UpdateCategoria($params)
	{
		$cat_name 	= $this->db->real_escape_string($params['cat_name']);
		$cat_id 	= $this->db->real_escape_string($params['cat_id']);
		$str_id 	= $this->db->real_escape_string($params['str_id']);
		$areId 		= $this->db->real_escape_string($params['areId']);

		$qry = "UPDATE ctt_categories
				SET cat_name = UPPER('$cat_name'),
					str_id = '$str_id',
					are_id = '$areId',
				WHERE cat_id = $cat_id;";
		return 	$this->db->query($qry);	
	}

	//Guarda proveedor  ***
	public function SaveCategoria($params)
	{
		$cat_name = $this->db->real_escape_string($params['cat_name']);
		$str_id = $this->db->real_escape_string($params['str_id']);
		$catId = $this->db->real_escape_string($params['catId']);
		$areId = $this->db->real_escape_string($params['areId']);

			$qry = "INSERT INTO ctt_categories(cat_id,cat_name, cat_status, str_id,are_id)
					VALUES ('$catId', UPPER('$cat_name'),1,'$str_id','$areId')";
			$this->db->query($qry);	
			$cat_id = $this->db->insert_id;
			
		return $cat_id;
	}

    //borra proveedor
	public function DeleteCategoria($params)
	{
        $cat_id 	= $this->db->real_escape_string($params['cat_id']);

		$qry = "UPDATE ctt_categories
                    SET cat_status = 0
                    WHERE cat_id = '$cat_id';";
		return $this->db->query($qry);   
	}

	public function listSeries($params)
    {
        $prodId = $this->db->real_escape_string($params['catId']);
        $qry = "SELECT  se.ser_id, se.ser_sku, p.prd_name, se.ser_serial_number, 
			date_format(se.ser_date_registry, '%d/%m/%Y') AS ser_date_registry,
			se.ser_cost, se.ser_situation, se.ser_stage, se.ser_status, se.ser_comments
			FROM  ctt_products AS p
			INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id   AND sc.sbc_status = 1
			INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id  AND ct.cat_status = 1
			INNER JOIN ctt_series                AS se ON se.prd_id = p.prd_id
			WHERE ct.cat_id = ($prodId) AND p.prd_level IN ('P') 
			ORDER BY se.ser_sku;";
        return $this->db->query($qry);
    }
	public function countQuantity($params)
    {
        $catId = $this->db->real_escape_string($params['catId']);
        $qry = "SELECT '$catId' as cat_id, ifnull(sum(sp.stp_quantity),0) as cantidad 
		FROM  ctt_stores_products AS sp
		INNER JOIN ctt_series               AS sr ON sr.ser_id = sp.ser_id
		INNER JOIN ctt_products				AS p ON p.prd_id = sr.prd_id
		INNER JOIN ctt_subcategories        AS sc ON sc.sbc_id = p.sbc_id
		INNER JOIN ctt_categories           AS ct ON ct.cat_id = sc.cat_id
		WHERE sr.ser_status = 1 AND p.prd_level IN ('P')
		and ct.cat_id= $catId;";
        return $this->db->query($qry);
    }

}
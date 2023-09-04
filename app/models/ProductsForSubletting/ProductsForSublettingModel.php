<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsForSublettingModel extends Model
{

    public function __construct()
    {
      parent::__construct();
    }

// Listado de Proyectos  ****
public function listProyects($store)
{
    $store = $this->db->real_escape_string($store);
    $qry = "SELECT * FROM ctt_projects WHERE pjt_status in (2,4,7,8) ;";
    return $this->db->query($qry);
}    

// Listado de Productos
    public function listProducts($params)
    {
        $pjtId = $this->db->real_escape_string($params['pjtId']);
        $qry = "SELECT 
                    prd_name, prd_sku, pjtdt_prod_sku, sub_price, sup_business_name, str_name, ser_id,
                    DATE_FORMAT(sub_date_start,'%d/%m/%Y') AS sub_date_start, DATE_FORMAT(sub_date_end,'%d/%m/%Y') AS sub_date_end, 
                    sub_comments, pjtcn_days_base, pjtcn_days_trip, pjtcn_days_test,
                    ifnull(prd_id,0) AS prd_id, ifnull(sup_id,0) AS sup_id, ifnull(str_id,0) AS str_id, 
                    ifnull(sub_id,0) AS sub_id, ifnull(sut_id,0) AS sut_id, ifnull(pjtdt_id,0) AS pjtdt_id,
                    ifnull(pjtcn_id,0) AS pjtcn_id, ifnull(cin_id,0) AS cin_id
                FROM ctt_vw_subletting WHERE pjt_id = $pjtId;";
        return $this->db->query($qry);
    }    


// Listado de Proveedores
    public function listSuppliers($store)
    {
        $store = $this->db->real_escape_string($store);
        $qry = "SELECT sup_id, sup_business_name FROM ctt_suppliers WHERE sup_status = 1 
        AND sut_id in (3) ORDER BY sup_business_name;";
        return $this->db->query($qry);
    }   


// Listado de monedas
    public function listCoins()
    {
        $qry = "SELECT * FROM ctt_coins WHERE cin_status = 1;";
        return $this->db->query($qry);
    }   


// Listado de Almacenes
    public function listStores()
    {
        $qry = "SELECT str_id, str_name FROM ctt_stores WHERE str_type = 'ESTATICOS' AND str_status = 1
        and str_name like 'SUBARRENDO%';";
        return $this->db->query($qry);
    }



// Agrega el serial del producto en subarrendo
    public function addSerie($params)
    {
        $ser_sku = $params['prodsku'] . 'R001';
        $ser_serial_number = 'R001';
        $ser_cost = $params['prprice'];
        $ser_status = '1';
        $ser_situation = 'D';
        $ser_stage = 'D';
        $ser_lonely = '1';
        $ser_behaviour = 'R';
        $prd_id = $params['produid'];
        $cin_id = $params['cointyp'];


        $qry = "INSERT INTO 
                    ctt_series (ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, ser_lonely, ser_behaviour, prd_id, cin_id ) 
                VALUES
                    ('$ser_sku','$ser_serial_number','$ser_cost','$ser_status','$ser_situation','$ser_stage','$ser_lonely','$ser_behaviour','$prd_id','$cin_id');
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
            return $result . '|' . $params['produid'] .'|'.$params['supplid'] .'|'.$ser_serial_number .'|'.$params['storeid'] .'|'.$params['storenm'];
    }

// Agrega los productos subarrendados
    public function addSubletting($params)
    {
        $sub_price = $params['prc'];
        $sub_coin_type = $params['cin'];
        $sub_quantity = $params['qty'];
        $sub_date_start = $params['dst'];
        $sub_date_end = $params['den'];
        $sub_comments = $params['com'];
        $ser_id = $params['ser'];
        $sup_id = $params['sup'];
        $prj_id = $params['prj'];

        $qry = "INSERT INTO 
                    ctt_subletting (sub_price, sub_quantity, sub_date_start, sub_date_end, sub_comments, ser_id, sup_id, prj_id, cin_id ) 
                VALUES
                    ('$sub_price','$sub_quantity','$sub_date_start','$sub_date_end','$sub_comments','$ser_id','$sup_id','$prj_id','$sub_coin_type');
                ";
            $this->db->query($qry);
            $result = $this->db->insert_id;
            return $result ;
    } 

// Registra los movimientos entre almacenes
    public function SaveExchange($param, $user)
    {
        $employee_data = explode("|",$user);
        $exc_sku_product    = $this->db->real_escape_string($param['sku']);
        $exc_product_name   = $this->db->real_escape_string($param['nme']);
        $exc_quantity       = $this->db->real_escape_string($param['qty']);
        $exc_serie_product  = $this->db->real_escape_string($param['srn']);
        $exc_store          = $this->db->real_escape_string($param['stn']);
        $exc_comments       = $this->db->real_escape_string($param['com']);
        $exc_proyect        = $this->db->real_escape_string($param['prj']);
        $exc_employee_name  = $this->db->real_escape_string($employee_data[2]);
        $ext_code           = $this->db->real_escape_string($param['exn']);
        $ext_id             = $this->db->real_escape_string($param['exi']);
        $exc_guid           = $this->db->real_escape_string($param['fol']);
        $cin_id             = $this->db->real_escape_string($param['cin']);

        $qry = "INSERT INTO ctt_stores_exchange
                (exc_guid, exc_sku_product, exc_product_name, exc_quantity, exc_serie_product, exc_store, exc_comments, exc_proyect, exc_employee_name, ext_code, ext_id, cin_id)
                VALUES
                ('$exc_guid', '$exc_sku_product', '$exc_product_name', $exc_quantity, '$exc_serie_product', '$exc_store', '$exc_comments', '$exc_proyect', '$exc_employee_name', '$ext_code', $ext_id, $cin_id);
                ";
        return $this->db->query($qry);
    }

// Busca si existe asignado un almacen con este producto
    public function SechingProducts($param)
    {
        $prodId = $this->db->real_escape_string($param['ser']);
        $storId = $this->db->real_escape_string($param['sti']);

        $qry = "SELECT count(*) as items FROM ctt_stores_products WHERE ser_id = $prodId AND str_id = $storId;";
        return $this->db->query($qry);
    }


// Actualizala cantidad de productos en un almacen destino
    public function UpdateProducts($param)
    {
        $idPrd 			= $this->db->real_escape_string($param['ser']);
        $idStrSrc 		= $this->db->real_escape_string($param['sti']);
        $quantity 		= $this->db->real_escape_string($param['qty']);

        $qry = "UPDATE ctt_stores_products SET stp_quantity = stp_quantity + {$quantity} WHERE str_id = {$idStrSrc} and  ser_id = {$idPrd};";
        return $this->db->query($qry);
    }

// Agrega el registro de relación almacen producto
    public function InsertProducts($param)
     {
    //     $idPrd 			= $this->db->real_escape_string($param['ser']);
    //     $idStrSrc 		= $this->db->real_escape_string($param['sti']);
    //     $quantity 		= $this->db->real_escape_string($param['qty']);

    //     $qry = "INSERT INTO ctt_stores_products 
    //                 (stp_quantity, str_id, ser_id) 
    //             VALUES 
    //                 ($quantity, $idStrSrc, $idPrd);";
    //     return $this->db->query($qry);
    }

// Proceso de subarrendo
    public function checkSerie($param)
    {
        $producId 		= $this->db->real_escape_string($param['producId']);

        $qry = "SELECT  count(*) as skuCount 
                  FROM  ctt_series 
                 WHERE  prd_id = $producId 
                   AND  LEFT(RIGHT(ser_sku, 4),1) ='R' 
                   AND  pjtdt_id = 0;";
        return $this->db->query($qry);
    }    

// Agrega nuevos registros de sku en subarrendo
    public function addNewSku($params) // *** Modificado por Ed*/
    {
        $pjDetail 		= $this->db->real_escape_string($params['pjDetail']);
        $producId 		= $this->db->real_escape_string($params['producId']);
        $produSku 		= $this->db->real_escape_string($params['produSku']);
        $seriCost 		= $this->db->real_escape_string($params['seriCost']);
        $dtResIni 		= $this->db->real_escape_string($params['dtResIni']);
        $dtResFin 		= $this->db->real_escape_string($params['dtResFin']);
        $comments 		= $this->db->real_escape_string($params['comments']);
        $supplier 		= $this->db->real_escape_string($params['supplier']);
        $tpCoinId 		= $this->db->real_escape_string($params['tpCoinId']);
        $projecId 		= $this->db->real_escape_string($params['projecId']);
        $storesId 		= $this->db->real_escape_string($params['storesId']);
        $projContId 		= $this->db->real_escape_string($params['projContId']);

        // Obtiene el ultimo sku registrado para el producto seleccionado
        $qry = "SELECT ifnull(max(ser_sku),0) as last_sku, ifnull(ser_serial_number,0) as last_serie,
        ifnull(SUBSTR(max(ser_sku),9,3),0) AS last_sku_num 
        FROM ctt_series WHERE prd_id = $producId AND LEFT(RIGHT(ser_sku, 4),1) ='R';"; // *** Agrego Ed
        $result = $this->db->query($qry);

        $skus = $result->fetch_object();
        $sku = $skus->last_sku_num;
        $serie = $skus->last_serie;
        $skuNew = intval($sku) +1 ; // ***  
        $skuNew = 'R' . str_pad($skuNew, 3, "0", STR_PAD_LEFT);
        $serieNew = intval($serie) +1 ;
        $serieNew = 'R' . str_pad($serieNew, 3, "0", STR_PAD_LEFT);

        $newSku = $produSku . $skuNew;

        // Agrega la nueva serie
        $qry1 = "INSERT INTO ctt_series (
                    ser_sku, ser_serial_number, ser_cost, ser_status, ser_situation, ser_stage, 
                    ser_date_registry, ser_reserve_count, ser_behaviour, ser_comments, 
                    prd_id, sup_id, cin_id, pjtdt_id
                )
                SELECT 
                    '$newSku', '$serieNew', '$seriCost', ifnull(sr.ser_status,1), ifnull(sr.ser_situation,'EA'), 
                    ifnull(sr.ser_stage, 'R'), curdate(),'1', ifnull(sr.ser_behaviour,'C'), '$comments', 
                    pd.prd_id, '$supplier','$tpCoinId','$pjDetail'
                FROM ctt_series AS sr  
                RIGHT JOIN ctt_products AS pd ON pd.prd_id = sr.prd_id
                WHERE pd.prd_id = $producId LIMIT 1;";
                
        $this->db->query($qry1);

        $serieId = $this->db->insert_id;

        // Agrega la nueva version del producto en el proyecto
        $qryPv = "INSERT INTO ctt_projects_version (pjtvr_prod_sku, pjtvr_prod_name, pjtvr_prod_price, 
        pjtvr_quantity,pjtvr_days_base, pjtvr_days_cost, pjtvr_discount_base, 
		  pjtvr_discount_insured,pjtvr_days_trip, pjtvr_discount_trip, pjtvr_days_test,
		  pjtvr_discount_test, pjtvr_insured, pjtvr_prod_level, pjtvr_section, pjtvr_status, 
		  pjtvr_order, ver_id, prd_id,pjt_id)
                SELECT 
                    prjv.pjtvr_prod_sku, prjv.pjtvr_prod_name, prjv.pjtvr_prod_price,
                    '1',prjv.pjtvr_days_base,prjv.pjtvr_days_cost, prjv.pjtvr_discount_base,
						  prjv.pjtvr_discount_insured, prjv.pjtvr_days_trip,prjv.pjtvr_discount_trip,
						  prjv.pjtvr_days_test, prjv.pjtvr_discount_test, prjv.pjtvr_insured,
						   prjv.pjtvr_prod_level, '4', prjv.pjtvr_status,
                    fun_maxcontent($projecId)+1 AS content,prjv.ver_id,prjv.prd_id,prjv.pjt_id
                FROM ctt_projects_version AS prjv
                INNER JOIN ctt_projects_content AS pc ON pc.pjtvr_id = prjv.pjtvr_id
                WHERE pc.pjtcn_id = $projContId;";
        $this->db->query($qryPv);
        $pjtvrId = $this->db->insert_id;
        
        // Agregar el nuevo contenido a project_content
        $qryPc = "INSERT INTO ctt_projects_content (pjtcn_prod_sku, pjtcn_prod_name, pjtcn_prod_price, pjtcn_quantity,
        pjtcn_days_base, pjtcn_days_cost, pjtcn_discount_base, pjtcn_discount_insured, pjtcn_days_trip, pjtcn_discount_trip,
        pjtcn_days_test, pjtcn_discount_test, pjtcn_insured, pjtcn_prod_level, pjtcn_section,
        pjtcn_status, pjtcn_order, ver_id, prd_id, pjt_id, pjtvr_id)
                        SELECT 
                            pjtcn_prod_sku, pjtcn_prod_name, pjtcn_prod_price, 1,
        pjtcn_days_base, pjtcn_days_cost, pjtcn_discount_base, pjtcn_discount_insured, pjtcn_days_trip, pjtcn_discount_trip,
        pjtcn_days_test, pjtcn_discount_test, pjtcn_insured, pjtcn_prod_level, 4,
        pjtcn_status, fun_maxcontent($projecId)+1 AS content, ver_id, prd_id, pjt_id, '$pjtvrId'
                        FROM ctt_projects_content AS pc where pc.pjtcn_id = $projContId;";
        $this->db->query($qryPc);


        // Actualiza el detalle del proyecto con la serie
        $qry2 = "UPDATE ctt_projects_detail AS pd
                INNER JOIN ctt_series AS sr ON sr.pjtdt_id = pd.pjtdt_id
                SET pd.pjtdt_prod_sku = sr.ser_sku, pd.ser_id = sr.ser_id, pd.pjtvr_id = '$pjtvrId'
                WHERE pd.pjtdt_id = $pjDetail;";
        $this->db->query($qry2);

        // Agrega el nuevo registro en la tabla de subarrendos
        $qry3 = "INSERT INTO ctt_subletting (sub_price, sub_quantity, sub_date_start, sub_date_end, 
                    sub_comments, ser_id, sup_id, prj_id, cin_id, prd_id)
                SELECT ser_cost, '1', '$dtResIni', '$dtResFin', '$comments', ser_id, 
                    '$supplier', '$projecId', '$tpCoinId', prd_id 
                FROM ctt_series WHERE pjtdt_id = $pjDetail;";
        $this->db->query($qry3);

        $qry4 = " INSERT INTO ctt_stores_products 
                    (stp_quantity, str_id, ser_id, prd_id) 
                VALUES 
                    ('1','$storesId', '$serieId','$producId');";
        $this->db->query($qry4);

        $query = "SELECT pjtcn_quantity From ctt_projects_content where pjtcn_id = '$projContId' LIMIT 1";
        $res = $this->db->query($query);
        $qry_q = $res->fetch_object();
        $qty = intval($qry_q->pjtcn_quantity);
        
        if ($qty > 1) {
            // Actualiza la seccion del proyecto con la serie
            $qry5 = "UPDATE ctt_projects_content AS pd
                SET pd.pjtcn_quantity = pd.pjtcn_quantity-1
                WHERE pd.pjtcn_id = $projContId;";
            $this->db->query($qry5);


            $qry7 = "UPDATE ctt_projects_version AS pd
            INNER JOIN ctt_projects_content AS pc ON pc.pjtvr_id = pd.pjtvr_id
            SET pd.pjtvr_quantity = pd.pjtvr_quantity-1
            WHERE pc.pjtcn_id = $projContId;";
            $this->db->query($qry7);
        }else{
            $qryDel3 = "DELETE ctt_projects_version 
            FROM ctt_projects_version 
            INNER JOIN ctt_projects_content 
            ON ctt_projects_content.pjtvr_id = ctt_projects_version.pjtvr_id
            WHERE ctt_projects_content.pjtcn_id = $projContId and ctt_projects_content.pjtcn_quantity=1;";
			$this->db->query($qryDel3);

            $qryDel2 = "DELETE from ctt_projects_content 
            where pjtcn_quantity=1 and pjtcn_id = $projContId;";
			$this->db->query($qryDel2);

        }
        

        return $pjDetail;

    }

    public function changeSubletting($params)
    {
        $pjDetail 		= $this->db->real_escape_string($params['pjDetail']);
        $producId 		= $this->db->real_escape_string($params['producId']);
        $produSku 		= $this->db->real_escape_string($params['produSku']);
        $seriCost 		= $this->db->real_escape_string($params['seriCost']);
        $dtResIni 		= $this->db->real_escape_string($params['dtResIni']);
        $dtResFin 		= $this->db->real_escape_string($params['dtResFin']);
        $comments 		= $this->db->real_escape_string($params['comments']);
        $supplier 		= $this->db->real_escape_string($params['supplier']);
        $tpCoinId 		= $this->db->real_escape_string($params['tpCoinId']);
        $projecId 		= $this->db->real_escape_string($params['projecId']);
        $storesId 		= $this->db->real_escape_string($params['storesId']);
        $seriesId 		= $this->db->real_escape_string($params['seriesId']);

        $qry1 = "UPDATE ctt_series 
                    SET 
                        cin_id = '$tpCoinId', 
                        ser_cost = '$seriCost'
                    WHERE ser_id = '$seriesId';";
        $this->db->query($qry1);

        $qry2 = "UPDATE ctt_subletting
                    SET 
                        sub_price = '$seriCost',
                        sub_comments = '$comments',
                        cin_id = '$tpCoinId',
                        sub_date_start = '$dtResIni',
                        sub_date_end = '$dtResFin'
                    WHERE ser_id = '$seriesId' AND prj_id ='$projecId';";
        $this->db->query($qry2);

        $qry3 = "UPDATE ctt_stores_products
                    SET 
                        str_id = '$storesId'
                    WHERE ser_id = '$seriesId';";
        $this->db->query($qry3);

        return $pjDetail;
    }

// Lista el productomodificado
    public function getPjtDetail($pjtId)
    {
        $pjtId = $this->db->real_escape_string($pjtId);
        $qry = "SELECT 
                    prd_name, prd_sku, pjtdt_prod_sku, sub_price, sup_business_name, str_name, ser_id,
                    DATE_FORMAT(sub_date_start,'%d/%m/%Y') AS sub_date_start, DATE_FORMAT(sub_date_end,'%d/%m/%Y') AS sub_date_end, 
                    sub_comments, pjtcn_days_base, pjtcn_days_trip, pjtcn_days_test,
                    ifnull(prd_id,0) AS prd_id, ifnull(sup_id,0) AS sup_id, ifnull(str_id,0) AS str_id, 
                    ifnull(sub_id,0) AS sub_id, ifnull(sut_id,0) AS sut_id, ifnull(pjtdt_id,0) AS pjtdt_id,
                    ifnull(pjtcn_id,0) AS pjtcn_id, ifnull(cin_id,0) AS cin_id
                FROM ctt_vw_subletting WHERE pjtdt_id = $pjtId;";
        return $this->db->query($qry);
    }

    public function pruebaStore($params){
        $pjDetail 		= $this->db->real_escape_string($params['pjDetail']);
        $producId 		= $this->db->real_escape_string($params['producId']);
        $produSku 		= $this->db->real_escape_string($params['produSku']);
        $seriCost 		= $this->db->real_escape_string($params['seriCost']);
        $dtResIni 		= $this->db->real_escape_string($params['dtResIni']);
        $dtResFin 		= $this->db->real_escape_string($params['dtResFin']);
        $comments 		= $this->db->real_escape_string($params['comments']);
        $supplier 		= $this->db->real_escape_string($params['supplier']);
        $tpCoinId 		= $this->db->real_escape_string($params['tpCoinId']);
        $projecId 		= $this->db->real_escape_string($params['projecId']);
        $storesId 		= $this->db->real_escape_string($params['storesId']);
        $projContId 		= $this->db->real_escape_string($params['projContId']);
        try{
            //Declaras parámetros de salida
            $sentencia = $this->db->prepare("CALL sp_pruebaStore(?, ?, ?, ?);");
            $sentencia->bindParam("1", $projecId, PDO::PARAM_INT);
            $sentencia->bindParam("2", $producId , PDO::PARAM_INT); 
            $sentencia->bindParam("3", $comments, PDO::PARAM_STR, 4000);
            $sentencia->bindParam("4", $produSku, PDO::PARAM_STR, 4000);   
        
            // llamar al procedimiento almacenado
            $sentencia->execute();
        
            //print "El procedimiento contiene: $nombreEmb, $edad, $Expediente;
        
            return true;
        
            } catch(PDOException $e) {
        
            echo $e->getMessage();  
                return false;
            }
    }
}
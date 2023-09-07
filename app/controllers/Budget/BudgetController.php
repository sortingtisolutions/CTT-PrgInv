<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Budget/BudgetModel.php';
    require_once LIBS_ROUTE .'Session.php';

class BudgetController extends Controller
{
    private $session;
    public $model;


    public function __construct()
    {
        $this->model = new BudgetModel();
        $this->session = new Session();
        $this->session->init();
        if($this->session->getStatus() === 1 || empty($this->session->get('user')))
            header('location: ' . FOLDER_PATH .'/Login');
    }

    public function exec()
    {
        $params = array('user' => $this->session->get('user'));
        $this->render(__CLASS__, $params);
    }

// Lista los Productores
    public function listCustomers($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomers($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cus_id":"0"}]';	
        }
        echo $res;
    } 

// Lista los proyectos
    public function listProjects($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjects($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;
    } 

// Lista los proyectos padre
    public function listProjectsParents($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjectsParents($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;
    } 

    
// Lista los tipos de proyectos
    public function listProjectsType($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjectsType($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;

    } 
    
// Lista los tipos de llamados
    public function listProjectsTypeCalled($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjectsTypeCalled($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjttc_id":"0"}]';	
        }
        echo $res;

    } 

// Lista las casas productoras
    public function listCustomersDef($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomersDef($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cuo_id":"0"}]';	
        }
        echo $res;
    } 

// Lista las casas productoras
    public function listCustomersOwn($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCustomersOwn($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cuo_id":"0"}]';	
        }
        echo $res;
    } 
    
// Lista los comentarios del proyecto
    public function listComments($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listComments($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"com_id":"0"}]';	
        }
        echo $res;
    } 


// Lista los proyectos relacionados
    public function listProjectsDef($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProjectsDef($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"cuo_id":"0"}]';	
        }
        echo $res;
    } 
    // Lista los Productores
    public function getEdosRepublic($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->getEdosRepublic($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"edos_id":"0"}]';	
        }
        echo $res;
    } 
    
// Lista los versiones
    public function listVersion($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listVersion($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"ver_id":"0"}]';	
        }
        echo $res;
    } 

    
// Lista las cotizaciones
    public function listBudgets($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listBudgets($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"bdg_id":"0"}]';	
        }
        echo $res;
    } 

// Lista los descuentos
    public function listDiscounts($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listDiscounts($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"dis_id":"0"}]';	
        }
        echo $res;
    } 

    
// Lista los productos
    public function listProducts($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProducts($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 
    // LISTAR PRODUCTOS ***ED
    public function listProducts2($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProducts2($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 
    //LISTAR PRODUCTOS  ***ED
    public function listProducts3($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProducts3($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 
    // LISTAR CATEGORIAS ***ED
    public function listCategories($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listCategories($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 

    //  ***ED
    public function listSubCategories($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listSubCategories($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 
    // Datos del proyecto padre ***ED
    public function getProjectParent($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->getProjectParent($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_id":"0"}]';	
        }
        echo $res;
    } 

// Lista los productos con Subarrendo
public function listProductsSub($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->listProductsSub($request_params);
    $i = 0;
    while($row = $result->fetch_assoc()){
        $rowdata[$i] = $row;
        $i++;
    }
    if ($i>0){
        $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
    } else {
        $res =  '[{"prd_id":"0"}]';	
    }
    echo $res;
} 


   
// Lista los relacionados al producto
public function listProductsRelated($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->listProductsRelated($request_params);
    $i = 0;
    while($row = $result->fetch_assoc()){
        $rowdata[$i] = $row;
        $i++;
    }
    if ($i>0){
        $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
    } else {
        $res =  '[{"prd_id":"0"}]';	
    }
    echo $res;
} 
	public function getLocationType($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->getLocationType();
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"loc_id":"0"}]';	
        }
        echo $res;
    } 
	
    public function ListLocationsEdos($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->ListLocationsEdos($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"loc_id":"0"}]';	
        }
        echo $res;
    } 


// Lista los proyectos en donde se encuentra un producto
public function stockProdcuts($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->stockProdcuts($request_params);
    $i = 0;
    while($row = $result->fetch_assoc()){
        $rowdata[$i] = $row;
        $i++;
    }
    if ($i>0){
        $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
    } else {
        $res =  '[{"prd_name":"0"}]';	
    }
    echo $res;
} 

public function SaveLocations($request_params){
    $params =  $this->session->get('user');
    $result = $this->model->SaveLocations($request_params);
    $res = $result;
    echo $res;
}


// Guarda la cotización
    public function SaveBudget($request_params)
    {
        $params =  $this->session->get('user');
        $group = explode('|',$params);
        $user = $group[0];
        $name = $group[2]; 

        $resultIns = $this->model->SaveBudget($request_params);
        //$resReorder = $this->reOrdenList($request_params);

        echo $resultIns . ' | ' . $name ;
    } 

// Guarda el comentario
    public function InsertComment($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->InsertComment($request_params, $params);

        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"com_id":"0"}]';	
        }
        echo $res;
        
    } 

    
// Guarda nuevo proyecto
    public function SaveProject($request_params)
    {
        $params =  $this->session->get('user');

        $result = $this->model->SaveProject($request_params, $params);
        echo $result;
    } 
    
// Actualiza datos del proyecto
    public function UpdateProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->UpdateProject($request_params);
        echo $result;
    } 

// Actualiza las fechas del proyecto
    public function UpdatePeriodProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->UpdatePeriodProject($request_params);
        echo $result;
    }

      
// Guarda nueva version
    public function SaveVersion($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->SaveVersion($request_params);
        echo $result;
    } 


/** ==== Promueve la cotizacion a presupuesto ================================================  */
    public function PromoteProject($request_params)
    {
        $params =  $this->session->get('user');
        $pjt_id = $this->model->PromoteProject($request_params);
        $ver_id = $this->model->PromoteVersion($request_params);

    } 


// Promueve la version de proyecto
    public function PromoteVersion($request_params)
    {   
        $params =  $this->session->get('user');
        $result = $this->model->PromoteVersion($request_params);
        echo $result;
    } 
// Promueve la version de proyecto
    public function getExistTrip($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->getExistTrip($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"prd_id":"0"}]';	
        }
        echo $res;
    } 
// Genera el archivo de la cotización
public function saveBudgetList($request_params)
{   
    $params =  $this->session->get('user');
    $group = explode('|',$params);

    $user = $group[0];
    $name = $group[2];
    

    $result = $this->model->saveBudgetList($request_params);
    $i = 0;
    while($row = $result->fetch_assoc()){
        $rowdata[$i] = $row;
        $i++;
    }
    if ($i>0){
        $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
    } else {
        $res =  '[{"prd_id":"0"}]';	
    }
    $dir = ROOT . FOLDER_PATH . '/app/views/Budget/BudgetFile-'. $user .'.json';

    if (file_exists($dir)) unlink($dir);

    $fileJson = fopen( $dir ,"w") or die("problema al escribir el archivo ");
    fwrite($fileJson, $res);
    fclose($fileJson);

    echo $user . '|' . $name;
} 
public function DeleteLocation($request_params){
    {   
        $params =  $this->session->get('user');
        $result = $this->model->DeleteLocation($request_params);
        echo $result;
    } 
}

/** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   */

/** +++++  PROCESO DE GENERACION DEL PROYECTO                 +++++++   */

/** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   */

// PROCESO POR PRODUCTO

public function ProcessProjectProduct($request_params)
    {  
        $params = $this->session->get('user');
        $pjtId  = $this->model->PromoteProject($request_params);
        $versin = $this->model->PromoteVersion($request_params);
        $pjtcnt = $this->model->SaveProjectContent($request_params);
        $result = $this->model->GetProjectContent($request_params);
       
        
        while($row = $result->fetch_assoc()){
            $dtstar = $row["pjt_date_start"];
            $dybase = $row["pjtcn_days_base"];
            $dycost = $row["pjtcn_days_cost"];
            $dytrip = $row["pjtcn_days_trip"] / 2;
            $dytest = $row["pjtcn_days_test"];
            $quanty = $row["pjtcn_quantity"];
            $prodId = $row["prd_id"];
            $pjetId = $row["pjtvr_id"];
            $dyinic = $dytrip + $dytest;
            $dyfinl = $dytrip + $dybase;
            $dtinic = date('Y-m-d',strtotime($dtstar . '-'. $dyinic .' days'));
            $dtfinl = date('Y-m-d',strtotime($dtstar . '+'. ($dyfinl-1) .' days')); 

            $bdgsku = $row["pjtcn_prod_sku"];
            $bdgnme = $row["pjtcn_prod_name"];
            $bdgprc = $row["pjtcn_prod_price"];
            $bdglvl = $row["pjtcn_prod_level"];
            $dsbase = $row["pjtcn_discount_base"];
            $dstrip = $row["pjtcn_discount_trip"];
            $dstest = $row["pjtcn_discount_test"];
            $bdgIns = $row["pjtcn_insured"];
            $prdexp = $row["srv_id"];
            $versId = $row["ver_id"];

            $ttlqty = $prdexp == '2'? $quanty: 1;
            $quanty = $prdexp == '2'? 1: $quanty;
			if ( $bdglvl == 'P' ){
                for ($i = 1; $i<=$quanty; $i++){
                    
                    $params = array(
                        'pjetId' => $pjetId, 
                        'prodId' => $prodId, 
                        'dtinic' => $dtinic, 
                        'dtfinl' => $dtfinl,
                        'bdgsku' => $bdgsku,
                        'bdgnme' => $bdgnme,
                        'bdgprc' => $bdgprc,
                        'bdglvl' => $bdglvl,
                        'bdgqty' => $ttlqty,
                        'dybase' => $dybase,
                        'dycost' => $dycost,
                        'dsbase' => $dsbase,
                        'dytrip' => $dytrip,
                        'dstrip' => $dstrip,
                        'dytest' => $dytest,
                        'dstest' => $dstest,
                        'bdgIns' => $bdgIns,
                        'versId' => $versId,
                        'detlId' => 0,
                    );
                    $detlId = $this->model->SettingSeries($params);
                    $serId=$detlId;
                    $paramacc = array(
                        'prodId' => $prodId, 
                        'serId' => $serId,
                    );
                    //echo 'VAR_ '. $prodId . ' - ' . $serId . 'END ';
                    $accesory = $this->model->GetAccesories($paramacc); //SE TRAE LOS ACCESORIOS DEL PRODUCTO
                    while($acc = $accesory->fetch_assoc()){

                        $acceId =  $acc["prd_id"];
                        $acceNm =  $acc["prd_name"];
                        $accePc =  $acc["prd_price"];

                        $accparams = array(
                            'pjetId' => $pjetId, 
                            'prodId' => $acceId, 
                            'dtinic' => $dtinic, 
                            'dtfinl' => $dtfinl,
                            'bdgsku' => $bdgsku,
                            'bdgnme' => $acceNm,
                            'bdgprc' => $accePc,
                            'bdglvl' => 'A',
                            'bdgqty' => $ttlqty,
                            'dybase' => $dybase,
                            'dycost' => $dycost,
                            'dsbase' => $dsbase,
                            'dytrip' => $dytrip,
                            'dstrip' => $dstrip,
                            'dytest' => $dytest,
                            'dstest' => $dstest,
                            'bdgIns' => $bdgIns,
                            'versId' => $versId,
                            'detlId' => $detlId,
                        );
                        $serie = $this->model->SettingSeries($accparams);
                    }
                }
            } else if ( $bdglvl == 'K' ){  // AÑADIR LA CANTIDAD QUE SE REQUIERE POR CADA PRODUCTO DEL PAQUETE
                for ($i = 1; $i<=$quanty; $i++){
                    $products = $this->model->GetProducts($prodId);
                    while($acc = $products->fetch_assoc()){

                        $pkpdId =  $acc["prd_id"];
                        $pkpdNm =  $acc["prd_name"];
                        $pkpdPc =  $acc["prd_price"];

                        $prodparams = array(
                            'pjetId' => $pjetId, 
                            'prodId' => $pkpdId, 
                            'dtinic' => $dtinic, 
                            'dtfinl' => $dtfinl,
                            'bdgsku' => $bdgsku,
                            'bdgnme' => $pkpdNm,
                            'bdgprc' => $pkpdPc,
                            'bdglvl' => 'P',
                            'bdgqty' => $ttlqty,
                            'dybase' => $dybase,
                            'dycost' => $dycost,
                            'dsbase' => $dsbase,
                            'dytrip' => $dytrip,
                            'dstrip' => $dstrip,
                            'dytest' => $dytest,
                            'dstest' => $dstest,
                            'bdgIns' => $bdgIns,
                            'versId' => $versId,
                            'detlId' => 0,
                        );
                        $detlId = $this->model->SettingSeries($prodparams);
                        $serId=$detlId;
                        $paramaccpk = array(
                            'prodId' => $pkpdId, 
                            'serId' => $serId,
                        );
                        $accesory = $this->model->GetAccesories($paramaccpk);
                        while($acc = $accesory->fetch_assoc()){
    
                            $acceId =  $acc["prd_id"];
                            $acceNm =  $acc["prd_name"];
                            $accePc =  $acc["prd_price"];
    
                            $accparams = array(
                                'pjetId' => $pjetId, 
                                'prodId' => $acceId, 
                                'dtinic' => $dtinic, 
                                'dtfinl' => $dtfinl,
                                'bdgsku' => $bdgsku,
                                'bdgnme' => $acceNm,
                                'bdgprc' => $accePc,
                                'bdglvl' => 'A',
                                'bdgqty' => $ttlqty,
                                'dybase' => $dybase,
                                'dycost' => $dycost,
                                'dsbase' => $dsbase,
                                'dytrip' => $dytrip,
                                'dstrip' => $dstrip,
                                'dytest' => $dytest,
                                'dstest' => $dstest,
                                'bdgIns' => $bdgIns,
                                'versId' => $versId,
                                'detlId' => $detlId,
                            );
                            $serie = $this->model->SettingSeries($accparams);
                        }
                    }
                }
            }
        }

        echo $pjtId . '|' . $dtinic . '|' . $dtfinl;
    
    } 

// Lista los comentarios del proyecto
    public function listChangeProd($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listChangeProd($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"catsub":"0"}]';	
        }
        echo $res;
    } 

    public function reOrdenList($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listReordering($request_params);

        $valnew=1;
        while($row = $result->fetch_assoc())
        {
            $prdsku = $row["bdg_prod_sku"];
            $docsec = $row["bdg_section"];
            $bdg_id = $row["bdg_id"];
            $docord = $row["bdg_order"];

            $paramup = array(
                'valnew' => $valnew,
                'bdg_id' => $bdg_id,
            );
            $bandReOrder = $this->model->upReorderingProducts($paramup);
            $valnew=$valnew + 1;
        }
        // echo $bandReOrder ; 
    } 

    public function ProcessProjectProductFAST($request_params)
    {  
        $params = $this->session->get('user');
        // $pjtId  = $this->model->PromoteProject($request_params);
        $versin = $this->model->PromoteVersion($request_params);
        $pjtcnt = $this->model->SaveProjectContent($request_params);
        $result = $this->model->GetProjectContent($request_params);
       
        while($row = $result->fetch_assoc()){
            $dtstar = $row["pjt_date_start"];
            $dybase = $row["pjtcn_days_base"];
            $dytrip = $row["pjtcn_days_trip"] / 2;
            $dytest = $row["pjtcn_days_test"];
            $quanty = $row["pjtcn_quantity"];
            $prodId = $row["prd_id"];
            $pjetId = $row["pjtvr_id"];
            $dyinic = $dytrip + $dytest;
            $dyfinl = $dytrip + $dybase;
            $dtinic = date('Y-m-d',strtotime($dtstar . '-'. $dyinic .' days'));
            $dtfinl = date('Y-m-d',strtotime($dtstar . '+'. ($dyfinl-1) .' days')); 

            $bdglvl = $row["pjtcn_prod_level"];
            $prdexp = $row["srv_id"];
            $versId = $row["ver_id"];

            $ttlqty = $prdexp == '2'? $quanty: 1;
            $quanty = $prdexp == '2'? 1: $quanty;
            if ( $bdglvl == 'P' ){
                for ($i = 1; $i<=$quanty; $i++){
                    
                    $params = array(
                        'pjetId' => $pjetId, 
                        'prodId' => $prodId, 
                        'dtinic' => $dtinic, 
                        'dtfinl' => $dtfinl,
                        'versId' => $versId,
                        'detlId' => 0,
                    );
                    $detlId = $this->model->SettingSeries($params);
                    
                }
            } else if ( $bdglvl == 'K' ){  // AÑADIR LA CANTIDAD QUE SE REQUIERE POR CADA PRODUCTO DEL PAQUETE
                for ($i = 1; $i<=$quanty; $i++){
                    $products = $this->model->GetProducts($prodId);
                    while($acc = $products->fetch_assoc()){

                        $pkpdId =  $acc["prd_id"];
                        $pkpdNm =  $acc["prd_name"];
                        $pkpdPc =  $acc["prd_price"];

                        $prodparams = array(
                            'pjetId' => $pjetId, 
                            'prodId' => $pkpdId, 
                            'dtinic' => $dtinic, 
                            'dtfinl' => $dtfinl,
                            'bdgnme' => $pkpdNm,
                            'bdgprc' => $pkpdPc,
                            'bdglvl' => 'P',
                            'bdgqty' => $ttlqty,
                            'dybase' => $dybase,
                            'dytrip' => $dytrip,
                            'dytest' => $dytest,
                            'versId' => $versId,
                            'detlId' => 0,
                        );
                        $detlId = $this->model->SettingSeries($prodparams);
                       
                    }
                }
            }
        }

        $pjtId  = $this->model->PromoteProject($request_params);

        echo $pjtId . '|' . $dtinic . '|' . $dtfinl;
    
    } 

    
}
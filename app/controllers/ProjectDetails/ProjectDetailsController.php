<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProjectDetails/ProjectDetailsModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProjectDetailsController extends Controller
{
    private $session;
    public $model;


    public function __construct()
    {
        $this->model = new ProjectDetailsModel();
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

// Lista el contendio del proyecto
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
            $res =  '[{"pjtvr_id":"0"}]';	
        }
        echo $res;
    } 

// Lista de clientes
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

// Lista de productores
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
            $res =  '[{"cus_id":"0"}]';	
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

/** ==== Lista los tipos de llamados =========================================================  */
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

    
// Actualiza datos del proyecto
    public function UpdateProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->UpdateProject($request_params);
        echo $result;
    } 
//


/** ==== Actualiza las fechas del proyecto ===================================================  */
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
//


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
//

// Lista los proyectos en donde se encuentra un producto
    public function stockProducts($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->stockProducts($request_params);
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
//


/** ==== Cancela el proyecto =================================================================  */
    public function cancelProject($request_params)
    {   
        $verId      = $request_params['verId'];
        $pjtId      = $request_params['pjtId'];
        $params     = $this->session->get('user');
        $group = explode('|',$params);

        $user = $group[0];
        $name = $group[2];
        // $periods    = $this->model->cleanPeriods($pjtId);
        // $series     = $this->model->restoreSeries($pjtId);
        // $detail     = $this->model->cleanDetail($pjtId);
        $project    = $this->model->cancelProject($request_params, $user);
        echo $verId . '|'. $pjtId;
    } 



/** ==== Cuenta el numero de productos que se encuentran en pendiente ========================  */
    public function countPending($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->countPending($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"counter":"0"}]';	
        }
        echo $res;
    } 


/** ==== Actualiza la tabla concentradora del contenido del proyecto =========================  */
    public function updateMice($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->updateMice($request_params);
        echo $result;
    }



/** ==== Actualiza el ordenamiento de productos del proyecto ================================  */
public function updateOrder($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->updateOrder($request_params);
    echo $result;
}


/** ==== Agrega producto a la tabla concentradora ============================================  */
    public function AddProductMice($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->AddProductMice($request_params);
        echo $result;
    }


/** ==== Actualiza contenido de la version actual ============================================  */
    public function SaveBudget($request_params)
    {
        $params =  $this->session->get('user');
        $group = explode('|',$params);

        $user = $group[0];
        $name = $group[2];
        $verId     = $request_params['verId'];
        $pjtId     = $request_params['pjtId'];
        $action    = $request_params['action'];

        if ($action == 'ACT'){
            //ACT convierte una version activa a una version master
            $version        = $this->model->settingMasterVersion($pjtId, $verId);
            $projectVersion = $this->model->settingProjectVersion($pjtId, $verId);
            $periods        = $this->model->cleanPeriods($pjtId);
            $series         = $this->model->restoreSeries($pjtId);
            $detail         = $this->model->cleanDetail($pjtId);
            $projectContent = $this->model->settingProjectContent($pjtId, $verId);
            $projectMovemen = $this->model->settingProjectMovemen($pjtId, $user);
            $result         = $this->model->getProjectVersion($pjtId);
            $response       = $this->setSeries($result);

        } else {
            //MST actualiza los datos de una version maestra 
            $projectVersion = $this->model->settingProjectVersion($pjtId, $verId);
            $projectContent = $this->model->settingProjectContent($pjtId, $verId);
            $projectMovemen = $this->model->settingProjectMovemen($pjtId, $user);
            $result         = $this->model->getVersionMice($pjtId);
            $response       = $this->updateSeries($result);
        }

        echo $verId . '|'. $pjtId;

    }

/** ==== Actualiza las series y sus productos relacionados  ==================================  */
    public function setSeries($result)
    {
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

            if ( $bdglvl == 'A' ){
                echo 'Accesorio';
                for ($i = 1; $i<=$quanty; $i++){   // VALIDA LA CANTIDAD A REALIZA POR CONCEPTO 

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
                    $serie = $this->model->SettingSeries($params);
                    // echo $serie . ' - ' ;
                }
            } else if ( $bdglvl == 'P' ){
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

                    $accesory = $this->model->GetAccesories($prodId);
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
            } else if ( $bdglvl == 'K' ){
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

                        $accesory = $this->model->GetAccesories($pkpdId);
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
        return 1;
    }

/** ==== Actualiza los productos de la version maestra  ======================================  */
    public function updateSeries($result)
    {
        while($row = $result->fetch_assoc()){
            $action = $row["pjtvr_action"];
            $qtyAct = $row["pjtvr_quantity"];
            $qtyAnt = $row["pjtvr_quantity_ant"];
            $qtyAct = intval($qtyAct);
            $qtyAnt = intval($qtyAnt);

            $param = array(
                'prodId' => $row["prd_id"],
                'pjetId' => $row["pjtvr_id"],
                'prdlvl' => $row['pjtvr_prod_level'],
                'servId' => $row['srv_id'],
                'dtinic' => $row['pjt_date_start'],
                'dtfinl' => $row['pjt_date_end'],
            );

            // print_r( $param);
        
            if ($action == 'U'){
                
                if ($qtyAct > $qtyAnt){
                    $dif = $qtyAct - $qtyAnt;
                    for ($i=1; $i <= $dif; $i++){
                        $updQty = $this-> AddQuantityDetail($param);
                    }
                } else if ($qtyAct < $qtyAnt){
                    $dif = $qtyAnt - $qtyAct;
                    for ($i=1; $i <= $dif; $i++){
                        $updQty = $this-> KillQuantityDetail($param);
                    }
                }
            }
            if ($action == 'D'){
                for ($i=1; $i <= $qtyAct; $i++){
                    $updQty = $this-> KillQuantityDetail($param);
                }
            }
            if ($action == 'A'){
                for ($i=1; $i <= $qtyAct; $i++){
                    $updQty = $this-> AddQuantityDetail($param);
                }
            }
            
            
        }
        return 1;
    }


   

/** ==== Guarda contenido de la nueva version ================================================  */
    public function SaveBudgetAs($request_params)
    {

        $params         = $this->session->get('user');
        $par            = $this->model->SaveVersion($request_params);

        $pack           = explode('|', $par);
        $verId          = $pack[0];
        $pjtId          = $pack[1];

        $group = explode('|',$params);

        $user = $group[0];
        $name = $group[2];

        $periods        = $this->model->cleanPeriods($pjtId);
        $series         = $this->model->restoreSeries($pjtId);
        $detail         = $this->model->cleanDetail($pjtId);
        $projectMovemen = $this->model->settingProjectMovemen($pjtId, $user);
        $projectVersion = $this->model->settinProjectVersion($pjtId, $verId);
        $projectcontent = $this->model->settingProjectContent($pjtId, $verId);
        $result         = $this->model->getProjectVersion($pjtId);
        $response       = $this->setSeries($result);

        echo $verId . '|'. $pjtId;

    } 


/** ==== Agrega una nueva serie al detalle del proyecto ======================================  */
    public function AddQuantityDetail($params)
    {
        $prodId =  $params['prodId'];
        $pjetId =  $params['pjetId'];
        $prdLvl =  $params['prdlvl'];
        $servId =  $params['servId'];
        $dtinic =  $params['dtinic'];
        $dtfinl =  $params['dtfinl'];

        if ($servId == '1'){
            if ($prdLvl == 'A'){
                $param = array(
                    'prodId' => $prodId, 
                    'pjetId' => $pjetId, 
                    'dtinic' => $dtinic, 
                    'dtfinl' => $dtfinl, 
                    'detlId' => 0,
                );
                $serie = $this->model->SettingSeries($param);
                
            } elseif($prdLvl == 'P'){
                
                $prdparam = array(
                    'prodId' => $prodId, 
                    'pjetId' => $pjetId, 
                    'dtinic' => $dtinic, 
                    'dtfinl' => $dtfinl, 
                    'detlId' => 0,
                );
               
                $detlId = $this->model->SettingSeries($prdparam);
                
                $accesory = $this->model->GetAccesories($prodId);
                while($acc = $accesory->fetch_assoc()){

                    $aprodId = $acc["prd_id"];
                    $apjetId = $pjetId;

                    $accparams = array(
                        'prodId' => $aprodId, 
                        'pjetId' => $apjetId,
                        'dtinic' => $dtinic, 
                        'dtfinl' => $dtfinl,
                        'detlId' => $detlId,
                    );
                    $serie = $this->model->SettingSeries($accparams);
                }
               
            } elseif($prdLvl == 'K'){
                $products = $this->model->GetProducts($prodId);
                while($pkt = $products->fetch_assoc()){
                    $kprodId = $pkt["prd_id"];
                    $kpjetId = $pjetId;

                    $pktparams = array(
                        'prodId' => $kprodId, 
                        'pjetId' => $kpjetId,
                        'dtinic' => $dtinic, 
                        'dtfinl' => $dtfinl,
                        'detlId' => 0,
                    );
                    $detlId = $this->model->SettingSeries($pktparams);

                    $accesory = $this->model->GetAccesories($kprodId);
                    while($acc = $accesory->fetch_assoc()){

                        $aprodId = $acc["prd_id"];
                        $apjetId = $pjetId;
    
                        $accparams = array(
                            'prodId' => $aprodId, 
                            'pjetId' => $apjetId,
                            'dtinic' => $dtinic, 
                            'dtfinl' => $dtfinl,
                            'detlId' => $detlId,
                        );
                        $serie = $this->model->SettingSeries($accparams);
                    }
                }
            }

        } elseif ($servId == '2'){

        }
        return 1;
    }

   


/** ==== Elimina la serie correspondiente en el detalle del proyecto =========================  */
    public function KillQuantityDetail($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->KillQuantityDetail($request_params);
        $res = $result;
        return $res;
    }



/** ==== Importa proyecto ====================================================================  */
    public function importProject($request_params)
    {
        $params =  $this->session->get('user');
        $par            = $this->model->SaveVersion($request_params);

        
        $pack           = explode('|', $par);
        $verId          = $pack[0];
        $pjtId          = $pack[1];
        $pjtIdo         = $request_params['pjtIdo'];

        $mice = $this->model->importProject($pjtIdo, $pjtId, $verId);
        $periods        = $this->model->cleanPeriods($pjtId);
        $series         = $this->model->restoreSeries($pjtId);
        $detail         = $this->model->cleanDetail($pjtId);
        $projectVersion = $this->model->settinProjectVersion($pjtId, $verId);
        $projectcontent = $this->model->settingProjectContent($pjtId, $verId);
        $result         = $this->model->getProjectVersion($pjtId);
        $response       = $this->setSeries($result);

        echo $verId . '|'. $pjtId;
    }

/** ==========================================================================================  */
}


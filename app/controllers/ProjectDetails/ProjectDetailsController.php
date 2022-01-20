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


    // Lista los proyectos
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
            $res =  '[{"pjtcn_id":"0"}]';	
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

// Lista los relacionados al producto para los periodos
    public function listProductsAsigned($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listProductsAsigned($request_params);
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

    

// Obtiene el conteo de los productos faltantes
    public function counterPending($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->counterPending($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"count":"0"}]';	
        }
        echo $res;
    } 



    

// Obtiene el conteo de los productos faltantes
public function cancelProject($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->cancelProject($request_params);
    $res = $result;
    echo $res;
} 

// Actualiza las fechas del proyecto
public function UpdatePeriodProject($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->UpdatePeriodProject($request_params);
    echo $result;
}


// Actualiza las fechas del proyecto
public function updatePeriods($request_params)
{
    $params =  $this->session->get('user');
    $result = $this->model->updatePeriods($request_params);
    echo $result;
}


// Genera el archivo del proyecto
    public function saveProjectList($request_params)
    {   
        $params =  $this->session->get('user');
        $group = explode('|',$params);

        $user = $group[0];
        $name = $group[2];
        

        $result = $this->model->saveProjectList($request_params);
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
        $dir = ROOT . FOLDER_PATH . '/app/views/ProjectDetails/ProjectDetailsFile-'. $user .'.json';

        if (file_exists($dir)) unlink($dir);

        $fileJson = fopen( $dir ,"w") or die("problema al escribir el archivo ");
        fwrite($fileJson, $res);
        fclose($fileJson);

        echo $user . '|' . $name;
    } 




// Incrementa la cantidad de un producto ya existente
    public function increaseQuantity($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->increaseQuantity($request_params);
        
        $param = array(
            'prodId' => $request_params['prd_id'],
            'dtinic' => $request_params['serReserveStart'],
            'dtfinl' => $request_params['serReserveEnd'],
            'pjetId' => $request_params['pjtcn_id'],
            'servId' => $request_params['srv_id'],
            'quanty' => $request_params['pjtcn_quantity'],
            'prdlvl' => $request_params['level']
        );
        $succ = $this->addProjectDetail($param);

    } 
// Disminuye la cantidad de un producto ya existente
    public function decreaseQuantity($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->decreaseQuantity($request_params);
        $res = $result;
        echo $res;

    } 
// Elimina el producto
    public function killProduct($request_params){
        $params =  $this->session->get('user');
        $result = $this->model->killProduct($request_params);
        $res = $result;
        echo $res;

    }
// Agrega producto
    public function addNewProduct($request_params)
    {
        $params =  $this->session->get('user');
        $servId = $request_params['srvId'];
        $dayIni = $request_params['serReserveStart'];
        $dayFnl = $request_params['serReserveEnd'];
        $quanty = 1; 
        $pjtcnId = $this->model->addNewProductContent($request_params);
        $result = $this->model->getProjectContent($pjtcnId, $dayIni, $dayFnl);
        
        
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
            $param = array(
                'prodId' => $row["prd_id"],
                'dtinic' => $dayIni,
                'dtfinl' => $dayFnl,
                'pjetId' => $pjtcnId,
                'servId' => $row['srv_id'],
                'quanty' => $quanty,
                'prdlvl' => $row['pjtcn_prod_level'],
            );
            $succ = $this->addProjectDetail($param);
        }

        if ($i > 0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjtcn_id":"0"}]';	
        }

        echo $res;
    } 



// Agrega el detalle de contenido del proyecto
    private function addProjectDetail($request_params){

        $prodId =  $request_params['prodId'];
        $dayIni =  $request_params['dtinic'];
        $dayFnl =  $request_params['dtfinl'];
        $pjetId =  $request_params['pjetId'];
        $prdLvl =  $request_params['prdlvl'];
        $servId =  $request_params['servId'];

        if ($servId == '1'){
            if ($prdLvl == 'A'){
                $param = array(
                    'prodId' => $prodId, 
                    'dtinic' => $dayIni, 
                    'dtfinl' => $dayFnl, 
                    'pjetId' => $pjetId, 
                    'detlId' => 0,
                );
                $serie = $this->model->SettingSeries($param);
            } elseif($prdLvl == 'P'){
                
                $prdparam = array(
                    'prodId' => $prodId, 
                    'dtinic' => $dayIni, 
                    'dtfinl' => $dayFnl, 
                    'pjetId' => $pjetId, 
                    'detlId' => 0,
                );
                $detlId = $this->model->SettingSeries($prdparam);
                
                $accesory = $this->model->GetAccesories($prodId);
                while($acc = $accesory->fetch_assoc()){

                    $aprodId = $acc["prd_id"];
                    $adtinic = $dayIni;
                    $adtfinl = $dayFnl;
                    $apjetId = $pjetId;

                    $accparams = array(
                        'prodId' => $aprodId, 
                        'dtinic' => $adtinic, 
                        'dtfinl' => $adtfinl,
                        'pjetId' => $apjetId,
                        'detlId' => $detlId,
                    );
                    $serie = $this->model->SettingSeries($accparams);
                }
               
            } elseif($prdLvl == 'K'){
                $products = $this->model->GetProducts($prodId);
                while($pkt = $products->fetch_assoc()){
                    $kprodId = $pkt["prd_id"];
                    $kdtinic = $dayIni;
                    $kdtfinl = $dayFnl;
                    $kpjetId = $pjetId;

                    $pktparams = array(
                        'prodId' => $kprodId, 
                        'dtinic' => $kdtinic, 
                        'dtfinl' => $kdtfinl,
                        'pjetId' => $kpjetId,
                        'detlId' => 0,
                    );
                    $detlId = $this->model->SettingSeries($pktparams);

                    $accesory = $this->model->GetAccesories($kprodId);
                    while($acc = $accesory->fetch_assoc()){

                        $aprodId = $acc["prd_id"];
                        $adtinic = $dayIni;
                        $adtfinl = $dayFnl;
                        $apjetId = $pjetId;
    
                        $accparams = array(
                            'prodId' => $aprodId, 
                            'dtinic' => $adtinic, 
                            'dtfinl' => $adtfinl,
                            'pjetId' => $apjetId,
                            'detlId' => $detlId,
                        );
                        $serie = $this->model->SettingSeries($accparams);
                    }


                }

            }

        } elseif ($servId == '2'){

        }
        return true;
    }

// Actualiza los dias 
    public function updateData($request_params)
    {
        $params =  $this->session->get('user');

        $numfield   = $request_params['field'];
        $pjtcnId    = $request_params['pjtcnId'];
        $data       = $request_params['data'];

        $field = '';
        switch ($numfield){
            case '4' : $field = 'pjtcn_days_base'; break;
            case '7' : $field = 'pjtcn_days_trip'; break;
            case '10' : $field = 'pjtcn_days_test'; break;
            case '5'  : $field = 'pjtcn_discount_base'; break;
            case '8'  : $field = 'pjtcn_discount_trip'; break;
            case '11' : $field = 'pjtcn_discount_test'; break;
            default:
        }

        $result = $this->model->updateData($field, $pjtcnId, $data);
        $res = $result;
        echo $res;
    }


// Actualiza los rangos de periodos por serie
    public function settingRangePeriods($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->settingRangePeriods($request_params);
        $res = $result;
        echo $res;

    } 

// Actualiza los rangos de periodos por serie
    public function deleteRangePeriods($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->deleteRangePeriods($request_params);
        $res = $result;
        echo $res;

    } 

}
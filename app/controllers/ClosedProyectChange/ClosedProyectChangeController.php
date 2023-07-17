<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ClosedProyectChange/ClosedProyectChangeModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ClosedProyectChangeController extends Controller
{
    private $session;
    public $model;


    public function __construct()
    {
        $this->model = new ClosedProyectChangeModel();
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

    // LISTA LOS ALMACENES
        public function listStores($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->listStores($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"str_id":"0"}]';	
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
// Guarda la venta
        public function NextExchange($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->NextExchange($request_params);
            $res = $result;
            echo $res;
        } 
// Guarda la venta
        public function SaveSale($request_params)
        {
            $params =  $this->session->get('user');
            $group = explode('|',$params);
    
            $user = $group[2];

            $result = $this->model->SaveSale($request_params, $user);
            $res = $result;
            echo $res;
        } 
    // Guarda detalle de la venta
        public function SaveSaleDetail($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->SaveSaleDetail($request_params, $params);
            $res = $result;
            echo $res;
        } 

    // Guarda Comentario
        public function SaveComments($request_params)
        {
            $params =  $this->session->get('user');
            $group = explode('|',$params);
    
            $user = $group[2];
            $result = $this->model->SaveComments($request_params, $user);
            $res = $result;
            echo $res;
        } 
    // Guarda el archivo de venta
        public function saveSaleList($request_params)
        {
            $params =  $this->session->get('user');
            $group = explode('|',$params);
    
            $user = $group[0];
            $name = $group[2];

            $result = $this->model->saveSaleList($request_params, $user);
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
            $dir = ROOT . FOLDER_PATH . '/app/views/ClosedProyectChange/ClosedProyectChangeFile-'. $user .'.json';

            if (file_exists($dir)) unlink($dir);

            $fileJson = fopen( $dir ,"w") or die("problema al escribir el archivo ");
            fwrite($fileJson, $res);
            fclose($fileJson);

            echo $user . '|' . $name;
        } 
}
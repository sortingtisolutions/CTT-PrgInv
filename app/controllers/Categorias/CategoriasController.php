<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Categorias/CategoriasModel.php';
    require_once LIBS_ROUTE . 'Session.php';

    class CategoriasController extends Controller
    {

        private $session;
        public $model;

        public function __construct()
        {
            $this->model = new CategoriasModel();
            $this->session= new Session();
            $this->session->init();
            if($this->session->getStatus()===1 || empty($this->session->get('user')))
                header('location: ' . FOLDER_PATH . '/Login');
        }
        
        public function exec()
        {
          $params = array('user' => $this->session->get('user'));
          $this->render(__CLASS__, $params);
        }
        //OBTIENE LAS CATEGORIAS PARA DESPLEGAR
        /* public function GetCategoria($request_params)
        {
          $result = $this->model->GetCategoria($request_params);
          echo json_encode($result,JSON_UNESCAPED_UNICODE);	
        }
 */
        public function GetAlmacenes($request_params)
		{
			$params =  $this->session->get('user');
            $result = $this->model->GetAlmacenes($request_params);
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

        public function GetCategorias($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->GetCategorias($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"cat_id":"0"}]';	
            }
            echo $res;
        }

        public function listAreas($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->listAreas($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"are_id":"0"}]';	
            }
            echo $res;
        }

        public function listSeries($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->listSeries($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"cat_id":"0"}]';	
            }
            echo $res;
        }

        public function SaveCategoria($request_params)
        {
         
            $result = $this->model->SaveCategoria($request_params);	  
            echo $result;
        }
        
        public function UpdateCategoria($request_params)
        {
         
            $result = $this->model->UpdateCategoria($request_params);
            $catId= $request_params['cat_id'];	  
            echo $catId;
        }

        public function DeleteCategoria($request_params)
        {
            $result = $this->model->DeleteCategoria($request_params);
            $catId= $request_params['cat_id'];	  
            echo $catId;	
        } 

        public function countQuantity($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->countQuantity($request_params);
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

    }
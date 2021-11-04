<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/SubCategorias/SubCategoriasModel.php';
    require_once LIBS_ROUTE . 'Session.php';

    class SubCategoriasController extends Controller
    {

        private $session;
        public $model;

        public function __construct()
        {
            $this->model = new SubCategoriasModel();
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
        
        public function GetCategories($request_params)
        {
            $result = $this->model->GetCategories($request_params);
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

        public function getSubcategories($request_params)
        {
            $result = $this->model->getSubcategories($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
            $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"sbc_id":"0"}]';	
            }
            echo $res;	
        }

        
        public function GetListSubcategories($request_params)
        {
          $result = $this->model->GetListSubcategories($request_params);
          $i = 0;
             while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
            $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"sbc_id":"0"}]';	
            }
            echo $res;
          //echo json_encode($result,JSON_UNESCAPED_UNICODE);	
        }


        public function SaveSubcategoria($request_params)
        {
         
            $result = $this->model->SaveSubCategoria($request_params);	
            echo $result;    
        }


        public function UpdateSubcategoria($request_params)
        {
            $result = $this->model->UpdateSubcategoria($request_params);	
            echo $result;  
        }

        public function DeleteSubcategoria($request_params)
        {
          $result = $this->model->DeleteSubcategoria($request_params);	  
          echo $result;	
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
                $res =  '[{"sbc_id":"0"}]';	
            }
            echo $res;
        }
     
        public function ListSubCategorias($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->ListSubCategorias($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"sbc_id":"0"}]';	
            }
            echo $res;
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
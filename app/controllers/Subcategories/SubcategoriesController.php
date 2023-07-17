<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Subcategories/SubcategoriesModel.php';
    require_once LIBS_ROUTE . 'Session.php';
    //require_once ROOT . PATH_ASSETS . 'serverSide.php';

    class SubcategoriesController extends Controller
    {

        private $session;
        public $model;

        public function __construct()
        {
            $this->model = new SubcategoriesModel();
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

        
    // Obtiene la lista de categorias activas  ******
        public function listCategories($request_params)
        {
            $result = $this->model->listCategories($request_params);
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

    // Obtiene la lista de subcategorias activas
        public function tableSubcategories($request_params)
        {
            $result = $this->model->tableSubcategories($request_params);
            echo $result;
        }

    // Obtiene la lista de subcategorias activas
        public function listSubcategories($request_params)
        {
            $result = $this->model->listSubcategories($request_params);
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

// Obtiene la lista de series relacionadas a la subcategoria
        public function listSeries($request_params)
        {
            $result = $this->model->listSeries($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
            $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"ser_id":"0"}]';	
            }
            echo $res;	
        }


// Graba la nueva subcategoria
        public function SaveSubcategory($request_params)
        {
            $result = $this->model->SaveSubcategory($request_params);
            $res = $result;
            echo $res;	
        }

// Actualiza la subcategorias seleccionada
        public function UpdateSubcategory($request_params)
        {
            $params = $this->session->get('user');
            $result = $this->model->UpdateSubcategory($request_params);
            $res = $result;
            echo $res;
        }

// Actualiza el status de la subcategorias a eliminar
        public function DeleteSubcategory($request_params)
        {
            $params = $this->session->get('user');
            $result = $this->model->DeleteSubcategory($request_params);
            $res = $result;
            echo $res;
        }

// Obtiene la cantidad de existencias
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
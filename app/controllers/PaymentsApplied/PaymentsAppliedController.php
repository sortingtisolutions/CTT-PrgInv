<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/PaymentsApplied/PaymentsAppliedModel.php';
    require_once LIBS_ROUTE . 'Session.php';
    //require_once ROOT . PATH_ASSETS . 'serverSide.php';

    class PaymentsAppliedController extends Controller
    {

        private $session;
        public $model;

        public function __construct()
        {
            $this->model = new PaymentsAppliedModel();
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

// Obtiene la lista de subcategorias activas
        public function listPaymentsApplied($request_params)
        {
            $result = $this->model->listPaymentsApplied($request_params);
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

// Obtiene la lista de subcategorias activas
        public function listProjects($request_params)
        {
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


    }
<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ListMaintenance/ListMaintenanceModel.php';
    require_once LIBS_ROUTE . 'Session.php';
    //require_once ROOT . PATH_ASSETS . 'serverSide.php';

    class ListMaintenanceController extends Controller
    {

        private $session;
        public $model;

        public function __construct()
        {
            $this->model = new ListMaintenanceModel();
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
        public function listReasons($request_params)
        {
            $result = $this->model->listReasons($request_params);
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


// Graba la nueva subcategoria
        public function saveReasons($request_params)
        {
            $result = $this->model->saveReasons($request_params);
            $res = $result;
            echo $res;	
        }

// Actualiza la subcategorias seleccionada
        public function updateReasons($request_params)
        {
            $params = $this->session->get('user');
            $result = $this->model->updateReasons($request_params);
            $res = $result;
            echo $res;
        }

// Actualiza el status de la subcategorias a eliminar
        public function deleteReason($request_params)
        {
            $params = $this->session->get('user');
            $result = $this->model->deleteReason($request_params);
            $res = $result;
            echo $res;
        }


    }
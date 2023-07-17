<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProjectFiscalFields/ProjectFiscalFieldsModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProjectFiscalFieldsController extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
        $this->model = new ProjectFiscalFieldsModel();
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


    // OBTIENE LA LISTA DE PROYECTOS
    public function tableProjects($request_params)
    {
        $result = $this->model->tableProjects($request_params);
        echo $result;
    }

// Cambia el estatus del projecto
    public function updateStatus($request_params)
    {
        $result = $this->model->updateStatus($request_params);
        echo $result;
    }
// Actualiza la información del cliente
    public function updateInfoCustomer($request_params)
    {
        $result = $this->model->updateInfoCustomer($request_params);
        echo $result;

    }

// Obtiene la información del cliente
    public function getCustomerFields($request_params)
    {
        $result = $this->model->getCustomerFields($request_params);
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

}

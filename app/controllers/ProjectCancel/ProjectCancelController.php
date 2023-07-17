<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProjectCancel/ProjectCancelModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProjectCancelController extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
        $this->model = new ProjectCancelModel();
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

    //OBTIENE LOS PROYECTOS DISPONIBLES PARA CANCELAR
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

    public function CancelProject($request_params)
    {
        $pjtId      = $request_params['pjtId'];
        $params     = $this->session->get('user');
        $periods    = $this->model->cleanPeriods($pjtId);
        $series     = $this->model->restoreSeries($pjtId);
        $detail     = $this->model->cleanDetail($pjtId);
        $project    = $this->model->cancelProject($request_params);
        echo $pjtId;
    }

    public function EnableProject($request_params)
    {
        $pjtId      = $request_params['pjtId'];
        $params     = $this->session->get('user');
        $project    = $this->model->EnableProject($request_params);
        echo $pjtId;
    }
}
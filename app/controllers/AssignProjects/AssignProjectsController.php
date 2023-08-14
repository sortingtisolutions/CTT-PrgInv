<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/AssignProjects/AssignProjectsModel.php';
    require_once LIBS_ROUTE .'Session.php';

class AssignProjectsController extends Controller
{
    private $session;
    public $model;


    public function __construct()
    {
        $this->model = new AssignProjectsModel();
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
    public function listUsersP($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listUsersP($request_params);
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

    public function listUsersA($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listUsersA($request_params);
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

    public function listUsersC($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listUsersC($request_params);
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
    public function listDetailProds($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listDetailProds($request_params);
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
    public function listUsersOnProj($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listUsersOnProj($request_params);
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
    public function updateUsers($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->updateUsers($request_params);
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

}

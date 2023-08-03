<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/WorkInputContent/WorkInputContentModel.php';
    require_once LIBS_ROUTE .'Session.php';

class WorkInputContentController extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
        $this->model = new WorkInputContentModel();
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

    // Lista los productos
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
            $res =  '[{"ser_id":"0"}]';
        }
        echo $res;
    }

        // Lista las series
    public function listReason($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listReason($request_params);
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

    public function checkSeries($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->checkSeries($request_params);
        /*$i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);
        } else {
            $res =  '[{"ser_id":"0"}]';
        }*/
        echo $result;
    }


    public function listSeriesFree($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listSeriesFree($request_params);
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

    public function createTblResp($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->createTblResp($request_params);
        echo $result;
    }

    public function regMaintenance($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->regMaintenance($request_params);
        echo $result;
    }

    // Obtiene datos del producto seleccionado
   /*  public function getSelectSerie($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->getSelectSerie($request_params);
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
    } */


}

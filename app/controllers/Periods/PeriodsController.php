<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Periods/PeriodsModel.php';
    require_once LIBS_ROUTE .'Session.php';

class PeriodsController extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
        $this->model = new PeriodsModel();
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


/** ====== OBTIENE EL PERIODO TOTAL DEL PROYECTO   =============================  */
    public function getPeriodProject($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->getPeriodProject($request_params);
        $i = 0;
        while($row = $result->fetch_assoc()){
            $rowdata[$i] = $row;
            $i++;
        }
        if ($i>0){
            $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
        } else {
            $res =  '[{"pjt_date_start":"0"}]';	
        }
        echo $res;
    
    }

/** ====== Obtiene los periodos de las series  ===============================================  */    
    public function getPeriodSeries($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->getPeriodSeries($request_params);
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


/** ==== Elimina los registros de los periodos correspondientes ==============================  */
    public function deletePeriods($request_params)
    {

        $params =  $this->session->get('user');
        $result = $this->model->deletePeriods($request_params);

        echo $request_params['counter'] .'|'. $result;
    }

/** ==== Gruarda los nuevos periodos  ========================================================  */
    public function savePeriods($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->savePeriods($request_params);

        echo $request_params['cnt'];
    }

/** ==========================================================================================  */

}
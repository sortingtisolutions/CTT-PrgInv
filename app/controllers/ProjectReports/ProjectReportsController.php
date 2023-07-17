<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProjectReports/ProjectReportsModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProjectReportsController extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
        $this->model = new ProjectReportsModel();
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
    
/* -- Listado de proyectos  ------------------------------------------------------------------ */
    public function listAnalysts($request_params)
    {

        $result = $this->model->listAnalysts($request_params);
        $i = 0;
        while ($row = $result->fetCh_assoc())
        {
            $rowdata[$i] = $row;
            $i++;
        } 
        $res = $i > 0 ? json_encode($rowdata,JSON_UNESCAPED_UNICODE) :  '[{"pjt_id":"0"}]';	
        echo $res;

    }

    public function listCustomers($request_params)
    {

        $result = $this->model->listCustomers($request_params);
        $i = 0;
        while ($row = $result->fetCh_assoc())
        {
            $rowdata[$i] = $row;
            $i++;
        } 
        $res = $i > 0 ? json_encode($rowdata,JSON_UNESCAPED_UNICODE) :  '[{"pjt_id":"0"}]';	
        echo $res;

    }    
    
/* -- Listado de contenido de proyecto seleccionado  ----------------------------------------- */
    public function projectContent($request_params)
    {

        $result = $this->model->projectContent($request_params);
        $i = 0;
        while ($row = $result->fetCh_assoc())
        {
            $rowdata[$i] = $row;
            $i++;
        } 
        $res = $i > 0 ? json_encode($rowdata,JSON_UNESCAPED_UNICODE) :  '[{"ser_id":"0"}]';	
        echo $res;

    }
    /* -- Listado ventas de expendables    ---------------------- */
    public function saleExpendab($request_params)
    {

        $result = $this->model->saleExpendab($request_params);
        $i = 0;
        while ($row = $result->fetCh_assoc())
        {
            $rowdata[$i] = $row;
            $i++;
        } 
        $res = $i > 0 ? json_encode($rowdata,JSON_UNESCAPED_UNICODE) :  '[{"ser_id":"0"}]';	
        echo $res;

    }



}
<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProjectClosed/ProjectClosedModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProjectClosedController extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
        $this->model = new ProjectClosedModel();
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
    public function listProjects($request_params)
    {

        $result = $this->model->listProjects($request_params);
        $i = 0;
        while ($row = $result->fetCh_assoc())
        {
            $rowdata[$i] = $row;
            $i++;
        } 
        $res = $i > 0 ? json_encode($rowdata,JSON_UNESCAPED_UNICODE) :  '[{"pjt_id":"0"}]';	
        echo $res;

    }

    /* -- Listado de proyectos  ------------------------------------------------------------------ */
    public function listChgStatus($request_params)
    {

        $result = $this->model->listChgStatus($request_params);
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

    public function saveDocumentClosure($request_params)
    {

        $result = $this->model->saveDocumentClosure($request_params);
        $i = 0;
        while ($row = $result->fetCh_assoc())
        {
            $rowdata[$i] = $row;
            $i++;
        } 
        $res = $i > 0 ? json_encode($rowdata,JSON_UNESCAPED_UNICODE) :  '[{"clo_id":"0"}]';	
        echo $res;

    }


}
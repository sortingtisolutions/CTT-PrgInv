<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/ProductsSalablesList/ProductsSalablesListModel.php';
    require_once LIBS_ROUTE .'Session.php';

class ProductsSalablesListController extends Controller
{
	private $session;
	public $model;

	public function __construct()
	{
		$this->model = new ProductsSalablesListModel();
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

    // OBTIENE EL LISTADO DE LAS VENTAS
        public function Sales($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->Sales($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"sal_id":"0"}]';	
            }
            echo $res;
        }

// Obtiene el listado de las ventas
        public function SalesDetail($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->SalesDetail($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"sld_id":"0"}]';	
            }
            echo $res;
        }
// Obtiene el listado de comentarios
        public function getComments($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->getComments($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"com_id":"0"}]';	
            }
            echo $res;
        }

// Obtiene el siguiente folio
    public function NextExchange($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->NextExchange($request_params);
        $res = $result;
        echo $res;
    }         
// Guarda la devolución
        public function SaveReturn($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->SaveReturn($request_params, $params);
            $res = $result;
            echo $res;
        }

}
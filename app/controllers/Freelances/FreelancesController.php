<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/Freelances/FreelancesModel.php';
    require_once LIBS_ROUTE .'Session.php';

class FreelancesController extends Controller
{
	private $session;
	public $model;

		public function __construct()
		{
			$this->model = new FreelancesModel();
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


	// Lista las categorias
		public function listFreelances($request_params)
		{
			$params =  $this->session->get('user');
			$result = $this->model->listFreelances($request_params);
			$i = 0;
			while($row = $result->fetch_assoc()){
				$rowdata[$i] = $row;
				$i++;
			}
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"cat_id":"0"}]';	
			}
			echo $res;
		}


	// Lista las subcategorias
		public function listSubcategories($request_params)
		{
			/* $params =  $this->session->get('user');
			$result = $this->model->listSubcategories($request_params);
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
			echo $res; */
		}


	// Lista los servicios
	public function listServices($request_params)
	{
		/* $params =  $this->session->get('user');
		$result = $this->model->listServices($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"srv_id":"0"}]';	
		}
		echo $res; */
	}


// Lista los tipos de monedas
public function listScores($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listScores($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"cin_id":"0"}]';	
		}
		echo $res;
	}


// Lista los documentos de fichas técnicas
public function listAreas($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listAreas($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"doc_id":"0"}]';	
		}
		echo $res;
	}

	
// Lista los productos
	public function listProducts($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->listFreelances($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"prd_id":"0"}]';	
		}
		echo $res;
	}

	// Lista las Facturas
	public function listInvoice($request_params)
	{
		/* $params =  $this->session->get('user');
		$result = $this->model->listInvoice($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"doc_id":"0"}]';	
		}
		echo $res; */
	}


// Obtiene datos del producto seleccionado
	public function getSelectFreelance($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->getSelectFreelance($request_params);
		$i = 0;
		while($row = $result->fetch_assoc()){
			$rowdata[$i] = $row;
			$i++;
		}
		if ($i>0){
			$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
		} else {
			$res =  '[{"prd_id":"0"}]';	
		}
		echo $res;
	}

	
	// Lista las series
	public function listSeries($request_params)
	{
		/* $params =  $this->session->get('user');
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
		echo $res; */
	}

	// Obtiene datos del producto seleccionado
	public function getSelectSerie($request_params)
	{
		/* $params =  $this->session->get('user');
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
		echo $res; */
	}


	// Guarda los cambios de un producto
		public function saveEditFreelance($request_params)
		{
			$params =  $this->session->get('user');
			$result = $this->model->saveEditFreelance($request_params);
			$res = $result ;
			echo $res;
		}


	// Guarda los cambios de una serie
	public function saveEdtSeries($request_params)
	{
		/* $params =  $this->session->get('user');
		$result = $this->model->saveEdtSeries($request_params);
		$res = $result;
		echo $res; */
	}


	// Guarda nuevo producto
		public function saveNewFreelance($request_params)
		{
			$params =  $this->session->get('user');
			$result = $this->model->saveNewFreelance($request_params);
			$res = $result ;
			echo $res;
		}


	// Borra un producto seleccionado
		public function deleteFreelances($request_params)
		{
			$params =  $this->session->get('user');
			$result = $this->model->deleteFreelances($request_params);
			$res = $result ;
			echo $res;
		}


	// Borra una serie seleccionada
	public function deleteSerie($request_params)
	{
		$params =  $this->session->get('user');
		$result = $this->model->deleteSerie($request_params);
		$res = $result ;
		echo $res;
	}

}
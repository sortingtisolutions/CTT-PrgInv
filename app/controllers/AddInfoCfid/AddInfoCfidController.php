<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/AddInfoCfid/AddInfoCfidModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class AddInfoCfidController extends Controller
	{
		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new AddInfoCfidModel();
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

		public function listProjectsCfdi()
		{
	      $result = $this->model->listProjectsCfdi();
		  $i = 0;
		  while($row = $result->fetch_assoc()){
			 $rowdata[$i] = $row;
			$i++;
		  }
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"sup_id":"0"}]';	
			}
			echo $res;
		}

		// GUARDA LOS PROVEEDORES
		public function saveExtraCfdi($request_params)
		{
		  $result = $this->model->saveExtraCfdi($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function CheckExist($request_params)
		{
	      $result = $this->model->CheckExist($request_params);
		  $i = 0;
		  while($row = $result->fetch_assoc()){
			 $rowdata[$i] = $row;
			$i++;
		  }
			if ($i>0){
				$res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
			} else {
				$res =  '[{"sup_id":"0"}]';	
			}
			echo $res;
		}

	}
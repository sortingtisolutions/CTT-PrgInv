<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/Almacenes/AlmacenesModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class AlmacenesController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new AlmacenesModel();
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

		public function GetAlmacen($request_params)
		{
	      $result = $this->model->GetAlmacen($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function SaveAlmacen($request_params)
		{
			$params =  $this->session->get('user');
			$result = $this->model->SaveAlmacen($request_params);	  
			echo $result;
		}

		public function UpdateAlmacen($request_params)
		{
			$params =  $this->session->get('user');
            $result = $this->model->UpdateAlmacen($request_params);

			echo $result;
		}

		public function GetAlmacenes($request_params)
		{
			$params =  $this->session->get('user');
            $result = $this->model->GetAlmacenes($request_params);
            $i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"str_id":"0"}]';	
            }
            echo $res;
		}

		public function DeleteAlmacen($request_params)
		{
			$params =  $this->session->get('user');
            $result = $this->model->DeleteAlmacen($request_params);
			$strId= $request_params['str_id'];	  
            echo $strId;
		}

		// Obtiene encargados de almacen
		public function GetEncargadosAlmacen($request_params)
		{
	      $result = $this->model->GetEncargadosAlmacen($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		// Lista las series
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
				$res =  '[{"str_id":"0"}]';	
			}
			echo $res;
		}

		//CONTABILIZA REGISTROS
        public function countQuantity($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->countQuantity($request_params);
			$i = 0;
            while($row = $result->fetch_assoc()){
                $rowdata[$i] = $row;
                $i++;
            }
            if ($i>0){
                $res =  json_encode($rowdata,JSON_UNESCAPED_UNICODE);	
            } else {
                $res =  '[{"count":"0"}]';	
            }
            echo $res;
        }

	}
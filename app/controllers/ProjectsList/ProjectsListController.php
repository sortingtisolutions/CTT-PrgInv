<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require_once ROOT . FOLDER_PATH . '/app/models/ProjectsList/ProjectsListModel.php';
	require_once LIBS_ROUTE . 'Session.php';

	class ProjectsListController extends Controller
	{

		private $session;
		public $model;

		public function __construct()
		{
			$this->model = new ProjectsListModel();
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

		public function GetProjectsList()
		{
	      $result = $this->model->GetProjectsList();
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

		public function ActualizaProjectsList($request_params)
			{
				$params =  $this->session->get('user');
				$result = $this->model->ActualizaProjectsList($request_params);
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

		/* public function SaveProjectsList($request_params)
		{
		  if($request_params['IdProveedor'] == ""){
			$result = $this->model->SaveProjectsList($request_params);	  
		  }else{
			$result = $this->model->ActualizaProveedor($request_params);	  
		  }
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}
 */
		public function GetProveedor($request_params)
		{
	      $result = $this->model->GetProveedor($request_params);
		  echo json_encode($result,JSON_UNESCAPED_UNICODE);	
		}

		public function DeleteProjectsList($request_params)
		{
		  $result = $this->model->DeleteProjectsList($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function GetTipoProjectsList($request_params)
		{
		  $result = $this->model->GetTipoProjectsList($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function getTipoLocation($request_params)
		{
		  $result = $this->model->getTipoLocation($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}
	  
		public function getCustomers($request_params)
		{
		  $result = $this->model->getCustomers($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}

		public function getRelation($request_params)
		{
		  $result = $this->model->getRelation($request_params);	  
		  echo json_encode($result ,JSON_UNESCAPED_UNICODE);	
		}
	}
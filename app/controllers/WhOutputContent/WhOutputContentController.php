<?php
    defined('BASEPATH') or exit('No se permite acceso directo');
    require_once ROOT . FOLDER_PATH . '/app/models/WhOutputContent/WhOutputContentModel.php';
    require_once LIBS_ROUTE .'Session.php';

class WhOutputContentController extends Controller
{
    private $session;
    public $model;

    public function __construct()
    {
        $this->model = new WhOutputContentModel();
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
            $res =  '[{"pjt_id":"0"}]';
        }
        echo $res;
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
            $res =  '[{"ser_id":"0"}]';
        }
        echo $res;
    }

    public function listComments($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->listComments($request_params);
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

    public function changeSerieNew($request_params)
    {
        $params =  $this->session->get('user');
        $result = $this->model->changeSerieNew($request_params);
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

    public function RegisterGetOut($request_params)
        {
            $params =  $this->session->get('user');
            $result = $this->model->GetOutProject($request_params);
            
            echo $result;
        }

/** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   */

/** +++++  PROCESO DE GENERACION Y REGISTRO DE SALIDA DE PROYECTO +++   */

/** +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++   */

public function ProcessGetOutProject($request_params)
    {  
        $params = $this->session->get('user');
        $folio  = $this->model->NextExchange($request_params);       

        $versin = 0;
        $Paso = '';
        $result = $this->model->GetProjectDetail($request_params);
        // echo 'Actualiza Existencia STP ';
        while($row = $result->fetch_assoc()){
            $stpid = $row["stp_id"];
            $stpqty = $row["stp_quantity"];
            $strid = $row["str_id"];
            $serid = $row["ser_id"];
            $prodId = $row["prd_id"];
            $prdsku = $row["pjtcn_prod_sku"];
            $prdnam = $row["pjtcn_prod_name"];
            $cntqty = $row["pjtcn_quantity"];
            $prjId = $row["pjt_id"];
            $GlbprjId = $row["pjt_id"];
              
            $paramsdet = array(
                'stpid' => $stpid,
                'stpqty' => $stpqty,
                'strid' => $strid, 
                'serid' => $serid,
                'prodId' => $prodId,
                'prdsku' => $prdsku,
                'prdnam' => $prdnam, 
                'cntqty' => $cntqty,
                'prjId' => $prjId,  
                'folio' => $folio, 
            );

            $ActSeries = $this->model->ActualizaSeries($paramsdet);
            //$versin = 2;
            $updetail = $this->model->UpdateProducts($paramsdet);
            //$versin = 3;
            $saveExc = $this->model->SaveExchange($paramsdet, $params);
            //$versin = 4;
            // echo $stpid . ' | ' . 'END ' ;
            $Paso= ' Seccion 1 -' ;
        }
        
        // VALIDA LA EXISTENCIA DE ALMACEN MOVIL Y REGISTRA SU SALIDA
        $result2 = $this->model->GetExistMovil($request_params);
        
        while($row2 = $result2->fetch_assoc()){
            $strid = $row2["str_id"];
            $serid = $row2["ser_id"];
            $movpla = $row2["movstr_placas"];
            $prjId = $row2["pjt_id"];
            $paramsstr = array(
                'strid' => $strid, 
                'serid' => $serid,
                'movpla' => $movpla,
                'prjId' => $prjId, 
            );
            
            $result3 = $this->model->GetDetailMovil($paramsstr);

            while($row3 = $result3->fetch_assoc()){
                $stpid = $row3["stp_id"];
                $stpqty = $row3["stp_quantity"];
                $strid = $row3["str_id"];
                $serid = $row3["ser_id"];
                $prodId = $row3["prd_id"];
                $prdsku = $row3["prd_sku"];
                $prdnam = $row3["prd_name"];
                $cntqty = $row3["quantity"];
                $prjId = $GlbprjId;
                
                $paramsmov = array(
                    'stpid' => $stpid,
                    'stpqty' => $stpqty,
                    'strid' => $strid, 
                    'serid' => $serid,
                    'prodId' => $prodId,
                    'prdsku' => $prdsku,
                    'prdnam' => $prdnam, 
                    'cntqty' => $cntqty,
                    'prjId' => $prjId,  
                    'folio' => $folio, 
                );

                $ActSeries = $this->model->ActualizaSeries($paramsmov);
                $versin = 2;
                $updetail = $this->model->UpdateProducts($paramsmov);
                $versin = 3;
                $saveExc = $this->model->SaveExchange($paramsmov, $params);
                $versin = 4;
                // echo $stpid . ' | ' . 'END ' ;
            }
            $Paso= $Paso . ' Seccion 2 ' ;
        }
       
        $resultprjt = $this->model->GetOutProject($request_params);        
        // echo $versin .' | ' . $folio . ' | ' . $Paso;
        echo $folio;
    
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

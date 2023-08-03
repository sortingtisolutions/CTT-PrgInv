<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';
//INICIO DE PROCESOS
$proj_id = $_GET['p'];
$fechaIni = $_GET['fi'];
$fechaFin= $_GET['fe'];
$usrId = $_GET['u'];
$uname = $_GET['n'];

$totalBase = 0;
$totalTrip = 0;
$totalTest = 0;
$totalInsr = 0;         //      Total del seguro
$totalMain = 0;
$totalInsrGral = 0;

$equipoBase = 0;
$equipoExtra = 0;
$equipoDias = 0;
$equipoSubarrendo = 0;

$conkey = decodificar($_GET['h']) ;

$h = explode("|",$conkey);

$conn = new mysqli($h[0],$h[1],$h[2],$h[3]);
$qry = "SELECT pd.prd_name,pd.prd_sku, pd.prd_id, ser.ser_id, ser.ser_sku, ser.ser_serial_number, ser.ser_status, ser.ser_situation, ser.ser_stage, 
pj.pjt_name, pj.pjt_id, pj.pjt_date_start, pj.pjt_date_end, ifnull(pdm.pmt_id,0) as pmt_id, ifnull(pdm.pmt_days,0) AS pmt_days, ifnull(pdm.pmt_hours,0) AS pmt_hours, ifnull(pdm.pmt_date_start,'') AS pmt_date_start, ifnull(pdm.pmt_date_end,'') AS pmt_date_end, ifnull(pdm.pmt_comments,'') AS pmt_comments, ifnull(pdm.pjtcr_id,0) AS pjtcr_id, ifnull(mts.mts_description,'') AS mts_description, ifnull(pdm.mts_id,0) AS mts_id,
ifnull(pdm.pmt_price,0) AS pmt_price, ser.ser_sku, ser.ser_serial_number, ser.ser_no_econo, ifnull(pjcr.pjtcr_id,0) as pjtcr_id, ifnull(pjcr.pjtcr_definition,'') as pjtcr_definition, pdm.pmt_date_register
from ctt_products as pd 
INNER JOIN ctt_series AS ser ON ser.prd_id = pd.prd_id
INNER JOIN ctt_products_maintenance AS pdm ON pdm.ser_id = ser.ser_id
INNER JOIN ctt_maintenance_status AS mts ON mts.mts_id = pdm.mts_id
INNER JOIN ctt_projects AS pj ON pj.pjt_id = pdm.pjt_id
LEFT JOIN ctt_project_change_reason AS pjcr ON pjcr.pjtcr_id= pdm.pjtcr_id
WHERE pj.pjt_id='$proj_id' AND ser.ser_situation='M' AND pdm.pmt_date_register BETWEEN '$fechaIni' AND '$fechaFin'";

$res = $conn->query($qry);


while($row = $res->fetch_assoc()){
    $items[] = $row;
}

$conn->close();

// Cabezal de la página

$header = '
    <header>
        <div class="cornisa">
            <table class="table-main" border="0">
                <tr>
                    <td class="box-logo side-color">
                        <img class="img-logo" src="../../../app/assets/img/logo-blanco.jpg"  style="width:20mm; height:auto; margin: 3mm 2.5mm 0 2.5mm;"/>
                    </td>

                </tr>
            </table>
        </div>
    </header>';

           
$html = '
<section>
<div class="container">
    <div class="name-report">
        <p>
            <span class="number">Nombre de proyecto: '. $items[0]['pjt_name'].'</span>
        
        </p>
    </div>

    
    <!-- End Datos de identificación  -->
';


$html .= '
                    
     <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
         <thead>
             <tr>
                <th class="tit-figure prod">Producto</th>
                 <th class="tit-figure pric">Dias de reparación</th>
                 <th class="tit-figure qnty">Horas de reparación</th>
                 <th class="tit-figure amou">Fecha de registro</th>
                 <th class="tit-figure days">Inicio reparacion</th>
                 <th class="tit-figure disc">Fin reparacion</th>
                 <th class="tit-figure days">No. Económico</th>
                 <th class="tit-figure amou">Comentarios</th>
                 <th class="tit-figure amou">Motivos</th>
                 <th class="tit-figure amou">Estatus</th>
                 
             </tr>
         </thead>
         <tbody>';
         for ($i = 0; $i<count($items); $i++){
            $html .= '
                <tr>
                    <td class="dat-figure prod">' . $items[$i]['prd_name']                                    . '</td>
                    <td class="dat-figure pric">' . $items[$i]['pmt_days']          . '</td>
                    <td class="dat-figure qnty">' . $items[$i]['pmt_hours']                                   . '</td>
                    <td class="dat-figure amou">' . $items[$i]['pmt_date_register']     . '</td>
                    <td class="dat-figure days">' . $items[$i]['pmt_date_start']                                  . '</td>
                    <td class="dat-figure disc">' . $items[$i]['pmt_date_end']  . '</td>
                    <td class="dat-figure days">' . $items[$i]['ser_no_econo']                                   . '</td>
                    
                    <td class="dat-figure amou">' . $items[$i]['pmt_comments']      . '</td>
                    <td class="dat-figure amou">' . $items[$i]['pjtcr_definition']     . '</td>
                    <td class="dat-figure amou">' . $items[$i]['mts_description']     . '</td>
                </tr>
            ';
        }
        $html .= '
                       
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';
           


// Pie de pagina

$foot = '
    <footer>
        <table class="table-footer">
            <tr>
                <td class="side-color"></td>
                <td>
                    <table width="100%">
                        <tr>
                            <td class="td-foot foot-date" width="25%"></td>
                            <td class="td-foot foot-page" width="25%" align="center">{PAGENO}/{nbpg}</td>
                            <td class="td-foot foot-rept" width="25%" style="text-align: right"></td>
                        </tr>
                    </table>
                </td>
            </tr> 
        </table>
        
        <table class="table-address">
            <tr>
                <td class="addData">
                    reservaciones@cttrentals.com, 
                
                </td>
                <td class="addData">
                    presupuestos@cttrentals.com,
                </td>
                <td class="addData">
                
                    proyectos@cttrentals.com,
                </td>
                <td class="addData">
                    cotizaciones@cttrentals.com.
                </td>
            </tr>

            
        </table>
        <table class="table-address">
            
            <tr>
                <td class="addData">Av Guadalupe I. Ramírez 763, Tepepan Xochimilco, 16020, CDMX</td>
                
            </tr>
            
            
            
        </table>
    </footer>
';


$css = file_get_contents('../../assets/css/reports_p.css');

ob_clean();
ob_get_contents();
$mpdf= new \Mpdf\Mpdf([
    'mode' => 'utf-8',
    'format' => 'Letter',
    'margin_left' => 5,
    'margin_right' => 5,
    'margin_top' => 25,
    'margin_bottom' => 35,
    'margin_header' => 5,
    'margin_footer' => 4, 
    'orientation' => 'L'
    ]);

$mpdf->shrink_tables_to_fit = 1;
$mpdf->SetHTMLHeader($header);
$mpdf->SetHTMLFooter($foot);
$mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
$mpdf->Output(
    "Presupuesto.pdf",
    \Mpdf\Output\Destination::INLINE
);

// "Cotizacion-". $items[0]['ver_code'].".pdf",

function decodificar($dato) {
    $resultado = base64_decode($dato);
    list($resultado, $letra) = explode('+', $resultado);
    $arrayLetras = array('M', 'A', 'R', 'C', 'O', 'S');
    for ($i = 0; $i < count($arrayLetras); $i++) {
        if ($arrayLetras[$i] == $letra) {
            for ($j = 1; $j <= $i; $j++) {
                $resultado = base64_decode($resultado);
            }
            break;
        }
    }
    return $resultado;
}
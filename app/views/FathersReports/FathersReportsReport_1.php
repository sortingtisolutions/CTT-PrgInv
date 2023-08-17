<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';
//INICIO DE PROCESOS
$proj_id = $_GET['p'];
$prj = $_GET['prj'];
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

$qry = "SELECT * from ctt_budget as bg
INNER JOIN ctt_version AS vr ON vr.ver_id=bg.ver_id
INNER JOIN ctt_projects AS pj ON pj.pjt_id=vr.pjt_id
INNER JOIN ctt_location AS loc ON loc.loc_id = pj.loc_id
WHERE pj.pjt_id IN ($proj_id)";

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
            <span class="number">Nombre de proyecto padre: '. $prj .'</span>
        
        </p>
    </div>

    
    <!-- End Datos de identificación  -->
';


$html .= '
                    
     <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
         <thead>
             <tr>
                <th class="tit-figure prod">Numero</th>
                 <th class="tit-figure pric">Proyecto</th>
                 <th class="tit-figure qnty">Locacion</th>
                 <th class="tit-figure amou">Tipo de locacion</th>
                 <th class="tit-figure days">Fecha Inicio</th>
                 <th class="tit-figure disc">Fecha Fin</th>
                 <th class="tit-figure days">Tiempo</th>
                 <th class="tit-figure amou">Estatus</th>
                 
             </tr>
         </thead>
         <tbody>';
         for ($i = 0; $i<count($items); $i++){
            $html .= '
                <tr>
                    <td class="dat-figure prod">' . $items[$i]['pjt_number']                                    . '</td>
                    <td class="dat-figure pric">' . $items[$i]['pjt_name']          . '</td>
                    <td class="dat-figure qnty">' . $items[$i]['pjt_location']                                   . '</td>
                    <td class="dat-figure amou">' . $items[$i]['loc_type_location']     . '</td>
                    <td class="dat-figure days">' . $items[$i]['pjt_date_start']                                  . '</td>
                    <td class="dat-figure disc">' . $items[$i]['pjt_date_end']  . '</td>
                    <td class="dat-figure days">' . $items[$i]['pjt_time']                                   . '</td>
                    <td class="dat-figure amou">' . $items[$i]['pjt_status']      . '</td>
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
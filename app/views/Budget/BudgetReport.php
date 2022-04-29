<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

$verId = $_GET['v'];
$usrId = $_GET['u'];
$uname = $_GET['n'];

$totalBase = 0;
$totalTrip = 0;
$totalTest = 0;
$totalInsr = 0;

$conkey = decodificar($_GET['h']) ;

$h = explode("|",$conkey);

$conn = new mysqli($h[0],$h[1],$h[2],$h[3]);
$qry = "SELECT *, ucase(date_format(vr.ver_date, '%d-%b-%Y %H:%i')) as ver_date_real,
            CONCAT_WS(' - ' , date_format(pj.pjt_date_start, '%d-%b-%Y'), date_format(pj.pjt_date_end, '%d-%b-%Y')) as period
        FROM ctt_budget AS bg
        INNER JOIN ctt_version AS vr ON vr.ver_id = bg.ver_id
        INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
        INNER JOIN ctt_projects_type AS pt ON pt.pjttp_id = pj.pjttp_id
        INNER JOIN ctt_location AS lc ON lc.loc_id = pj.loc_id
        INNER JOIN ctt_products AS pd ON pd.prd_id = bg.prd_id
        INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
        INNER JOIN ctt_customers AS cu ON cu.cus_id = co.cus_id
        WHERE bg.ver_id = $verId ;";

$res = $conn->query($qry);
$conn->close();

while($row = $res->fetch_assoc()){
    $items[] = $row;
}


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

    $costBase = 0;
    for ($i = 0; $i<count($items); $i++){
        $amount = $items[$i]['bdg_prod_price'] * $items[$i]['bdg_quantity'];
        $amountBase = ($amount * $items[$i]['bdg_days_base'])-($amount * ($items[$i]['bdg_discount_base']/100));
        $amountTrip = ($amount * $items[$i]['bdg_days_trip'])-($amount * ($items[$i]['bdg_discount_trip']/100));
        $amountTest = ($amount * $items[$i]['bdg_days_test'])-($amount * ($items[$i]['bdg_discount_test']/100));
        $amountInsr = ($amount * $items[$i]['bdg_insured']);
        $totalBase += $amountBase ;
        $totalTrip += $amountTrip ;
        $totalTest += $amountTest ;
        $totalInsr += $amountInsr ;
    }
                
$html = '
    <section>
        <div class="container">
            <div class="name-report">
                <p>
                    <span class="number">Cotización '. $items[0]['ver_code'] .'</span>
                <br>
                    <span class="date">'.  $items[0]['ver_date_real'] .'</span>
                </p>
            </div>

            <table class="table-data bline-d tline">
                <tr>
                    <td class="rline half">
                        <!-- Start datos del cliente -->
                        <table class="table-data">
                            <tr>
                                <td class="concept">Cliente:</td>
                                <td class="data">'. $items[0]['cus_name'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Domicilio:</td>
                                <td class="data">'.  $items[0]['cus_address'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Correo Electrónico:</td>
                                <td class="data">'. $items[0]['cus_email'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Teléfono:</td>
                                <td class="data">'. $items[0]['cus_phone'] .'</td>
                            </tr>
                        </table>
                        <!-- End datos del cliente -->
                    </td>
                    <td class="half">
                        <!-- Start Datos del projecto -->
                        <table class="table-data">
                            <tr>
                                <td class="concept">Num. proyecto:</td>
                                <td class="data"><strong>'. $items[0]['pjt_number'] .'</strong></td>
                            </tr>
                            <tr>
                                <td class="concept">Proyecto:</td>
                                <td class="data">'. $items[0]['pjt_name'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Locación:</td>
                                <td class="data">'. $items[0]['pjt_location'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Tipo de Locación:</td>
                                <td class="data">'. $items[0]['loc_type_location'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Tipo de proyecto:</td>
                                <td class="data">'. $items[0]['pjttp_name'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Periodo:</td>
                                <td class="data">'. $items[0]['period'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">&nbsp;</td>
                                <td class="data">&nbsp;</td>
                            </tr>
                            
                        </table>
                        <!-- End Datos del projecto -->
                    </td>
                </tr>
            </table>
            <!-- End Datos de identificación  -->';


        
$html .= '


            <!-- Start Tabla de costo base  -->
            <h2>Costo Base</h2>
            <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                <thead>
                    <tr>
                        <th class="tit-figure prod">Producto</th>
                        <th class="tit-figure pric">Precio</th>
                        <th class="tit-figure qnty">Cant.</th>
                        <th class="tit-figure days">Días</th>
                        <th class="tit-figure disc">Dcto.</th>
                        <th class="tit-figure amou">Importe</th>
                    </tr>
                </thead>
                <tbody>';

                for ($i = 0; $i<count($items); $i++){
                    $price = $items[$i]['bdg_prod_price'] ;
                    $sbtt1 = $price * $items[$i]['bdg_quantity'];
                    $sbtt2 = $sbtt1 * $items[$i]['bdg_days_base'];
                    $disco = $sbtt2 * ($items[$i]['bdg_discount_base']/100);
                    $amount = $sbtt2 - $disco;

$html .= '
                    <tr>
                        <td class="dat-figure prod">'. $items[$i]['bdg_prod_name'] .'</td>
                        <td class="dat-figure pric">' . number_format($price , 2,'.',',') . '</td>
                        <td class="dat-figure qnty">'. $items[$i]['bdg_quantity'] .'</td>
                        <td class="dat-figure days">'. $items[$i]['bdg_days_base'] .'</td>
                        <td class="dat-figure disc">' . number_format(($items[$i]['bdg_discount_base']/100) , 2,'.',',') . '</td>
                        <td class="dat-figure amou">' . number_format($amount , 2,'.',',') . '</td>
                    </tr>
                    ';

                }
$html .= '
                    <tr>
                        <td class="tot-figure totl" colspan="5">Total Base</td>
                        <td class="tot-figure amou">' . number_format($totalBase, 2,'.',',') . '</td>
                    </tr>
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
                            <td class="td-foot foot-date" width="25%">{DATE F j, Y}</td>
                            <td class="td-foot foot-page" width="25%" align="center">{PAGENO}/{nbpg}</td>
                            <td class="td-foot foot-rept" width="25%" style="text-align: right">Elaboró: '. $name . '</td>
                            <td class="td-foot foot-rept" width="25%" style="text-align: right">Versión '. $items[0]['ver_code'].'</td>
                        </tr>
                    </table>

                </td>
            </tr>
            
        </table>
        <table class="table-address">
            <tr>
                <td class="addData">55 5676-1113<br />55 5676-1483</td>
                <td class="addIcon addColor01"><img class="img-logo" src="../../../app/assets/img/icon-phone.png" style="width:4mm; height:auto;" /></td>

                <td class="addData">Av Guadalupe I. Ramírez 763,<br />Tepepan Xochimilco, 16020, CDMX</td>
                <td class="addIcon addColor02"><img class="img-logo" src="../../../app/assets/img/icon-location.png" style="width:4mm; height:auto;" /></td>
                <td class="addData">ventas@cttrentals.com<br />contacto@cttretnals.com<br />cotizaciones@cttrentals.com</td>
                <td class="addIcon addColor03"><img class="img-logo" src="../../../app/assets/img/icon-email.png"  style="width:4mm; height:auto;"/></td>
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
    'margin_left' => 0,
    'margin_right' => 0,
    'margin_top' => 5,
    'margin_bottom' => 30,
    'margin_header' => 0,
    'margin_footer' => 0, 
    'orientation' => 'P'
    ]);

$mpdf->shrink_tables_to_fit = 1;
$mpdf->SetHTMLHeader($header);
$mpdf->SetHTMLFooter($foot);
$mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
$mpdf->Output(
    "Cotizacion.pdf",
    "I"
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
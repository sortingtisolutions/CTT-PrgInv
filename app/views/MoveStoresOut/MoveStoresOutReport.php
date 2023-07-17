<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

//INICIO DE PROCESOS
$verId = $_GET['v'];
$usrId = $_GET['u'];
$uname = $_GET['n'];


$conkey = decodificar($_GET['h']) ;

$h = explode("|",$conkey);

$conn = new mysqli($h[0],$h[1],$h[2],$h[3]);
$qry = "SELECT * 
        FROM ctt_stores_exchange AS bg
        WHERE bg.con_id = $verId ORDER BY exc_id;";

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
                        <img class="img-logo" src="../../../app/assets/img/Logoctt_h.png"  style="width:25mm; height:auto; margin: 3mm 2.5mm 0 2.5mm;"/>
                    </td>
                </tr>
            </table>
        </div>
    </header>';

$equipoBase = '1';               

$html = '
    <section>
        <div class="container">
            <div class="name-report">
                <p>
                    <span class="number">Reporte de Salida de Almacen: '. str_pad($items[0]['con_id'],7,'0',STR_PAD_LEFT) .'</span>
                <br>
                    <span class="date">'.  $items[0]['exc_date'] .'</span>
                </p>
            </div>

            <table class="table-data bline-d tline">
                <tr>
                    <td class="half">
                        <!-- Start Datos del projecto -->
                        <table class="table-data">
                            <tr>
                                <td class="concept">Nombre Empleado:</td>
                                <td class="data"><strong>'. $items[0]['exc_employee_name'] .'</strong></td>
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
            <!-- End Datos de identificación  -->
';

/* Tabla de equipo base -------------------------  */
if ($equipoBase == '1'){
        $html .= '

                    <!-- Start Tabla de costo base  -->
                    <h2>Lista de equipo</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure amou">Sku</th>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure amou">No. Serie</th>
                                <th class="tit-figure disc">Clave Movimiento</th>
                                <th class="tit-figure amou">Almacen Afectado</th>
                                <th class="tit-figure prod">Notas</th>
                            </tr>
                        </thead>
                        <tbody>';

                        for ($i = 0; $i<count($items); $i++){
                            $section     = 1;

                            if ($section == '1') {
                                $product        = $items[$i]['exc_sku_product'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['exc_product_name'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['exc_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['exc_serie_product'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['ext_code'] ; //  ----------------------- Porcentaje de descuento base
                                $daysTrip       = $items[$i]['exc_store'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['exc_comments'];  //  ----------------------- Porcentaje de descuento viaje
            
                                
        $html .= '
                            <tr>
                                <td class="dat-figure amou">' . $product                . '</td>
                                <td class="dat-figure prod">' . $price                  . '</td>
                                <td class="dat-figure qnty">' . $quantity               . '</td>
                                <td class="dat-figure days">' . $daysBase               . '</td>
                                <td class="dat-figure disc">' . $discountBase           . '</td>
                                <td class="dat-figure amou">' . $daysTrip               . '</td>
                                <td class="dat-figure prod">' . $discountTrip           . '</td>
                            </tr>
                            ';
                            }
                        }
        $html .= '
                        <tr>
                            <td class="tot-figure amou" ></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure prod"></td>
                        </tr>
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';
}
    
/* Tabla de equipo base -------------------------  */

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
                            <td class="td-foot foot-rept" width="25%" style="text-align: right">Elaboró: '. $uname . '</td>
                            <td class="td-foot foot-rept" width="25%" style="text-align: right">Versión '. $verId .'</td>
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
    "Salida_Almacen.pdf",
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
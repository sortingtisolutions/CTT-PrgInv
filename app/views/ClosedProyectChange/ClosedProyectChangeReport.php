<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

//INICIO DE PROCESOS
$SalId = $_GET['i'];
$usrId = $_GET['u'];
$name = $_GET['n'];

$conkey = decodificar($_GET['h']) ;
$subtotal=0;

$h = explode("|",$conkey);

$conn = new mysqli($h[0],$h[1],$h[2],$h[3]);
$qry = "SELECT sl.*, sd.*, pj.pjt_number, pj.pjt_name, st.str_name
        FROM ctt_sales AS sl
        INNER JOIN ctt_sales_details AS sd ON sd.sal_id = sl.sal_id
        INNER JOIN ctt_stores AS st ON st.str_id = sl.str_id
        LEFT JOIN ctt_projects As pj ON pj.pjt_id = sl.pjt_id
        WHERE sl.sal_id = $SalId;";
$res = $conn->query($qry);
$conn->close();
while($row = $res->fetch_assoc()){
    $items[] = $row;
}


$payform = $items[0]['sal_pay_form'];
if ($items[0]['sal_pay_form'] == 'TARJETA DE CREDITO'){$payform = 'TARJETA DE CRÉDITO';}

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
                <span class="number">Venta</span>
            <br>
                <span class="date">'.  $items[0]['sal_date'] .'</span>
            </p>
        </div>

        <table class="table-data bline-d tline">
            <tr>
                <td>
                    <!-- Start datos del cliente -->
                    <table class="table-data">
                        <tr>
                            <td class="concept">Cliente:</td>
                            <td class="data">'.  $items[0]['sal_customer_name'] .'</td>
                        </tr>';
    if ($items[0]['pjt_id'] > '0' ){
    
    $html .= '
                        <tr>
                            <td class="concept">Numero de proyecto:</td>
                            <td class="data">'.  $items[0]['pjt_number'] .'</td>
                        </tr>
                        <tr>
                            <td class="concept">Nombre de proyecto:</td>
                            <td class="data">'.  $items[0]['pjt_name'] .'</td>
                        </tr>';

    }

    $html .= '
                            <tr>
                                <td class="concept">Forma de pago:</td>
                                <td class="data">'.  $payform .'</td>
                            </tr>';

    if ($items[0]['sal_pay_form'] == 'TARJETA DE CREDITO' ){

    $html .= '
                        <tr>
                            <td class="concept">Número de factura:</td>
                            <td class="data">'.  $items[0]['sal_number_invoice'] .'</td>
                        </tr>';

    }

    $html .='
                        <tr>
                            <td class="concept">Almacén:</td>
                            <td class="data">'.  $items[0]['str_name'] .'</td>
                        </tr>
                    </table>
                    <!-- End datos del cliente -->
                </td>
            </tr>
        </table>
        <!-- End Datos de identificación  -->';

    $html .= '


        <!-- Start Tabla de costo base  -->
        <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
            <thead>
                <tr>
                    <th class="tit-figure prod">Producto</th>
                    <th class="tit-figure pric">Precio</th>
                    <th class="tit-figure qnty">Cant.</th>
                    <th class="tit-figure amou">Importe</th>
                </tr>
            </thead>
            <tbody>';

    for ($i = 0; $i < count($items); $i++){
        $price = $items[$i]['sld_price'] ;
        $color = '';
        if ($items[$i]['sld_situation'] == 'DEVOLUCION'){$price = $price * -1; $color = 'retColor';}
        $quant = $items[$i]['sld_quantity'] ;
        $amount = $price * $quant;
        $subtotal += $amount;

    $html .= '
                <tr >
                    <td class="dat-figure prod '. $color .'">'.  $items[$i]['sld_sku'] . ' - ' . $items[$i]['sld_name'] . '</td>
                    <td class="dat-figure pric '. $color .'">' . number_format($price , 2,'.',',') . '</td>
                    <td class="dat-figure qnty '. $color .'">'. $quant .'</td>
                    <td class="dat-figure amou '. $color .'">' . number_format($amount , 2,'.',',') . '</td>
                </tr>
                ';

            }

    if ($items[0]['sal_pay_form'] == 'TARJETA DE CREDITO'){

        
    $iva = $subtotal * .16;
    $total = $subtotal + $iva;
    $html .= '

    <tr>
        <td class="tot-figure totl" colspan="3">Subtotal</td>
        <td class="tot-figure amou">' . number_format($subtotal, 2,'.',',') . '</td>
    </tr>

    <tr>
        <td class="tot-figure totl" colspan="3">I.V.A.</td>
        <td class="tot-figure amou">' . number_format($iva, 2,'.',',') . '</td>
    </tr>';


    } else {
        $total = $subtotal;
    }

$html .= '

            <tr>
                <td class="tot-figure totl" colspan="3">Total</td>
                <td class="tot-figure amou">' . number_format($total, 2,'.',',') . '</td>
            </tr>
        </tbody>
    </table>
</section>
    <!-- End Tabla de costo base  -->
    <div class="obs_frame">
        <h3>Observaciones</h3>
    ';

    
     $conn = new mysqli($h[0],$h[1],$h[2],$h[3]);
     $qr2 = "SELECT * FROM ctt_comments WHERE com_source_section = 'sales' AND com_action_id = $SalId;";
     $com = $conn->query($qr2);
     $conn->close();

    while($row = $com->fetch_assoc()){
        
        $html .= '  
        <p class="obs_comments">
            <span class="obs_date">' . $row['com_date'] . '</span> -
            <span class="obs_comment">' . $row['com_comment'] . '</span>
        </p>
        ';
    }
    


$html .= '</div>';

        
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
                        <td class="td-foot foot-rept" width="25%" style="text-align: right">Venta </td>
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
    "Cotizacion-". $items[0]['ver_code'].".pdf",
    "I"
);


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
<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

//INICIO DE PROCESOS
$prdId = $_GET['v'];
$usrId = $_GET['u'];
$uname = $_GET['n'];


$conkey = decodificar($_GET['h']) ;

$h = explode("|",$conkey);

$conn = new mysqli($h[0],$h[1],$h[2],$h[3]);
$qry = "SELECT prd.prd_name, prd.prd_level, pjtcn_prod_name, pdt.pjtdt_prod_sku, 
        sr.ser_serial_number, pj.pjt_number, 
        pj.pjt_name, pj.pjt_date_start, '1' AS dt_cantidad, sr.ser_no_econo
        FROM ctt_projects_content AS pcn
        INNER JOIN ctt_projects_detail AS pdt ON pcn.pjtvr_id=pdt.pjtvr_id
        INNER JOIN ctt_series AS sr ON sr.ser_id=pdt.ser_id
        INNER JOIN ctt_products AS prd ON prd.prd_id=sr.prd_id
        INNER JOIN ctt_projects AS pj ON pj.pjt_id=pcn.pjt_id
        WHERE pcn.pjt_id=$prdId 
        ORDER BY pdt.pjtdt_prod_sku;";

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
                        <img class="img-logo" src="../../../app/assets/img/Logoctt_h.png"  style="width:23mm; height:10mm; margin: 3mm 2.5mm 0 2.5mm;"/>
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
                    <span class="number">Detalles y Accesorios del proyecto: '. $items[0]['pjt_name'] .' </span>
                <br>
                    <span class="date">Fecha de salida'.  $items[0]['pjt_date_start'] .'</span>
                </p>
            </div>

            <table class="table-data bline-d tline">
                <tr>
                    <td class="half">
                        <!-- Start Datos del projecto -->
                        <table class="table-data">
                            <tr>
                                <td class="concept">Nombre Empleado:</td>
                                <td class="data"><strong>'. $uname .'</strong></td>
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
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure amou">Sku</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure amou">No. <br>Economico</th>
                                <th class="tit-figure prod">Notas</th>
                            </tr>
                        </thead>
                        <tbody>';

                        for ($i = 0; $i<count($items); $i++){
                            $section     = 1;

                            if ($section == '1') {
                                $prodname     = $items[$i]['prd_name'] ;  //  ------------
                                $prodsku      = $items[$i]['pjtdt_prod_sku'] ; //  ------------
                                $quantity     = $items[$i]['dt_cantidad'] ;  //  ------------
                                $sernum       = $items[$i]['ser_no_econo'] ; //  -------- 
                                $typeprd       = $items[$i]['prd_level'] ; //  --------

                                if ($typeprd == 'P') {
                              
        $html .= '
                            <tr>
                                <td class="dat-figure supply"><b>' . $prodname . '</b></td>
                                <td class="dat-figure sku">' . $prodsku  . '</td>
                                <td class="dat-figure qnty">' . $quantity  . '</td>
                                <td class="dat-figure days">' . $sernum . '</td>
                                <td class="dat-figure prod"> </td>
                            </tr>
                            ';
                                }
                                else{
        $html .= '
                                <tr>
                                    <td class="dat-figure supply"> <span>&nbsp; &nbsp;</span>' . $prodname . '</td>
                                    <td class="dat-figure sku">' . $prodsku  . '</td>
                                    <td class="dat-figure qnty">' . $quantity  . '</td>
                                    <td class="dat-figure days">' . $sernum . '</td>
                                    <td class="dat-figure prod"> </td>
                                </tr>
                                ';
                                }
                            }
                        }
        $html .= '
                        <tr>
                            <td class="tot-figure amou" ></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                        </tr>
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';
}
    
$html .= '
<!-- Start Tabla de terminos  -->
<div style="height:20px;"></div>
<section>
<div class="container name-report bline-d">
    <table class="bline-d" autosize="1"  >
        <tbody>
            <tr  >
                <td style="width:25mm; height:60px; margin: 3mm 2.5mm 0 2.5mm;"><span>&nbsp; </span> </td>
                <td style="width:25mm; height:60px; margin: 3mm 2.5mm 0 2.5mm;"><span>&nbsp; </span> </td>
                <td style="width:25mm; height:60px; margin: 3mm 2.5mm 0 2.5mm;"><span>&nbsp; </span> </td>
            </tr>
            <tr class="tline-d" style="font-size: 1.1em; text-align: center">
                <td class="prod" > Responsable Cliente </td>
                <td class="prod" >Firmas </td>
                <td class="prod" >Responsable CTT</td>
            </tr>
        </tbody>
    </table>
</div>
</section>';

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
                            <td class="td-foot foot-rept" width="25%" style="text-align: right">Versión '. $prdId .'</td>
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
    'margin_left' => 5,
    'margin_right' => 5,
    'margin_top' => 10,
    'margin_bottom' => 35,
    'margin_header' => 10,
    'margin_footer' => 5, 
    'orientation' => 'L'
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
<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

//INICIO DE PROCESOS
$verId = $_GET['v'];
$usrId = $_GET['u'];
$uname = $_GET['n'];

$equipoBase = 0;
$equipoExtra = 0;
$equipoDias = 0;
$equipoSubarrendo = 0;

$conkey = decodificar($_GET['h']) ;

$h = explode("|",$conkey);

$conn = new mysqli($h[0],$h[1],$h[2],$h[3]);
$qry = "SELECT pjd.pjtdt_prod_sku, ser.ser_serial_number, prd.prd_sku, prd.prd_name, prd.prd_level,
        pjt.pjt_number, pjt.pjt_name ,
        CONCAT_WS(' - ' , date_format(pjt.pjt_date_start, '%d-%b-%Y'), date_format(pjt.pjt_date_end, '%d-%b-%Y')) as period,
        pjt.pjt_how_required, pjt.pjt_location,	pt.pjttp_name, lc.loc_type_location, cu.cus_name, 
        pjc.pjtcn_section, pjc.pjtcn_order,SYSDATE() AS dateout
        FROM ctt_projects_content AS pjc
        INNER JOIN ctt_projects_detail AS pjd ON pjd.pjtvr_id=pjc.pjtvr_id
        INNER JOIN ctt_series AS ser ON ser.ser_id=pjd.ser_id
        INNER JOIN ctt_products AS prd ON prd.prd_id=ser.prd_id
        INNER JOIN ctt_projects AS pjt ON pjt.pjt_id=pjc.pjt_id
        LEFT JOIN ctt_projects_type AS pt ON pt.pjttp_id = pjt.pjttp_id
        LEFT JOIN ctt_location AS lc ON lc.loc_id = pjt.loc_id
        LEFT  JOIN ctt_customers_owner AS co ON co.cuo_id = pjt.cuo_id
        LEFT  JOIN ctt_customers AS cu ON cu.cus_id = co.cus_id
        WHERE pjt.pjt_id=2 ORDER BY pjc.pjtcn_section, pjc.pjtcn_order;";

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


    for ($i = 0; $i<count($items); $i++){
    
        if ($items[$i]['pjtcn_section'] == '1') $equipoBase = '1';
        if ($items[$i]['pjtcn_section'] == '2') $equipoExtra = '1';
        if ($items[$i]['pjtcn_section'] == '3') $equipoDias = '1';
        if ($items[$i]['pjtcn_section'] == '4') $equipoSubarrendo = '1';

    }
                
$html = '
    <section>
        <div class="container">
            <div class="name-report">
                <p>
                    <span class="number"> Informe de salida de proyecto: '. $items[0]['pjt_name'] .'</span>
                <br>
                    <span class="date">'.  $items[0]['dateout'] .'</span>
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
                                <td class="concept">Quien Solicito Proyecto:</td>
                                <td class="data">'.  $items[0]['pjt_how_required'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Quien Elabora Salida:</td>
                                <td class="data">'. $uname .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Analista CTT:</td>
                                <td class="data">'. $uname .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Freelance Asigando:</td>
                                <td class="data">'. $uname .'</td>
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
                                <td class="concept">Tipo de proyecto:</td>
                                <td class="data">'. $items[0]['pjttp_name'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Periodo:</td>
                                <td class="data">'. $items[0]['period'] .'</td>
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
                    <h2>Equipo Base</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure days">Sku</th>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure disc">Serie</th>
                                <th class="tit-figure days">Tipo <br>Producto</th>
                                
                            </tr>
                        </thead>
                        <tbody>';

                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtcn_section'] ;

                            if ($section == '1') {
                                $skush        = $items[$i]['pjtdt_prod_sku'] ; //  --------------------------- Sku del producto
                                $product      = $items[$i]['prd_name'] ;       //  --------------------------- Nombre del producto
                                $quantity     = 1 ;                            //  --------------------------- Cantidad solicitada
                                $serienum     = $items[$i]['ser_serial_number'] ; //  -------------------------Numero de serie del producto 
                                $levelprd     = $items[$i]['prd_level'] ;      //  ----------------------------Tipo del producto

        $html .= '
                            <tr>
                                <td class="dat-figure sku">' . $skush     . '</td>
                                <td class="dat-figure prod">' . $product   . '</td>
                                <td class="dat-figure sku">' . $quantity  . '</td>
                                <td class="dat-figure prod">' . $serienum  . '</td>
                                <td class="dat-figure sku">' . $levelprd  . '</td>
                            </tr>
                            ';
                            }

                        }
        $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';

    }
/* Tabla de equipo base -------------------------  */


/* Tabla de equipo extra -------------------------  */
    if ($equipoExtra == '1'){
        $html .= '
                    <!-- Start Tabla de costo base  -->
                    <h2>Equipo Extra</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure days">Sku</th>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure disc">Serie</th>
                                <th class="tit-figure days">Tipo <br>Producto</th>
                                
                            </tr>
                        </thead>
                        <tbody>';

                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtcn_section'] ;

                            if ($section == '2') {
                                $skush        = $items[$i]['pjtdt_prod_sku'] ; //  --------------------------- Sku del producto
                                $product      = $items[$i]['prd_name'] ;       //  --------------------------- Nombre del producto
                                $quantity     = 1 ;                            //  --------------------------- Cantidad solicitada
                                $serienum     = $items[$i]['ser_serial_number'] ; //  -------------------------Numero de serie del producto 
                                $levelprd     = $items[$i]['prd_level'] ;      //  ----------------------------Tipo del producto
                               
        $html .= '
                            <tr>
                                <td class="dat-figure sku">' . $skush     . '</td>
                                <td class="dat-figure prod">' . $product   . '</td>
                                <td class="dat-figure sku">' . $quantity  . '</td>
                                <td class="dat-figure prod">' . $serienum  . '</td>
                                <td class="dat-figure sku">' . $levelprd  . '</td>
                                
                            </tr>
                            ';
                            }

                        }
        $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';

    }
/* Tabla de equipo extra -------------------------  */


/* Tabla de equipo dias -------------------------  */
    if ($equipoDias == '1'){
        $html .= '
                    <!-- Start Tabla de costo base  -->
                    <h2>Equipo por Dia</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure days">Sku</th>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure disc">Serie</th>
                                <th class="tit-figure days">Tipo <br>Producto</th>
                                
                            </tr>
                        </thead>
                        <tbody>';


                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtcn_section'] ;

                            if ($section == '3') {
                                $skush        = $items[$i]['pjtdt_prod_sku'] ; //  --------------------------- Sku del producto
                                $product      = $items[$i]['prd_name'] ;       //  --------------------------- Nombre del producto
                                $quantity     = 1 ;                            //  --------------------------- Cantidad solicitada
                                $serienum     = $items[$i]['ser_serial_number'] ; //  -------------------------Numero de serie del producto 
                                $levelprd     = $items[$i]['prd_level'] ;      //  ----------------------------Tipo del producto

        $html .= '
                            <tr>
                                <td class="dat-figure sku">' . $skush     . '</td>
                                <td class="dat-figure prod">' . $product   . '</td>
                                <td class="dat-figure sku">' . $quantity  . '</td>
                                <td class="dat-figure prod">' . $serienum  . '</td>
                                <td class="dat-figure sku">' . $levelprd  . '</td>
                                
                            </tr>
                            ';
                            }

                        }
        $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';

    }
/* Tabla de equipo dias -------------------------  */


/* Tabla de equipo subarrendo -------------------------  */
    if ($equipoSubarrendo == '1'){
        $html .= '
                    <!-- Start Tabla de costo base  -->
                    <h2>Equipo Subarrendado</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure days">Sku</th>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure disc">Serie</th>
                                <th class="tit-figure days">Tipo <br>Producto</th>
                                
                            </tr>
                        </thead>
                        <tbody>';

                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtcn_section'] ;

                            if ($section == '4') {
                                $skush        = $items[$i]['pjtdt_prod_sku'] ; //  --------------------------- Sku del producto
                                $product      = $items[$i]['prd_name'] ;       //  --------------------------- Nombre del producto
                                $quantity     = 1 ;                            //  --------------------------- Cantidad solicitada
                                $serienum     = $items[$i]['ser_serial_number'] ; //  -------------------------Numero de serie del producto 
                                $levelprd     = $items[$i]['prd_level'] ;      //  ----------------------------Tipo del producto

        $html .= '
                            <tr>
                                <td class="dat-figure sku">' . $skush     . '</td>
                                <td class="dat-figure prod">' . $product   . '</td>
                                <td class="dat-figure sku">' . $quantity  . '</td>
                                <td class="dat-figure prod">' . $serienum  . '</td>
                                <td class="dat-figure sku">' . $levelprd  . '</td>
                                
                            </tr>
                            ';
                            }

                        }
        $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';

    }
/* Tabla de equipo subarrendo -------------------------  */


/* Tabla totales -------------------------  */
    $html .= '
    
                <!-- Start Tabla de totales  -->
                <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                    <thead>
                        <tr>
                            <th class="tit-figure" colspan="9">&nbsp;</th>
                            <th class="tit-figure amou" >&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>';
    
                    
    $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo equipo subarrendo  -->';
    

/* Tabla totales -------------------------  */



// *************************** Pie de pagina *************************
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
                            <td class="td-foot foot-rept" width="25%" style="text-align: right">Versión '. $items[0]['pjt_number'].'</td>
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
    "Salida_Proyecto.pdf",
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
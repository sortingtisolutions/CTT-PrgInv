<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

//INICIO DE PROCESOS
$prdId = $_GET['v'];
$usrId = $_GET['u'];
$uname = $_GET['n'];
$empid = $_GET['em'];

$conkey = decodificar($_GET['h']) ;

$h = explode("|",$conkey);

$conn = new mysqli($h[0],$h[1],$h[2],$h[3]);

if ($empid == '1'){
    $qry = "SELECT pcn.pjtcn_prod_name, pcn.pjtcn_prod_sku, pcn.pjtcn_quantity,
            pj.pjt_number, pj.pjt_name, pj.pjt_date_start 
            FROM ctt_projects_content AS pcn
            INNER JOIN ctt_projects AS pj ON pj.pjt_id=pcn.pjt_id
            WHERE pj.pjt_id=$prdId 
            ORDER BY pcn.pjtcn_prod_sku;";
} else{
    $qry = "SELECT pjtcn_id, pjtcn_prod_sku, pjtcn_prod_name, pjtcn_quantity, 
                    pjc.pjt_id, pjtcn_order, pjc.pjtcn_section,
                    pj.pjt_number, pj.pjt_name, pj.pjt_date_start
            FROM ctt_projects_content AS pjc
            INNER JOIN ctt_projects AS pj ON pj.pjt_id=pjc.pjt_id
            INNER JOIN ctt_categories AS cat ON lpad(cat.cat_id,2,'0')=SUBSTR(pjc.pjtcn_prod_sku,1,2)
            INNER JOIN ctt_employees AS em ON em.are_id=cat.are_id
            WHERE pjc.pjt_id=$prdId AND em.emp_id=$empid
            ORDER BY pjc.pjtcn_section, pjc.pjtcn_prod_sku ASC;";
}

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
                        <img class="img-logo" src="../../../app/assets/img/Logoctt_h.png"  style="width:37mm; height:13mm; margin: 3mm 2.5mm 0 2.5mm;"/>
                    </td>
                    <td class="name-report bline" style="witdh:77mm;  font-size: 13pt; text-align: right; padding-right: 30px; padding-top: 25px">
                    <p>
                        <span class="number">Proyecto: '. $items[0]['pjt_name'] . '   #' . $items[0]['pjt_number'] .'</span>
                        <br><span style=" font-size: 8pt; color: #191970">Nombre Responsable: '. $uname .'</span>
                    </p>
                    </td>
                </tr>
            </table>
        </div>
    </header>';

$equipoBase = '1';               

$html = '
    <section>
        <div class="container">
        <div style="height:20px;"></div>
            <table class="table-data bline tline" style="text-align: center">
                <tr>
                    <td>
                        <p class="tit-rep" style="font-size: 15pt; font-variant: small-caps; font-weight: bold; text-align: center">
                        Impresion de contenido del Proyecto
                        </p>
                    </td>
             
                </tr>
                <!--<tr>
                    <td class="half">
                        <table class="table-data">
                            <tr>
                                <td class="concept"><strong>Nombre Responsable:</strong></td>
                                <td class="data"><strong>'. $uname .'</strong></td>
                            </tr>
                            <tr>
                                <td class="concept">&nbsp;</td>
                                <td class="data">&nbsp;</td>
                            </tr> 
                        </table>
                          
                    </td>
                </tr> -->
                
            </table>
            <!-- End Datos de identificación  -->
';

/* Tabla de equipo base -------------------------  */
        $html .= '
                    <!-- Start Tabla de costo base  -->
                    <h2>Lista de equipo</h2>
                    <table autosize="1" style="page-break-inside:auto" class="table-data bline">
                        <thead>
                            <tr>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure amou">Sku</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure amou">Notas</th>
                            </tr>
                        </thead>
                        <tbody>';

                        for ($i = 0; $i<count($items); $i++){
                            $section     = 1;

                            if ($section == '1') {
                                $prodname     = $items[$i]['pjtcn_prod_name'] ;  //  ------------
                                $prodsku      = $items[$i]['pjtcn_prod_sku'] ; //  ------------
                                $quantity     = $items[$i]['pjtcn_quantity'] ;  //  ------------
                                
        $html .= '
                            <tr>
                                <td class="dat-figure prod" style="font-size: 1.2em;">' . $prodname     . '</td>
                                <td class="dat-figure sku">'   . $prodsku     . '</td>
                                <td class="dat-figure sku">'   . $quantity    . '</td>
                                <td class="dat-figure prod"> </td>
                            </tr> ';
                            }
                        }
        $html .= '
                        <tr>
                            <td class="tot-figure amou" ></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                            <td class="tot-figure amou"></td>
                        </tr>
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';

    
/* Tabla de equipo base -------------------------  */

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
/* Tabla firmas -------------------------  */


// Pie de pagina
$foot = '
    <footer>
        <table class="table-address">
            <tr>
                <td class="addData">Av Guadalupe I. Ramírez 763,<br />Tepepan Xochimilco, 16020, CDMX</td>
                <td class="addIcon addColor02"><img class="img-logo" src="../../../app/assets/img/icon-location.png" style="width:3mm; height:auto;" /></td>
                <td class="addData">ventas@cttrentals.com<br />presupuestos@cttrentals.com<br />proyectos@cttrentals.com</td>
                <td class="addIcon addColor03"><img class="img-logo" src="../../../app/assets/img/icon-email.png"  style="width:3mm; height:auto;"/></td>
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
    'margin_bottom' => 30,
    'margin_header' => 5,
    'margin_footer' => 10, 
    'orientation' => 'P'
    ]);

$mpdf->shrink_tables_to_fit = 1;
$mpdf->SetHTMLHeader($header);
$mpdf->SetHTMLFooter($foot);
$mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
$mpdf->Output(
    "Salida_Store_Content.pdf",
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
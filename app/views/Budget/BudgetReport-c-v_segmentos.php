<?php

ini_set('display_errors', 'On');

require_once '../../../vendor/autoload.php';

//INICIO DE PROCESOS
$verId = $_GET['v'];
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
$qry = "SELECT *, ucase(date_format(vr.ver_date, '%d-%b-%Y %H:%i')) as ver_date_real,
CONCAT_WS(' - ' , date_format(pj.pjt_date_start, '%d-%b-%Y'), 
date_format(pj.pjt_date_end, '%d-%b-%Y')) as period , vr.ver_discount_insured
FROM ctt_budget AS bg
INNER JOIN ctt_version AS vr ON vr.ver_id = bg.ver_id
INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
INNER JOIN ctt_projects_type AS pt ON pt.pjttp_id = pj.pjttp_id
INNER JOIN ctt_location AS lc ON lc.loc_id = pj.loc_id
INNER JOIN ctt_products AS pd ON pd.prd_id = bg.prd_id
INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id 
INNER JOIN ctt_category_subcategories AS cs ON cs.sbc_id = sb.sbc_id 
INNER JOIN ctt_category_report AS cr ON cr.crp_id = cs.crp_id 
LEFT  JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
LEFT  JOIN ctt_customers AS cu ON cu.cus_id = co.cus_id
WHERE bg.ver_id = $verId  ORDER BY sbc_order_print, bdg_section;";
$res = $conn->query($qry);
//$conn->close();

while($row = $res->fetch_assoc()){
    $items[] = $row;
}
// OBTENER LAS CLASIFICACIONES DE LOS PRODUCTOS 
$query="SELECT cr.crp_id, cr.crp_name, sb.sbc_name, sb.sbc_order_print 
FROM ctt_subcategories AS sb 
INNER JOIN ctt_category_subcategories AS cs ON cs.sbc_id = sb.sbc_id 
INNER JOIN ctt_category_report AS cr ON cr.crp_id = cs.crp_id 
INNER JOIN ctt_products AS pd ON pd.sbc_id = sb.sbc_id 
INNER JOIN ctt_budget AS bg ON bg.prd_id = pd.prd_id 
WHERE bg.ver_id = $verId GROUP BY cr.crp_id ORDER BY sbc_order_print, bdg_section";
$res2 = $conn->query($query);
$categories=array();
$rr = 0;

while ($row2 = $res2->fetch_assoc()) {
    $categories[$rr]["crp_id"] = $row2["crp_id"];
    $categories[$rr]["crp_name"] = $row2["crp_name"];
    $rr++;
}
$conn->close();
date_default_timezone_set('America/Mexico_City');
$hoy=new DateTime();
// Cabezal de la página
$header = '
    <header>
        <div class="cornisa">
            <table class="table-main" border="0">
                <tr>
                    <td class="box-logo side-color">
                        <img class="img-logo" src="../../../app/assets/img/Logoctt_h.png"  style="max-width:48mm; height:auto; margin: 3mm 2.5mm 0 2.5mm;"/>
                    </td>
					<td class="name-report bline" style="witdh:77mm;  font-size: 13pt; text-align: right; padding-right: 30px; padding-top: 25px">
                    <p>
                        <span class="number">Proyecto: '. $items[0]['pjt_name'] . '   #' . $items[0]['pjt_number'] .'</span>
                        <br><span class="date">'.'</span>
                    </p>
                    </td>
                </tr>
            </table>
        </div>
    </header>';

    $costBase = 0;
    $subtotalAmount = 0;

    for ($i = 0; $i<count($items); $i++){
        $amountBase = $items[$i]['bdg_prod_price'] * $items[$i]['bdg_quantity']  * $items[$i]['bdg_days_cost'];    // ---------------------------------------  Importe del producto = (cantidad x precio) dias de cobro 
        $amountTrip = $items[$i]['bdg_prod_price'] * $items[$i]['bdg_quantity']  * $items[$i]['bdg_days_trip'];    // ---------------------------------------  Importe del producto = (cantidad x precio) dias de viaje
        $amountTest = $items[$i]['bdg_prod_price'] * $items[$i]['bdg_quantity']  * $items[$i]['bdg_days_test'];    // ---------------------------------------  Importe del producto = (cantidad x precio) dias de prueba

        $totalBase =  $amountBase - ($amountBase * $items[$i]['bdg_discount_base']);
        $totalTrip =  $amountTrip - ($amountTrip * $items[$i]['bdg_discount_trip']);
        $totalTest =  $amountTest - ($amountTest * $items[$i]['bdg_discount_test']);

        $totalInsrGral = $items[$i]['ver_discount_insured'];
        $subtotalAmount += $totalBase + $totalTrip + $totalTest;

        if ($items[$i]['bdg_section'] == '1') $equipoBase = '1';
        if ($items[$i]['bdg_section'] == '2') $equipoExtra = '1';
        if ($items[$i]['bdg_section'] == '3') $equipoDias = '1';
        if ($items[$i]['bdg_section'] == '4') $equipoSubarrendo = '1';

    }
                
$html = '
    <section>
        <div class="container">
            

            <table class="table-data bline-d tline">
                <tr>
                    <td class="rline half">
                        <!-- Start datos del cliente -->
                        <table class="table-data">
                            <tr>
                                <td class="concept">Cliente:</td>
                                <td class="data">'. $items[0]['cus_name']  .'</td>
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
                            <tr>
                                <td class="concept">Quien Solicita:</td>
                                <td class="data">'. $items[0]['pjt_how_required'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Analista CTT:</td>
                                <td class="data">'. $uname .'</td>
                            </tr>
                        </table>
                        <!-- End datos del cliente -->
                    </td>
                    <td class="half">
                        <!-- Start Datos del projecto -->
                        <table class="table-data">
                        <!--<tr>
                                <td class="concept">Num. proyecto:</td>
                                <td class="data"><strong>'. $items[0]['pjt_number'] .'</strong></td>
                            </tr> 
                            <tr>
                                <td class="concept">Version:</td>
                                <td class="data">'. $items[0]['ver_code'] .'</td>
                            </tr> -->
                            <tr>
                                <td class="concept">Fecha Cotización:</td>
                                <td class="data">'. $hoy->format('d/m/Y') .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Ciudad:</td>
                                <td class="data">'. $items[0]['pjt_location'] .'</td>
                            </tr>
                            <!-- <tr>
                                <td class="concept">Tipo de Locación:</td>
                                <td class="data">'. $items[0]['loc_type_location'] .'</td>
                            </tr> -->
                            <tr>
                                <td class="concept">Tipo de proyecto:</td>
                                <td class="data">'. $items[0]['pjttp_name'] .'</td>
                            </tr>
                            <tr>
                                <td class="concept">Fechas de Proyecto:</td>
                                <td class="data">'. $items[0]['period'] .'</td>
                            </tr>';
                            if ($items[0]['pjt_trip_go']) {
                                $html .='
                                    <tr>
                                        <td class="concept">Dias de Viaje:</td>
                                        <td class="data">'. $items[0]['pjt_trip_go'] .'</td>
                                    </tr>';
                            }
                            if ($items[0]['pjt_test_tecnic']) {
                                $html .='
                                <tr>
                                    <td class="concept">Dias de Pruebas:</td>
                                    <td class="data">'. $items[0]['pjt_test_tecnic'] .'</td>
                                </tr>';
                            }
                            
                            $html .='
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
        $sumaEquipo = 0;
        $totalEquipo =0;
        $html .= '
        
        
                    <!-- Start Tabla de equipo base  -->
                    <h2>Equipo Base</h2>';
        foreach ( $categories as $category) {
            $aux=0;
            $sub =0;
            for ($i = 0; $i<count($items); $i++){
                $section = $items[$i]['bdg_section'];
                if ($section == '1' && $items[$i]['crp_id'] == $category["crp_id"]) {
                    $aux=$aux+1;
                    $sub = $i;
                }
            }
        if ($aux>0) {
        $html .= '
                    
                    <h3 class="" style="color:#008000">'.$category['crp_name'].'</h3>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure prod">Equipo</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto %</th>
                                <th class="tit-figure amou">Precio por día</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Total</th>
                            </tr>
                        </thead>
                        <tbody>';

                        $discountBaseTotal  = 0;
                        $amountBaseTotal    = 0;
                        $discountTripTotal   = 0;
                        $amountTripTotal    = 0;
                        $amountGralTotal    = 0;

                        for ($i = 0; $i<count($items); $i++){
                            if ($items[$i]['crp_id'] ==$category["crp_id"]) {
                            $section        = $items[$i]['bdg_section'] ;

                            if ($section == '1') {
                                $product        = $items[$i]['bdg_prod_name'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['bdg_prod_price'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['bdg_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['bdg_days_cost'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['bdg_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                $subtotalBase   = $price * $quantity * $daysBase;   //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                $discountAmount = $subtotalBase * $discountBase;    //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                $amountBase     = $subtotalBase - $discountAmount;  //  ----------------------- Costo base = importe base - importe de desucuento base
                                $valdiscount    = $discountBase * 100;

                                $daysTrip       = $items[$i]['bdg_days_trip'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['bdg_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                $amountTrip     = $price * $quantity * $daysTrip;   //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                $discAmountTrip = $amountTrip * $discountTrip;  //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                $amountGral     = $amountBase + $amountTrip - $discAmountTrip;  //  ----------- Costo viaje = importe de viaje - importe de descuento viaje

                                $discountBaseTotal  += $discountAmount;     //  ------------------------------- Descuento total base
                                $amountBaseTotal    += $subtotalBase;         //  ------------------------------- Importe total base
                                $discountTripTotal  += $discAmountTrip;     //  ------------------------------- Importe de descuento viaje
                                $amountTripTotal    += $amountTrip;         //  ------------------------------- Importe por viaje
                                $amountGralTotal    += $amountGral;         //  ------------------------------- Importe total
                                $totalMain          += $amountGral;         //  ------------------------------- Total general

                                $Insured            = $items[$i]['bdg_insured'];        //  ------------------  Porcentaje de seguro
                                $discoInsured       = $items[$i]['bdg_discount_insured'];   //  --------------  Porcentaje de descuento sobre seguro
                                $amountinsured      = $subtotalBase * $Insured;      //  ---------------------  Importe de seguro = (precio * cantidad) porcentaje de seguro
                                
                                $amountDescInsured  = $amountinsured * $discoInsured;   //  ------------------  Importe de descuento sobre seguro = importe de seguro * porcentaje de descuento sobre seguro
                                $totalInsured       = $amountinsured - $amountDescInsured ; //  --------------  Importe total del seguro sobre el producto = importe de seguro - importe de descuento sobre seguro
                                $totalInsr         += $totalInsured;
                                $totalEquipo += $amountGral;

        $html .= '
                            <tr>
                                <td class="dat-figure prod">' . $product                                    . '</td>
                                <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                <td class="dat-figure days">' . $daysBase                                   . '</td>
                                <td class="dat-figure disc">' .$valdiscount . '%</td>
                                <td class="dat-figure amou">' . number_format($subtotalBase , 2,'.',',')      . '</td>
                                <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                            </tr>
                            ';
                            }
                            }

                        }
                    
        $html .= '
                        <tr>
                            <td class="tot-figure totl" colspan="4">Subtotal Base</td>
                            <td class="tot-figure amou">' . $valdiscount . '%</td>
                            <td class="tot-figure amou">' . number_format($amountBaseTotal, 2,'.',',') . '</td>
                            <td class="tot-figure days"></td>
                            <td class="tot-figure amou">' . number_format($discountTripTotal, 2,'.',',') . '</td>
                            <td class="tot-figure amou">' . number_format($amountTripTotal, 2,'.',',') . '</td>
                            <td class="tot-figure amou">' . number_format($amountGralTotal, 2,'.',',') . '</td>
                        </tr>
                    </tbody>
                </table>
                <!-- End Tabla de costo base  -->';

                    }
        }
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
             
    // Total
    $html .= '
                        <tr>
                            <td class="tot-main totl" colspan="9">Total Equipo Base</td>
                            <td class="tot-main amou">' . number_format($totalEquipo , 2,'.',',')       . '</td>
                        </tr>
                        ';
                        
    
                    
    $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo equipo subarrendo  -->';
    }
/* Tabla de equipo base -------------------------  */


/* Tabla de equipo extra -------------------------  */
    if ($equipoExtra == '1'){
        
        $sumaEquipo = 0;
        $totalEquipo =0;
        $html .= '
        
                    <!-- Start Tabla de equipo extra  -->
                    <h2>Equipo Extra</h2>';
                    foreach ( $categories as $category) {
                        $aux=0;
                        $sub =0;
                        for ($i = 0; $i<count($items); $i++){
                            $section = $items[$i]['bdg_section'];
                            if ($section == '2' && $items[$i]['crp_id'] == $category["crp_id"]) {
                                $aux=$aux+1;
                                $sub = $i;
                            }
                        }
                    if ($aux>0) {
            $html .= '
            
                        <h3 class="" style="color:#008000">'.$category['crp_name'].'</h3>
                        <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                            <thead>
                            <tr>
                                <th class="tit-figure prod">Equipo</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto %</th>
                                <th class="tit-figure amou">Precio por día</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Total</th>
                            </tr>
                            </thead>
                            <tbody>';
            
                            $discountBaseTotal  = 0;
                            $amountBaseTotal    = 0;
                            $discountTripTota   = 0;
                            $amountTripTotal    = 0;
                            $amountGralTotal    = 0;
            
                            for ($i = 0; $i<count($items); $i++){
                                if ($items[$i]['crp_id'] ==$category["crp_id"]) {
                                $section        = $items[$i]['bdg_section'] ;
            
                                if ($section == '2') {
                                    $product        = $items[$i]['bdg_prod_name'] ; //  --------------------------- Nombre del producto
                                    $price          = $items[$i]['bdg_prod_price'] ;    //  ----------------------- Precio del producto
                                    $quantity       = $items[$i]['bdg_quantity'] ;  //  --------------------------- Cantidad solicitada
                                    $daysBase       = $items[$i]['bdg_days_cost'] ; //  --------------------------- Dias de costo 
                                    $discountBase   = $items[$i]['bdg_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                    $subtotalBase   = $price * $quantity * $daysBase;   //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                    $discountAmount = $subtotalBase * $discountBase;    //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                    $amountBase     = $subtotalBase - $discountAmount;  //  ----------------------- Costo base = importe base - importe de desucuento base
                                    $valdiscount    = $discountBase * 100; 
                                    $daysTrip       = $items[$i]['bdg_days_trip'];  //  --------------------------- Dias de viaje
                                    $discountTrip   = $items[$i]['bdg_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                    $amountTrip     = $price * $quantity * $daysTrip;   //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                    $discAmountTrip = $amountTrip * $discountTrip;  //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                    $amountGral     = $amountBase + $amountTrip - $discAmountTrip;  //  ----------- Costo viaje = importe de viaje - importe de descuento viaje
    
                                    $discountBaseTotal  += $discountAmount;     //  ------------------------------- Descuento total base
                                    $amountBaseTotal    += $subtotalBase;         //  ------------------------------- Importe total base
                                    $discountTripTotal  += $discAmountTrip;     //  ------------------------------- Importe de descuento viaje
                                    $amountTripTotal    += $amountTrip;         //  ------------------------------- Importe por viaje
                                    $amountGralTotal    += $amountGral;         //  ------------------------------- Importe total
                                    $totalMain          += $amountGral;
    
                                    $Insured            = $items[$i]['bdg_insured'];        //  ------------------  Porcentaje de seguro
                                    $discoInsured       = $items[$i]['bdg_discount_insured'];   //  --------------  Porcentaje de descuento sobre seguro
                                    $amountinsured      = $subtotalBase * $Insured;      //  ---------------------  Importe de seguro = (precio * cantidad) porcentaje de seguro
                                    
                                    $amountDescInsured  = $amountinsured * $discoInsured;   //  ------------------  Importe de descuento sobre seguro = importe de seguro * porcentaje de descuento sobre seguro
                                    $totalInsured       = $amountinsured - $amountDescInsured ; //  --------------  Importe total del seguro sobre el producto = importe de seguro - importe de descuento sobre seguro
                                    $totalInsr         += $totalInsured;
                                    $totalEquipo += $amountGral;
            
            
            $html .= '
                                <tr>
                                    <td class="dat-figure prod">' . $product                                    . '</td>
                                    <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                    <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                    <td class="dat-figure days">' . $daysBase                                   . '</td>
                                    <td class="dat-figure amou">' . number_format($subtotalBase , 2,'.',',')      . '</td>
                                    <td class="dat-figure disc">' .$valdiscount . '%</td>
                                    <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                    <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                    <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                    <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                                </tr>
                                ';
                                }
                                }
            
                            }
        
        $html .= '
                            <tr>
                                <td class="tot-figure totl" colspan="4">Subtotal Extra</td>
                                <td class="tot-figure amou">' . $valdiscount . '%</td>
                                <td class="tot-figure amou">' . number_format($amountBaseTotal, 2,'.',',') . '</td>
                                <td class="tot-figure days"></td>
                                <td class="tot-figure amou">' . number_format($discountTripTotal, 2,'.',',') . '</td>
                                <td class="tot-figure amou">' . number_format($amountTripTotal, 2,'.',',') . '</td>
                                <td class="tot-figure amou">' . number_format($amountGralTotal, 2,'.',',') . '</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- End Tabla de costo equipo extra  -->';
            }
        }
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
             
    // Total
    $html .= '
                        <tr>
                            <td class="tot-main totl" colspan="9">Total Equipo Extra</td>
                            <td class="tot-main amou">' . number_format($totalEquipo , 2,'.',',')       . '</td>
                        </tr>
                        ';
                        
    
                    
    $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo equipo subarrendo  -->';
        
    }
/* Tabla de equipo extra -------------------------  */


/* Tabla de equipo dias -------------------------  */
    if ($equipoDias == '1'){
        
        $sumaEquipo = 0;
        $totalEquipo =0;
        $html .= '
        
                <!-- Start Tabla de equipo dias  -->
                <h2>Equipo Días</h2>';
                foreach ( $categories as $category) {
                    $aux=0;
                    $sub =0;
                    for ($i = 0; $i<count($items); $i++){
                        $section = $items[$i]['bdg_section'];
                        if ($section == '3' && $items[$i]['crp_id'] == $category["crp_id"]) {
                            $aux=$aux+1;
                            $sub = $i;
                        }
                    }
                if ($aux>0) {
        $html .= '

                    <h3 class="" style="color:#008000">'.$category['crp_name'].'</h3>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>    
                                <th class="tit-figure prod">Equipo</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto %</th>
                                <th class="tit-figure amou">Precio por día</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Total</th>
                            </tr>
                        </thead>
                        <tbody>';
        
                        $discountBaseTotal  = 0;
                        $amountBaseTotal    = 0;
                        $discountTripTota   = 0;
                        $amountTripTotal    = 0;
                        $amountGralTotal    = 0;
        
                        for ($i = 0; $i<count($items); $i++){
                            if ($items[$i]['crp_id'] ==$category["crp_id"]) {
                            $section        = $items[$i]['bdg_section'] ;
        
                            if ($section == '3') {
                                $product        = $items[$i]['bdg_prod_name'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['bdg_prod_price'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['bdg_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['bdg_days_cost'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['bdg_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                $subtotalBase   = $price * $quantity * $daysBase;   //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                $discountAmount = $subtotalBase * $discountBase;    //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                $amountBase     = $subtotalBase - $discountAmount;  //  ----------------------- Costo base = importe base - importe de desucuento base
                                $valdiscount    = $discountBase * 100;
                                $daysTrip       = $items[$i]['bdg_days_trip'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['bdg_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                $amountTrip     = $price * $quantity * $daysTrip;   //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                $discAmountTrip = $amountTrip * $discountTrip;  //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                $amountGral     = $amountBase + $amountTrip - $discAmountTrip;  //  ----------- Costo viaje = importe de viaje - importe de descuento viaje

                                $discountBaseTotal  += $discountAmount;     //  ------------------------------- Descuento total base
                                $amountBaseTotal    += $subtotalBase;         //  ------------------------------- Importe total base
                                $discountTripTotal  += $discAmountTrip;     //  ------------------------------- Importe de descuento viaje
                                $amountTripTotal    += $amountTrip;         //  ------------------------------- Importe por viaje
                                $amountGralTotal    += $amountGral;         //  ------------------------------- Importe total
                                $totalMain          += $amountGral;

                                $Insured            = $items[$i]['bdg_insured'];        //  ------------------  Porcentaje de seguro
                                $discoInsured       = $items[$i]['bdg_discount_insured'];   //  --------------  Porcentaje de descuento sobre seguro
                                $amountinsured      = $subtotalBase * $Insured;      //  ---------------------  Importe de seguro = (precio * cantidad) porcentaje de seguro
                                
                                $amountDescInsured  = $amountinsured * $discoInsured;   //  ------------------  Importe de descuento sobre seguro = importe de seguro * porcentaje de descuento sobre seguro
                                $totalInsured       = $amountinsured - $amountDescInsured ; //  --------------  Importe total del seguro sobre el producto = importe de seguro - importe de descuento sobre seguro
                                $totalInsr         += $totalInsured;
                                $totalEquipo += $amountGral;
        
        
        $html .= '
                            <tr>
                                <td class="dat-figure prod">' . $product                                    . '</td>
                                <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                <td class="dat-figure days">' . $daysBase                                   . '</td>
                                <td class="dat-figure amou">' . number_format($subtotalBase , 2,'.',',')      . '</td>
                                <td class="dat-figure disc">' .$valdiscount . '%</td>
                                <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                            </tr>
                            ';
                            }
        
                        }
                }
        $html .= '
                            <tr>
                                <td class="tot-figure totl" colspan="4">Subtotal Dias</td>
                                <td class="tot-figure amou">' . $valdiscount . '%</td>
                                <td class="tot-figure amou">' . number_format($amountBaseTotal, 2,'.',',') . '</td>
                                <td class="tot-figure days"></td>
                                <td class="tot-figure amou">' . number_format($discountTripTotal, 2,'.',',') . '</td>
                                <td class="tot-figure amou">' . number_format($amountTripTotal, 2,'.',',') . '</td>
                                <td class="tot-figure amou">' . number_format($amountGralTotal, 2,'.',',') . '</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- End Tabla de costo equipo extra  -->';
            }
        }
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
             
    // Total
    $html .= '
                        <tr>
                            <td class="tot-main totl" colspan="9">Total Equipo Días</td>
                            <td class="tot-main amou">' . number_format($totalEquipo , 2,'.',',')       . '</td>
                        </tr>
                        ';
                        
    
                    
    $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo equipo subarrendo  -->';
        
    }
/* Tabla de equipo dias -------------------------  */


/* Tabla de equipo subarrendo -------------------------  */
    if ($equipoSubarrendo == '1'){
        
        $sumaEquipo = 0;
        $totalEquipo =0;
        $html .= '
        
        <!-- Start Tabla de equipo subarrendo  -->
        <h2>Equipo Subarrendo</h2>';
        foreach ( $categories as $category) {
            $aux=0;
            $sub =0;
            for ($i = 0; $i<count($items); $i++){
                $section = $items[$i]['bdg_section'];
                if ($section == '4' && $items[$i]['crp_id'] == $category["crp_id"]) {
                    $aux=$aux+1;
                    $sub = $i;
                }
            }
        if ($aux>0) {
    $html .= '

                <h3 class="" style="color:#008000">'.$category['crp_name'].'</h3>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure prod">Equipo</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto %</th>
                                <th class="tit-figure amou">Precio por día</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Total</th>
                            </tr>
                        </thead>
                        <tbody>';
        
                        $discountBaseTotal  = 0;
                        $amountBaseTotal    = 0;
                        $discountTripTota   = 0;
                        $amountTripTotal    = 0;
                        $amountGralTotal    = 0;
        
                        for ($i = 0; $i<count($items); $i++){
                            if ($items[$i]['crp_id'] ==$category["crp_id"]) {
                            $section        = $items[$i]['bdg_section'] ;
        
                            if ($section == '4') {
                                $product        = $items[$i]['bdg_prod_name'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['bdg_prod_price'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['bdg_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['bdg_days_cost'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['bdg_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                $subtotalBase   = $price * $quantity * $daysBase;   //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                $discountAmount = $subtotalBase * $discountBase;    //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                $amountBase     = $subtotalBase - $discountAmount;  //  ----------------------- Costo base = importe base - importe de desucuento base
                                $valdiscount    = $discountBase * 100;
                                $daysTrip       = $items[$i]['bdg_days_trip'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['bdg_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                $amountTrip     = $price * $quantity * $daysTrip;   //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                $discAmountTrip = $amountTrip * $discountTrip;  //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                $amountGral     = $amountBase + $amountTrip - $discAmountTrip;  //  ----------- Costo viaje = importe de viaje - importe de descuento viaje

                                $discountBaseTotal  += $discountAmount;     //  ------------------------------- Descuento total base
                                $amountBaseTotal    += $subtotalBase;         //  ------------------------------- Importe total base
                                $discountTripTotal  += $discAmountTrip;     //  ------------------------------- Importe de descuento viaje
                                $amountTripTotal    += $amountTrip;         //  ------------------------------- Importe por viaje
                                $amountGralTotal    += $amountGral;         //  ------------------------------- Importe total
                                $totalMain          += $amountGral;

                                $Insured            = $items[$i]['bdg_insured'];        //  ------------------  Porcentaje de seguro
                                $discoInsured       = $items[$i]['bdg_discount_insured'];   //  --------------  Porcentaje de descuento sobre seguro
                                $amountinsured      = $subtotalBase * $Insured;      //  ---------------------  Importe de seguro = (precio * cantidad) porcentaje de seguro
                                
                                $amountDescInsured  = $amountinsured * $discoInsured;   //  ------------------  Importe de descuento sobre seguro = importe de seguro * porcentaje de descuento sobre seguro
                                $totalInsured       = $amountinsured - $amountDescInsured ; //  --------------  Importe total del seguro sobre el producto = importe de seguro - importe de descuento sobre seguro
                                $totalInsr         += $totalInsured;
                                $totalEquipo += $amountGral;
        
        
        $html .= '
                            <tr>
                                <td class="dat-figure prod">' . $product                                    . '</td>
                                <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                <td class="dat-figure days">' . $daysBase                                   . '</td>
                                <td class="dat-figure amou">' . number_format($subtotalBase , 2,'.',',')      . '</td>
                                <td class="dat-figure disc">' .$valdiscount . '%</td>
                                <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                            </tr>
                            ';
                            }
                        }
                    }
        
                        
        $html .= '
                            <tr>
                                <td class="tot-figure totl" colspan="4">Subtotal Subarrendo</td>
                                <td class="tot-figure amou">' . $valdiscount . '%</td>
                                <td class="tot-figure amou">' . number_format($amountBaseTotal, 2,'.',',') . '</td>
                                <td class="tot-figure days"></td>
                                <td class="tot-figure amou">' . number_format($discountTripTotal, 2,'.',',') . '</td>
                                <td class="tot-figure amou">' . number_format($amountTripTotal, 2,'.',',') . '</td>
                                <td class="tot-figure amou">' . number_format($amountGralTotal, 2,'.',',') . '</td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- End Tabla de costo equipo subarrendo  -->';
    }
}
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
     
// Total
$html .= '
                <tr>
                    <td class="tot-main totl" colspan="9">Total Equipo Subarrendos</td>
                    <td class="tot-main amou">' . number_format($totalEquipo , 2,'.',',')       . '</td>
                </tr>
                ';
                

            
$html .= '
            </tbody>
        </table>
        <!-- End Tabla de costo equipo subarrendo  -->';
        
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
    
                    $totalInsr = $totalInsr - ($totalInsr * $totalInsrGral);
                    $iva  = .16;

                    $subtotalAmount = $subtotalAmount + $totalInsr;
                    $amountiva    = $subtotalAmount * $iva;
                    $totalFull   = $subtotalAmount + $amountiva;
    // Seguro
    $html .= '
                        <tr>
                            <td class="tot-main totl" colspan ="9">Seguro</td>
                            <td class="tot-main amou">' . number_format($totalInsr , 2,'.',',')       . '</td>
                        </tr>
                        ';
    // Subtotal
    $html .= '
                        <tr>
                            <td class="tot-main totl" colspan ="9">Subtotal</td>
                            <td class="tot-main amou">' . number_format($subtotalAmount , 2,'.',',')       . '</td>
                        </tr>
                        ';        
    // IVA
    $html .= '
                        <tr>
                            <td class="tot-main totl" colspan="9">I.V.A. 16%</td>
                            <td class="tot-main amou">' . number_format($amountiva , 2,'.',',')       . '</td>
                        </tr>
                        ';
                        
    // Total
    $html .= '
                        <tr>
                            <td class="tot-main totl" colspan="9">Total</td>
                            <td class="tot-main amou">' . number_format($totalFull , 2,'.',',')       . '</td>
                        </tr>
                        ';
                        
    
                    
    $html .= '
                    </tbody>
                </table>
                <!-- End Tabla de costo equipo subarrendo  -->';
    

/* Tabla totales -------------------------  */

/* Tabla terminos y condiciones --------------------  */
$html .= '
<!-- Start Tabla de terminos  -->
<div style="height:40px;"></div>
<section>
<div class="container name-report bline-d" style="background-color: #e2e8f8">
    <table autosize="1"  >
        <thead>
            <tr border="1">
                <th class="tit-figure amou">TERMINOS IMPORTANTES:</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="prod" style="font-size: 0.9em;">La disponibilidad del equipo y personal en las fechas aqui indicadas, solo será garantizada con el pago del monto cotizado previamente a la realización del servicio</td>
            </tr>
            <tr>
                <td class="prod" style="font-size: 0.9em;">El 100% del monto cotizado debera de ser cubierto previamente a la salida del equipo y personal cotizado</td>
            </tr>
        </tbody>
    </table>
</div>
</section>
<!-- End Tabla de costo equipo subarrendo  -->';

$html .= '
<!-- Start Tabla de importantes para el cliente  -->
<div style="height:5px;"></div>
<section>
<div class="container name-report bline-d" style="background-color: #e2e8f8">
    <table autosize="1"  >
        <thead>
            <tr border="1">
                <th class="amou" style="text-align: left;">INFORMACION PARA EL CLIENTE:</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                <ul style="font-size: 0.8em;">
                    <li>Toda cotización, considera las condiciones estipuladas en la solicitud de servicio, en caso de que éstas varíen, los costos finales deberán asentarse una vez finalizado el proyecto</li>
                    <li>Ninguna cotización, tiene valor fiscal, ni legal, ni implica obligación alguna para la empresa SIMPLEMENTE SERVICIOS S.A. DE C.V. y/o su personal</li>
                    <li> Los montos referidos en esta cotización tienen una vigencia de 30 dias a partir de la fecha del envio de la misma al cliente. Posteriormente a este periodo de tiempo los montos pueden variar</li>
                    <li>Las cancelaciones deberán hacerse al menos 48 horas antes de la entrega del equipo. De lo contrario, se cobrará el 30% del monto total del equipo solicitado.</li>
                    <li>La alimentacion del personal técnico cotizado durante el horario de trabajo contratado corre por cuenta del cliente</li>
                    <li>El horario de trabajo para el personal técnico es por 10 horas diarias. Despues de 10 horas de trabajo se cobraran como horas extra, con un valor del 10% del total cotizado por cada hora adicional a 10</li>
                    <li>La compañía contratante es responsable por pagarle a Simplemente el 100% del valor de los equipos cotizados si son dañados por personal ajeno al aqui cotizado. No mas de 30 dias despues de terminar el servicio</li>
                    <li>Para el área metropolitana, la jornada inicia a la hora del llamado y finaliza al momento en que el personal termina de cargar todo el equipo en el vehículo correspondiente</li>
                    <li>En el caso de que el cliente proporcione el transporte para el personal técnico y el equipo rentado, la jornada de trabajo del personal concluirá hasta el regreso de estos a las instalaciones de Simplemente</li>
                    <li> La cobertura de seguro por daños y perjuicios correspondientes al equipo y el personal técnico es responsabilidad de la compañía contratante dentro del tiempo de llamado y durante los traslados</li>
                    <li>Las jornadas de viaje no podrán ser mayores a 8 horas por chofer y no se podrá transitar en horario nocturno (22:00 a 6:00 horas). El día de viaje contará como media jornada normal de trabajo</li>
                    <li>Los viáticos correspondientes a los viajes serán cubiertos por la compañía contratante (casetas, gasolina, comidas, hospedaje, exceso de equipaje en avión, transportación, etc.)</li>
                    <li>Cualquier renta de equipo deberá ser devuelta a las oficinas de SIMPLEMENTE a más tardar a las 11:00AM del día posterior a su salida. De lo contrario se cobrará un día adicional de renta del equipo</li>
                </ul>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</section>
<!-- End Tabla de costo equipo subarrendo  -->';

/* Tabla Terminos y condiciones -------------------------  */
/* Tabla firmas -------------------------  */
$html .= '
<!-- Start Tabla de terminos  -->
<div style="height:3px;"></div>
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
                <td class="prod" > Nombre Persona que acepta los Terminos </td>
                <td class="prod" >Firma </td>
                <td class="prod" >Razon Social de la empresa</td>
            </tr>
            
        </tbody>
    </table>
</div>
</section>
<!-- End Tabla de costo equipo subarrendo  -->';
/* Tabla firmas -------------------------  */

//<td class="td-foot foot-rept" width="25%" style="text-align: right">Elaboró: '. $uname . '</td>
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
    'margin_bottom' => 38,
    'margin_header' => 5,
    'margin_footer' => 4, 
    'orientation' => 'P'
    ]);

$mpdf->shrink_tables_to_fit = 1;
$mpdf->SetHTMLHeader($header);
$mpdf->SetHTMLFooter($foot);
$mpdf->WriteHTML($css,\Mpdf\HTMLParserMode::HEADER_CSS);
$mpdf->WriteHTML($html,\Mpdf\HTMLParserMode::HTML_BODY);
$mpdf->Output(
    "Cotizacion.pdf",
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
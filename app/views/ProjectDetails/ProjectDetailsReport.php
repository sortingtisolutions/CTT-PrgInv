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
$qry = "SELECT * , ucase(date_format(vr.ver_date, '%d-%b-%Y %H:%i')) AS ver_date_real,
            CONCAT_WS(' - ' , date_format(pj.pjt_date_start, '%d-%b-%Y'), date_format(pj.pjt_date_end, '%d-%b-%Y')) AS period
            , vr.ver_discount_insured
        FROM ctt_projects_version AS bg
        INNER JOIN ctt_version AS vr ON vr.ver_id = bg.ver_id
        INNER JOIN ctt_projects AS pj ON pj.pjt_id = vr.pjt_id
        INNER JOIN ctt_projects_type AS pt ON pt.pjttp_id = pj.pjttp_id
        INNER JOIN ctt_location AS lc ON lc.loc_id = pj.loc_id
        INNER JOIN ctt_products AS pd ON pd.prd_id = bg.prd_id
        LEFT JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
        LEFT JOIN ctt_customers AS cu ON cu.cus_id = co.cus_id
        WHERE bg.ver_id = $verId order by  bg.pjtvr_section, bg.pjtvr_order;";

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
    $subtotalAmount = 0;
    
    for ($i = 0; $i<count($items); $i++){
        $amountBase = $items[$i]['pjtvr_prod_price'] * $items[$i]['pjtvr_quantity'] * $items[$i]['pjtvr_days_base'];    // ---------------------------------------  Importe del producto = (cantidad x precio) dias de cobro 
        $amountTrip = $items[$i]['pjtvr_prod_price'] * $items[$i]['pjtvr_quantity'] * $items[$i]['pjtvr_days_trip'];    // ---------------------------------------  Importe del producto = (cantidad x precio) dias de viaje
        $amountTest = $items[$i]['pjtvr_prod_price'] * $items[$i]['pjtvr_quantity'] * $items[$i]['pjtvr_days_test'];    // ---------------------------------------  Importe del producto = (cantidad x precio) dias de prueba
        
        $totalBase = $amountBase - ($amountBase * $items[$i]['pjtvr_discount_base']);
        $totalTrip = $amountTrip - ($amountTrip * $items[$i]['pjtvr_discount_trip']);
        $totalTest = $amountTest - ($amountTest * $items[$i]['pjtvr_discount_test']);

        $totalInsrGral = $items[$i]['ver_discount_insured'];
        $subtotalAmount += $totalBase + $totalTrip + $totalTest;

        if ($items[$i]['pjtvr_section'] == '1') $equipoBase = '1';
        if ($items[$i]['pjtvr_section'] == '2') $equipoExtra = '1';
        if ($items[$i]['pjtvr_section'] == '3') $equipoDias = '1';
        if ($items[$i]['pjtvr_section'] == '4') $equipoSubarrendo = '1';

    }
                
$html = '
    <section>
        <div class="container">
            <div class="name-report">
                <p>
                    <span class="number">Proyecto '. $items[0]['ver_code'] .'</span>
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
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto.</th>
                                <th class="tit-figure amou">Importe</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Importe<br>Total</th>
                            </tr>
                        </thead>
                        <tbody>';

                        $discountBaseTotal  = 0;
                        $amountBaseTotal    = 0;
                        $discountTripTota   = 0;
                        $amountTripTotal    = 0;
                        $amountGralTotal    = 0;

                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtvr_section'] ;

                            if ($section == '1') {
                                $product        = $items[$i]['pjtvr_prod_name'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['pjtvr_prod_price'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['pjtvr_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['pjtvr_days_cost'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['pjtvr_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                $subtotalBase   = $price * $quantity * $daysBase;     //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                $discountAmount = $subtotalBase * $discountBase;      //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                $amountBase     = $subtotalBase - $discountAmount;    //  ----------------------- Costo base = importe base - importe de desucuento base

                                $daysTrip       = $items[$i]['pjtvr_days_trip'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['pjtvr_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                $amountTrip     = $price * $quantity * $daysTrip;     //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                $discAmountTrip = $amountTrip * $discountTrip;    //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                $amountGral     = $amountBase + $amountTrip - $discAmountTrip;    //  ----------- Costo viaje = importe de viaje - importe de descuento viaje

                                $discountBaseTotal  += $discountAmount;         //  ----------------------------- Descuento total base
                                $amountBaseTotal    += $amountBase;             //  ----------------------------- Importe total base
                                $discountTripTotal  += $discAmountTrip;         //  ----------------------------- Importe de descuento viaje
                                $amountTripTotal    += $amountTrip;             //  ----------------------------- Importe por viaje
                                $amountGralTotal    += $amountGral;             //  ----------------------------- Importe total
                                $totalMain          += $amountGral;             //  ----------------------------- Total general

                                $Insured            = $items[$i]['pjtvr_insured'];        //  ------------------  Porcentaje de seguro
                                $discoInsured       = $items[$i]['pjtvr_discount_insured'];   //  --------------  Porcentaje de descuento sobre seguro
                                $amountinsured      = $subtotalBase * $Insured;      //  -----------------------  Importe de seguro = (precio * cantidad) porcentaje de seguro
                                
                                $amountDescInsured  = $amountinsured * $discoInsured;   //  --------------------  Importe de descuento sobre seguro = importe de seguro * porcentaje de descuento sobre seguro
                                $totalInsured       = $amountinsured - $amountDescInsured ; //  ----------------  Importe total del seguro sobre el producto = importe de seguro - importe de descuento sobre seguro
                                $totalInsr         += $totalInsured;

        $html .= '
                            <tr>
                                <td class="dat-figure prod">' . $product                                    . '</td>
                                <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                <td class="dat-figure days">' . $daysBase                                   . '</td>
                                <td class="dat-figure disc">' . number_format($discountAmount , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountBase , 2,'.',',')      . '</td>
                                <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                            </tr>
                            ';
                            }

                        }
        $html .= '
                        <tr>
                            <td class="tot-figure totl" colspan="4">Total Equipo Base</td>
                            <td class="tot-figure amou">' . number_format($discountBaseTotal, 2,'.',',') . '</td>
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
/* Tabla de equipo base -------------------------  */


/* Tabla de equipo extra -------------------------  */
    if ($equipoExtra == '1'){
        $html .= '
        
        
                    <!-- Start Tabla de equipo extra  -->
                    <h2>Equipo Extra</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto.</th>
                                <th class="tit-figure amou">Importe</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Importe<br>Total</th>
                            </tr>
                        </thead>
                        <tbody>';
        
                        $discountBaseTotal  = 0;
                        $amountBaseTotal    = 0;
                        $discountTripTota   = 0;
                        $amountTripTotal    = 0;
                        $amountGralTotal    = 0;
        
                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtvr_section'] ;
        
                            if ($section == '2') {
                                $product        = $items[$i]['pjtvr_prod_name'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['pjtvr_prod_price'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['pjtvr_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['pjtvr_days_cost'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['pjtvr_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                $subtotalBase   = $price * $quantity * $daysBase;     //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                $discountAmount = $subtotalBase * $discountBase;      //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                $amountBase     = $subtotalBase - $discountAmount;    //  ----------------------- Costo base = importe base - importe de desucuento base

                                $daysTrip       = $items[$i]['pjtvr_days_trip'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['pjtvr_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                $amountTrip     = $price * $quantity * $daysTrip;     //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                $discAmountTrip = $amountTrip * $discountTrip;    //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                $amountGral     = $amountBase + $amountTrip - $discAmountTrip;    //  ----------- Costo viaje = importe de viaje - importe de descuento viaje

                                $discountBaseTotal  += $discountAmount;         //  ----------------------------- Descuento total base
                                $amountBaseTotal    += $amountBase;             //  ----------------------------- Importe total base
                                $discountTripTotal  += $discAmountTrip;         //  ----------------------------- Importe de descuento viaje
                                $amountTripTotal    += $amountTrip;             //  ----------------------------- Importe por viaje
                                $amountGralTotal    += $amountGral;             //  ----------------------------- Importe total
                                $totalMain          += $amountGral;             //  ----------------------------- Total general

                                $Insured            = $items[$i]['pjtvr_insured'];        //  ------------------  Porcentaje de seguro
                                $discoInsured       = $items[$i]['pjtvr_discount_insured'];   //  --------------  Porcentaje de descuento sobre seguro
                                $amountinsured      = $subtotalBase * $Insured;      //  -----------------------  Importe de seguro = (precio * cantidad) porcentaje de seguro
                                
                                $amountDescInsured  = $amountinsured * $discoInsured;   //  --------------------  Importe de descuento sobre seguro = importe de seguro * porcentaje de descuento sobre seguro
                                $totalInsured       = $amountinsured - $amountDescInsured ; //  ----------------  Importe total del seguro sobre el producto = importe de seguro - importe de descuento sobre seguro
                                $totalInsr         += $totalInsured;
        
        
        $html .= '
                            <tr>
                                <td class="dat-figure prod">' . $product                                    . '</td>
                                <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                <td class="dat-figure days">' . $daysBase                                   . '</td>
                                <td class="dat-figure disc">' . number_format($discountAmount , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountBase , 2,'.',',')      . '</td>
                                <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                            </tr>
                            ';
                            }
        
                        }
        $html .= '
                            <tr>
                                <td class="tot-figure totl" colspan="4">Total Equipo Extra</td>
                                <td class="tot-figure amou">' . number_format($discountBaseTotal, 2,'.',',') . '</td>
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
/* Tabla de equipo extra -------------------------  */


/* Tabla de equipo dias -------------------------  */
    if ($equipoDias == '1'){
        $html .= '
        
        
                    <!-- Start Tabla de equipo dias  -->
                    <h2>Equipo Dias</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto.</th>
                                <th class="tit-figure amou">Importe</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Importe<br>Total</th>
                            </tr>
                        </thead>
                        <tbody>';
        
                        $discountBaseTotal  = 0;
                        $amountBaseTotal    = 0;
                        $discountTripTotal   = 0;
                        $amountTripTotal    = 0;
                        $amountGralTotal    = 0;
        
                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtvr_section'] ;
        
                            if ($section == '3') {
                                $product        = $items[$i]['bdg_prod_name'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['bdg_prod_price'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['bdg_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['bdg_days_cost'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['bdg_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                $subtotalBase   = $price * $quantity * $daysBase;   //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                $discountAmount = $subtotalBase * $discountBase;    //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                $amountBase     = $subtotalBase - $discountAmount;  //  ----------------------- Costo base = importe base - importe de desucuento base

                                $daysTrip       = $items[$i]['bdg_days_trip'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['bdg_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                $amountTrip     = $price * $quantity * $daysTrip;   //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                $discAmountTrip = $amountTrip * $discountTrip;  //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                $amountGral     = $amountBase + $amountTrip - $discAmountTrip;  //  ----------- Costo viaje = importe de viaje - importe de descuento viaje

                                $discountBaseTotal  += $discountAmount;     //  ------------------------------- Descuento total base
                                $amountBaseTotal    += $amountBase;         //  ------------------------------- Importe total base
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
        
        
        $html .= '
                            <tr>
                                <td class="dat-figure prod">' . $product                                    . '</td>
                                <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                <td class="dat-figure days">' . $daysBase                                   . '</td>
                                <td class="dat-figure disc">' . number_format($discountAmount , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountBase , 2,'.',',')      . '</td>
                                <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                            </tr>
                            ';
                            }
        
                        }
        $html .= '
                            <tr>
                                <td class="tot-figure totl" colspan="4">Total Equipo Dias</td>
                                <td class="tot-figure amou">' . number_format($discountBaseTotal, 2,'.',',') . '</td>
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
/* Tabla de equipo dias -------------------------  */


/* Tabla de equipo subarrendo -------------------------  */
    if ($equipoSubarrendo == '1'){
        $html .= '
        
        
                    <!-- Start Tabla de equipo subarrendo  -->
                    <h2>Equipo Subarrendo</h2>
                    <table autosize="1" style="page-break-inside:void" class="table-data bline-d">
                        <thead>
                            <tr>
                                <th class="tit-figure prod">Producto</th>
                                <th class="tit-figure pric">Precio</th>
                                <th class="tit-figure qnty">Cant.</th>
                                <th class="tit-figure days">Días</th>
                                <th class="tit-figure disc">Dcto.</th>
                                <th class="tit-figure amou">Importe</th>
                                <th class="tit-figure days">Dias<br>Viaje</th>
                                <th class="tit-figure amou">Dscto.<br>Viaje</th>
                                <th class="tit-figure amou">Importe x<br>Viaje</th>
                                <th class="tit-figure amou">Importe<br>Total</th>
                            </tr>
                        </thead>
                        <tbody>';
        
                        $discountBaseTotal  = 0;
                        $amountBaseTotal    = 0;
                        $discountTripTota   = 0;
                        $amountTripTotal    = 0;
                        $amountGralTotal    = 0;
        
                        for ($i = 0; $i<count($items); $i++){
                            $section        = $items[$i]['pjtvr_section'] ;
        
                            if ($section == '4') {
                                $product        = $items[$i]['bdg_prod_name'] ; //  --------------------------- Nombre del producto
                                $price          = $items[$i]['bdg_prod_price'] ;    //  ----------------------- Precio del producto
                                $quantity       = $items[$i]['bdg_quantity'] ;  //  --------------------------- Cantidad solicitada
                                $daysBase       = $items[$i]['bdg_days_cost'] ; //  --------------------------- Dias de costo 
                                $discountBase   = $items[$i]['bdg_discount_base'] ; //  ----------------------- Porcentaje de descuento base
                                $subtotalBase   = $price * $quantity * $daysBase;   //  ----------------------- Importe base = (precio x cantidad) dias de costo
                                $discountAmount = $subtotalBase * $discountBase;    //  ----------------------- Importe de descuento base = importe base x porcentaje de descuento base
                                $amountBase     = $subtotalBase - $discountAmount;  //  ----------------------- Costo base = importe base - importe de desucuento base

                                $daysTrip       = $items[$i]['bdg_days_trip'];  //  --------------------------- Dias de viaje
                                $discountTrip   = $items[$i]['bdg_discount_trip'];  //  ----------------------- Porcentaje de descuento viaje
                                $amountTrip     = $price * $quantity * $daysTrip;   //  ----------------------- Importe de viaje = (precio x cantidad) dias de viaje
                                $discAmountTrip = $amountTrip * $discountTrip;  //  --------------------------- Importe de descuento viaje = Importe de viaje x porcentaje de descuento viaje
                                $amountGral     = $amountBase + $amountTrip - $discAmountTrip;  //  ----------- Costo viaje = importe de viaje - importe de descuento viaje

                                $discountBaseTotal  += $discountAmount;     //  ------------------------------- Descuento total base
                                $amountBaseTotal    += $amountBase;         //  ------------------------------- Importe total base
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
        
        
        $html .= '
                            <tr>
                                <td class="dat-figure prod">' . $product                                    . '</td>
                                <td class="dat-figure pric">' . number_format($price , 2,'.',',')           . '</td>
                                <td class="dat-figure qnty">' . $quantity                                   . '</td>
                                <td class="dat-figure days">' . $daysBase                                   . '</td>
                                <td class="dat-figure disc">' . number_format($discountAmount , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountBase , 2,'.',',')      . '</td>
                                <td class="dat-figure days">' . $daysTrip                                   . '</td>
                                <td class="dat-figure amou">' . number_format($discAmountTrip , 2,'.',',')  . '</td>
                                <td class="dat-figure amou">' . number_format($amountTrip , 2,'.',',')      . '</td>
                                <td class="dat-figure amou">' . number_format($amountGral , 2,'.',',')      . '</td>
                            </tr>
                            ';
                            }
        
                        }
        $html .= '
                            <tr>
                                <td class="tot-figure totl" colspan="4">Total Equipo Subarrendo</td>
                                <td class="tot-figure amou">' . number_format($discountBaseTotal, 2,'.',',') . '</td>
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
    "Proyecto.pdf",
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
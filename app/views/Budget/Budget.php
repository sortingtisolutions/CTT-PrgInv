<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>

<div class="invoice__container">
    <!-- Nombre del proyecto y tablero de control -->
    <div class="invoice__section invoice__section-panel invoice-border">
        <div class="panel__name">
            <i class="fas fa-caret-square-down projectInformation"></i>
            <span id="projectName" data_id=""></span>
        </div>
        <div class="panel__finder">
            <i class="fas fa-search projectfinder"></i>
        </div>
    </div>


    <!-- Botones de reseteo -->
    <div class="invoice__section invoice__section-button invoice-border">
        <span class="invoice_button"><i class="fas fa-plus"></i>nueva cotización</span>
    </div>


    <!-- Parilla de productos seleccionado -->
    <div class="invoice__section invoice__section-grid invoice-border">
        <div class="invoice_controlPanel invoice-border">
            <span class="invoice_button addSection"><i class="fas fa-plus"></i>Agrega Sección</span>
            <span class="invoice_button toPrint"><i class="fas fa-print"></i> Imprimir</span>
            <span class="invoice_button toSave"><i class="fas fa-save"></i> Hacer proyecto</span>
            <div class="menu-sections">
                <ul>
                    <li class="equipoBase"          data_option="1">EQUIPO BASE</li>
                    <li class="equipoExtra"         data_option="2">EQUIPO EXTRA</li>
                    <li class="equipoPorDia"        data_option="3">EQUIPO POR DIAS</li>
                    <li class="equipoSubarrendo"    data_option="4">EQUIPO POR SUBARRENDO</li>
                </ul>
            </div>
        </div>
        <div class="invoice__box-table" id="invoiceTable">
            <table>
                <thead>
                    <tr>
                        
                        <th>Producto</th>
                        <th class="colbase"><i class="fas fa-caret-down selectionInput quantityBase inpt"></i>Cant.</th>
                        <th class="colbase">Precio</th>
                        <th class="colbase"><i class="fas fa-caret-down selectionInput daysBase inpt"></i>Días</th>
                        <th class="colbase"><i class="fas fa-caret-down selectionInput daysCost inpt"></i>Dias Cobro</th>
                        <th class="colbase"><i class="fas fa-caret-down selectionInput discountBase selt"></i>Desc.</th>
                        <th class="colbase"><div class="invoice_col_header costBase">COSTO BASE</div>Costo</th>
                        <th class="coltrip"><i class="fas fa-caret-down selectionInput daysTrip inpt"></i>Días</th>
                        <th class="coltrip"><i class="fas fa-caret-down selectionInput discountTrip selt"></i>Desc</th>
                        <th class="coltrip"><div class="invoice_col_header costTrip">COSTO VIAJE</div>Costo</th>
                        <th class="coltest"><i class="fas fa-caret-down selectionInput daysTest inpt"></i>Dias</th>
                        <th class="coltest"><i class="fas fa-caret-down selectionInput discountTest selt"></i>Desc.</th>
                        <th class="coltest"><div class="invoice_col_header costTest">COSTO PRUEBAS</div>Costo</th>
                        <th class="colcontrol"><i class="fas fa-caret-left showColumns rotate180" title="Muestra y oculta columnas de viaje y pruebas"></i></th>
                    </tr>
                </thead>

                

                
                <!-- EQUIPO BASE -->
                <tbody  class="sections_products" id="SC1">
                    <tr|>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> EQUIPO BASE</th>
                        <td colspan="12" class="col_section"></td>
                    </tr|>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=13></td>
                    </tr> 
                </tbody>
                <!-- EQUIPO EXTRA -->
                <tbody class="sections_products" id="SC2">
                    <tr>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> EQUIPO EXTRA</th>
                        <td colspan="12" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=13></td>
                    </tr> 
                </tbody>
                <!-- EQUIPO POR DIA -->
                <tbody class="sections_products" id="SC3">
                    <tr>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> EQUIPO POR DIA</th>
                        <td colspan="12" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=13></td>
                    </tr> 
                </tbody>
                <!-- EQUIPO POR SUBARRENDO -->
                <tbody class="sections_products" id="SC4">
                    <tr>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> EQUIPO POR SUBARRENDO</th>
                        <td colspan="12" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=13></td>
                    </tr> 

                    
                </tbody>
                <tbody>
                    <tr>
                        <th class="col_product colbase"></th>
                        <td class="col_quantity colbase"></td>
                        <td class="col_price colbase"></td>
                        <td class="col_days colbase"></td>
                        <td class="col_days colbase"></td>
                        <td class="col_discount colbase"></td>
                        <td class="col_cost colbase"></td>
                        <td class="col_days coltrip"></td>
                        <td class="col_discount coltrip"></td>
                        <td class="col_cost coltrip"></td>
                        <td class="col_days coltest"></td>
                        <td class="col_discount coltest"></td>
                        <td class="col_cost coltest"></td>
                        <td class="col_caret colcontrol"></td>
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>


    <!-- Totales y versiones -->
    <div class="invoice__section invoice__section-sidebar">

        <!-- Totales -->
        <div class="sidebar__totals invoice-border">
            <table>
                <tr>
                    <td class="totals-concept">COTIZACION BASE</td>
                    <td class="totals-numbers" id="costBase">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">COSTO VIAJE</td>
                        <td class="totals-numbers" id="costTrip">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">COSTO PRUEBAS</td>
                        <td class="totals-numbers" id="costTest">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">SEGURO</td>
                        <td class="totals-numbers" id="insuTotal">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">TOTAL</td>
                        <td class="totals-numbers" id="costTotal">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">&nbsp;</td>
                        <td class="totals-numbers"></td>
                    </tr>
                    <tr>
                        <td class="totals-concept">NUMERO DE PRODUCTOS</td>
                        <td class="totals-numbers">0</td>
                    </tr>
                </table>
        </div>

        <!-- Versiones de documentos guardados -->
        <div class="sidebar__versions invoice-border">
            <div class="version__button">
                <span class="invoice_button">
                <i class="fas fa-save"></i> Guardar cotización
               </span> 
            </div>
            <div class="version__list">
                <span class="version__list-title"></span>
                <ul>
                    <!-- <li><span>Version</span><span>Fecha</span></li> -->

                </ul>
            </div>
        </div>

        <!-- Boton de comentarios -->
        <div class="sidebar__comments invoice-border"> 
            <span class="invoice_button">
                <i class="far fa-comment-alt"></i> Comentarios
            </span> 
        </div>
    </div>
    
    
    <!-- Informacion del proyecto y cliente seleccionado -->
    <div class="invoice__section-details invoice-border">
        <div class="detail__box detail__box-project invoice-border">
            <div class="detail_group">
                <div class="concept">Número:</div>
                <div class="data" id="projectNumber"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Locación:</div>
                <div class="data" id="projectLocation"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Periodo:</div>
                <div class="data" id="projectPeriod"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Tipo de locación:</div>
                <div class="data" id="projectLocationType"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Tipo de proyecto:</div>
                <div class="data" id="projectType"></div>
            </div>
            <p>&nbsp;</p>

            <div class="detail_group">
            <span class="invoice_button"><i class="fas fa-plus"></i>Editar proyecto</span>
            </div>
        </div>
        <div class="detail__box detail__box-customer invoice-border">
            <div class="detail_group">
                <div class="concept">Cliente:</div>
                <div class="data" id="CustomerName"></div>
            </div>
            <div class="detail_group">
                <div class="concept"></div>
                <div class="data" id="CustomerType"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Productor responsable:</div>
                <div class="data" id="CustomerProducer"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Domicilio:</div>
                <div class="data" id="CustomerAddress"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Correo electrónico:</div>
                <div class="data" id="CustomerEmail"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Teléfono:</div>
                <div class="data" id="CustomerPhone"></div>
            </div>

            <div class="detail_group">
                <div class="concept">Calificación:</div>
                <div class="data" id="CustomerQualification"></div>
            </div>


        </div>
    </div>


    <!-- Buscador de clientes y proyectos -->
    <div class="invoice__section-finder invoice-border">
        <div class="finder__box">
            <input type="text" name="txtCustomer" id="txtCustomer" placeholder="Cliente" class="invoiceInput wtf">
            <i class="fas fa-times"></i>
            <div class="finder_list finder_list-customer">
                <ul> </ul>
            </div>
        </div>
        <div class="finder__box">
        <input type="text" name="txtCliente" id="txtCliente" placeholder="Proyecto" class="invoiceInput wtf">
            <i class="fas fa-times"></i>
            <div class="finder_list finder_list-projects">
                <ul></ul>
            </div>

        </div>
    </div>


        <!-- Listado de productos -->
    <div class="invoice__section-products invoice-border modalTable">
        <div class="modal__header  invoice-border">
            <div class="modal__header-concept">&nbsp;Listados de productos</div>
            <i class="far fa-window-close close_listProducts"></i>
        </div>
        <div class="modal__header  invoice-border">
            <input type="text" name="txtProductFinder" id="txtProductFinder" autocomplete="off" placeholder="buscar producto" class="finderInput wt5">
            
        </div>


        <div class="productos__box-table" id="listProductsTable">
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Existencias</th>
                    <th>Tipo</th>
                    <th>Catálogo</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
        </div>
        
    </div>


    <!-- Mini menu de opciones de producto -->
    <div class="invoice__menu-products invoice-border withShadow">
        <ul>
            <li class="event_killProduct"><i class="fas fa-trash"></i> Elimina Producto</li>
            <li class="event_InfoProduct"><i class="fas fa-info-circle"></i> Información</li>
            <li class="event_PerdProduct" hidden><i class="fas fa-calendar-week"></i> Periodos</li>
            <li class="event_StokProduct"><i class="fas fa-layer-group"></i> Inventario</li>
        </ul>
    </div>

    <!-- Modal General  -->
    <div class="invoice__modal-general invoice-border modalTable">
        <div class="modal__header invoice-border">
            <div class="modal__header-concept">&nbsp;Listados de productos</div>
            <i class="far fa-window-close closeModal"></i>
        </div>
        <div class="modal__body invoice-border">
        </div>
    </div>


    <!-- input de cantidad y descuentos -->
    <div class="invoiceMainInput withShadow">
        <input type="text" name="txtMainInput"  id="txtMainInput" class="input_invoice">
    </div>
    <div class="invoiceMainSelect withShadow">
        <select name="selDiscount" id="selDiscount" class="input_invoice" size="6"></select>
    </div>

    <!-- Fondo obscuro -->
    <div class="invoice__modalBackgound">fondo</div>


    <!-- Plantilla de tablas modales -->
    <div  id="infoProductTemplate" class="table_hidden">
        <table class="table_template" style = "min-width: 600px; width:100%;" >
            <thead>
                <tr>
                    <th style = "width: 150px">SKU</th>
                    <th style = "width:  50px">Tipo</th>
                    <th style = "min-width: 400px; width: auto;">Nombre del producto</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    <div  id="stockProductTemplate" class="table_hidden">
        <table class="table_template" style = "min-width:1150px; width:auto;">
            <thead>
                <tr>
                    <th style = "width:150px">SKU</th>
                    <th style = "width:150px">Serie</th>
                    <th style = "width:50px">Status</th>
                    <th style = "min-width:500px; width: auto">Proyecto</th>
                    <th style = "width:150px">Fecha de inicio</th>
                    <th style = "width:150px">Fecha de término</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
    
</div>



<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Budget/Budget.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
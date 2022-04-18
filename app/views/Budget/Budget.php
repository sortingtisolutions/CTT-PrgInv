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
                    <li class="equipoBase">EQUIPO BASE</li>
                    <li class="equipoExtra">EQUIPO EXTRA</li>
                    <li class="equipoPorDia">EQUIPO POR DIAS</li>
                    <li class="equipoSubarrendo">EQUIPO POR SUBARRENDO</li>
                </ul>
            </div>
        </div>
        <div class="invoice__box-table" id="invoiceTable">
            <table>
                <thead>
                    <tr>
                        
                        <th>Producto</th>
                        <th class="colbase">Cant.</th>
                        <th class="colbase">Precio</th>
                        <th class="colbase">Días</th>
                        <th class="colbase">Dias Cobro</th>
                        <th class="colbase">Desc.</th>
                        <th class="colbase"><div class="invoice_col_header costBase">COSTO BASE</div>Costo</th>
                        <th class="coltrip">Días</th>
                        <th class="coltrip">Desc</th>
                        <th class="coltrip"><div class="invoice_col_header costTrip">COSTO VIAJE</div>Costo</th>
                        <th class="coltest">Dias</th>
                        <th class="coltest">Desc.</th>
                        <th class="coltest"><div class="invoice_col_header costTest">COSTO PRUEBAS</div>Costo</th>
                        <th class="colcontrol"><i class="fas fa-caret-left showColumns rotate180" title="Muestra y oculta columnas de viaje y pruebas"></i></th>
                    </tr>
                </thead>
                <!-- EQUIPO BASE -->
                <tbody  class="sections_products" id="equipoBase">
                    <tr|>
                        <th class="col_section"> EQUIPO BASE</th>
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
                <tbody class="sections_products" id="equipoExtra">
                    <tr>
                        <th class="col_section"> EQUIPO EXTRA</th>
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
                <tbody class="sections_products" id="equipoPorDia">
                    <tr>
                        <th class="col_section"> EQUIPO POR DIA</th>
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
                <tbody class="sections_products" id="equipoSubarrendo">
                    <tr>
                        <th class="col_section"> EQUIPO POR SUBARRENDO</th>
                        <td colspan="12" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=13></td>
                    </tr> 

                    
<!--                     
                    <tr>
                        <th class="col_product colbase"><div class="elipsis" title="CUANDO EL NOMBRE DEL PRODUCTO ES DEMASIADO LARGO Y NO CABE EN EL RENGLOON">CUANDO EL NOMBRE DEL PRODUCTO ES DEMASIADO LARGO Y NO CABE EN EL RENGLOON</div><i class="fas fa-bars menu_product" ></i></th>
                        <td class="col_quantity colbase"><input type="text" class="input_invoice" value="1" tabindex=1></td>
                        <td class="col_price colbase">1,000.00</td>
                        <td class="col_days colbase"><input type="text" class="input_invoice" value="4" tabindex=2></td>
                        <td class="col_days colbase"><input type="text" class="input_invoice" value="3" tabindex=3></td>
                        <td class="col_discount colbase">0</td>
                        <td class="col_cost colbase">4,000.00</td>
                        <td class="col_days coltrip"><input type="text" class="input_invoice" value="0" tabindex=4></td>
                        <td class="col_discount coltrip">0</td>
                        <td class="col_cost coltrip">4,000.00</td>
                        <td class="col_days coltest"><input type="text" class="input_invoice" value="0" tabindex=5></td>
                        <td class="col_discount coltest">0</td>
                        <td class="col_cost coltest">4,000.00</td>
                        <td class="col_caret colcontrol"></td>
                    </tr>  -->
<!-- 
                    <tr>
                        <th class="col_product botton_prod">
                            
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>

                        </th>
                        <td colspan=13></td>
                    </tr> -->
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
                    <td class="totals-numbers">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">COSTO VIAJE</td>
                        <td class="totals-numbers">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">COSTO PRUEBAS</td>
                        <td class="totals-numbers">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">SEGURO</td>
                        <td class="totals-numbers">0.00</td>
                    </tr>
                    <tr>
                        <td class="totals-concept">TOTAL</td>
                        <td class="totals-numbers">0.00</td>
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
            <i class="far fa-window-close"></i>
        </div>
        <div class="modal__header  invoice-border">
            <input type="text" name="txtProductFinder" id="txtProductFinder" placeholder="buscar producto" class="finderInput wt5">
            
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
            <tbody>
                <!-- <tr>
                    <th class="col_product"><div class="elipsis">CUANDO EL NOMBRE DEL PRODUCTO ES DEMASIADO LARGO Y NO CABE EN EL RENGLOON</div></th>
                    <td class="col_quantity">0</td>
                    <td class="col_type">Producto</td>
                    <td class="col_category">Categoria</td>
                </tr> -->
            </tbody>
        </table>
        </div>
        
    </div>


    <!-- Mini menu de opciones de producto -->
    <div class="invoice__menu-products invoice-border withShadow">
        <ul>
            <li><i class="fas fa-trash"></i> Elimina Producto</li>
            <li><i class="fas fa-info-circle"></i> Información</li>
            <li><i class="fas fa-calendar-week"></i> Periodos</li>
        </ul>
    </div>

    <!-- Modal General  -->
    <div class="invoice__modal-general invoice-border modalTable">
        <div class="modal__header  invoice-border">
            <div class="modal__header-concept">&nbsp;Listados de productos</div>
            <i class="far fa-window-close"></i>
        </div>
    </div>


</div>



<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Budget/Budget.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
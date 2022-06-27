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
            <span id="projectName" data-id="" title=""></span>
        </div>
        <div class="panel__title">PROYECTOS APROBADOS</div>
        <div class="panel__finder">
            <i class="fas fa-search projectfinder"></i>
        </div>
     </div>


    <!-- Botones de reseteo -->
    <div class="invoice__section invoice__section-button invoice-border">
        <span class="invoice_button" id="newQuote"><i class="fas fa-tablet-alt"></i> Limpiar pantalla</span>
     </div>


    <!-- Parilla de productos seleccionado -->
    <div class="invoice__section invoice__section-grid invoice-border">
        <div class="invoice_controlPanel">
            <span class="version_current"></span>
            <span class="invoice_button addSection"><i class="fas fa-plus"></i>Agrega Sección</span>
            <span class="invoice_button toPrint"><i class="fas fa-print"></i> Imprimir</span>
            <span class="invoice_button toSave"><i class="fas fa-ban"></i> Cancelar proyecto</span>
            <span class="invoice_button toImport"><i class="fas fa-save"></i> Importar</span>
            <div class="menu-sections">
                <ul>
                    <li class="equipoBase"          data-option="1">Equipo Base</li>
                    <li class="equipoExtra"         data-option="2">Equipo Extra</li>
                    <li class="equipoPorDia"        data-option="3">Equipo por Días</li>
                    <li class="equipoSubarrendo"    data-option="4">Equipo por subarrendo</li>
                </ul>
            </div>
            <div class="import-sections">
                <ul></ul>
            </div>
        </div>
        <div class="invoice__box-table" id="invoiceTable">
            <table >
                <thead>
                    <tr>
                        
                        <th class="wclprod">Producto</th>
                        <th class="wcldays colbase"><i class="fas fa-caret-down selectionInput quantityBase inpt"></i>Cant.</th>
                        <th class="wclnumb colbase">Precio</th>
                        <th class="wcldays colbase"><i class="fas fa-caret-down selectionInput daysBase inpt"></i>Días<br>Renta</th>
                        <th class="wclnumb colbase"><i class="fas fa-caret-down selectionInput daysCost inpt"></i>Dias<br>Cobro</th>
                        <th class="wcldisc colbase"><i class="fas fa-caret-down selectionInput discountBase selt"></i>Desc.</th>
                        <th class="wclnumb colbase"><div class="invoice_col_header costBase">COSTO BASE</div>Costo</th>
                        <th class="wcldays coltrip"><i class="fas fa-caret-down selectionInput daysTrip inpt"></i>Días</th>
                        <th class="wcldisc coltrip"><i class="fas fa-caret-down selectionInput discountTrip selt"></i>Desc</th>
                        <th class="wclnumb coltrip"><div class="invoice_col_header costTrip">COSTO VIAJE</div>Costo</th>
                        <th class="wcldays coltest"><i class="fas fa-caret-down selectionInput daysTest inpt"></i>Dias</th>
                        <th class="wcldisc coltest"><i class="fas fa-caret-down selectionInput discountTest selt"></i>Desc.</th>
                        <th class="wclnumb coltest"><div class="invoice_col_header costTest">COSTO PRUEBAS</div>Costo</th>
                        <th class="wclexpn colcontrol"><i class="fas fa-caret-left showColumns rotate180" title="Muestra y oculta columnas de viaje y pruebas"></i></th>
                    </tr>
                 </thead>

                

                
                <!-- EQUIPO BASE -->
                <tbody  class="sections_products" id="SC1">
                    <tr|>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo Base</th>
                        <td colspan="13" class="col_section"></td>
                    </tr|>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=14></td>
                    </tr> 
                 </tbody>
                <!-- EQUIPO EXTRA -->
                <tbody class="sections_products" id="SC2">
                    <tr>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo Extra</th>
                        <td colspan="13" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=14></td>
                    </tr> 
                 </tbody>
                <!-- EQUIPO POR DIA -->
                <tbody class="sections_products" id="SC3">
                    <tr>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo por Día</th>
                        <td colspan="13" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=14></td>
                    </tr> 
                 </tbody>
                <!-- EQUIPO POR SUBARRENDO -->
                <tbody class="sections_products" id="SC4">
                    <tr>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo por subarrendo</th>
                        <td colspan="13" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=14></td>
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
                        <td></td>
                    </tr>
                    <tr>
                        <td class="totals-concept">NUMERO DE PRODUCTOS</td>
                        <td class="totals-numbers simple"  id="prodTotal">0</td>
                    </tr>
                </table>
        </div>

        <!-- Versiones de documentos guardados -->
        <div class="sidebar__versions invoice-border">
            <div class="version__button">
                <span class="invoice_button toSaveBudget">
                <i class="fas fa-save"></i> Guardar
               </span> 
               <span class="invoice_button toSaveBudgetAs">
                <i class="fas fa-save"></i> Guardar nueva
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
            <span class="invoice_button toComment">
                <i class="far fa-comment-alt"></i> Comentarios
            </span> 
        </div>
    </div>
    
    
    <!-- Informacion del proyecto y cliente seleccionado -->
    <div class="invoice__section-details invoice-border">
        <div class="detail__box detail__box-project ">
            <div class="detail__box-fullRow">
                <span class="invoice_button" id="btnEditProject"><i class="fas fa-plus"></i>Editar proyecto</span>
            </div>
            <table>
                <tr>
                    <td class="concept">Numero:</td>
                    <td class="data" id="projectNumber"></td>
                </tr>
                <tr>
                    <td class="concept">Locación:</td>
                    <td class="data" id="projectLocation"></td>
                </tr>
                <tr>
                    <td class="concept">Periodo:</td>
                    <td class="data calendar" id="projectPeriod"></td>
                </tr>
                <tr>
                    <td class="concept">Tipo de locación:</td>
                    <td class="data" id="projectLocationType"></td>
                </tr>
                <tr>
                    <td class="concept">Tipo de proyecto:</td>
                    <td class="data" id="projectType"></td>
                </tr>
            </table>

            <hr>

            <table>
                <tr>
                    <td class="concept">Cliente:</td>
                    <td class="data" id="CustomerName"></td>
                </tr>
                <tr>
                    <td class="concept"></td>
                    <td class="data flash" id="CustomerType"></td>
                </tr>
                <tr>
                    <td class="concept">Productor responsable:</td>
                    <td class="data" id="CustomerProducer"></td>
                </tr>
                <tr>
                    <td class="concept">Domicilio:</td>
                    <td class="data" id="CustomerAddress"></td>
                </tr>
                <tr>
                    <td class="concept">Correo electrónico:</td>
                    <td class="data" id="CustomerEmail"></td>
                </tr>
                <tr>
                    <td class="concept">Teléfono:</td>
                    <td class="data" id="CustomerPhone"></td>
                </tr>
                <tr>
                    <td class="concept">Calificación:</td>
                    <td class="data" id="CustomerQualification"></td>
                </tr>
            </table>


        </div>
        
    </div>


    <!-- Buscador de clientes y proyectos -->
    <div class="invoice__section-finder invoice-border">
        <div class="finder__box" id="groupCustomer">
            <input type="text" name="txtCustomer" id="txtCustomer" placeholder="Cliente" class="invoiceInput inputSearch wtf">
            <i class="fas fa-times cleanInput"></i>
            <div class="finder_list finder_list-customer">
                <ul> </ul>
            </div>
        </div>
        <div class="finder__box" id="groupProject">
        <input type="text" name="txtProject" id="txtProject" placeholder="Proyecto" class="invoiceInput inputSearch wtf">
            <i class="fas fa-times cleanInput"></i>
            <div class="finder_list finder_list-projects">
                <ul></ul>
            </div>

        </div>

        <div class="finder__box"></div>
        <!-- <div class="finder__box-buttons">
            <span class="invoice_button" id="btnNewProject"><i class="fas fa-plus"></i>nuevo proyecto</span>
        </div> -->
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
            <li class="event_PerdProduct"><i class="fas fa-calendar-week"></i> Periodos</li>
            <li class="event_StokProduct"><i class="fas fa-layer-group"></i> Inventario</li>
        </ul>
    </div>

    <!-- Modal General  -->
    <div class="invoice__modal-general invoice-border modalTable">
        <div class="modal__header invoice-border">
            <div class="modal__header-concept"></div>
            <i class="far fa-window-close closeModal"></i>
        </div>
        <div class="modal__body"></div>
    </div>


    <!-- input de cantidad y descuentos -->
    <div class="invoiceMainInput withShadow">
        <input type="text" name="txtMainInput"  id="txtMainInput" class="input_invoice">
    </div>
    <div class="invoiceMainSelect withShadow">
        <select name="selDiscount" id="selDiscount" class="input_invoice" size="6"></select>
    </div>

    <!-- Fondo obscuro -->
    <div class="invoice__modalBackgound"></div>


    <!-- Plantilla de tablas modales -->
    <div id="infoProductTemplate" class="table_hidden box_template">
        <table class="table_template" style = "min-width: 600px; width:100%;" >
            <thead>
                <tr>
                    <th style = "width: 150px">SKU</th>
                    <th style = "width:  90px"></th>
                    <th style = "width:  50px">Tipo</th>
                    <th style = "min-width: 300px; width: auto;">Nombre del producto</th>
                    <th style = "width: 300px">Catálogo</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
     </div>
    <div id="stockProductTemplate" class="table_hidden box_template">
        <table class="table_template" style = "min-width:1150px; width:auto;">
            <thead>
                <tr>
                    <th style = "width: 80px"></th>
                    <th style = "width:150px">SKU</th>
                    <th style = "width:150px">Serie</th>
                    <th style = "width: 50px">Status</th>
                    <th style = "min-width:500px; width: auto">Proyecto</th>
                    <th style = "width:150px">Fecha de inicio</th>
                    <th style = "width:150px">Fecha de término</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
     </div>
    <div id="dataProjectTemplate" class="table_hidden box_template">
        <div class="project_data-box">
                <div class="project_data-table">
                    <table  id="formProject">
                        <tr>
                            <td>Nombre del proyecto</td>
                            <td class="projectName">
                                <input type="hidden" name="txtProjectIdEdt" id="txtProjectIdEdt" class="textbox">
                                <input type="text" id="txtProjectEdt" name="txtProjectEdt" class="textbox wtf required" autocomplete="off">
                                <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Quieres agregar Nombre del proyecto</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Periodo</td>
                            <td>
                                <input type="text" id="txtPeriodProjectEdt"  name="txtPeriodProjectEdt" class="textbox wtf required" autocomplete="off">
                                <i class="fas fa-calendar-alt icoTextBox" id="calendar"></i><br>
                                <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes agregar las fechas del projecto</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Duración del proyecto</td>
                            <td>
                                <input type="text" id="txtTimeProject" name="txtTimeProject" class="textbox wt5" autocomplete="off"><br>
                                <span class="textAlert"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Locación</td>
                            <td>
                                <input type="text" id="txtLocationEdt" name="txtLocationEdt" class="textbox wtf" autocomplete="off"><br>
                                <span class="textAlert"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>Tipo de proyecto</td>
                            <td>
                                <select  id="txtTypeProjectEdt" name="txtTypeProjectEdt" class="textbox wtf required" >
                                    <option value="0"></option>
                                </select>
                                <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar el tipo de proyecto</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Tipo de locación</td>
                            <td>
                                <select id="txtTypeLocationEdt" name="txtTypeLocationEdt" class="textbox required" >
                                    <option value = "1" selected> LOCAL</option>
                                    <option value = "2"> FORANEO</option>
                                </select>
                                <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar el tipo de locación</span>
                            </td>
                        </tr>
                        <tr>
                            <td>Cliente</td>
                            <td>
                                <select id="txtCustomerEdt" class="textbox wtf">
                                    <option value="0"></option>
                                </select>
                                <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar un cliente</span>
                                <input type="hidden" name="txtCustomerOwnerEdt"  id="txtCustomerOwnerEdt">
                            </td>
                        </tr>
                        <tr>
                            <td>Productor</td>
                            <td>
                                <select id="txtCustomerRelEdt" class="textbox wtf">
                                    <option value="0"></option>
                                </select>
                                <span class="textAlert"></span>
                            </td>
                        </tr>


                        <tr>
                            <td>Tipo de dependencia</td>
                            <td>
                                <select id="txtProjectDepend" class="textbox wt3 project__selection">
                                    <option value="0" selected>PROYECTO UNICO</option>
                                    <option value="1">PROYECTO ADJUNTO</option>
                                    <option value="2">PROYECTO PADRE</option>
                                </select>
                                <p class = "textbox__result" id="resProjectDepend"></p>
                                <span class="textAlert"></span>
                            </td>
                        </tr>

                        
                        <tr class="hide">
                            <td>Proyecto padre</td>
                            <td>
                                <select id="txtProjectParent" class="textbox wtf project__selection" >
                                    <option value="0"></option>
                                </select>
                                <p class="textbox__result" id="resProjectParent"></p>
                                <span class="textAlert"></span>
                            </td>
                        </tr>

                        <tr>
                            
                            <td colspan=2>
                                <button class="bn btn-ok" id="saveProject"></button>
                            </td>
                        </tr>
                    </table>
                </div>   
            <div class="image_random"></div>
        </div>
     </div>
    <div id="commentsTemplates" class="table_hidden box_template">
        <div class="comments__box">
            <!-- Lista de comentarios -->
            <div class="comments__list"></div>
            <!-- Captura de cumentario -->
            <div class="comments__addNew">
                <label for="txtComment">Escribe comentario</label><br>
                <textarea name="txtComment" id="txtComment" cols="100" rows="5" class="invoiceInput"></textarea><br>
                <span class="invoice_button" id="newComment"><i class="fas fa-plus"></i>guardar comentario</span>

            </div>
        </div>
     </div>
    <div id="PeriodsTemplates" class="table_hidden box_template">
        <div class="periods__box" id="periodBox"></div>
     </div>






    <!-- loading -->
    <div class="invoice__loading modalLoading">
        <div class="box_loading">
            <p class="text_loading">
                Guardando documento<br>
                <i class="fas fa-spinner spin"></i> 
                </p>
            <p>Este proceso puede tradar varios minutos, le recomendamos no salir de la página ni cerrar el navegador.</p>
        </div>
     </div>
    
</div>

<!-- <div class="cuadroMovible"></div> -->



<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS  . 'ProjectDetails/ProjectDetails.js' ?>"></script>


<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
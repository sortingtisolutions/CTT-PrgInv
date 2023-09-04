<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<style>
    .hiddenElement {
        visibility: hidden !important;
    }
</style>
<!-- CUERPO DE LA PAGINA -->
<div class="invoice__container">
<!-- Nombre del proyecto y tablero de control -->
    <div class="invoice__section invoice__section-panel invoice-border">
        <div class="panel__name">
            <i class="fas fa-caret-square-down projectInformation"></i>
            <span id="projectName" data-id="" title=""></span>
        </div>
        <div class="panel__title">COTIZACIÓN</div>
        <div class="panel__finder">
            <i class="fas fa-search projectfinder"> look </i>
        </div>
    </div>

    <!-- Botones de reseteo -->
    <div class="invoice__section invoice__section-button invoice-border">
        <span class="invoice_button" id="newQuote"><i class="fas fa-plus"></i>nueva cotización</span>
    </div>

    <!-- Parilla de productos seleccionado -->
    <div class="invoice__section invoice__section-grid invoice-border">
        <div class="invoice_controlPanel">
            <span class="version_current"></span>
            <span class="invoice_button addSection"><i class="fas fa-plus"></i>Agrega Sección</span>
            <span class="invoice_button toPrint"><i class="fas fa-print"></i> Imprimir</span>
            <span class="invoice_button toSave"><i class="fas fa-save"></i> Generar presupuesto</span>
            <div class="menu-sections">
                <ul>
                    <li class="equipoBase"          data-option="1">Equipo Base</li>
                    <li class="equipoExtra"         data-option="2">Equipo Extra</li>
                    <li class="equipoPorDia"        data-option="3">Equipo por Días</li>
                    <li class="equipoSubarrendo"    data-option="4">Equipo por subarrendo</li>
                </ul>
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
                        <th class="wcldisc colbase"><i class="fas fa-caret-down selectionInput discountInsu selt"></i>Desc.<br>Seguro</th>
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
                    <tr class="blocked"|>
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo Base</th>
                        <td colspan="13" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow blocked">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=14></td>
                    </tr> 
                </tbody>
            <!-- EQUIPO EXTRA -->
                <tbody class="sections_products" id="SC2">
                    <tr class="blocked">
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo Extra</th>
                        <td colspan="13" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow blocked">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=14></td>
                    </tr> 
                </tbody>
            <!-- EQUIPO POR DIA -->
                <tbody class="sections_products" id="SC3">
                    <tr class="blocked">
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo por Día</th>
                        <td colspan="13" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow blocked">
                        <th class="col_product botton_prod">
                            <span class="invoice_button"><i class="fas fa-plus"></i>Agrega producto</span>
                        </th>
                        <td colspan=14></td>
                    </tr> 
                </tbody>
            <!-- EQUIPO POR SUBARRENDO -->
                <tbody class="sections_products" id="SC4">
                    <tr class="blocked">
                        <th class="col_section"><i class="fas fa-minus-circle removeSection"></i> Equipo por subarrendo</th>
                        <td colspan="13" class="col_section"></td>
                    </tr>
                    <tr class="sections_products lastrow blocked">
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
                        <td class="totals-concept"><span class="discData" id ="insuDesctoPrc">0<small>%</small></span> DESTO. AL SEGURO <i class="fas fa-caret-left selectioninsured"></i></td>
                        <td class="totals-numbers" id="insuDescto">0.00</td>
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
                        <td class="totals-numbers simple" id="numberProducts">0</td>
                    </tr>
                </table>
        </div>

    <!-- Versiones de documentos guardados -->
        <div class="sidebar__versions invoice-border">
            <div class="version__button">
                <span class="invoice_button"><i class="fas fa-save"></i> Guardar cotización</span> 
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
        <div class="finder__box" id="groupProjectParent">
        <input type="text" name="txtProjectParents" id="txtProjectParents" placeholder="Proyecto Padre" class="invoiceInput inputSearch wtf">
            <i class="fas fa-times cleanInput"></i>
            <div class="finder_list finder_list-projectsParent">
                <ul></ul>
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
        <div class="finder__box"></div>
        <div class="finder__box-buttons">
            <span class="invoice_button" id="btnNewProject" style="font-weight: 800"><i class="fas fa-plus"></i>nuevo proyecto</span>
        </div>
    </div>

    <!-- Listado de productos -->
    <div class="invoice__section-products invoice-border modalTable" style="width:80%; height: 80%; position: absolute; top:2px; left:250px;right:10px;bottom:80px;">
        <div class="modal__header  invoice-border">
            <div class="modal__header-concept">&nbsp;Listados de productos</div>
            <!-- <span class="invoice_button toCharge">Cargando....</span> -->
            <div class="modal__header-concept">&nbsp;<span class="invoice_button toCharge hide-items" style="color:#008000">Cargando....</span></div>
            <i class="far fa-window-close close_listProducts"></i>
        </div>
        <div class="modal__header  invoice-border">
            
            <input type="text" name="txtProductFinder" id="txtProductFinder" autocomplete="off" placeholder="buscar producto" class="finderInput wt4">
            
            <div class="col-md-3 col-lg-3 col-xl-3">
                <select id="txtCategory" class="form-select form-select-sm"><option value="0" selected>Catálogo</option></select>
                <!-- <label for="txtCategory">Catálogo</label> -->
			</div>
            <div class="col-md-3 col-lg-3 col-xl-3">
                <select id="txtSubCategory" class="form-select form-select-sm"><option value='0' selected>Selecciona la subcategoria</option></select>
                <!-- <label for="txtSubCategory">Subcategorias</label> -->
			</div>
            <div class="col-md-2 col-lg-2 col-xl-2">
                <button type="button"  class="btn btn-danger btn-sm btn-block" style="font-size: 0.8rem !important;" id="LimpiarFormulario">Limpiar</button>
			</div>
        </div>

        <div class="productos__box-table" id="listProductsTable">
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Existencias</th>
                    <th>Sub-Categoria</th>
                    <th>Precio</th>
                    <th>Tipo</th>
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
            <li class="event_ChangePakt" hidden><i class="fas fa-edit"></i> Cambia Paquete</li>
        </ul>
    </div>

<!-- Modal General  -->
    <div class="invoice__modal-general invoice-border modalTable">
        <div class="modal__header invoice-border">
            <div class="modal__header-concept" style="font-weight: 700">&nbsp;Listados de productos</div>
            <i class="far fa-window-close closeModal"></i>
        </div>
        <div class="modal__body">
        </div>
    </div>


<!-- input de cantidad y descuentos -->
    <div class="invoiceMainInput withShadow">
        <input type="text" name="txtMainInput"  id="txtMainInput" class="input_invoice">
    </div>
    <div class="invoiceMainSelect withShadow">
        <select name="selDiscount" id="selDiscount" class="input_invoice" size="6"></select>
    </div>
    <div class="invoiceDiscSelect withShadow">
        <select name="selDiscInsr" id="selDiscInsr" class="input_invoice" size="6"></select>
    </div>

<!-- Fondo obscuro -->
    <div class="invoice__modalBackgound"></div>

<!-- Plantilla de tablas modales -->
<div id="infoDetProdTemplate" class="table_hidden box_template">
        <table class="table_template" style = "min-width: 300px; width:80%;" >
            <thead>
                <tr>
                    <th style = "width: 100px">SKU</th>
                    <th style = "min-width: 300px; width: auto;">Nombre del producto</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>


<!-- Plantilla de tablas modales -->
    <div id="infoProductTemplate" class="table_hidden box_template">
        <table class="table_template" style = "min-width: 500px; width:100%;" >
            <thead>
                <tr>
                    <th style = "width: 150px">SKU</th>
                    <th style = "width:  50px">Tipo</th>
                    <th style = "min-width: 300px; width: auto;">Nombre del producto</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>


<!-- Listado de inventarios -->
    <div id="stockProductTemplate" class="table_hidden box_template">
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

<!-- formulario de edicion y nuevo proyecto -->
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
                        <td>Tipo de dependencia</td>
                        <td>
                            <select id="txtProjectDepend" class="textbox wt5 project__selection">
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
                        <td>Tipo de proyecto</td>
                        <td>
                            <select  id="txtTypeProjectEdt" name="txtTypeProjectEdt" class="textbox wtf required" >
                                <option value="0"></option>
                            </select>
                            <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar el tipo de proyecto</span>
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
                        <td>Tipo de locación</td>
                        <td>
                            <select id="txtTypeLocationEdt" name="txtTypeLocationEdt" class="textbox" >
                                <option value = "0" selected></option>
                                <!-- <option value = "2"> FORANEO</option>
                                <option value = "3"> FORO</option> -->
                            </select>
                            <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar el tipo de locación</span>
                        </td>
                    </tr>

                    <tr>
                        <td>Locación</td>
                        <td>
                            <input type="text" id="txtLocationEdt" name="txtLocationEdt" class="textbox wtf" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>

                    <!-- <tr class="hide">
                        <td>Estado de la República</td>
                        <td>
                            <select id="txtEdosRepublic" name="txtEdosRepublic" class="textbox wt5">
                                <option value="0"></option>
                            </select>
                            <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar el estado</span>
                        </td>
                    </tr> -->
					<tr class="hide"> <!--  -->
                        <td></td>
                        <td>
                            <button class="bn btn-add" id="addLocation"></button>
                        </td>
                        
                    </tr>
                      

                    <tr>
                        <td>Selecciona cliente</td>
                        <td>
                            <select id="txtCustomerEdt" class="textbox wtf">
                                <option value="0"></option>
                            </select>
                            <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar un cliente</span>
                            <input type="hidden" name="txtCustomerOwnerEdt"  id="txtCustomerOwnerEdt">
                        </td>
                    </tr>

                    <tr>
                        <td>Selecciona productor</td>
                        <td>
                            <select id="txtCustomerRelEdt" class="textbox wtf">
                                <option value="0"></option>
                            </select>
                            <span class="textAlert"></span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>¿Quien solicitó</td>
                        <td>
                            <input type="text" id="txtHowRequired" name="txtHowRequired" class="textbox wtf" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>
                    <tr class="hide">
                        <td>Días de viaje de ida</td>
                        <td>
                            <input type="text" id="txtTripGo" name="txtTripGo" class="textbox wt2" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>
                    
                    <tr class="hide">
                        <td>Días viaje de regreso</td>
                        <td>
                            <input type="text" id="txtTripBack" name="txtTripBack" class="textbox wt2" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>
                    <tr>
                        <td>Días de Carga</td>
                        <td>
                            <input type="text" id="txtCarryOn" name="txtCarryOn" class="textbox wt2" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Días de descarga</td>
                        <td>
                            <input type="text" id="txtCarryOut" name="txtCarryOut" class="textbox wt2" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Días pruebas técnicas</td>
                        <td>
                            <input type="text" id="txtTestTecnic" name="txtTestTecnic" class="textbox wt2" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td>Días pruebas de look</td>
                        <td>
                            <input type="text" id="txtTestLook" name="txtTestLook" class="textbox wt2" autocomplete="off"><br>
                            <span class="textAlert"></span>
                        </td>
                    </tr>

                    <tr>
                        <td>Tipo de llamado</td>
                        <td>
                            <select id="txtTypeCalled" name="txtTypeCalled" class="textbox" ></select>
                            <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar el tipo de llamado</span>
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

<!-- formulario de comentarios -->
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

<!-- loading -->
    <div class="invoice__loading modalLoading">
        <div class="box_loading">
            <p class="text_loading">
                Promoviendo cotización<br>
                <i class="fas fa-spinner spin"></i> 
                </p>
            <p>La cotización se encuentra en proceso de ser promovida a presupuesto, este proceso puede tardar varios minutos</p>
        </div>
    </div>

</div>
<!-- end -->

<div class="overlay_background overlay_hide" id="ChangeSerieModal" style="width: 80%">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <button type="button" class="btn btn-sm btn-primary" id="btn_save">Aplicar Cambio</button>
            <div style="height:15px;"></div> <!-- Agregar un espacio -->
            <table class="display compact nowrap"  id="tblChangeSerie" style="width: 100%">
                <thead>
                    <tr>
                        <th style="width:  10px"></th>
                        <th style="width: 100px">SKU</th>
                        <th style="width:  40px">Tipo</th>
                        <th style="width: 200px">Descripcion Producto</th>
                        <th style="width:  40px">Cambio por:</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->


<div class="overlay_background overlay_hide" id="addLocationModal" style="width: 60%; left:25%; background-color: rgba(255, 255, 255, 0); z-index: 500;">
    <div class="overlay_modal" style="z-index: 50;">
        <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
        <div class="" style="position: absolute; top: 10px; height: 60px; padding: 10px;">
            <button type="button" class="btn btn-sm btn-primary" id="btn_save_locations">Guardar</button>
        </div>
        <div class="container-fluid" >
            <div class="contenido">
                <div class="row">
                    <div class="" style="width: 100%; height: 100vh; padding: 50px 10px 10px 10px; overflow: auto; padding: 4px; ">
                        <div class="row">
                            
                            <!-- <button class="bn btn-ok" id="addLocationEdos">Agregar</button> -->
                            <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12" style="background-color: #ffffff; border: 2px solid #eeeeee; border-radius: 10px;">
                                <table id="" class="table_information form-floating ">
                                    <tr>
                                        <td>Locación</td>
                                        <td>
                                            <input type="text" id="txtLocationExtra" name="txtLocationExtra" class="textbox wtf" autocomplete="off"><br>
                                            <span class="textAlert"></span>
                                        </td>
                                        <td>Estado de la República</td>
                                        <td>
                                            <select id="txtEdosRepublic_2" name="txtEdosRepublic_2" class="textbox ">
                                                <option value="0"></option>
                                            </select>
                                            <!-- <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes seleccionar el estado</span> -->
                                        </td>
                                        <td colspan=2>
                                            <button class="bn btn-ok" id="addLocationEdos">Agregar</button>
                                        </td>
                                    </tr>
                                    
                                </table>
                            </div>
                        </div>
                        <div class="row mt-2" >
                            <table class="display compact nowrap" style = "width: 100%" id="listLocationsTable">
                                <thead>
                                    <tr>
                                        <th style = "width: 30px"></th>
                                        <th style = "width: 100px">Locación</th>
                                        <th style = "width:  100px">Estado de la Republica</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Start Ventana modal de SERIES seleccionadas del producto MODAL 1 -->
<div class="overlay_background overlay_hide" id="SerieData" style="width: 60%; left:25%;">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblDataChg" style="width: 100%">
                <thead>
                    <tr>
                        <th style="width:  10px"></th>
                        <th style="width:  80px">SKU</th>
                        <th style="width: 180px">Descripcion Producto</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script> 
<script src="<?=  PATH_ASSETS . 'lib/jquery-ui.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Budget/Budget.js?v=1.0.0.0' ?>"></script>


<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
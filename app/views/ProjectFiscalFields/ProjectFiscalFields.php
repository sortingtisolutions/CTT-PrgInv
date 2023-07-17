
<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- CUERPO DE LA PAGINA -->
<!-- Start Contenedor Listado de PROYECTOS  -->
<div class="container-fluid">
        <div class="contenido">
            <div class="row mvst_group">
                <div class="mvst_list tblProjMaster">
                    
                    <div class="row rowTop">
                        <h1>Proyectos</h1>
                          
                    </div>
                    <div id="dvProjects"></div>
                    <table class="display compact nowrap"  id="tblProjects" >
                        <thead>
                            <tr>
                                <th style="width:  10px"></th>
                                <th style="width:  10px"></th>
                                <th style="width:  10px"></th>
                                <th style="width:  10px"></th>
                                <th style="width:  60px">No. Proyecto</th>
                                <th style="width: 250px">Proyecto</th>
                                <th style="width: 250px">Cliente</th>
                                <th style="width:  80px">Fecha de inicio</th>
                                <th style="width:  80px">Fecha de término</th>
                                <th style="width: 250px">locacion</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
<!-- End Contenedor Listado de PROYECTOS  -->


<!-- Start Ventana modal DATOS DEL CLIENTE -->
<div class="overlay_background overlay_hide customer_modal"id="CustomerModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <h1>Información del cliente</h1>
            <div class="customer_container">
                <div class="customer_group">
                    <label for="customerName"><span class="required">*</span> Nombre del cliente</label><br>
                    <span class="customer_title" id="customerName">Nombre del cliente</span><br><br>

                    <label for="customerAddress"><span class="required">*</span> Domicilio: </label><br>
                    <span class="customer_information" id="customerAddress">Direccion</span><br>
                
                    <label for="customerEmail"><span class="required">*</span> Email: </label>
                    <span class="customer_information" id="customerEmail">Email</span><br>
                    <label for="customerRFC"><span class="required">*</span> RFC: </label>
                    <span class="customer_information" id="customerRFC">RFC</span><br>
                    <label for="customerPhone"><span class="required">*</span> Teléfonos: </label>
                    <span class="customer_information" id="customerPhone">Teléfono</span><br>
                    <label for="customerRepresentative"><span class="required">*</span> Representante Legal: </label>
                    <span class="customer_information" id="customerRepresentative">Representante Legal</span><br>
                    <label for="customerContact">Contacto: </label>
                    <span class="customer_information" id="customerContact">Contacto</span><br>
                    <label for="customerType">Tipo de cliente: </label>
                    <span class="customer_information" id="customerType">Tipo de cliente</span><br>
                
                    <p id="customerFieldPrecent" class="customerPrecent">0</p>
                
                    <button class="btn btn-ok" id="btnCustomerApply" >Aplicar Cambios</button>
                </div>

                <div class="customer_inputs">
                    <h4>Datos fiscales requeridos</h4>
                    <div class="customer_input" id="fraCustomerName">
                        <label for="txtCustomerName">Nombre del cliente</label><br>
                        <input type="text" name="txtCustomerName" id="txtCustomerName" class="textbox-required">
                       
                    </div>

                    <div class="customer_input" id="fraCustomerAddress">
                        <label for="txtCustomerAddress">Domicilio:</label><br>
                        <input type="text" name="txtCustomerAddress" id="txtCustomerAddress" class="textbox-required">
                    </div>

                    <div class="customer_input" id="fraCustomerEmail">
                        <label for="txtCustomerEmail">Email:</label><br>
                        <input type="text" name="txtCustomerEmail" id="txtCustomerEmail" class="textbox-required">
                    </div>

                    <div class="customer_input" id="fraCustomerRFC">
                        <label for="txtCustomerRFC">RFC:</label><br>
                        <input type="text" name="txtCustomerRFC" id="txtCustomerRFC" class="textbox-required">
                    </div>

                    <div class="customer_input" id="fraCustomerPhone">
                        <label for="txtCustomerPhone">teléfono:</label><br>
                        <input type="text" name="txtCustomerPhone" id="txtCustomerPhone" class="textbox-required">
                    </div>

                    <div class="customer_input" id="fraCustomerRepresentative">
                        <label for="txtCustomerRepresentative">Representante Legal:</label><br>
                        <input type="text" name="txtCustomerRepresentative" id="txtCustomerRepresentative" class="textbox-required">
                    </div><br>

                    <input type="hidden" name="txtCustomerId" id="txtCustomerId"><br>
                    <input type="hidden" name="txtCustomerPercent" id="txtCustomerPercent">
                </div>
            </div>
        </div>
        
    </div>
<!-- End Ventana modal DATOS DEL CLIENTE -->




<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProjectFiscalFields/ProjectFiscalFields.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
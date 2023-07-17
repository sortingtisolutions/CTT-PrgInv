<?php 
    defined('BASEPATH') or exit('No se permite acceso directo'); 
    require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
    <?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>

<!-- CUERPO DE LA PAGINA -->
<div class="container-fluid">
    <div class="contenido">  
        <div class="row mvst_group">
            <div class="mvst_panel" style="width:250px;">
                <div class="form-group" >
                    
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtTypeExchange" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona el Proyecto</option></select>
                            <label for="txtTypeExchange">Lista de Proyectos</label>
                        </div>
                    </div>

                    <!-- Almacen posición 1 -->
                    <!-- <div class="row pos1 hide-items">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtStoreSource" class="form-select form-select-sm required"><option value="0" selected>Selecciona Expendable</option></select>
                            <label for="txtStoreSource" class="form-label">Expendable</label>
                        </div>
                    </div> -->

                    <div class="row list-finder pos3 hide-items">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtInvoice" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar una factura" autocomplete="off">
                                    <label for="txtInvoice">Monto Expendables</label>
                                    <input type="hidden" id="txtIdInvoice" name="txtIdInvoice">
                    
                            </div>
                            <div id="listInvoice" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
                            <!-- <input type="text" id="txtIdInvoices" name="txtIdInvoices"> -->
                    </div>

                    <div class="row list-finder pos3 hide-items">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtInvoice" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar una factura" autocomplete="off">
                                    <label for="txtInvoice">Monto Mantenimiento</label>
                                    <input type="hidden" id="txtIdInvoice" name="txtIdInvoice">
                    
                            </div>
                            <div id="listInvoice" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
                            <!-- <input type="text" id="txtIdInvoices" name="txtIdInvoices"> -->
                    </div>
                    <!-- Factura posición 3 -->
                    <div class="row list-finder pos3 hide-items">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtInvoice" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar una factura" autocomplete="off">
                                    <label for="txtInvoice">Descuento PosProyecto</label>
                                    <input type="hidden" id="txtIdInvoice" name="txtIdInvoice">
                    
                            </div>
                            <div id="listInvoice" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
                            <!-- <input type="text" id="txtIdInvoices" name="txtIdInvoices"> -->
                    </div>

                    <div class="row pos3 hide-items">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating pos5 hide-items">
                        <input id="txtCostImp" type="text" class="form-control form-control-sm text-center number required" data-mesage="Debes Agregar el precio" >
                            <label for="txtCostImp">Extras Diesel</label>
                        </div>
                        <!-- <div class="col-md-6 col-lg-6 col-xl-6 mb-2 pos5 form-floating hide-items">
                            <input id="txtPedimento" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar el numero del pedimento" style="text-transform:uppercase">
                            <label for="txtPedimento">Extras Freelance</label>
                        </div> -->
                    </div>
                   
                    <!-- Comentarios posición 4 -->
                    <div class="row  pos1 hide-items">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <textarea class="form-control form-control-sm" id="txtComments" style="height:60px; text-transform:uppercase" autocomplete="off" rows="3"></textarea>
                            <label for="txtComments">Comentarios</label>
                        </div>
                    </div>
                    <!-- Boton posición 4 -->
                        <div class="row pos1 hide-items">
                            <div class="col-md-12 mb-5">
                                <button id="btn_exchange" type="button" class="btn btn-sm btn-primary" >Agregar</button>
                            </div>
                        </div>
                </div>
                </div>


                <div class="mvst_table">
                <h1>Detalles del Proyecto</h1>
                <tr>
                    <td>
                    <label >Totales del proyecto</label>
                    <button class="bn btn-ok" id="">$1,245,350</button>
                    </td>
                        <td>
                        <input type="text" style="border: 0px solid #000000; width:15px;">
                        </td>
                    <td>
                    <label>Totales Mantenimiento</label>
                    <button class="bn btn-ok" id="">$45,350</button>
                    </td>
                        <td>
                        <input type="text" style="border: 0px solid #000000; width:15px;">
                        </td>
                    <td>
                    <label >Totales Expendables</label>
                    <button class="bn btn-ok" id="">$25,350</button>
                    </td>
                        <td>
                        <input type="text" style="border: 0px solid #000000; width:15px;">
                        </td>
                    <td>
                    <label >Diesel Extra</label>
                    <button class="bn btn-ok" id="">$25,350</button>
                    </td>
                        <td>
                        <input type="text" style="border: 0px solid #000000; width:15px;">
                        </td>
                    <td>
                    <label >Descuento a aplicar</label>
                    <button class="bn btn-ok" id="">$125,350</button>
                    </td>
                        <td>
                        <input type="text" style="border: 0px solid #000000; width:15px;">
                        </td>
                    <td>
                    <label>Totales </label>
                    <button class="bn btn-ok" id="">$1,945,350</button>
                    </td>
                </tr> 
                <td>
                    <h1></h1>
                    <table class="display compact nowrap"  id="tblExchanges">
                        <thead>
                            <tr>
                                <th style="width:  20px"></th>
                                <th style="width:  90px">SKU</th>
                                <th style="width: 250px">Producto</th>
                                <th style="width:  60px">Cantidad</th>
                                <th style="width:  60px">Status</th>
                                <th style="width: 350px">Comentarios</th>
                            </tr>
                        </thead>
                    <tbody>	
                    </tbody>
                    </table>
                </td>
                
            </div>        
      
        </div>

    </div>
    
</div>

<!-- Modal Borrar -->
<div class="modal fade" id="MoveFolioModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">Folio: <h3 class="resFolio">000000000000</h3></span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="btnPrintReport">Imprimir</button>
                    <button type="button" class="btn btn-secondary" id="btnHideModal">Cerrar</button>
                </div>
            </div>
    </div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'CloseProyect/CloseProyect.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
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
            <div class="mvst_panel">

                <div class="form-group">
                <div>
                    <h1>PRODUCTO A REGISTRAR</h1>
                </div>
                
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtTypeExchange" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona el Proyecto</option></select>
                            <label for="txtTypeExchange">Proyecto relacionado</label>
                        </div>
                    </div>

                    <!-- Almacen posición 1 -->
                    <div class="row pos1 ">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtStoreSource" class="form-select form-select-sm required"><option value="0" selected>Selecciona almacen</option></select>
                            <label for="txtStoreSource" class="form-label">Almacen</label>
                        </div>
                    </div>

                    <!-- Proveedores posición 2 
                    <div class="row pos2 ">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtSuppliers" class="form-select form-select-sm"><option value="0" selected>Selecciona proveedor</option></select>
                            <label for="txtSuppliers">Proveedores</label>
                        </div>
                    </div> -->

                    <!-- Proveedores posición 2 -->
                    <div class="row list-finder pos2 ">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtSuppliers" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar un proveedor" autocomplete="off">
                                    <label for="txtSuppliers">Proveedores</label>
                                    <input type="hidden" id="txtIdSuppliers" name="txtIdSuppliers">
                            </div>
                            <div id="listSupplier" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
                    </div>


                    <!-- Factura posición 3 
                    <div class="row pos3 ">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtInvoice" class="form-select form-select-sm"><option value="0" selected>Selecciona factura</option></select>
                            <label for="txtInvoice">Factura</label>
                        </div>
                    </div> -->

                    <!-- Factura posición 3 -->
                    <!-- <div class="row list-finder pos3 ">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtInvoice" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar una factura" autocomplete="off">
                                    <label for="txtInvoice">Factura</label>
                                    <input type="hidden" id="txtIdInvoice" name="txtIdInvoice">
                    
                            </div>
                            <div id="listInvoice" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
                            <input type="text" id="txtIdInvoices" name="txtIdInvoices">
                    </div>
 -->
                    <!-- Categoria posición 4 -->
                    <div class="row pos1">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtCategory" class="form-select form-select-sm"><option value="0" selected>Catálogo</option></select>
                            <label for="txtCategory">Catálogo</label>
                        </div>
                    </div>
                    <div class="row pos1">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtSubCategory" class="form-select form-select-sm"><option value="0" selected>Selecciona la subcategoria</option></select>
                            <label for="txtSubCategory">Subcategorias</label>
                        </div>
                    </div>
                    <!-- Productos posición 4 -->
                   <!--  <div class="row list-finder pos1">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtProducts" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar un producto" autocomplete="off">
                                    <label for="txtProducts">Productos</label>
                                    <input type="hidden" id="txtIdProducts" name="txtIdProducts">
                                    <input type="hidden" id="txtNextSerie" name="txtNextSerie">
                            </div>
                            <div id="listProducts" class="list-group list-hide">
                                <div class="list-items"></div>
                            </div>
                    </div> -->

                     <!-- Moneda posición 5 -->
                    

                    <!-- Costo,Cantidad,Serie posición 5,4 y 6 -->
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating pos6">
                            <input id="txtSerie" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la serie de productos" style="text-transform:uppercase" autocomplete="off">
                            <label for="txtSerie">Nombre del Producto</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 col-lg-6 col-xl-6 mb-2 pos4 form-floating">
                            <input id="txtQuantity" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la cantidad de productos" value=1>
                            <label for="txtQuantity">Precio asignado</label>
                        </div>
                        
                    </div>
                    <div class="row pos6">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtCoin" class="form-select form-select-sm"><option value="0" selected>Selecciona moneda</option></select>
                            <label for="txtCoin">Moneda</label>
                        </div>
                    </div>

                    <div style="height:10px;"></div> <!-- Agregar un espacio -->
                    <div>
                        <h1>DATOS DE LA SERIE</h1>
                    </div>
                    <div style="height:10px;"></div> <!-- Agregar un espacio -->

                    <!-- Marca 6 -->
                    <div class="row">
                        <div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating pos4 ">
                        <input id="txtCost" type="text" class="form-control form-control-sm text-center number required" data-mesage="Debes Agregar el precio" >
                            <label for="txtCost">Num. Serie</label>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating pos6 ">
                            <input id="txtMarca" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar la marca de productos" style="text-transform:uppercase" autocomplete="off">
                            <label for="txtMarca">Marca</label>
                        </div>
                    </div>
                    <!-- Costo Importacion,Pedimento 5,4  -->
                    <div class="row pos3 ">
                    <input type="text" id="txtPeriodProjectEdt"  name="txtPeriodProjectEdt" class="textbox wtf required" autocomplete="off">
                            <i class="fas fa-calendar-alt icoTextBox" id="calendar"></i><br>
                            <span class="textAlert"><i class="fas fa-exclamation-triangle"></i> Debes agregar las fechas del projecto</span>
                       <!--  <div class="col-md-8 col-lg-8 col-xl-8 mb-2 form-floating">
								<input id="txtPeriod" type="text" class="form-control form-control-sm text-center"  data-mesage="Debes elegir un periodo">
								<label for="txtPeriod" >Periodo</label>
						</div> -->
                        <!-- <div class="col-md-6 col-lg-6 col-xl-6 mb-2 pos5 form-floating ">
                            <input id="txtPedimento" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar el numero del pedimento" style="text-transform:uppercase">
                            <label for="txtPedimento">F. Fin Subarrendo</label>
                        </div> -->
                    </div>

                   <!-- Costo Importacion,Pedimento 5,4  -->
                   <!-- <div class="row pos3 ">
                        <div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating pos6 ">
                        <input id="txtCostTot" type="text" class="form-control form-control-sm text-center number required" data-mesage="Debes Agregar el precio" >
                            <label for="txtCostTot">Costo Total</label>
                        </div>
                        <div class="col-md-6 col-lg-6 col-xl-6 mb-2 pos6 form-floating ">
                            <input id="txtNoEco" type="text" class="form-control form-control-sm text-center number required"  data-mesage="Debes agregar el numero del pedimento" style="text-transform:uppercase">
                            <label for="txtNoEco">Num. Econo</label>
                        </div>
                    </div> -->
                    <!-- Comentarios posición 4 -->
                    <div class="row  pos1 ">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <textarea class="form-control form-control-sm" id="txtComments" style="height:60px; text-transform:uppercase" autocomplete="off" rows="3"></textarea>
                            <label for="txtComments">Comentarios</label>
                        </div>
                    </div>

                    <div style="height:10px;"></div> <!-- Agregar un espacio -->

                    <!-- Boton posición 4 -->
                        <div class="row pos1 ">
                            <div class="col-md-12 mb-5">
                                <button id="btn_exchange" type="button" class="btn btn-sm btn-primary" >Agregar</button>
                            </div>
                        </div>
                </div>
            </div>

            <div class="mvst_table">
                <h1>Listado de subarrendos no existentes</h1>
                <table class="display compact nowrap"  id="tblExchanges">
                    <thead>
                        <tr>
                            <th style="width:  20px"></th>
                            <th style="width:  80px">Sku Producto</th>
                            <th style="width: 350px">Nombre del Producto</th>
                            <th style="width: 180px">Precio de Renta</th>
                            <th style="width:  80px">Sku Serie</th>
                            <th style="width: 90px">No. Serie</th>
                            <th style="width:  60px">Marca</th>
                            <th style="width:  50px">Fecha Inicial</th>
                            <th style="width:  60px">Fecha Final</th>
                            <th style="width: 140px">Almacen</th>
                            <th style="width: 90px">Catalogo</th>
                            <th style="width: 90px">Subcategoria</th>
                            <th style="width: 180px">Proveedor</th>
                            <th style="width: 80px">Proyecto Asignado</th>
                            <th style="width: 80px">Otro</th>
                            <th style="width: 200px">Nota</th>
                        </tr>
                    </thead>
                    <tbody>	
                    </tbody>
                </table>
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
<script src="<?=  PATH_VIEWS . 'NewSublet/NewSublet.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
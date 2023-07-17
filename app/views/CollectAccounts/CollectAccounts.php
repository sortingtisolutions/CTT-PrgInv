<?php
	defined('BASEPATH') or exit('No se permite acceso directo');
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>

<!-- CUERPO DE LA PAGINA -->
<!-- Start Contenedor Listado de PRODUCTOS  -->
    <div class="container-fluid">
        <div class="contenido">
            <div class="row mvst_group">
                <div class="mvst_list tblProdMaster">
                    <div class="row rowTop">
                        <h1>Control de Cuentas x Cobrar</h1>
                        <!-- <div class="formContent">
                                <table id="tblEditProduct" style="align-content:left">
                                    <tr>
                                        <td class="concept" ><span class="reqsign">*</span> Filtro 1:</td>
                                        <td class="data">
                                            <select id="selectRowAlmacen"  name="selectRowAlmacen" >
                                                    <option value="0" selected>&nbsp;</option>
                                            </select>
                                            <label for="selectRowAlmacen" class="form-label">Almacen</label>
                                        </td>
                                        <td class="concept"><span class="reqsign">*</span> Filtro 2:</td>
                                        <td class="data">
                                            <select id="selectRowAlmacen"  name="selectRowAlmacen"  class="form-select form-select-sm" >
                                                    <option value="0" selected>&nbsp;</option>
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                        </div> -->
                        <table class="display compact nowrap"  id="tblCollets" style="min-width: 1400px">
                            <thead>
                                <tr>
                                    <th style="width:  30px">Acciones</th>
                                    <th style="width:  80px">Folio</th>
                                    <th style="width:  80px">Fecha de<br>generación</th>
                                    <th style="width: 200px">Nombre Cliente</th>
                                    <th style="width: 200px">Nombre Proyecto</th>
                                    <th style="width: 100px">Total a pagar</th>
                                    <th style="width: 100px">Total Pagado</th>
                                    <th style="width: 100px">Saldo Pendiente</th>
                                    <th style="width:  80px">Fecha limite<br>de pago</th>
                                    <th style="width:  80px">Fecha<br>Ultimo pago</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                </div>
            </div>
<!--            <div class="deep_loading">
                <div class="flash_loading"> Cargando datos...</div>
            </div>-->
        </div>
    </div>
<!-- End Contenedor Listado de PRODUCTOS  -->

<!-- Start Ventana modal AGREGA O MODIFICA PRODUCTO -->
<div class="overlay_background overlay_hide"id="ProductModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <div class="formButtons">
                <button type="button" class="btn btn-sm btn-primary" id="btn_save">Guardar</button>
            </div>
            <div class="formContent">
                <table id="tblEditProduct">
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> Nombre del producto:</td>
                        <td class="data">
                            <input type="hidden" id="txtPrdId" name="txtPrdId" >
                            <input type="text" id="txtPrdName" name="txtPrdName" class="textbox required" style="width:300px">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">&nbsp;</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> SKU:</td>
                        <td class="data">
                            <input type="text" id="txtPrdSku" name="txtPrdSku" disabled class="textbox" style="width:150px">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">SKU del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Modelo:</td>
                        <td class="data">
                            <input type="text" id="txtPrdModel" name="txtPrdModel" class="textbox" style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Modelo del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Precio:</td>
                        <td class="data">
                            <input type="text" id="txtPrdPrice" name="txtPrdPrice" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Precio de renta del producto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Código del producto:</td>
                        <td class="data">
                            <input type="text" id="txtPrdCodeProvider" name="txtPrdCodeProvider" class="textbox" style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Código del producto definido por el proveedor</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Descripción por proveedor:</td>
                        <td class="data">
                            <input type="text" id="txtPrdNameProvider" name="txtPrdCodeProvider" class="textbox" style="width:300px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Nombre descriptivo segun el proveedor</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Nombre del producto en inglés:</td>
                        <td class="data">
                            <input type="text" id="txtPrdEnglishName" name="txtPrdEnglishName" class="textbox" style="width:300px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Nombre del producto identificado en inglés</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Descripción:</td>
                        <td class="data">
                            <textarea name="txtPrdComments" id="txtPrdComments" class="textbox" style="width:300px" rows="10"></textarea>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Descripción del producto</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
<!-- End Ventana modal Iniciar Proceso de Atencion -->
<div class="modal fade" id="starToWork" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">

            <div class="row">
                <input type="hidden" class="form-control" id="txtIdProductPack" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Vas a capturar un pago para este documento?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-danger" id="btnToWork">Si, correcto</button>
                </div>
            </div>
    </div>
</div>

<!-- End Ventana modal Registrar SALIDA -->
<div class="modal fade" id="delProdModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <input type="hidden" class="form-control" id="txtIdProductPack" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Registrar salida de productos?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnDelProduct">Registrar</button>
                </div>
            </div>
    </div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'CollectAccounts/CollectAccounts.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>

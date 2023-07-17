<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- CUERPO DE LA PAGINA -->
<div class="container-fluid">
    <div class="contenido ">
        <div class="row mvst_group">

        <!-- Start Panel de control lateral -->
            <div class="mvst_panel">
                <div class="form-group">
                    
                    <div class="row">
                        <h4>Nueva subcategoria</h4>

                        <form id="formSubcategory" class="row g-3 needs-validation" novalidate>
                            <!-- Selector de categorias (catalogos) -->
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="lstCategory" class="form-select form-select-sm"  aria-label="Floating label select" data-mesage="Debes seleccionar un proyecto" required>
                                        <option value="" selected>Selecciona...</option>
                                    </select>
                                    <label for="lstCategory">Catálogo</label>
                                </div>
                            </div>

                            <!-- Selector de subcategorias -->
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="lstSubcategory" class="form-select form-select-sm" aria-label="Floating label select" data-mesage="Debes seleccionar un proyecto">
                                        <option value="" selected>Selecciona...</option>
                                    </select>
                                    <label for="lstSubcategory">Subcategorias</label>
                                </div>
                            </div>

                            <!-- Nombre de la subcategoria -->
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtSubcategory" name="txtSubcategory" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="txtSubcategory">Nombre Subcategoria</label>
                                </div>
                                <input id="txtIdSubcategory" name="txtIdSubcategory" type="hidden" class="form-control form-control-sm" >
                            </div>


                            <!-- Código de la subcategoria -->
                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
                                    <input id="txtSubcategoryCode" name="txtSubcategoryCode" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="txtSubcategoryCode">Código Subcategoria</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
                                    <input id="txtOrderPrint" name="txtOrderPrint" type="text" class="form-control form-control-sm" style="text-transform:uppercase">
                                    <label for="txtOrderPrint">Orden de Impresión</label>
                                </div>
                            </div>

                            <!-- Botones -->
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <button type="button" class="btn btn-sm btn-primary" id="btnSave">Guardar</button>
                                    <button type="button" class="btn btn-sm btn-danger"  id="btnClean">Limpiar</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        <!-- End Panel de control lateral -->

        <!-- Start Tabla de contenido -->
            <div class="mvst_table">
                <h1>Lista de Subcategorias</h1>
                <table class="display compact nowrap"  id="tblSubcategory" style="width:95%; ">
                    <thead>
                        <tr>
                            <th style="width:  40px"></th>
                            <th style="width:   0px">Id</th>
                            <th style="width:  30px">Código</th>
                            <th style="width: 300px">Nombre</th>
                            <th style="width: 200px">Catálogo</th>
                            <th style="width:  30px">Código</br>catálogo</th>
                            <th style="width:  50px">Existencias</th>
                            <th style="width:  50px">Orden de<br>Impresión</th>
                        </tr>
                    </thead>
                </table>
            </div>
        <!-- End Tabla de contenido -->
        </div>
    </div>


    <!-- Start Ventana Modal de STOCK -->
        <div class="overlay_background overlay_hide" id="ShowSerieModal">
            <div class="overlay_modal">
                <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
                <h1></h1>
                <table class="display compact nowrap"  id="tblStock">
                    <thead>
                        <tr>
                            <th style="width: 100px">SKU</th>
                            <th style="width: 300px">Descripción</th>
                            <th style="width: 150px">Serie</th>
                            <th style="width:  50px">fecha de alta</th>
                            <th style="width:  70px">Costo</th>
                            <th style="width:  50px">Clave<br>status</th>
                            <th style="width:  50px">Clave<br>etapa</th>
                            <th style="width: 400px">Comentarios</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    <!-- End Ventana Modal de STOCK -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Subcategories/Subcategories.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
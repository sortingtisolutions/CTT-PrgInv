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
                <!-- Start área de formularios -->
                <div class=" mvst_panel">
                    <div class="form-group">
                        <h4 id="titulo">Nuevo Catalogo</h4>

                        <form id="formCategoria" class="row g-3 needs-validation" novalidate>
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="NomCategoria" name="NomCategoria" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="NomCategoria">Nombre Catálogo</label>
                                </div>
                                <input id="IdCategoria" name="IdCategoria" type="hidden" >
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="numCategoria" name="numCategoria" type="number" class="form-control form-control-sm" maxlength="2" required >
                                    <label for="numCategoria">Numero al Catálogo (Id)</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectRowAlmacen"  name="selectRowAlmacen"  class="form-select form-select-sm" required>
                                            <option value="0" selected>&nbsp;</option>
                                    </select>
                                    <label for="selectRowAlmacen" class="form-label">Almacen</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectRowArea"  name="selectRowArea"  class="form-select form-select-sm" required>
                                            <option value="0" selected>&nbsp;</option>
                                    </select>
                                    <label for="selectRowArea" class="form-label">Area del catalogo</label>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-6">
                                    <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.8rem !important;" id="GuardarCategoria">Guardar</button>
                                </div>
                                <div class="col-6">
                                    <button type="button"  class="btn btn-danger btn-sm btn-block" style="font-size: 0.8rem !important;" id="LimpiarFormulario">Limpiar</button>
                                </div>
                            </div>
                            
                        </form>
                    </div>
                </div>
                <!-- End área de formularios -->

                <!-- Start área de listado -->
                <div class="mvst_table">
                    <h1>Lista de Catálogos</h1>

                    <div class="row">
                        <div class="col-12 col-md-12">		
                                <table id="CategoriasTable" class="display compact nowrap" style="width:95%" >         
                                    <thead>
                                        <tr>
                                            <th style="width: 30px"></th>
                                            <th style="width: 20px">Id</th>
                                            <th style="width: auto">Nombre</th>
                                            <th style="width: auto">Almacen</th>
                                            <th style="width: 30px">Existencias</th>
                                            <th style="width: 30px">Area</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                    </div>
                </div>
                <!-- End área de listado -->
            </div>
    </div>
</div>

<!-- Start Ventana modal EXISTENCIAS -->
    <div class="overlay_background overlay_hide" id="ExisteCatModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblCatSerie">
                <thead>
                    <tr>
                        <th style="width:  30px"></th>
                        <th style="width: 100px">SKU</th>
                        <th style="width: 250px">Descripcion</th>
                        <th style="width:  80px">Núm. serie</th>
                        <th style="width: 100px">Fecha de alta</th>
                        <th style="width:  70px">Costo</th>
                        <th style="width:  50px">Clave status</th>
                        <th style="width:  50px">Clave etapa</th>
                        <th style="width:  auto">Comentarios</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Categorias/Categorias.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
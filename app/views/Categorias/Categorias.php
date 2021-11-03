<?php 
      defined('BASEPATH') or exit('No se permite acceso directo'); 
      require ROOT . FOLDER_PATH . "/app/assets/header.php";	  
?>
<header>
    <?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
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
                                    <input id="NomCategoria" name="NomCategoria" type="text" class="form-control form-control-sm" required >
                                    <label for="NomCategoria">Nombre Catálogo</label>
                                </div>
                                <input id="IdCategoria" name="IdCategoria" type="hidden" >
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
                                <div class="col-6">
                                    <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarCategoria">Guardar</button>
                                </div>
                                <div class="col-6">
                                    <button type="button"  class="btn btn-danger btn-sm btn-block" style="font-size: 1rem !important;" id="LimpiarFormulario">Limpiar</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- End área de formularios -->

                <!-- Start área de listado -->
                <div class="mvst_table">
                    <h1>Catálogos</h1>

                    <div class="row">
                        <div class="col-12 col-md-12">		
                                <table id="CategoriasTable" class="display compact nowrap" style="width:100%" >         
                                    <thead>
                                        <tr>
                                            <th style="width: 30px"></th>
                                            <th style="width: 20px">Id</th>
                                            <th style="width: auto">Nombre</th>
                                            <th style="width: auto">Almacen</th>
                                            <th style="width: 30px">Existencias</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                    </div>
                </div>
                <!-- End área de listado -->
            </div>
            <div class="deep_loading">
                <div class="flash_loading"> Cargando datos...</div>
            </div>
    </div>
</div>

<!-- Start Ventana modal EXISTENCIAS -->
    <div class="overlay_background overlay_hide"id="ExisteCatModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblCatSerie">
                <thead>
                    <tr>
                        <th style="width:  30px"></th>
                        <th style="width: 100px">SKU</th>
                        <th style="width: 200px">Descripcion</th>
                        <th style="width:  80px">Núm. serie</th>
                        <th style="width: 120px">Fecha de alta</th>
                        <th style="width:  50px">Costo</th>
                        <th style="width:  50px">Clave status</th>
                        <th style="width:  50px">Clave etapa</th>
                        <th style="width:  auto">Comentarios</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->


<!-- Modal Borrar -->
    <div class="modal fade" id="BorrarCategoriaModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header "></div>
                    <div class="modal-body" style="padding: 0px !important;">
                        <div class="row">
                            <input hidden type="text" class="form-control" id="IdCategoriaBorrar" aria-describedby="basic-addon3">
                                <div class="col-12 text-center">
                                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                                </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="BorrarProveedor">Borrar</button>
                    </div>
                </div>
            </div>
        </div>


<!-- Modal no se puede borrar -->
    <div class="modal fade" id="NoBorrarModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header "></div>
                <div class="modal-body" style="padding: 0px !important;">
                    <div class="row">
                        <input hidden type="text" class="form-control" id="IdCategoriaBorrar" aria-describedby="basic-addon3">
                        <div class="col-12 text-center">
                            <span class="modal-title text-center" style="font-size: 1rem;" id="BorrarPerfilLabel">No se puede borrar este registro ya que contiene subcatogorias asociadas a el. </span>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>



<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Categorias/Categorias.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
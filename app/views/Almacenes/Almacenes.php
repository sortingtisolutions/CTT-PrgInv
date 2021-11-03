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


<div class="container-fluid">
    <div class="contenido">
        <div class="row mvst_group">
                <!-- Start área de formularios -->
                <div class="mvst_panel">
                    <div class="form-group">
                        <h4 id="titulo">Nuevo Almacen</h4>  
                        <form id="formProveedor" class="row g-3 needs-validation" novalidate>

                        <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="NomAlmacen" name="NomAlmacen" type="text" class="form-control form-control-sm" required>
                                    <label for="NomAlmacen">Nombre almacen</label>
                                </div>
                                <input id="IdAlmacen" name="IdAlmacen" type="hidden">
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="selectRowEncargado" name="selectRowEncargado" type="text" class="form-control form-control-sm" required>
                                    <label for="NomAlmacen">Responsable de almacen</label>
<!--								<select id="selectRowEncargado"  name="selectRowEncargado"  class="form-select form-select-sm" required>

                                    </select>
                                    <label for="selectTipoAlmacen" class="form-label">Responsable de Almacen</label> -->
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="selectTipoAlmacen"  name="selectTipoAlmacen"  class="form-select form-select-sm" required>
                                        <option id='' value="0" >Seleccione...</option>
                                        <option id='estaticos'  value='ESTATICOS'>ESTATICOS</option> 
                                        <option id='moviles'  value='MOVILES'>MOVILES</option> 
                                    </select>
                                    <label for="selectTipoAlmacen" class="form-label">Tipo de almacen</label>
                                </div>
                            </div>



                            <div class="row">
                                <div class="col-6">
                                    <button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarAlmacen">Guardar</button>
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
                    <h1>Almacenes</h1>
                    <!-- <div class="row" style="margin-bottom: 10px !important;">
                        <div class="col-md-6"></div>
                        <div class="col-12 col-md-6 text-right">
                        <button id="nuevoAlmacen" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AlmacenModal">
                            <i class="fas fa-user margin-der"> </i>   Nuevo Almacen
                        </button>
                        </div>
                    </div> -->

                    <div class="row">
                        <div class="col-12 col-md-12">		
                                <table id="AlmacenesTable" class="display compact nowrap" style="width:100%">         
                                        <thead>
                                            <tr>
                                                    <th style="width:  30px"></th>
                                                    <th style="width:  20px">Id</th>
                                                    <th style="width: 200px">Nombre</th>
                                                    <th style="width: 200px">Responsable Almacen</th>
                                                    <th style="width:  60px">Tipo</th>
                                                    <th style="width:  40px">Existencias</th>
                                            </tr>
                                        </thead>
                                        <tbody id="tablaAlmacenesRow">
                                        </tbody>
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
<!-- Modal Agregar Almacen -->
<!-- <div class="modal fade" id="AlmacenModal" tabindex="-1" aria-labelledby="AlmacenModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header" style="padding: 10px !important;">
                <button type="button" class="close" style="padding: .6rem 1rem !important;" data-bs-dismiss="modal" aria-label="Close">
                <span  aria-hidden="true">&times;</span>
                </button>  
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-12 text-center">
                        <span class="" id="PerfilModalLabel" style="font-weight: 600; font-size: 1.2rem;"><i class="fas fa-user margin-der"> </i>Nuevo Almacen:</span>
                    </div>
                </div>
                <form id="formProveedor" class="row g-3 needs-validation" novalidate>
                    <div class="row" style="width:  100% !important;">
                        <input hidden type="text" class="form-control" id="IdAlmacen" aria-describedby="basic-addon3" autocomplete="off">

                        <div class="col-12 col-espace">
                            <input name="nem" type="text" class="form-control" id="NomAlmacen"  placeholder="Nombre Almacen..." autocomplete="off" required>
                            <div class="invalid-feedback">
                                Escriba un Nombre.
                            </div>
                        </div>

                        <div class="col-12 col-espace">
                            <div class="input-group">
                                <select class="custom-select" id="selectTipoAlmacen" required>
                                    <option id='0'  value='0'>Seleccione un tipo...</option> 
                                    <option id='estaticos'  value=''>Estatico</option> 
                                    <option id='moviles'  value=''>Movil</option> 
                                </select>
                                <div class="invalid-feedback">
                                    Seleccione un tipo.
                                </div>
                            </div>
                        </div>

                    </div>
                </form>
                <div>
                    <div class="modal-footer">
                        <div class="col-12" style="padding: 0px 70px 0px 70px !important;">
                            <button type="button"  class="btn btn-primary btn-lg btn-block" style="font-size: 1rem !important;" id="GuardarAlmacen">Guardar Almacen</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div> -->

<!-- Start Ventana modal que muestra las EXISTENCIAS por serie -->
<div class="overlay_background overlay_hide"id="ExisteStrModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblStrSerie">
                <thead>
                    <tr>
                        <th style="width:  30px"></th>
                        <th style="width: 100px">SKU</th>
                        <th style="width:  80px">Núm. serie</th>
                        <th style="width: 120px">Fecha de alta</th>
                        <th style="width:  50px">Costo</th>
                        <th style="width:  50px">Clave status</th>
                        <th style="width:  50px">Clave etapa</th>
                        <th style="width: 350px">Comentarios</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->

<!-- Modal Borrar -->
    <div class="modal fade" id="BorrarAlmacenModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header "></div>
                <div class="modal-body" style="padding: 0px !important;">
                    <div class="row">
                        <input hidden type="text" class="form-control" id="IdAlmacenBorrar" aria-describedby="basic-addon3">
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
        </div>
    </div>

<!-- Modal no se puede borrar -->
    <div class="modal fade" id="NoBorrarModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header"></div>
                <div class="modal-body" style="padding: 0px !important;">
                    <div class="row">
                        <input hidden type="text" class="form-control" id="IdCategoriaBorrar" aria-describedby="basic-addon3">
                        <div class="col-12 text-center">
                            <span class="modal-title text-center" style="font-size: 1rem;" id="BorrarPerfilLabel">No se puede borrar este registro ya que contiene excistencias asociadas a el. </span>
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
<script src="<?=  PATH_VIEWS . 'Almacenes/Almacenes.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
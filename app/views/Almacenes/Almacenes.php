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
<!-- Comentario prueba 2 -->
<!-- CUERPO DE LA PAGINA -->
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
                                    <input id="NomAlmacen" name="NomAlmacen" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required>
                                    <label for="NomAlmacen">Nombre almacen</label>
                                </div>
                                <input id="IdAlmacen" name="IdAlmacen" type="hidden">
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="selectRowEncargado" name="selectRowEncargado" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required>
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
                    <h1>Lista de Almacenes</h1>
                    
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
           
    </div>
    
</div>


<!-- Start Ventana modal que muestra las EXISTENCIAS por serie -->
<div class="overlay_background overlay_hide"id="ExisteStrModal" style="width:60%">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblStrSerie" style="width:100%">
                <thead>
                    <tr>
                        <th style="width:  10px"></th>
                        <th style="width:  60px">SKU</th>
                        <th style="width:  220px">Descripción</th>
                        <th style="width:  60px">Cantidades</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Almacenes/Almacenes.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
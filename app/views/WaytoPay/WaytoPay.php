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
            <div class="mvst_panel" style="background-color: #5F9EAB" >
                <div class="form-group">
                    
                    <div class="row">
                        <h4>Nueva Forma de Pago</h4>

                        <form id="formSubcategory" class="row g-3 needs-validation" novalidate>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtWtpDescription" name="txtWtpDescription" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="txtWtpDescription">Descripcion</label>
                                </div>
                                <input id="txtIdSubcategory" name="txtIdSubcategory" type="hidden" class="form-control form-control-sm" >
                            </div>
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtWtpCve" name="txtWtpCve" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="txtWtpCve">Clave corta</label>
                                </div>
                                <input id="txtIdSubcategory" name="txtIdSubcategory" type="hidden" class="form-control form-control-sm" >
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtWtpStatus" name="txtWtpStatus" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="txtWtpStatus">Estatus</label>
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
                <h1>Lista de Formas de Pago</h1>
                <table class="display compact nowrap"  id="tblSubcategory" style="width:850px; ">
                    <thead>
                        <tr>
                            <th style="width:  40px"></th>
                            <th style="width:  30px">Clave <br>simplificada</th>
                            <th style="width: 300px">Descripcion</th>
                            <th style="width:  30px">Estatus</br>1-Activo/0-Inactivo</th>
                        </tr>
                    </thead>
                </table>
            </div>
        <!-- End Tabla de contenido -->

        </div>
    </div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'WaytoPay/WaytoPay.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
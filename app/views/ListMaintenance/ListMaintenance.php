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
            <div class="mvst_panel" style="background-color: #e2edf3" >
                <div class="form-group">
                    <div class="row">
                        <h4>Motivos de Mantenimiento</h4>

                        <form id="formSubcategory" class="row g-3 needs-validation" novalidate>
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtCrDefinition" name="txtCrDefinition" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="txtCrDefinition">Motivo</label>
                                </div>
                                <input id="txtIdDefinition" name="txtIdDefinition" type="hidden" class="form-control form-control-sm" >
                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtCrDescription" name="txtCrDescription" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
                                    <label for="txtCrDescription">Descripcion</label>
                                </div>
                                <!-- <input id="txtIdSubcategory" name="txtIdSubcategory" type="hidden" class="form-control form-control-sm" > -->
                            </div>
                           
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtCodMotivos" name="txtCodMotivos" type="text" class="form-control form-control-sm"  maxlength="2">
                                    <label for="txtCodMotivos">Codigo asignado a la etapa</label>
                                </div>
                                <!-- <input id="txtIdSubcategory" name="txtIdSubcategory" type="hidden" class="form-control form-control-sm" > -->
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
            <div class="mvst_table" style="width:100%">
                <h1>Lista de conceptos para mantenimiento</h1>
                <table class="display compact nowrap"  id="tblReasonChange" style="width:85%">
                    <thead>
                        <tr>
                            <th style="width:  40px"></th>
                            <th style="width:  50px">Motivo</th>
                            <th style="width: 300px">Descripción</th>
                            <th style="width:  50px">Codigo <br>Etapa</th>
                        </tr>
                    </thead>
                </table>
            </div>
        <!-- End Tabla de contenido -->
        </div>
    </div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ListMaintenance/ListMaintenance.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
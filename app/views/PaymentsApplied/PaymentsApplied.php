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
                        <h4>Busqueda de Pagos</h4>

                        <form id="formSubcategory" class="row g-3 needs-validation" novalidate>

                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <select id="lstProjects" class="form-select form-select-sm" aria-label="Floating label select" data-mesage="Debes seleccionar un proyecto">
                                        <option value="" selected>Selecciona...</option>
                                    </select>
                                    <label for="lstProjects">Proyectos</label>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <button type="button" class="btn btn-sm btn-primary" id="btnSave">Buscar</button>
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
                <h1>Lista de Pagos Aplicados</h1>
                <table class="display compact nowrap"  id="tblPymApplied" style="width:850px; ">
                    <thead>
                        <tr>
                            <!-- <th style="width:  40px"></th> -->
                            <th style="width: 200px">Proyecto</th>
                            <th style="width:  80px">Referencia <br>de pago</th>
                            <th style="width: 100px">Monto Pagado</th>
                            <th style="width: 90px">Fecha del Pago</th>
                            <th style="width: 90px">Fecha registado</th>
                            <th style="width: 90px">Forma <br>de Pago</th>
                        </tr>
                    </thead>
                </table>
            </div>
        <!-- End Tabla de contenido -->
        </div>
    </div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'PaymentsApplied/PaymentsApplied.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
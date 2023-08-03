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
                        <h1>Seleccion de Proyecto para registro de Entrada</h1>
                        
                     </div>
                    <table class="display compact nowrap"  id="tblProyects" style="min-width: 1000px">
                        <thead>
                            <tr>
                                <th style="width:  30px">Acciones</th>
                                <th style="width: 200px">Nombre Proyecto</th>
                                <th style="width:  60px">No. Proyecto</th>
                                <th style="width: 100px">Tipo Proyecto</th>
                                <th style="width:  40px">Fecha Inicio</th>
                                <th style="width:  40px">Fecha Final</th>
                                <!-- <th style="width:  60px">Hora <br>ultimo cambio</th>
                                <th style="width: 150px">Locacion</th> -->
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
                    <span class="modal-title text-center" style="font-size: 1.0rem;" id="BorrarPerfilLabel">¿Inicia registro de entrada del proyecto?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnToWork">Iniciar</button>
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
                    <span class="modal-title text-center" style="font-size: 1.0rem;" id="BorrarPerfilLabel">¿Registrar Entrada de productos?</span>
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
<script src="<?=  PATH_VIEWS . 'WorkInput/WorkInput.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>

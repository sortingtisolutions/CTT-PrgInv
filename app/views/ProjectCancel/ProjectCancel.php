<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>



<!-- Start Contenedor Listado de PROYECTOS  -->
<div class="container-fluid">
        <div class="contenido">
            <div class="row mvst_group">
                <div class="mvst_list tblProjMaster">
                    
                    <div class="row rowTop">
                        <h1>cancelacion de proyectos</h1>
                    </div>
                    <div id="dvProjects"></div>
                    <table class="display compact nowrap"  id="tblProjects" style="min-width: 750px">
                        <thead>
                            <tr>
                                <th style="width:  40px"></th>
                                <th style="width:  50px">Número</th>
                                <th style="width: 200px">Nombre del proyecto</th>
                                <th style="width:  70px">Fecha de<br>registro</th>
                                <th style="width:  70px">Fecha de<br>inicio</th>
                                <th style="width:  70px">Fecha de<br>término</th>
                                <th style="width: 250px">Cliente</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
<!-- End Contenedor Listado de PRODUCTOS  -->


<!-- Modal Borrar -->
<!-- <div class="modal fade" id="cancelProjectModal" tabindex="-1" aria-labelledby="cancelProjectModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header "></div>
                    <div class="modal-body" style="padding: 0px !important;">
                        <div class="row">
                            <input hidden type="text" class="form-control" id="IdCategoriaBorrar" aria-describedby="basic-addon3">
                                <div class="col-12 text-center">
                                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea cancelarlo?</span>
                                </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No cancelar</button>
                        <button type="button" class="btn btn-danger" id="cancelProjectButton">Cancelar proyecto</button>
                    </div>
                </div>
            </div>
        </div> -->





<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProjectCancel/ProjectCancel.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
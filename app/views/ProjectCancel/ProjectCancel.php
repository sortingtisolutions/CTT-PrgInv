<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- CUERPO DE LA PAGINA -->
<!-- Start Contenedor Listado de PROYECTOS  -->
<div class="container-fluid">
        <div class="contenido">
            <div class="row mvst_group">
                <div class="mvst_list tblProjMaster">
                    
                    <div class="row rowTop">
                        <h1>cancelacion de proyectos</h1>
                    </div>
                    <div id="dvProjects"></div>
                    <table class="display compact nowrap"  id="tblProjects" style="min-width: 950px">
                        <thead>
                            <tr>
                                <th style="width:  40px"></th>
                                <th style="width:  50px">Número de<br>proyecto</th>
                                <th style="width: 200px">Nombre del proyecto</th>
                                <th style="width: 100px">Tipo de proyecto</th>
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

    <!-- Fondo obscuro -->
    <div class="invoice__modalBackgound"></div>

    <!-- loading -->
    <div class="invoice__loading modalLoading">
        <div class="box_loading">
            <p class="text_loading"><span>

            </span>
                <br>
                <i class="fas fa-spinner spin"></i> 
                </p>
            <p>Este proceso puede tardar varios minutos, le recomendamos no salir de la página ni cerrar el navegador.</p>
        </div>
     </div>


<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProjectCancel/ProjectCancel.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
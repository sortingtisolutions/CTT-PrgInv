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
            <div class="mvst_panel" style="width:280px; background-color: #e2edf3">
                <div class="form-group">
                    <div class="form_primary">
                        <h4 class="mainTitle">Usuarios de los Proyectos</h4>

						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtProjectName" type="text" class="form-control form-control-sm" style="font-size:10px; background:#EAEDED">
                                <label for="txtProjectName">Nombre del Proyecto</label>
                            </div>
                        </div>

                        <div style="height:15px;"></div> <!-- Agregar un espacio -->
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="selUsrP"  name="selUsrP"  class="form-select form-select-sm">
                                    <option value="0">Selecciona Usuario</option>
                                </select>
                                <label for="selUsrP" class="form-label">Analista CTT</label>
                            </div>
                        </div>
                        
                        <div style="height:15px;"></div> <!-- Agregar un espacio -->
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="selUsrC"  name="selUsrC"  class="form-select form-select-sm">
                                    <option value="0">Selecciona Usuario</option>
                                </select>
                                <label for="selUsrC" class="form-label">Atiende Camara</label>
                            </div>
                        </div>

                        <div style="height:15px;"></div> <!-- Agregar un espacio -->
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="selUsrA"  name="selUsrA"  class="form-select form-select-sm">
                                    <option value="0">Selecciona Usuario</option>
                                </select>
                                <label for="selUsrA" class="form-label">Atiende Almacen</label>
                            </div>
                        </div>
                    </div>  <!-- form_primary -->
                    <div style="height:15px;"></div> <!-- Agregar un espacio -->

                    <!-- BOTON PARA REGISTRAR LA SALIDA -->
                    <div class="row">
                            <div class="col">
                                <button type="button" class="btn btn-primary btn-sm btn-block" style="font-size: 0.8rem !important;" id="recordChgUser">Actualizar</button>
                            </div>
                            <div class="col">
                                <button type="button" class="btn btn-danger btn-sm btn-block" style="font-size: 0.8rem !important;" id="cleanForm">Limpiar</button>
                            </div>
                    </div>
                </div>
            </div>

<!-- Tabla para presentar los contenidos del proyecto -->
            <div class="mvst_table">
                <h1>Selección de Proyectos</h1>
                <div class="mvst_list tblProdMaster">
                        <table class="display nowrap"  id="tblAsignedProd" style="width:100%; font-size: 0.7rem">
                            <thead>
                                <tr >
                                    <th style="width:  20px"></th>
                                    <th style="width:  200px">Nombre Proyecto</th>
                                    <th style="width:  80px">No. Proyecto</th>
									<th style="width:  80px">Tipo Proyecto</th>
                                    <th style="width:  70px">Fecha Inicio</th>
                                    <th style="width:  70px">Fecha Fin</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Boton para confirmar actualizacion de usuarios -->
<div class="modal fade" id="starClosure" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">
            
            <div class="row">
                <input type="hidden" class="form-control" id="txtIdClosure" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Estas seguro de actualizar usuarios?</span>
                </div>
            </div>
            
            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                    <button type="button" class="btn btn-danger" id="btnClosure">Si</button>
                </div>
            </div>
    </div>
</div>

<!-- Modal para imprimir folio de salida -->
<div class="modal fade" id="MoveFolioModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">

            <div class="row">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">Folio: <h3 class="resFolio">000000000000</h3></span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <!-- <button type="button" class="btn btn-primary" id="btnPrintReport">Imprimir</button> -->
                    <button type="button" class="btn btn-secondary" id="btnHideModal">Cerrar</button>
                </div>
            </div>
    </div>
</div>

<!-- Fondo obscuro -->
<div class="invoice__modalBackgound"></div>

<!-- loading -->
<div class="invoice__loading modalLoading">
        <div class="box_loading">
            <p class="text_loading">
                Registrando Salida de Proyecto<br>
                <i class="fas fa-spinner spin"></i> 
                </p>
            <p>Se estan actualizando los registros del proyecto, este proceso puede tardar varios minutos</p>
        </div>
    </div>
<!-- end -->

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'AssignProjects/AssignProjects.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>

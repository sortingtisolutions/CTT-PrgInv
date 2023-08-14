<?php 
    defined('BASEPATH') or exit('No se permite acceso directo'); 
    require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
    <?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- Comentario prueba 3 -->
<!-- CUERPO DE LA PAGINA -->
<div class="container-fluid">
    <div class="contenido">
        <div class="row mvst_group">
            <div class="mvst_panel">

                <div class="form-group">
                <div>
                    <h1>PRODUCTO A REGISTRAR</h1>
                </div>
                
                    <div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<select id="txtProject" class="form-select form-select-sm " aria-label="Floating label select" data-mesage="Debes seleccionar un proyecto">
								<option value="0" selected>Selecciona proyecto</option>
							</select>
							<label for="txtProject">Proyecto</label>
						</div>
					</div>
                    
                    <hr>
                    <!-- Categoria posición 4 -->
                    <input id="txtIdAssign" name="txtIdAssign" type="hidden"  class="form-control form-control-sm" style="text-transform: uppercase" >
                    <div class="row pos1 ">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtArea" class="form-select form-select-sm"><option value="0" selected>Selecciona el area</option></select>
                            <label for="txtArea">Area</label>
                        </div>
                    </div>
                    <div class="row pos1">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtFreelance" class="form-select form-select-sm"><option value='0' selected>Selecciona el freelance</option></select>
                            <label for="txtFreelance">Freelance</label>
                        </div>
                    </div>
                    
                    <div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<input id="txtFechaAdmision" name="txtFechaAdmision" type="date"  class="form-control form-control-sm" style="text-transform: uppercase" >
							<label for="txtFechaAdmision">Fecha de Admision</label>
						</div>
					</div>
                    <div class="row">
						<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
							<input id="txtFechaFinalizacion" name="txtFechaFinalizacion" type="date"  class="form-control form-control-sm" style="text-transform: uppercase" >
							<label for="txtFechaFinalizacion">Fecha de Finalizacion</label>
						</div>
					</div>
                    <!-- Comentarios posición 4 -->
                    <div class="row  pos1 ">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <textarea class="form-control form-control-sm" id="txtComments" style="height:60px; text-transform:uppercase" autocomplete="off" rows="3"></textarea>
                            <label for="txtComments">Comentarios</label>
                        </div>
                    </div>

                    <div style="height:10px;"></div> <!-- Agregar un espacio -->

                    <!-- Boton posición 4 -->
                        <div class="row pos1 ">
                            <div class="col-md-12 mb-5">
                                <button id="btn_guardar" type="button" class="btn btn-sm btn-primary" >Guardar</button>
                            </div>
                        </div>
                </div>
            </div>

            <div class="mvst_table">
                <h1>Asignacion de freelance</h1>
                <table class="display compact nowrap"  id="tblExchanges">
                    <thead>
                        <tr>
                            <th style="width:  20px"></th>
                            <th style="width: 200px">Nombre del Proyecto</th>
                            <th style="width: 200px">Nombre del Freelance</th>
                            <th style="width:  80px">Area</th>
                            <th style="width: 60px">Fecha de asignacion</th>
                            <th style="width:  60px">Fecha de Finalizacion</th>
                            <th style="width: 200px">Comentarios</th>
                        </tr>
                    </thead>
                    <tbody>	</tbody>
                </table>
            </div>        
        </div>

    </div>
</div>

<!-- Modal Borrar -->
<div class="modal fade" id="MoveResultModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">

            <div class="row">
                <div class="col-12 text-center">
                    <!--<span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">Folio: <h3 class="resFolio">000000000000</h3></span>-->
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¡Freelances asignados en proyecto exitosamente!</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <!--<button type="button" class="btn btn-primary" id="btnPrintReport">Imprimir</button>-->
                    <button type="button" class="btn btn-secondary" id="btnHideModal">Cerrar</button>
                </div>
            </div>
    </div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'AssignFreelance/AssignFreelance.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
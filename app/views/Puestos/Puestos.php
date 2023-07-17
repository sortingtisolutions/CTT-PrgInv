<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";	  
?>
<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<div class="container-fluid">
	<div class="contenido">
		<div class="row mvst_group">
				<!-- Start área de formularios -->
				<div class="mvst_panel" style="width:300px; background-color: #f8f2e2">
					<div class="form-group">
						<h4 id="titulo">Nuevo Puesto</h4> 
						 
						<form id="formPuestos" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="IdPuesto" name="IdPuesto" type="text" class="form-control form-control-sm" >
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomPuesto" name="NomPuesto" type="text" class="form-control form-control-sm" required >
									<label for="NomPuesto">Nombre Puesto</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="DesPuesto" name="DesPuesto" type="text" class="form-control form-control-sm" required >
									<label for="DesPuesto">Descripcion Puesto</label>
								</div>
							</div>

							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarPuesto">Guardar</button>
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
					<h1>Puestos</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="PuestoTable" class="display nowrap" style="width:90%">         
										<thead>
											<tr>
												<th style="width: 20px"></th>
												<th style="width: 20px">Id</th>
												<th style="width: 100px">Nombre</th>
                                       			<th style="width: 200px">Descripcion</th>
											</tr>
										</thead>
										<tbody id="tablaPuestoRow">
										</tbody>
									</table>
							</div>
					</div>
				</div>
				<!-- End área de listado -->
			</div>
	</div>
</div>


<!-- Modal Borrar -->
<div class="modal fade" id="BorrarPuestoModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdPuestoBorrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
						  </div>
					 </div>

					 </div>
						  <div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-danger" id="BorrarPuesto">Borrar</button>
						  </div>
					 </div>
				</div>
		</div>


</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Puestos/Puestos.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
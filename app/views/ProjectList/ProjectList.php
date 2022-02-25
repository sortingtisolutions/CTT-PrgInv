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
				<div class="mvst_panel">
					<div class="form-group">
						<h4 id="titulo">Cambios en Proyectos</h4>  
						<form id="formProveedor" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="IdProveedor" name="IdProveedor" type="text" class="form-control form-control-sm" >
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomProveedor" name="NomProveedor" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
									<label for="NomProveedor">Nombre de Proyecto</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="ContactoProveedor" name="ContactoProveedor" type="text" class="form-control form-control-sm" style="text-transform:uppercase">
									<label for="ContactoProveedor">Locacion de Proyecto</label>
								</div>
							</div>

					<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowTipoProveedor"  name="selectRowTipoProveedor"  class="form-select form-select-sm" autocomplete="off" required >
									</select>
									<label for="selectRowTipoProveedor" class="form-label">Cliente asociado al Proyecto</label>
								</div>
							</div>
					<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowTipoProveedor"  name="selectRowTipoProveedor"  class="form-select form-select-sm" autocomplete="off" required >
									</select>
									<label for="selectRowTipoProveedor" class="form-label">Tipo de Proyecto</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="EmailProveedor" name="EmailProveedor" type="text" class="form-control form-control-sm">
									<label for="EmailProveedor">Cliente asociado al Proyecto</label>
								</div>
							</div>


                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="RfcProveedor" name="RfcProveedor" type="text" class="form-control form-control-sm" style="text-transform:uppercase">
									<label for="RfcProveedor">Tipo de Proyecto</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="PhoneProveedor" name="PhoneProveedor" type="text" class="form-control form-control-sm" maxlength="13" required>
									<label for="PhoneProveedor">	</label>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowTipoProveedor"  name="selectRowTipoProveedor"  class="form-select form-select-sm" autocomplete="off" required >
									</select>
									<label for="selectRowTipoProveedor" class="form-label"></label>
								</div>
							</div>
							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="GuardarUsuario">Guardar</button>
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
					<h1>Proyectos Aprobados</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="ProveedoresTable" class="display  display compact nowrap" style="width:120%">         
										<thead>
											<tr>
													<th style="width: 30px"></th>
													<th style="width: 20px" hidden>Id</th>
													<th style="width: 300px">Nombre Proyecto</th>
													<th style="width: 100px" hidden>proyecto Id</th>

													<th style="width: 90px">Numero de Proyecto</th>

													<th style="width: 100px">Tipo de <br>Proyecto</th>
													<th style="width: 300px">Cliente</th>
													<th style="width: 300px">Locacion</th>
													<th style="width: 100px">Tipo Documento</th>

											</tr>
										</thead>
										<tbody id="tablaProveedoresRow">
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
<div class="modal fade" id="BorrarProveedorModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdProveedorBorrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
						  </div>
					 </div>

					 </div>
						  <div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-danger" id="BorrarProveedor">Borrar</button>
						  </div>
					 </div>
				</div>
		</div>


</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProjectList/ProjectList.js' ?>"></script>
<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
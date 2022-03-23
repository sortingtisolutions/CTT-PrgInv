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
						<h4 id="titulo">Actualización de Proyectos</h4>  
						<form id="formProjectsList" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="IdProjectsList" name="IdProjectsList" type="text" class="form-control form-control-sm" >
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomProjectsList" name="NomProjectsList" type="text" class="form-control form-control-sm" style="text-transform:uppercase" required >
									<label for="NomProjectsList">Nombre de Proyecto</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="ContactoProjectsList" name="ContactoProjectsList" type="text" class="form-control form-control-sm" style="text-transform:uppercase">
									<label for="ContactoProjectsList">Locacion (domicilio)</label>
								</div>
							</div>

					<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowTipoProjects"  name="selectRowTipoProjects"  class="form-select form-select-sm" autocomplete="off" required >
									</select>
									<label for="selectRowTipoProjects" class="form-label">Tipo de Proyecto</label>
								</div>
							</div>
					<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowTipoLocations"  name="selectRowTipoLocations"  class="form-select form-select-sm" autocomplete="off">
									</select>
									<label for="selectRowTipoLocations" class="form-label">Tipo de Locacion</label>
								</div>
							</div>
					<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowCustomers"  name="selectRowCustomers"  class="form-select form-select-sm" autocomplete="off">
									</select>
									<label for="selectRowCustomers" class="form-label">Casa Productora</label>
								</div>
							</div>
					<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowRelation"  name="selectRowRelation"  class="form-select form-select-sm" autocomplete="off">
									</select>
									<label for="selectRowRelation" class="form-label">Relacion con:</label>
								</div>
							</div>

 <!--                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="EmailProveedor" name="EmailProveedor" type="text" class="form-control form-control-sm">
									<label for="EmailProveedor">Email Proyecto</label>
								</div>
							</div>


                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="RfcProveedor" name="RfcProveedor" type="text" class="form-control form-control-sm" style="text-transform:uppercase">
									<label for="RfcProveedor">RFC Proyecto</label>
								</div>
							</div>

                     <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="PhoneProveedor" name="PhoneProveedor" type="text" class="form-control form-control-sm" maxlength="13" required>
									<label for="PhoneProveedor">Telefono Proyecto</label>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowTipoProjectsList"  name="selectRowTipoProjectsList"  class="form-select form-select-sm" autocomplete="off" required >
									</select>
									<label for="selectRowTipoProjectsList" class="form-label">Tipo de Proyecto</label>
								</div>
							</div>
 -->

							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: .8rem !important;" id="GuardarUsuario">Guardar</button>
								</div>
								<!-- <div class="col-6">
									<button type="button"  class="btn btn-danger btn-sm btn-block" style="font-size: 1rem !important;" id="LimpiarFormulario">Limpiar</button>
								</div> -->
							</div>
						</form>
					</div>
				</div>
				<!-- End área de formularios -->

				<!-- Start área de listado -->
				<div class="mvst_table">
					<h1>Lista de Proyectos</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="ProjectsListTable" class="display  display compact nowrap" style="width:160%">         
										<thead>
											<tr>
													<th style="width: 20px"></th>
													<th style="width: 20px" hidden>Id</th>
													<th style="width: 250px">Nombre de Proyecto</th>
													<th style="width: 50px">Numero </th>
													<th style="width: 250px">Domicilio de la Locación</th>
													<th style="width: 10px" hidden>Tipo Proyecto Id</th>
													<th style="width: 80px">Tipo Proyecto</th>
													<th style="width: 100px">Tipo Locacion</th>
													<th style="width: 200px">Casa Productora</th>
													<th style="width: 200px">Productor</th>
													<th style="width: 50px">Estatus del<br> Proyecto</th>
											</tr>
										</thead>
										<tbody id="tablaProjectsListRow">
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
<div class="modal fade" id="BorrarProjectsListModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdProjectsListBorrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
						  </div>
					 </div>

					 </div>
						  <div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-danger" id="BorrarProjectsList">Borrar</button>
						  </div>
					 </div>
				</div>
		</div>


</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProjectsList/ProjectsList.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
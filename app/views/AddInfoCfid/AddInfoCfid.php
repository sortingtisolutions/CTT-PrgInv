<?php 
  	defined('BASEPATH') or exit('No se permite acceso directo'); 
	  require ROOT . FOLDER_PATH . "/app/assets/header.php";	  
?>
<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- comentario prueba -->
<!-- CUERPO DE LA PAGINA -->
<div class="container-fluid">
	<div class="contenido">
		<div class="row mvst_group">
				<!-- Start área de formularios -->
				<div class="mvst_panel" style="width:280px; background-color: #f3e8e8"> 
					<div class="form-group">
						<h5 id="titulo">Datos Complementarios</h4>  
						<form id="formProveedor" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="IdProject" name="IdProject" type="text" class="form-control form-control-sm" >
								</div>
							</div>

							<div class="row">
								<div class="col-md-6 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomProject" name="NomProject" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off" required >
									<label for="NomProject">Nombre Proyecto</label>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="txtDistance" name="txtDistance" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off" >
									<label for="txtDistance">Distancia en Km</label>
								</div>
							</div>
							
					 		<div class="row">
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<select id="transporteCtt" name="transporteCtt" class="form-select form-select-sm" style="text-transform:uppercase" autocomplete="off" >
									<option value="" selected></option>
									<option value="Si"> Si</option>
                                	<option value="No"> No</option>
									</select>
									<label for="transporteCtt" class="form-label">Transporte CTT </label>
								</div>
							</div>
							
                     		<div class="row pos1 hide-items">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="txtOperaMov" name="txtOperaMov" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="txtOperaMov">Operador Movil</label>
								</div>
							</div>
							
                     		<div class="row pos1 hide-items">
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="txtOperaUnid" name="txtOperaUnid" type="text" class="form-control form-control-sm" maxlength="13" style="text-transform:uppercase" autocomplete="off" >
									<label for="txtOperaUnid">Unidad Movil</label>
								</div>
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="txtPlacas" name="txtPlacas" type="text" class="form-control form-control-sm" maxlength="8" style="text-transform:uppercase" autocomplete="off">
									<label for="txtPlacas">Placas</label>
								</div>
							</div>
							
							<div class="row">
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="txtPermFed" name="txtPermFed" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="txtPermFed">Permiso Fed</label>
								</div>
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="txtQuantity" name="txtQuantity" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="txtQuantity">Cantidad</label>
								</div>
							</div>
							
							<div style="height:5px;"></div> 
							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.7rem !important;" id="GuardarCFDI">Guardar</button>
								</div>
								<div class="col-6">
									<button type="button"  class="btn btn-danger btn-sm btn-block" style="font-size: 0.7rem !important;" id="LimpiarFormulario">Limpiar</button>
								</div>
							</div>
							
						</form>
					</div>
				</div>
				<!-- End área de formularios -->

				<!-- Start área de listado -->
				<div class="mvst_table">
					<h1>Datos Actuales del CFDI x Proyecto</h1>
					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="tblProjectCfdi" class="display compact nowrap" style="width:1800px">         
									<thead>
										<tr>
											<th style="width: 30px"></th>
											<th style="width: 250px">Nombre Proyecto</th>
											<th style="width: 80px">No. Proyecto</th>
											<th style="width: 150px">Tipo Proyecto</th>
											<th style="width: 250px">Nombre Cliente</th>
											<th style="width: 80px">RFC</th>
											<th style="width: 80px">Telefono cliente</th>
											<th style="width: 350px">Domicilio Cliente</th>
											<th style="width: 50px">Email Cliente</th>	
											<th style="width: 50px">Cve Cliente</th>
											<th style="width: 250px">Nombre Contacto</th>
											<th style="width: 80px">Telefono Contacto</th>
											<th style="width: 300px">Direccion de Entrega</th>
											<th style="width: 80px">Fecha de Proyecto</th>
											<th style="width: 100px">Distancia</th>
											<th style="width: 100px">Transporte CTT</th>
											<th style="width: 100px">Operador Movil</th>
											<th style="width: 100px">Unidad Movil</th>
											<th style="width: 80px">Placas</th>
											<th style="width: 100px">Permiso Fed.</th>
											<th style="width: 50px">Cantidad Equipos</th>
										</tr>
									</thead>
									<tbody>
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
						  <input hidden type="text" class="form-control" id="IdProjectBorrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1.0rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
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

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'AddInfoCfid/AddInfoCfid.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
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
				<!-- Start área de formularios -->
				<div class="mvst_panel">
					<div class="form-group">
						<h5 id="titulo">Nuevo Proveedor</h4>  
						
						<form id="formProveedor" class="row g-3 needs-validation" novalidate>

							<div class="row" hidden>
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="IdProveedor" name="IdProveedor" type="text" class="form-control form-control-sm" >
								</div>
							</div>

							<div class="row">
								<div class="col-md-6 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomProveedor" name="NomProveedor" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off" required >
									<label for="NomProveedor">Nombre Provedor</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="NomComercial" name="NomComercial" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off" required >
									<label for="NomComercial">Nombre Comercial</label>
								</div>
							</div>
                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="ContactoProveedor" name="ContactoProveedor" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="ContactoProveedor">Contacto Responsable</label>
								</div>
							</div>
					 		<div class="row">
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="RfcProveedor" name="RfcProveedor" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="RfcProveedor">RFC</label>
								</div>
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<select id="selectConstancia" name="selectConstancia" class="form-select form-select-sm" autocomplete="off" >
									</select>
									<label for="selectConstancia" class="form-label">Constancia </label>
								</div>
							</div>
                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="EmailProveedor" name="EmailProveedor" type="text" class="form-control form-control-sm" autocomplete="off">
									<label for="EmailProveedor">Email Provedor</label>
								</div>
							</div>

                     		<div class="row">
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="PhoneProveedor" name="PhoneProveedor" type="text" class="form-control form-control-sm" maxlength="13" autocomplete="off" required>
									<label for="PhoneProveedor">Telefono Principal</label>
								</div>
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="PhoneAdicional" name="PhoneAdicional" type="text" class="form-control form-control-sm" maxlength="13" autocomplete="off">
									<label for="PhoneAdicional">Telefono Adicional</label>
								</div>
							</div>
					 <!-- <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="PhoneProveedor" name="PhoneProveedor" type="text" class="form-control form-control-sm" maxlength="13" required>
									<label for="PhoneProveedor">Telefono Adicional</label>
								</div>
							</div> -->

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectRowTipoProveedor" name="selectRowTipoProveedor" class="form-select form-select-sm" autocomplete="off" required >
									</select>
									<label for="selectRowTipoProveedor" class="form-label">Tipo Proveedor</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<select id="selectAnticipo" name="selectAnticipo" class="form-select form-select-sm" autocomplete="off" >
									</select>
									<label for="selectAnticipo" class="form-label">Anticipo s/n</label>
								</div>
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="MontoAnticipo" name="MontoAnticipo" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="MontoAnticipo">Monto Anticipo</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="ProveInternacional" name="ProveInternacional" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="ProveInternacional">Id Provedor Internacional</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="DatoDescripcion" name="DatoDescripcion" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off" >
									<label for="DatoDescripcion">Descripcion</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-4 col-lg-4 col-xl-4 mb-2 form-floating">
									<select id="selectCredito" name="selectCredito" class="form-select form-select-sm" autocomplete="off" >
									</select>
									<label for="selectCredito" class="form-label">Credito s/n</label>
								</div>
								<div class="col-md-4 col-lg-4 col-xl-4 mb-2 form-floating">
									<input id="DiasCredito" name="DiasCredito" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="DiasCredito">Dias</label>
								</div>
								<div class="col-md-4 col-lg-4 col-xl-4 mb-2 form-floating">
									<input id="MontoCredito" name="MontoCredito" type="text" class="form-control form-control-sm" style="text-transform:uppercase" autocomplete="off">
									<label for="MontoCredito">$ Credito</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="selectFormaPago" name="selectFormaPago" class="form-select form-select-sm" autocomplete="off" >
									</select>
									<label for="selectFormaPago" class="form-label">Forma Pago</label>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="DatoBanco" name="DatoBanco" type="text" class="form-control form-control-sm" autocomplete="off">
									<label for="DatoBanco">Banco</label>
								</div>
								<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
									<input id="DatoClabe" name="DatoClabe" type="text" class="form-control form-control-sm" autocomplete="off">
									<label for="DatoClabe">Clabe</label>
								</div>
							</div>

							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 0.7rem !important;" id="GuardarUsuario">Guardar</button>
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
					<h1>Lista de Proveedores</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="ProveedoresTable" class="display compact nowrap" style="width:1700px">         
									<thead>
										<tr>
											<th style="width: 30px"></th>
											<th style="width: 20px" hidden>Id</th>
											<th style="width: 250px">Nombre Proveedor</th>
											<th style="width: 250px">Nombre Comercial</th>
											<th style="width: 250px">Contacto Responsable</th>
											<th style="width: 100px">RFC</th>
											<th style="width: 100px">Constancia</th>
											<th style="width: 100px">Email</th>	
											<th style="width: 100px">Telefono</th>
											<th style="width: 100px">Telefono Adicional</th>
											<th style="width: 100px" hidden>Tipo Proveedor Id</th>
											<th style="width:  80px">Tipo <br>Proveedor</th>
											<th style="width:  80px">Anticipo</th>
											<th style="width:  80px">Monto Anticipo</th>
											<th style="width:  80px">Id Pro-<br>Internacional</th>
											<th style="width: 100px">Descripcion</th>
											<th style="width: 100px">Credito</th>
											<th style="width: 100px">Dias</th>
											<th style="width: 100px">Monto Cred.</th>
											<th style="width: 100px">Forma Pago</th>
											<th style="width: 100px">Banco</th>
											<th style="width: 100px">CLABE</th>
											
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
<script src="<?=  PATH_VIEWS . 'Proveedores/Proveedores.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
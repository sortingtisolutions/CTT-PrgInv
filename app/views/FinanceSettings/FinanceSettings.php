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
					<h1>Estatus del Proyecto</h1>
             
					<div class="row">
						<div class="col" style="text-align: center;">
							<button type="button" class="btn btn-secondary">Parametro 1</button>
							<button type="button" class="btn btn-secondary">Parametro 2</button>
							<button type="button" class="btn btn-secondary">Parametro 3</button>
						</div>
					</div>
					
					<div class="container-lg row" >
						<div class="col" style="background-color: rgb(208, 241, 174);"> 
							<input type="hidden" name="" id="">
							
						</div>
					</div>
				</div>
				<!-- End área de formularios -->

				<!-- Start área de listado -->
				<div class="mvst_table">
					<h1>Lista de documentos disponibles</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="DocumentosTable" class="display  display compact nowrap" style="width:100%">         
										<thead>
											<tr>
													<th style="width: 30px"></th>
													<th style="width: 20px" hidden>Id</th>
													<th style="width: 200px">Nombre</th>

													<th style="width: 100px" hidden>id Tipo Documento</th>

													<th style="width: 100px">Tipo Documento</th>
													<th style="width: 200px">Codigo</th>
													<th style="width: 100px">Tipo</th>
													<th style="width: 100px">Fecha Admision</th>
											</tr>
										</thead>
										<tbody id="tablaDocumentosRow">
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
<div class="modal fade" id="BorrarDocumentosModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdDocumentoBorrar" aria-describedby="basic-addon3">
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


<!-- Modal Borrar -->
<div class="modal fade" id="filtroDocumentoModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdDocumentoBorrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1rem;" >Solo se aceptan archivos con extencion JPG,PNG,PDF</span>
						  </div>
					 </div>

					 </div>
						  <div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
						  </div>
					 </div>
				</div>
		</div>


</div>

<script src="<?=  PATH_ASSETS . 'lib/bs-custom-file-input.min.js' ?>"></script>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Documentos/Documentos.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
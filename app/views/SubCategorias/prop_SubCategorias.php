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
						<h4 id="titulo">Nueva Subcategoria</h4>  
						<form id="formSubCategoria" class="row g-3 needs-validation" novalidate>

                            <div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="txtCategory"  name="txtCategory"  class="form-select form-select-sm" required>
									<option value="0">Seleccione...</option> 
									</select>
									<label for="txtCategory" class="form-label">Catalogos</label>
								</div>
								
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<select id="lstSubcategory"  name="lstSubcategory"  class="form-select form-select-sm" >
									</select>
									<label for="lstSubcategory" class="form-label">Lista Subcategorias</label>
								</div>
							</div>

							<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="txtSubcategory" name="txtSubcategory" type="text" class="form-control form-control-sm" required >
									<label for="txtSubcategory">Nombre Subcategoria</label>
								</div>
							</div>
							<input id="txtIdSubcategory" name="txtIdSubcategory" type="text"  >

                     		<div class="row">
								<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
									<input id="txtCodeSubcategory" name="txtCodeSubcategory" type="text" class="form-control form-control-sm" maxlength="2" style="text-transform: uppercase" required >
									<label for="txtCodeSubcategory">Codigo Subcategoria</label>
								</div>
							</div>

							<div class="row">
								<div class="col-6">
									<button type="button"  class="btn btn-primary btn-sm btn-block" style="font-size: 1rem !important;" id="btnSave">Guardar</button>
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
					<h1>Subcategorias</h1>

					<div class="row">
						<div class="col-12 col-md-12">		
								<table id="tblSubcategory" class="display  display compact nowrap" style="width:610px">   
										<thead>
											<tr>
													<th style="width:  30px"></th>
													<th style="width:  20px">Codigo</th>
													<th style="width: 300px">Nombre</th>
													<th style="width: 200px">Catálogos</th>
													<th style="width:  40px">Codigo<br>Catálogo</th>
													<th style="width:  20px">Existencias</th>

											</tr>
										</thead>
										
									</table>
							</div>
					</div>
				</div>
				<!-- End área de listado -->
			</div>
			
	</div>
</div>

<!-- Start Ventana modal EXISTENCIAS -->
<div class="overlay_background overlay_hide"id="ExisteSbcModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblSbcSerie">
                <thead>
                    <tr>
                        <th style="width:  30px"></th>
                        <th style="width: 100px">SKU</th>
						<th style="width: 200px">Descripcion</th>
                        <th style="width:  80px">Núm. serie</th>
                        <th style="width: 120px">Fecha de alta</th>
						<th style="width:  50px">Costo</th>
                        <th style="width:  50px">Clave status</th>
                        <th style="width:  50px">Clave etapa</th>
                        <th style="width: auto">Comentarios</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
<!-- End Ventana modal SERIES -->

<!-- Modal Borrar -->
<div class="modal fade" id="BorrarSubCategoriaModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					 <div class="modal-content">
					 <div class="modal-header ">
					 </div>
					 <div class="modal-body" style="padding: 0px !important;">


					 <div class="row">
						  <input hidden type="text" class="form-control" id="IdSubCategoriaBorrar" aria-describedby="basic-addon3">
						  <div class="col-12 text-center">
								<span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
						  </div>
					 </div>

					 </div>
						  <div class="modal-footer">
								<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
								<button type="button" class="btn btn-danger" id="BorrarSubCategorias">Borrar</button>
						  </div>
					 </div>
				</div>
		</div>

<!-- Modal no se puede borrar -->
<div class="modal fade" id="NoBorrarModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header "></div>
                <div class="modal-body" style="padding: 0px !important;">
                    <div class="row">
                        <input hidden type="text" class="form-control" id="IdCategoriaBorrar" aria-describedby="basic-addon3">
                        <div class="col-12 text-center">
                            <span class="modal-title text-center" style="font-size: 1rem;" id="BorrarPerfilLabel">No se puede borrar este registro ya que contiene existencias asociadas a el. </span>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>	

<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'SubCategorias/SubCategorias.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>

<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- CUERPO DE LA PAGINA -->
<div class="container-fluid">
		<div class="contenido ">
			<div class="row mvst_group">
				<div class="mvst_panel">
					<div class="form-group">

					<div class="row">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtProject" class="form-select form-select-sm  required" aria-label="Floating label select" data-mesage="Debes seleccionar un proyecto">
									<option value="0" selected>Selecciona proyecto</option>
								</select>
								<label for="txtProject">Proyecto</label>
							</div>
						</div>

						<hr>

						<h6	class="nameProduct objet objHidden">Producto</h6>
						<input type="hidden" id="txtIdProject" class="form-control">
						<input type="hidden" id="txtIdProduct" class="form-control">
						<input type="hidden" id="txtSkuProduct" class="form-control">
						<input type="hidden" id="txtSkuSerie" class="form-control">
						<input type="hidden" id="txtIdSerie" class="form-control">
						<input type="hidden" id="txtProjectDetail" class="form-control">
						<input type="hidden" id="txtIdProjectCont" class="form-control">

						<div class="row objet objHidden">
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtPeriod" type="text" class="form-control form-control-sm text-center"  data-mesage="Debes elegir un periodo">
								<label for="txtPeriod" >Periodo</label>
							</div>
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtPrice" type="text" class="form-control form-control-sm text-center number" data-mesage="Debes Agregar el precio" >
								<label for="txtPrice">Costo Subarrendo</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtCoinType" class="form-select form-select-sm " aria-label="Floating label select" data-mesage="Debes seleccionar el tipo de moneda">
									<option value="0" selected>Selecciona el tipo de moneda</option>
								</select>
								<label for="txtCoinType">Tipo de moneda</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtSupplier" class="form-select form-select-sm" aria-label="Floating label select"  data-mesage="Debes seleccionar un proveedor">
									<option value="0" selected>Selecciona el proveedor</option>
								</select>
								<label for="txtSupplier">Proveedor</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtStoreSource" class="form-select form-select-sm"aria-label="Floating label select"  data-mesage="Debes seleccionar un almacen">
									<option value="0" selected>Selecciona almacen</option></select>
								<label for="txtStoreSource" class="form-label">Almacen</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<textarea class="form-control form-control-sm" id="txtComments" style="height: 120px" rows="3"></textarea>
								<label for="txtComments">Comentarios</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-8 mb-5">
								<button type="button" class="btn btn-sm btn-primary disabled" data_accion="add" id="btn_subletting">Aplicar cambios</button>
							</div>
						</div>

					</div>
				</div>

				<div class="mvst_table">
					<h1>Productos para subarrendo</h1>
					<table class="display compact nowrap"  id="tblProductForSubletting">
						<thead>
							<tr>
								<th style="width:  30px"></th>
								<th style="width: 350px">Producto</th>
								<th style="width:  120px">SKU</th>
								<th style="width:  90px">Costo</th>
								<th style="width: 200px">Proveedor</th>
								<th style="width: 200px">Almacen</th>
								<th style="width:  90px">Fecha Inicio</th>
								<th style="width:  90px">Fecha Fin</th>
								<th style="width: 350px">Nota</th>
							</tr>
						</thead>
						<tbody>						
						</tbody>
					</table>
				</div>
			</div>
	</div>
</div>


<!-- Modal Borrar -->
<div class="modal fade" id="MoveFolioModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">Folio: <h3 class="resFolio"></h3></span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="btnHideModal">Cerrar</button>
                </div>
            </div>
    </div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProductsForSubletting/ProductsForSubletting.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
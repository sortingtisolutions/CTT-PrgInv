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

					<div class="row list-finder pos2">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                    <input id="txtProducts" type="text" class="form-control form-control-sm required" data-mesage="Debes seleccionar un proveedor" autocomplete="off">
                                    <label for="txtProducts">Productos</label>
                                    <input type="hidden" id="txtIdProducts" name="txtIdProducts">
                            </div>
                            <div id="listProduct" class="list-group list-hide">
                                <div class="list-items" ></div>
                            </div>
					</div>

						<hr>
						<!--
						<h6	class="nameProduct objet objHidden">Proyecto</h6>
						<input type="hidden" id="txtIdProject" class="form-control">
						<input type="hidden" id="txtIdProduct" class="form-control">
						<input type="hidden" id="txtSkuProduct" class="form-control">
						<input type="hidden" id="txtSkuSerie" class="form-control">
						<input type="hidden" id="txtIdSerie" class="form-control">
						<input type="hidden" id="txtProjectDetail" class="form-control">

						<div class="row objet objHidden">
							<div class="col-md-8 col-lg-8 col-xl-8 mb-2 form-floating">
								<input id="txtPeriod" type="text" class="form-control form-control-sm text-center"  data-mesage="Debes elegir un periodo">
								<label for="txtPeriod" >Periodo</label>
							</div>
							<div class="col-md-4 col-lg-4 col-xl-4 mb-2 form-floating">
								<input id="txtPrice" type="text" class="form-control form-control-sm text-center number required" data-mesage="Debes Agregar el precio" >
								<label for="txtPrice">Costo</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtCoinType" class="form-select form-select-sm  required" aria-label="Floating label select" data-mesage="Debes seleccionar el tipo de moneda">
									<option value="0" selected>Selecciona el tipo de moneda</option>
								</select>
								<label for="txtCoinType">Tipo de moneda</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtSupplier" class="form-select form-select-sm required" aria-label="Floating label select"  data-mesage="Debes seleccionar un proveedor">
									<option value="0" selected>Selecciona el proveedor</option>
								</select>
								<label for="txtSupplier">Proveedor</label>
							</div>
						</div>

						<div class="row objet objHidden">
							<div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
								<select id="txtStoreSource" class="form-select form-select-sm required"aria-label="Floating label select"  data-mesage="Debes seleccionar un almacen">
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
						</div>-->

					</div>
				</div>

				<div class="mvst_table">
					<h1>Identificación de Productos</h1>
					<table class="display compact nowrap"  id="tblProductForSubletting">
						<thead>
							<tr>
								<th style="width:  10px"></th>
								<th style="width: 200px">Producto</th>
								<th style="width:  70px">SKU-Serie</th>
								<th style="width:  90px">Serie</th>
								<th style="width: 200px">Proyecto</th>
								<th style="width:  70px">Fecha Inicio</th>
								<th style="width:  70px">Fecha Fin</th>
								<th style="width:  30px">Estatus</th>
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
<script src="<?=  PATH_VIEWS . 'SearchIndividualProducts/SearchIndividualProducts.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
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
            <div class="mvst_panel">
                <div class="form-group">
                <div class="form_primary">
                    <h4 class="mainTitle">Datos de los Proyectos</h4>

                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtTipoProject" type="text" class="form-control form-control-sm" >
                                <label for="txtTipoProject">Tipo de Proyecto</label>
                            </div>
                           
                        </div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtProjectName" type="text" class="form-control form-control-sm" >
                                <label for="txtProjectName">Nombre del Proyecto</label>
                            </div>
                           
                        </div>

                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtProjectNum" type="text" class="form-control form-control-sm" >
                                <label for="txtProjectNum">Numero Proyecto</label>
                            </div>
                        </div>
						
						<div class="row">
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtStartDate" type="text" class="form-control form-control-sm">
								<label for="txtStartDate" >Fecha Incial</label>
							</div>
							<div class="col-md-6 col-lg-6 col-xl-6 mb-2 form-floating">
								<input id="txtEndDate" type="text" class="form-control form-control-sm">
								<label for="txtEndDate">Fecha Final</label>
							</div>
						</div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtLocation" type="text" class="form-control form-control-sm" >
                                <label for="txtLocation">Locacion</label>
                            </div>
                        </div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtCustomer" type="text" class="form-control form-control-sm" >
                                <label for="txtCustomer">Cliente</label>
                            </div>
                        </div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtAnalyst" type="text" class="form-control form-control-sm" >
                                <label for="txtAnalyst">Analista</label>
                            </div>
                        </div>
						<div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <input id="txtFreelance" type="text" class="form-control form-control-sm" >
                                <label for="txtFreelance">Freelance Asignado</label>
                            </div>
                        </div>

                    </div>

                    <div class="form_secundary">
                        <h4>Seleccion de productos</h4>
                        <div class="row">
                            <input type="hidden" id="txtIdPackages" name="txtIdPackages"><br>
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtCategoryProduct" class="form-select form-select-sm required">
                                    <option value="0" data-content="||||" selected>Selecciona una categoría</option>
                                </select>
                                <label for="txtCategoryProduct">Categoria</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <select id="txtSubcategoryProduct" class="form-select form-select-sm required">
                                    <option value="0" selected>Selecciona una subcategoría</option>
                                </select>
                                <label for="txtSubcategoryProduct" class="form-label">Subcategoia</label>
                            </div>
                        </div>


                        <div class="row list-finder">
                            <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                                <div class="box-items-list" id="boxProducts">Productos
                                    <i class="fas fa-angle-down"></i>
                                </div>
                            </div>
                            <div class="list-group list-hide">
                                <div class="list-items" id="listProducts"></div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>


            <div class="mvst_table">
			<h1> </h1>
                        <h3>Asignacion de Productos</h3>
                        <table class="display compact nowrap"  id="tblAsignedProd">
                            <thead>
                                <tr>
                                    <th style="width:  40px"></th>
                                    <th style="width:  70px">SKU</th>
                                    <th style="width:  auto">Descripcion</th>
                                    <th style="width:  70px">Num. Serie</th>
									<th style="width:  70px">Cantidad</th>
                                    <th style="width:  70px">Tipo Producto</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
            </div>           
        </div>
    </div>
</div>


<!-- Modal Borrar -->
<div class="modal fade" id="delPackModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <input type="hidden" class="form-control" id="txtIdPackage" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnDelPackage">Borrar</button>
                </div>
            </div>
    </div>
</div>


<div class="modal fade" id="delProdModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
            <div class="modal-header ">
            </div>
            <div class="modal-body" style="padding: 0px !important;">


            <div class="row">
                <input type="hidden" class="form-control" id="txtIdProductPack" aria-describedby="basic-addon3">
                <div class="col-12 text-center">
                    <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                </div>
            </div>

            </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="btnDelProduct">Borrar</button>
                </div>
            </div>
    </div>
</div>


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'WhOutputContent/WhOutputContent.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
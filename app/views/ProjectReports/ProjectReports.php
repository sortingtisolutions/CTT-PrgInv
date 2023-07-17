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

        <!-- Sidebar -->
            <div class="mvst_panel" style="width:280px; background-color: #e2edf3">
                <div class="form-group" >
                    <div class="row">
                        <h1>Condiciones del Reporte</h1>
                        <label for="txtProjects"></label>
                    </div>
                    
                    <!-- <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtProjects" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona el proyecto</option></select>
                            <label for="txtProjects">Lista de proyectos</label>
                        </div>
                    </div> -->

                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <input id="fechaInitial" name="fechaInitial" type="date"  class="form-control form-control-sm" style="text-transform: uppercase" >
                            <label for="fechaInitial">Fecha Inicial</label>
                        </div>
                    </div>
                    
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <input id="fechaEnd" name="fechaEnd" type="date"  class="form-control form-control-sm" style="text-transform: uppercase" >
                            <label for="fechaEnd">Fecha Final</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtAnalyst" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona analista</option></select>
                            <label for="txtAnalyst">Analista</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <select id="txtClient" class="form-select form-select-sm required"><option value="0" data-content="||||" selected>Selecciona el cliente</option></select>
                            <label for="txtClient">Cliente</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 col-lg-12 col-xl-12 mb-2 form-floating">
                            <textarea class="form-control form-control-sm" id="txtComments" style="height:5rem; text-transform:uppercase" autocomplete="off" rows="3"></textarea>
                            <label for="txtComments">Comentarios al cierre</label>
                        </div>
                    </div>
                    <div style="height:20px;"></div>

                    <div class="row"><h1>Seleccionar nivel de detalles</h1></div>

                    <div class="totales">
                    <div>
                        <div class="totales__grupo">
                            <div class="totales__grupo-label">Todos</div>
                            <div><input class="form-check-input" type="checkbox" value="1" id="checkIsAll" checked ></div>
                            <!-- <div class="totales__grupo-dato tope"  id="totProject" >0.00</div> -->
                        </div>

                        <div class="totales__grupo">
                            <div class="totales__grupo-label">Cotizaciones</div>
                            <div><input class="form-check-input" type="checkbox" value="0" id="checkBudget" ></div>
                            <!-- <div class="totales__grupo-dato  tope"  id="totMaintenance" >0.00</div> -->
                        </div>

                        <div class="totales__grupo">
                            <div class="totales__grupo-label">Presupuestos</div>
                            <div><input class="form-check" type="checkbox" value="0" id="checkPlans" ></div>
                        <!--  <div class="totales__grupo-dato  tope"  id="totExpendab" >0.00</div> -->
                        </div>
                    </div>
                    <div>
                        <div class="totales__grupo">
                            <div class="totales__grupo-label">Proyectos</div>
                            <div><input class="form-check" type="checkbox" value="0" id="checkProyects" ></div>
                            <!-- <div class="totales__grupo-dato  tope"  id="totDiesel" >0.00</div> -->
                        </div>

                        <div class="totales__grupo">
                            <div class="totales__grupo-label">En Llamado</div>
                            <div><input class="form-check-input" type="checkbox" value="0" id="checkInCall" ></div>
                            <!-- <div class="totales__grupo-dato  tope"  id="totDiscount" >0.00</div> -->
                        </div>
                        
                        <div class="totales__grupo">
                            <div class="totales__grupo-label">Entradas</div>
                            <div><input class="form-check-input" type="checkbox" value="0" id="checkBack"></div>
                            <!-- <div class="totales__grupo-dato"  id="totals" >0.00</div> -->
                        </div>
                    </div>
                    <div style="height:20px;"></div>
                    </div>
                        <div class="row pos1">
                            <div class="col-md-12 mb-5">
                                <button id="btn_generate" type="button" class="btn btn-sm btn-primary" >Generar</button>
                                <button id="btn_print" type="button" class="btn btn-sm btn-primary" >Imprimir</button>
                            </div>
                        </div>
                    </div>
            </div>
        <!-- Sidebar -->

        <div class="container-fluid">
            <div class="contenido">
                <div class="row mvst_group">
                    <div class="mvst_list projectClosed">
                        <div class="row rowTop">
                        <h1>Resultado de la consulta</h1>
                        </div>
                        <table class="display compact nowrap"  id="tblProducts" style="min-width: 1480px">
                            <thead>
                                <tr>
                                    <th style="width:  30px"    class="cn"></th>
                                    <th style="width:  250px"   class="lf">Nombre</th>
                                    <th style="width:  250px"   class="lf">Clasificacion</th>
                                    <th style="width:  100px"   class="cn">Costo Total</th>
                                    <th style="width:  100px"   class="cn">Forma de Pago</th>
                                    <th style="width:  200px"   class="lf">Cliente</th>
                                    <th style="width:  300px"   class="lf">Comentarios</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
        <!-- contenido de operación -->
            <!-- <div class="mvst_table projectClosed">
                <h1>Seleccionar nivel de detalles</h1> -->

                <!-- caja de totales del reporte -->
                <!-- <div class="totales">
                    
                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Todos</div>
                        <div><input class="form-check-input" type="checkbox" value="1" id="checkIsPaquete" checked ></div>
                        
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Cotizaciones</div>
                        <div><input class="form-check-input" type="checkbox" value="0" id="checkIsPaquete" ></div>
                        
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Presupuestos</div>
                        <div><input class="form-check" type="checkbox" value="0" id="checkIsPaquete" ></div>
                       
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Proyectos</div>
                        <div><input class="form-check" type="checkbox" value="0" id="checkIsPaquete" ></div>
                        
                    </div>

                    <div class="totales__grupo">
                        <div class="totales__grupo-label">En Llamado</div>
                        <div><input class="form-check-input" type="checkbox" value="0" id="checkIsPaquete" ></div>
                        
                    </div>
                    
                    <div class="totales__grupo">
                        <div class="totales__grupo-label">Entradas</div>
                        <div><input class="form-check-input" type="checkbox" value="0" id="checkIsPaquete" ></div>
                        
                    </div>
                        
                </div> -->
                <!-- caja de totales del reporte -->
                <!-- Tabla de productos del proyecto -->
            <!--         <div class="tabla__contenedor">
                        <table  id="tblProducts">
                            <thead>
                                <tr>
                                    <th style="width:  30px"  class="cn"></th>
                                    <th style="width:  250px" class="lf">Nombre</th>
                                    <th style="width:  250px" class="cn">Clasificacion</th>
                                    <th style="width:  80"    class="cn">Costo Total</th>
                                    <th style="width:  80px"  class="cn">Forma de Pago</th>
                                    <th style="width:  100px" class="rg">Cliente</th>
                                    <th style="width:  500px" class="lf">Comentarios</th>
                                </tr>
                            </thead>
                            <tbody><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tbody>
                        </table>
                    </div> -->
                <!-- Tabla de productos del proyecto -->
                
           <!--  </div>      -->   
        <!-- contenido de operación -->
        </div>
    </div>
    
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProjectReports/ProjectReports.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
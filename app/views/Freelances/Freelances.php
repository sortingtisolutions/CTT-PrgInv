<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>
<link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.2.0/css/fixedHeader.dataTables.min.css">
<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>

<!-- CUERPO DE LA PAGINA -->
<!-- Start Contenedor Listado de CLIENTES  -->
    <div class="container-fluid">
        <div class="contenido">
            <div class="row mvst_group">
                <div class="mvst_list tblProdMaster">                   
                    <div class="row rowTop">
                        <h1>Listado de Clientes con un Proyecto</h1>
                        
                        <!-- <select id="txtCategoryList" class="topList">
                            <option value="0">SELECCIONA CATÁLOGO</option>
                        </select> -->
                        
                    </div>
                    <div id="dvProducts"></div>
                    <table class="display nowrap"  id="tblFreelances" style="min-width: 1700px; font-size: 0.7rem">
                        <thead>
                            <tr>
                                <th style="width:  5px"></th>
                                <th style="width:  50px">Clave</th>
                                <th style="width: 150px">Nombre Freelance</th>
                                <th style="width:  80px">Email <br>freelance</th>
                                <th style="width:  50px">Tel Cliente</th>
                                <th style="width: 140px">Direccion</th>
                                <th style="width:  50px">RFC</th>
                                <th style="width:  40px">Unidad</th>
                                <th style="width:  80px">Placas</th>
                                <th style="width:  40px">Licencia <br>de Freelance</th>
                                <th style="width:  40px">Permiso <br>federal</th>
                                <th style="width:  25px">Clase de la <br>unidad movil</th>
                                <th style="width: 30px">Año de la <br>unidad movil</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
<!-- End Contenedor Listado de PRODUCTOS  -->

<!-- Start Ventana modal AGREGA O MODIFICA PRODUCTO -->
    <div class="overlay_background overlay_hide" id="FreelanceModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <div class="formButtons">
                <button type="button" class="btn btn-sm btn-primary" id="btn_save">Guardar cambios</button>
            </div>
            <div class="formContent">
                <table id="tblEditCust">
                    
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> Nombre del Freelance: </td>
                        <td class="data">
                            <input type="text" id="txtFreeId" name="txtFreeId" class="hide">
                            <input type="text" id="txtFreName" name="txtFreName" class="textbox required" style="width:250px; text-transform:uppercase">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Nombre Principal del freelance</span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> Clave del Freelance: </td>
                        <td class="data">
                            <input type="text" id="txtFreClave" name="txtFreClave" class="textbox required" style="width:250px; text-transform:uppercase">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Clave del freelance</span>
                        </td>
                    </tr>
                    <!-- AREA-->
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Area:</td>
                        <td class="data">
                            <select id="txtArea" name="txtArea" class="textbox required" style="width:200px">
                                <option value="0">Selecciona el area</option>
                            </select>
                            <!-- <input type="hidden" id="txtTypeProdId" name="txtTypeProdId"> -->
                            <span class="fail_note hide"></span>
                            <span class="intructions">Tipo de area</span>
                        </td>
                    </tr>

                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> RFC: </td>
                        <td class="data">
                            <input type="text" id="txtFreRFC" name="txtFreRFC" class="textbox" style="width:150px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">RFC del freelance</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Direccion: </td>
                        <td class="data">
                            <input type="text" id="txtFreAdrr" name="txtFreAdrr" class="textbox" style="width:300px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Domicilio fiscal del freelance</span>
                        </td>
                    </tr>
                   
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Email Freelance: </td>
                        <td class="data">
                            <input type="text" id="txtFreEmail" name="txtFreEmail" class="textbox " style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Email del Freelance</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Telefono Freelance: </td>
                        <td class="data">
                            <input type="text" id="txtFrePhone" name="txtFrePhone" class="textbox required" style="width:150px">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Telefono de Freelance</span>
                        </td>
                    </tr>
                   
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Unidad Movil: </td>
                        <td class="data">
                            <input type="text" id="txtUniMovil" name="txtUniMovil" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Unidad Movil</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Placas de la unidad: </td>
                        <td class="data">
                            <input type="text" id="txtPlaUnidad" name="txtPlaUnidad" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Placas de la unidad</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Número de la licencia: </td>
                        <td class="data">
                            <input type="text" id="txtNumLicencia" name="txtNumLicencia" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Número de la licencia</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Permiso federal: </td>
                        <td class="data">
                            <input type="text" id="txtPerFederal" name="txtPerFederal" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Permiso federal del freelance</span>
                        </td>
                    </tr>

                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Clase de unidad: </td>
                        <td class="data">
                            <input type="text" id="txtClaUnidad" name="txtClaUnidad" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Clase de unidad movil</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Año de la unidad movil: </td>
                        <td class="data">
                            <input type="text" id="txtAnUnidad" name="txtAnUnidad" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Año de la unidad movil</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
<!-- End Ventana modal AGREGA O MODIFICA PRODUCTO -->


<!-- Start Ventana modal ELIMINA PRODUCTO -->
    <div class="modal fade" id="delProdModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                <div class="modal-header ">
                </div>
                <div class="modal-body" style="padding: 0px !important;">

                <div class="row">
                    <input type="hidden" class="form-control" id="txtIdProduct" aria-describedby="basic-addon3">
                    <div class="col-12 text-center">
                        <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">Se va a eliminar de la Base de Datos ¿Esta Seguro?</span>
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
<!-- End Ventana modal ELIMINA PRODUCTO -->

<!-- Start Ventana modal ELIMINA SERIE -->
<div class="modal fade" id="delSerieModal" tabindex="-1" aria-labelledby="BorrarPerfilLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
                <div class="modal-content">
                <div class="modal-header ">
                </div>
                <div class="modal-body" style="padding: 0px !important;">

                <div class="row">
                    <input type="hidden" class="form-control" id="txtIdSerie" aria-describedby="basic-addon3">
                    <div class="col-12 text-center">
                        <span class="modal-title text-center" style="font-size: 1.2rem;" id="BorrarPerfilLabel">¿Seguro que desea borrarlo?</span>
                    </div>
                </div>

                </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-danger" id="btnDelSerie">Borrar</button>
                    </div>
                </div>
        </div>
    </div>
<!-- End Ventana modal ELIMINA SERIE -->


<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Freelances/Freelances.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
<script src="https://cdn.datatables.net/fixedheader/3.2.0/js/dataTables.fixedHeader.min.js"></script>
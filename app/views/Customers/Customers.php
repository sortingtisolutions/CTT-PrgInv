<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>
<link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.2.0/css/fixedHeader.dataTables.min.css">
<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>


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
                    <table class="display compact nowrap"  id="tblCustomers" style="min-width: 1880px">
                        <thead>
                            <tr>
                                <th style="width:  5px"></th>
                                <th style="width: 110px">Nombre Cliente</th>
                                <th style="width: 110px">Persona Contacto</th>
                                <th style="width: 140px">Direccion</th>
                                <th style="width: 100px">Email</th>
                                <th style="width:  50px">RFC</th>
                                <th style="width:  50px">Telefono</th>
                                <th style="width:  50px">Tel Contacto</th>
                                <th style="width:  40px">Codigo <br>Interno</th>
                                <th style="width: 50px">Calificación</th>
                                <th style="width: 80px">Representante <br>Legal</th>
                                <th style="width: 50px">Tipo Cliente</th>
                                <th style="width: 30px">Status <br>Cliente</th>
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
    <div class="overlay_background overlay_hide"id="CustomerModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <div class="formButtons">
                <button type="button" class="btn btn-sm btn-primary" id="btn_save">Guardar cambios</button>
            </div>
            <div class="formContent">
                <table id="tblEditCust">
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> Nombre del Cliente: </td>
                        <td class="data">
                            <input type="hidden" id="txtPrdId" name="txtPrdId" >
                            <input type="text" id="txtCusName" name="txtCusName" class="textbox required" style="width:250px; text-transform:uppercase">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Nombre Principal del cliente</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">*</span> Nombre de Contacto: </td>
                        <td class="data">
                            <input type="text" id="txtCusCont" name="txtCusCont" class="textbox" style="width:250px; text-transform:uppercase">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Nombre del contacto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Direccion: </td>
                        <td class="data">
                            <input type="text" id="txtCusAdrr" name="txtCusAdrr" class="textbox  required" style="width:300px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Domicilio fiscal del cliente</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> E-mail: </td>
                        <td class="data">
                            <input type="text" id="txtCusEmail" name="txtCusEmail" class="textbox  required" style="width:250px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">correo electronico</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> RFC: </td>
                        <td class="data">
                            <input type="text" id="txtCusRFC" name="txtCusRFC" class="textbox  required" style="width:150px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">RFC del cliente</span>
                        </td>
                    </tr>

                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Telefono Principal: </td>
                        <td class="data">
                            <input type="text" id="txtCusPhone" name="txtCusPhone" class="textbox  required" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Telefono principal de contacto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Telefono Secundario: </td>
                        <td class="data">
                            <input type="text" id="txtCusPhone2" name="txtCusPhone2" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Otro telefono para contactar</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Codigo Interno: </td>
                        <td class="data">
                            <input type="text" id="txtCusCodI" name="txtCusCodI" class="textbox" style="width:100px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Codigo interno asignado por la empresa</span>
                        </td>
                    </tr>

                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Calificación del Cliente: </td>
                        <td class="data">
                            <select id="txtQualy" name="txtQualy" class="textbox" style="width:200px">
                                <option value="0">Selecciona Calificación</option>
                            </select>
                            <span class="fail_note hide"><!-- <i class="fas fa-arrow-left"></i> --> Campo requerido</span>
                            <span class="intructions">Calificacion segun historial del cliente</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Tipo de Cliente: </td>
                        <td class="data">
                            <input type="text" id="txtcusProsp" name="txtcusProsp" class="textbox" style="width:200px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Tipo de cliente 0-Prospecto / 1-Cliente con Proyecto</span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Status del Cliente: </td>
                        <td class="data">
                            <div id="txtCusStat"  class="checkbox"><i class="far fa-square"></i> </div>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Indica si el cliente esta activo o inactivo</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Patrocinador: </td>
                        <td class="data">
                            <input type="text" id="txtCusSpon" name="txtCusSpon" class="textbox" style="width:200px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Patrocinador</span>
                        </td>
                    </tr>

                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Tipo de Producción:</td>
                        <td class="data">
                            <select id="txtTypeProd" name="txtTypeProd" class="textbox" style="width:200px">
                                <option value="0">Selecciona Tipo</option>
                            </select>
                            <!-- <input type="hidden" id="txtTypeProdId" name="txtTypeProdId"> -->
                            <span class="fail_note hide"></span>
                            <span class="intructions">Tipo de cliente, segun su funcion 1-Casa Productora / 2-Productor</span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Representante Legal: </td>
                        <td class="data">
                            <input type="text" id="txtcusLegalR" name="txtcusLegalR" class="textbox" style="width:200px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Representante Legal</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Acta Legal: </td>
                        <td class="data">
                            <input type="text" id="txtcusLegalA" name="txtcusLegalA" class="textbox" style="width:200px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Nombre del documento legal</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Contrato: </td>
                        <td class="data">
                            <input type="text" id="txtcusContr" name="txtcusContr" class="textbox" style="width:200px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Numero de contrato</span>
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


<script src="<?=  PATH_ASSETS . 'lib/functions.js' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Customers/Customers.js' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
<script src="https://cdn.datatables.net/fixedheader/3.2.0/js/dataTables.fixedHeader.min.js"></script>
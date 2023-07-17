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
                    <table class="display nowrap"  id="tblCustomers" style="min-width: 1700px; font-size: 0.7rem">
                        <thead>
                            <tr>
                                <th style="width:  5px"></th>
                                <th style="width: 150px">Nombre Cliente</th>
                                <th style="width:  80px">Email <br>cliente</th>
                                <th style="width:  50px">Tel Cliente</th>
                                <th style="width: 140px">Direccion</th>
                                <th style="width:  50px">RFC</th>
                                <th style="width:  40px">Calificación</th>
                                <th style="width:  80px">Tipo Cliente</th>
                                <th style="width:  40px">Codigo <br>Interno</th>
                                <th style="width:  40px">Codigo <br>SAT</th>
                                <th style="width:  25px">Status <br>Cliente</th>
                                <th style="width: 150px">Nombre Director</th>
                                <th style="width: 150px">Nombre <br>Representante</th>
                                <th style="width: 80px">Email <br>Representante</th>
                                <th style="width:  50px">Tel <br>Representante</th>
                                <th style="width: 150px">Persona <br>Contacto</th>
                                <th style="width:  50px">Tel Contacto</th>
                                <th style="width: 80px">Email Contacto</th> 
                                <th style="width: 40px">Operaciones <br>con CTT</th>                               
                                <th style="width: 40px">Ultima <br>Factura</th>
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
                        <td class="concept"><span class="reqsign">&nbsp;</span> Email Cliente: </td>
                        <td class="data">
                            <input type="text" id="txtCusEmail" name="txtCusEmail" class="textbox" style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Email del Cliente</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Telefono Cliente: </td>
                        <td class="data">
                            <input type="text" id="txtCusPhone" name="txtCusPhone" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Telefono de Cliente</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Direccion: </td>
                        <td class="data">
                            <input type="text" id="txtCusAdrr" name="txtCusAdrr" class="textbox" style="width:300px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Domicilio fiscal del cliente</span>
                        </td>
                    </tr>
                   
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> RFC: </td>
                        <td class="data">
                            <input type="text" id="txtCusRFC" name="txtCusRFC" class="textbox" style="width:150px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">RFC del cliente</span>
                        </td>
                    </tr>

                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Tipo de Cliente:</td>
                        <td class="data">
                            <select id="txtTypeProd" name="txtTypeProd" class="textbox required" style="width:200px">
                                <option value="0">Selecciona Tipo</option>
                            </select>
                            <!-- <input type="hidden" id="txtTypeProdId" name="txtTypeProdId"> -->
                            <span class="fail_note hide"></span>
                            <span class="intructions">Tipo de cliente, segun su responsabilidad 1-Casa Productora / 2-Productor</span>
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
                        <td class="concept"><span class="reqsign">&nbsp;</span> Status del Cliente: </td>
                        <td class="data">
                            <div id="txtCusStat"  class="checkbox" value="1"><i class="far fa-square"></i></div>
                            <span class="fail_note hide"></span>
                            <span class="intructions">Indica si el cliente esta activo o inactivo</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Clave/Codigo Interno: </td>
                        <td class="data">
                            <input type="text" id="txtCusCodI" name="txtCusCodI" class="textbox" style="width:100px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Codigo interno asignado por la empresa</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign"></span> Clave SAT asignada: </td>
                        <td class="data">
                            <!-- <input type="hidden" id="txtCusSat" name="txtCusSat" > -->
                            <input type="text" id="txtCusSat" name="txtCusSat" class="textbox" style="width:100px; text-transform:uppercase">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Clave SAT para facturar</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span>Nombre del Director: </td>
                        <td class="data">
                            <input type="text" id="txtDirector" name="txtDirector" class="textbox" style="width:250px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Director de la empresa, si lo hay</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Representante Legal: </td>
                        <td class="data">
                            <input type="text" id="txtcusLegalR" name="txtcusLegalR" class="textbox" style="width:250px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Representante Legal</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Telefono de Representante: </td>
                        <td class="data">
                            <input type="text" id="txtLegPhone" name="txtLegPhone" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Telefono del Representante</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Email Representante: </td>
                        <td class="data">
                            <input type="text" id="txLegEmail" name="txLegEmail" class="textbox" style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Email del Representante</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign"></span> Nombre Contacto de pago: </td>
                        <td class="data">
                            <input type="text" id="txtCusCont" name="txtCusCont" class="textbox" style="width:250px; text-transform:uppercase">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Contancto para pagos</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Telefono de contacto: </td>
                        <td class="data">
                            <input type="text" id="txtContPhone" name="txtContPhone" class="textbox" style="width:150px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Telefono de contacto pasa pagos</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Email de contacto: </td>
                        <td class="data">
                            <input type="text" id="txtContEmail" name="txtContEmail" class="textbox" style="width:200px">
                            <span class="fail_note hide"></span>
                            <span class="intructions">Email de Contacto</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Opera con CTT:</td>
                        <td class="data">
                            <select id="txtWorkC" name="txtWorkC" class="textbox" style="width:150px">
                                <option value="0">Selecciona...</option>
                            </select>
                            <span class="fail_note hide"><!-- <i class="fas fa-arrow-left"></i> --> Campo requerido</span>
                            <span class="intructions">Tiene Operacion con CTT</span>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="concept"><span class="reqsign"></span> Dato de Ultima Factura: </td>
                        <td class="data">
                            <input type="text" id="txtInvoi" name="txtInvoi" class="textbox" style="width:200px; text-transform:uppercase">
                            <span class="fail_note hide"><i class="fas fa-arrow-left"></i> Campo requerido</span>
                            <span class="intructions">Datos de la ultima Factura</span>
                        </td>
                    </tr>
                    
                    <!-- <tr>
                        <td class="concept"><span class="reqsign">&nbsp;</span> Cliente o Prospecto: </td>
                        <td class="data">
                            <input type="text" id="txtcusProsp" name="txtcusProsp" class="textbox" style="width:50px; text-transform:uppercase">
                            <span class="fail_note hide"></span>
                            <span class="intructions">P - Prospecto / C - Cliente con Proyecto</span>
                        </td>
                    </tr> -->
                    
                    
                    <!-- <tr>
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
                    </tr> -->
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
<script src="<?=  PATH_VIEWS . 'Customers/Customers.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
<script src="https://cdn.datatables.net/fixedheader/3.2.0/js/dataTables.fixedHeader.min.js"></script>
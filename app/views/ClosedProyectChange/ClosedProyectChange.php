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
        <div class="row">
            <div class="block_01" style="width: 100%;">
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 blocks">
                        <span class="titleSection">Datos Generales del Proyecto</span>
                        <table class="table_information form-floating " >
                            <tr>
                                <td class="formSales">
                                </td>
                            </tr>
                        
                            <tr>
                                <td class="formSales">

                                    <form id="formSales">
                                        <div class="form_group">
                                            <label for="lstProject">Nombre de proyecto:</label> 
                                            <select id="lstProject" name="lstProject" >
                                                <option value="0">Selecciona...</option>
                                            </select>
                                        </div>

                                        <div class="form_group">
                                            <label for="txtCustomer">Nombre Cliente:</label> 
                                            <input id="txtCustomer" name="txtCustomer" type="text" class="textbox ">
                                        </div>

                                        <div class="form_group">
                                            <label for="txtRepresent">Representante:</label> 
                                            <input id="txtRepresent" name="txtRepresent" type="text" class="textbox ">
                                        </div>

                                        <div class="form_group">
                                            <label for="txtTypeProj">Tipo de Proyecto:</label> 
                                            <input id="txtTypeProj" name="txtTypeProj" type="text" class="textbox ">
                                            </select>
                                        </div>

                                        <div class="form_group">
                                            <label for="txtStart">Fecha de Inicio:</label> 
                                            <input id="txtStart" name="txtStart" type="text" class="textbox ">
                                            </select>
                                        </div>

                                        <div class="form_group">
                                            <label for="txtEnd">Fecha Final:</label> 
                                            <input id="txtEnd" name="txtEnd" type="text" class="textbox ">
                                            </select>
                                        </div>

                                        <!-- <div class="form_group">
                                            <label for="txtadress">Direccion:</label> 
                                            <input id="txtadress" name="txtadress" type="text" class="textbox ">
                                            </select>
                                        </div>

                                        <div class="form_group">
                                            <label for="lstPayForm">tipo de pago:</label> 
                                            <select id="lstPayForm" name="lstPayForm" class="required">
                                                <option value="">Selecciona...</option>
                                                <option value="EFECTIVO">EFECTIVO</option>
                                                <option value="TARJETA DE CREDITO">TARJETA DE CREDITO</option>
                                            </select>
                                        </div> -->

                                        <div class="form_group hide">
                                            <label for="txtProject">Proyecto:</label> 
                                            <input id="txtProject" name="txtProject" type="text" class="textbox">
                                        </div>
                                        
                                        <div class="form_group hide">
                                            <label for="txtInvoice">Num Factura:</label> 
                                            <input id="txtInvoice" name="txtInvoice" type="text" class="textbox">
                                        </div>

                                    </form>

                                </td>
                            </tr>
 
                        </table>
                    </div>
                </div>

                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 blocks">
                        <div class="block_01-02">
                            <h6 style="color:#008000">Versiones de documentos</h6>
                        <div class="mvst_list tblProdMaster">
                            <table class="display compact nowrap"  id="tblProyects" style="min-width: 99%">
                                <thead>
                                    <tr>
                                        <th style="width:  30px">Acciones</th>
                                        <th style="width: 200px">Total Proyecto</th>
                                        <th style="width:  60px">Total Mantenimiento</th>
                                        <th style="width: 100px">Total Expendables</th>
                                        <th style="width:  40px">Total Descuentos</th>
                                        <th style="width:  40px">Total Total</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                         </div>

                            <!-- <div class="menu_control"></div> -->
                           <!--  <div id="tbl_dynamic" class="tbl_dynamic"></div> -->
                        </div>   
                    </div>
                </div>

            </div>

           <!--  <div class="block_02">
                <div class="blocks">
                    <button class="btn-add" id="newQuote"> + nueva venta</button>
                </div>
                <hr>
                <div class="blocks total">
                    <div class="half left concepto">Subtotal</div>
                    <div class="half right total dato" id="total">0</div>
                </div>
                <div class="blocks total">
                    <div class="half left concepto">IVA</div>
                    <div class="half right total dato" id="total">0</div>
                </div>
                <div class="blocks total">
                    <div class="half left concepto">Total</div>
                    <div class="half right total dato" id="total">0</div>
                </div>
                <div class="blocks total">
                    <div class="half left concepto">&nbsp;</div>
                    <div class="half right total dato" >&nbsp;</div>
                </div>
                <div class="blocks">
                    <div class="half left concepto">Num. productos</div>
                    <div class="half right dato" id="ttlproducts">0</div>
                </div>

                <div class="blocks">
                    <div class="full text_center">
                        <button class="bn enable" id="addPurchase"> Guardar Cambio</button>
                    </div>
                </div>
                <div class="blocks">
                    <button class="btn-add" id="newComment"> + agregar observaciones</button>
                </div>
                <hr>
            </div> -->
        </div>
    </div>
</div>
            

<!-- Start Lista de productos -->
<div class="box_list_products" id="Products" >
           
    <div class="sel_product" contenteditable="true"></div>
    <div class="list_products">
        <ul></ul>
    </div>
    
</div>
<!-- End Lista de productos -->

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script> 
<script src="<?=  PATH_VIEWS . 'ClosedProyectChange/ClosedProyectChange.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
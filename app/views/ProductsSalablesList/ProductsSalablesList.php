<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>
<link rel="stylesheet" href="https://cdn.datatables.net/fixedheader/3.2.0/css/fixedHeader.dataTables.min.css">
<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- CUERPO DE LA PAGINA -->
<div class="container-fluid">
    <div class="contenido">
        <div class="row mvst_group">
            <div class="mvst_list tblProdMaster">
                <div class="row rowTop">
                    <h1>Productos Vendidos</h1>
                </div>

                <table class="display compact nowrap"  id="tblSales" style="min-width: 1050px">
                    <thead>
                        <tr>
                            <th style="width:  10px"></th>
                            <th style="width:  60px">Num Venta</th>
                            <th style="width:  80px">Fecha de venta</th>
                            <th style="width: 300px">Cliente</th>
                            <th style="width: 300px">Proyecto</th>
                            <th style="width: 100px">Tipo de pago</th>
                            <th style="width: 200px">Vendedor</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>

            </div>
        </div>
    </div>
</div>


<!-- Start Ventana modal DETALLE DE VENTA -->
    <div class="overlay_background overlay_hide"id="SaleDetailModal">
        <div class="overlay_modal">
            <div class="overlay_closer"><span class="title"></span><span class="btn_close">Cerrar</span></div>
            <table class="display compact nowrap"  id="tblSaleDetail" style="min-width: 640px">
                <thead>
                    <tr>
                        <th style="width: 20px"></th>    
                        <th style="width: 100px">SKU</th>
                        <th style="width: 400px">Producto</th>
                        <th style="width:  40px">Cant.</th>
                        <th style="width:  50px">Precio</th>
                        <th style="width:  50px">Importe</th>
                        <th style="width: 100px">Fecha</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
<!-- End Ventana modal DETALLE DE VENTA -->




<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_ASSETS . 'lib/dataTable/datatables.min.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'ProductsSalablesList/ProductsSalablesList.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>
<script src="https://cdn.datatables.net/fixedheader/3.2.0/js/dataTables.fixedHeader.min.js"></script>
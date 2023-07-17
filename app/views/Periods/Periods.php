<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";
?>
<!-- CUERPO DE LA PAGINA -->
        <div class="periods_content">
        <span class="invoice_button toApplyPeriods"><i class="fas fa-save"></i> guardar</span>
            <table id="periodsTable" class="periods__table" >
                <thead>
                    <tr>
                        <th>series</th>
                        <th class="thSerie wseries"></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="contador"></div>
        
        <script src="<?=  PATH_ASSETS . 'lib/sticky.js?v=1.0.0.0' ?>"></script>
        <script src="<?=  PATH_VIEWS . 'Periods/Periods.js?v=1.0.0.0' ?>"></script>


    
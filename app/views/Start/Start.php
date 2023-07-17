<?php 
	defined('BASEPATH') or exit('No se permite acceso directo'); 
	require ROOT . FOLDER_PATH . "/app/assets/header.php";

	$host = codificar(HOST.'|'.USER.'|'.PASSWORD.'|'.DB_NAME);
?>
<header>
	<?php require ROOT . FOLDER_PATH . "/app/assets/menu.php"; ?>
</header>
<!-- CUERPO DE LA PAGINA -->
<div class="container">
	<div class="contenido"></div>
	<div id="host" style="display:block"><?= $host; ?></div>
</div>

<script src="<?=  PATH_ASSETS . 'lib/functions.js?v=1.0.0.0' ?>"></script>
<script src="<?=  PATH_VIEWS . 'Start/Start.js?v=1.0.0.0' ?>"></script>

<?php require ROOT . FOLDER_PATH . "/app/assets/footer.php"; ?>

<?php

function codificar($dato) {
	//echo "<script>console.log('Console: " . $dato . "' );</script>";
	$resultado = $dato;
	$arrayLetras = array('M', 'A', 'R', 'C', 'O', 'S');
	$limite = count($arrayLetras) - 1;
	$num = mt_rand(0, $limite);
	for ($i = 1; $i <= $num; $i++) {
		$resultado = base64_encode($resultado);
	}
	$resultado = $resultado . '+' . $arrayLetras[$num];
	$resultado = base64_encode($resultado);
	//echo "<script>console.log('Resultado: " . $resultado . "' );</script>";
	return $resultado;
}
?>
var seccion = '';
var campo = '';
$(document).ready(function () {
    let host = $('#host').text();
    localStorage.setItem('host', host);
    pos = 4;
    verifica_usuario();
});

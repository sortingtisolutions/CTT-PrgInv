var seccion = '';
var campo = '';
$(document).ready(function () {
    console.log('start');
    let host = $('#host').text();
    localStorage.setItem('host', host);
    console.log(host);
    pos = 4;
    verifica_usuario();
    // busca_sidebar();
});

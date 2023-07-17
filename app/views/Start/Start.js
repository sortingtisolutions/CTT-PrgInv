var seccion = '';
var campo = '';
//INICIO DE PROCESOS
$(document).ready(function () {
    let host = $('#host').text();
    localStorage.setItem('host', host);
    pos = 4;
    //console.log(host,localStorage);
    verifica_usuario();
    
});

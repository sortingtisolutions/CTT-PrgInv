let products;
//let prjid = window.location.pathname.split("/").pop();
let gblprjid;
//var prjid;

$(document).ready(function () {
    if (verifica_usuario()) {
        // let temporal=Cookies.get('user');
        // console.log(temporal);
        prjid=Cookies.get('pjtid');
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    setting_table_AsignedProd();
    getUsersP();
    getUsersA();
    getDetailProds();

    // Boton para registrar la salida del proyecto y los productos
    $('#recordOutPut').on('click', function () {
        confirm_to_GetOut(gblprjid);    
     });

     $('#cleanForm')
        .unbind('click')
        .on('click', function () { 
            Clean();
     });

}

// Solicita los paquetes  OK
function getUsersP() {
    //console.log(prjid)
    var pagina = 'AssignProjects/listUsersP';
    var par = `[{"pjt_id":""}]`;
    var tipo = 'json';
    var selector = putUsersP;
    fillField(pagina, par, tipo, selector);
}

function getUsersA() {
    //console.log(prjid)
    var pagina = 'AssignProjects/listUsersA';
    var par = `[{"pjt_id":""}]`;
    var tipo = 'json';
    var selector = putUsersA;
    fillField(pagina, par, tipo, selector);
}
// Solicita los productos del proyecto  OK
function getDetailProds() {
    var pagina = 'AssignProjects/listDetailProds';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = putDetailsProds;
    fillField(pagina, par, tipo, selector);
}

//Solicita las series de los productos  OK
function getSeries(pjtcnid) {
    // console.log('ID-Contenido Producto', pjtcnid);
    var pagina = 'AssignProjects/listSeries';
    var par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}

function updateUsers(pjtid,whoP,whoA,valreg) {
    var par = `
        [{
            "pjtid" : "${pjtid}",
            "whoP" : "${whoP}",
            "whoA"   : "${whoA}"
        }]`;
    var pagina = 'AssignProjects/updateUsers';
    var tipo = 'html';
    var selector = putupdateUser;
    fillField(pagina, par, tipo, selector);
}

// Configura la tabla de productos del proyecto

function setting_table_AsignedProd() {
    let title = 'Proyectos Atendidos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblAsignedProd').DataTable({
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
                [100, 200, -1],
                [100, 200, 'Todos'],
            ],
        buttons: [
            {
                //Botón para Excel
                extend: 'excel',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
            },
            {
                //Botón para PDF
                extend: 'pdf',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
            },
            {
                //Botón para imprimir
                extend: 'print',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 240px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable',  class: 'edit'},
            {data: 'pjtname',   class: 'pjtname supply'},
            {data: 'pjtnum',    class: 'pjtnum supply'},
            {data: 'pjttpy',    class: 'pjttpy sku'},
            {data: 'pjtfini',   class: 'pjtfini date'},
            {data: 'pjtffin',   class: 'pjtffin date'},
            {data: 'pjtusrp',   class: 'pjtusrp supply'},
            {data: 'pjtusrs',   class: 'pjtusrs supply'},
        ],
    });
}

// ### LISTO ### Llena la TABLA INICIAL de los detalles del proyecto
function putDetailsProds(dt) {

    if (dt[0].pjt_id != '0')
    {
        // let tabla = $('#tblAsignedProd').DataTable();
        $('#tblAsignedProd tbody').html('');
        $.each(dt, function (v, u){
            var H = `
                <tr id="${u.pjt_id}" name="${u.pjt_name}">
                    <td class="supply"><i class="fas fa-edit toLink" id="${u.pjt_id}"></i></td>
                    <td class="pjtname">${u.pjt_name}</td>
                    <td class="pjtnum">${u.pjt_number}</td>
                    <td class="pjttpy">${u.pjttp_name}</td>
                    <td class="pjtfini">${u.pjt_date_start}</td>
                    <td class="pjtffin">${u.pjt_date_end}</td>
                    <td class="pjtuser">${u.pjt_whomake}</td>
                    <td class="pjtusrs">${u.pjt_whoattend}</td>
                </tr>`;
            $('#tblAsignedProd tbody').append(H);
        });
        activeIcons();
    }
}

//AGREGA LOS DATOS GENERALES DEL PROYECTO
function putUsersP(dt) {    
    if (dt[0].usr_id != '0') {
        let cinId = dt[0].usr_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.emp_fullname}">${u.emp_fullname}</option>`;
            $('#selUsrP').append(H);
        });
    }
}
function putUsersA(dt) {    
    if (dt[0].usr_id != '0') {
        let cinId = dt[0].usr_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.emp_fullname}">${u.emp_fullname}</option>`;
            $('#selUsrA').append(H);
        });
    }
}

// ### LISTO ###   habilita el botones para validar en TABLA INICIAL
function activeIcons() {
    // console.log('ActivaIcon');
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('tr');
            // console.log(id);
            let pjtid = id.attr('id');
            let pjtnm = id.children('td.pjtname').text();
            gblprjid=pjtid;
            console.log('Cont-Producto', pjtid,pjtnm);
            if (pjtid > 0) {
                editProject(pjtid,pjtnm);
            }
        });

}

function editProject(pjtid,pjtnm) {
    $('#txtProjectName').val(pjtnm);
}

    
function confirm_to_GetOut(pjtid) {
    $('#starClosure').modal('show');
    $('#txtIdClosure').val(pjtid);
    //borra paquete +
    $('#btnClosure').on('click', function () {
        $('#starClosure').modal('hide');
        console.log('Datos CLICK',pjtid);
        datasUser(pjtid);
    });
}

function Clean() {
    $('#txtProjectName').val('');
    $('#selUsrP').val(0);
    $('#selUsrA').val(0);
}

function datasUser(pjtid) {
    let whoP='';
    let whoA='';
    let valreg=0;
    if ($('#selUsrP').val()!='0'){
        whoP=$('#selUsrP').val();
        valreg=valreg+1;
    }else{valreg=0;}
    if($('#selUsrA').val()!=0){
        whoA=$('#selUsrA').val();
        valreg=valreg+1;
    }else{valreg=0;}
    
    console.log('Toma datos', pjtid,whoP,whoA,valreg);
    updateUsers(pjtid,whoP,whoA);
}

function putupdateUser(dt){
    console.log('TERMINO ACTUALIZAR', dt);
    Clean();
    let folio=dt;

}

function modalLoading(acc) {
    if (acc == 'S') {
        $('.invoice__modalBackgound').fadeIn('slow');
        $('.invoice__loading')
            .slideDown('slow')
            .css({ 'z-index': 401, display: 'flex' });
    } else {
        $('.invoice__loading').slideUp('slow', function () {
            $('.invoice__modalBackgound').fadeOut('slow');
        });
    }
}

function printOutPutContent(verId) {
    let user = Cookies.get('user').split('|');
    let v = verId;
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');

    console.log('Datos', v, u, n, h);

    window.open(
        `${url}app/views/AssignProjects/AssignProjectsReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
}
let products;
//let prjid = window.location.pathname.split("/").pop();
let gblprjid,user,usrid;
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
    getUsersC();
    getDetailProds();
    user = Cookies.get('user').split('|');
    usrid = user[0];
    // Boton para registrar la salida del proyecto y los productos
    $('#recordChgUser').on('click', function () {
        confirm_toChgUsr(gblprjid);
     });

     $('#cleanForm')
        .unbind('click')
        .on('click', function () {
            CleanCombos();
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

function getUsersC() {
    //console.log(prjid)
    var pagina = 'AssignProjects/listUsersC';
    var par = `[{"pjt_id":""}]`;
    var tipo = 'json';
    var selector = putUsersC;
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

// Solicita los usuarios del proyecto  OK
function getUsersOnProject(pjtid) {
    var pagina = 'AssignProjects/listUsersOnProj';
    var par = `[{"pjt_id":"${pjtid}"}]`;
    var tipo = 'json';
    var selector = putUsersOnProject;
    fillField(pagina, par, tipo, selector);
}

function updateUsers(pjtid,areid,empid,empname) {
    var par = `
        [{  "pjtid"     : "${pjtid}",
            "areid"     : "${areid}",
            "empid"     : "${empid}",
            "empname"   : "${empname}",
            "usrid"   : "${usrid}"
        }]`;
    var pagina = 'AssignProjects/updateUsers';
    var tipo = 'json';
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
        ],
    });
}

// ### LISTO ### Llena la TABLA INICIAL de los detalles del proyecto
function putDetailsProds(dt) {
    let valstage='';
    let valicon='';
    if (dt[0].pjt_id != '0')
    {
        // let tabla = $('#tblAsignedProd').DataTable();
        $('#tblAsignedProd tbody').html('');
        $.each(dt, function (v, u){
            if (u.pjt_status == 4)
                { valstage='color:#008000';
                valicon='fa fa-cog toWork'; }
            else if (u.pjt_status == 7)
                { valstage='color:#FFA500';
                valicon='fa fa-solid fa-dolly detail'; }
            else
                { valstage='color:#CC0000';
                valicon='fa fa-solid fa-dolly detail'; }
                // style='${valstage}'
            var H = `
                <tr id="${u.pjt_id}" name="${u.pjt_name}">  
                    <td class="supply"><i class="fas fa-edit toLink" id="${u.pjt_id}"></i></td>
                    <td class="pjtname">${u.pjt_name}</td>
                    <td class="pjtnum">${u.pjt_number}</td>
                    <td class="pjttpy">${u.pjttp_name}</td>
                    <td class="pjtfini">${u.pjt_date_start}</td>
                    <td class="pjtffin">${u.pjt_date_end}</td>
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
            var H = `<option value="${u.emp_id}" data_op="${u.emp_fullname}">${u.emp_fullname}</option>`;
            $('#selUsrP').append(H);
        });
    }
}
//AGREGA LOS DATOS GENERALES DEL PROYECTO
function putUsersA(dt) {
    if (dt[0].usr_id != '0') {
        let cinId = dt[0].usr_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.emp_id}" data_op="${u.emp_fullname}">${u.emp_fullname}</option>`;
            $('#selUsrA').append(H);
        });
    }
}

function putUsersC(dt) {
    if (dt[0].usr_id != '0') {
        let cinId = dt[0].usr_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.emp_id}" data_op="${u.emp_fullname}">${u.emp_fullname}</option>`;
            $('#selUsrC').append(H);
        });
    }
}

// ### LISTO ###   habilita el botones para validar en TABLA INICIAL
function activeIcons() {
    // console.log('ActivaIcon');
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            CleanCombos();
            let id = $(this).parents('tr');
            // console.log(id);
            let pjtid = id.attr('id');
            let pjtnm = id.children('td.pjtname').text();
            gblprjid=pjtid;
            // console.log('Cont-Producto', pjtid,pjtnm);
            if (pjtid > 0) {
                getUsersOnProject(pjtid);
                editProject(pjtid,pjtnm);
            }
        });
}

function editProject(pjtid,pjtnm) {
    $('#txtProjectName').val(pjtnm);
}

function putUsersOnProject(dt) {
    // console.log('putUsersOnProject', dt);
    if (dt[0].whoatd_id != '0') {
        // let cinId = dt[0].usr_id;
        $.each(dt, function (v, u) {
            switch (u.are_id) {
                case '1':
                    let locselP = document.querySelector('#selUsrP');
                    locselP.value = u.emp_id;
                    break;
                case '2':
                    let locselC = document.querySelector('#selUsrC');
                    locselC.value = u.emp_id;
                    break;
                case '3':
                    let locselA = document.querySelector('#selUsrA');
                    locselA.value = u.emp_id;
                    break;
                default:
            }
        });
    }
}

function confirm_toChgUsr(pjtid) {
    $('#starClosure').modal('show');
    $('#txtIdClosure').val(pjtid);
    //borra paquete +
    $('#btnClosure').on('click', function () {
        $('#starClosure').modal('hide');
        // console.log('Datos CLICK',pjtid);
        datasUser(pjtid);
    });
}

function CleanCombos() {
    $('#txtProjectName').val('');
    $('#selUsrP').val(0);
    $('#selUsrA').val(0);
    $('#selUsrC').val(0);
}

function datasUser(pjtid) {
    let empid='';
    let empname='';
    let areid=0;
    
    for (var i = 1; i < 4; i++) {
        switch (i) {
            case 1:
                empid=$('#selUsrP').val();
                if (empid=='0'){
                    empname='';
                } else{
                    empname=$(`#selUsrP option:selected`).text();
                }
                areid=1;
                break;
            case 2:
                empid=$('#selUsrC').val();
                if (empid=='0'){
                    empname='';
                } else{
                    empname=$(`#selUsrC option:selected`).text();
                }
                areid=2;
                break;
            case 3:
                empid=$('#selUsrA').val();
                if (empid=='0'){
                    empname='';
                } else{
                    empname=$(`#selUsrA option:selected`).text();
                }
                areid=3;
                break;
            default:
        }
        // console.log('Datos', pjtid,areid,empid,empname);
        updateUsers(pjtid,areid,empid,empname);
    }
}

function putupdateUser(dt){
    console.log('TERMINO ACTUALIZAR', dt);
    CleanCombos();
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

    // console.log('Datos', v, u, n, h);
    window.open(
        `${url}app/views/AssignProjects/AssignProjectsReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
}
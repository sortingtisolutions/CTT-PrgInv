let pjts = null;
$('document').ready(function () {
    url = getAbsolutePath();
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    if (altr == 1) {
        deep_loading('O');
        settingTable();
        getProjects();
        fillProjects();
        confirm_alert();
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}

//CONFIGURACION DE DATATABLE
function settingTable() {
    let title = 'Lista de proyectos';
    // $('#tblProducts').DataTable().destroy();
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    var tabla = $('#tblProjects').DataTable({
        order: [[2, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, 300, -1],
            [100, 200, 300, 'Todos'],
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
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        columns: [
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'projnumb', class: 'project_number'},
            {data: 'projname', class: 'project_name'},
            {data: 'projtype', class: 'project_type'},
            {data: 'dateregi', class: 'date_registry'},
            {data: 'datesini', class: 'date_initial'},
            {data: 'datesend', class: 'date_end'},
            {data: 'custname', class: 'customer_name'},
        ],
    });
}

//OBTIENE LISTA DE PROYECTOS POSIBLES PARA CANCELAR
function getProjects() {
    var pagina = 'ProjectCancel/listProjects';
    var par = '[{"pjtId":""}]';
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}

function putProjects(dt) {
    // console.log(dt);
    pjts = dt;
}

function fillProjects() {
    if (pjts != null) {
        $.each(pjts, function (v, u) {
            if (pjts[0].pjt_id != 0) fillProjectsTable(v);
        });
        deep_loading('C');
    } else {
        setTimeout(() => {
            fillProjects();
        }, 100);
    }
}

function fillProjectsTable(ix) {
    let tabla = $('#tblProjects').DataTable();
    tabla.row
        .add({
            editable: `<i class="fas fa-upload active" title="Habilita el proyecto" data-element="${pjts[ix].pjt_id}"></i><i class="fas fa-download kill" title="Cancela el proyecto definitivamente" data-element="${pjts[ix].pjt_id}" id="md${pjts[ix].pjt_id}"></i>`,
            projnumb: pjts[ix].pjt_number,
            projname: pjts[ix].pjt_name,
            projtype: pjts[ix].pjs_name,
            dateregi: pjts[ix].date_regs,
            datesini: pjts[ix].date_ini,
            datesend: pjts[ix].date_end,
            custname: pjts[ix].cus_name,
        })
        .draw();
    $('#md' + pjts[ix].pjt_id)
        .parents('tr')
        .attr('id', pjts[ix].pjt_id);

    actionButtons();
}

function actionButtons() {
    $('td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let pjtId = $(this).data('element');
            switch (acc) {
                case 'active':
                    console.log('habilita proyecto');
                    enableProject(pjtId);
                    break;
                case 'kill':
                    console.log('Elimina proyecto');
                    CancelProyect(pjtId);
                    break;
                default:
            }
        });
}

function CancelProyect(pjtId) {
    let H = `<div class="emergent__warning">
        <p>¿Realmente requieres cancelar este Proyecto?</p>
        <button id="killYes" class="btn btn-primary">Si</button>  
        <button id="killNo" class="btn btn-danger">No</button>  
        </div>`;

    $('body').append(H);

    $('.emergent__warning .btn')
        .unbind('click')
        .on('click', function () {
            let obj = $(this);
            let resp = obj.attr('id');
            if (resp == 'killYes') {
                modalLoading('S', 'Cancelando proyecto y liberando productos');
                var pagina = 'ProjectCancel/CancelProject';
                var par = `[{"pjtId":"${pjtId}"}]`;
                var tipo = 'html';
                var selector = putCancelProject;
                fillField(pagina, par, tipo, selector);
            }
            obj.parent().remove();
        });
}

function enableProject(pjtId) {
    console.log(pjtId);
    modalLoading('S', 'Habilitando proyecto');
    var pagina = 'ProjectCancel/EnableProject';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = putCancelProject;
    fillField(pagina, par, tipo, selector);
}

function putCancelProject(dt) {
    console.log(dt);
    // getProjects();
    let tabla = $('#tblProjects').DataTable();
    tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    modalLoading('H');
}

function modalLoading(acc, msg) {
    if (acc == 'S') {
        $('.invoice__modalBackgound').fadeIn('slow');
        $('.invoice__loading').slideDown('slow').css({'z-index': 401, display: 'flex'});
        $('.invoice__loading .text_loading > span').html(msg);
    } else {
        $('.invoice__loading').slideUp('slow', function () {
            $('.invoice__modalBackgound').fadeOut('slow');
            $('.invoice__loading .text_loading > span').html('');
        });
    }
}

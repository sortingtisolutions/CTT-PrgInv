let pjts = null;
$('document').ready(function () {
    url = getAbsolutePath();
    if (verifica_usuario()) {
        inicial();
    }
});

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
            {data: 'dateregi', class: 'date_registry'},
            {data: 'datesini', class: 'date_initial'},
            {data: 'datesend', class: 'date_end'},
            {data: 'custname', class: 'customer_name'},
        ],
    });
}

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
            editable: `<i class="fas fa-times-circle kill" id ="md${pjts[ix].pjt_id}"></i>`,
            projnumb: pjts[ix].pjt_number,
            projname: pjts[ix].pjt_name,
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
            let pjtId = $(this).parents('tr').attr('id');

            switch (acc) {
                case 'modif':
                    //editProject(pjtId);
                    break;
                case 'kill':
                    CancelProyect(pjtId);
                    break;
                default:
            }
        });
}

function CancelProyect(pjtId) {
    $('#confirmModal').modal('show');

    $('#confirmModalLevel').html('¿Seguro que desea cancelar el proyecto?');
    $('#N').html('No cancelar');
    $('#confirmButton').html('Cancelar proyecto');
    $('#Id').val(pjtId);

    $('#confirmButton').on('click', function () {
        var pagina = 'ProjectCancel/CancelProject';
        var par = `[{"pjtId":"${pjtId}"}]`;
        var tipo = 'html';
        var selector = putCancelProject;
        fillField(pagina, par, tipo, selector);
    });
}

function putCancelProject(dt) {
    getProjects();
    let tabla = $('#tblProjects').DataTable();
    tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    $('#confirmModal').modal('hide');
}

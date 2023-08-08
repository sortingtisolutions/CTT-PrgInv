let subs = null;
let sbnme = '';

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    if (altr == 1) {
        deep_loading('O');
        settingTable();
        getReasons();
        confirm_alert();
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }

    setInterval(() => {
        activeIcons();
    }, 2000);
}


/** ---- Obtiene listado de subcategorias */
function getReasons() {
    var pagina = 'ListMaintenance/listReasons';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putReasons;
    fillField(pagina, par, tipo, selector);
}
/** ---- Registra la nueva razon de mantenimiento ---- */
function saveReasons(descReas,defReas,codeMotiv) {
    var par = `
    [{
        "descReas"   : "${descReas}",
        "defReas"   : "${defReas}",
        "codeMotiv"   : "${codeMotiv}"
    }]`;
    subs = null;
    var pagina = 'ListMaintenance/saveReasons';
    var tipo = 'html';
    var selector = putsaveReasons;
    fillField(pagina, par, tipo, selector);
}
/** ---- Actualiza la razon seleccionada ---- */
function updateReasons(pjtcrId,descReas,defReas,codeMotiv) {
    var par = `
        [{
            "pjtcrId"         : "${pjtcrId}",
            "descReas"       : "${descReas}",
            "defReas"       : "${defReas}",
            "codeMotiv"     : "${codeMotiv}"
        }]`;
    //console.log('Datos : ', par);
    subs = null;
    var pagina = 'ListMaintenance/updateReasons';
    var tipo = 'html';
    var selector = putupdateReasons;
    fillField(pagina, par, tipo, selector);
}

/** ---- COLOCADORES DE DATOS ---- */
function settingTable() {
    let title = 'Lista de Formas de Pago';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblReasonChange').DataTable({
        order: [
            [1, 'asc'],
        ],
        dom: 'Blfrtip',
        lengthMenu: [
            [50, 100,  -1],
            [50, 100, 'Todos'],
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
            url: 'app/assets/lib/dataTable/Spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        columns: [
            {data: 'editable', name: 'editable', class: 'edit', orderable: false},
            {data: 'lmaintmov', name: 'subccode', class: 'subCode center bold'},
            {data: 'lmaintdes', name: 'subcname', class: 'subName'},
            {data: 'motmain', name: 'motmain', class: 'subName'},
        ],
    });
    deep_loading('C');
   /*  activeIcons(); */
}

/** +++++  Activa la accion de eventos */
function activeIcons() {
    /**  ---- Acciones de Guardar categoria ----- */
    $('#btnSave')
        .unbind('click')
        .on('click', function () {
            if ($('#txtIdDefinition').val() == '') {
                console.log('Save');
                let descReas = $('#txtCrDescription').val().toUpperCase();
                let defReas = $('#txtCrDefinition').val().toUpperCase();
                let codeMotiv = $('#txtCodMotivos').val();
                saveReasons(descReas,defReas,codeMotiv);
            } else {
                let pjtcrId = $('#txtIdDefinition').val();
                let descReas = $('#txtCrDescription').val().toUpperCase();
                let defReas = $('#txtCrDefinition').val().toUpperCase();
                let codeMotiv = $('#txtCodMotivos').val();
                console.log('Update');
                updateReasons(pjtcrId,descReas,defReas,codeMotiv);
            }
        });

    /**  ---- Limpia los campos del formulario ----- */
    $('#btnClean')
        .unbind('click')
        .on('click', function () {
            $('#txtCrDescription').val('');
            $('#txtIdDefinition').val('');
            $('#txtCrDefinition').val('');
            $('#txtCodMotivos').val('');
        });

    /**  ---- Habilita los iconos de control de la tabla ----- */
    $('#tblReasonChange tbody tr td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let pjtcrId = $(this).closest('tr').attr('id');
            // console.log('Modif ',pjtcrId);
            switch (acc) {
                case 'modif':
                    editSubcategory(pjtcrId);
                    break;
                case 'kill':
                    deleteReason(pjtcrId);
                    break;
                default:
            }
        });
}

/** ---- Almacena las subcategorias ---- */
function putReasons(dt) {
    // console.log('1',dt);
    subs=dt;
    var prds=dt;
    $('#tblReasonChange tbody').html('');
    
    if (prds[0].pjtcr_id != '0') {
        $.each(prds, function (v, u) {
        
                var H = `
                <tr id="${u.pjtcr_id}">
                    <td class="edit"><i class='fas fa-pen modif'></i><i class="fas fa-times-circle kill"></i></td>    
                    <td class="supply" data-content="${u.pjtcr_definition}">${u.pjtcr_definition}</td>
                    <td class="supply">${u.pjtcr_description}</td>
                    <td class="supply">${u.pjtcr_code_stage}</td>
                </tr>`;
                $('#tblReasonChange tbody').append(H);
            }
        );
        // settingTable();
        // console.log('2', prds);
        activeIcons();
    } else {
        settingTable();
    }
}

/** ---- Agrega el nuevo registro a la tabla ---- */
function putsaveReasons(dt) {
    // subs=dt;
    console.log('putsaveReasons',dt);
    if (subs != null) {
        $('#btnClean').trigger('click');
        getReasons();
    } else {
        setTimeout(() => {
            getReasons();
            putsaveReasons(dt);
        }, 100);
    }
}

/** ---- Actualiza el registro en la tabla de subcategorias ---- */
function putupdateReasons(dt) {
    if (subs != null) {
        $('#btnClean').trigger('click');
        getReasons();
        deep_loading('C');
    } else {
        setTimeout(() => {
            getReasons();
            putupdateReasons(dt);
        }, 100);
    }
}

/** ---- Llena los campos del formulario para editar ---- */
function editSubcategory(pjtcrId) {
    let ix = goThroughReason(pjtcrId);
    $('#txtIdDefinition').val(subs[ix].pjtcr_id);
    $('#txtCrDescription').val(subs[ix].pjtcr_description);
    $('#txtCrDefinition').val(subs[ix].pjtcr_definition);
    $('#txtCodMotivos').val(subs[ix].pjtcr_code_stage);
}

/** ---- Borra el motivo de mamtenimiento ---- */
function deleteReason(pjtcrId) {
        $('#confirmModal').modal('show');
        $('#confirmModalLevel').html('¿Seguro que desea borrar el registro?');
        $('#N').html('Cancelar');
        $('#confirmButton').html('Borrar motivo').css({display: 'inline'});
        $('#Id').val(pjtcrId);
        $('#confirmButton').on('click', function () {
            var pagina = 'ListMaintenance/deleteReason';
            var par = `[{"pjtcrId":"${pjtcrId}"}]`;
            var tipo = 'html';
            var selector = putdeleteReason;
            fillField(pagina, par, tipo, selector);
        });
}
/** ---- Elimina el registro de la subcategoria borrada ---- */
function putdeleteReason(dt) {
    // console.log('BORRAR LINEA');
    getReasons();

    $('#confirmModal').modal('hide');
}

function goThroughReason(pjtcrId) {
    let inx = -1;
    $.each(subs, function (v, u) {
        if (pjtcrId == u.pjtcr_id) inx = v;
    });
    return inx;
}
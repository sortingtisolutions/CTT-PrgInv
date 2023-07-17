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
        getSubcategories();
        getlistProjects();
       
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }

    setInterval(() => {
        activeIcons();
    }, 2000);
}

/** ---- PETICIÓN DE DATOS ----*/
/** ---- Obtiene listado de subcategorias */
function getSubcategories() {
    var pagina = 'PaymentsApplied/listPaymentsApplied';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putSubcategories;
    fillField(pagina, par, tipo, selector);
}

function getlistProjects() {
    var pagina = 'PaymentsApplied/listProjects';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putlistProjects;
    fillField(pagina, par, tipo, selector);
}

/** ---- COLOCADORES DE DATOS ---- */
function settingTable() {
    let title = 'Lista de Formas de Pago';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblPymApplied').DataTable({
        order: [
            [1, 'asc'],
        ],
        dom: 'Blfrtip',
        lengthMenu: [
            [50, 100, 200, -1],
            [50, 100, 200, 'Todos'],
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
            /* {data: 'editable', name: 'editable', class: 'edit', orderable: false}, */
            {data: 'subccode', name: 'subccode', class: 'subCode center bold'},
            {data: 'subcname', name: 'subcname', class: 'subName'},
            {data: 'subcname', name: 'subcname', class: 'subName'},
            {data: 'subcname', name: 'subcname', class: 'subName'},
            {data: 'subcname', name: 'subcname', class: 'subName'},
            {data: 'catgcode', name: 'catgcode', class: 'catCode center'},
        ],
    });
    deep_loading('C');
   /*  activeIcons(); */
}

/** ---- Almacena las subcategorias ---- */
function putSubcategories(dt) {
    console.log('1',dt);
    $('#tblPymApplied tbody').html('');
    var prds=dt;
    if (prds[0].pym_id != '0') {
        
        // var catId = prds[0].wtp_id;
        $.each(prds, function (v, u) {
        // if (u.wtp_id != '') {
                var H = `
                <tr id="${u.pym_id}">
                <!-- <td class="edit"><i class='fas fa-pen modif'></i><i class="fas fa-times-circle kill"></i></td> -->
                    <td class="supply">${u.pjt_name}</td>    
                    <td class="sku" data-content="${u.pym_folio}">${u.pym_folio}</td>
                    <td class="sku">${u.pym_amount}</td>
                    <td class="date">${u.pym_date_paid}</td>
                    <td class="date">${u.pym_date_done}</td>
                    <td class="supply">${u.wtp_description}</td>
                </tr>`;
                $('#tblPymApplied tbody').append(H);
            }
        //}
        );
        
        // settingTable();
        console.log('2', prds);
        activeIcons();
    } else {
        settingTable();
    }
}

function putlistProjects(dt) {
    console.log(dt);
    subs = dt;
    $.each(subs, function (v, u) {
        var H = `<option value="${u.pjt_id}">${u.pjt_id} - ${u.pjt_name}</option>`;
        $('#lstProjects').append(H);
    });
}

/** +++++  Activa la accion de eventos */
function activeIcons() {
    /**  ---- Acciones de Guardar categoria ----- */
    $('#btnSave')
        .unbind('click')
        .on('click', function () {
            if (ValidForm() == 1) {
                if ($('#txtIdSubcategory').val() == '') {
                    //console.log('Save');
                    // saveSubcategory();
                } else {
                    //console.log('Update');
                    // updateSubcategory();
                }
            }
        });

    /**  ---- Limpia los campos del formulario ----- */
    $('#btnClean')
        .unbind('click')
        .on('click', function () {
            $('#lstProjects').val('');
            // settingTable();
            getSubcategories();
            getlistProjects();
            // $('#txtIdSubcategory').val('');
            // $('#txtWtpCve').val('');
            // $('#txtWtpStatus').val('');
        });

    /**  ---- Habilita los iconos de control de la tabla ----- */
    /* $('#tblPymApplied tbody tr td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let sbcId = $(this).closest('tr').attr('id');

            switch (acc) {
                case 'modif':
                    editSubcategory(sbcId);
                    break;
                case 'kill':
                    deleteSubcategory(sbcId);
                    break;
                default:
            }
        }); */

    /**  ---- Habilita el bullet de cantidad para consulta de existencias ----- */
   /*  $('#tblPymApplied tbody tr td.quantity .toLink')
        .unbind('click')
        .on('click', function () {
            selectSeries($(this));
        }); */
}

/** -------------------------------------------------------------------------- */
/** ---- Start GRABA NUEVA SUBCATEGORIA ---- */
/** ---- Registra la nueva subcategoria ---- */
function saveSubcategory() {
    let subcatNm = $('#txtWtpDescription').val().toUpperCase();
    let subcatCd = $('#txtWtpCve').val().toUpperCase();
    let categyId = $('#txtWtpStatus').val();

    var par = `
    [{
        "sbcName"   : "${subcatNm}",
        "sbcCode"   : "${subcatCd}",
        "catId"     : "${categyId}"
    }]`;

    subs = null;
    var pagina = 'PaymentsApplied/SaveSubcategory';
    var tipo = 'html';
    var selector = putSaveSubcategory;
    fillField(pagina, par, tipo, selector);
}
/** ---- Agrega el nuevo registro a la tabla ---- */
function putSaveSubcategory(dt) {
    if (subs != null) {
        $('#btnClean').trigger('click');
        let ix = goThroughSubcategory(dt);
        let tabla = $('#tblPymApplied').DataTable();
        tabla.draw();
    } else {
        setTimeout(() => {
            getSubcategories();
            putSaveSubcategory(dt);
        }, 100);
    }
}
/** ---- Start EDITA SUBCATEGORIA ---- */
/** ---- Llena los campos del formulario para editar ---- */
function editSubcategory(sbcId) {
    let ix = goThroughSubcategory(sbcId);
    $('#txtWtpDescription').val(subs[ix].sbc_name);
    $('#txtIdSubcategory').val(subs[ix].sbc_id);
    $('#txtWtpCve').val(subs[ix].sbc_code);
    $('#txtWtpStatus').val(subs[ix].cat_id);
}
/** ---- Actualiza la subcategoria seleccionada ---- */
function updateSubcategory() {
    var sbcId = $('#txtIdSubcategory').val();
    var sbcName = $('#txtWtpDescription').val();
    var sbcCode = $('#txtWtpCve').val();
    var catId = $('#txtWtpStatus').val();
    var par = `
        [{
            "sbcId"    : "${sbcId}",
            "sbcName"  : "${sbcName}",
            "sbcCode"  : "${sbcCode}",
            "catId"    : "${catId}"
        }]`;
    //console.log('Datos : ', par);
    subs = null;
    var pagina = 'PaymentsApplied/UpdateSubcategory';
    var tipo = 'html';
    var selector = putUpdateSubcategory;
    fillField(pagina, par, tipo, selector);
}
/** ---- Actualiza el registro en la tabla de subcategorias ---- */
function putUpdateSubcategory(dt) {
    if (subs != null) {
        let ix = goThroughSubcategory(dt);
        $('#btnClean').trigger('click');
        let tabla = $('#tblPymApplied').DataTable();
        tabla.draw();
        deep_loading('C');
    } else {
        setTimeout(() => {
            getSubcategories();
            putUpdateSubcategory(dt);
        }, 100);
    }
}

/** ---- Start ELIMINA SUBCATEGORIA ---- */
/** ---- Borra la subcategorias ---- */
function deleteSubcategory(sbcId) {
    let cn = $(`#${sbcId}`).children('td.quantity').children('.toLink').html();

    if (cn != 0) {
        $('#confirmModal').modal('show');
        $('#confirmModalLevel').html('No se puede borrar el registro, porque contiene existencias.');
        $('#N').html('Cancelar');
        $('#confirmButton').html('').css({display: 'none'});
        $('#Id').val(0);
    } else {
        $('#confirmModal').modal('show');

        $('#confirmModalLevel').html('¿Seguro que desea borrar la subcategoria?');
        $('#N').html('Cancelar');
        $('#confirmButton').html('Borrar subcategoria').css({display: 'inline'});
        $('#Id').val(sbcId);
        console.log('BORRAR REGISTRO');
        $('#confirmButton').on('click', function () {
            var pagina = 'PaymentsApplied/DeleteSubcategory';
            var par = `[{"sbcId":"${sbcId}"}]`;
            var tipo = 'html';
            var selector = putDeleteSubcategory;
            fillField(pagina, par, tipo, selector);
        });
    }
}
/** ---- Elimina el registro de la subcategoria borrada ---- */
function putDeleteSubcategory(dt) {
    console.log('BORRAR LINEA');
    getCategories();
    let tabla = $('#tblPymApplied').DataTable();
    tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    $('#confirmModal').modal('hide');
}


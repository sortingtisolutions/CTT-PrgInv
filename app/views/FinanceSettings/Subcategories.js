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
        getCategories();
        getSubcategories();
        confirm_alert();
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }

    setInterval(() => {
        activeActions();
    }, 2000);
}

/** ---- PETICIÓN DE DATOS ----*/
/** ---- Obtiene listado de categorias */
function getCategories() {
    var pagina = 'Subcategories/listCategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}

/** ---- Obtiene listado de subcategorias */
function getSubcategories() {
    // deep_loading('O');
    var pagina = 'Subcategories/listSubcategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putSubcategories;
    fillField(pagina, par, tipo, selector);
}

/** ---- COLOCADORES DE DATOS ---- */
/** ---- Coloca las categorias en el selector */
function putCategories(dt) {
    if (dt[0].cat_id != '0') {
        $.each(dt, function (v, u) {
            var H = `<option value="${u.cat_id}">${u.cat_name}</option>`;
            $('#lstCategory').append(H);
        });
    }
}

/** ---- Almacena las subcategorias ---- */
function putSubcategories(dt) {
    subs = dt;
    fillSubcategorieslst();
}

/** +++++  configura la table de subcategorias */
function settingTable() {
    let title = 'Lista de subcategorias';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblSubcategory').DataTable({
        order: [
            [5, 'asc'],
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
        fixedHeader: true,
        createdRow: function (nRow, aData, iDataIndex) {
            $(nRow).attr('id', aData['subcatid']);
        },
        processing: true,
        serverSide: true,
        ajax: {url: 'Subcategories/tableSubcategories', type: 'POST'},
        columns: [
            {data: 'editable', name: 'editable', class: 'edit'},
            {data: 'subcatid', name: 'subcatid', class: 'id hide'},
            {data: 'subccode', name: 'subccode', class: 'subCode center bold'},
            {data: 'subcname', name: 'subcname', class: 'subName'},
            {data: 'catgname', name: 'catgname', class: 'catName'},
            {data: 'catgcode', name: 'catgcode', class: 'catCode center'},
            {data: 'quantity', name: 'quantity', class: 'quantity'},
        ],
    });
    deep_loading('C');
    activeActions();
}

/** ---- Llena la lista de subcategorias ---- */
function fillSubcategorieslst() {
    $.each(subs, function (v, u) {
        var H = `<option value="${u.sbc_id}">${u.cat_id} | ${u.sbc_code} - ${u.sbc_name}</option>`;
        $('#lstSubcategory').append(H);
    });
}

/** +++++  Activa la accion de eventos */
function activeActions() {
    /**  ---- Acciones de Guardar categoria ----- */
    $('#btnSave')
        .unbind('click')
        .on('click', function () {
            if (ValidForm() == 1) {
                if ($('#txtIdSubcategory').val() == '') {
                    //console.log('Save');
                    saveSubcategory();
                } else {
                    //console.log('Update');
                    updateSubcategory();
                }
            }
        });

    /**  ---- Limpia los campos del formulario ----- */
    $('#btnClean')
        .unbind('click')
        .on('click', function () {
            $('#txtSubcategory').val('');
            $('#txtIdSubcategory').val('');
            $('#txtCodeSubcategory').val('');
            $('#txtSubcategoryCode').val('');
            $('#lstSubcategory').val('');
            $('#lstCategory').val('');
        });

    /**  ---- Habilita los iconos de control de la tabla ----- */
    $('#tblSubcategory tbody tr td.edit i')
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
        });

    /**  ---- Habilita el bullet de cantidad para consulta de existencias ----- */
    $('#tblSubcategory tbody tr td.quantity .toLink')
        .unbind('click')
        .on('click', function () {
            selectSeries($(this));
        });
}

/** -------------------------------------------------------------------------- */
/** ---- Start GRABA NUEVA SUBCATEGORIA ---- */
/** ---- Registra la nueva subcategoria ---- */
function saveSubcategory() {
    let subcatNm = $('#txtSubcategory').val().toUpperCase();
    let subcatCd = $('#txtSubcategoryCode').val().toUpperCase();
    let categyId = $('#lstCategory').val();

    var par = `
    [{
        "sbcName"   : "${subcatNm}",
        "sbcCode"   : "${subcatCd}",
        "catId"     : "${categyId}"
    }]`;

    subs = null;
    var pagina = 'Subcategories/SaveSubcategory';
    var tipo = 'html';
    var selector = putSaveSubcategory;
    fillField(pagina, par, tipo, selector);
}
/** ---- Agrega el nuevo registro a la tabla ---- */
function putSaveSubcategory(dt) {
    if (subs != null) {
        $('#btnClean').trigger('click');
        let ix = goThroughSubcategory(dt);
        let tabla = $('#tblSubcategory').DataTable();
        tabla.draw();
    } else {
        setTimeout(() => {
            getSubcategories();
            putSaveSubcategory(dt);
        }, 100);
    }
}
/** ---- End GRABA NUEVA SUBCATEGORIA ---- */
/** -------------------------------------------------------------------------- */

/** -------------------------------------------------------------------------- */
/** ---- Start EDITA SUBCATEGORIA ---- */
/** ---- Llena los campos del formulario para editar ---- */
function editSubcategory(sbcId) {
    let ix = goThroughSubcategory(sbcId);
    $('#txtSubcategory').val(subs[ix].sbc_name);
    $('#txtIdSubcategory').val(subs[ix].sbc_id);
    $('#txtSubcategoryCode').val(subs[ix].sbc_code);
    $('#lstCategory').val(subs[ix].cat_id);
}
/** ---- Actualiza la subcategoria seleccionada ---- */
function updateSubcategory() {
    var sbcId = $('#txtIdSubcategory').val();
    var sbcName = $('#txtSubcategory').val();
    var sbcCode = $('#txtSubcategoryCode').val();
    var catId = $('#lstCategory').val();
    var par = `
        [{
            "sbcId"    : "${sbcId}",
            "sbcName"  : "${sbcName}",
            "sbcCode"  : "${sbcCode}",
            "catId"    : "${catId}"
        }]`;
    //console.log('Datos : ', par);
    subs = null;
    var pagina = 'Subcategories/UpdateSubcategory';
    var tipo = 'html';
    var selector = putUpdateSubcategory;
    fillField(pagina, par, tipo, selector);
}
/** ---- Actualiza el registro en la tabla de subcategorias ---- */
function putUpdateSubcategory(dt) {
    if (subs != null) {
        let ix = goThroughSubcategory(dt);
        $('#btnClean').trigger('click');
        let tabla = $('#tblSubcategory').DataTable();
        tabla.draw();
        deep_loading('C');
    } else {
        setTimeout(() => {
            getSubcategories();
            putUpdateSubcategory(dt);
        }, 100);
    }
}
/** ---- End EDITA SUBCATEGORIA ---- */
/** -------------------------------------------------------------------------- */

/** -------------------------------------------------------------------------- */
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
            var pagina = 'Subcategories/DeleteSubcategory';
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
    let tabla = $('#tblSubcategory').DataTable();
    tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    $('#confirmModal').modal('hide');
}
/** ---- End ELIMINA SUBCATEGORIA ---- */

/** ---- Start LISTADO DE SERIES ---- */
/** ---- Obtiene las series de la subcategoria seleccionada ---- */
function selectSeries(reg) {
    let sbcId = reg.parents('tr').attr('id');
    let quant = reg.html();
    let sbnme = reg.parents('tr').children('td.subName').html();
    subnme = sbnme;
    if (quant > 0) {
        var pagina = 'Subcategories/listSeries';
        var par = `[{"sbcId":"${sbcId}"}]`;
        var tipo = 'json';
        var selector = putSeries;
        fillField(pagina, par, tipo, selector);
    }
}

function putSeries(dt) {
    $('#tblStock tbody').html('');
    $.each(dt, function (v, u) {
        let H = `
            <tr>
                <td>${u.ser_sku}</td>
                <td>${u.prd_name}</td>
                <td>${u.ser_serial_number}</td>
                <td>${u.ser_date_registry}</td>
                <td>${u.ser_cost}</td>
                <td>${u.ser_situation}</td>
                <td>${u.ser_stage}</td>
                <td>${u.ser_comments}</td>
            </tr>
        `;
        $('#tblStock tbody').append(H);
    });

    settindStockTbl();
    $('.overlay_closer .title').html(`Subcategorias - ${subnme}`);
    $('#ModifySerieModal').removeClass('overlay_hide');

    $('#ModifySerieModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
            $('#tblStock').DataTable().destroy();
        });
}

function settindStockTbl() {
    $('#tblStock').DataTable({
        destroy: true,
        order: [[1, 'asc']],
        lengthMenu: [
            [50, 100, 150, 200, -1],
            [50, 100, 150, 200, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'produsku', class: 'sku'},
            {data: 'prodname', class: 'productName'},
            {data: 'serlnumb', class: 'serieNumber'},
            {data: 'dateregs', class: 'dateRegs'},
            {data: 'servcost', class: 'quantity'},
            {data: 'cvstatus', class: 'code-type_s'},
            {data: 'cvestage', class: 'code-type_s'},
            {data: 'comments', class: 'comments'},
        ],
    });
}

// Obtiene el STOCK
function get_quantity(sbcId) {
    var pagina = 'Subcategories/countQuantity';
    var par = `[{"sbcId":"${sbcId}"}]`;
    var tipo = 'json';
    var selector = putQuantity;
    fillField(pagina, par, tipo, selector);
}
// Coloca el nuevo STOCK
function putQuantity(dt) {
    let sbcid = dt[0].sbc_id;
    let qty = dt[0].cantidad;
    $('#' + sbcid)
        .children('td.quantity')
        .children('.toLink')
        .html(qty);
    $('#' + sbcid)
        .children('td.quantity')
        .attr('data-content', qty);
}

//  Obtiene el indice de la subcategoria seleccionada
function goThroughSubcategory(sbcId) {
    let inx = -1;
    $.each(subs, function (v, u) {
        if (sbcId == u.sbc_id) inx = v;
    });
    return inx;
}

//Valida los campos seleccionado *
function ValidForm() {
    var valor = 1;
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form) {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            valor = 0;
        }
    });
    return valor;
}

let subs = null;
let subnme = '';

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});

function inicial() {
    setTimeout(() => {
        getCategories();
        getSubcategories();
        fillSubcategories();
    }, 300);
}

function settingTable() {
    let title = 'Lista de Subcategorias';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblSubcategory').DataTable({
        order: [
            [3, 'asc'],
            [2, 'asc'],
        ],
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
            {
                text: 'Borrar seleccionados',
                // className: 'btn-apply hidden-field',
                // action: function () {
                //     var selected = table.rows({selected: true}).data();
                //     var idSelected = '';
                //     selected.each(function (index) {
                //         idSelected += index[1] + ',';
                //     });
                //     idSelected = idSelected.slice(0, -1);
                //     if (idSelected != '') {
                //         ConfirmDeletCategoria(idSelected);
                //    }
                //},
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'scatcode', class: 'subcatCode'},
            {data: 'scatname', class: 'subcatName'},
            {data: 'scatcatg', class: 'CategoryName'},
            {data: 'scatccat', class: 'categoryCode center'},
            {data: 'quantity', class: 'quantity'},
        ],
    });
    console.log('acction');
    actionButtons();
}

function getCategories() {
    var pagina = 'SubCategorias/GetCategories';
    var par = `[{"catId":""}]`;
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}

function getSubcategories() {
    // Solicita los productos de un almacen seleccionado
    deep_loading('O');
    var pagina = 'SubCategorias/getSubcategories';
    var par = `[{"catId":""}]`;
    var tipo = 'json';
    var selector = putSubcategories;
    fillField(pagina, par, tipo, selector);
}

function putSubcategories(dt) {
    subs = dt;
    // console.log(subs);
}
function fillSubcategories() {
    if (subs != null) {
        putListSubcategories(subs);
        // let tabla = $('#tblSubcategory').DataTable();
        // tabla.rows().remove().draw();
        $.each(subs, function (v, u) {
            fillTableSubcategories(v);
        });
        deep_loading('C');
        settingTable();
    } else {
        setTimeout(() => {
            fillSubcategories();
        }, 100);
    }
}

function fillTableSubcategories(ix) {
    let H = `
        <tr id = "${subs[ix].sbc_id}">
            <td class="edit"><i class="fas fa-pen modif"></i><i class="fas fa-times-circle kill"></i></td>
            <td class="subcatCode">${subs[ix].sbc_code}</td>
            <td class="subcatName">${subs[ix].sbc_name}</td>
            <td class="CategoryName">${subs[ix].cat_name}</td>
            <td class="categoryCode">${subs[ix].cat_id}</td>
            <td class="quantity"><span class="toLink">0</span></td>
        </tr>
    `;
    $('#tblSubcategory').append(H);
}
function x_fillTableSubcategories(ix) {
    let tabla = $('#tblSubcategory').DataTable();
    let trow = tabla.row
        .add({
            editable: `<i class="fas fa-pen modif"></i><i class="fas fa-times-circle kill"></i>`,
            scatcode: subs[ix].sbc_code,
            scatname: subs[ix].sbc_name,
            scatcatg: subs[ix].cat_name,
            scatccat: subs[ix].cat_id,
            quantity: `<span class="toLink">0</span>`,
        })
        .draw()
        .node();

    let id = subs[ix].sbc_id;
    $(trow).attr('id', id);

    get_quantity(subs[ix].sbc_id);
}

function putCategories(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.cat_id}">${u.cat_name}</option>`;
        $('#txtCategory').append(H);
    });
}

function putListSubcategories(dt) {
    $('#lstSubcategory').html('<option value="0">Seleccione...</option> ');
    $.each(dt, function (v, u) {
        let H = `<option value="${u.sbc_id}">${u.cat_id} - ${u.sbc_code} | ${u.sbc_name}</option>`;
        $('#lstSubcategory').append(H);
    });
}

function saveSubcategory() {
    var sbcName = $('#txtSubcategory').val();
    var sbcCode = $('#txtCodeSubcategory').val();
    var catId = $('#txtCategory').val();
    var par = `
        [{
            "sbcName"   : "${sbcName}",
            "sbcCode"   : "${sbcCode}",
            "catId"     : "${catId}"
        }]`;

    subs = '';
    var pagina = 'SubCategorias/SaveSubcategoria';
    var tipo = 'html';
    var selector = putSaveSubcategory;
    fillField(pagina, par, tipo, selector);
}
function putSaveSubcategory(dt) {
    if (subs.length > 0) {
        let ix = goThroughSubcategory(dt);
        fillTableSubcategories(ix);
        $('#LimpiarFormulario').trigger('click');
        deep_loading('C');
    } else {
        setTimeout(() => {
            getSubcategories();
            putSaveSubcategory(dt);
        }, 100);
    }
}

function updateSubcategory() {
    var sbcId = $('#txtIdSubcategory').val();
    var sbcName = $('#txtSubcategory').val();
    var sbcCode = $('#txtCodeSubcategory').val();
    var catId = $('#txtCategory option:selected').val();
    var par = `
        [{
            "sbcId"    : "${sbcId}",
            "sbcName"  : "${sbcName}",
            "sbcCode"  : "${sbcCode}",
            "catId"    : "${catId}"
        }]`;

    subs = '';
    var pagina = 'SubCategorias/UpdateSubcategoria';
    var tipo = 'html';
    var selector = putUpdateSubcategory;
    fillField(pagina, par, tipo, selector);
}
function putUpdateSubcategory(dt) {
    if (subs.length > 0) {
        let ix = goThroughSubcategory(dt);

        $(`#${subs[ix].sbc_id}`).children('td.subcatName').html(subs[ix].sbc_name);
        $(`#${subs[ix].sbc_id}`).children('td.subcatCode').html(subs[ix].sbc_code);
        $(`#${subs[ix].sbc_id}`).children('td.categoryName').html(Cbs[ix].cat_name);
        $(`#${subs[ix].sbc_id}`).children('td.categoryCode').html(subs[ix].cat_id);
        putQuantity(subs[ix].sbc_id);
        $('#LimpiarFormulario').trigger('click');
        deep_loading('C');
    } else {
        setTimeout(() => {
            getSubcategories();
            putUpdateSubcategory(dt);
        }, 100);
    }
}

function editSubcategory(sbcId) {
    let ix = goThroughSubcategory(sbcId);
    $('#txtSubcategory').val(subs[ix].sbc_name);
    $('#txtIdSubcategory').val(subs[ix].sbc_id);
    $('#txtCodeSubcategory').val(subs[ix].sbc_code);
    $('#txtCategory').val(subs[ix].cat_id);
}

function deleteSubcategory(sbcId) {
    let cn = $(`#${sbcId}`).children('td.quantity').children('.toLink').html();

    if (cn != 0) {
        $('#NoBorrarModal').modal('show');
    } else {
        $('#BorrarSubCategoriaModal').modal('show');
        $('#IdSubCategoriaBorrar').val(sbcId);

        $('#BorrarSubCategorias').on('click', function () {
            var pagina = 'SubCategorias/DeleteSubcategoria';
            var par = `[{"sbcId":"${sbcId}"}]`;
            var tipo = 'html';
            var selector = putDeleteSubcategory;
            fillField(pagina, par, tipo, selector);
        });
    }
}
function putDeleteSubcategory(dt) {
    getCategories();
    let tabla = $('#tblSubcategory').DataTable();
    tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    $('#BorrarSubCategoriaModal').modal('hide');
}

function putSeries(dt) {
    console.log(dt);
    $('#ExisteCatModal').removeClass('overlay_hide');
    $('#tblCatSerie').DataTable({
        destroy: true,
        order: [[1, 'asc']],
        lengthMenu: [
            [100, 150, 200, -1],
            [100, 150, 200, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'sermodif', class: 'edit'},
            {data: 'produsku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
            {data: 'serlnumb', class: 'product-name'},
            {data: 'dateregs', class: 'sku'},
            {data: 'servcost', class: 'quantity'},
            {data: 'cvstatus', class: 'code-type_s'},
            {data: 'cvestage', class: 'code-type_s'},
            {data: 'comments', class: 'comments'},
        ],
    });

    $('#ExisteCatModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    build_modal_serie(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_serie(dt) {
    let tabla = $('#tblCatSerie').DataTable();
    $('.overlay_closer .title').html(`Catalogo - ${subnme}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                /*sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i><i class="fas fa-times-circle serie kill" id="K${u.ser_id}"></i>`,*/
                sermodif: `<i></i>`,
                produsku: `${u.ser_sku.slice(0, 7)}-${u.ser_sku.slice(7, 11)}`,
                prodname: u.prd_name,
                serlnumb: u.ser_serial_number,
                dateregs: u.ser_date_registry,
                servcost: u.ser_cost,
                cvstatus: u.ser_situation,
                cvestage: u.ser_stage,
                comments: u.ser_comments,
            })
            .draw();
        $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.prd_id);
        deep_loading('C');
    });
}

function actionButtons() {
    console.log('a');
    /**  ---- Acciones de edición ----- */
    $('#tblSubcategory tbody tr td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let sbcId = $(this).parents('tr').attr('id');
            console.log(acc, sbcId);

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

    $('#tblSubcategory tbody tr td span.toLink')
        .unbind('click')
        .on('click', function () {
            let sbcId = $(this).parents('tr').attr('id');
            let quant = $(this).html();
            let ctnme = $(this).parents('tr').children('td.category-name').html();
            subnme = ctnme;
            console.log(sbcId, quant, ctnme);
            if (quant > 0) {
                deep_loading('O');
                var pagina = 'SubCategorias/listSeries';
                var par = `[{"sbcId":"${sbcId}"}]`;
                var tipo = 'json';
                var selector = putSeries;
                fillField(pagina, par, tipo, selector);
            }
        });

    /**  ---- Acciones de Guardar categoria ----- */
    $('#btnSave')
        .unbind('click')
        .on('click', function () {
            if (validaFormulario() == 1) {
                if ($('#txtIdSubcategory').val() == '') {
                    saveSubcategory();
                } else {
                    updateSubcategory();
                }
            }
        });
    /**  ---- Lismpia los campos ----- */
    $('#LimpiarFormulario')
        .unbind('click')
        .on('click', function () {
            $('#txtSubcategory').val('');
            $('#txtIdSubcategory').val('');
            $('#txtCodeSubcategory').val('');
            $('#lstSubcategory').val(0);
            $('#txtCategory').val(0);
        });
}

function get_quantity(sbcId) {
    var pagina = 'SubCategorias/countQuantity';
    var par = `[{"sbcId":"${sbcId}"}]`;
    var tipo = 'json';
    var selector = putQuantity;
    fillField(pagina, par, tipo, selector);
}

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

function goThroughSubcategory(sbcId) {
    let inx = -1;
    $.each(subs, function (v, u) {
        if (sbcId == u.sbc_id) inx = v;
    });
    return inx;
}

//Valida los campos seleccionado *
function validaFormulario() {
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

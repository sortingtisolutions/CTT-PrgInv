let cats = null;
let catnme = '';

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});

function inicial() {
    if (altr == 1) {
        // console.log('PASO 1');
        deep_loading('O');
        settingTable();
        getCategories();
        getStores();
        getAreas();
        fillCategories();
        confirm_alert();
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}

//CONFIGURACION DE DATATABLE
function settingTable() {
    let title = 'Lista de Catálogos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    // console.log('PASO 1');
    $('#CategoriasTable').DataTable({
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [50, 100, -1],
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
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            { data: 'editable', class: 'edit', orderable: false },
            { data: 'category', class: 'sku' },
            { data: 'catname',  class: 'category-name' },
            { data: 'storename', class: 'store-name' },
            { data: 'quantity', class: 'quantity' },
            { data: 'area',     class: 'store-name' },
        ],
    });
}

function getCategories() {
    // Solicita los productos de un almacen seleccionado
    var pagina = 'Categorias/GetCategorias';
    var par = `[{"cat_id":""}]`;
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}

function getStores() {
    // Solicita los productos de un almacen seleccionado
    var pagina = 'Categorias/GetAlmacenes';
    var par = `[{"cat_id":""}]`;
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}

function getAreas() {
    // Solicita los productos de un almacen seleccionado
    var pagina = 'Categorias/listAreas';
    var par = `[{"are_id":""}]`;
    var tipo = 'json';
    var selector = putAreas;
    fillField(pagina, par, tipo, selector);
}

function putCategories(dt) {
    cats = dt;
}

//lena los datos de las categorias
function fillCategories() {
    if (cats != null) {
        let tabla = $('#CategoriasTable').DataTable();
        $.each(cats, function (v, u) {
            fillTableCategories(v);
        });
    } else {
        setTimeout(() => {
            fillCategories();
        }, 100);
    }
}

function actionButtons() {
    /**  ---- Acciones de edición ----- */
    $('td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let catId = $(this).parents('tr').attr('id');
            //console.log($(this).attr('class').split(' '));
            //console.log(acc);
            switch (acc) {
                case 'modif':
                    editCategory(catId);
                    break;
                case 'kill':
                    deleteCategory(catId);
                    break;
                default:
            }
        });

    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let catId = $(this).parents('tr').attr('id');
            let quant = $(this).html();
            let ctnme = $(this)
                .parents('tr')
                .children('td.category-name')
                .html();
            catnme = ctnme;
            // console.log(catId, quant, ctnme);
            if (quant > 0) {
                deep_loading('O');
                var pagina = 'Categorias/listSeries';
                var par = `[{"catId":"${catId}"}]`;
                var tipo = 'json';
                var selector = putSeries;
                fillField(pagina, par, tipo, selector);
            }
        });

    /**  ---- Acciones de Guardar categoria ----- */
    $('#GuardarCategoria')
        .unbind('click')
        .on('click', function () {
            if (validaFormulario() == 1) {
                if ($('#IdCategoria').val() == '') {
                    saveCategory();
                } else {
                    updateCategory();
                }
            }
        });
    /**  ---- Lismpia los campos ----- */
    $('#LimpiarFormulario')
        .unbind('click')
        .on('click', function () {
            $('#NomCategoria').val('');
            $('#IdCategoria').val('');
            // $('#selectTipoAlmacen option[value="3"]').attr('selected', true);
            $('#selectRowAlmacen').val(0);
        });
}

function fillTableCategories(ix) {
    // console.log('PASO 2');  
    let tabla = $('#CategoriasTable').DataTable();
    tabla.row
        .add({
            editable: `<i class="fas fa-pen modif" id ="md${cats[ix].cat_id}"></i><i class="fas fa-times-circle kill"></i>`,
            category: cats[ix].cat_id,
            catname: cats[ix].cat_name,
            storename: cats[ix].str_name,
            quantity: `<span class="toLink">${cats[ix].cantidad}</span>`,
            area: cats[ix].are_name,
        })
        .draw();
    $('#md' + cats[ix].cat_id).parents('tr').attr('id', cats[ix].cat_id);
    get_quantity(cats[ix].cat_id);
    actionButtons();
    deep_loading('C');
}

function putStores(dt) {
    $.each(dt, function (v, u) {
        if(u.str_type=='ESTATICOS'){
            let H = `<option value="${u.str_id}">${u.str_name}</option>`;
            $('#selectRowAlmacen').append(H);
        }
    });
}

function putAreas(dt) {
    $.each(dt, function (v, u) {
            let H = `<option value="${u.are_id}">${u.are_name}</option>`;
            $('#selectRowArea').append(H);
    });
}

function saveCategory() {
    var catName = $('#NomCategoria').val();
    var catId = $('#numCategoria').val();
    var strId = $('#selectRowAlmacen option:selected').val();
    var areId = $('#selectRowArea option:selected').val();

    var par = `
        [{  "cat_name" : "${catName}",
            "str_id"   : "${strId}",
            "catId"    : "${catId}",
            "areId"    : "${areId}"
        }]`;
    // console.log('par-save',par);
    cats = '';
    var pagina = 'Categorias/SaveCategoria';
    var tipo = 'html';
    var selector = putSaveCategory;
    fillField(pagina, par, tipo, selector);
}
function putSaveCategory(dt) {
    getCategories();
    if (cats.length > 0) {
        let ix = goThroughCategory(dt);
        fillTableCategories(ix);
        $('#LimpiarFormulario').trigger('click');
    } else {
        setTimeout(() => {
            putSaveCategory(dt);
        }, 100);
    }
}

function updateCategory() {
    var catId = $('#IdCategoria').val();
    var catName = $('#NomCategoria').val();
    var strId = $('#selectRowAlmacen option:selected').val();
    var areId = $('#selectRowArea option:selected').val();

    var par = `
        [{  "cat_id"    : "${catId}",
            "cat_name"  : "${catName}",
            "str_id"    : "${strId}",
            "areId"     : "${areId}"
        }]`;

    console.log('par-up',par);
    cats = '';
    var pagina = 'Categorias/UpdateCategoria';
    var tipo = 'html';
    var selector = putUpdateCategory;
    fillField(pagina, par, tipo, selector);
}
function putUpdateCategory(dt) {
    getCategories();
    if (cats.length > 0) {
        console.log(dt);
        let ix = goThroughCategory(dt);
        console.log(cats[ix].cat_id);

        $(`#${cats[ix].cat_id}`)
            .children('td.category-name')
            .html(cats[ix].cat_name);
        $(`#${cats[ix].cat_id}`)
            .children('td.store-name')
            .html(cats[ix].str_name);
        $(`#${cats[ix].cat_id}`)
            .children('td.area')
            .html(cats[ix].are_name);
        putQuantity(cats[ix].cat_id);

        $('#LimpiarFormulario').trigger('click');
    } else {
        setTimeout(() => {
            putUpdateCategory(dt);
        }, 100);
    }
}

function editCategory(catId) {
    let ix = goThroughCategory(catId);
    $('#NomCategoria').val(cats[ix].cat_name);
    $('#IdCategoria').val(cats[ix].cat_id);
    $('#numCategoria').val(cats[ix].cat_id);
    $('#selectRowAlmacen').val(cats[ix].str_id);
    $('#selectRowArea').val(cats[ix].are_id);
}

function deleteCategory(catId) {
    let cn = $(`#${catId}`).children('td.quantity').children('.toLink').html();

    if (cn != 0) {
        $('#confirmModal').modal('show');
        $('#confirmModalLevel').html(
            'No se puede borrar el registro, porque contiene existencias.'
        );
        $('#N').html('Cancelar');
        $('#confirmButton').html('').css({ display: 'none' });
        $('#Id').val(0);
    } else {
        $('#confirmModal').modal('show');

        $('#confirmModalLevel').html('¿Seguro que desea borrar el catálogo?');
        $('#N').html('Cancelar');
        $('#confirmButton').html('Borrar catálogo').css({ display: 'inline' });
        $('#Id').val(catId);

        $('#confirmButton').on('click', function () {
            var pagina = 'Categorias/DeleteCategoria';
            var par = `[{"cat_id":"${catId}"}]`;
            var tipo = 'html';
            var selector = putDeleteCategory;
            fillField(pagina, par, tipo, selector);
        });
    }
}

function putDeleteCategory(dt) {
    getCategories();
    let tabla = $('#CategoriasTable').DataTable();
    tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    $('#confirmModal').modal('hide');
}

function putSeries(dt) {
    // console.log(dt);
    let title = 'Detalle de Categoria';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#ExisteCatModal').removeClass('overlay_hide');
    $('#tblCatSerie').DataTable({
        destroy: true,
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 150, 200, -1],
            [100, 150, 200, 'Todos'],
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
                //Botón para descargar PDF
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
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            { data: 'sermodif', class: 'edit' },
            { data: 'produsku', class: 'sku' },
            { data: 'prodname', class: 'product-name' },
            { data: 'serlnumb', class: 'quantity' },
            { data: 'dateregs', class: 'sku' },
            { data: 'servcost', class: 'quantity' },
            { data: 'cvstatus', class: 'code-type_s' },
            { data: 'cvestage', class: 'code-type_s' },
            { data: 'comments', class: 'comments' },
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
    $('.overlay_closer .title').html(`Catalogo - ${catnme}`);
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

function get_quantity(catId) {
    var pagina = 'Categorias/countQuantity';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putQuantity;
    fillField(pagina, par, tipo, selector);
}

function putQuantity(dt) {
    let catid = dt[0].cat_id;
    let qty = dt[0].cantidad;
    $('#' + catid)
        .children('td.quantity')
        .children('.toLink')
        .html(qty);
    $('#' + catid)
        .children('td.quantity')
        .attr('data-content', qty);
}

function goThroughCategory(catId) {
    let inx = -1;
    $.each(cats, function (v, u) {
        if (catId == u.cat_id) inx = v;
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

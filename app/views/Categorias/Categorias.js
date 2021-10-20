var table = null;
var positionRow = 0;
var catnme;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    getCategoriasTable();
    getAlmacenes();

    $('.deep_loading').css({display: 'flex'});

    //Open modal *
    $('#nuevaCategoria').on('click', function () {
        LimpiaModal();
    });
    //Guardar almacen *
    $('#GuardarCategoria').on('click', function () {
        if (validaFormulario() == 1) {
            SaveCategoria();
        }
    });
    //borra almacen +
    $('#BorrarProveedor').on('click', function () {
        DeletCategoria();
    });

    $('#LimpiarFormulario').on('click', function () {
        LimpiaModal();
        getAlmacenes();
    });

    $('#CategoriasTable tbody').on('click', 'tr', function () {
        positionRow = table.page.info().page * table.page.info().length + $(this).index();
        console.log(positionRow);
        setTimeout(() => {
            RenglonesSelection = table.rows({selected: true}).count();
            if (RenglonesSelection == 0 || RenglonesSelection == 1) {
                $('.btn-apply').addClass('hidden-field');
            } else {
                $('.btn-apply').removeClass('hidden-field');
            }
        }, 10);
    });
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

//Edita el Proveedores *
function EditCategoria(id) {
    UnSelectRowTable();
    LimpiaModal();
    $('#titulo').text('Editar Catalago');
    var location = 'Categorias/GetCategoria';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: id},
        url: location,
        success: function (respuesta) {
            $('#NomCategoria').val(respuesta.cat_name);
            $('#IdCategoria').val(respuesta.cat_id);
            getAlmacenes(respuesta.str_id);

            $('#CategoriaModal').modal('show');
        },
        error: function (EX) {
            console.log(EX);
        },
    }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletCategoria(id, cantidad) {
    //UnSelectRowTable();

    console.log(cantidad);
    if (cantidad != 0) {
        $('#NoBorrarModal').modal('show');
    } else {
        $('#BorrarCategoriaModal').modal('show');
        $('#IdCategoriaBorrar').val(id);
    }
}

function UnSelectRowTable() {
    setTimeout(() => {
        table.rows().deselect();
    }, 10);
}

// Obtiene las series para llenar el modal
function getSeries(catId) {
    var pagina = 'Categorias/listSeries';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}

//BORRAR  * *
function DeletCategoria() {
    var location = 'Categorias/DeleteCategoria';
    IdCategoria = $('#IdCategoriaBorrar').val();
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {
            IdCategoria: IdCategoria,
        },
        url: location,
        success: function (respuesta) {
            if ((respuesta = 1)) {
                var arrayObJ = IdCategoria.split(',');
                if (arrayObJ.length == 1) {
                    table
                        .row(':eq(' + positionRow + ')')
                        .remove()
                        .draw();
                } else {
                    table.rows({selected: true}).remove().draw();
                }
                $('#BorrarCategoriaModal').modal('hide');
            }
            LimpiaModal();
        },
        error: function (EX) {
            console.log(EX);
        },
    }).done(function () {});
}

//Guardar Almacen **
function SaveCategoria() {
    var location = 'Categorias/SaveCategoria';
    var IdCategoria = $('#IdCategoria').val();
    var NomCategoria = $('#NomCategoria').val();
    var idAlmacen = $('#selectRowAlmacen option:selected').attr('id');
    var NomAlmacen = $('#selectRowAlmacen option:selected').text();

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {IdCategoria: IdCategoria, NomCategoria: NomCategoria, idAlmacen: idAlmacen},
        url: location,
        success: function (respuesta) {
            //console.log("este es el id:"+ respuesta);
            if (IdCategoria != '') {
                //console.log("llego a borrar");

                //console.log(positionRow);
                var table3 = $('#CategoriasTable').DataTable();
                table3
                    .row(':eq(' + positionRow + ')')
                    .remove()
                    .draw();
            }
            if (respuesta != 0) {
                //getAlmacenesTable();
                $('#IdCategoria').val(respuesta);
                var rowNode = table.row
                    .add({
                        [0]:
                            '<button onclick="EditCategoria(' +
                            respuesta +
                            ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletProveedor(' +
                            respuesta +
                            ',0)" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                        [1]: respuesta,
                        [2]: NomCategoria,
                        [3]: NomAlmacen,
                        [4]: idAlmacen,
                        [5]: 0,
                    })
                    .draw()
                    .node();
                $(rowNode).find('td').eq(0).addClass('edit');
                $(rowNode).find('td').eq(1).addClass('text-center');
                $(rowNode).find('td').eq(4).attr('hidden', true);
                $(rowNode).find('td').eq(5).attr('hidden', true);

                LimpiaModal();
                getAlmacenes();
            }
        },
        error: function (EX) {
            console.log(EX);
        },
    }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
    $('#NomCategoria').val('');
    $('#IdCategoria').val('');
    $('#selectTipoAlmacen').val('0');
    $('#formCategoria').removeClass('was-validated');
    $('#titulo').text('Nuevo Catalago');
}

//obtiene la informacion de tabla Proveedores *
function getCategoriasTable() {
    var location = 'Categorias/GetCategorias';
    $('#CategoriasTable').DataTable().destroy();
    $('#tablaCategoriasRow').html('');

    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: location,
        _success: function (respuesta) {
            var renglon = '';
            respuesta.forEach(function (row, index) {
                renglon =
                    '<tr id="' +
                    row.cat_id +
                    '">' +
                    '<td class="text-center edit"> ' +
                    '<button onclick="EditCategoria(' +
                    row.cat_id +
                    ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                    '<button onclick="ConfirmDeletCategoria(' +
                    row.cat_id +
                    ',' +
                    row.cantidad +
                    ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
                    '</td>' +
                    "<td class='dtr-control text-center'>" +
                    row.cat_id +
                    '</td>' +
                    '<td class="catname">' +
                    row.cat_name +
                    '</td>' +
                    '<td>' +
                    row.str_name +
                    '</td>' +
                    '<td hidden>' +
                    row.str_id +
                    '</td>' +
                    '<td class="quantity text-left" data-content="' +
                    row.cantidad +
                    '"><span class="toLink">' +
                    row.cantidad +
                    '</span></td>' +
                    '</tr>';
                $('#tablaCategoriasRow').append(renglon);
                get_quantity(row.cat_id);
            });

            activeIcons();

            $('.deep_loading').css({display: 'none'});

            let title = 'Categorias';
            let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

            table = $('#CategoriasTable').DataTable({
                order: [[1, 'asc']],
                select: {
                    style: 'multi',
                    info: false,
                },
                lengthMenu: [
                    [25, 50, 100, -1],
                    ['25', '50', '100', 'Todo'],
                ],
                dom: 'Blfrtip',
                buttons: [
                    {
                        extend: 'pdf',
                        footer: true,
                        title: title,
                        filename: filename,
                        //   className: 'btnDatableAdd',
                        text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
                    },
                    {
                        extend: 'excel',
                        footer: true,
                        title: title,
                        filename: filename,
                        //   className: 'btnDatableAdd',
                        text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
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
                        className: 'btn-apply hidden-field',
                        action: function () {
                            var selected = table.rows({selected: true}).data();
                            var idSelected = '';
                            selected.each(function (index) {
                                idSelected += index[1] + ',';
                            });
                            idSelected = idSelected.slice(0, -1);
                            if (idSelected != '') {
                                ConfirmDeletCategoria(idSelected);
                            }
                        },
                    },
                ],

                scrollY: 'calc(100vh - 200px)',
                scrollX: true,
                // scrollCollapse: true,
                paging: true,
                pagingType: 'simple_numbers',
                fixedHeader: true,
                language: {
                    url: './app/assets/lib/dataTable/spanish.json',
                },
            });
        },
        get success() {
            return this._success;
        },
        set success(value) {
            this._success = value;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        },
    }).done(function () {});
}

function getAlmacenes(id) {
    $('#selectRowAlmacen').html('');
    var location = 'Almacenes/GetAlmacenes';
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        data: {id: id},
        url: location,
        success: function (respuesta) {
            console.log(respuesta);
            var renglon = "<option id='0'  value=''>Seleccione...</option> ";
            respuesta.forEach(function (row, index) {
                renglon += '<option id=' + row.str_id + '  value="' + row.str_id + '">' + row.str_name + '</option> ';
            });
            $('#selectRowAlmacen').append(renglon);
            if (id != undefined) {
                $("#selectRowAlmacen option[value='" + id + "']").attr('selected', 'selected');
            }
        },
        error: function () {},
    }).done(function () {});
}

// ACTIVA LA FUNCIONALIDAD DEL BOTON toLink
function activeIcons() {
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let prd = $(this).parents('tr').attr('id');
            let qty = $(this).parent('td').attr('data-content');
            catnme = $(this).parents('tr').children('td.catname').html();
            if (qty > 0) {
                console.log('Se TOCO el Boton y valido', qty);
                $('.deep_loading').css({display: 'flex'});
                getSeries(prd);
            }
        });
}

function putSeries(dt) {
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
            {data: 'sercost', class: 'quantity'},
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
                sercost: u.ser_cost,
                cvstatus: u.ser_situation,
                cvestage: u.ser_stage,
                comments: u.ser_comments,
            })
            .draw();
        $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.prd_id);
        $('.deep_loading').css({display: 'none'});
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
    $('#tablaCategoriasRow #' + catid)
        .children('td.quantity')
        .children('.toLink')
        .html(qty);
    $('#tablaCategoriasRow #' + catid)
        .children('td.quantity')
        .attr('data-content', qty);
}

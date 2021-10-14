let pj, px, pd;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});

function inicial() {
    folio = getFolio();
    setting_table();
    get_Proyectos();
}

/** ++++  Setea el calendario ++++++ */
function setting_datepicket(sl, di, df) {
    let fc = moment(Date()).format('DD/MM/YYYY');
    $(sl).daterangepicker(
        {
            singleDatePicker: false,
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                firstDay: 1,
            },
            minDate: fc,
            startDate: di,
            endDate: df,
            opens: 'left',
            drops: 'auto',
        },
        function (start, end, label) {
            let sdin = start.format('DD/MM/YYYY');
            let sdfn = end.format('DD/MM/YYYY');
            $('#txtPeriod').html(sdin + ' - ' + sdfn);
        }
    );
}

/** ++++  Setea la tabla ++++++ */
function setting_table() {
    let title = 'Productos en subarrendo';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblProductForSubletting').DataTable({
        order: [[0, 'desc']],
        dom: 'Blfrtip',
        select: {
            style: 'single',
            info: false,
        },
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
                // Boton aplicar cambios
                text: 'Aplicar subarrendos',
                footer: true,
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_ProductForSubletting_table();
                },
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
            {data: 'editable', class: 'edit'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prod_sku', class: 'sku'},
            {data: 'prodpric', class: 'price'},
            {data: 'supplier', class: 'supply'},
            {data: 'storesrc', class: 'stores'},
            {data: 'datestar', class: 'date'},
            {data: 'date_end', class: 'date'},
            {data: 'comments', class: 'comments'},
        ],
    });
}

/**  +++++ Obtiene los datos de los proyectos activos +++++  */
function get_Proyectos() {
    var pagina = 'ProductsForSubletting/listProyects';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_Proyectos;
    fillField(pagina, par, tipo, selector);
}
/**  +++++ Obtiene los datos de los productos activos +++++  */
function get_products(pj) {
    var pagina = 'ProductsForSubletting/listProducts';
    var par = `[{"pjtId":"${pj}"}]`;
    var tipo = 'json';
    var selector = put_Products;
    fillField(pagina, par, tipo, selector);
}

/**  ++++   Coloca los proyectos en el listado del input */
function put_Proyectos(dt) {
    pj = dt;
    $.each(dt, function (v, u) {
        let H = `<option data_indx="${v}" value="${u.pjt_id}">${u.pjt_name}</option>`;
        $('#txtProject').append(H);
    });
    $('#txtProject').on('change', function () {
        px = parseInt($('#txtProject option:selected').attr('data_indx'));
        $('#txtIdProject').val(pj[px].pjt_id);
        // let period = pj[px].pjt_date_start + ' - ' + pj[px].pjt_date_end;

        get_products(pj[px].pjt_id);
    });
}

/**  ++++   Coloca los productos en el listado del input */
function put_Products(dt) {
    pd = dt;
    let largo = $('#tblProductForSubletting tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblProductForSubletting tbody tr').remove() : '';
    let tabla = $('#tblProductForSubletting').DataTable();
    let cn = 0;
    $.each(pd, function (v, u) {
        let datestart = u.sub_date_start;
        let dateend = u.sub_date_end;

        if (datestart == null) {
            datestart = define_days('i', pj[px].pjt_date_start, u.pjtcn_days_base, u.pjtcn_days_trip, u.pjtcn_days_test);
        }
        if (dateend == null) {
            dateend = define_days('f', pj[px].pjt_date_start, u.pjtcn_days_base, u.pjtcn_days_trip, u.pjtcn_days_test);
        }

        tabla.row
            .add({
                editable: `<i id="k${u.pjtdt_id}" class="fas fa-times-circle kill"></i>`,
                prodname: u.prd_name,
                prod_sku: u.pjtdt_prod_sku,
                prodpric: u.sub_price,
                supplier: u.sup_business_name,
                storesrc: u.str_name,
                datestar: datestart,
                date_end: dateend,
                comments: u.sub_comments,
            })
            .draw();
        $('#k' + u.pjtdt_id)
            .parents('tr')
            .attr({id: u.pjtdt_id, data_inx: cn});

        cn++;
    });
    $('#tblProductForSubletting tbody tr')
        .unbind('click')
        .on('click', function () {
            $('.objet').removeClass('objHidden');
            let rw = $(this);
            let ix = rw[0].attributes[2].value;

            console.log(pd[ix]);

            $('.nameProduct').html(pd[ix].prd_name);
            $('#txtIdProduct').val(pd[ix].prd_id);
            let din = define_days('i', pj[px].pjt_date_start, pd[ix].pjtcn_days_base, pd[ix].pjtcn_days_trip, pd[ix].pjtcn_days_test);
            let dfn = define_days('f', pj[px].pjt_date_start, pd[ix].pjtcn_days_base, pd[ix].pjtcn_days_trip, pd[ix].pjtcn_days_test);
            setting_datepicket($('#txtPeriod'), din, dfn);
        });
}

/*  ++++++++ Valida los campos  +++++++ */
function validator() {
    let ky = 0;
    let msg = '';
    $('.required').each(function () {
        if ($(this).val() == 0) {
            msg += $(this).attr('data-mesage') + '\n';
            ky = 1;
        }
    });

    let period = $('#txtPeriod').val().split(' - ');
    let a = moment(period[1], 'DD/MM/YYYY');
    let b = moment(period[0], 'DD/MM/YYYY');
    let dif = a.diff(b, 'days');

    if (dif < 1) {
        ky = 1;
        msg += 'La fecha final debe ser por lo menos de un día de diferencia';
    }
    if (ky == 0) {
        $('#btn_subletting').removeClass('disabled');
    } else {
        $('#btn_subletting').addClass('disabled');
    }
}

/*  ++++++++ Define las fechas de inicio y de fin   +++++++ */
function define_days(st, dt, db, dr, ds) {
    let dats = '';
    let dytr = parseInt(dr) / 2;
    let dyin = parseInt(ds) + dytr;
    let dyfn = parseInt(db) + dytr;
    let dtin = moment(dt).subtract(dyin, 'days').format('DD/MM/YYYY');
    let dtfn = moment(dt)
        .add(dyfn - 1, 'days')
        .format('DD/MM/YYYY');

    if (st == 'i') {
        dats = dtin;
    } else {
        dats = dtfn;
    }
    return dats;
}

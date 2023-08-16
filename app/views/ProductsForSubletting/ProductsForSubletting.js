let pj, px, pd;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    folio = getFolio();
    setting_table();
    get_Proyectos();
    get_coins();
    get_suppliers();
    get_stores();

    $('#txtPrice').on('blur', function () {
        validator();
    });
    $('#btn_subletting').on('click', function () {
        let acc = $(this).attr('data_accion');
        updating_serie(acc);
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
    console.log(pj);
    var pagina = 'ProductsForSubletting/listProducts';
    var par = `[{"pjtId":"${pj}"}]`;
    var tipo = 'json';
    var selector = put_Products;
    fillField(pagina, par, tipo, selector);
}

/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_coins() {
    var pagina = 'ProductsForSubletting/listCoins';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_coins;
    fillField(pagina, par, tipo, selector);
}
/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_suppliers() {
    var pagina = 'ProductsForSubletting/listSuppliers';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_suppliers;
    fillField(pagina, par, tipo, selector);
}
/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_stores() {
    var pagina = 'ProductsForSubletting/listStores';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_stores;
    fillField(pagina, par, tipo, selector);
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
                monthNames: ['Enero','Febrero','Marzo','Abril','Mayo', 'Junio',
                    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                firstDay: 1,
            },
            minDate: fc,
            startDate: moment(di, 'DD/MM/YYYY'),
            endDate: moment(df, 'DD/MM/YYYY'),
            opens: 'left',
            drops: 'auto',
        },
        function (start, end, label) {
            let sdin = start.format('DD/MM/YYYY');
            let sdfn = end.format('DD/MM/YYYY');
            $('#txtPeriod').html(sdin + ' - ' + sdfn);
            setTimeout(() => {
                validator();
            }, 500);
        }
    );
}

/** ++++  Setea la tabla ++++++ */
function setting_table() {
    let title = 'Productos en subarrendo';
    let filename =
        title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblProductForSubletting').DataTable({
        order: [[1, 'desc']],
        dom: 'Blfrtip',
        select: {
            style: 'single',
            info: false,
        },
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
            { data: 'editable', class: 'edit' },
            { data: 'prodname', class: 'product-name' },
            { data: 'prod_sku', class: 'sku' },
            { data: 'prodpric', class: 'sku' },
            { data: 'supplier', class: 'supply' },
            { data: 'storesrc', class: 'stores' },
            { data: 'datestar', class: 'date' },
            { data: 'date_end', class: 'date' },
            { data: 'comments', class: 'comments' },
        ],
    });
}


/**  ++++   Coloca los proyectos en el listado del input */
function put_Proyectos(dt) {
    pj = dt;
    //console.log(pj);
    $.each(dt, function (v, u) {
        let H = `<option data_indx="${v}" value="${u.pjt_id}">${u.pjt_name}</option>`;
        $('#txtProject').append(H);
    });
    $('#txtProject').on('change', function () {
        px = parseInt($('#txtProject option:selected').attr('data_indx'));
        $('#txtIdProject').val(pj[px].pjt_id);
        // let period = pj[px].pjt_date_start + ' - ' + pj[px].pjt_date_end;
        $('.objet').addClass('objHidden');
        get_products(pj[px].pjt_id);
    });
}

/**  ++++   Coloca los productos en el listado del input */
function put_Products(dt) {
    
    console.log('put_Products-', dt);
    pd = dt;
    let largo = $('#tblProductForSubletting tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla'
        ? $('#tblProductForSubletting tbody tr').remove()
        : '';
    let tabla = $('#tblProductForSubletting').DataTable();
     tabla.rows().remove().draw();
    let cn = 0;
    if (pd[0].prd_name != undefined) {
        $.each(pd, function (v, u) 
        {
            
            let datestart = u.sub_date_start;
            let dateend = u.sub_date_end;

            if (datestart == null) {
                datestart = define_days(
                    'i',
                    pj[px].pjt_date_start,
                    u.pjtcn_days_base,
                    u.pjtcn_days_trip,
                    u.pjtcn_days_test
                );
            }
            if (dateend == null) {
                dateend = define_days(
                    'f',
                    pj[px].pjt_date_start,
                    u.pjtcn_days_base,
                    u.pjtcn_days_trip,
                    u.pjtcn_days_test
                );
            }
            let sku = u.pjtdt_prod_sku;
            if (sku == 'Pendiente') {
                sku = `<span class="pending">No Existe Serie</sku>`;
            }
            // editable: `<i id="k${u.pjtdt_id}" class="fas fa-times-circle kill"></i>`,
            tabla.row
                .add({
                    editable: `<i id="k${u.pjtdt_id}" class="fas fa-certificate"></i>`,
                    prodname: u.prd_name,
                    prod_sku: sku,
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
                .attr({
                    id: u.pjtdt_id,
                    data_index: cn,
                    data_pjtcn: u.pjtcn_id,
                    data_produ: u.prd_id,
                    data_store: u.str_id,
                    data_suble: u.sub_id,
                    data_suply: u.sup_id,
                    data_coins: u.cin_id,
                    data_prsku: u.prd_sku,
                    data_serie: u.ser_id,
                });
            cn++;
            // console.log('EACH-', u.ser_id);
        });
    }

    $('#tblProductForSubletting tbody tr')
        .unbind('click')
        .on('click', function () {
            console.log('CLICK-');
            let selected = $(this).attr('class').indexOf('selected');
            if (selected < 0) {
                $('.objet').removeClass('objHidden');
                let rw = $(this);
                let ix = rw[0].attributes[2].value;

                let prodname = rw[0].cells[1].outerText;
                let serieSku = rw[0].cells[2].outerText;
                let subprice = rw[0].cells[3].outerText;
                let datestar = rw[0].cells[6].outerText;
                let datesend = rw[0].cells[7].outerText;
                let comments = rw[0].cells[8].outerText;
                let projdeta = rw[0].attributes[1].value;
                let producId = rw[0].attributes[4].value;
                let storesId = rw[0].attributes[5].value;
                let suppliId = rw[0].attributes[7].value;
                let tpcoinId = rw[0].attributes[8].value;
                let produSku = rw[0].attributes[9].value;
                let seriesId = rw[0].attributes[10].value;
                let projContId = rw[0].attributes[3].value;

                $('.nameProduct').html(prodname);
                $('#txtIdProduct').val(producId);
                $('#txtPrice').val(subprice);
                $('#txtCoinType').val(tpcoinId);
                $('#txtSupplier').val(suppliId);
                $('#txtStoreSource').val(storesId);
                $('#txtSkuProduct').val(produSku);
                $('#txtSkuSerie').val(serieSku);
                $('#txtIdSerie').val(seriesId);
                $('#txtProjectDetail').val(projdeta);
                $('#txtComments').val(comments);
                $('#txtIdProjectCont').val(projContId);
                setting_datepicket($('#txtPeriod'), datestar, datesend);

                if (serieSku == 'No Existe Serie') {
                    $('#btn_subletting').attr('data_accion', 'add');
                } else {
                    $('#btn_subletting').attr('data_accion', 'chg');
                }
            } else {
                $('.objet').addClass('objHidden');
            }
        });
}

/**  ++++   Coloca las monedas en el listado del input */
function put_coins(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.cin_id}">${u.cin_code} - ${u.cin_name}</option>`;
        $('#txtCoinType').append(H);
    });
    $('#txtCoinType').on('change', function () {
        validator();
    });
}
/**  ++++   Coloca los proveedores en el listado del input */
function put_suppliers(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.sup_id}">${u.sup_business_name}</option>`;
        $('#txtSupplier').append(H);
    });
    $('#txtSupplier').on('change', function () {
        validator();
    });
}
/**  ++++   Coloca los almacenes en el listado del input */
function put_stores(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.str_id}">${u.str_name}</option>`;
        $('#txtStoreSource').append(H);
    });
    $('#txtStoreSource').on('change', function () {
        validator();
    });
}

function updating_serie(acc) {
    let producId = $('#txtIdProduct').val();
    let produSku = $('#txtSkuProduct').val();
    let seriCost = $('#txtPrice').val();
    let dtResIni = moment(
        $('#txtPeriod').val().split(' - ')[0],
        'DD/MM/YYYY'
    ).format('YYYY-MM-DD');
    let dtResFin = moment(
        $('#txtPeriod').val().split(' - ')[1],
        'DD/MM/YYYY'
    ).format('YYYY-MM-DD');
    let comments = $('#txtComments').val();
    let supplier = $('#txtSupplier option:selected').val();
    let storesId = $('#txtStoreSource option:selected').val();
    let tpCoinId = $('#txtCoinType option:selected').val();
    let pjDetail = $('#txtProjectDetail').val();
    let projecId = $('#txtIdProject').val();
    let seriesId = $('#txtIdSerie').val();
    let projContId = $('#txtIdProjectCont').val();

    let par = `
    [{
        "producId"  :   "${producId}",
        "produSku"  :   "${produSku}",
        "seriCost"  :   "${seriCost}",
        "dtResIni"  :   "${dtResIni}",
        "dtResFin"  :   "${dtResFin}",
        "comments"  :   "${comments}",
        "supplier"  :   "${supplier}",
        "storesId"  :   "${storesId}",
        "tpCoinId"  :   "${tpCoinId}",
        "pjDetail"  :   "${pjDetail}",
        "seriesId"  :   "${seriesId}",
        "projecId"  :   "${projecId}",
        "projContId"  :   "${projContId}"
    }]`;
    console.log(acc);
    if (acc == 'add') {
        var pagina = 'ProductsForSubletting/saveSubletting';
    } else {
        var pagina = 'ProductsForSubletting/changeSubletting';
    }
    var tipo = 'json';
    var selector = put_save_subleting;
    fillField(pagina, par, tipo, selector);
}
function put_save_subleting(dt) {
    console.log(dt);
    let tr = $('#' + dt[0].pjtdt_id);
    $($(tr[0].cells[2])).html(dt[0].pjtdt_prod_sku);
    $($(tr[0].cells[3])).html(dt[0].sub_price);
    $($(tr[0].cells[4])).html(dt[0].sup_business_name);
    $($(tr[0].cells[5])).html(dt[0].str_name);
    $($(tr[0].cells[6])).html(dt[0].sub_date_start);
    $($(tr[0].cells[7])).html(dt[0].sub_date_end);
    $($(tr[0].cells[8])).html(dt[0].sub_comments);

    tr[0].attributes[5].value = dt[0].str_id;
    tr[0].attributes[7].value = dt[0].sup_id;
    tr[0].attributes[8].value = dt[0].cin_id;
    tr[0].attributes[10].value = dt[0].ser_id;

    tr.trigger('click');
    tr.removeClass('selected');
    $('.objet').addClass('objHidden');
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
        ky = 0;
        msg += 'La fecha final debe ser por lo menos de un día de diferencia';
    }
    if (ky == 0) {
        $('#btn_subletting').removeClass('disabled');
    } else {
        $('#btn_subletting').addClass('disabled');
    }
    // console.log(msg);
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

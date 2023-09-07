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
    fillContent();
    get_Estatus_Mant();// agregado por Edna
    get_changes(); // agregado por Edna

    $('#txtPeriod').on('blur', function () {
        validator();
    });
    $('#txtStatus').on('blur', function () {
        validator();
    });
    $('#txtDays').on('blur', function () {
        validator();
    });
    $('#txtHrs').on('blur', function () {
        validator();
    });
    $('#txtComments').on('blur', function () {
        validator();
    });
    $('#txtCost').on('blur', function () {
        validator();
    });
    $('#txtMotivo').on('blur', function () {
        validator();
    });
    $('#btn_subletting').on('click', function () {
        let acc = $(this).attr('data_accion');
        updating_serie(acc);
    });
}

/** ++++  Setea el calendario ++++++ */
function setting_datepicket(sl, di, df) {
    console.log(sl);
    let fc = moment(Date()).format('DD/MM/YYYY');
    $(sl).daterangepicker(
        {
            singleDatePicker: false,
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                monthNames: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre',
                ],
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
                text: 'Reportes',
                footer: true,
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    view_report();
                },
            },
             /* {
                // Boton aplicar cambios
                text: 'Aplicar subarrendos',
                footer: true,
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    read_ProductForSubletting_table();
                },
            },  */
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            { data: 'editable', class: 'edit objHidden' },
            { data: 'prodname', class: 'product-name' },
            { data: 'cost', class: 'sku' },
            { data: 'days', class: 'sku' },
            { data: 'hours', class: 'date' },
            { data: 'datestar', class: 'date' },
            { data: 'dateend', class: 'date' },
            { data: 'no_econo', class: 'status' },
            { data: 'comments', class: 'status' },
            { data: 'situation', class: 'date' },
            { data: 'status', class: 'status' },
            { data: 'no_serie', class: 'status' },
        ],
    });
    $('#tblMotivoMantenimiento').DataTable({
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
            /* {
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
            }, */
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
        ],
    });
}

/**  +++++ Obtiene los datos de los proyectos activos +++++  */
function get_Proyectos() {
    var pagina = 'Maintenance/listProyects';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_Proyectos;
    fillField(pagina, par, tipo, selector);
}
function get_Estatus_Mant() {
    var pagina = 'Maintenance/listEstatusMantenimiento';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_status_mant;
    fillField(pagina, par, tipo, selector);
}
function get_changes() {
    var pagina = 'Maintenance/listChangeReasons';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_changes;
    fillField(pagina, par, tipo, selector);
}
/**  +++++ Obtiene los datos de los productos activos +++++  */
function get_products(pj) {
    console.log(pj);
    var pagina = 'Maintenance/listProducts';
    var par = `[{"pjtId":"${pj}"}]`;
    var tipo = 'json';
    var selector = put_Products;
    fillField(pagina, par, tipo, selector);
}

/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_coins() {
    var pagina = 'Maintenance/listCoins';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_coins;
    fillField(pagina, par, tipo, selector);
}
/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_suppliers() {
    var pagina = 'Maintenance/listSuppliers';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_suppliers;
    fillField(pagina, par, tipo, selector);
}
/**  +++++ Obtiene los datos los proveedores que subarrendan +++++  */
function get_stores() {
    var pagina = 'Maintenance/listStores';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_stores;
    fillField(pagina, par, tipo, selector);
}


function get_change_reasons(pd) {
    var pagina = 'Maintenance/listChangeReasons';
    var par = `[{"prod_id":""}]`;
    var tipo = 'json';
    var selector = put_change_reasons;
    fillField(pagina, par, tipo, selector);
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
function put_status_mant(dt) {

    //console.log(dt);
    $.each(dt, function (v, u) {
        let H = `<option data_indx="${v}" value="${u.mts_id}">${u.mts_description}</option>`;
        $('#txtStatus').append(H);
    });
    $('#txtStatus').on('change', function () {
        px = parseInt($('#txtStatus option:selected').attr('data_indx'));
        //console.log($('#txtStatus').val());
        //$('#txtStatus').val(pj[px].pjt_id);
        // let period = pj[px].pjt_date_start + ' - ' + pj[px].pjt_date_end;
        //$('.objet').addClass('objHidden');
        //get_products(pj[px].pjt_id);
    }); 
}
function put_changes(dt) {

    //console.log(dt);
    $.each(dt, function (v, u) {
        let H = `<option data_indx="${v}" value="${u.pjtcr_id}">${u.pjtcr_definition}</option>`;
        $('#txtMotivo').append(H);
    });
    $('#txtMotivo').on('change', function () {
        px = parseInt($('#txtMotivo option:selected').attr('data_indx'));
        //console.log($('#txtStatus').val());
        //$('#txtStatus').val(pj[px].pjt_id);
        // let period = pj[px].pjt_date_start + ' - ' + pj[px].pjt_date_end;
        //$('.objet').addClass('objHidden');
        //get_products(pj[px].pjt_id);
    }); 
}
function put_change_reasons(dt){
    //console.log(dt);
    
    let tabla = $('#tblMotivoMantenimiento').DataTable();
    tabla.rows().remove().draw();
    if (dt[0].pjtcr_definition != undefined) {
        $.each(dt, function (v, u) {
            tabla.row
            .add({
                editable: `<i id="${u.pjtcr_id}" class="fas fa-certificate serie motivo"></i>`,
                prodname: u.pjtcr_definition,
                prod_sku: u.pjtcr_description,
            })
            .draw();
            
        });
    }
    $('#tblProductForSubletting tbody tr')
        .unbind('click')
        .on('click', function (){
            activeIconsSerie2();
        });
}

/**  ++++   Coloca los productos en el listado del input */
function put_Products(dt) {
    // console.log(pj);
    // console.log(dt);
    pd = dt;
    
    let largo = $('#tblProductForSubletting tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla'
        ? $('#tblProductForSubletting tbody tr').remove()
        : '';
    let tabla = $('#tblProductForSubletting').DataTable();
    
    tabla.rows().remove().draw();
    let cn = 0;
    if(dt[0].prd_id!=0){
        $.each(pd, function (v, u) {
            /*
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
            }*/
            let sku = u.pjtdt_prod_sku;
            if (sku == 'Pendiente') {
                sku = `<span class="pending">${sku}</sku>`;
            }
    
            
            // editable: `<i id="k${u.pjt_id}" class="fas fa-times-circle kill"></i>`,
            tabla.row
                .add({
                    editable: `<i id="k${u.ser_id}" class="fas fa-certificate serie modif"></i>`,
                    prodname: u.prd_name,
                    cost: u.pmt_price,
                    days: u.pmt_days,
                    hours: u.pmt_hours,
                    datestar: u.pmt_date_start,
                    dateend: u.pmt_date_end,
                    no_econo: u.ser_no_econo,
                    comments: u.pmt_comments,
                    situation: u.pjtcr_definition,
                    status: u.mts_description,
                    no_serie: u.ser_serial_number
                })
                .draw();
                
            $('#k' + u.ser_id)
                .parents('tr')
                .attr({
                    id: u.ser_id,
                    data_serie: u.ser_id,
                    data_proj_change: u.pjtcr_id,
                    data_maintain: u.pmt_id,
                    data_status: u.mts_id
                });
                //console.log(u.pmt_id);
            cn++;
        });

    }
    
    $('#tblProductForSubletting tbody tr')
        .unbind('click')
        .on('click', function () {
            let selected = $(this).attr('class').indexOf('selected');
            if (selected < 0) {
                $('.objet').removeClass('objHidden');
                let rw = $(this);
                let ix = rw[0].attributes[2].value;

                let prodname = rw[0].cells[1].outerText;
                let costo = rw[0].cells[2].outerText;
                let days = rw[0].cells[3].outerText;
                let hours = rw[0].cells[4].outerText;
                let datestar = rw[0].cells[5].outerText;
                let dateend = rw[0].cells[6].outerText;
                let no_econo = rw[0].cells[7].outerText;
                let comments = rw[0].cells[8].outerText;
                
                let situation = rw[0].cells[10].outerText;
                let status = rw[0].cells[11].outerText;
                //let no_serie = rw[0].cells[12].outerText;


                let seriesId = rw[0].attributes[2].value;
                let dataProjChange = rw[0].attributes[3].value;
                let datamaintain = rw[0].attributes[4].value;
                let idStatus = rw[0].attributes[5].value;
                
                let dayIni = moment(datestar).format('DD/MM/YYYY');
                let dayFin = moment(dateend).format('DD/MM/YYYY');
                
                if(dayIni =='Invalid date' || dayFin=='Invalid date'){
                    $('#txtPeriod').val('DD/MM/YYYY - DD/MM/YYYY');
                }else{
                    $('#txtPeriod').val(dayIni + ' - ' + dayFin);
                }
                
                $('.nameProduct').html(prodname);
                $('#txtIdSerie').val(seriesId);
                $('#txtMotivo').val(dataProjChange);
                $('#txtCost').val(costo);
                
                $('#txtComments').val(comments);
                $('#txtDays').val(days);
                $('#txtHrs').val(hours);
                $('#txtStatus').val(idStatus); 
                $('#txtIdMaintain').val(datamaintain);
                $('#txtIdStatus').val(idStatus); 
                //$('#txtPeriod').val(datestar).split(' - ')[0]; 
                //$('#txtPeriod').val(dateend).split(' - ')[1]; 
                //console.log(status);
                //setting_datepicket($('#txtPeriod'), datestar, dateend);

                if ($('#txtIdMaintain').val() == 0) {
                    //console.log('add');
                    $('#btn_subletting').attr('data_accion', 'add');
                } else {

                    $('#btn_subletting').attr('data_accion', 'chg');
                }
            } else {
                $('.objet').addClass('objHidden');
            }
            // get_change_reasons();
            activeIconsSerie();
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
    let projChange = $('#txtMotivo').val();
    let serieId = $('#txtIdSerie').val();
    let status = $('#txtStatus').val();
    let dtResIni = moment(
        $('#txtPeriod').val().split(' - ')[0],
        'DD/MM/YYYY'
    ).format('YYYY-MM-DD');
    let dtResFin = moment(
        $('#txtPeriod').val().split(' - ')[1],
        'DD/MM/YYYY'
    ).format('YYYY-MM-DD');
    let comments = $('#txtComments').val();
    let days = $('#txtDays').val();
    let hrs = $('#txtHrs').val();
    
    let cost = $('#txtCost').val();
    let idProject = $('#txtIdProject').val();
    
    let idMaintain = $('#txtIdMaintain').val();

    let par = `
    [{
        "comments"  :   "${comments}",
        "days"  :   "${days}",
        "hrs"  :   "${hrs}",
        "dtResIni"  :   "${dtResIni}",
        "dtResFin"  :   "${dtResFin}",
        "status"  :   "${status}",
        "serieId"  :   "${serieId}",
        "projChange" : "${projChange}",
        "idMaintain" : "${idMaintain}",
        "cost" : "${cost}",
        "idProject" : "${idProject}"
    }]`;
   
    
    if (acc == 'add') {
        var pagina = 'Maintenance/saveMaintain';
    } 
    
    else {
       var pagina = 'Maintenance/changeMaintain';
    }

    var tipo = 'json';
    var selector = put_save_subleting;
    fillField(pagina, par, tipo, selector);
}
function put_save_subleting(dt) { 
    console.log(dt);
    get_products(dt);
    /* $('#txtIdSerie').val(0);
    $('#txtIdStatus').val(0);
    $('#txtIdMaintain').val(0); */
    $('#txtIdProject').val('');
    $('#txtComments').val('');
    $('#txtDays').val('');
    $('#txtHrs').val('');
    $('#txtPeriod').val('DD/MM/YYYY - DD/MM/YYYY');
    $('#txtCost').val('0.00');
    $('#txtStatus').val(0);
    $('#txtMotivo').val(0);
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
    // console.log(msg);
}
function view_report(){
    title= 'Generar reporte';
    $('.overlay_closer .title').html(title);

    $('#ReportModal').removeClass('overlay_hide');
    $('#ReportModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');

        });
    $('#GenerarReporte').unbind('click')
    .on('click', function () {
        let ky = validarDatosReporte();
        if(ky == 0){
            let fi = $('#fechaIncial').val();
            let fe = $('#fechaFinal').val();
            console.log(fi);
            let pjt = $('#txtProject').val();
            getReport(fi, fe, pjt);
        }
    })    
    
}
function getReport(fi, fe, pjt){
    let user = Cookies.get('user').split('|');
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');
    window.open(
        `${url}app/views/Maintenance/MaintenanceReport.php?p=${pjt}&fi=${fi}&fe=${fe}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
    cleanFechas();
    $('#ReportModal').addClass('overlay_hide');
}
function validarDatosReporte(){
    let ky = 0;
    $('.required2').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            ky = 1;
            $(this).addClass('fail').parent().children('.fail_note');
        }else{
            $(this).removeClass('fail').parent().children('.fail_note');
            ky = 0;
        }
    });
    return ky;
}
function cleanFechas(){
    $('#fechaIncial').val('');
    $('#fechaFinal').val('');
}
/*  ********* Define las fechas de inicio y de fin   +++++++ */
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
function fillContent() {
    // configura el calendario de seleccion de periodos
    // let restdate= moment().add(5,'d');   // moment().format(‘dddd’); // Saturday
    // let fecha = moment(Date()).format('DD/MM/YYYY');
    // let restdate= moment().subtract(3, 'days'); 
    let restdate='';
    let todayweel =  moment(Date()).format('dddd');
    if (todayweel=='Monday' || todayweel=='Sunday'){
        restdate= moment().subtract(3, 'days');
    } else { restdate= moment(Date()) } 

    
    let fecha = moment(Date()).format('DD/MM/YYYY');
    $('#calendar').daterangepicker(
        {
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom',
                weekLabel: 'W',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                monthNames: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre',
                ],
                firstDay: 1,
            },
            showCustomRangeLabel: false,
            singleDatePicker: false,
            startDate: fecha,
            endDate: fecha,
            minDate: fecha,
        },
        function (start, end, label) {
            $('#txtPeriod').val(
                start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY')
            );
            looseAlert($('#txtPeriod').parent());

            // $('#txtPeriodProject').parent().children('span').html('');
            // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        }
    );
    // Llena el selector de tipo de proyecto
    /* $.each(tpprd, function (v, u) {
        let H = `<option value="${u.pjttp_id}"> ${u.pjttp_name}</option>`;
        $('#txtType').append(H);
    }); */
    // Llena el selector de tipo de llamados


    //
    

}


function activeIconsSerie() {
    
    $('.serie.modif')
        .unbind('click')
        .on('click', function () {
            let serId = $(this).attr('id').slice(1, 10);

            $('#mantenimientoModal').removeClass('overlay_hide');
            title= 'Lista de Motivos';
            $('.overlay_closer .title').html(title);
            $('#mantenimientoModal .btn_close')
                .unbind('click')
                .on('click', function () {
                    $('#mantenimientoModal').addClass('overlay_hide');
                });
            
            //getSelectSerie(serId);
        });
}

function activeIconsSerie2() {
    
    $('.serie.motivo')
        .unbind('click')
        .on('click', function () {
            let id = $(this).attr('id');
            //console.log(id);

        });
            
}
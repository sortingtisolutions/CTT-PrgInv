var seccion = '';
let folio;
let = pr = [];
let = link = '';
let assigns = getAssign();

$(document).ready(function () {
    // folio = getFolio();
    if (verifica_usuario()) {
        inicial();
    }
});

//INICIO DE PROCESOS MACRO
function inicial() {
    if (altr == 1) {
    getlistProyect();
    getAreas();
    setting_table();
    fillContent();
    actionButtons();
    confirm_alert();
    $('#btn_exchange').addClass('disabled');
    // setting_datepicket($('#txtPeriod'), Date().format('DD/MM/YYYY')   ,Date().format('DD/MM/YYYY'));
    
    $('#btn_exchange').on('click', function () { 
        exchange_apply(0);
    });

    /*$('txtProject').on('blur', function () {
        validator();
    });*/
    $('#txtArea').on('blur', function () {
        validator();
    });

    $('#txtFreelance').on('blur', function () {
        validator();
    });

    $('#txtFechaAdmision').on('blur', function () {
        validator();
    });
    //
    /*$('#txtPeriodProjectEdt').on('blur', function () {
        validator();
    });*/
} else {
    setTimeout(() => {
        inicial();
    }, 100);
}
}
// Setea de la tabla

function setting_table() {
    let title = 'Entradas de arrendos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblExchanges').DataTable({
        order: [[0, 'desc']],
        dom: 'Blfrtip',
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
            text: 'Aplicar movimientos',
            className: 'btn-apply hidden-field',
            action: function (e, dt, node, config) {
                read_exchange_table();
            },
        },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 190px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit'},
            {data: 'proyname', class: 'sku'},
            {data: 'freename', class: 'left'},
            {data: 'area', class: 'serie-product'},
            {data: 'strtdate', class: 'serie-product'},
            {data: 'enddate', class: 'serie-product'}, 
            {data: 'comments', class: 'serie-product'}
        ],
    });
}

// Solicita los tipos de movimiento
function getlistProyect() {
    var pagina = 'AssignFreelance/listProyects';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putProject;
    fillField(pagina, par, tipo, selector);
}
// Solicita las categorias
function getAreas() {
    var pagina = 'AssignFreelance/listAreas';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putAreas;
    fillField(pagina, par, tipo, selector);
}

function getFreelance(catId) {
    //console.log(catId);
    var pagina = 'AssignFreelance/listFreelances';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putFreelance;
    fillField(pagina, par, tipo, selector);
}
function getFreelance2(catId) {
    //console.log(catId);
    var pagina = 'AssignFreelance/listFreelance2';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putFreelance2;
    fillField(pagina, par, tipo, selector);
}
function getAssign() {
    //console.log(catId);
    var pagina = 'AssignFreelance/listAssign';
    var par = `[{"catId":""}]`;
    var tipo = 'json';
    var selector = putAssign;
    fillField(pagina, par, tipo, selector);
}
function get_Freelances(pj) {
    var pagina = 'AssignFreelance/listFreelances2';
    var par = `[{"pjtId":"${pj}"}]`;
    var tipo = 'json';
    var selector = put_Freelances;
    fillField(pagina, par, tipo, selector);
}

/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los tipos de movimiento
function putProject(dt) {
    // console.log(dt);
    if (dt[0].ext_id != 0) {
        $.each(dt, function (v, u) {
            //if (u.ext_elements.substring(0, 1) != '0') {
                let H = `<option value="${u.pjt_id}" data-content="${u.pjt_id}|${u.pjt_number}|${u.pjt_name}">${u.pjt_name}</option>`;
                $('#txtProject').append(H);
            //}
        });
    }
 
    $('#txtProject').on('change', function () {
        /*
        px = parseInt($('#txtProject option:selected').attr('data_indx'));
        $('#txtIdProject').val(pj[px].pjt_id);
        // let period = pj[px].pjt_date_start + ' - ' + pj[px].pjt_date_end;
        $('.objet').addClass('objHidden');*/
        let id = $(this).val();
        link = $(`#txtProject option[value="${id}"]`).attr('data-content').split('|')[2];
        code = $(`#txtProject option[value="${id}"]`).attr('data-content').split('|')[5];
        get_Freelances(id);
    });
}

// Dibuja los almacenes
function putStores(dt) {
    if (dt[0].str_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.str_id}">${u.str_name}</option>`;
            $('#txtStoreSource').append(H);
        });
    }

    $('#txtStoreSource').on('change', function () {
        validator();
    });
}

function putCoins(dt) {
    if (dt[0].cin_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cin_id}">${u.cin_code} - ${u.cin_name}</option>`;
            $('#txtCoin').append(H);
        });
    }

    $('#txtCoin').on('change', function () {
        validator();
    });
}

function putAreas(dt) {
    
    if (dt[0].free_area_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.free_area_id}"> ${u.are_name}</option>`;
            $('#txtArea').append(H);
        });

        $('#txtArea').on('change', function () {
            let catId = $(this).val();
            //console.log(catId);
            $('#txtFreelance').html('');
            $('#txtFreelance').val('Selecciona el freelance');
            /* NOTA EN EL CAMPO DE PRODUCTOS PARA QUE NO ESCRIBAN */
            // $('#txtProducts').val('     Cargando Informacion . . . .');
            getFreelance(catId);
            // getProducts(catId);
        });
    }
}

function putFreelance(dt) {
    //$('#txtFreelance').empty();
    if (dt[0].free_id != 0) {
        $.each(dt, function (v, u) {
            if (u.free_id) {
                let H = `<option value="${u.free_id}" > ${u.free_name}</option>`;
                $('#txtFreelance').append(H);
            }else{
                let H = `<option value="0" > Sin disponibilidad</option>`;
                $('#txtFreelance').append(H);
            }
        });

        $('#txtFreelance').on('change', function () {
            let subcatId = $(this).val();
            getFreelance(subcatId); 
        });
    }
}
function putFreelance2(dt) {
    //$('#txtFreelance').empty();

    if (dt[0].free_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.free_id}" > ${u.free_name}</option>`;
            $('#txtFreelance').append(H);
            
        });

        $('#txtFreelance').on('change', function () {
            let subcatId = $(this).val();  
            getFreelance2(subcatId);
        });
    }
}
function putAssign(dt) {
    //$('#txtFreelance').empty();
    assigns = dt;
}

// Almacena los registros de productos en un arreglo
function putProducts(dt) {
    var ps = $('#txtProducts').offset();
    $('#listProducts .list-items').html('');
    //console.log(dt);
    $('#listProducts').css({top: ps.top + 30 + 'px'});
    $('#listProducts').slideUp('100', function () {
        $('#listProducts .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="P-${u.prd_id}" data_serie="${u.serNext}" data_complement="${u.prd_sku}|${u.prd_name}">${u.prd_sku}-${u.prd_name}</div>`;
        $('#listProducts .list-items').append(H);
    });
    /* QUITA NOTA EN EL CAMPO DE PRODUCTOS */
    $('#txtProducts').val('');
    
    $('#txtProducts').on('focus', function () {
        $('#listProducts').slideDown('slow');
    });

    $('#listProducts').on('mouseleave', function () {
        $('#listProducts').slideUp('slow');
    });

    $('#txtProducts').keyup(function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('#listProducts').slideUp(100);
        } else {
            $('#listProducts').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_products(res);
    });

    $('#listProducts .list-item').on('click', function () {
        let prdNm = $(this).html();
        let prdId = $(this).attr('id') + '|' + $(this).attr('data_complement');
        let serie = $(this).attr('data_serie');
        $('#txtProducts').val(prdNm);
        $('#txtIdProducts').val(prdId);
        $('#txtNextSerie').val(serie);
        $('#txtPrice').val($(this).attr('data_complement').split('|')[3]);
        $('#txtCoinType').val($(this).attr('data_complement').split('|')[4]);
        $('#listProducts').slideUp(100);
        validator();
    });
}
// AGREGA LAS FACTURAS CON TEXTO SELECTIVO
function putInvoiceList(dt) {
    var fc = $('#txtInvoice').offset();
    $('#listInvoice .list-items').html('');
    //console.log(dt);
    //$('.list-group #listInvoice').css({top: fc.top + 40 + 'px'});
    $('#listInvoice').css({top: fc.top + 30 + 'px'});
    $('#listInvoice').slideUp('100', function () {
        //$('.list-group #listInvoice').slideUp('100', function () {
        $('#listInvoice .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.doc_id}" data_complement="${u.doc_id}|${u.doc_name}">${u.doc_name}</div>`;
        $('#listInvoice .list-items').append(H);
    });

    $('#txtInvoice').on('focus', function () {
        //$('.list-group #listInvoice').slideDown('slow');
        $('#listInvoice').slideDown('slow');
    });

    $('#listInvoice').on('mouseleave', function () {
        $('#listInvoice').slideUp('slow');
    });

    $('#txtInvoice').keyup(function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('#listInvoice').slideUp(100);
        } else {
            $('#listInvoice').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_invoice(res);
    });

    $('#listInvoice .list-item').on('click', function () {
        let prdNm = $(this).html();
        let prdId = $(this).attr('id');
        //console.log(prdId);
        $('#txtInvoice').val(prdNm);
        $('#txtIdInvoice').val(prdId);
        $('#listInvoice').slideUp(100);
        validator();
    });
}

// CARGA LA INFORMACION DE LOS PROVEEDORES DE PRODUCTOS
function putSupplierList(dt) {
    var sl = $('#txtSuppliers').offset();
    $('#listSupplier .list-items').html('');
    //console.log(sl);
    $('#listSupplier').css({top: sl.top + 30 + 'px'}); // volver a tomar al hacer scroll.
    $('#listSupplier').slideUp('100', function () {
        $('#listSupplier .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.sup_id}" data_complement="${u.sup_id}|${u.sup_business_name}">${u.sup_business_name}</div>`;
        $('#listSupplier .list-items').append(H);
    });

    $('#txtSuppliers').on('focus', function () {
        
        $('#listSupplier').slideDown('fast');
    });

    //$('#listSupplier').scrollY();
    $('#txtSupplier').on('scroll', function(){
        sl = $('#txtSuppliers').offset();
        $('#listSupplier').css({top: sl.top + 30 + 'px'});
    });
    $('#listSupplier').on('mouseleave', function () {
        $('#listSupplier').slideUp('fast');
    });

    $('#txtSuppliers').keyup(function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('#listSupplier').slideUp(100);
        } else {
            $('#listSupplier').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_suppliers(res);
    });

    $('#listSupplier .list-item').on('click', function () {
        let prdNm = $(this).html();
        let prdId = $(this).attr('id');
        //console.log('selecciona elemento', prdId,'---', prdNm);
        $('#txtSuppliers').val(prdNm);
        $('#txtIdSuppliers').val(prdId);
        $('#listSupplier').slideUp(100);
        validator();
    });
}

/**  ++++   Coloca los productos en el listado del input */
function put_Freelances(dt) {
    // console.log(pj);
    pd = dt;
    
    let largo = $('#tblExchanges tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla'
        ? $('#tblExchanges tbody tr').remove()
        : '';
        
    let tabla = $('#tblExchanges').DataTable();
    tabla.rows().remove().draw();
    let cn = 0;
    if(dt[0].free_id){
        $.each(pd, function (v, u) {
            
            let sku = u.pjtdt_prod_sku;
            if (sku == 'Pendiente') {
                sku = `<span class="pending">${sku}</sku>`;
            }
    
            var row= tabla.row
            .add({
                editable: `<i class="fas fa-pen modif" id ="md${u.free_id}"></i><i class="fas fa-times-circle kill"></i>`,
                proyname:u.pjt_name,
                freename: u.free_name,
                area:u.are_name,
                strtdate:  u.ass_date_start, 
                enddate:u.ass_date_end,
                comments: u.ass_coments
            })
            .draw();

            $(row.node()).attr('data-content', u.free_id + '|'+u.are_id+'|'+u.pjt_id+'|'+u.ass_id);
            $('#md' + u.ass_id)
            .parents('tr')
            .attr('id', u.ass_id);
            
            actionButtons();
                
            $('#k' + u.pjtdt_id)
                .parents('tr')
                .attr({
                    id: u.pjtdt_id,
                    data_serie: u.ser_id,
                    data_proj_change: u.pjtcr_id,
                    data_maintain: u.pmt_id,
                    data_status: u.mts_id
                });
                //console.log(u.pmt_id);
            cn++;
        });
    }
}

function actionButtons() {
    /**  ---- Acciones de edición ----- */
    $('td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let data = $(this).closest("tr");
            let strId = data.data("content").split("|")[3];

            switch (acc) {
                case 'modif':
                    //$('#txtFreelance').empty();
                    editStore(strId, data);
                    break;
                case 'kill':
                    deletefreelance(strId);
                    break;
                default:
            }
        });
        /*

    /**  ---- Acciones de Guardar categoria ----- */
    $('#btn_guardar')
        .unbind('click')
        .on('click', function () {
            
            if ($('#txtIdAssign').val() == '') {
                saveStore();
            } else {
                updateStore();
            }
            
        });
}

function saveStore() {
    var id_proj= $('#txtProject').val();
    var area = $('#txtArea').val();
    var freelance= $('#txtFreelance').val();
    var dateadmision = $('#txtFechaAdmision').val();
    var dateend = $('#txtFechaFinalizacion').val();
    var commnts = $('#txtComments').val();
    var par = `
        [{  "pry"   : "${id_proj}",
            "free"   : "${freelance}",
            "area"   : "${area}",
            "sdate"   : "${dateadmision}",
            "edate"   : "${dateend}",
            "com"   : "${commnts}"
        }]`;
    var pagina = 'AssignFreelance/SaveFreelanceProy';
    var tipo = 'html';
    var selector = putSaveStore;
    fillField(pagina, par, tipo, selector);
}

function updateStore() {
     
    var id_ass= $('#txtIdAssign').val();
    var id_proj= $('#txtProject').val();
    var area = $('#txtArea').val();
    var freelance= $('#txtFreelance').val();
    var dateadmision = $('#txtFechaAdmision').val();
    var dateend = $('#txtFechaFinalizacion').val();
    var commnts = $('#txtComments').val();
    var par = `
        [{  "ass"   : "${id_ass}",
            "pry"   : "${id_proj}",
            "free"   : "${freelance}",
            "area"   : "${area}",
            "sdate"   : "${dateadmision}",
            "edate"   : "${dateend}",
            "com"   : "${commnts}"
        }]`;
        
    var pagina = 'AssignFreelance/UpdateAssignFreelance';
    var tipo = 'html';
    var selector = putUpdateStore;
    fillField(pagina, par, tipo, selector);
}

function editStore(strId, data) {
    //console.log(data.data("content").split("|")[0]);
    
    getFreelance2(data.data("content").split("|")[1]);
    $('#txtArea').val(data.data("content").split("|")[1]);
    $('#txtProject').val(data.data("content").split("|")[2]);
    $('#txtIdAssign').val(data.data("content").split("|")[3]);
    $('#txtFreelance').val(data.data("content").split("|")[0]);
    //goThroughStore(data.data("content").split("|")[0]);
    //$('#txtFreelance').empty();
    $('#txtFechaAdmision').val(moment(data.find('td:eq(4)').text()).format('YYYY-MM-DD'));
    $('#txtFechaFinalizacion').val(moment(data.find('td:eq(5)').text()).format('YYYY-MM-DD'));
    $('#txtComments').val(data.find('td:eq(6)').text());
}

function putSaveStore(dt) {
    
    if (assigns.length > 0) {
       // let ix = goThroughStore(dt);
        //console.log(ix);
        
        var id_proj= $('#txtProject').val();
        get_Freelances(id_proj);
        clean_selectors();
        //$('#LimpiarFormulario').trigger('click');
    } else {
        setTimeout(() => {
            putSaveStore(dt);
        }, 100);
    }
}

function putUpdateStore(dt) {
    if (assigns.length > 0) {
        console.log(dt);
        //let ix = goThroughStore(dt);
        var id_proj= $('#txtProject').val();
        get_Freelances(id_proj);
        // console.log(strs[ix].str_id);
        // console.log($(`#${strs[ix].str_id}`).children('td.store-name').html());
        /*
        $(`#${assigns[ix].str_id}`).children('td.store-name').html(assigns[ix].str_name);
        $(`#${assigns[ix].str_id}`).children('td.store-owner').html(assigns[ix].emp_fullname);
        $(`#${assigns[ix].str_id}`).children('td.store-type').html(assigns[ix].str_type);*/
        clean_selectors();
        // putQuantity(strs[ix].str_id);
        // $('#LimpiarFormulario').trigger('click');
    } else {
        setTimeout(() => {
            putUpdateStore(dt);
        }, 100);
    }
}

function goThroughStore(strId) {
    let inx = -1;
    $.each(assigns, function (v, u) {
        console.log(u);
        if (strId == u.free_id) {
            inx = u.are_id}
    });
    return inx;
}

function deletefreelance(strId) {
        $('#confirmModal').modal('show');

        $('#confirmModalLevel').html('¿Seguro que desea borrar la asignacion?');
        $('#N').html('Cancelar');
        $('#confirmButton').html('Borrar asignacion').css({display: 'inline'});
        $('#Id').val(strId);
        console.log(strId);
        //   $('#BorrarAlmacenModal').modal('show');
        //$('#IdAlmacenBorrar').val(strId);

        $('#confirmButton').on('click', function () {
            var pagina = 'AssignFreelance/DeleteAssignFreelance';
            var par = `[{"ass_id":"${strId}"}]`;
            var tipo = 'html';
            var selector = putdeletefreelance;
            fillField(pagina, par, tipo, selector);
        });
    
}

function putdeletefreelance(dt) {
    // console.log(dt);
        var id_proj= $('#txtProject').val();
        get_Freelances(id_proj);
    $('#confirmModal').modal('hide');
}

// Limpia los campos para uns nueva seleccion
function clean_selectors() {
    
    $('#txtIdAssign').val('');
    $('#txtArea').val(0);
    $('#txtFreelance').val(0);
    $('#txtFechaAdmision').val('');
    $('#txtFechaFinalizacion').val('');
    $('#txtComments').val('');
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
            $('#txtPeriodProjectEdt').val(
                start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY')
            );
            looseAlert($('#txtPeriodProjectEdt').parent());
        }
    );
}

function exchange_result(dt) {
    //console.log(dt);
    //$('.resFolio').text(refil(folio, 7));
    
    $('#MoveResultModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'AssignFreelance';
    });
    $('#btnPrintReport').on('click', function () {
        // $('.btn-print').trigger('click');
        printInfoGetOut(folio);
    });
}

function updated_stores(dt) {
    // console.log(dt);

    $('.resFolio').text(refil(folio, 7));
    $('#MoveResultModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'NewSublet';
    });
    $('#btnPrintReport').on('click', function () {
        // $('.btn-print').trigger('click');
        printInfoGetOut(folio);
    });
}

/**  ++++ Omite acentos para su facil consulta */
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}

// Valida los campos
function validator() {
    let ky = 0;
    let msg = '';

    if ($('#txtProject').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un proyecto';
    }
    if ($('#txtMarca').val() == '') {
        ky = 1;
        msg += 'Debes seleccionar un proyecto';
    }

    if ($('#txtArea').val() == 0 ) {
        ky = 1;
        msg += 'Debes seleccionar una categoria';
    }

    if ($('#txtFreelance').val() == 0 && $('.pos1').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar una subcategoria';
    }
    if ($('#txtFechaAdmision').val() == 0 && $('.pos1').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar una subcategoria';
    }
    if (ky == 0) {
        $('#btn_exchange').removeClass('disabled');
    } else {
        $('#btn_exchange').addClass('disabled');
        //console.clear();
        //console.log(msg);
    }
    
}


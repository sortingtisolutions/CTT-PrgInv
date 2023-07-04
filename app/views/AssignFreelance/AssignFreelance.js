var seccion = '';
let folio;
let = pr = [];
let = link = '';

$(document).ready(function () {
    // folio = getFolio();
    if (verifica_usuario()) {
        inicial();
    }
});

//INICIO DE PROCESOS
function inicial() {
    getlistProyect();
    //getStores();
    //getSuppliers();
    //getInvoice();
    //getCoins();
    getAreas();
    setting_table();
    fillContent();
    $('#btn_exchange').addClass('disabled');
    // setting_datepicket($('#txtPeriod'), Date().format('DD/MM/YYYY')   ,Date().format('DD/MM/YYYY'));
    
    $('#btn_exchange').on('click', function () { 
        exchange_apply(0);
    });

    $('txtProject').on('blur', function () {
        validator();
    });
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
/*
// Solicita el listado de almacenes
function getStores() {
    var pagina = 'AssignFreelance/listStores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}
// Solicita los provedores
function getSuppliers() {
    var pagina = 'AssignFreelance/listSuppliers';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    //var selector = putSuppliers;
    var selector = putSupplierList;
    fillField(pagina, par, tipo, selector);
}
// Solicita los documentos factura
function getInvoice(id) {
    var pagina = 'AssignFreelance/listInvoice';
    var par = `[{"extId":"${id}"}]`;
    var tipo = 'json';
    var selector = putInvoiceList;
    fillField(pagina, par, tipo, selector);
}
// Solicita los documentos factura
function getCoins() {
    var pagina = 'AssignFreelance/listCoins';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putCoins;
    fillField(pagina, par, tipo, selector);
}*/
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

// Solicita los productos de un almacen seleccionado
function getProducts(catId) {
   /*  var pagina = 'NewSublet/listProducts';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector); */
}
// Solicita los movimientos acurridos
/*function getExchanges() {
    var pagina = 'NewSublet/listExchanges';
    var par = `[{"folio":"${folio}"}]`;
    var tipo = 'json';
    var selector = putExchanges;
    fillField(pagina, par, tipo, selector);
} */

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
        let id = $(this).val();
        link = $(`#txtProject option[value="${id}"]`).attr('data-content').split('|')[2];
        code = $(`#txtProject option[value="${id}"]`).attr('data-content').split('|')[5];
        // setting_interface(code,id);
        //relocation_products();
        validator();
    });
}
/**  ++++++  configura la interfasede inputs requeridos */
function setting_interface(code,id) {
    // console.log('CODE ', code);
    code.substring(1, 2) == '0' ? $('.pos1').addClass('hide-items') : $('.pos1').removeClass('hide-items');
    code.substring(2, 3) == '0' ? $('.pos2').addClass('hide-items') : $('.pos2').removeClass('hide-items');
    code.substring(3, 4) == '0' ? $('.pos3').addClass('hide-items') : $('.pos3').removeClass('hide-items');
    code.substring(4, 5) == '0' ? $('.pos4').addClass('hide-items') : $('.pos4').removeClass('hide-items');
    code.substring(5, 6) == '0' ? $('.pos5').addClass('hide-items') : $('.pos5').removeClass('hide-items');
    code.substring(6, 7) == '0' ? $('.pos6').addClass('hide-items') : $('.pos6').removeClass('hide-items');
    getSuppliers();
    getInvoice(id);
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
    //console.log('putSubCategories',dt);
    
    if (dt[0].free_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.free_id}" > ${u.free_name}</option>`;
            $('#txtFreelance').append(H);
            console.log(u.free_id);
        });

        $('#txtFreelance').on('change', function () {
            let subcatId = $(this).val();
            
            getFreelance(subcatId);
            
        });
    }
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

// reubica el input de los productos
function relocation_products() {
    var ps = $('#txtProducts').offset();

    $('#listProducts').css({top: ps.top + 30 + 'px'});
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

    /*
    if ($('#txtPeriodProjectEdt').val() == '' ) {
        //*   && $('.pos5').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes indicar el tipo de moneda';
    }*/
                                        //console.log(ky, msg);

                                        // if ($('#txtCost').val() == 0 && $('.pos5').attr('class').indexOf('hide-items') < 0) {
                                        //     ky = 1;
                                        //     msg += 'Debes indicar el costo del producto';
                                        // }

    //validacion de cantidad para agregar serie mayor a 1
    /*if ($('#txtQuantity').val() > 1) {
        // && $('#txtSerie').val() == 0
        //console.log($('#txtQuantity').val() > 1);
        $('#txtSerie').attr('disabled', true).val('');
        $('#txtSkuSerie').attr('disabled', true).val('');
        //$('#txtNoEco').attr('disabled', true).val('');
        
    } else if ($('#txtQuantity').val() == 1) {
        $('#txtSerie').attr('disabled', false);
        $('#txtSkuSerie').attr('disabled', false);
        //console.log( ky);
        //ky = 0;
        
        //$('#txtNoEco').attr('disabled', false);

    } else {
        ky = 1;
        msg += ' Las series se capturan individualmente en la tabla';
    }*/

                                    //if ($('#txtSerie').val() == 0 && $('.pos6').attr('class').indexOf('hide-items') < 0) {
                                    //console.log($('#txtSerie').val(), $('#txtSerie').attr('disabled'));
/*
    if ($('#txtSerie').val() == '' && $('#txtSerie').attr('disabled') == undefined && $('.pos6').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes indicar la serie del producto';
    }*/
    

    if (ky == 0) {
        $('#btn_exchange').removeClass('disabled');
    } else {
        $('#btn_exchange').addClass('disabled');
        //console.clear();
        //console.log(msg);
    }
}

// Aplica la seleccion para la tabla de movimientos
function exchange_apply() {
    
    let project = $('#txtProject').val();
    let area = $('#txtArea').val();
    let freelance = $('#txtFreelance').val();
    
    let fechaAdmision= $('#txtFechaAdmision').val();
    let fechaFinalizacion = $('#txtFechaFinalizacion').val();
    let txtComments = $('#txtComments').val();
    let nameArea = $(`#txtArea option[value="${area}"]`).text();
    
    let nameFreelance = $(`#txtFreelance option[value="${freelance}"]`).text();
    let nameProject = $(`#txtProject option[value="${project}"]`).text();
    
    //let idCategoria = $('#txtArea').val();
    //let nameCategoria = $(`#txtArea option[value="${idCategoria}"]`).text();

    //let idSubCategoria = $('#txtFreelance').val();
    //let codeSubCategoria = $('#txtFreelance option:selected').data('code');
    //let nameSubCategoria = $(`#txtFreelance option[value="${idSubCategoria}"]`).text();


    //let area =nameCategoria.replace(/\"/, '');
    //let freelance = nameSubCategoria.replace(/\"/, '');
    //console.log(prdSku);
    //let sersku = prdSku + refil(1, 3);
    
    //serie++;
    console.log('Paso 1 ');
        /*
    if (quantity > 1) {
        for (var i = 0; i < quantity; i++) {
            //sersku = prdSku + refil(serie++, 3);
            //update_array_products(prdId, serie); // REVISAR EL DETALLE DE ESTA FUNCION
            par = `
        [{
            "support"  : "${strid}|${idCategoria}|${idSubCategoria}|${codeSubCategoria}|${supplier}|${idProyect}|${coin}",
            "prdName"       : "${prdName}",
            "prdSku"       : "${prdSku}",
            "price"        : "${price}",
            "skuSerie"       : "${skuSerie}",
            "noSerie"      : "${noSerie}",
            "serbran"      : "${serbran}",
            "nameStore"       : "${nameStore}",
            "nameCategoria"       : "${category}",
            "nameSubCategoria"       : "${subCategory}",
            "startDate"       : "${startDate}",
            "endDate"       : "${endDate}",
            "suppliernm"       : "${suppliernm}",
            "proyectName"       : "${proyectName}",
            "comment"      : "${comment}",
            "strid"       : "${strid}",
            "idCategoria"        : "${idCategoria}",
            "idSubCategoria"       : "${idSubCategoria }",
            "supplier"      : "${supplier}",
            "idProyect"      : "${idProyect}"
            
        }]`;
            console.log(par);
            fill_table(par);
        }
    } else {*/
        par = `
        [{
            "support"  : "${area}|${freelance}|${project}",
            "project"       : "${nameProject}",
            "area"       : "${nameArea}",
            "freelance"        : "${nameFreelance}",
            "fechaAdmision"       : "${fechaAdmision}",
            "fechaFinalizacion"      : "${fechaFinalizacion}",
            "comments"      : "${txtComments}"
            
        }]`;
        console.log(par);
        fill_table(par);
    //}
    clean_selectors();
}

// Llena la tabla de los datos de movimientos
function fill_table(par) {
    console.log('Paso 3 ', par);
    let largo = $('#tblExchanges tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblExchanges tbody tr').remove() : '';
    par = JSON.parse(par);

    let tabla = $('#tblExchanges').DataTable();

    var row= tabla.row
        .add({
            editable: `<i class="fas fa-times-circle kill"></i>`,
            proyname:par[0].project,
            freename: par[0].freelance,
            area: par[0].area,
            strtdate:  par[0].fechaAdmision, 
            enddate:par[0].fechaFinalizacion,
            comments: par[0].comments
        })
        .draw();

        $(row.node()).attr('data-content', par[0].support);

    btn_apply_appears();

    $('.edit')
        .unbind('click')
        .on('click', function () {
            tabla.row($(this).parent('tr')).remove().draw();
            btn_apply_appears();
        });
}

function btn_apply_appears() {
    console.log('Paso 4 ');
    let tabla = $('#tblExchanges').DataTable();
    let rengs = tabla.rows().count();
    if (rengs > 0) {
        $('.btn-apply').removeClass('hidden-field');
    } else {
        $('.btn-apply').addClass('hidden-field');
    }
}

// Limpia los campos para uns nueva seleccion
function clean_selectors() {
    
    //$('#txtProject').val(0);
    $('#txtArea').val(0);
    $('#txtFreelance').val(0);
    $('#txtFechaAdmision').val('');
    $('#txtFechaFinalizacion').val('');
    $('#txtComments').val('');

   
}
/** Actualiza la cantidad de cada producto dentro del arreglo */
function update_array_products(id, sr) {
    //console.log('Paso 2 ', id, sr);
    $('#txtNextSerie').val(sr);
    $(`#P-${id}`).attr('data_serie', sr);
}

function read_exchange_table() {
    /*if (folio == undefined) {
        var pagina = 'NewSublet/NextExchange';
        var par = '[{"par":""}]';
        var tipo = 'html';
        var selector = putNextExchangeNumber;
        fillField(pagina, par, tipo, selector);
    } else {*/
        $('#tblExchanges tbody tr').each(function (v, u) {
            //let seriesku = $(this).attr('data-content').split('|')[3];
            
            //let proy = $($(u).find('td')[1]).text();
            let proyname = $($(u).find('td')[1]).text();
            let freename = $($(u).find('td')[2]).text();
            let area = $($(u).find('td')[3]).text();
            let strtdate =$($(u).find('td')[4]).text();
            let enddate = $($(u).find('td')[5]).text();
            //let serienum = $('.serprod').val();
            let comments= $($(u).find('td')[6]).text();

            let id_are = $(this).attr('data-content').split('|')[0];
            let id_free = $(this).attr('data-content').split('|')[1];
            let id_proj = $(this).attr('data-content').split('|')[2];
            
            /*
            
            let id_subc = $(this).attr('data-content').split('|')[2];
            let id_codSuc = $(this).attr('data-content').split('|')[3];
            let id_supplier = $(this).attr('data-content').split('|')[4];
            let id_proy = $(this).attr('data-content').split('|')[5];
            let coin= $(this).attr('data-content').split('|')[6];
            */

            let truk = `${id_proj}|${id_free}|${id_are}|${strtdate}|${enddate}|${comments}`;
            console.log(truk);
            build_data_structure(truk);
        });
    //}
}

/* Generación del folio  */
function putNextExchangeNumber(dt) {
    //console.log(dt);
    folio = dt;
    read_exchange_table();
}

function build_data_structure(pr) {
    let el = pr.split('|');
    let par = `
    [{
        "pry" :  "${el[0]}",
        "free" :  "${el[1]}",
        "area" :  "${el[2]}",
        "sdate" :  "${el[3]}",
        "edate" :  "${el[4]}",
        "com" :  "${el[5]}"
    }]`;
    //console.log(' Antes de Insertar', par);
    save_exchange(par);
}

/* function build_update_store_data(pr) {
    let el = pr.split('|');
    let par = `
[{
    "prd" :  "${el[0]}",
    "qty" :  "${el[1]}",
    "str" :  "${el[2]}",
    "mov" :  "${el[3]}"
}]`;

    update_store(par);
} */

/** Graba intercambio de almacenes */
function save_exchange(pr) {
    //   console.log(pr);
    var pagina = 'AssignFreelance/SaveFreelanceProy';
    var par = pr;
    var tipo = 'html';
    var selector = exchange_result;
    //console.log(par);
    fillField(pagina, par, tipo, selector);
    //console.log(fillField(pagina, par, tipo, selector));
}

/* function update_store(ap) {
    // console.log(ap);
    var pagina = 'NewSublet/UpdateStores';
    var par = ap;
    var tipo = 'html';
    var selector = updated_stores;
    fillField(pagina, par, tipo, selector);
} */

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

/**  +++ Ocultalos productos del listado que no cumplen con la cadena  */
function sel_products(res) {
    if (res.length < 1) {
        $('#listProducts .list-items div.list-item').css({display: 'block'});
    } else {
        $('#listProducts .list-items div.list-item').css({display: 'none'});
    }

    $('#listProducts .list-items div.list-item').each(function (index) {
        var cm = $(this).attr('data_complement').toUpperCase().replace(/|/g, '');

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

function sel_invoice(res) {
    //console.log('SELECC',res);
    if (res.length < 2) {
        $('#listInvoice .list-items div.list-item').css({display: 'block'});
    } else {
        $('#listInvoice .list-items div.list-item').css({display: 'none'});
    }

    $('#listInvoice .list-items div.list-item').each(function (index) {
        var cm = $(this).attr('data_complement').toUpperCase().replace(/|/g, '');

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //        alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

function sel_suppliers(res) {
    //console.log('SELECC',res);
    if (res.length < 2) {
        $('#listSupplier .list-items div.list-item').css({display: 'block'});
    } else {
        $('#listSupplier .list-items div.list-item').css({display: 'none'});
    }

    $('#listSupplier .list-items div.list-item').each(function (index) {
        var cm = $(this).attr('data_complement').toUpperCase().replace(/|/g, '');

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

function printInfoGetOut(verId) {
    let user = Cookies.get('user').split('|');
    let v = verId;
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');
    // console.log('Lanza Reporte',v,u,n,h);
    window.open(
        `${url}app/views/NewSublet/NewSubletReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
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

            // $('#txtPeriodProject').parent().children('span').html('');
            // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        }
    );
    // Llena el selector de tipo de proyecto
    /* $.each(tpprd, function (v, u) {
        let H = `<option value="${u.pjttp_id}"> ${u.pjttp_name}</option>`;
        $('#txtTypeProjectEdt').append(H);
    }); */
    // Llena el selector de tipo de llamados


    //
    

}


function saveStore() {
    var strName = $('#id_product').val();
    var empName = $('#sku_product').val();
    var strtype = $('#').val();
    var par = `
        [{  "str_name"   : "${strName}",
            "str_type"   : "${strtype}",
            "emp_name"   : "${empName}"
        }]`;

    strs = '';
    var pagina = 'Almacenes/SaveAlmacen';
    var tipo = 'html';
    var selector = putSaveStore;
    fillField(pagina, par, tipo, selector);
}


var seccion = '';
let folio, mthseries;
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
    getExchange();
    getStores();
    //getSuppliers();
    //getInvoice();
    getCoins();
    getCategories();
    setting_table();

    $('#btn_exchange').on('click', function () {
        exchange_apply(0);
    });

    $('#txtCost').on('blur', function () {
        validator();
    });
    $('#txtSerie').on('blur', function () {
        validator();
    });

    $('#txtQuantity').on('blur', function () {
        validator();
    });
}
// Setea de la tabla
function setting_table() {
    let title = 'Entradas de Almacen';
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
            {data: 'prod_sku', class: 'sku'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prodcant', class: 'quantity'},
            {data: 'prodcost', class: 'price left'},
            {data: 'prodseri', class: 'serie-product'},
            {data: 'prodpeti', class: 'serie-product'},
            {data: 'prodimpo', class: 'serie-product'},
            {data: 'costtota', class: 'price left'},
            {data: 'codexcsc', class: 'code-type_s'},
            {data: 'stnamesc', class: 'store-name_s'},
            {data: 'provname', class: 'store-name_s'},
            {data: 'factname', class: 'store-name_s'},
            {data: 'prodmarc', class: 'store-name_s'},
            {data: 'numecono', class: 'store-name_s'},
            {data: 'comments', class: 'comments'},
        ],
    });
}

// Solicita los tipos de movimiento
function getExchange() {
    var pagina = 'MoveStoresIn/listExchange';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putTypeExchange;
    fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores() {
    var pagina = 'MoveStoresIn/listStores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putStores;
    fillField(pagina, par, tipo, selector);
}
// Solicita los provedores
function getSuppliers() {
    var pagina = 'MoveStoresIn/listSuppliers';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    //var selector = putSuppliers;
    var selector = putSupplierList;
    fillField(pagina, par, tipo, selector);
}
// Solicita los documentos factura
function getInvoice(id) {
    console.log(id);
    var pagina = 'MoveStoresIn/listInvoice';
    var par = `[{"extId":"${id}"}]`;
    var tipo = 'json';
    var selector = putInvoiceList;
    fillField(pagina, par, tipo, selector);
}
// Solicita los documentos factura
function getCoins() {
    var pagina = 'MoveStoresIn/listCoins';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putCoins;
    fillField(pagina, par, tipo, selector);
}
// Solicita las categorias
function getCategories() {
    console.log('categos');
    var pagina = 'MoveStoresIn/listCategories';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}
// Solicita los productos de un almacen seleccionado
function getProducts(catId) {
    var pagina = 'MoveStoresIn/listProducts';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}
// Solicita los movimientos acurridos

/*  LLENA LOS DATOS DE LOS ELEMENTOS */
// Dibuja los tipos de movimiento
function putTypeExchange(dt) {
    // console.log(dt);
    if (dt[0].ext_id != 0) {
        $.each(dt, function (v, u) {
            if (u.ext_elements.substring(0, 1) != '0') {
                let H = `<option value="${u.ext_id}" data-content="${u.ext_code}|${u.ext_type}|${u.ext_link}|${u.ext_code_a}|${u.ext_type_a}|${u.ext_elements}">${u.ext_code} - ${u.ext_description}</option>`;
                $('#txtTypeExchange').append(H);
            }
        });
    }

    $('#txtTypeExchange').on('change', function () {
        let id = $(this).val();
        link = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[2];
        code = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[5];
        // console.log('Click txtTypeExchange',id,'|',link,'|',code )
        setting_interface(code,id);
        relocation_products();
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

function putCategories(dt) {
    if (dt[0].cat_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cat_id}"> ${u.cat_name}</option>`;
            $('#txtCategory').append(H);
        });

        $('#txtCategory').on('change', function () {
            let catId = $(this).val();
            /* NOTA EN EL CAMPO DE PRODUCTOS PARA QUE NO ESCRIBAN */
            $('#txtProducts').val('   Cargando Informacion . . . .');
            getProducts(catId);
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
        $(`#txtCoin option[value = "1"]`).attr('selected', 'selected');
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
    $('#listSupplier').css({top: sl.top + 30 + 'px'});
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

    if ($('#txtTypeExchange').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un tipo de movimiento';
    }

    if ($('#txtStoreSource').val() == 0 && $('.pos1').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar un almacen destino';
    }
    // COMENTADO TEMPORALMENTE POR JJR
    /* if ($('#txtSuppliers').val() == 0 && $('.pos2').attr('class').indexOf('hide-items') < 0) {
        // && $('.pos2').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes seleccionar el proveedor';
    } */
    // COMENTADO TEMPORALMENTE POR JJR
    /* if ($('#txtIdInvoice').val() == 0 && $('.pos3').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar un producto';
    }
 */
    if ($('#txtIdProducts').val() == 0 && $('.pos1').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar un producto';
    }
    // COMENTADO TEMPORALMENTE POR JJR
    /* if ($('#txtCoin').val() == 0 && $('.pos5').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes indicar el tipo de moneda';
    } */
                        //console.log(ky, msg);

                        // if ($('#txtCost').val() == 0 && $('.pos5').attr('class').indexOf('hide-items') < 0) {
                        //     ky = 1;
                        //     msg += 'Debes indicar el costo del producto';
                        // }

    //validacion de cantidad para agregar serie mayor a 1
    if ($('#txtQuantity').val() > 1) {
        // && $('#txtSerie').val() == 0
        $('#txtSerie').attr('disabled', true).val('');
        $('#txtNoEco').attr('disabled', true).val('');
        
    } else if ($('#txtQuantity').val() == 1) {
        $('#txtSerie').attr('disabled', false);
        $('#txtNoEco').attr('disabled', false);

    } else {
        ky = 1;
        msg += ' Las series se capturan individualmente en la tabla';
    }

                    //if ($('#txtSerie').val() == 0 && $('.pos6').attr('class').indexOf('hide-items') < 0) {
                    //console.log($('#txtSerie').val(), $('#txtSerie').attr('disabled'));

    // COMENTADO TEMPORALMENTE POR JJR
    /* if ($('#txtSerie').val() == '' && $('#txtSerie').attr('disabled') == undefined && $('.pos6').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes indicar la serie del producto';
    } */

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
    let prdId = $('#txtIdProducts').val().split('|')[0].substring(2, 100);
    let prdSku = $('#txtIdProducts').val().split('|')[1];
    let prdName = $('#txtIdProducts').val().split('|')[2];
    let serie = parseInt($('#txtNextSerie').val());
    let sersku = prdSku + refil(serie, 3);
    let serser = $('#txtSerie').val();
    let prodpeti = $('#txtPedimento').val();
    let prodimpo = $('#txtCostImp').val();
    let sercost = $('#txtCost').val();
    let sercoin = $('#txtCoin').val();
    let quantity = $('#txtQuantity').val();
    let supplier = $('#txtIdSuppliers').val();
    let suppliernm = $('#txtSuppliers').val();
    let docinvoice = $('#txtIdInvoice').val();
    let docinvoicenm = $('#txtInvoice').val();
    let excId = $('#txtTypeExchange').val();
    let exccode = $(`#txtTypeExchange option[value="${excId}"]`).attr('data-content').split('|')[0];
    let strid = $('#txtStoreSource').val();
    let strName = $(`#txtStoreSource option[value="${strid}"]`).text();
    //let prodmarc = $('#txtMarca').val();
    let comment = $('#txtComments').val();
    let serbran = $('#txtMarca').val();
    let sercostimp = $('#txtCostImp').val();
    let serpetimp = $('#txtPedimento').val();
    let sercosttot = $('#txtCostTot').val();
    let sernumeco = $('#txtNoEco').val();

    serie++;
    console.log(prdName);
    mthseries=quantity;
    if (quantity > 1) {
        for (var i = 0; i < quantity; i++) {
            sersku = prdSku + refil(serie++, 3);
            update_array_products(prdId, serie); // REVISAR EL DETALLE DE ESTA FUNCION
            let par = `
            [{
                "support"       : "${prdId}|${excId}|${strid}|${sersku}|${sercoin}|${supplier}|${docinvoice}",
                "sersku"        : "${sersku}",
                "prodser"       : "${serser.toUpperCase()}",
                "prodpeti"      : "${prodpeti}",
                "prodimpo"      : "${prodimpo}",
                "sercost"       : "${sercost}",
                "prodnme"       : "${prdName}",
                "prodqty"       : "${'1'}",
                "excodsr"       : "${exccode}",
                "stnmesr"       : "${strName}",
                "provname"      : "${suppliernm}",
                "factname"      : "${docinvoicenm}",
                "comment"       : "${comment}",
                "serbran"       : "${serbran}",
                "sercostimp"    : "${sercostimp}",
                "serpetimp"     : "${serpetimp}",
                "sercosttot"    : "${sercosttot}",
                "sernumeco"     : "${sernumeco}"
            }]`;
            // console.log(par);
            fill_table(par);
        }
    } else {
        let par = `
        [{
            "support"  : "${prdId}|${excId}|${strid}|${sersku}|${sercoin}|${supplier}|${docinvoice}",
            "sersku"   : "${sersku}",
            "prodser"  : "${serser.toUpperCase()}",
            "sercost"  : "${sercost}",
            "prodnme"  : "${prdName}",
            "prodqty"  : "${quantity}",
            "excodsr"  : "${exccode}",
            "stnmesr"  : "${strName}",
            "provname" : "${suppliernm}",
            "factname" : "${docinvoicenm}",
            "comment"  : "${comment}",
            "serbran"  : "${serbran}",
            "sercostimp"  : "${sercostimp}",
            "serpetimp"  : "${serpetimp}",
            "sercosttot"    : "${sercosttot}",
            "sernumeco"     : "${sernumeco}"
        }]`;
        // console.log(par);
        fill_table(par);
    }
    clean_selectors();
}

// Llena la tabla de los datos de movimientos
function fill_table(par) {
    // console.log('Paso 3 ', par);
    let largo = $('#tblExchanges tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblExchanges tbody tr').remove() : '';
    par = JSON.parse(par);

    let tabla = $('#tblExchanges').DataTable();
    if(mthseries==1){
        tabla.row
        .add({
            editable: `<i class="fas fa-times-circle kill"></i>`,
            prod_sku: `<span class="hide-support" id="SKU-${par[0].sersku}"></span>${par[0].sersku.slice(0, 10)}-${par[0].sersku.slice(10, 13)}`,
            prodname: par[0].prodnme,
            prodcant: `<span>${par[0].prodqty}</span>`,
            prodcost: par[0].sercost, 
            prodseri: par[0].prodser,
            prodpeti: par[0].serpetimp,
            prodimpo: par[0].sercostimp,
            costtota: par[0].sercosttot,
            codexcsc: par[0].excodsr,
            stnamesc: par[0].stnmesr,
            provname: par[0].provname,
            factname: par[0].factname,
            prodmarc: par[0].serbran,
            numecono: par[0].sernumeco,
            comments: `<div>${par[0].comment}</div>`
        })
        .draw();

        $(`#SKU-${par[0].sersku}`).parent().parent().attr('data-content', par[0].support);
    } else{
        tabla.row
            .add({
                editable: `<i class="fas fa-times-circle kill"></i>`,
                prod_sku: `<span class="hide-support" id="SKU-${par[0].sersku}"></span>${par[0].sersku.slice(0, 10)}-${par[0].sersku.slice(10, 13)}`,
                prodname: par[0].prodnme,
                prodcant: `<span>${par[0].prodqty}</span>`,
                prodcost: par[0].sercost, 
                prodseri: '<input class="serprod fieldIn" type="text" id="PS-' + par[0].prodser + '" value="' + par[0].prodser + '">',
                prodpeti: par[0].serpetimp,
                prodimpo: '<input class="sercpet fieldIn" type="text" id="PS-' + par[0].sercostimp + '" value="' + par[0].sercostimp + '">',
                costtota: par[0].sercosttot,
                codexcsc: par[0].excodsr,
                stnamesc: par[0].stnmesr,
                provname: par[0].provname,
                factname: par[0].factname,
                prodmarc: par[0].serbran,
                numecono: '<input class="serecono fieldIn" type="text" id="PS-' + par[0].sernumeco + '" value="' + par[0].sernumeco + '">',
                comments: `<div>${par[0].comment}</div>`
            })
            .draw();

        $(`#SKU-${par[0].sersku}`).parent().parent().attr('data-content', par[0].support);
    }

    btn_apply_appears();

    $('.edit')
        .unbind('click')
        .on('click', function () {
            tabla.row($(this).parent('tr')).remove().draw();
            btn_apply_appears();
        });
}

function btn_apply_appears() {
    // console.log('Paso 4 ');
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
    // $('#txtTypeExchange').val(0);
    //$('#txtStoreSource').val(0);
    //$('#txtStoreTarget').val(0);
    $('#txtProducts').html('<option value="0" selected>Selecciona producto</option>');
    $('#txtQuantity').val('');
    $('#txtSerie').attr('disabled', false);
    $('#txtSerie').val('');
    $('#txtNoEco').attr('disabled', false);
    $('#txtNoEco').val('');
    /*if ($('#txtSerie').attr('disabled') == true){
        //$('#txtSerie').attr('disabled', false);
        alert('VALIDA');
    } */
    mthseries=0;
    $('#txtCost').val('');
    $('#txtQuantityStored').html('&nbsp;');
    $('#txtComments').val('');
    $('#txtMarca').val('');
    $('#txtCostImp').val('');
    $('#txtPedimento').val('');
    $('#txtCostTot').val('');
}
/** Actualiza la cantidad de cada producto dentro del arreglo */
function update_array_products(id, sr) {
    //console.log('Paso 2 ', id, sr);
    $('#txtNextSerie').val(sr);
    $(`#P-${id}`).attr('data_serie', sr);
}

function read_exchange_table() {
    if (folio == undefined) {
        var pagina = 'MoveStoresIn/NextExchange';
        var par = '[{"par":""}]';
        var tipo = 'html';
        var selector = putNextExchangeNumber;
        fillField(pagina, par, tipo, selector);
    } else {
        $('#tblExchanges tbody tr').each(function (v, u) {
            let seriesku = $(this).attr('data-content').split('|')[3];
            let prodname = $($(u).find('td')[2]).text();
            let quantity = $($(u).find('td')[3]).text();
            let sericost = $($(u).find('td')[4]).text();
            let serienum=0;
            let numecono=0;
            let costpeti=0;
            if($($(u).find('td')[5]).text()!=''){
                serienum = $($(u).find('td')[5]).text();
                numecono = $($(u).find('td')[14]).text();
                costpeti = $($(u).find('td')[7]).text();
            }else{
                serienum = $($(u).find('td')[5]).children('.serprod').val();
                numecono = $($(u).find('td')[14]).children('.serecono').val();
                costpeti= $($(u).find('td')[7]).children('.sercpet').val();
                console.log(serienum, numecono, costpeti);
            }
            
            //let serienum = $('.serprod').val();
            let petition = $($(u).find('td')[6]).text();
            
            let costtota = $($(u).find('td')[8]).text();
            let codeexch = $($(u).find('td')[9]).text();
            let storname = $($(u).find('td')[10]).text();
            let serbrand = $($(u).find('td')[13]).text();
            
            let comments = $($(u).find('td')[15]).text();
           
            let producid = $(this).attr('data-content').split('|')[0];
            let typeexch = $(this).attr('data-content').split('|')[1];
            let storesid = $(this).attr('data-content').split('|')[2];
            let sericoin = $(this).attr('data-content').split('|')[4];
            let suppliid = $(this).attr('data-content').split('|')[5];
            let docinvoi = $(this).attr('data-content').split('|')[6];

            let truk = `${folio}|${seriesku}|${prodname}|${quantity}|${serienum}|${storname}|${comments}|${codeexch}|${typeexch}|${producid}|${storesid}|${sericost}|${sericoin}|${suppliid}|${docinvoi}|${petition}|${costpeti}|${serbrand}|${costtota}|${numecono}`;
            console.log(truk);
            build_data_structure(truk);
        });
    }
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
        "fol" :  "${el[0]}",
        "sku" :  "${el[1]}",
        "pnm" :  "${el[2].toUpperCase()}",
        "qty" :  "${el[3]}",
        "ser" :  "${el[4].toUpperCase()}",
        "str" :  "${el[5]}",
        "com" :  "${el[6]}",
        "cod" :  "${el[7]}",
        "idx" :  "${el[8]}",
        "prd" :  "${el[9]}",
        "sti" :  "${el[10]}",
        "cos" :  "${el[11]}",
        "cin" :  "${el[12]}",
        "sup" :  "${el[13]}",
        "doc" :  "${el[14]}",
        "pet" :  "${el[15]}",
        "cpe" :  "${el[16]}",
        "bra" :  "${el[17]}",
        "cto" :  "${el[18]}",
        "nec" :  "${el[19]}"
    }]`;
    console.log(' Antes de Insertar', par);
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
    console.log(pr);
    var pagina = 'MoveStoresIn/SaveExchange';
    var par = pr;
    var tipo = 'html';
    var selector = exchange_result;
    fillField(pagina, par, tipo, selector);
}

/* function update_store(ap) {
    // console.log(ap);
    var pagina = 'MoveStoresIn/UpdateStores';
    var par = ap;
    var tipo = 'html';
    var selector = updated_stores;
    fillField(pagina, par, tipo, selector);
} */

function exchange_result(dt) {
    $('.resFolio').text(refil(folio, 7));
    $('#MoveFolioModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'MoveStoresIn';
    });
    $('#btnPrintReport').on('click', function () {
        // $('.btn-print').trigger('click');
        printInfoGetOut(folio);
    });
}

function updated_stores(dt) {
    // console.log(dt);

    $('.resFolio').text(refil(folio, 7));
    $('#MoveFolioModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'MoveStoresIn';
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
        `${url}app/views/MoveStoresIn/MoveStoresInReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
}
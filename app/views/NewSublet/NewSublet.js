var seccion = '';
let folio;
let = pr = [];
let = link = '';
let serSubCat=0;
let subCat1=0;
let subCat2=0;
let skuProducto;
let prod_id =0;
let cant=0;
let position=0;
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
    getSuppliers();
    //getInvoice();
    //getCoins();
    getCategories();
    setting_table();
    fillContent();
    //getListProducts();
    actionButtons();
    

    $('#btn_exchange').addClass('disabled');
    // setting_datepicket($('#txtPeriod'), Date().format('DD/MM/YYYY')   ,Date().format('DD/MM/YYYY'));
    
    $('#btn_exchange').on('click', function () { 
        exchange_apply(0);
    });

     $('#txtPrice').on('blur', function () {
        validator();
    });
    $('#txtOffer').on('blur', function () {
        validator();
    });
    $('#txtProducts').on('blur', function () {
        //console.log($('#txtProducts').val());
        validator();
    });
    
    $('#txtSerie').on('blur', function () {
        validator();
    });
    $('#txtQuantity').on('blur', function () {
        validator();
    });

    $('#txtFechaReco').on('blur', function () {
        validator();
    });
    $('#xtCollectionTime').on('blur', function () {
        validator();
    });
    $('txtFechaEnt').on('blur', function () {
        validator();
    });
    $('#txtDeliveryTime').on('blur', function () {
        validator();
    });
/*
    $('#txtMarca').on('blur', function () {
        validator();
    });*/

    $('#txtSubCategory').on('blur', function () {
        validator();
        /* let idCategoria = $('#txtCategory').val();
        let codeSubCategoria = $('#txtSubCategory option:selected').data('code');

        $('#txtSkuProduct').val(idCategoria.toString().padStart(2, '0')+codeSubCategoria); */
    });
    $('#txtCategory').on('blur', function () {
        validator();

    });
    //
    /*$('#txtPeriodProjectEdt').on('blur', function () {
        validator();
    });*/
    
}

function actionButtons() {
    /**  ---- Acciones de edición ----- */
    /* $('td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let strId = $(this).parents('tr').attr('id');

            switch (acc) {
                case 'modif':
                    editStore(strId);
                    break;
                case 'kill':
                    deleteStore(strId);
                    break;
                default:
            }
        });

    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let strId = $(this).parents('tr').attr('id');
            let quant = $(this).html();
            let ctnme = $(this).parents('tr').children('td.store-name').html();
            strnme = ctnme;
            // console.log(strId, quant, ctnme);
            if (quant > 0) {
                deep_loading('O');
                var pagina = 'Almacenes/listSeries';
                var par = `[{"strId":"${strId}"}]`;
                var tipo = 'json';
                var selector = putSeries;
                fillField(pagina, par, tipo, selector);
            }
        }); */

    /**  ---- Acciones de Guardar categoria ----- */
    /* $('#GuardarAlmacen')
        .unbind('click')
        .on('click', function () {
            if (validaFormulario() == 1) {
                if ($('#IdAlmacen').val() == '') {
                    saveStore();
                } else {
                    updateStore();
                }
            }
        }); */
    /**  ---- Lismpia los campos ----- */
    $('#LimpiarFormulario')
        .unbind('click')
        .on('click', function () {
            clean_selectors();
        });
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
            /* {data: 'prod_sku', class: 'sku'}, */
            {data: 'prodname', class: 'left'},
            {data: 'price', class: 'serie-product'},
            {data: 'subprice', class: 'serie-product'},

            {data: 'skuserie', class: 'serie-product'},
            {data: 'collectionTime', class: 'store-name_s'},
            {data: 'deliveryTime', class: 'quantity'},
            {data: 'strtdate', class: 'serie-product'},
            {data: 'enddate', class: 'serie-product'},

            {data: 'store', class: 'store-name_s'},
            {data: 'category', class: 'quantity'},
            {data: 'subcategory', class: 'quantity'},
            {data: 'supplier', class: 'store-name_s'},
            {data: 'location', class: 'quantity'},

            {data: 'staff', class: 'store-name_s'},
            {data: 'staffCtt', class: 'serie-product'},
            {data: 'comments', class: 'store-name_s'}
        ],
    });
}

// Solicita los tipos de movimiento
function getExchange() {
    var pagina = 'NewSublet/listExchange';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putTypeExchange;
    fillField(pagina, par, tipo, selector);
}
// Solicita el listado de almacenes
function getStores() {
    var pagina = 'NewSublet/listStores';
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
    var pagina = 'NewSublet/listInvoice';
    var par = `[{"extId":"${id}"}]`;
    var tipo = 'json';
    var selector = putInvoiceList;
    fillField(pagina, par, tipo, selector);
}
/* // Solicita los documentos factura
function getCoins() {
    var pagina = 'NewSublet/listCoins';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putCoins;
    fillField(pagina, par, tipo, selector);
} */
// Solicita las categorias
function getCategories() {
    //console.log('categos');
    var pagina = 'NewSublet/listCategories';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}

function getSubCategories(catId) {
    //console.log(catId);
    var pagina = 'NewSublet/listSubCategories';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putSubCategories;
    fillField(pagina, par, tipo, selector);
}

// Solicita los productos de un almacen seleccionado
function getProducts(subCat) {
    //console.log(subCat);
    var pagina = 'NewSublet/listProducts';
    var par = `[{"subCat":"${subCat}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}
function getNextSkuP(code) {
    //console.log(code);
    
    var pagina = 'NewSublet/NextSkuProduct';
    var par = `[{"code":"${code}"}]`;
    var tipo = 'json';
    var selector = putNextSku;
    fillField(pagina, par, tipo, selector);
}
/*
function getListProducts() {
    var pagina = 'NewSublet/listProducts2';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putProductsList;
    fillField(pagina, par, tipo, selector);
}*/
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
function putTypeExchange(dt) {
    // console.log(dt);
    if (dt[0].ext_id != 0) {
        $.each(dt, function (v, u) {
            //if (u.ext_elements.substring(0, 1) != '0') {
                let H = `<option value="${u.pjt_id}" data-content="${u.pjt_id}|${u.pjt_number}|${u.pjt_name}">${u.pjt_name}</option>`;
                $('#txtTypeExchange').append(H);
            //}
        });
    }

    $('#txtTypeExchange').on('change', function () {
        let id = $(this).val();
        link = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[2];
        code = $(`#txtTypeExchange option[value="${id}"]`).attr('data-content').split('|')[5];
        // setting_interface(code,id);
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
function putNextSku(dt) {
    //let sku_after = $('#txtSKUproduct').val();
    if(dt[0].modelo){
        
        if ($('#txtProducts').val()) {
            $('#txtSKUproduct').val(parseInt(dt[0].modelo));
        }else{
            $('#txtSKUproduct').val(parseInt(dt[0].modelo)+1);
        }
        
    }else{
        $('#txtSKUproduct').val(1);
    }
    /* 
    let prodSku ;

    let codeSubCategoria; 
    let idCategoria = $('#txtCategory').val();
    let idSubCategoria = $('#txtSubCategory').val();
    
    if(dt[0].modelo){
        
        
        if (idSubCategoria !=null) {
            console.log(idSubCategoria);
            codeSubCategoria = $(`#txtSubCategory option[value="${idSubCategoria}"]`).data('code');
        }else{
            codeSubCategoria = $(`#txtSubCategory option[value=271]`).data('code');
        }
        prodSku = idCategoria + codeSubCategoria + refil(parseInt(dt[0].modelo)+1, 3);
        
        $('#txtSKUproduct').val(prodSku);
    }else{
        if (idSubCategoria) {
            codeSubCategoria = $(`#txtSubCategory option[value="${idSubCategoria}"]`).data('code');
        }else{
            codeSubCategoria = $(`#txtSubCategory option[value=271]`).data('code');
        }
        prodSku = idCategoria + codeSubCategoria + refil(1, 3);
        $('#txtSKUproduct').val(prodSku);
    }*/
    
    
}

/* function putCoins(dt) {
    if (dt[0].cin_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cin_id}">${u.cin_code} - ${u.cin_name}</option>`;
            $('#txtCoin').append(H);
        });
    }

    $('#txtCoin').on('change', function () {
        validator();
    });
} */

function putCategories(dt) {
    if (dt[0].cat_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cat_id}" data_complement="0|0"> ${u.cat_name}</option>`;
            $('#txtCategory').append(H);
        });

        $('#txtCategory').on('change', function () {
            let catId = $(this).val();
            $('#txtSubCategory').html('');
            $('#txtSubCategory').val('Selecciona la subategoria');
            /* NOTA EN EL CAMPO DE PRODUCTOS PARA QUE NO ESCRIBAN */
            // $('#txtProducts').val('     Cargando Informacion . . . .');
            getSubCategories(catId);
            getProducts(271);
            getNextSkuP(271);
        });
    }
}

function putSubCategories(dt) {
    //console.log('putSubCategories',dt);
    
    
    if (dt[0].sbc_id != 0) {
        
        $.each(dt, function (v, u) {
            let idCategoria = $('#txtCategory').val();
            let subCat= $(`#txtCategory option[value="${idCategoria}"]`).attr('data_complement');
           
            let H = `<option value="${u.sbc_id}" data-code="${u.sbc_code}" data_complement="${subCat.split('|')[v]}"> ${u.sbc_name}</option>`;
            $('#txtSubCategory').append(H);
        });

        $('#txtSubCategory').on('change', function () {
            let subcatId = $(this).val();
            
            serSubCat = $(`#txtSubCategory option[value=`+subcatId+`]`).attr('data_complement');

            getNextSkuP(subcatId);
            /* NOTA EN EL CAMPO DE PRODUCTOS PARA QUE NO ESCRIBAN */
            getProducts(subcatId);
            
            console.log(subcatId);
            $('#txtNproduct').val(serSubCat);
            
        });
    }
}

// Almacena los registros de productos en un arreglo
function putProducts(dt) {
    if(dt[0].prd_id != 0){
        
    console.log(dt);
    var sl = $('#txtProducts').offset();
    $('#listProduct .list-items').html('');
    $('#listProduct').css({top: sl.top + 30 + 'px'});// volver a tomar al hacer scroll.
    $('#listProduct').slideUp('200', function () {
        $('#listProduct .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.prd_id}" data_complement="${u.prd_id}|${u.prd_name}|${u.prd_price}|${u.sup_id}|${u.sup_business_name}|${u.sub_price}|${u.prdsku}|${u.ser_serial_number}">${u.prd_name}</div>`;
        $('#listProduct .list-items').append(H);
    });

    $('#txtProducts').on('focus', function () {
        $('#listProduct').slideDown('fast');
    });

    $('#txtProducts').on('scroll', function(){
        sl = $('#txtProducts').offset();
        $('#listProduct').css({top: sl.top + 30 + 'px'});
    });
    $('#listProduct').on('mouseleave', function () {
        $('#listProduct').slideUp('fast');
    });

    $('#txtProducts').keyup(function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('#listProduct').slideUp(100);
        } else {
            $('#listProduct').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_products(res);
    });

    $('#listProduct .list-item').on('click', function () {
        let prdNm = $(this).html();
        let prdId = $(this).attr('id');
        let price = $(this).attr('data_complement').split('|')[2];
        let idSupplier = $(this).attr('data_complement').split('|')[3];
        let supplier = $(this).attr('data_complement').split('|')[4];
        
        let offer = $(this).attr('data_complement').split('|')[5];
        let prdSku = $(this).attr('data_complement').split('|')[6];
        let serNext = $(this).attr('data_complement').split('|')[7];
        //console.log('selecciona elemento', prdId,'---', prdNm);
        
        $('#txtProducts').val(prdNm);
        $('#txtIdProducts').val(prdId);
        $('#txtPrice').val(price);
        
        $('#txtOffer').val(offer);
        $('#txtSuppliers').val(supplier);
        $('#txtIdSuppliers').val(idSupplier);
        $('#txtSKUproduct').val(parseInt(prdSku));
        
        $('#txtNproduct').val(0);
        $('#txtNextSerie').val(serNext);
        $('#listProduct').slideUp(100);
        // AGREGAR DATOS

        //get_products(prdId);
        //validator();
    });
}/* else{
    $('#listProduct .list-items').empty();
} */
    /* var ps = $('#txtProducts').offset();
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
    //QUITA NOTA EN EL CAMPO DE PRODUCTOS 
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
        //$('#txtCoinType').val($(this).attr('data_complement').split('|')[4]);
        //
        $('#txtSuppliers').val(prdNm);
        $('#txtIdSuppliers').val(prdId);


        $('#listProducts').slideUp(100);
        validator();
    }); */
}
function putProductsList(dt) {
    console.log(dt);
    var sl = $('#txtProducts').offset();
    $('#listProduct .list-items').html('');
    $('#listProduct').css({top: sl.top + 30 + 'px'});// volver a tomar al hacer scroll.
    $('#listProduct').slideUp('200', function () {
        $('#listProduct .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.prd_id}" data_complement="${u.prd_id}|${u.prd_name}|${u.prd_price}|${u.sup_id}|${u.sup_business_name}|${u.sub_price}">${u.prd_name}</div>`;
        $('#listProduct .list-items').append(H);
    });

    $('#txtProducts').on('focus', function () {
        $('#listProduct').slideDown('fast');
    });

    $('#txtProducts').on('scroll', function(){
        sl = $('#txtProducts').offset();
        $('#listProduct').css({top: sl.top + 30 + 'px'});
    });
    $('#listProduct').on('mouseleave', function () {
        $('#listProduct').slideUp('fast');
    });

    $('#txtProducts').keyup(function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('#listProduct').slideUp(100);
        } else {
            $('#listProduct').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_products(res);
    });

    $('#listProduct .list-item').on('click', function () {
        let prdNm = $(this).html();
        let prdId = $(this).attr('id');
        let price = $(this).attr('data_complement').split('|')[2];
        let idSupplier = $(this).attr('data_complement').split('|')[3];
        let supplier = $(this).attr('data_complement').split('|')[4];
        
        let offer = $(this).attr('data_complement').split('|')[5];
        //console.log($(this).attr('data_complement').split('|')[3]);
        //console.log('selecciona elemento', prdId,'---', prdNm);

        $('#txtProducts').val(prdNm);
        $('#txtIdProducts').val(prdId);
        $('#txtPrice').val(price);
        $('#txtNextSerie').val();
        
        $('#txtOffer').val(offer);
        $('#txtSuppliers').val(supplier);
        $('#txtIdSuppliers').val(idSupplier);
        
        $('#listProduct').slideUp(100);
        // AGREGAR DATOS

        //get_products(prdId);
        //validator();
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
    if ($('#txtStoreSource').val() == 0 ) {
        ky = 1;
        msg += 'Debes seleccionar un almacen destino';
    }
    /*
    if ($('#txtTypeExchange').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar un proyecto';
    }
    if ($('#txtMarca').val() == '') {
        ky = 1;
        msg += 'Debes seleccionar un proyecto';
    }*/

    if ($('#txtCategory').val() == 0 && $('.pos3').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar una categoria';
    }

    if ($('#txtSubCategory').val() == 0 && $('.pos1').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes seleccionar una subcategoria';
    }
    if ($('#txtPrice').val() == 0) {
        ky = 1;
        msg += 'Debes seleccionar el precio';
    }


    
    if ($('#txtSuppliers').val() == 0 && $('.pos2').attr('class').indexOf('hide-items') < 0) {
        // && $('.pos2').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes seleccionar el proveedor';
    }
    if ($('#txtFechaReco').val() == 0) {
        // && $('.pos2').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes seleccionar la fecha de recoleccion';
    }
    if ($('#xtCollectionTime').val() == 0) {
        // && $('.pos2').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes seleccionar la hora de recoleccion';
    }
    if ($('#txtFechaEnt').val() == 0) {
        // && $('.pos2').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes seleccionar la fecha de entrada';
    }
    if ($('#txtDeliveryTime').val() == 0) {
        // && $('.pos2').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes seleccionar la hora de entrega';
    }

    /*
    if ($('#txtCoin').val() == 0 ) {
        //*   && $('.pos5').attr('class').indexOf('hide-items') < 0
        ky = 1;
        msg += 'Debes indicar el tipo de moneda';
    }*/
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
    if ($('#txtQuantity').val() > 1) {
        // && $('#txtSerie').val() == 0
        //console.log($('#txtQuantity').val() > 1);
        $('#txtSerie').attr('disabled', true).val('');
        $('#txtSkuSerie').attr('disabled', true).val('');
        
    } else if ($('#txtQuantity').val() == 1) {
        $('#txtSerie').attr('disabled', false);
        $('#txtSkuSerie').attr('disabled', false);

    } else {
        ky = 1;
        msg += ' Las series se capturan individualmente en la tabla';
    }

                                    //if ($('#txtSerie').val() == 0 && $('.pos6').attr('class').indexOf('hide-items') < 0) {
                                    //console.log($('#txtSerie').val(), $('#txtSerie').attr('disabled'));

    /* if ($('#txtSerie').val() == '' && $('#txtSerie').attr('disabled') == undefined && $('.pos6').attr('class').indexOf('hide-items') < 0) {
        ky = 1;
        msg += 'Debes indicar la serie del producto';
    }  */
    

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
    console.log($('#txtIdProducts').val());
    console.log(parseInt($('#txtNextSerie').val()));
    let prdName;
    let price = $('#txtPrice').val();
    
    let prdSku =  parseInt($('#txtSKUproduct').val());
    let nextprod = parseInt($('#txtNproduct').val());
    let serie = parseInt($('#txtNextSerie').val());
    let subprice = parseInt($('#txtOffer').val());
    
    //console.log(refil(serie+1, 3));
    let prdId = $('#txtIdProducts').val();
    let quantity = $('#txtQuantity').val();
    let serser = $('#txtSerie').val();
    let startDate = $('#txtFechaReco').val();
    let endDate  = $('#txtFechaEnt').val();
    let strid = $('#txtStoreSource').val();
    let nameStore = $(`#txtStoreSource option[value="${strid}"]`).text();
    
    let idCategoria = $('#txtCategory').val();
    let nameCategoria = $(`#txtCategory option[value="${idCategoria}"]`).text();

    let idSubCategoria = $('#txtSubCategory').val();
    let codeSubCategoria = $('#txtSubCategory option:selected').data('code');
    let nameSubCategoria = $(`#txtSubCategory option[value="${idSubCategoria}"]`).text();

    let supplier = $('#txtIdSuppliers').val();
    let suppliernm = $('#txtSuppliers').val();

    
    let collectionTime = $('#txtCollectionTime').val();
    let deliveryTime = $('#txtDeliveryTime').val();
       
    let location = $('#txtLocation').val();
    let staff = $('#txtStaff').val();
    
    let staffCtt = $('#txtStaffCtt').val();
    let comment = $('#txtComments').val();


    if ($('#txtProducts')!='undefined') {
        prdName = $('#txtProducts').val();
    }else{
        prdName=$('#txtProducts').text();
    }
    if (prdId=='' || prdId==0) {
        serSubCat++
    }
    serie++;
    let category =nameCategoria.replace(/\"/, '');
    let subCategory = nameSubCategoria.replace(/\"/, '');
    let prodSku = idCategoria + codeSubCategoria + refil(nextprod +prdSku, 3);
    let no_serie = refil(serie, 3);
    let sersku = prodSku + no_serie;
    
    $(`#txtSubCategory option[value=`+idSubCategoria+`]`).attr('data_complement',serSubCat);    
    //console.log(prdName);
   
    
    //$('#txtNextSerie').val(serie++);
    
    /* if (quantity > 1) {
        for (var i = 0; i < quantity; i++) {
            
            no_serie = refil(serie++, 3);
            sersku = prodSku + no_serie;
            
            update_array_products(serie,nextprod,prdSku);
            //console.log(prodSku);
            par = `
        [{
            "support"  : "${strid}|${idCategoria}|${idSubCategoria}|${supplier}|${prdId}|${quantity}|${prodSku}",
            "prdName"       : "${prdName}",
            "prdSku"       : "${sersku}",
            "price"        : "${price}",
            "subprice" : "${subprice}",

            "skuSerie"       : "",
            "noSerie"      : "${no_serie}",
            "nameStore"       : "${nameStore}",
            "nameCategoria"       : "${category}",

            "nameSubCategoria"       : "${subCategory}",
            "startDate"       : "${startDate}",
            "endDate"       : "${endDate}",
            "suppliernm"       : "${suppliernm}",
            "comment"      : "${comment}",

            "collectionTime"       : "${collectionTime}",
            "deliveryTime"        : "${deliveryTime}",
            "location"       : "${location }",
            "staff"      : "${staff}",
            "staffCtt"      : "${staffCtt}",
            
            "strid"       : "${strid}",
            "idCategoria"        : "${idCategoria}",
            "idSubCategoria"       : "${idSubCategoria }",
            "supplier"      : "${supplier}",
            "prodqty"       : "${'1'}"
            
        }]`;
            fill_table(par);
        }
    } else { */
        
        
        $('#txtNproduct').val(nextprod);
        par = `
        [{
            "support"  : "${strid}|${idCategoria}|${idSubCategoria}|${supplier}|${prdId}|${quantity}|${prodSku}|${serie}",
            "prdName"       : "${prdName}",
            "prdSku"       : "${sersku}",
            "price"        : "${price}",
            "subprice" : "${subprice}",


            "skuSerie"       : "",
            "noSerie"      : "${no_serie}",
            "nameStore"       : "${nameStore}",
            "nameCategoria"       : "${category}",

            "nameSubCategoria"       : "${subCategory}",
            "startDate"       : "${startDate}",
            "endDate"       : "${endDate}",
            "suppliernm"       : "${suppliernm}",
            "comment"      : "${comment}",

            "collectionTime"       : "${collectionTime}",
            "deliveryTime"        : "${deliveryTime}",
            "location"       : "${location }",
            "staff"      : "${staff}",
            "staffCtt"      : "${staffCtt}",
            
            "strid"       : "${strid}",
            "idCategoria"        : "${idCategoria}",
            "idSubCategoria"       : "${idSubCategoria }",
            "supplier"      : "${supplier}",
            "prodqty"  : "${quantity}"
            
        }]`;

        fill_table(par);
    //}
    clean_selectors();
}

// Llena la tabla de los datos de movimientos
function fill_table(par) {
    //console.log('Paso 3 ', par);
    let largo = $('#tblExchanges tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#tblExchanges tbody tr').remove() : '';
    par = JSON.parse(par);

    let tabla = $('#tblExchanges').DataTable();

    tabla.row
        .add({
            editable: `<span class="hide-support" id="SKU-${par[0].prdSku}"></span><i class="fas fa-times-circle kill"></i>`,/* 
            prod_sku:`<span class="hide-support" id="SKU-${par[0].prdSku}"></span>${par[0].prdSku.slice(0, 10)}-${par[0].prdSku.slice(10, 13)}`, */
            /* prod_sku:`<span class="hide-support" id="SKU-${par[0].prdSku}"></span>${par[0].prdSku.slice(0, 10)}`, */
            prodname: par[0].prdName,
            price: par[0].price,
            subprice: par[0].subprice,
            //skuserie:  par[0].skuSerie,

            skuserie: par[0].prodqty,
            strtdate: par[0].startDate,
            enddate: par[0].endDate,
            store: par[0].nameStore,
            collectionTime: par[0].collectionTime,

            deliveryTime: par[0].deliveryTime,
            location: par[0].location,
            staff: par[0].staff,
            staffCtt: par[0].staffCtt,
            category: par[0].nameCategoria,

            subcategory: par[0].nameSubCategoria,
            supplier: par[0].suppliernm,
            //proyect: par[0].proyectName,
            comments: `<div>${par[0].comment}</div>`,
            prodcant: `<span>${par[0].prodqty}</span>`
        })
        .draw();

    $(`#SKU-${par[0].prdSku}`).parent().parent().attr('data-content', par[0].support);
        
    btn_apply_appears();

    $('.edit')
        .unbind('click')
        .on('click', function () {
            tabla.row($(this).parent('tr')).remove().draw();
            btn_apply_appears();
            
        });
}

function btn_apply_appears() {
    //console.log('Paso 4 ');
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
    let id_sub= $('#txtSubCategory').val();
    let serSubCat = $(`#txtSubCategory option[value=`+id_sub+`]`).attr('data_complement');
    getNextSkuP(id_sub);

    $('#txtNproduct').val(serSubCat);
    $('#txtProducts').val('');
    
    $('#txtPrice').val('');
    $('#txtOffer').val('');
    
    $('#txtNextSerie').val(0);
    
    $('#txtIdProducts').val(0);
    $('#txtQuantity').val(1);
    
    /* let startDate = moment(
        $('#txtPeriodProjectEdt').val().split(' - ')[0],
        'DD/MM/YYYY'
    ).format('YYYY-MM-DD');

    let endDate = moment(
        $('#txtPeriodProjectEdt').val().split(' - ')[1],
        'DD/MM/YYYY'
    ).format('YYYY-MM-DD'); */


    $('#txtFechaReco').val('');
    $('#txtFechaEnt').val('');
    //$('#txtStoreSource').val(0);
    
    //$('#txtCategory').val(0);

    //$('#txtSubCategory').val(271);

    $('#txtIdSuppliers').val(0);
    $('#txtSuppliers').val('');

    
    $('#txtCollectionTime').val('');
    $('#txtDeliveryTime').val('');
       
    $('#txtLocation').val('');
    $('#txtStaff').val('');
    
    $('#txtStaffCtt').val('');
    
    $('#txtSerie').val('');
    //let proyectName =  $(`#txtTypeExchange option[value="${idProyect}"]`).text();
    $('#txtComments').val('');
    serSubCat=0;
}
/** Actualiza la cantidad de cada producto dentro del arreglo */
function update_array_products( sr, nextprod, prdSku) {
    //console.log('Paso 2 ', sr);
    $('#txtNextSerie').val(sr);
    $('#txtSKUproduct').val(prdSku);
    $('#txtNproduct').val(nextprod);
    //$(`#P-${id}`).attr('data_serie', sr);
}

function read_exchange_table() {

        $('#tblExchanges tbody tr').each(function (v, u) {
            position = v;
            /* let prdQty = $(this).attr('data-content').split('|')[5]; */
            //let seriesku = $(this).attr('data-content').split('|')[3];
            //let prodsku = $($(u).find('td')[1]).text();
            let productName = $($(u).find('td')[1]).text();
            let price = $($(u).find('td')[2]).text();
            let subPrice = $($(u).find('td')[3]).text();
            /* let serSku = $($(u).find('td')[5]).text(); */
            let prdQty = $($(u).find('td')[4]).text();
            
            //let subQuantity = $($(u).find('td')[1]).text();
            let subCollectiontime = $($(u).find('td')[5]).text();
            let subDeliveryTime = $($(u).find('td')[6]).text();
            let dateStart = $($(u).find('td')[7]).text();
            let dateEnd = $($(u).find('td')[8]).text();

            let supplier = $($(u).find('td')[12]).text();
            let subLocation = $($(u).find('td')[13]).text();
            let nameProvider = $($(u).find('td')[14]).text();
            let nameProviderCtt = $($(u).find('td')[15]).text();
            let comments = $($(u).find('td')[16]).text();

            let store = $(this).attr('data-content').split('|')[0];
            let id_cat = $(this).attr('data-content').split('|')[1];
            let id_subc = $(this).attr('data-content').split('|')[2];
            let id_supplier =$(this).attr('data-content').split('|')[3];
            let prdId = $(this).attr('data-content').split('|')[4];
            let prodsku = $(this).attr('data-content').split('|')[6];
            let serie = $(this).attr('data-content').split('|')[7];

            let truk;
            truk = `${prodsku}|${price}|${subPrice}|${subCollectiontime}|${subDeliveryTime}|${subLocation}|${nameProvider}|${nameProviderCtt}|${dateStart}|${dateEnd}|${store}|${id_cat}|${id_subc}|${id_supplier}|${comments}|${supplier}|${productName}|${prdId}|${prdQty}|${serie}`;
            build_data_struct_new_prod(truk);

            /* if((prdId=='') && skuProducto!=prodsku){
                truk = `${prodsku}|${price}|${subPrice}|${subCollectiontime}|${subDeliveryTime}|${subLocation}|${nameProvider}|${nameProviderCtt}|${dateStart}|${dateEnd}|${store}|${id_cat}|${id_subc}|${id_supplier}|${comments}|${supplier}|${productName}|${serSku}|${prdId}|${prdQty}`;
                build_data_struct_new_prod(truk);
            }else{
                if (prdId!=0 || prdId!='') {
                    prod_id = prdId;
                }
                truk = `${prodsku}|${price}|${subPrice}|${subCollectiontime}|${subDeliveryTime}|${subLocation}|${nameProvider}|${nameProviderCtt}|${dateStart}|${dateEnd}|${store}|${id_cat}|${id_subc}|${id_supplier}|${comments}|${supplier}|${productName}|${serSku}|${prod_id}|${prdQty}`;
                build_data_structure(truk);
                
            } */
            console.log(truk);
            skuProducto = prodsku;
        });
   
}
/*
function read_exchange_table2(v,u){
    let prdQty = $('#tblExchanges tbody tr:eq('+v+')').attr('data-content').split('|')[5];
    //let seriesku = $(this).attr('data-content').split('|')[3];
    //let prodsku = $($(u).find('td')[1]).text();
    let productName = $($(u).find('td')[2]).text();
    let price = $($(u).find('td')[3]).text();
    let subPrice = $($(u).find('td')[4]).text();
    let serSku = $($(u).find('td')[5]).text();
    
    //let subQuantity = $($(u).find('td')[1]).text();
    let subCollectiontime = $($(u).find('td')[7]).text();
    let subDeliveryTime = $($(u).find('td')[8]).text();
    let dateStart = $($(u).find('td')[9]).text();
    let dateEnd = $($(u).find('td')[10]).text();

    let supplier = $($(u).find('td')[14]).text();
    let subLocation = $($(u).find('td')[15]).text();
    let nameProvider = $($(u).find('td')[16]).text();
    let nameProviderCtt = $($(u).find('td')[17]).text();
    let comments = $($(u).find('td')[18]).text();

    let store = $('#tblExchanges tbody tr:eq('+v+')').attr('data-content').split('|')[0];
    let id_cat = $('#tblExchanges tbody tr:eq('+v+')').attr('data-content').split('|')[1];
    let id_subc = $('#tblExchanges tbody tr:eq('+v+')').attr('data-content').split('|')[2];
    let id_supplier =$('#tblExchanges tbody tr:eq('+v+')').attr('data-content').split('|')[3];
    let prdId = $('#tblExchanges tbody tr:eq('+v+')').attr('data-content').split('|')[4];
    let prodsku =$('#tblExchanges tbody tr:eq('+v+')').attr('data-content').split('|')[6];

    let truk;
    truk = `${prodsku}|${price}|${subPrice}|${subCollectiontime}|${subDeliveryTime}|${subLocation}|${nameProvider}|${nameProviderCtt}|${dateStart}|${dateEnd}|${store}|${id_cat}|${id_subc}|${id_supplier}|${comments}|${supplier}|${productName}|${serSku}|${prod_id}|${prdQty}`;
    console.log('Aqui', prod_id,skuProducto,prodsku, cant);
    build_data_structure(truk);

}*/
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
        
        "sku" :  "${el[0]}",
        "prc" :  "${el[1]}",
        "sprc" :  "${el[2]}",
        "sbclt" :  "${el[3]}",
        "sbdt" :  "${el[4]}",

        "sbl" :  "${el[5]}",
        "nmprv" :  "${el[6]}",
        "nmprvc" :  "${el[7]}",
        "sdt" :  "${el[8]}",
        "edt" :  "${el[9]}",

        "str" :  "${el[10]}",
        "ctg" :  "${el[11]}",
        "sbctg" :  "${el[12]}",
        "idsup" :  "${el[13]}",
        "com" :  "${el[14]}",

        "sup" :  "${el[15]}",
        "pnm" :  "${el[16]}",
        "prd" :  "${el[17]}",
        "prdqty": "${el[18]}",
        "srsk": "${el[19]}"
    }]`;
    console.log(' Antes de Insertar', par);
    //save_exchange(par);
}
function build_data_struct_new_prod(pr) {
    let el = pr.split('|');
    let par = `
    [{
        
        "sku" :  "${el[0]}",
        "prc" :  "${el[1]}",
        "sprc" :  "${el[2]}",
        "sbclt" :  "${el[3]}",
        "sbdt" :  "${el[4]}",

        "sbl" :  "${el[5]}",
        "nmprv" :  "${el[6]}",
        "nmprvc" :  "${el[7]}",
        "sdt" :  "${el[8]}",
        "edt" :  "${el[9]}",

        "str" :  "${el[10]}",
        "ctg" :  "${el[11]}",
        "sbctg" :  "${el[12]}",
        "idsup" :  "${el[13]}",
        "com" :  "${el[14]}",

        "sup" :  "${el[15]}",
        "pnm" :  "${el[16]}",
        "prd" :  "${el[17]}",
        "prdqty": "${el[18]}",
        "srsk": "${el[19]}"
    }]`;
    console.log(' Antes de Insertar', par);
   save_exchange2(par);
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
    var pagina = 'NewSublet/SaveSubletting';
    var par = pr;
    var tipo = 'html';
    var selector = exchange_result;
    //console.log(par);
    fillField(pagina, par, tipo, selector);
    //console.log(fillField(pagina, par, tipo, selector));
}
function save_exchange2(pr) {
    console.log(pr);
    var pagina = 'NewSublet/SaveProduct';
    var par = pr;
    var tipo = 'html';
    var selector = exchange_result2;
    console.log(par);
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
    console.log('exchange_result',dt,prod_id, skuProducto);
    //$('.resFolio').text(refil(folio, 7));
    $('#MoveResultModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'NewSublet';
    });
    $('#btnPrintReport').on('click', function () {
        // $('.btn-print').trigger('click');
        printInfoGetOut(folio);
    });
}
function exchange_result2(dt) {
    console.log(dt);
    prod_id = dt;
    cant++;
    console.log('exchange_result2',prod_id, skuProducto, cant);
    
    //read_exchange_table();
    
    //$('.resFolio').text(refil(folio, 7));
    $('#MoveResultModal').modal('show');
    $('#btnHideModal').on('click', function () {
        window.location = 'NewSublet';
    });
    /* $('#btnPrintReport').on('click', function () {
        // $('.btn-print').trigger('click');
        printInfoGetOut(folio);
    }); */
}
/*
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

*/

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


function saveNewSubletting() {
    let ky = validatorSublettingFields();
    if (ky == 0) {
        let prdId = '0';
        let prdNm = $('#txtPrdName').val().replace(/\"/g, '°');
        let prdSk = $('#txtPrdSku').val();
        let prdMd = $('#txtPrdModel').val();
        let prdPr = $('#txtPrdPrice').val();
        let prdEn = $('#txtPrdEnglishName').val();
        let prdCd = $('#txtPrdCodeProvider').val();
        let prdNp = $('#txtPrdNameProvider').val();
        let prdCm = $('#txtPrdComments').val();
        let prdVs = $('#txtPrdVisibility').children('i').attr('data_val');
        let prdLv = $('#txtPrdLevel').children('i').attr('data_val');
        prdLv = prdLv == '1' ? 'A' : 'P';
        let prdLn = $('#txtPrdLonely').children('i').attr('data_val');
        let prdAs = $('#txtPrdInsured').children('i').attr('data_val');
        let prdCt = $(`#txtCatId`).val();
        let prdSb = $(`#txtSbcId`).val();
        let prdCn = $(`#txtCinId`).val();
        let prdSv = $(`#txtSrvId`).val();
        let prdDc = $(`#txtDocId`).val();
        let prdDi = $(`#txtDcpId`).val();

        var par = `
                [{
                    "prdId" : "${prdId}",
                    "prdNm" : "${prdNm}",
                    "prdSk" : "${prdSk}",
                    "prdMd" : "${prdMd}",
                    "prdPr" : "${prdPr}",
                    "prdEn" : "${prdEn}",
                    "prdCd" : "${prdCd}",
                    "prdNp" : "${prdNp}",
                    "prdCm" : "${prdCm}",
                    "prdVs" : "${prdVs}",
                    "prdLv" : "${prdLv}",
                    "prdLn" : "${prdLn}",
                    "prdAs" : "${prdAs}",
                    "prdCt" : "${prdCt}",
                    "prdSb" : "${prdSb}",
                    "prdCn" : "${prdCn}",
                    "prdSv" : "${prdSv}",
                    "prdDc" : "${prdDc}",
                    "prdDi" : "${prdDi}"
                }]
            `;
        /*  console.log(par); */
        var pagina = 'Products/saveNewProduct';
        var tipo = 'html';
        var selector = resNewProduct;
        fillField(pagina, par, tipo, selector);
    }
}
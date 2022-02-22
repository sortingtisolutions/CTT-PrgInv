let seccion = '';
let docs, prds;
let grp = 50;
let num = 0,
    lvl = '',
    flt = 0;
let cats, subs, sku1, sku2, sku3, sku4;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});

function inicial() {
    setTimeout(() => {
        getCustomers();
        getScores();
        getCustType();
        /* getSubcategories();
        getServices();
        
        getInvoice(); */
    }, 100);
}

// Solicita las categorias
function getCustomers() {
    var pagina = 'Customers/listCustomers';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCustomers;
    fillField(pagina, par, tipo, selector);
}

// Solicita las monedas
function getScores() {
    var pagina = 'Customers/listScores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putScores;
    fillField(pagina, par, tipo, selector);
}

// Solicita las monedas
function getCustType() {
    var pagina = 'Customers/listCustType';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCustType;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Obtiene el cliente seleccionado */
function getSelectCustomer(prdId) {
    console.log(prdId);
    var pagina = 'Customers/getSelectCustomer';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSelectCustomer;
    fillField(pagina, par, tipo, selector);
}
/** +++++  coloca las categorias */
function putCustomers(dt) {
    //console.log(dt);
    prds = dt;
    fillCustomers('0');

    /* if (dt[0].cat_id != '0') {
        let catId = dt[0].cat_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.cat_id}">${u.cat_name}</option>`;
            $('#txtCategoryList').append(H);
            $('#txtCatId').append(H);
        });

        getProducts(0);

        $('#txtCategoryList').on('change', function () {
            let id = $(this).val();
            let catId = $(`#txtCategoryList option[value="${id}"]`).val();
            deep_loading('O');
            $('.tblProdMaster').css({display: 'none'});
            $('#tblCustomers').DataTable().destroy();
            flt = 0;
            getProducts(catId);
        });

        $('#txtCatId').on('change', function () {
            $(`#txtSbcId option`).addClass('hide');
            let id = $(this).val();
            let catId = $(`#txtCatId option[value="${id}"]`).val();
            $(`#txtSbcId option[data_category="${catId}"]`).removeClass('hide');
            $(`#txtSbcId`).val(0);
            sku1 = refil(catId, 2);
            sku2 = '';
            sku3 = '';
            sku4 = '';

            fillFieldSkuBox();
        });
    } */
}

function fillCustomers(ft) {
    $('#tblCustomers tbody').html('');

    var cod = ft == '1' ? 'A' : '';

    if (prds[0].cus_id != '0') {
        var catId = prds[0].cat_id;
        $.each(prds, function (v, u) {
            if (u.prd_level != cod) {
               /*  pack = u.prd_level == 'K' ? 'fas' : 'far';
                let docInvo = `<span class="invoiceView" id="F${u.cus_id}"><i class="fas fa-file-alt" title="${u.doc_name}"></i></span>`;
                let invoice = u.cus_id == 0 ? '' : docInvo;
                let skufull = u.prd_sku.slice(7, 11) == '' ? u.prd_sku.slice(0, 7) : u.prd_sku.slice(0, 7) + '-' + u.prd_sku.slice(7, 11); */
/// agregar boton de elimniar
                var H = `
                <tr id="${u.cus_id}">
                    <td class="edit"><i class='fas fa-pen modif'></i><i class="fas fa-times-circle kill"></i></td>    
                    <td class="product-name" data-content="${u.cus_name}">${u.cus_name}</td>
                    <td class="product-name">${u.cus_contact}</td>
                    <td class="product-name">${u.cus_address}</td>
                    <td class="product-name">${u.cus_email}</td>
                    <td class="product-name">${u.cus_rfc}</td>
                    <td class="product-name">${u.cus_phone}</td>
                    <td class="product-name">${u.cus_phone_2}</td>
                    <td class="product-name">${u.cus_internal_code}</td>
                    <td class="sku">${u.cus_qualification}</td>
                    <td class="sku">${u.cus_legal_representative}</td>
                    <td class="product-name">${u.cut_name}</td>
                    <td class="sku">${u.cus_status}</td>
                </tr>`;
                $('#tblCustomers tbody').append(H);
            }
        });
        settingTable();
        activeIcons();
    } else {
        settingTable();
    }
}

/** +++++  configura la table de productos */
function settingTable() {
    let title = 'Listado de Clientes';
    // $('#tblCustomers').DataTable().destroy();
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    var tabla = $('#tblCustomers').DataTable({
        order: [[0, 'desc']],
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
                // Boton nuevo producto
                text: 'Nuevo Cliente',
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    createNewCustomer();
                },
            },
           /*  {
                // Boton filtar producto
                text: 'Filtrar productos',
                className: 'btn-apply btn_filter',
                action: function (e, dt, node, config) {
                    filterProduct();
                },
            }, */
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        columns: [
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'produsku', class: 'product-name'},
            {data: 'prodname', class: 'product-name'},
            {data: 'prodpric', class: 'product-name'},
            {data: 'prodqtty', class: 'product-name'},
            {data: 'prodtype', class: 'product-name'},
            {data: 'typeserv', class: 'product-name'},
            {data: 'prodcoin', class: 'product-name'},
            {data: 'prddocum', class: 'product-name'},
            {data: 'subcateg', class: 'sku'},
            {data: 'categori', class: 'sku'},
            {data: 'prodengl', class: 'product-name'},
            {data: 'prdcomme', class: 'sku'},
        ],
    });

    $('.tblProdMaster')
        .delay(500)
        .slideDown('fast', function () {
            deep_loading('C');
            $('#tblCustomers').DataTable().draw();
        });
}

/** +++++  coloca los tipos de calificacion */
function putScores(dt) {
    if (dt[0].scr_id != '0') {
        let cinId = dt[0].scr_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.scr_id}">${u.scr_id}-${u.scr_description}</option>`;
            $('#txtQualy').append(H);
        });
    }
}
/** +++++  coloca los tipo productor */
function putCustType(dt) {
    if (dt[0].cut_id != '0') {
        let docId = dt[0].cut_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.cut_id}">${u.cut_id}-${u.cut_name}</option>`;
            $('#txtTypeProd').append(H);
        });
    }
}


/** +++++  coloca las subcategorias */
/* function putSubcategories(dt) {
    subs = dt;
    if (dt[0].sbc_id != '0') {
        let sbcId = dt[0].sbc_id;
        $.each(dt, function (v, u) {
            var H = `<option class="hide" data_category="${u.cat_id}" value="${u.sbc_id}">${u.sbc_name}</option>`;
            $('#txtSbcId').append(H);
        });
    }
} */
/** +++++  coloca los tipos de servicio */
/* function putServices(dt) {
    if (dt[0].srv_id != '0') {
        let srvId = dt[0].srv_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.srv_id}">${u.srv_name}-${u.srv_description}</option>`;
            $('#txtSrvId').append(H);
        });
    }
} */


/** +++++  coloca los productos en la tabla */
/* function putProducts(dt) {
    prds = dt;
    fillProducts('0');
} */

/** +++++  coloca los productos en la tabla y filtra */

/** +++++  Activa los iconos */
function activeIcons() {
   /*  $('.toLink')
        .unbind('click')
        .on('click', function () {
            let prd = $(this).parents('tr').attr('id');
            let qty = $(this).parent().attr('data-content').split('|')[2];
            let pkt = $(this).parent().attr('data-content').split('|')[3];
            let pkn = $(this).parent().attr('data-content').split('|')[1];
            if (qty > 0) {
                getSeries(prd);
            }
        });

    $('.invoiceView')
        .unbind('click')
        .on('click', function () {
            var id = $(this).attr('id').slice(1, 10);
            var pagina = 'Documentos/VerDocumento';
            var par = `[{"id":"${id}"}]`;
            var tipo = 'json';
            var selector = putDocument;
            fillField(pagina, par, tipo, selector);
        });
 */
    $('.modif')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            //let cusNm = $(sltor.find('td')[2]).text();
            //find('td')[2]).text(prdNm);
            //(sltor.find('td')[1]).children('.data-content');
           
            let prdNm = 'Modifica datos del Cliente';
            //console.log('Dato:', cusNm);
            $('#CustomerModal').removeClass('overlay_hide');
            //$('.overlay_closer .title').html(prdNm, ':', cusNm );
            $('.overlay_closer .title').html(prdNm);
                getSelectCustomer(prdId);
            $('#CustomerModal .btn_close')
                .unbind('click')
                .on('click', function () {
                    $('.overlay_background').addClass('overlay_hide');
                });
        });

    $('.kill')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            console.log('To Kill ' + prdId);

            $('#delProdModal').modal('show');
            $('#txtIdProduct').val(prdId);
            //borra paquete +
            $('#btnDelProduct').on('click', function () {
                let cusId = $('#txtIdProduct').val();
                //console.log(Id);
                let tabla = $('#tblCustomers').DataTable();
                $('#delProdModal').modal('hide');

                let prdRow = $(`#${cusId}`);

                tabla.row(prdRow).remove().draw();

                var pagina = 'Customers/deleteCustomers';
                var par = `[{"cusId":"${cusId}"}]`;
                var tipo = 'html';
                var selector = putDelCustomers;
                fillField(pagina, par, tipo, selector);
            });
        });
}

function putDelCustomers(dt) {
    console.log('Id Cliente Borrado',dt);
}

/** +++++  muestra unicamente los productos y oculta los accesorios Ernesto Perez */
function filterProduct() {
    $('#tblCustomers').DataTable().destroy();
    if (flt == 0) {
        flt = 1;
        $('.btn_filter').addClass('red');
        fillProducts('1');
    } else {
        flt = 0;
        $('.btn_filter').removeClass('red');
        fillProducts('0');
    }
}

/* function putDocument(dt) {
    var a = document.createElement('a');
    a.href = 'data:application/octet-stream;base64,' + dt.doc_document;
    a.target = '_blank';
    // a.download = respuesta.doc_name;

    a.download = dt.doc_name + '.' + dt.doc_type.trim();
    a.click();
}
 */
function putSelectCustomer(dt) {
    cleanProductsFields();
    //console.log(dt);
    let cusId = dt[0].cus_id;
    let cusName = dt[0].cus_name;
    let cusCont = dt[0].cus_contact;
    let cusAdrr = dt[0].cus_address;
    let cusEmail = dt[0].cus_email;
    let cusRFC = dt[0].cus_rfc;
    let cusPhone = dt[0].cus_phone;
    let cusPhone2 = dt[0].cus_phone_2;
    let cusICod = dt[0].cus_internal_code;
    let cusQualy = dt[0].cus_qualification;
    let cusProsp = dt[0].cus_prospect;
    let cusSpon = dt[0].cus_sponsored;
    let cusLegalR = dt[0].cus_legal_representative;
    let cusLegalA = dt[0].cus_legal_act;
    let cusContr = dt[0].cus_contract;
    let TypeProd = dt[0].cut_id;
    let cusStat = dt[0].cus_status;
    let vsb = cusStat == '1' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';


    $('#txtPrdId').val(cusId);
    $('#txtCusName').val(cusName);
    $('#txtCusCont').val(cusCont);
    $('#txtCusAdrr').val(cusAdrr);
    $('#txtCusEmail').val(cusEmail);
    $('#txtCusRFC').val(cusRFC);
    $('#txtCusPhone').val(cusPhone);
    $('#txtCusPhone2').val(cusPhone2);
    $('#txtCusCodI').val(cusICod);
    $(`#txtQualy`).val(cusQualy);
    $('#txtcusProsp').val(cusProsp);
    $('#txtCusStat').html(vsb);
    $(`#txtCusSpon`).val(cusSpon);
    $(`#txtTypeProd`).val(TypeProd);
    $(`#txtcusLegalR`).val(cusLegalR);
    $(`#txtcusLegalA`).val(cusLegalA);
    $(`#txtcusContr`).val(cusContr);

    $('#tblEditCust .checkbox i')
        .unbind('click')
        .on('click', function () {
            let itm = $(this);
            let itmId = itm.parents('div').attr('id');

            let itmCl = itm.attr('class').indexOf('fa-square');
            if (itmCl >= 0) {
                itm.removeAttr('class').addClass('fas fa-check-square');
                itm.attr('data_val', '1');
            } else {
                itm.removeAttr('class').addClass('far fa-square');
                itm.attr('data_val', '0');
            }
        });

   /*  $('#txtSbcId')
        .unbind('change')
        .on('change', function () {
            let catId = $(`#txtCatId option[value="${id}"]`).val();
            let sbcId = $(`#txtSbcId option[value="${id}"]`).val();
            console.log(cat_id, sbcId);
        });
 */
    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            
            saveEditCustomer();
        });
}

function saveEditCustomer() {
    let ky = validatorProductsFields();
    if (ky == 0) {
        let cusId = $('#txtPrdId').val();
        let cusName = $('#txtCusName').val().replace(/\"/g, '°');
        let cusCont = $('#txtCusCont').val();
        let cusAdrr = $('#txtCusAdrr').val();
        let cusEmail = $('#txtCusEmail').val();
        let cusRFC = $('#txtCusRFC').val();
        let cusPhone = $('#txtCusPhone').val();
        let cusPhone2 = $('#txtCusPhone2').val();
        let cusICod = $('#txtCusCodI').val();
        let cusQualy = $(`#txtQualy option:selected`).val() == 0 ? '' : $(`#txtQualy option:selected`).text().split('-')[0];
        let cusProsp = $(`#txtcusProsp`).val();
        let cusStat = $('#txtCusStat').children('i').attr('data_val');
        let cusSpon = $(`#txtCusSpon`).val();
        let TypeProd = $(`#txtTypeProd`).val();
        let cusLegalR = $(`#txtcusLegalR`).val();
        let cusLegalA = $(`#txtcusLegalA`).val();
        let cusContr = $(`#txtcusContr`).val();

        var par = `
                [{
                    "cusId" : "${cusId}",
                    "cusName" : "${cusName}",
                    "cusCont" : "${cusCont}",
                    "cusAdrr" : "${cusAdrr}",
                    "cusEmail" : "${cusEmail}",
                    "cusRFC" : "${cusRFC}",
                    "cusPhone" : "${cusPhone}",
                    "cusPhone2" : "${cusPhone2}",
                    "cusICod" : "${cusICod}",
                    "cusQualy" : "${cusQualy}",
                    "cusProsp" : "${cusProsp}",
                    "cusStat" : "${cusStat}",
                    "cusSpon" : "${cusSpon}",
                    "TypeProd" : "${TypeProd}",
                    "cusLegalR" : "${cusLegalR}",
                    "cusLegalA" : "${cusLegalA}",
                    "cusContr" : "${cusContr}"
                }]
            `;
        //console.log('EDITA ',par);
        var pagina = 'Customers/saveEditCustomer';
        var tipo = 'html';
        var selector = resEdtProduct;
        fillField(pagina, par, tipo, selector);
    }
}

function resEdtProduct(dt) {
    console.log(dt);
    /* let prdId = dt.split('|')[0];
    let prdNm = $('#txtCusName').val().replace(/\"/g, '°');
    let prdSk = $('#txtCusCont').val();
    let prdPr = formato_numero($('#txtCusEmail').val(), 2, '.', ',');
    let prdEn = $('#txtPrdEnglishName').val();
    let prdCm = $('#txtPrdComments').val();
    // let prdLv = $('#txtPrdLevel').children('i').attr('data_val');
    let prdLv = $('#txtPrdLevel').text().substring(1, 2);
    let prdCt = $(`#txtCatId option:selected`).text();
    let prdSb = $(`#txtSbcId option:selected`).text();
    let prdCn = $(`#txtQualy option:selected`).val() == 0 ? '' : $(`#txtQualy option:selected`).text().split('-')[0];
    let prdSv = $(`#txtSrvId option:selected`).val() == 0 ? '' : $(`#txtSrvId option:selected`).text().split('-')[0];
    let prdDi = $(`#txtDocId option:selected`).val() == 0 ? '' : $(`#txtDocId option:selected`).val();

    let docInvo = `<span class="invoiceView" id="F${prdDi}"><i class="fas fa-file-alt"></i></span>`;
    let prdDc = prdDi == 0 ? '' : docInvo;
    prdLv = prdLv == 'A' ? 'A' : 'P';

    let el = $(`#tblCustomers tr[id="${prdId}"]`);
    $(el.find('td')[1]).text(prdSk);
    $(el.find('td')[2]).text(prdNm);
    $(el.find('td')[3]).text(prdPr);
    $(el.find('td')[5]).text(prdLv);
    $(el.find('td')[6]).text(prdSv);
    $(el.find('td')[7]).text(prdCn);
    $(el.find('td')[8]).html(prdDc);
    $(el.find('td')[9]).text(prdSb);
    $(el.find('td')[10]).text(prdCt);
    $(el.find('td')[11]).text(prdEn);
    $(el.find('td')[12]).text(prdCm);
 */
    $('#CustomerModal .btn_close').trigger('click');
    activeIcons();
}

function createNewCustomer() {
    let prdNm = 'Alta Nuevo Cliente';
    cleanProductsFields();

    $(`#txtCatId`).attr('disabled', false);
    $(`#txtSbcId`).attr('disabled', false);
    $('#CustomerModal').removeClass('overlay_hide');
    $('#txtCusStat').html('<i class="fas fa-check-square"></i>');
    $('.overlay_closer .title').html(prdNm);

     $('#tblEditCust .checkbox i')
        .unbind('click')
        .on('click', function () {
            let itm = $(this);
            let itmId = itm.parents('div').attr('id');

            let itmCl = itm.attr('class').indexOf('fa-square');
            if (itmCl >= 0) {
                itm.removeAttr('class').addClass('fas fa-check-square');
                itm.attr('data_val', '1');
            } else {
                itm.removeAttr('class').addClass('far fa-square');
                itm.attr('data_val', '0');
            }
        });
 /*           let accr = $(this).attr('data_val');
                        
            // AGREGA VALORES AL ACCESORIO 
            if (itmId == 'txtPrdLevel') {
                if(accr == 1){
                $(`#txtCatId`).val(20);
                $(`#txtSbcId`).val(152);
                $(`#txtCatId`).attr('disabled', true);
                $(`#txtSbcId`).attr('disabled', true);
                console.log('Valores del Accesorio, Cat=20, SubCat=152');
            } else {
                $(`#txtCatId`).val(0);
                $(`#txtSbcId`).val(0);
                $(`#txtCatId`).attr('disabled', false);
                $(`#txtSbcId`).attr('disabled', false);
            }
        }
        });

    $('#txtSbcId')
        .unbind('change')
        .on('change', function () {
            let catId = $(`#txtCatId`).val();
            let sbcId = $(this).val();
            console.log(catId, sbcId);
            sbcCode = subcategoriesGetCode(sbcId);

            sku2 = refil(sbcCode, 2);
            sku3 = '';
            sku4 = '';

            fillFieldSkuBox();
        } 
    ); */
 
        
    $('#CustomerModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            saveNewCustomer();
        });
}

function subcategoriesGetCode(sbcId) {
    let sbcCode = '';
    $.each(subs, function (v, u) {
        if (u.sbc_id == sbcId) {
            sbcCode = u.sbc_code;
        }
    });
    return sbcCode;
}

function fillFieldSkuBox() {
    sku3 = sku3 == '' ? '' : sku3;
    sku4 = sku4 == '' ? '' : '-' + sku4;
    $('#txtCusCont').val(sku1 + sku2 + sku3 + sku4);
}

function saveNewCustomer() {
    let ky = validatorProductsFields();
    if (ky == 0) {
        let cusId = '0';
        let cusName = $('#txtCusName').val().replace(/\"/g, '°');
        let cusCont = $('#txtCusCont').val();
        let cusAdrr = $('#txtCusAdrr').val();
        let cusEmail = $('#txtCusEmail').val();
        let cusRFC = $('#txtCusRFC').val();
        let cusPhone = $('#txtCusPhone').val();
        let cusPhone2 = $('#txtCusPhone2').val();
        let cusICod = $('#txtCusCodI').val();
        let cusQualy = $(`#txtQualy option:selected`).text().split('-')[0];
        let cusProsp = $('#txtcusProsp').val();
        let cusStat = $('#txtCusStat').children('i').attr('data_val');
        /* let prdLv = prdLl == '1' ? 'A' : 'P';
        let prdLn = $('#txtPrdLonely').children('i').attr('data_val'); 
        let cusProsp = $('#txtPrdInsured').children('i').attr('data_val');
        /* let cusSpon = $(`#txtPrdPrice`).val(); */
        let cusSpon = $(`#txtCusSpon`).val();
        let cusLegalR = $(`#txtcusLegalR`).val();
        let cusLegalA = $(`#txtcusLegalA`).val();
        let cusContr = $(`#txtcusContr`).val();
        /* let cusStat = $(`#txtDcpId`).val(); */

        var par = `
                [{
                    "cusId" : "${cusId}",
                    "cusName" : "${cusName}",
                    "cusCont" : "${cusCont}",
                    "cusAdrr" : "${cusAdrr}",
                    "cusEmail" : "${cusEmail}",
                    "cusRFC" : "${cusRFC}",
                    "cusPhone" : "${cusPhone}",
                    "cusPhone2" : "${cusPhone2}",
                    "cusICod" : "${cusICod}",
                    "cusQualy" : "${cusQualy}",
                    "cusProsp" : "${cusProsp}",
                    "cusSpon" : "${cusSpon}",
                    "cusLegalR" : "${cusLegalR}",
                    "cusLegalA" : "${cusLegalA}",
                    "cusContr" : "${cusContr}",
                    "cusStat" : "${cusStat}"
                }]
            `;
        console.log('NUEVO ', par); 
        var pagina = 'Customers/saveNewCustomer';
        var tipo = 'html';
        var selector = resNewProduct;
        fillField(pagina, par, tipo, selector);
    }
}
function resNewProduct(dt) {
    console.log(dt);
    //$('#txtCategoryList').val(dt).trigger('change');
    $('#CustomerModal .btn_close').trigger('click');
}

function cleanProductsFields() {
    $('.textbox').val('');
    $('td.data select').val(0);
    $('td.data .checkbox').html('<i class="far fa-square" data_val="0"></i>');
    $('.required').removeClass('fail').parent().children('.fail_note').addClass('hide');
}

function validatorProductsFields() {
    let ky = 0;

    $('.required').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            ky = 1;
            $(this).addClass('fail').parent().children('.fail_note').removeClass('hide');
        }
    });
    inactiveFocus();
    return ky;
}

function inactiveFocus() {
    $('.required')
        .unbind('focus')
        .on('focus', function () {
            $(this).removeClass('fail').parent().children('.fail_note').addClass('hide');
        });
}

function putInvoice(dt) {
    if (dt[0].doc_id != '0') {
        $.each(dt, function (v, u) {
            var H = `<option value="${u.doc_id}">${u.doc_name}</option>`;
            $('#txtDocIdSerie').append(H);
        });
    }
}

function putInvoiceList(dt) {
    //console.log(dt);
    var fc = $('#txtDocIdSerie').offset();
    $('#listInvoice .list-items').html('');
    $('#listInvoice').slideUp('100', function () {
        $('#listInvoice .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.doc_id}" data_serie="${u.doc_id}" data_complement="${u.doc_id}|${u.doc_name}">${u.doc_name}</div>`;
        $('#listInvoice .list-items').append(H);
    });

    $('#txtDocIdSerie').on('focus', function () {
        $('#listInvoice').slideDown('slow');
    });

    $('#listInvoice').on('mouseleave', function () {
        $('#listInvoice').slideUp('slow');
    });

    $('#txtDocIdSerie').keyup(function (e) {
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
        let prdId = $(this).attr('id') + '|' + $(this).attr('data_complement');
        $('#txtDocIdSerie').val(prdNm);
        $('#txtIdInvoices').val(prdId);
        $('#listInvoice').slideUp(100);
        //validator();
    });
}
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}

function sel_invoice(res) {
    //console.log('SELECC',res);
    if (res.length < 1) {
        $('#listInvoice .list-items div.list-item').css({display: 'block'});
    } else {
        $('#listInvoice .list-items div.list-item').css({display: 'none'});
    }

    $('#listInvoice .list-items div.list-item').each(function (index) {
        var cm = $(this).attr('data_complement').toUpperCase().replace(/|/g, '');

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}
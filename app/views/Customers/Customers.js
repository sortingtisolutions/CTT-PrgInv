let seccion = '';
let docs, prds;
let grp = 50;
let num = 0,
    lvl = '',
    flt = 0;
let cats, subs, sku1, sku2, sku3, sku4;
let cusIdNew,newpar;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});

//INICIO DE PROCESOS
function inicial() {
    setTimeout(() => {
        getCustomers();
        getScores();
        getCustType();
        getOptionYesNo();
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
    // console.log(prdId);
    var pagina = 'Customers/getSelectCustomer';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSelectCustomer;
    fillField(pagina, par, tipo, selector);
}

function getSelectCustomerNew(prdId) {
    // console.log(prdId);
    var pagina = 'Customers/getSelectCustomer';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putCustomersNew;
    fillField(pagina, par, tipo, selector);
}
/** +++++  coloca las categorias */
function putCustomers(dt) {
    //console.log(dt);
    prds = dt;
    fillCustomers('0');
}

/** +++++  configura la table de productos */
function settingTable() {
    let title = 'Listado de Clientes';
    // $('#tblCustomers').DataTable().destroy();
    let filename =
        title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    var tabla = $('#tblCustomers').DataTable({
        order: [[1, 'asc']],
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
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        columns: [
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'namecli', class: 'supply'},
            {data: 'emailcli', class: 'supply'},
            {data: 'phonecli', class: 'supply'},
            {data: 'adrescli', class: 'supply'},
            {data: 'rfccli',    class: 'supply'},
            {data: 'califcli', class: 'supply cn'}, 
            {data: 'tipocli', class: 'supply  cn'},
            {data: 'codintcli', class: 'supply'},
            {data: 'codsatcli', class: 'supply'},
            {data: 'statuscli', class: 'supply'},
            {data: 'namedirec', class: 'supply'},
            {data: 'namelegal', class: 'supply'},
            {data: 'emaillegal', class: 'supply'},
            {data: 'phonelegal', class: 'supply'},
            {data: 'namecontac', class: 'supply'},
            {data: 'phonecontac', class: 'supply'},
            {data: 'emailcontac', class: 'supply'},
            {data: 'operatcli', class: 'supply'},
            {data: 'lastfact', class: 'supply'},
        ],
    });

    $('.tblProdMaster')
        .delay(500)
        .slideDown('fast', function () {
            deep_loading('C');
            $('#tblCustomers').DataTable().draw();
        });
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
                    <td class="supply" data-content="${u.cus_name}">${u.cus_name}</td>
                    <td class="supply">${u.cus_email}</td>
                    <td class="supply">${u.cus_phone}</td>
                    <td class="supply">${u.cus_address}</td>
                    <td class="supply" style="text-align:center">${u.cus_rfc}</td>
                    <td class="supply" style="text-align:center">${u.cus_qualification}</td>
                    <td class="supply">${u.cut_name}</td>
                    <td class="supply" style="text-align:center">${u.cus_cve_cliente}</td>
                    <td class="supply" style="text-align:center">${u.cus_code_sat}</td>
                    <td class="supply" style="text-align:center">${u.cus_status}</td>
                    <td class="supply">${u.cus_legal_director}</td>
                    <td class="supply">${u.cus_legal_representative}</td>
                    <td class="supply">${u.cus_legal_email}</td>
                    <td class="supply">${u.cus_lega_phone}</td>
                    <td class="supply">${u.cus_contact_name}</td>
                    <td class="supply">${u.cus_contact_phone}</td>
                    <td class="supply">${u.cus_contact_email}</td>
                    <td class="supply" style="text-align:center">${u.cus_work_ctt}</td>
                    <td class="product-name">${u.cus_last_invoice}</td>
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

/** +++++  coloca los tipos de calificacion */
function putScores(dt) {
    if (dt[0].scr_id != '0') {
        let cinId = dt[0].scr_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.scr_values}">${u.scr_values} - ${u.scr_description}</option>`;
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
 */
    $('.modif')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            //let cusNm = $(sltor.find('td')[2]).text();
            //find('td')[2]).text(prdNm);
            //(sltor.find('td')[1]).children('.data-content');
            if (prdId != undefined){
                let prdNm = 'Modifica datos del Cliente';
                console.log('Dato:', prdId);
                $('#CustomerModal').removeClass('overlay_hide');
                //$('.overlay_closer .title').html(prdNm, ':', cusNm );
                $('.overlay_closer .title').html(prdNm);
                getSelectCustomer(prdId);
                $('#CustomerModal .btn_close')
                    .unbind('click')
                    .on('click', function () {
                        $('.overlay_background').addClass('overlay_hide');
                    });
            }
        });

    $('.kill')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            console.log('To Kill ' + prdId);
            if (prdId != undefined){
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
            }
        });
}

function putDelCustomers(dt) {
    console.log('Id Cliente Borrado', dt);
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

function putSelectCustomer(dt) {
    cleanProductsFields();
    //console.log(dt);
    let cusId = dt[0].cus_id;
    let cusName = dt[0].cus_name;
    let cusEmail = dt[0].cus_email;
    let cusPhone = dt[0].cus_phone;
    let cusAdrr = dt[0].cus_address;
    let cusRFC = dt[0].cus_rfc;
    let cusQualy = dt[0].cus_qualification;
    let cusStat = dt[0].cus_status;
    let cusICod = dt[0].cus_cve_cliente;
    let cusSatC = dt[0].cus_code_sat;
    let TypeProd = dt[0].cut_id;
    let cusDirector = dt[0].cus_legal_director;
    let cusLegRepre = dt[0].cus_legal_representative;
    let cusLegEmail = dt[0].cus_legal_email;
    let cusLegPhone = dt[0].cus_lega_phone;
    let cusCont = dt[0].cus_contact_name;
    let cusContEmail = dt[0].cus_contact_email;
    let cusContPhone = dt[0].cus_contact_phone;
    
    let cusWorkC = dt[0].cus_work_ctt;
    let cusInvoi = dt[0].cus_last_invoice;
    
    let vsb =
        cusStat == '1'
            ? ' <i class="fas fa-check-square" data_val="1"></i>'
            : '<i class="far fa-square" data_val="0"></i>';

    $('#txtPrdId').val(cusId);
    $('#txtCusName').val(cusName);
    $('#txtCusEmail').val(cusEmail);
    $('#txtCusPhone').val(cusPhone);
    $('#txtCusAdrr').val(cusAdrr);
    $('#txtCusRFC').val(cusRFC);
    $(`#txtTypeProd`).val(TypeProd);
    $(`#txtQualy`).val(cusQualy);
    $('#txtCusStat').html(vsb);
    $('#txtCusCodI').val(cusICod);
    $('#txtCusSat').val(cusSatC);

    $(`#txtDirector`).val(cusDirector);
    $(`#txtcusLegalR`).val(cusLegRepre);
    $('#txtLegPhone').val(cusLegPhone);
    $('#txLegEmail').val(cusLegEmail);
    
    $('#txtCusCont').val(cusCont);
    $('#txtContEmail').val(cusContEmail);
    $('#txtContPhone').val(cusContPhone);

    $('#txtWorkC').val(cusWorkC);
    $(`#txtInvoi`).val(cusInvoi);
    

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
        let cusEmail = $('#txtCusEmail').val();
        let cusPhone = $('#txtCusPhone').val();
        let cusAdrr = $('#txtCusAdrr').val();
        let cusRFC = $('#txtCusRFC').val();
        let TypeProd = $(`#txtTypeProd`).val();
        let cusQualy =
            $(`#txtQualy option:selected`).val() == 0
                ? ''
                : $(`#txtQualy option:selected`).text().split('-')[0];
        
        let cusStat = $('#txtCusStat').children('i').attr('data_val');
        let cusICod = $('#txtCusCodI').val();
        let cusSatC = $('#txtCusSat').val();

        let cusDirector = $('#txtDirector').val();
        let cusLegRepre = $(`#txtcusLegalR`).val();
        let cusLegPhone = $(`#txtLegPhone`).val();
        let cusLegEmail = $(`#txLegEmail`).val();
        
        let cusCont = $(`#txtCusCont`).val();
        let cusContEmail = $('#txtContEmail').val();
        let cusContPhone = $(`#txtContPhone`).val();
        let cusWorkC = $(`#txtWorkC`).val();
        let cusInvoi = $(`#txtInvoi`).val();

        var par = `
                [{
                    "cusId" :       "${cusId}",
                    "cusName" :     "${cusName}",
                    "cusEmail" :    "${cusEmail}",
                    "cusPhone" :    "${cusPhone}",
                    "cusAdrr" :     "${cusAdrr}",
                    "cusRFC" :      "${cusRFC}",
                    "TypeProd" :    "${TypeProd}",
                    "cusQualy" :    "${cusQualy}",
                    "cusStat" :     "${cusStat}",
                    "cusICod" :     "${cusICod}",
                    "cusSatC" :     "${cusSatC}",
                    "cusDirector" : "${cusDirector}",
                    "cusLegRepre" : "${cusLegRepre}",
                    "cusLegPhone" : "${cusLegPhone}",
                    "cusLegEmail" : "${cusLegEmail}",
                    "cusCont" :     "${cusCont}",
                    "cusContEmail" : "${cusContEmail}",
                    "cusContPhone" : "${cusContPhone}",
                    "cusWorkC" :    "${cusWorkC}",
                    "cusInvoi" :    "${cusInvoi}"
                }]
            `;
                // ACTUALIZA EL REGISTRO DE LA TABLA QUE SE MODIFICO
            let el = $(`#tblCustomers tr[id="${cusId}"]`);
                $(el.find('td')[1]).text(cusName);
                $(el.find('td')[2]).text(cusEmail);
                $(el.find('td')[3]).text(cusPhone);
                $(el.find('td')[5]).text(cusAdrr);
                $(el.find('td')[6]).text(cusRFC);
                $(el.find('td')[7]).text(TypeProd);
                $(el.find('td')[8]).text(cusQualy);
                $(el.find('td')[9]).text(cusStat);
                $(el.find('td')[10]).text(cusICod);
                $(el.find('td')[11]).text(cusSatC);
                $(el.find('td')[12]).text(cusDirector);
                $(el.find('td')[13]).text(cusLegRepre);
                $(el.find('td')[14]).text(cusLegPhone);
                $(el.find('td')[15]).text(cusLegEmail);
                $(el.find('td')[16]).text(cusContEmail);
                $(el.find('td')[17]).text(cusContPhone);
                $(el.find('td')[18]).text(cusWorkC);
                $(el.find('td')[19]).text(cusInvoi);

        // console.log('EDITA ',par);
        var pagina = 'Customers/saveEditCustomer';
        var tipo = 'html';
        var selector = resEdtProduct;
        fillField(pagina, par, tipo, selector);
    }
}

function resEdtProduct(dt) {
    console.log('resEdtProduct',dt);
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

function fillFieldSkuBox() {
    sku3 = sku3 == '' ? '' : sku3;
    sku4 = sku4 == '' ? '' : '-' + sku4;
    $('#txtCusCont').val(sku1 + sku2 + sku3 + sku4);
}

function saveNewCustomer() {
    let ky = validatorProductsFields();
    if (ky == 0) {
        let cusId = '';
        let cusName = $('#txtCusName').val().replace(/\"/g, '°');
        let cusEmail = $('#txtCusEmail').val();
        let cusPhone = $('#txtCusPhone').val();
        let cusAdrr = $('#txtCusAdrr').val();
        let cusRFC = $('#txtCusRFC').val();
        let typeProd =
            $(`#txtTypeProd option:selected`).val() == 0
                ? ''
                : $(`#txtTypeProd option:selected`).text().split('-')[0];
        let cusQualy =
            $(`#txtQualy option:selected`).val() == 0
                ? ''
                : $(`#txtQualy option:selected`).text().split('-')[0];
        //let cusQualy = $(`#txtQualy option:selected`).text().split('-')[0];
        let cusStat = $('#txtCusStat').children('i').attr('data_val');
        let cusICod = $('#txtCusCodI').val();
        let cusSatC = $('#txtCusSat').val();

        let cusDirector = $('#txtDirector').val();
        let cusLegRepre = $(`#txtcusLegalR`).val();
        let cusLegPhone = $(`#txtLegPhone`).val();
        let cusLegEmail = $(`#txLegEmail`).val();

        let cusCont = $(`#txtCusCont`).val();
        let cusContEmail = $('#txtContEmail').val();
        let cusContPhone = $(`#txtContPhone`).val();
        let cusWorkC = $(`#txtWorkC`).val();
        let cusInvoi = $(`#txtInvoi`).val();

        
        if (cusStat == undefined) {
            cusStat = 1;
        }
        var par = `
            [{
                "cusId" :   "${cusId}",
                "cusName" : "${cusName}",
                "cusEmail" : "${cusEmail}",
                "cusPhone" : "${cusPhone}",
                "cusAdrr" : "${cusAdrr}",
                "cusRFC" : "${cusRFC}",
                "typeProd" : "${typeProd}",
                "cusQualy" : "${cusQualy}",
                "cusStat" : "${cusStat}",
                "cusICod" : "${cusICod}",
                "cusSatC" : "${cusSatC}",
                "cusDirector" : "${cusDirector}",
                "cusLegRepre" : "${cusLegRepre}",
                "cusLegPhone" : "${cusLegPhone}",
                "cusLegEmail" : "${cusLegEmail}",
                "cusCont" : "${cusCont}",
                "cusContEmail" : "${cusContEmail}",
                "cusContPhone" : "${cusContPhone}",
                "cusWorkC" : "${cusWorkC}",
                "cusInvoi" : "${cusInvoi}"
            }] `;
        // console.log('NUEVO ', par);

        newpar=par;
        var pagina = 'Customers/saveNewCustomer';
        var tipo = 'html';
        var selector = resNewProduct;
        fillField(pagina, par, tipo, selector);
    }
}
function resNewProduct(dt) {
    // console.log('Regreso-',dt, 'PAR-', newpar);
    //$('#txtCategoryList').val(dt).trigger('change');
    $('#CustomerModal .btn_close').trigger('click');
    cusIdNew=dt;
    getSelectCustomerNew(cusIdNew);
}

function putCustomersNew(dt) {
    console.log('putCustomersNew',dt);

    // $('#tblCustomers tbody').html('');
    let tabla = $('#tblCustomers').DataTable();

    if (cusIdNew != '0') {
        // console.log('PASO IF',cusIdNew);
        // var catId = prds[0].cat_id;
        $.each(dt, function (v, u) {
            tabla.row
            .add({
                // sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i><i class="fas fa-times-circle serie kill" id="K${u.ser_id}"></i>`,
                editable: `<i class="fas fa-pen modif" id=${cusIdNew}></i><i class="fas fa-times-circle kill" id=${cusIdNew}></i>`,
                namecli: u.cus_name,
                emailcli: u.cus_email,
                phonecli: u.cus_phone,
                adrescli: u.cus_address,
                rfccli: u.cus_rfc,
                califcli: u.cus_qualification,
                tipocli: u.cut_name,
                codintcli: u.cus_cve_cliente,
                codsatcli: u.cus_code_sat,
                statuscli: u.cus_status,
                namedirec: u.cus_legal_director,
                namelegal: u.cus_legal_representative,
                emaillegal: u.cus_legal_email,
                phonelegal: u.cus_lega_phone,
                namecontac: u.cus_contact_name,
                phonecontac: u.cus_contact_phone,
                emailcontac: u.cus_contact_email,
                operatcli: u.cus_work_ctt,
                lastfact: u.cus_last_invoice,
            })
            .draw();
        $(`#E${u.cus_id}`).parents('tr').attr('id', u.cus_id);
        });
        // settingTable();
        // console.log('AGREGO row');
        activeIcons();
    } else {
        settingTable();
    }
}

function cleanProductsFields() {
    $('.textbox').val('');
    $('td.data select').val(0);
    $('td.data .checkbox').html('<i class="far fa-square" data_val="0"></i>');
    $('.required')
        .removeClass('fail')
        .parent()
        .children('.fail_note')
        .addClass('hide');
}

function validatorProductsFields() {
    let ky = 0;

    $('.required').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            ky = 1;
            $(this)
                .addClass('fail')
                .parent()
                .children('.fail_note')
                .removeClass('hide');
        }
    });
    inactiveFocus();
    return ky;
}

function inactiveFocus() {
    $('.required')
        .unbind('focus')
        .on('focus', function () {
            $(this)
                .removeClass('fail')
                .parent()
                .children('.fail_note')
                .addClass('hide');
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
    /* //console.log(dt);
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
    }); */
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
        $('#listInvoice .list-items div.list-item').css({ display: 'block' });
    } else {
        $('#listInvoice .list-items div.list-item').css({ display: 'none' });
    }

    $('#listInvoice .list-items div.list-item').each(function (index) {
        var cm = $(this)
            .attr('data_complement')
            .toUpperCase()
            .replace(/|/g, '');

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({ display: 'block' });
        }
    });
}

function getOptionYesNo() {
    $('#txtWorkC').html("");
    renglon = "<option id='0'  value='0'>Selecciona...</option> ";
    $('#txtWorkC').append(renglon);
    renglon = "<option id='1' value='1'>Si</option> ";
    $('#txtWorkC').append(renglon);
    renglon = "<option id='2' value='2'>No</option> ";
    $('#txtWorkC').append(renglon);
 
    /* $('#selectAnticipo').html("");
    renglon = "<option id='2'  value=''></option> ";
    $('#selectAnticipo').append(renglon);
    renglon = "<option id='1'  value='Si'>Si</option> ";
    $('#selectAnticipo').append(renglon);
    renglon = "<option id='0'  value='No'>No</option> ";
    $('#selectAnticipo').append(renglon);
 
    $('#selectCredito').html("");
    renglon = "<option id='2'  value=''></option> ";
    $('#selectCredito').append(renglon);
    renglon = "<option id='1'  value='Si'>Si</option> ";
    $('#selectCredito').append(renglon);
    renglon = "<option id='0'  value='No'>No</option> ";
    $('#selectCredito').append(renglon);
 
    $('#selectFormaPago').html("");
    renglon = "<option id='2'  value=''></option> ";
    $('#selectFormaPago').append(renglon);
    renglon = "<option id='1'  value='Si'>Si</option> ";
    $('#selectFormaPago').append(renglon);
    renglon = "<option id='0'  value='No'>No</option> ";
    $('#selectFormaPago').append(renglon); */
 }

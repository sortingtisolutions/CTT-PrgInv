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
        getFreelances();
        getScores();
        getCustType();
        getOptionYesNo();
        
    }, 100);
}

// Solicita las categorias
function getFreelances() {
    var pagina = 'Freelances/listFreelances';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putFreelances;
    fillField(pagina, par, tipo, selector);
}

// Solicita las monedas
function getScores() {
    var pagina = 'Freelances/listScores';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putScores;
    fillField(pagina, par, tipo, selector);
}

// Solicita las monedas
function getCustType() {
    var pagina = 'Freelances/listAreas';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCustType;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Obtiene el cliente seleccionado */
function getSelectFreelance(prdId) {
    console.log('getSelectFreelance',prdId);
    var pagina = 'Freelances/getSelectFreelance';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSelectFreelance;
    fillField(pagina, par, tipo, selector);
}

function getSelectFreelanceNew(prdId) {
    //console.log(prdId);
    
    var pagina = 'Freelances/getSelectFreelance';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putFreelancesNew;
    fillField(pagina, par, tipo, selector);
}
/** +++++  coloca las categorias */
function putFreelances(dt) {
    //console.log(dt);
    prds = dt;
    fillFreelances('0');
}

/** +++++  configura la table de productos */
function settingTable() {
    let title = 'Listado de Freelances';
    // $('#tblFreelances').DataTable().destroy();
    let filename =
        title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    var tabla = $('#tblFreelances').DataTable({
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
                text: 'Nuevo Freelance',
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    createNewFreelance();
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
            {data: 'clavefree', class: 'supply'},
            {data: 'namefree', class: 'supply'},
            {data: 'emailfree', class: 'supply'},
            {data: 'phonefree', class: 'supply'},
            {data: 'adresfree', class: 'supply'},
            {data: 'rfcfree',    class: 'supply'},
            {data: 'unitfree', class: 'supply  cn'},
            {data: 'platfree', class: 'supply'},
            {data: 'licfree', class: 'supply'},
            {data: 'fedpfree', class: 'supply'},
            {data: 'clasefree', class: 'supply'},
            {data: 'anfree', class: 'supply'}, 
        ],
    });

    $('.tblProdMaster')
        .delay(500)
        .slideDown('fast', function () {
            deep_loading('C');
            $('#tblFreelances').DataTable().draw();
        });
}


function fillFreelances(ft) {
    $('#tblFreelances tbody').html('');

    var cod = ft == '1' ? 'A' : '';
    console.log(prds);
    if (prds[0].free_id != '0') {
        var catId = prds[0].cat_id;
        $.each(prds, function (v, u) {
            //if (u.prd_level != cod) {
               /*  pack = u.prd_level == 'K' ? 'fas' : 'far';
                let docInvo = `<span class="invoiceView" id="F${u.cus_id}"><i class="fas fa-file-alt" title="${u.doc_name}"></i></span>`;
                let invoice = u.cus_id == 0 ? '' : docInvo;
                let skufull = u.prd_sku.slice(7, 11) == '' ? u.prd_sku.slice(0, 7) : u.prd_sku.slice(0, 7) + '-' + u.prd_sku.slice(7, 11); */
/// agregar boton de elimniar
                var H = `
                <tr id="${u.free_id}">
                    <td class="edit"><i class='fas fa-pen modif'></i><i class="fas fa-times-circle kill"></i></td> 
                    <td class="supply" data-content="${u.free_cve}">${u.free_cve}</td>   
                    <td class="supply" data-content="${u.free_name}">${u.free_name}</td>
                    <td class="supply">${u.free_email}</td>
                    <td class="supply">${u.free_phone}</td>
                    <td class="supply">${u.free_adress}</td>
                    <td class="supply" style="text-align:center">${u.free_rfc}</td>
                    <td class="supply" style="text-align:center">${u.free_unit}</td>
                    <td class="supply" style="text-align:center">${u.free_plates}</td>
                    <td class="supply" style="text-align:center">${u.free_license}</td>
                    <td class="supply" style="text-align:center">${u.free_fed_perm}</td>
                    <td class="supply">${u.free_clase}</td>
                    <td class="supply">${u.free_año}</td>
                </tr>`;
                $('#tblFreelances tbody').append(H);
           // }
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
    if (dt[0].are_id != '0') {
        let docId = dt[0].are_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.are_id}">${u.are_id}-${u.are_name}</option>`;
            $('#txtArea').append(H);
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
                $('#FreelanceModal').removeClass('overlay_hide');
                //$('.overlay_closer .title').html(prdNm, ':', cusNm );
                $('.overlay_closer .title').html(prdNm);
                getSelectFreelance(prdId);
                $('#FreelanceModal .btn_close')
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
                    let tabla = $('#tblFreelances').DataTable();
                    $('#delProdModal').modal('hide');

                    let prdRow = $(`#${cusId}`);
                    tabla.row(prdRow).remove().draw();
                    var pagina = 'Freelances/deleteFreelances';
                    var par = `[{"cusId":"${cusId}"}]`;
                    var tipo = 'html';
                    var selector = putDelFreelances;
                    fillField(pagina, par, tipo, selector);
                });
            }
        });
}

function putDelFreelances(dt) {
    console.log('Id Cliente Borrado', dt);
}

/** +++++  muestra unicamente los productos y oculta los accesorios Ernesto Perez */
function filterProduct() {
    $('#tblFreelances').DataTable().destroy();
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

function putSelectFreelance(dt) {
    //cleanProductsFields();
    console.log('putSelectFreelance',dt);
    let freeId = dt[0].free_id;
    let freeName = dt[0].free_name;
    let freeClave = dt[0].free_cve;
    let freeAreaId = dt[0].free_area_id;
    let freeRFC = dt[0].free_rfc;
    let freeAdrr = dt[0].free_address;
    let freeEmail = dt[0].free_email;
    let freePhone = dt[0].free_phone;
    let freeUnitMovil = dt[0].free_unit;
    let freePlaUnidad = dt[0].free_plates;
    let freeNumLicencia = dt[0].free_license;
    let freePerFederal  = dt[0].free_fed_perm ;
    let freeClaUnidad  = dt[0].free_clase ;
    let freeAnUnidad = dt[0].ffree_año;
    
    $('#txtFreeId').val(freeId);
    $('#txtFreName').val(freeName);
    $('#txtFreClave').val(freeClave);
    $('#txtArea').val(freeAreaId);
    $('#txtFreRFC').val(freeRFC);
    $('#txtFreAdrr').val(freeAdrr);
            
    $('#txtFreEmail').val(freeEmail);
    $('#txtFrePhone').val(freePhone);
    $('#txtUniMovil').val(freeUnitMovil);
    
    $('#txtPlaUnidad').val(freePlaUnidad);
    $(`#txtNumLicencia`).val(freeNumLicencia);
    
    $(`#txtPerFederal`).val(freePerFederal );
    $(`#txtClaUnidad`).val(freeClaUnidad );
    $(`#txtAnUnidad`).val(freeAnUnidad);
    

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
            saveEditFreelance();
        });
}

function saveEditFreelance() {
    let ky = validatorProductsFields();
    if (ky == 0) {
        let freeId = $('#txtFreeId').val();
        let freeName = $('#txtFreName').val().replace(/\"/g, '°');
        let freeClave= $('#txtFreClave').val();
        let freeAreaId= $('#txtArea').val();
        let freeRFC = $('#txtFreRFC').val();
        let freeAdrr = $('#txtFreAdrr').val();
        
        let freeEmail = $('#txtFreEmail').val();
        let freePhone = $('#txtFrePhone').val();
        let freeUnitMovil = $('#txtUniMovil').val();

        let freePlaUnidad = $('#txtPlaUnidad').val();
        let freeNumLicencia = $(`#txtNumLicencia`).val();

        let freePerFederal = $(`#txtPerFederal`).val();
        let freeClaUnidad = $(`#txtClaUnidad`).val();
        let freeAnUnidad = $(`#txtAnUnidad`).val();

        var par = `
                [{
                    "freeId" :   "${freeId}",
                    "freeName" : "${freeName}",
                    "freeClave" : "${freeClave}",
                    "freeAreaId" : "${freeAreaId}",
                    "freeRFC" : "${freeRFC}",
                    "freeAdrr" : "${freeAdrr}",
                    "freeEmail" : "${freeEmail}",
                    "freePhone" : "${freePhone}",
                    "freeUnitMovil" : "${freeUnitMovil}",
                    "freePlaUnidad" : "${freePlaUnidad}",
                    "freeNumLicencia" : "${freeNumLicencia}",
                    "freePerFederal" : "${freePerFederal}",
                    "freeClaUnidad" : "${freeClaUnidad}",
                    "freeAnUnidad" : "${freeAnUnidad}"
                }]
            `;
                // ACTUALIZA EL REGISTRO DE LA TABLA QUE SE MODIFICO
            let el = $(`#tblFreelances tr[id="${freeId}"]`);
                //$(el.find('td')[1]).text(freeId);
                
                $(el.find('td')[1]).text(freeClave);
                $(el.find('td')[2]).text(freeName);
                $(el.find('td')[3]).text(freeEmail);
                $(el.find('td')[4]).text(freePhone);
                $(el.find('td')[5]).text(freeAdrr);
                $(el.find('td')[6]).text(freeRFC);
                $(el.find('td')[7]).text(freeUnitMovil);
                $(el.find('td')[8]).text(freePlaUnidad);
                $(el.find('td')[9]).text(freeNumLicencia);
                $(el.find('td')[10]).text(freePerFederal);
                $(el.find('td')[11]).text(freeClaUnidad);
                $(el.find('td')[12]).text(freeAnUnidad);

        console.log('EDITA ',par);
        
        var pagina = 'Freelances/saveEditFreelance';
        var tipo = 'html';
        var selector = resEdtProduct;
        fillField(pagina, par, tipo, selector);
    }
}

function resEdtProduct(dt) {
    console.log('resEdtProduct',dt);
    
    $('#FreelanceModal .btn_close').trigger('click');
    activeIcons();
}

function createNewFreelance() {
    let prdNm = 'Alta Nuevo Freelance';
    cleanProductsFields();

    //$(`#txtCatId`).attr('disabled', false);
    //$(`#txtSbcId`).attr('disabled', false);
    $('#FreelanceModal').removeClass('overlay_hide');
    //$('#txtCusStat').html('<i class="fas fa-check-square"></i>');
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

    $('#FreelanceModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            saveNewFreelance();
        });
}

function fillFieldSkuBox() {
    sku3 = sku3 == '' ? '' : sku3;
    sku4 = sku4 == '' ? '' : '-' + sku4;
    $('#txtCusCont').val(sku1 + sku2 + sku3 + sku4);
}

function saveNewFreelance() {
    let ky = validatorProductsFields();
    if (ky == 0) {
        let freeId = '';
        let freeName = $('#txtFreName').val();
        let freeClave= $('#txtFreClave').val();
        let freeAreaId= $('#txtArea').val();
        let freeRFC = $('#txtFreRFC').val();
        let freeAdrr = $('#txtFreAdrr').val();
        
        let freeEmail = $('#txtFreEmail').val();
        let freePhone = $('#txtFrePhone').val();
        let freeUnitMovil = $('#txtUniMovil').val();

        let freePlaUnidad = $('#txtPlaUnidad').val();
        let freeNumLicencia = $(`#txtNumLicencia`).val();

        let freePerFederal = $(`#txtPerFederal`).val();
        let freeClaUnidad = $(`#txtClaUnidad`).val();
        let freeAnUnidad = $(`#txtAnUnidad`).val();
/*
        let typeProd =
            $(`#txtArea option:selected`).val() == 0
                ? ''
                : $(`#txtArea option:selected`).text().split('-')[0];
        let cusQualy =
            $(`#txtQualy option:selected`).val() == 0
                ? ''
                : $(`#txtQualy option:selected`).text().split('-')[0];*/
        //let cusQualy = $(`#txtQualy option:selected`).text().split('-')[0];
        
        /*if (cusStat == undefined) {
            cusStat = 1;
        }*/
        var par = `
            [{
                "freeId" :   "${freeId}",
                "freeName" : "${freeName}",
                "freeClave" : "${freeClave}",
                "freeAreaId" : "${freeAreaId}",
                "freeRFC" : "${freeRFC}",
                "freeAdrr" : "${freeAdrr}",
                "freeEmail" : "${freeEmail}",
                "freePhone" : "${freePhone}",
                "freeUnitMovil" : "${freeUnitMovil}",
                "freePlaUnidad" : "${freePlaUnidad}",
                "freeNumLicencia" : "${freeNumLicencia}",
                "freePerFederal" : "${freePerFederal}",
                "freeClaUnidad" : "${freeClaUnidad}",
                "freeAnUnidad" : "${freeAnUnidad}"
            }] `;
        // console.log('NUEVO ', par);

        newpar=par;
        var pagina = 'Freelances/saveNewFreelance';
        var tipo = 'html';
        var selector = resNewProduct;
        fillField(pagina, par, tipo, selector);
    }
}
function resNewProduct(dt) {
    // console.log('Regreso-',dt, 'PAR-', newpar);
    //$('#txtCategoryList').val(dt).trigger('change');
    
    console.log(dt);
    $('#FreelanceModal .btn_close').trigger('click');
    cusIdNew=dt;
    getSelectFreelanceNew(cusIdNew);
}

function putFreelancesNew(dt) {
    console.log('putFreelancesNew',cusIdNew);
    
    // $('#tblFreelances tbody').html('');
    let tabla = $('#tblFreelances').DataTable();

    if (cusIdNew != '0') {
        // console.log('PASO IF',cusIdNew);
        // var catId = prds[0].cat_id;
        $.each(dt, function (v, u) {
            var row= tabla.row
            .add({
                //sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i><i class="fas fa-times-circle serie kill" id="K${u.ser_id}"></i>`,

                editable: `<i class="fas fa-pen modif" id=${cusIdNew}></i><i class="fas fa-times-circle kill" id=${cusIdNew}></i>`,
                namefree: u.free_name,
                clavefree: u.free_cve,
                emailfree: u.free_email,
                phonefree: u.free_phone,
                adresfree: u.free_address,
                rfcfree: u.free_rfc,
                unitfree: u.free_unit,
                platfree: u.free_plates,
                licfree: u.free_license,
                fedpfree: u.free_fed_perm,
                clasefree: u.free_clase,
                anfree: u.free_año
            })
            .draw();
            $(row.node()).attr('id', u.free_id);
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

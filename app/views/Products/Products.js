let seccion = '';
let docs, prds, maxacc;
let grp = 50;
let num = 0,
    lvl = '',
    flt = 0,
    btn = '';
let cats, subs, sku1, sku2, sku3, sku4, glbPkt;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    btn = 'solo productos';
    // console.log('AQUI EMPIEZA');
    if (altr == 1) {
        deep_loading('O');
        settingTable('0');
        getCategories();
        getSubcategories();
        getServices();
        getCoins();
        getDocument();
        getInvoice();
        getListProducts();
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}

// Solicita las categorias
function getCategories() {
    var pagina = 'Products/listCategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}

// Solicita las subcategorias
function getSubcategories() {
    var pagina = 'Products/listSubcategories';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putSubcategories;
    fillField(pagina, par, tipo, selector);
}

// Solicita los tipos de servicio
function getServices() {
    var pagina = 'Products/listServices';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putServices;
    fillField(pagina, par, tipo, selector);
}
// Solicita las monedas
function getCoins() {
    var pagina = 'Products/listCoins';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putCoins;
    fillField(pagina, par, tipo, selector);
}
// Solicita las monedas
function getDocument() {
    var pagina = 'Products/listDocument';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putDocuments;
    fillField(pagina, par, tipo, selector);
}
// solicita las facturas
function getInvoice() {
    var pagina = 'Products/listInvoice';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putInvoice;  // putInvoiceList
    fillField(pagina, par, tipo, selector);
}
/** +++++  Obtiene los productos de la base */
function getProducts(catId) {
    var pagina = 'Products/listProducts';
    var par = `[{"catId":"${catId}","grp":"${grp}","num":"${num}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}
/** +++++   */
function getListProducts() {
    var pagina = 'Products/listProducts2';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putProductsList;
    fillField(pagina, par, tipo, selector);
}
/** +++++  Obtiene las series de un producto seleccionado */
function getSeries(prdId) {
    var pagina = 'Products/listSeries';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}
function getMaxAccesorio(prdsku) {
    // console.log('Busca',prdsku);
    var pagina = 'Products/maxAccesorio';
    var par = `[{"prdsku":"${prdsku}"}]`;
    var tipo = 'json';
    var selector = putMaxAccesorioc;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Obtiene el producto seleccionado */
function getSelectProduct(prdId) {
    var pagina = 'Products/getSelectProduct';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSelectProduct;
    fillField(pagina, par, tipo, selector);
}

/** +++++  Obtiene la serie seleccionada */
function getSelectSerie(serId) {
    var pagina = 'Products/getSelectSerie';
    var par = `[{"serId":"${serId}"}]`;
    var tipo = 'json';
    var selector = putSelectSerie;
    fillField(pagina, par, tipo, selector);
}

/** +++++  coloca las categorias */
function putCategories(dt) {
    cats = dt;

    if (dt[0].cat_id != '0') {
        let catId = dt[0].cat_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.cat_id}">${u.cat_name}</option>`;
            $('#txtCategoryList').append(H);
            $('#txtCatId').append(H);
        });

        //getProducts(0);

        $('#txtCategoryList').on('change', function () {
            let id = $(this).val();
            let catId = $(`#txtCategoryList option[value="${id}"]`).val();
            deep_loading('O');
            $('.tblProdMaster').slideUp('fast', function () {
                $('#tblProducts').DataTable().destroy();

                flt = 0;
                btn = 'solo productos';
                // getProducts(catId);
                settingTable(catId);
            });
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
    }
}
/** +++++  coloca las subcategorias */
function putSubcategories(dt) {
    subs = dt;
    if (dt[0].sbc_id != '0') {
        let sbcId = dt[0].sbc_id;
        $.each(dt, function (v, u) {
            var H = `<option class="hide" data_category="${u.cat_id}" value="${u.sbc_id}">${u.sbc_name}</option>`;
            $('#txtSbcId').append(H);
        });
    }
}
/** +++++  coloca los tipos de servicio */
function putServices(dt) {
    if (dt[0].srv_id != '0') {
        let srvId = dt[0].srv_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.srv_id}">${u.srv_name}-${u.srv_description}</option>`;
            $('#txtSrvId').append(H);
        });
    }
}
/** +++++  coloca los tipos de moneda */
function putCoins(dt) {
    if (dt[0].cin_id != '0') {
        let cinId = dt[0].cin_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.cin_id}">${u.cin_code}-${u.cin_name}</option>`;
            $('#txtCinId').append(H);
            $('#txtSerCinId').append(H);
        });
    }
}
/** +++++  coloca los docuemntos */
function putDocuments(dt) {
    if (dt[0].doc_id != '0') {
        let docId = dt[0].doc_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.doc_id}">${u.doc_name}</option>`;
            $('#txtDocId').append(H);
        });
    }
}

/** +++++  coloca los docuemntos de factura en serie */
function putInvoice(dt) {
    if (dt[0].doc_id != '0') {
        $.each(dt, function (v, u) {
            var H = `<option value="${u.doc_id}">${u.doc_name}</option>`;
            $('#txtDocIdSerie').append(H);
        });
    }
}

/** +++++  coloca los productos en la tabla */
function putProducts(dt) {
    prds = dt;
    fillProducts('0');
    console.log('LLena Products ');
}

function putProductsList(dt) {
    // console.log('putProductsList',dt);
    var sl = $('#txtProducts').offset();
    $('#listProduct .list-items').html('');
    //console.log(sl);
    $('#listProduct').css({left: sl.left + 10 + 'px', top: sl.top + 30 +'px'}); // volver a tomar al hacer scroll.
    $('#listProduct').slideUp('200', function () {
        $('#listProduct .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.prd_id}" data_complement="${u.prd_id}|${u.prd_name}|${u.prd_sku}">${u.prd_name}</div>`;
        $('#listProduct .list-items').append(H);
    });

    $('#txtProducts').on('focus', function () {
        $('#listProduct').slideDown('fast');
    });

    $('#listProduct').on('scroll', function(){
        sl = $('#txtProducts').offset();
        $('#listProduct').css({left: sl.left + 10 + 'px', top: sl.top + 30 +'px'});
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
        // console.log('AQUI escoges');
        let prdNm = $(this).html();
        let prdId = $(this).attr('id');
        let prdsku = $(this).attr('data_complement').split('|')[2];
        MaxAccesorio(prdsku,prdNm,prdId);
        // let newprdsku = prdsku + 'XXX';
        //console.log('selecciona elemento', prdId,'---', prdNm, '** ', prdsku);
        // $('#txtProducts').val(prdNm);
        // $('#txtIdProducts').val(prdId);
        // $('#txtPrdSku').val(newprdsku);
        // $('#listProduct').slideUp(100);
        // validator();
    });
}

function MaxAccesorio(prdsku,prdNm,prdId,) {
        // console.log('MaxAccesorio',prdNm,prdId,prdsku);
    if (maxacc == undefined) {
        getMaxAccesorio(prdsku,prdNm,prdId);
        
    } else {
        // console.log('Regreso a MaxAccesorio',prdNm,prdId,prdsku);
        let newprdsku = prdsku + 'XXX' + maxacc;
        $('#txtProducts').val(prdNm);
        $('#txtIdProducts').val(prdId);
        $('#txtPrdSku').val(newprdsku);
        $('#listProduct').slideUp(100);
    }
}

function putMaxAccesorioc(dt) {
    // console.log('putMaxAccesorioc',dt);
    let prdsku = dt[0].prdsku;
    maxacc = dt[0].maxacc;
    MaxAccesorio(prdsku,'',maxacc);
}

function sel_products(res) {
    //console.log('SELECC',res);
    if (res.length < 2) {
        $('#llistProduct .list-items div.list-item').css({display: 'block'});
    } else {
        $('#listProduct .list-items div.list-item').css({display: 'none'});
    }

    $('#listProduct .list-items div.list-item').each(function (index) {
        var cm = $(this).attr('data_complement').toUpperCase().replace(/|/g, '');
        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

/** +++++  configura la table de productos */
function settingTable(catId) {
    let title = 'Lista de productos';
    $('#tblProducts').DataTable().destroy();
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    var tabla = $('#tblProducts').DataTable({
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, 300, -1],
            [100, 200, 300, 'Todos'],
            [ -1],
           /*  ['Todos'], */
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
                text: 'Nuevo producto',
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    createNewProduct();
                },
            },
            {
                // Boton filtar producto
                text: btn,
                className: 'btn-apply btn_filter',
                action: function (e, dt, node, config) {
                    filterProduct(catId);
                },
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        ordering: true,
        scrollX: true,
        fixedHeader: true,
        createdRow: function (nRow, aData, iDataIndex) {
            $(nRow).attr('id', aData['producid']);
        },
        processing: true,
        serverSide: true,
        ajax: {url: 'Products/tableProducts', type: 'POST' , data: {catId: catId, filter: flt}}, 
        // columnDefs: [{targets: -1, data: null, defaultContent: '<button>click</button>'}],
        columns: [
            {data: 'editable', name: 'editable', class: 'editable edit', orderable: false},
            {data: 'produsku', name: 'produsku', class: 'produsku sku'},
            {data: 'prodname', name: 'prodname', class: 'prodname product-name'},
            {data: 'prodpric', name: 'prodpric', class: 'prodpric price'},
            {data: 'prodqtty', name: 'prodqtty', class: 'prodqtty quantity'},
            {data: 'prodtype', name: 'prodtype', class: 'prodtype type'},
            {data: 'typeserv', name: 'typeserv', class: 'typeserv lvl center'},
            {data: 'prodcoin', name: 'prodcoin', class: 'prodcoin sku'},
            {data: 'prddocum', name: 'prddocum', class: 'prddocum cellInvoice center'},
            {data: 'subcateg', name: 'subcateg', class: 'subcateg catalog'},
            {data: 'categori', name: 'categori', class: 'categori catalog'},
            {data: 'prodengl', name: 'prodengl', class: 'prodengl catalog'},
            {data: 'prdcomme', name: 'prdcomme', class: 'prdcomme catalog'},
        ],
    });
    
    tabla.on('draw',function(){  // agregado por jjr para habilitar iconos o clases
        // console.log('DIBUJANDO TABLA');
        activeIcons();
    });

    $('.tblProdMaster')
        .delay(2000)
        .slideDown('fast', function () {
            // tabla.reload();
            //$('.produsku').trigger('click');
            activeIcons();
            deep_loading('C');
        });
}


/** +++++  coloca los productos en la tabla y filtra */
function fillProducts(ft) {
    settingTable();
    $('#tblProducts tbody').html('');

    var cod = ft == '1' ? 'A' : '';

    if (prds[0].prd_id != '0') {
        let tabla = $('#tblProducts').DataTable();
        var catId = prds[0].cat_id;
        $.each(prds, function (v, u) {
            if (u.prd_level != cod) {
                pack = u.prd_level == 'K' ? 'fas' : 'far';
                let docInvo = `<span class="invoiceView" id="F${u.doc_id}"><i class="fas fa-file-alt" title="${u.doc_name}"></i></span>`;
                let invoice = u.doc_id == 0 ? '' : docInvo;
                let skufull = u.prd_sku.slice(7, 11) == '' ? u.prd_sku.slice(0, 7) : u.prd_sku.slice(0, 7) + '-' + u.prd_sku.slice(7, 11);
                /// agregar boton de elimniar
                // <td class="quantity" data-content="${u.prd_sku}|${u.prd_name.replace(/\"/g, '°')}|${u.quantity}|${u.prd_level}"><span class="toLink">${u.quantity}</span></td>
                let locqty=`<span class="quantity toLink" data-content="${u.prd_sku}|${u.prd_name.replace(/\"/g, '°')}|${u.quantity}|${u.prd_level}"> ${u.quantity} </span>`
                tabla.row
                    .add({
                        editable: `<i class="fas fa-pen modif"></i><i class="fas fa-times-circle kill"></i>`,
                        produsku: skufull,
                        prodname: u.prd_name,
                        prodpric: u.prd_price,
                        prodqtty: locqty,
                        prodtype: u.prd_level,
                        typeserv: u.srv_name,
                        prodcoin: u.prd_coin_type,
                        prddocum: invoice,
                        subcateg: u.sbc_name,
                        categori: u.cat_name,
                        prodengl: u.prd_english_name,
                        prdcomme: u.prd_comments,
                    })
                    .draw();
                    $(`#${u.prd_id}`).parents('tr').attr('id', u.prd_id);

                // prod_sku: `<span class="hide-support" id="SKU-${par[0].sersku}"></span>${par[0].sersku.slice(0, 7)}-${par[0].sersku.slice(7, 11)}`,

                /* var H = `
                <tr id="${u.prd_id}">
                    <td class="edit"><i class='fas fa-pen modif'></i><i class="fas fa-times-circle kill"></i></td>    
                    <td class="sku">${skufull}</td>
                    <td class="product-name editable" data_action="box" data_edit="prd_name"> ${u.prd_name}</td>
                    <td class="price editable" data_action="box" data_edit="prd_price">${u.prd_price}</td>
                    <td class="quantity toLink" data-content="${u.prd_sku}|${u.prd_name.replace(/\"/g, '°')}|${u.quantity}|${u.prd_level}">${u.quantity}</td>
                    <td class="level">${u.prd_level}</td>
                    <td class="sku editable list">${u.srv_name}</td>
                    <td class="sku">${u.prd_coin_type}</td>
                    <td class="cellInvoice center editable fileload">${invoice}</td>
                    <td class="catalog editable" data_action="list">${u.sbc_name}</td>
                    <td class="catalog editable" data_action="list">${u.cat_name}</td>
                    <td class="catalog editable" data_action="box">${u.prd_english_name}</td>
                    <td class="catalog editable" data_action="box">${u.prd_comments}</td>
                </tr>`;
                $('#tblProducts tbody').append(H); */
            }
        });
        // settingTable();
        console.log('fill 1--');
        activeIcons();
    } else {
        settingTable();
    }
}

function getModalSeries(id) {
    let qty = $(`#${id}`).children('td.prodqtty').text();
    if (qty > 0) {
        getSeries(id);
    }
}

/** +++++  Activa los iconos */
function activeIcons() {
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('tr');
            let prd = id.attr('id');
            let qty = $(this).text();
            let pkt = id.children('td.prodtype').text();
            glbPkt = pkt
            let pkn = id.children('td.prodname').text();
            console.log('Click --', prd, glbPkt, qty);
            // let qty = $(this).parent().attr('data-content').split('|')[2];
            // let pkt = $(this).parent().attr('data-content').split('|')[3];
            // let pkn = $(this).parent().attr('data-content').split('|')[1];
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

    $('.modif')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            let prdNm = 'Modifica producto';

            $('#ProductModal').removeClass('overlay_hide');
            $('.overlay_closer .title').html(prdNm);
            getSelectProduct(prdId);
            $('#ProductModal .btn_close')
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
            let cn = $(`#${prdId}`).children('td.quantity').children('.toLink').html();

            if (cn != 0) {
                $('#delProdModal').modal('show');
                $('#btnDelProduct').hide();
                $('#delProdModal .modal-header').html('El producto no puede ser borrado debido a que registra existencias en el almacen');
                $('#BorrarPerfilLabel').html('Borrado invalidado');
            } else {
                $('#delProdModal').modal('show');
                $('#btnDelProduct').show();
                $('#delProdModal .modal-header').html('');
                $('#BorrarPerfilLabel').html('¿Seguro que desea borrarlo?');
                $('#txtIdProduct').val(prdId);
                //borra paquete +
                $('#btnDelProduct').on('click', function () {
                    let Id = $('#txtIdProduct').val();
                    console.log(Id);
                    let tabla = $('#tblProducts').DataTable();
                    $('#delProdModal').modal('hide');

                    let prdRow = $(`#${Id}`);

                    tabla.row(prdRow).remove().draw();

                    var pagina = 'Products/deleteProduct';
                    var par = `[{"prdId":"${Id}"}]`;
                    var tipo = 'html';
                    var selector = putDelProducts;
                    fillField(pagina, par, tipo, selector);
                });
            }
        });
}

function putDelProducts(dt) {
    console.log(dt);
}

/** +++++  muestra unicamente los productos y oculta los accesorios Ernesto Perez */
function filterProduct(catId) {
    $('#tblProducts').DataTable().destroy();
    if (flt == 0) {
        flt = 1;
        btn = 'todo';
        settingTable(catId);
    } else {
        flt = 0;
        btn = 'solo productos';
        settingTable(catId);
    }
}

function putDocument(dt) {
    var a = document.createElement('a');
    a.href = 'data:application/octet-stream;base64,' + dt.doc_document;
    a.target = '_blank';
    // a.download = respuesta.doc_name;

    a.download = dt.doc_name + '.' + dt.doc_type.trim();
    a.click();
}

function putSelectProduct(dt) {
    cleanProductsFields();
    let prdId = dt[0].prd_id;
    let prdName = dt[0].prd_name;
    let prdSku = dt[0].prd_sku;
    let prdModel = dt[0].prd_model;
    let prdPrice = dt[0].prd_price;
    let prdEnglishName = dt[0].prd_english_name;
    let prdCodeProvider = dt[0].prd_code_provider;
    let prdNameProvider = dt[0].prd_name_provider;
    let prdComments = dt[0].prd_comments;
    let prdVisibility = dt[0].prd_visibility;
    let prdLevel = dt[0].prd_level;
    let prdLonely = dt[0].prd_lonely;
    let prdInsured = dt[0].prd_insured;
    let sbcId = dt[0].sbc_id;
    let catId = $(`#txtSbcId option[value="${sbcId}"]`).attr('data_category');
    let cinId = dt[0].cin_id;
    let srvId = dt[0].srv_id;
    let docId = dt[0].docum;
    let dcpId = dt[0].documId;

    let vsb = prdVisibility == '1' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';
    // let lvl = prdLevel == 'A' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';
    let lvl = prdLevel == 'A' ? ' Accesorio' : 'Producto';
    let lnl = prdLonely == '1' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';
    let ass = prdInsured == '1' ? ' <i class="fas fa-check-square" data_val="1"></i>' : '<i class="far fa-square" data_val="0"></i>';

    $(`#txtCatId`).attr('disabled', true);
    $(`#txtSbcId`).attr('disabled', true);

    $('#txtPrdId').val(prdId);
    $('#txtPrdName').val(prdName);
    $('#txtPrdSku').val(prdSku);
    $('#txtPrdModel').val(prdModel);
    $('#txtPrdPrice').val(prdPrice);
    $('#txtPrdEnglishName').val(prdEnglishName);
    $('#txtPrdCodeProvider').val(prdCodeProvider);
    $('#txtPrdNameProvider').val(prdNameProvider);
    $('#txtPrdComments').val(prdComments);
    $(`#txtCatId`).val(catId);
    $(`#txtSbcId`).val(sbcId);
    $(`#txtCinId`).val(cinId);
    $(`#txtSrvId`).val(srvId);
    $(`#txtDocId`).val(docId);
    $(`#txtDcpId`).val(dcpId);
    $('#txtPrdVisibility').html(vsb);
    $('#txtPrdLevel').html(lvl);
    $('#txtPrdLonely').html(lnl);
    $('#txtPrdInsured').html(ass);

    // console.log('Carga-P ', dt);

    $('#tblEditProduct .checkbox i')
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

    $('#txtSbcId')
        .unbind('change')
        .on('change', function () {
            let catId = $(`#txtCatId option[value="${id}"]`).val();
            let sbcId = $(`#txtSbcId option[value="${id}"]`).val();
            console.log(cat_id, sbcId);
        });

    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            // console.log('CLick-boton');
            saveEditProduct();
        });
}

function saveEditProduct() {
    
    let ky = validatorProductsFields();
    // console.log('saveEditProduct', ky);
    if (ky == 0) {
        let prdId = $('#txtPrdId').val();
        let prdNm = $('#txtPrdName').val().replace(/\"/g, '°');
        let prdSk = $('#txtPrdSku').val();
        let prdMd = $('#txtPrdModel').val();
        let prdPr = $('#txtPrdPrice').val();
        let prdEn = $('#txtPrdEnglishName').val();
        let prdCd = $('#txtPrdCodeProvider').val();
        let prdNp = $('#txtPrdNameProvider').val();
        let prdCm = $('#txtPrdComments').val();
        let prdVs = $('#txtPrdVisibility').children('i').attr('data_val');
        let prdLl = $('#txtPrdLevel').children('i').attr('data_val');
        let prdLv = prdLl == '1' ? 'A' : 'P';
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
            // console.log('Update-P ', par);
        var pagina = 'Products/saveEdtProduct';
        var tipo = 'html';
        var selector = resEdtProduct;
        fillField(pagina, par, tipo, selector);
    }
}

function resEdtProduct(dt) {
    // console.log('AQUI ACTUALIZA PRODUCTO');
    let prdId = dt.split('|')[0];
    let prdNm = $('#txtPrdName').val().replace(/\"/g, '°');
    let prdSk = $('#txtPrdSku').val();
    let prdPr = formato_numero($('#txtPrdPrice').val(), 2, '.', ',');
    let prdEn = $('#txtPrdEnglishName').val();
    let prdCm = $('#txtPrdComments').val();
    // let prdLv = $('#txtPrdLevel').children('i').attr('data_val');
    let prdLv = $('#txtPrdLevel').text().substring(1, 2);
    let prdCt = $(`#txtCatId option:selected`).text();
    let prdSb = $(`#txtSbcId option:selected`).text();
    let prdCn = $(`#txtCinId option:selected`).val() == 0 ? '' : $(`#txtCinId option:selected`).text().split('-')[0];
    let prdSv = $(`#txtSrvId option:selected`).val() == 0 ? '' : $(`#txtSrvId option:selected`).text().split('-')[0];
    let prdDi = $(`#txtDocId option:selected`).val() == 0 ? '' : $(`#txtDocId option:selected`).val();

    let docInvo = `<span class="invoiceView" id="F${prdDi}"><i class="fas fa-file-alt"></i></span>`;
    let prdDc = prdDi == 0 ? '' : docInvo;
    prdLv = prdLv == 'A' ? 'A' : 'P';
    console.log('ACTUALIZA JJR');
    let el = $(`#tblProducts tr[id="${prdId}"]`);
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

    $('#ProductModal .btn_close').trigger('click');
    activeIcons();
}

function createNewProduct() {
    let prdNm = 'Nuevo producto';
    cleanProductsFields();

    $(`#txtCatId`).attr('disabled', false);
    $(`#txtSbcId`).attr('disabled', false);
    $('#ProductModal').removeClass('overlay_hide');
    $('#txtPrdVisibility').html('<i class="fas fa-check-square"></i>');
    $('.overlay_closer .title').html(prdNm);

    $('#tblEditProduct .checkbox i')
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
            let accr = $(this).attr('data_val');
            /* console.log(itmId, accr); */

            /* AGREGA VALORES AL ACCESORIO */
            if (itmId == 'txtPrdLevel') {
                if (accr == 1) {
                    $(`#txtCatId`).val(0);
                    $(`#txtSbcId`).val(0);
                    $(`#txtPrdSku`).val('');
                    $(`#txtCatId`).attr('disabled', true);
                    $(`#txtSbcId`).attr('disabled', true);
                    $(`#txtSrvId`).attr('disabled', true);
                    $(`#txtProducts`).attr('disabled', false);
                    maxacc=undefined;
                    // console.log('Valores del Accesorio, Cat=20, SubCat=152');
                } else {
                    $(`#txtCatId`).val(0);
                    $(`#txtSbcId`).val(0);
                    $(`#txtProducts`).val('');
                    $('#txtPrdSku').val('');
                    $(`#txtCatId`).attr('disabled', false);
                    $(`#txtSbcId`).attr('disabled', false);
                    $(`#txtProducts`).attr('disabled', true);
                    $(`#txtSrvId`).attr('disabled', false);
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
        });

    $('#ProductModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            saveNewProduct();
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
    $('#txtPrdSku').val(sku1 + sku2 + sku3 + sku4);
}

function saveNewProduct() {
    let ky = validatorProductsFields();
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
                [{  "prdId" : "${prdId}",
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
function resNewProduct(dt) {
    console.log(dt);
    if(dt!='null'){
        $('#txtCategoryList').val(dt).trigger('change');
    }else{
        $('#txtCategoryList').val(10).trigger('change');
    }
    $('#ProductModal .btn_close').trigger('click');
}

function cleanProductsFields() {
    $('.textbox').val('');
    $('td.data select').val(0);
    $('td.data .checkbox').html('<i class="far fa-square" data_val="0"></i>');
    $('.required').removeClass('fail').parent().children('.fail_note').addClass('hide');
}

function validatorProductsFields() {
    let ky = 0;
    // comentado para probar el flujo
    /* $('.required').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            ky = 1;
            $(this).addClass('fail').parent().children('.fail_note').removeClass('hide');
        }
    }); */
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

/** +++++  Abre el modal y coloca los seriales de cada producto */
function putSeries(dt) {
    $('#SerieModal').removeClass('overlay_hide');

    $('#tblSerie').DataTable({
        destroy: true,
        order: [[1, 'desc']],
        lengthMenu: [
            [50, 100, 150, -1],
            [50, 100, 150, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'sermodif', class: 'edit'},
            {data: 'produsku', class: 'sku'},
            {data: 'serlnumb', class: 'product-name'},
            {data: 'dateregs', class: 'sku'},
            {data: 'cvstatus', class: 'code-type_s'},
            {data: 'cvestage', class: 'code-type_s'},
            {data: 'cinvoice', class: 'cellInvoice center editable fileload'},
            {data: 'serqntty', class: 'quantity'},
            {data: 'serstore', class: 'catalog'},
            {data: 'serbrand', class: 'catalog'},
            {data: 'sernumped', class: 'catalog'},
            {data: 'sercosimp', class: 'catalog'},
            {data: 'sernumeco', class: 'sku'},
            {data: 'comments', class: 'comments'},
        ],
    });

    $('#SerieModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
        });

    build_modal_serie(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_serie(dt) {
    // console.log('build_modal_serie-',dt);

    let lprdsku='';
    let tabla = $('#tblSerie').DataTable();
    $('.overlay_closer .title').html(`${dt[0].prd_sku} - ${dt[0].prd_name}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        if (glbPkt=='P'){
            lprdsku=u.ser_sku.slice(0, 10);
        }else{
            lprdsku=u.ser_sku.slice(0, 10) + '-' + u.ser_sku.slice(10, 15);
        }

        let docInvo = `<span class="invoiceViewSer" id="F${u.doc_id}"><i class="fas fa-file-alt" title="${u.doc_name}"></i></span>`;
        let invoice = u.doc_id == 0 ? '' : docInvo;
        tabla.row
            .add({
                //sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i><i class="fas fa-times-circle serie kill" id="K${u.ser_id}"></i>`,
                sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i>`,
                // produsku: `${u.ser_sku.slice(0, 10)}-${u.ser_sku.slice(10, 15)}`,
                produsku: lprdsku,
                serlnumb: u.ser_serial_number,
                dateregs: u.ser_date_registry,
                cvstatus: u.ser_situation,
                cvestage: u.ser_stage,
                cinvoice: invoice,
                serqntty: u.stp_quantity,
                serstore: u.str_name,
                serbrand: u.ser_brand,
                sernumped: u.ser_import_petition,
                sercosimp: u.ser_cost_import,
                sernumeco: u.ser_no_econo,
                comments: u.ser_comments,
            })
            .draw();
        $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.prd_id);
    });
    activeIconsSerie();
}

function activeIconsSerie() {
    $('.invoiceViewSer')
        .unbind('click')
        .on('click', function () {
            var id = $(this).attr('id').slice(1, 10);
            // console.log(id);
            var pagina = 'Documentos/VerDocumento';
            var par = `[{"id":"${id}"}]`;
            var tipo = 'json';
            var selector = putDocument;
            fillField(pagina, par, tipo, selector);
        });

    $('.serie.modif')
        .unbind('click')
        .on('click', function () {
            let serId = $(this).attr('id').slice(1, 10);

            $('#ModifySerieModal').removeClass('overlay_hide');

            $('#ModifySerieModal .btn_close')
                .unbind('click')
                .on('click', function () {
                    $('#ModifySerieModal').addClass('overlay_hide');
                });
            getSelectSerie(serId);
        });
    $('.serie.kill')
        .unbind('click')
        .on('click', function () {
            console.log('Elimina serie');
            let sltor = $(this);
            let serId = sltor.attr('id').substring(1, 10);
            let prdId = sltor.parents('tr').attr('data-product');
            console.log('Kill ' + serId);
            $('#delSerieModal').modal('show');
            $('#txtIdSerie').val(serId);
            $('#btnDelSerie').on('click', function () {
                let Id = $('#txtIdSerie').val();
                console.log(Id);
                let tabla = $('#tblSerie').DataTable();
                $('#delSerieModal').modal('hide');

                let prdRow = $(`#${Id}`);

                tabla.row(prdRow).remove().draw();

                var pagina = 'Products/deleteSerie';
                var par = `[{"serId":"${Id}", "prdId":"${prdId}"}]`;
                var tipo = 'html';
                var selector = putDelSerie;
                fillField(pagina, par, tipo, selector);
            });
        });
}

function putDelSerie(dt) {
    console.log(dt);
    let serId = dt.split('|')[0];
    let prdId = dt.split('|')[1];

    let tabla = $('#tblSerie').DataTable();
    tabla
        .row($('#K' + serId).parents('tr'))
        .remove()
        .draw();

    let el = $('#' + prdId);
    let cll = $(el.find('td')[4]).children('.toLink');
    let qty = cll.text();
    cll.text(qty - 1);
    console.log(qty - 1);
}

function putSelectSerie(dt) {
    // console.log('3ro Click Modal');
    // console.log(dt);
    /* getInvoice(); */
    $('#txtSerIdSerie').val(dt[0].ser_id);
    $('#txtSerSkuSerie').val(dt[0].ser_sku.slice(0, 10) + '-' + dt[0].ser_sku.slice(10, 15));
    $('#txtSerSerialNumber').val(dt[0].ser_serial_number);
    $('#txtSerDateRegistry').val(dt[0].ser_date_registry);
    $('#txtSerCost').val(dt[0].ser_cost);

    $('#txtSerBrand').val(dt[0].ser_brand);
    $('#txtSerNumPed').val(dt[0].ser_import_petition);
    $('#txtSerCostImp').val(dt[0].ser_cost_import);
    $('#txtSerNumEco').val(dt[0].ser_no_econo);

    $('#txtSerSup').val(dt[0].sup_business_name);
   
    $('#txtDocIdSerie').val(dt[0].doc_id);
    $('#txtDcpIdSerie').val(dt[0].dcp_id);
    /* $('#txtDcpIdSerie').val(dt[0].dcp_id); */
    $('#txtSerComments').val(dt[0].ser_comments);

    $('#btn_save_serie')
        .unbind('click')
        .on('click', function () {
            let dateReg = moment($('#txtSerDateRegistry').val(), 'DD/MM/YYYY').format('YYYYMMDD');

            let par = `
            [{  "serId"  :  "${$('#txtSerIdSerie').val()}",
                "serSr"  :  "${$('#txtSerSerialNumber').val()}",
                "serDt"  :  "${dateReg}",
                "serDc"  :  "${$('#txtDocIdSerie').val()}",
                "serDi"  :  "${$('#txtDcpIdSerie').val()}",
                "serBr"  :  "${$('#txtSerBrand').val()}",
                "serNp"  :  "${$('#txtSerNumPed').val()}",
                "serCi"  :  "${$('#txtSerCostImp').val()}",
                "serNe"  :  "${$('#txtSerNumEco').val()}",
                "serCm"  :  "${$('#txtSerComments').val()}",
                "serCost"  :  "${$('#txtSerCost').val()}"
            }] `;
            // console.log('Par-',par);
            var pagina = 'Products/saveEdtSeries';
            var tipo = 'html';
            var selector = resEdtSeries;
            fillField(pagina, par, tipo, selector);
        });

    let fecha = moment(Date()).format('DD/MM/YYYY');
    // let fechaStart = moment(Date()).subtract(730, 'days').format('DD/MM/YYYY');
    let fechaStart = moment(Date()).subtract(10, 'years').format('DD/MM/YYYY');

    $('#calendar').daterangepicker(
        {
            autoApply: true,
            singleDatePicker: true,
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
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                firstDay: 1,
            },
            showCustomRangeLabel: false,
            startDate: fecha,
            endDate: fecha,
            minDate: fechaStart,
            maxDate: fecha,
            opens: 'left',
        },
        function (start, end, label) {
            $('#txtSerDateRegistry').val(start.format('DD/MM/YYYY'));
        }
    );
}

function resEdtSeries(dt) {  //AQUI ACTUALIZA TABLA SERIES
    // console.log('AQUI ACTUALIZA TABLA SERIES',dt);
    let serId = $('#txtSerIdSerie').val();
    let serSr = $('#txtSerSerialNumber').val();
    let serDt = $('#txtSerDateRegistry').val();
    let serDc = $('#txtDocIdSerie').val();
    let serDi = $('#txtDcpIdSerie').val();
    let serCm = $('#txtSerComments').val();
    let serBr = $('#txtSerBrand').val();
    let numEco = $('#txtSerNumEco').val();
    let numPed = $('#txtSerNumPed').val();
    let costIm= $('#txtSerCostImp').val();

    let el = $(`#tblSerie tr td i[id="E${serId}"]`).parents('tr');
    let docInvo = `<span class="invoiceView" id="F${serDc}"><i class="fas fa-file-alt"></i></span>`;
    let invoi = serDc == 0 ? '' : docInvo;
    $(el.find('td')[2]).html(serSr);
    $(el.find('td')[3]).html(serDt);
    $(el.find('td')[6]).html(invoi);
    $(el.find('td')[9]).html(serBr);
    $(el.find('td')[10]).html(numPed);
    $(el.find('td')[11]).html(costIm);
    $(el.find('td')[12]).html(numEco);
    $(el.find('td')[13]).html(serCm);

    activeIconsSerie();
    $('#ModifySerieModal .btn_close').trigger('click');
}

function putInvoiceList(dt) {
    //console.log(dt);
    var fc = $('#txtDocIdSerie').offset();
    $('#listInvoice .list-items').html('');
    //console.log(fc);
    //$('.list-group #listInvoice').css({top: fc.top + 40 + 'px'});
    //$('#listInvoice').css({top: fc.top + 90 + 'px'});
    $('#listInvoice').slideUp('100', function () {
        //$('.list-group #listInvoice').slideUp('100', function () {
        $('#listInvoice .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.doc_id}" data_serie="${u.doc_id}" data_complement="${u.doc_id}|${u.doc_name}">${u.doc_name}</div>`;
        $('#listInvoice .list-items').append(H);
    });

    $('#txtDocIdSerie').on('focus', function () {
        //$('.list-group #listInvoice').slideDown('slow');
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
        // let prdNm = $(this).html();
        // let prdId = $(this).attr('id') + '|' + $(this).attr('data_complement');
        let prdNm = $(this).html();
        let prdId = $(this).attr('id');
        $('#txtDocIdSerie').val(prdNm);
        $('#txtDcpIdSerie').val(prdId);
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

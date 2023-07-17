let prod,
    proj,
    folio,
    comids = [];

$('document').ready(function () {
    url = getAbsolutePath();
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    if (altr == 1) {
        get_stores();
        get_projects();
        fill_dinamic_table();
        get_products(5);

        $('#lstPayForm')
            .unbind('change')
            .on('change', function () {
                var tp = $(this).val();
                if (tp == 'TARJETA DE CREDITO') {
                    $('#txtInvoice').addClass('required').parents('div.form_group').removeClass('hide');
                } else {
                    $('#txtInvoice').removeClass('required').parents('div.form_group').addClass('hide');
                }
            });

        $('#addPurchase').on('click', function () {
            saleApply();
        });

        $('#newQuote').on('click', function () {
            window.location = 'ProductsSalables';
        });
        $('#newComment').on('click', function () {
            addComments('sales', '');
        });

        $('.required').on('focus', function () {
            $(this).removeClass('forValid');
            $(this).parent().children('.novalid').remove();
        });
        confirm_alert();
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}

/** OBTENCION DE DATOS */

/**  Obtiene el listado de almacenes */
function get_stores() {
    var pagina = 'ClosedProyectChange/listStores';
    var par = `[{"strId":""}]`;
    var tipo = 'json';
    var selector = put_stores;
    caching_events('get_stores');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de productos */
function get_products(strId) {
    var pagina = 'ClosedProyectChange/listProducts';
    var par = `[{"strId":"${strId}"}]`;
    var tipo = 'json';
    var selector = put_products;
    caching_events('get_products');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_projects() {
    var pagina = 'ClosedProyectChange/listProjects';
    var par = `[{"strId":""}]`;
    var tipo = 'json';
    var selector = put_projects;
    caching_events('get_projects');
    fillField(pagina, par, tipo, selector);
}

function put_nextNumber(dt) {
    console.log(dt);
}

function put_stores(dt) {
    if (dt[0].str_id > 0) {
        $.each(dt, function (v, u) {
            let H = ` <option value="${u.str_id}">${u.str_name}</option>`;
            $('#lstStore').append(H);
        });
    } else {
        $('#lstStore').html('');
    }

    $('#lstStore')
        .unbind('change')
        .on('change', function () {
            let strId = $(this).val();
            get_products(strId);
        });
}

function put_projects(dt) {
    proj = dt;
    if (dt[0].pjt_id > 0) {
        $.each(proj, function (v, u) {
            let H = ` <option value="${v + 1}">${u.pjt_number}</option>`;
            $('#lstProject').append(H);
        });
    } else {
        $('#lstProject').html('');
    }

    $('#lstProject')
        .unbind('change')
        .on('change', function () {
            console.log($(this).val());
            var ix = $(this).val();
            if (ix > 0) {
                $('#txtProject').parents('div.form_group').removeClass('hide');
                $('#txtProject').val(proj[ix - 1].pjt_name.toUpperCase());
                $('#txtCustomer').val(proj[ix - 1].cus_name.toUpperCase());
            } else {
                $('#txtProject').parents('div.form_group').addClass('hide');
                $('#txtProject').val('');
                $('#txtCustomer').val('');
            }
        });
}

function put_products(dt) {
    console.log(dt);
    $('.list_products ul').html('');
    if (dt[0].ser_id > 0) {
        prod = dt;
        let H = '';
        $.each(dt, function (v, u) {
            H = `
                <li data_indx ="${v}" data_content="${u.ser_sku}|${u.prd_name.replace(/"/g, '')}">
                    <div class="prodLevel">${u.ser_sku}</div>
                    <div class="prodName">${u.prd_name}</div>
                    <div class="prodLevel">${u.prd_price}</div>
                    <div class="prodStock">${u.stock}</div>
                </li> `;

            $('.list_products ul').append(H);
        });

        $('.list_products ul li')
            .unbind('click')
            .on('click', function () {
                let inx = $(this).attr('data_indx');
                if (prod[inx].stock > 0) {
                    fill_purchase(prod[inx], inx);
                }
            });
    }
}

/**  +++++   Arma el escenario de la cotizacion  */
function fill_dinamic_table() {
    caching_events('fill_dinamic_table');
    let H = `
        <table class="table_control" id="tblControl" style="width: 900px;">
            <thead>
                <tr>
                    <th rowspan="2" class="w5 fix product">CODIGO</th>
                    <th colspan="3" class="zone_01 headrow" >&nbsp;</th>
                </tr>
                <tr class="headrow">
                    <th class="w4 zone_01" >CANTIDAD </th>
                    <th class="w3 zone_01" >DESCRIPCION </th>
                    <th class="w3 zone_03" >PRECIO</th>
                    <th class="w3 zone_03" >DESCUENTO</th>
                    <th class="w3 zone_03" >TOTAL</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>
    `;
    $('#tbl_dynamic').html(H);
    tbldynamic('tbl_dynamic');
    add_boton();
}

function add_boton() {
    let H = `<br><button class="btn-add" id="addProduct">+ agregar producto</button>`;
    $('.frame_fix_top #tblControl thead th.product').append(H);

    $('.frame_fix_top #addProduct').on('click', function (e) {
        var posLeft = $('.frame_fix_top #addProduct').offset().left;
        var posTop = $('.frame_fix_top #addProduct').offset().top;

        let hg = parseFloat($('.frame_fix_top').css('height'));
        let pt = $('.frame_fix_top').offset().top;
        let pb = hg + pt;
        let lm = (pb / 4) * 3;

        let h1 = parseFloat($('.box_list_products').css('height'));

        if (posTop > lm) {
            posTop = posTop - (h1 - 20);
            $('.list_products').css({bottom: '26px'});
            $('.sel_product').css({top: h1 - 26 + 'px'});
        } else {
            $('.list_products').css({top: '20px'});
            $('.sel_product').css({top: 0});
        }

        $('.box_list_products')
            .css({top: posTop + 'px', left: posLeft + 'px'})
            .slideDown(200);
        $(`.list_products`).css({display: 'none'});

        $('.box_list_products')
            .unbind('mouseleave')
            .on('mouseleave', function () {
                $('.box_list_products').slideUp(200);
                $('.sel_product').text('');
            });

        $('#Products .sel_product')
            .unbind('keyup')
            .on('keyup', function () {
                let text = $(this).text().toUpperCase();
                sel_product(text);
            });
    });
}

/**  +++++ Guarda el producto en la cotización +++++ */
function fill_purchase(pr, ix) {
    caching_events('fill_purchase');
    // console.log(pr);
    // console.log(ix);

    $('#Products .sel_product').text('');

    //  let prdName = pr.prod_name.replace(/°/g, '"');

    let ky = registered_product(pr.ser_id);
    if (ky == 0) {
        let H = `
        <tr id="${pr.ser_id}" data_index="${ix}">
            <td class="product"><i class="fas fa-times-circle kill"></i>${pr.prd_sku} - ${pr.prd_name}</td>
            <td class="quantity" data_quantity="${pr.stock}">1</td>
            <td class="price">${pr.prd_price}</td>
            <td class="cost">0</td>
        </tr>
    `;

        $('#tbl_dynamic tbody').append(H);
        $(`.frame_content #tblControl tbody #${pr.ser_id} td.quantity`).attr({contenteditable: 'true'});
    }

    rgcnt = 1;
    update_totals();

    $('td.quantity')
        .unbind('blur')
        .on('blur', function () {
            let qty = parseInt($(this).text());
            let qtydef = parseInt($(this).attr('data_quantity'));
            if (qty < 1) {
                $(this).text(1);
            } else if (qty > qtydef) {
                $(this).text(qtydef);
            }
            rgcnt = 1;
            update_totals();
        });

    $('.kill')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('tr').attr('id');
            console.log(id);
            $('.frame_content #' + id).remove();
            $('.frame_fix_row #' + id).remove();
            $('.frame_fix_col #' + id).remove();
            $('.frame_fix_top #' + id).remove();
            rgcnt = 1;
            update_totals();
        });
}

/** Actualiza los totales */
function update_totals() {
    let ttlrws = $('.frame_content').find('tbody tr').length;
    if (rgcnt == 1) {
        rgcnt = 0;
        caching_events('update_totals');

        let total = 0;
        $('.frame_content #tblControl tbody tr').each(function (v) {
            let pid = $(this).attr('id');
            if ($(this).children('td.quantity').html() != undefined) {
                qtybs = parseInt(pure_num($(this).children('td.quantity').text()));
                prcbs = parseFloat(pure_num($(this).children('td.price').text()));
                costs = qtybs * prcbs;

                $('#' + pid)
                    .children('td.cost')
                    .html(mkn(costs, 'n'));

                total += costs;
            }
        });
        $('#total').html(mkn(total, 'n'));
        $('#ttlproducts').html(ttlrws);
    }
}

function registered_product(id) {
    let ky = 0;
    $('.frame_content table tbody tr').each(function () {
        let idp = $(this).attr('id');
        if (id == idp) {
            let qty = parseInt($(this).children('td.quantity').text()) + 1;
            let qtydef = parseInt($(this).children('td.quantity').attr('data_quantity'));

            if (qty > qtydef) qty = qtydef;
            $(this).children('td.quantity').text(qty);

            ky = 1;
        }
    });
    return ky;
}

/** ++++++ Selecciona los productos del listado */
function sel_product(res) {
    $('.list_products').css({display: 'block'});
    if (res.length < 1) {
        $('.list_products ul li').css({display: 'block'});
    } else {
        $('.list_products ul li').css({display: 'none'});
    }
    $('.list_products ul li').each(function (index) {
        var cm = $(this).attr('data_content').toUpperCase().replace(/|/g, '');

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
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

/**  +++++ Cachando eventos   */
function caching_events(ev) {
    // console.log(ev);
}

function mkn(cf, tp) {
    let nm = cf;
    switch (tp) {
        case 'n':
            nm = formato_numero(cf, '2', '.', ',');
            break;
        case 'p':
            nm = formato_numero(cf, '1', '.', ',');
            break;
        default:
    }
    return nm;
}

function saleApply() {
    deep_loading('O');

    if (folio == undefined) {
        var pagina = 'ClosedProyectChange/NextExchange';
        var par = '[{"par":""}]';
        var tipo = 'html';
        var selector = putNextExchangeNumber;
        fillField(pagina, par, tipo, selector);
    } else {
        let ky = validator();
        if (ky == 1) {
            let pix = $('#lstProject').val();
            console.log(pix);
            let payForm = $('#lstPayForm').val();
            let invoice = $('#txtInvoice').val();
            let customer = $('#txtCustomer').val().toUpperCase();
            let pjtName = pix == '' ? '' : proj[pix - 1].pjt_name.toUpperCase();
            let pjtId = pix == '' ? 0 : proj[pix - 1].pjt_id;
            let strId = $('#lstStore').val();

            let par = `
[{
    "salPayForm"        : "${payForm}",
    "salNumberInvoice"  : "${invoice}",
    "salCustomerName"   : "${customer}",
    "pjtName"           : "${pjtName}",
    "strId"             : "${strId}",
    "pjtId"             : "${pjtId}",
    "comId"             : "${comids}"
}]`;

            console.log(par);

            // console.log(par);
            clean_required();
            let rws = $('.frame_content #tblControl tbody tr').length;
            if (rws > 0) {
                var pagina = 'ProductsSalables/SaveSale';
                var tipo = 'html';
                var selector = saleDetailApply;
                fillField(pagina, par, tipo, selector);
            } else {
                alert('Tabla vacia');
                deep_loading('C');
            }
        } else {
            deep_loading('C');
        }
    }
}

function putNextExchangeNumber(dt) {
    console.log(dt);
    folio = dt;
    saleApply();
}

function saleDetailApply(dt) {
    let pix = $('#lstProject').val();
    let pjtId = pix == '' ? 0 : proj[pix - 1].pjt_id;
    let strId = $('#lstStore').val();

    console.log(pix, pjtId, strId);

    $('.frame_content #tblControl tbody tr').each(function (v) {
        let ix = $(this).attr('data_index');
        if (prod[ix].ser_id != undefined) {
            // let productSku = tr.children('td.product').text().replace(/\"/g, '°').split(' - ')[0];
            let productSku = prod[ix].ser_sku;
            let productName = prod[ix].prd_name.replace(/\"/g, '°');
            let productPrice = prod[ix].prd_price;
            let quantity = $(this).children('td.quantity').text();
            let salId = dt;
            let serId = prod[ix].ser_id;

            let par = `
[{
    "sldSku"        : "${productSku}",
    "sldName"       : "${productName}",
    "sldPrice"      : "${productPrice}",
    "sldQuantity"   : "${quantity}",
    "salId"         : "${salId}",
    "serId"         : "${serId}",
    "strId"         : "${strId}",
    "pjtId"         : "${pjtId}",
    "folio"         : "${folio}"
}]`;

            console.log(par);

            var pagina = 'ClosedProyectChange/SaveSaleDetail';
            var tipo = 'html';
            var selector = setSaleDetailApply;
            fillField(pagina, par, tipo, selector);
        }
    });
}

function setSaleDetailApply(dt) {
    console.log(dt);
    deep_loading('C');

    let sal = dt.split('|')[0];
    let usr = dt.split('|')[1];
    let nme = dt.split('|')[2];
    let hst = localStorage.getItem('host');
    window.open(url + 'app/views/ClosedProyectChange/ClosedProyectChangeReport.php?i=' + sal + '&u=' + usr + '&n=' + nme + '&h=' + hst, '_blank');
    window.location = 'ClosedProyectChange';
}

function validator() {
    var vl = 1;

    var form = $('#formSales .required');

    form.each(function () {
        var k = $(this).val();
        if (k == '') {
            $(this).addClass('forValid');
            $(this).parent().append('<i class="fas fa-times-circle novalid"></i>');
            vl = 0;
        }
    });

    return vl;
}

function clean_required() {
    $('.required').removeClass('forValid');
    $('.required').parent().children('.novalid').remove();
}

function saveComment(scc, mid, cmm) {
    let par = `
    [{
        "section"       : "${scc}",
        "sectnId"       : "${mid}",
        "comment"       : "${cmm}"
    }]`;

    var pagina = 'ClosedProyectChange/SaveComments';
    var tipo = 'html';
    var selector = setSaveComment;
    fillField(pagina, par, tipo, selector);
}

function setSaveComment(dt) {
    comids.push(dt);
}

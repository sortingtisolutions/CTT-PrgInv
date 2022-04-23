let cust, proj, prod, vers, budg;
let viewStatus = 'C'; // Columns Trip & Test C-Colalapsed, E-Expanded

$('document').ready(function () {
    url = getAbsolutePath();
    verifica_usuario();
    inicial();
});

function inicial() {
    sticky_table();
    eventsAction();
    get_projects('0');
    get_customers();
    get_discounts();
}

function sticky_table() {
    $(`#invoiceTable table`).sticky({
        top: 'thead tr:first-child',
        left: 'tr th:first-child',
    });

    $(`#listProductsTable table`).sticky({
        top: 'thead tr:first-child',
    });
}

function eventsAction() {
    // Despliega la seccion de detalle de información del proyecto
    $('.projectInformation')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-finder').css({top: '-100%'});
            $('.projectfinder').removeClass('open');

            let rotate = $(this).attr('class').indexOf('rotate180');
            if (rotate >= 0) {
                $('.invoice__section-details').css({top: '-100%'});
                $(this).removeClass('rotate180');
            } else {
                $('.invoice__section-details').css({top: '32px'});
                $(this).addClass('rotate180');
            }
        });

    // Despliega la sección de seleccion de proyecto y cliente
    $('.projectfinder')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-details').css({top: '-100%'});
            $('.projectInformation').removeClass('rotate180');

            let open = $(this).attr('class').indexOf('open');
            if (open >= 0) {
                $('.invoice__section-finder').css({top: '-100%'});
                $(this).removeClass('open');
            } else {
                $('.invoice__section-finder').css({top: '32px'});
                $(this).addClass('open');
            }
        });

    // Despliega y contrae las columnas de viaje y prueba
    $('.showColumns')
        .unbind('click')
        .on('click', function () {
            let rotate = $(this).attr('class').indexOf('rotate180');
            console.log(rotate);
            viewStatus = rotate >= 0 ? 'E' : 'C';
            expandCollapseSection();
        });

    // Despliega y contrae el menu de opciones de secciones
    $('.invoice_controlPanel .addSection')
        .unbind('click')
        .on('click', function () {
            $('.menu-sections').slideDown('slow');
            $('.menu-sections').on('mouseleave', function () {
                $(this).slideUp('slow');
                sectionShowHide();
            });
        });

    // muestra en la cotización la seccion seleccionada
    $('.menu-sections ul li')
        .unbind('click')
        .on('click', function () {
            let item = $(this).attr('data_option');
            $(this).hide();

            $(`#SC${item}`).show();
        });

    $('.invoice__box-table .invoice_button')
        .unbind('click')
        .on('click', function () {
            let item = $(this).parents('tbody').attr('id');

            showListProducts(item);
        });
    // Elimina la sección de la cotización
    $('.removeSection')
        .unbind('click')
        .on('click', function () {
            let id = $(this);
            let section = id.parents('tbody');
            section.hide().find('tr.budgetRow').remove();
            sectionShowHide();
        });

    $('.version__button')
        .unbind('click')
        .on('click', function () {
            let nRows = $('.frame_content table tbody tr').length;
            console.log(nrowa);
        });

    expandCollapseSection();
}

function expandCollapseSection() {
    if (viewStatus == 'C') {
        $('.showColumns').addClass('rotate180');
        $('.coltrip').hide().children('.input_invoice').attr('disable', 'true');
        $('.coltest').hide().children('.input_invoice').attr('disable', 'true');
        $('.showColumns').parents('table').removeAttr('class').addClass('collapsed');
    } else {
        $('.showColumns').removeClass('rotate180');
        $('.coltrip').show().children('.input_invoice').attr('disable', 'false');
        $('.coltest').show().children('.input_invoice').attr('disable', 'false');
        $('.showColumns').parents('table').removeAttr('class').addClass('expanded');
    }
}

/** OBTENCION DE DATOS */
/**  Obtiene el listado de proyectos */
function get_projects(pjId) {
    var pagina = 'Budget/listProjects';
    var par = `[{"pjId":"${pjId}"}]`;
    var tipo = 'json';
    var selector = put_projects;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de clientes */
function get_customers() {
    var pagina = 'Budget/listCustomers';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_customers;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de proyectos */
function get_version(pjtId) {
    var pagina = 'Budget/listVersion';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = put_version;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de productos */
function get_products(word, dstr, dend) {
    var pagina = 'Budget/listProducts';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = put_products;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de cotizaciones */
function get_budgets() {
    var pagina = 'Budget/listBudgets';
    var par = `[{"verId":"${vers}"}]`;
    var tipo = 'json';
    var selector = put_budgets;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de descuentos */
function get_discounts() {
    var pagina = 'Budget/listDiscounts';
    var par = `[{"level":"1"}]`;
    var tipo = 'json';
    var selector = put_discounts;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de relacionados al prducto*/
function get_products_related(id, tp) {
    var pagina = 'Budget/listProductsRelated';
    var par = `[{"prdId":"${id}","type":"${tp}"}]`;
    var tipo = 'json';
    var selector = put_products_related;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de projectos del producto  */
function get_StockProjects(prdId) {
    var pagina = 'ProjectPlans/stockProdcuts';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = put_StockProjects;
    fillField(pagina, par, tipo, selector);
}

/** LLENA DE DATOS */
/**  Llena el listado de proyectos */
function put_projects(dt) {
    if (dt[0].pjt_id > 0) {
        proj = dt;
        $.each(proj, function (v, u) {
            let H = ` <li id="P${u.pjt_id}" class="alive" data_content="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}">${u.pjt_name}</li>`;
            $('.finder_list-projects ul').append(H);
        });

        selector_projects(proj[0].pjId);
    } else {
        $('.finder_list-projects ul').html('');
    }
}

/**  Llena el listado de prductores */
function put_customers(dt) {
    cust = dt;
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = ` <li id="C${u.cus_id}" class="alive" data_content="${v}|${u.cut_name}">${u.cus_name}</li>`;
            $('.finder_list-customer ul').append(H);
        }
    });
    select_customer();
}

/**  Llena el listado de versiones */
function put_version(dt) {
    $('.version__list ul').html('');
    if (dt[0].ver_id != 0) {
        $('.version__list-title').html('DOCUEMNTOS');
        $.each(dt, function (v, u) {
            let H = `<li id="V${u.ver_id}"><span>${u.ver_code}</span><span> ${moment(u.ver_date).format('DD-MMM-yyyy')}</span></li> `;

            $('.version__list ul').append(H);
        });

        $('.version__list ul li').on('click', function () {
            let version = $(this).attr('id').substring(1, 100);
            vers = version;
            get_budgets();
            showButtonVersion('H');
            showButtonToPrint('S');
            showButtonToSave('S');
        });
    }
}

function selector_projects(pjtId) {
    $('.finder_list-projects ul li')
        .unbind('clic')
        .on('click', function () {
            let status = $(this).attr('class');
            if (status == 'alive') {
                let idSel = $(this).parents('.dato');
                let indx = $(this).attr('data_content').split('|')[0];
                let pj = proj[indx];

                $('.panel__name').css({visibility: 'visible'}).children('span').html(pj.pjt_name).attr('data_id', pj.pjt_id);

                $('#projectNumber').html(pj.pjt_number);
                $('#projectLocation').html(pj.pjt_location);
                $('#projectPeriod').html(`<span>${pj.pjt_date_start} - ${pj.pjt_date_end}</span><i class="fas fa-calendar-alt id="periodcalendar""></i>`);
                $('#projectLocationType').html(pj.loc_type_location);
                $('#projectType').html(pj.pjttp_name);
                fillProducer(pj.cus_parent);
                get_version(pj.pjt_id);

                $.each(cust, function (v, u) {
                    if (u.cus_id == pj.cus_id) {
                        $('#CustomerName').html(u.cus_name);
                        $('#CustomerType').html(u.cut_name);
                        $('#CustomerAddress').html(u.cus_address);
                        $('#CustomerEmail').html(u.cus_email);
                        $('#CustomerPhone').html(u.cus_phone);
                        $('#CustomerQualification').html(u.cus_qualificaton);
                    }
                });

                $('.projectfinder').trigger('click');
                $('.invoice_controlPanel .addSection').css({visibility: 'visible'});
            }
        });
}

function select_customer() {
    $('.finder_list-customer ul li')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            let indx = $(this).attr('data_content').split('|')[0];
            let type = $(this).attr('data_content').split('|')[1];
            let cs = cust[indx];

            $('#CustomerName').html(cs.cus_name);
            $('.finder_list-projects ul li').removeClass('alive');
            $.each(proj, function (v, u) {
                if (cs.cus_id == u.cus_id) {
                    let pjtId = u.pjt_id;
                    $(`#P${pjtId}`).addClass('alive');
                }
            });

            console.log(idSel, indx, type);
        });
}

/**  Llena el listado de descuentos */
function put_discounts(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.dis_discount}">${u.dis_discount * 100}%</option>`;
        $('#selDiscount').append(H);
    });
}

function fillProducer(cusId) {
    $.each(cust, function (v, u) {
        if (u.cus_id == cusId) {
            $('#CustomerProducer').html(u.cus_name);
        }
    });
}

// Muestra el listado de productos disponibles para su seleccion en la cotización
function showListProducts(item) {
    $('.invoice__section-products').fadeIn('slow');

    $('.productos__box-table').attr('data_section', item);

    $('#txtProductFinder')
        .unbind('keyup')
        .on('keyup', function () {
            let text = $(this).val().toUpperCase();
            sel_product(text);
        });

    $('.close_listProducts').on('click', function () {
        $('.invoice__section-products').fadeOut(400, function () {
            $('#listProductsTable table tbody').html('');
            $('#txtProductFinder').val('');
        });
    });
}

/** ++++++ Selecciona los productos del listado */
function sel_product(res) {
    res = res.toUpperCase();
    let rowCurr = $('#listProductsTable table tbody tr');
    let hearCnt = $('#listProductsTable table tbody tr th');

    if (res.length > 2) {
        let dstr = 0;
        let dend = 0;
        if (res.length == 3) {
            get_products(res.toUpperCase(), dstr, dend);
        } else {
            rowCurr.css({display: 'none'});
            rowCurr.each(function (index) {
                var cm = $(this).attr('data_content').toUpperCase().replace(/|/g, '');

                cm = omitirAcentos(cm);
                var cr = cm.indexOf(res);
                if (cr > -1) {
                    $(this).show();
                }
            });
        }
        // rowCurr.show();
    } else {
        $(`#listProductsTable table tbody`).html('');
        rowCurr.addClass('oculto');
    }
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

function put_products(dt) {
    prod = dt;
    $.each(dt, function (v, u) {
        let H = `
            <tr data_indx ="${v}" data_content="${u.prd_sku}|${u.prd_name.replace(/"/g, '')}|${u.sbc_name}">
                <th class="col_product" title="${u.prd_name}"><div class="elipsis">${u.prd_name}</div></th>
                <td class="col_quantity">${u.stock}</td>
                <td class="col_type">${u.prd_level}</td>
                <td class="col_category">${u.sbc_name}</td>
            </tr> `;
        $('#listProductsTable table tbody').append(H);
    });

    $('#listProductsTable table tbody tr').on('click', function () {
        let inx = $(this).attr('data_indx');
        fill_budget(prod[inx], vers, inx);
    });
}

function fill_budget(pr, vr, ix) {
    let nRows = $(`#listProductsTable table tbody tr`).length;
    load_budget(ix, nRows);
}

function load_budget(inx, bdgId) {
    let insurance = prod[inx].prd_insured == 0 ? 0 : 0.1;
    let produ = prod[inx].prd_name.replace(/\"/g, '°');
    let days = get_days_period();
    let section = $('.productos__box-table').attr('data_section').substring(2, 5);

    let par = `{
        "bdg_id"            : "${bdgId}",
        "bdg_prod_sku"      : "${prod[inx].prd_sku}",
        "bdg_prod_name"     : "${produ}",
        "bdg_prod_price"    : "${prod[inx].prd_price}",
        "bdg_quantity"      : "1",
        "bdg_days_base"     : "${days}",
        "bdg_days_cost"     : "${days}",
        "bdg_discount_base" : "0",
        "bdg_days_trip"     : "0",
        "bdg_discount_trip" : "0",
        "bdg_days_test"     : "0",
        "bdg_discount_test" : "0",
        "bdg_insured"       : "${insurance}",
        "bdg_prod_level"    : "${prod[inx].prd_level}",
        "prd_id"            : "${prod[inx].prd_id}",
        "bdg_stock"         : "${prod[inx].stock}",
        "sbc_name"          : "${prod[inx].sbc_name}",
        "bdg_section"       : "${section}"
    }
    `;

    let ky = registered_product('bdg' + prod[inx].prd_id);
    console.log(ky);
    if (ky == 0) {
        fill_budget_prods(par, days);
    }

    update_totals();
    showButtonVersion('S');
    showButtonToPrint('H');
    showButtonToSave('H');
}

function registered_product(id) {
    ky = 0;
    $('#invoiceTable table tbody tr').each(function () {
        let idp = $(this).attr('id');
        if (id == idp) {
            let qty = parseInt($(this).children('td.col_quantity').children('.input_invoice').val()) + 1;
            $(this).children('td.col_quantity').children('.input_invoice').val(qty);
            ky = 1;
        }
    });
    return ky;
}

function put_budgets(dt) {
    budg = dt;
    let days = get_days_period();

    $('.budgetRow').remove();

    if (budg[0].bdg_id > 0) {
        $.each(budg, function (v, u) {
            let jsn = JSON.stringify(u);
            fill_budget_prods(jsn, days);
        });
    }
    expandCollapseSection();
    update_totals();
    sectionShowHide();
}

// *************************************************
// Llena el listado de productos seleccionados
// *************************************************
function fill_budget_prods(jsn, days) {
    let pds = JSON.parse(jsn);
    let prdName = pds.bdg_prod_name.replace(/°/g, '"');
    let H = `
    <tr id="bdg${pds.prd_id}" data_sku="${pds.bdg_prod_sku}" data_insured="${pds.bdg_insured}" data_level="${pds.bdg_prod_level}" class="budgetRow">
        <th class="wclprod col_product product"><div class="elipsis" title="${prdName}">${prdName}</div><i class="fas fa-bars menu_product" id="mnu${pds.prd_id}"></i></th>
        <td class="wcldays col_quantity colbase quantityBase"><input type="text" class="input_invoice" value="${pds.bdg_quantity}" tabindex=1></td>
        <td class="wclnumb col_price colbase priceBase">${mkn(pds.bdg_prod_price, 'n')}</td>
        <td class="wcldays col_days colbase daysBase"><input type="text" class="input_invoice" value="${pds.bdg_days_base}" tabindex=2></td>
        <td class="wcldays col_days colbase daysCost"><input type="text" class="input_invoice" value="${pds.bdg_days_cost}" tabindex=3></td>
        <td class="wcldisc col_discount colbase discountBase"><i class="fas fa-caret-left selectioncell"></i><span class="discData">${
            parseFloat(pds.bdg_discount_base) * 100
        }<small>%</small></span></td>
        <td class="wclnumb col_cost colbase costBase">0.00</td>
        <td class="wcldays col_days coltrip daysTrip"><input type="text" class="input_invoice" value="${pds.bdg_days_trip}" tabindex=4></td>
        <td class="wcldisc col_discount coltrip discountTrip"><i class="fas fa-caret-left selectioncell"></i><span class="discData">${
            parseFloat(pds.bdg_discount_trip) * 100
        }<small>%</small></span></td>
        <td class="wclnumb col_cost coltrip costTrip">0.00</td>
        <td class="wcldays col_days coltest daysTest"><input type="text" class="input_invoice" value="${pds.bdg_days_test}" tabindex=5></td>
        <td class="wcldisc col_discount coltest discountTest"><i class="fas fa-caret-left selectioncell"></i><span class="discData">${
            parseFloat(pds.bdg_discount_test) * 100
        }<small>%</small></span></td>
        <td class="wclnumb col_cost coltest costTest">0.00</td>
        <td class="wclexpn col_caret colcontrol"></td>
    </tr>  
    `;
    $(`#SC${pds.bdg_section}`).show();
    $(`#SC${pds.bdg_section} tr.lastrow`).before(H);
    sticky_table();
    expandCollapseSection();
    activeInputSelector();
}

function activeInputSelector() {
    // Cambia el dato de cantidad y dias de cada celda
    $('.input_invoice')
        .unbind('blur')
        .on('blur', function () {
            update_totals();
            showButtonVersion('S');
            showButtonToPrint('H');
            showButtonToSave('H');
        });

    // Muestra los seletores generales de columna para cantidad, dias y descuentos
    $('.selectionInput')
        .unbind('click')
        .on('click', function () {
            let id = $(this);
            let section = id.attr('class').split(' ')[3];
            let typeSet = id.attr('class').split(' ')[4];

            let posLeft = id.offset().left;
            let posTop = id.offset().top - 20;
            let selector = section;

            if (typeSet == 'inpt') {
                $('.invoiceMainInput')
                    .unbind('mouseleave')
                    .css({top: posTop + 'px', left: posLeft + 'px'})
                    .fadeIn(400)
                    .on('mouseleave', function () {
                        $('.invoiceMainInput').fadeOut(400);
                    })
                    .children('.input_invoice')
                    .val('')
                    .unbind('keyup')
                    .on('keyup', function (e) {
                        let data = e.target.value;
                        console.log(selector);
                        $(`td.${selector} .input_invoice`).val(data);
                    });
            }
            if (typeSet == 'selt') {
                $('.invoiceMainSelect')
                    .unbind('mouseleave')
                    .css({top: posTop + 'px', left: posLeft + 'px'})
                    .fadeIn(400)
                    .on('mouseleave', function () {
                        $('.invoiceMainSelect').fadeOut(400);
                    })
                    .children('.input_invoice')
                    .val('')
                    .unbind('change')
                    .on('change', function (e) {
                        let data = e.target.value;
                        data = data * 100 + '<small>%</small>';
                        $(`td.${selector} .discData`).html(data);
                        $('.invoiceMainSelect').fadeOut(400);
                    });
            }
        });

    // Muestra los selectores dedescuento por celda
    $('.selectioncell')
        .unbind('click')
        .on('click', function () {
            let id = $(this);
            let section = id.parent().attr('class').split(' ')[2];

            let posLeft = id.offset().left - 90;
            let posTop = id.offset().top - 80;
            let selector = section;

            $('.invoiceMainSelect')
                .unbind('mouseleave')
                .css({top: posTop + 'px', left: posLeft + 'px'})
                .fadeIn(400)
                .on('mouseleave', function () {
                    $('.invoiceMainSelect').fadeOut(400);
                })
                .children('.input_invoice')
                .val('')
                .unbind('change')
                .on('change', function (e) {
                    let data = e.target.value;
                    data = data * 100 + '<small>%</small>';
                    id.parent().children('.discData').html(data);
                    $('.invoiceMainSelect').fadeOut(400);
                });
        });

    $('.menu_product')
        .unbind('click')
        .on('click', function () {
            let id = $(this);
            let posLeft = id.offset().left - 20;
            let posTop = id.offset().top - 100;

            $('.invoice__menu-products')
                .css({top: posTop + 'px', left: posLeft + 'px'})
                .fadeIn(400)
                .unbind('mouseleave')
                .on('mouseleave', function () {
                    $('.invoice__menu-products').fadeOut(400);
                })
                .children('ul')
                .children('li')
                .unbind('click')
                .on('click', function () {
                    let event = $(this).attr('class');
                    let bdgId = id.parents('tr').attr('id');
                    let type = id.parents('tr').attr('data_level');
                    console.log(bdgId, event);
                    switch (event) {
                        case 'event_killProduct':
                            killProduct(bdgId);
                            break;
                        case 'event_InfoProduct':
                            infoProduct(bdgId, type);
                            break;
                        case 'event_StokProduct':
                            stockProduct(bdgId);
                            break;
                        default:
                    }
                });
        });
}

// Elimina el registro de la cotizacion
function killProduct(bdgId) {
    let H = `<div class="emergent__warning">
                <p>¿Realmente requieres de eliminar este producto?</p>
                <button id="killYes" class="btn btn-primary">Si</button>  
                <button id="killNo" class="btn btn-danger">No</button>  
            </div>`;

    $('body').append(H);

    $('.emergent__warning .btn').on('click', function () {
        let obj = $(this);
        let resp = obj.attr('id');
        if (resp == 'killYes') {
            $('#' + bdgId).fadeOut(500, function () {
                $('#' + bdgId).remove();
                update_totals();
                showButtonVersion('S');
                showButtonToPrint('H');
                showButtonToSave('H');
            });
        }
        obj.parent().remove();
    });
}

function infoProduct(bdgId, type) {
    get_products_related(bdgId.substring(3, 20), type);

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({'z-index': 401});
    let template = $('#infoProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    // template.show();
    $('.invoice__modal-general .modal__header-concept').html('Productos Relacionados');
    closeModals();
}

function put_products_related(dt) {
    $.each(dt, function (v, u) {
        let levelProduct = u.prd_level == 'P' ? 'class="levelProd"' : '';
        let H = `
            <tr ${levelProduct}>
                <td>${u.prd_sku}</td>
                <td>${u.prd_level}</td>
                <td>${u.prd_name}</td>
            </tr>
        `;
        $('.invoice__modal-general table tbody').append(H);
    });
    $(`.invoice__modal-general table`).sticky({
        top: 'thead tr:first-child',
    });
}

function stockProduct(bdgId, type) {
    get_StockProjects(bdgId.substring(3, 20));

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({'z-index': 401});
    let template = $('#stockProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('inventarios del producto');
    closeModals();
}

function put_StockProjects(dt) {
    console.log(dt);
    $.each(dt, function (v, u) {
        let situation = u.ser_situation != 'D' ? 'class="levelSituation"' : '';
        let H = `
            <tr ${situation}>
                <td>${u.ser_sku}</td>
                <td>${u.ser_serial_number}</td>
                <td>${u.ser_situation}</td>
                <td>${u.pjt_name}</td>
                <td>${u.pjtpd_day_start}</td>
                <td>${u.pjtpd_day_end}</td>
            </tr>
        `;
        $('.invoice__modal-general table tbody').append(H);
    });

    $(`.invoice__modal-general table`).sticky({
        top: 'thead tr:first-child',
    });
}

/**  ++++  Obtiene los días definidos para el proyectos */
function get_days_period() {
    let Period = $('#projectPeriod span').text();
    let start = moment(Period.split(' - ')[0], 'DD/MM/YYYY');
    let end = moment(Period.split(' - ')[1], 'DD/MM/YYYY');
    let days = end.diff(start, 'days') + 1;

    return days;
}

// Da formato a los numero
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

// Actualiza los totales
function update_totals() {
    let costbase = 0,
        costtrip = 0,
        costtest = 0,
        costassu = 0,
        totlCost = 0;
    $('.budgetRow').each(function (v) {
        let pid = $(this).attr('id');

        let qtybs = parseInt($(this).children('td.quantityBase').children('.input_invoice').val());
        let prcbs = parseFloat(pure_num($(this).children('td.priceBase').text()));
        let daybs = parseInt($(this).children('td.daysCost').children('.input_invoice').val());
        let desbs = parseFloat($(this).children('td.discountBase').text());
        let assur = $(this).attr('data_insured');

        stt01 = qtybs * prcbs; // Importe de cantidad x precio
        stt02 = stt01 * daybs; // Costo de Importe x días base
        stt03 = desbs / 100; // Porcentaje de descuento base
        stt04 = stt02 * stt03; // Costo de Importe x porcentaje descuento base
        cstbs = stt02 - stt04; // Costo base
        costbase += cstbs; // Total de Costo Base

        $(this).children('.costBase').html(mkn(cstbs, 'n'));

        let daytr = parseInt($(this).children('td.daysTrip').children('.input_invoice').val());
        let destr = parseFloat($(this).children('td.discountTrip').text());

        stt05 = stt01 * daytr; // Costo de Importe x dias viaje
        stt06 = destr / 100; // Porcentaje de descuento viaje
        stt07 = stt05 * stt06; // Costo de Importe x porcentaje descuento viaje
        csttr = stt05 - stt07; // Costo viaje
        costtrip += csttr; // Total de Costo Viaje

        $(this).children('.costTrip').html(mkn(csttr, 'n'));

        let dayts = parseInt($(this).children('td.daysTest').children('.input_invoice').val());
        let dests = parseFloat($(this).children('td.discountTest').text());

        stt08 = stt01 * dayts; // Costo de Importe x dias prueba
        stt09 = dests / 100; // Porcentaje de descuento prueba
        stt10 = stt08 * stt09; // Costo de Importe x porcentaje prueba
        cstts = stt08 - stt10; // Costo prueba
        costtest += cstts; // Total de Costo Prueba

        $(this).children('.costTest').html(mkn(cstts, 'n'));

        assre = stt01 * assur;
        costassu += assre; // Total de Seguro
    });

    $('#costBase').html(mkn(costbase, 'n'));
    $('#costTrip').html(mkn(costtrip, 'n'));
    $('#costTest').html(mkn(costtest, 'n'));
    $('#insuTotal').html(mkn(costassu, 'n'));

    totlCost = costbase + costtrip + costtest + costassu;

    $('#costTotal').html(mkn(totlCost, 'n'));
}

/** ***** MUESTRA Y OCULTA BOTONES ******* */
function showButtonVersion(acc) {
    elm = $('.version__button .invoice_button');
    acc == 'S' ? elm.css({visibility: 'visible'}) : elm.css({visibility: 'hidden'});
}
function showButtonToPrint(acc) {
    elm = $('.invoice_controlPanel .toPrint');
    acc == 'S' ? elm.css({visibility: 'visible'}) : elm.css({visibility: 'hidden'});
}
function showButtonToSave(acc) {
    elm = $('.invoice_controlPanel .toSave');
    acc == 'S' ? elm.css({visibility: 'visible'}) : elm.css({visibility: 'hidden'});
}

/** ***** MUESTRA Y OCULTA ELEMENTOS DEL MENU DE SECCIONES ******** */
function sectionShowHide() {
    $('#invoiceTable table tbody.sections_products').each(function () {
        let status = $(this).css('display');
        let id = $(this).attr('id').substring(2, 5);
        if (status == 'table-row-group') {
            $(`.invoice__section .menu-sections li[data_option="${id}"] `).css({display: 'none'});
        } else {
            $(`.invoice__section .menu-sections li[data_option="${id}"] `).css({display: 'block'});
        }
    });
}

/** ***** CIERRA MODALES ******* */
function closeModals(table) {
    $('.invoice__modal-general .modal__header .closeModal')
        .unbind('click')
        .on('click', function () {
            $('.invoice__modal-general').slideUp(400, function () {
                $('.invoice__modalBackgound').fadeOut(400);
                $('.invoice__modal-general .modal__body').html('');
            });
        });
}

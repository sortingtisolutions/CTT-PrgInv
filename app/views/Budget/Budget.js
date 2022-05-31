let cust, proj, prod, vers, budg, tpprd, relc, proPar;
var swpjt = 0;
let viewStatus = 'C'; // Columns Trip & Test C-Colalapsed, E-Expanded

$('document').ready(function () {
    url = getAbsolutePath();
    verifica_usuario();
    inicial();
});

function inicial() {
    stickyTable();
    eventsAction();
    getProjects('0');
    getProjectsParents();
    getCustomers();
    getCustomersOwner();
    getDiscounts();
    getProjectType();
}

function stickyTable() {
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
                $('.invoice__section-details').css({top: '-100%', bottom: '100%'});
                $(this).removeClass('rotate180');
            } else {
                $('.invoice__section-details').css({top: '32px', bottom: '0px'});
                $(this).addClass('rotate180');
            }
        });

    // Despliega la sección de seleccion de proyecto y cliente
    $('.projectfinder')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-details').css({top: '-100%', bottom: '100%'});
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

    // Despliega la lista de productos para agregar a la cotización
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

    // Guarda nueva version
    $('.version__button')
        .unbind('click')
        .on('click', function () {
            let nRows = $('.invoice__box-table table tbody tr.budgetRow').length;
            if (nRows > 0) {
                let pjtId = $('.version_current').attr('data_project');
                let verCurr = $('.sidebar__versions .version__list ul li:first').attr('data_code');
                if (verCurr == undefined) {
                    verCurr = 'V0';
                }
                let vr = parseInt(verCurr.substring(1, 10));
                let verNext = 'C' + refil(vr + 1, 4);

                let par = `
                [{
                    "pjtId"           : "${pjtId}",
                    "verCode"         : "${verNext}"
                }]`;

                var pagina = 'Budget/SaveVersion';
                var tipo = 'html';
                var selector = saveBudget;
                fillField(pagina, par, tipo, selector);
            }
        });

    // Edita los datos del proyecto
    $('#btnEditProject')
        .unbind('click')
        .on('click', function () {
            let pjtId = $('.projectInformation').attr('data_project');
            editProject(pjtId);
        });
    // Agrega nuevo proyecto
    $('#btnNewProject')
        .unbind('click')
        .on('click', function () {
            newProject();
        });

    // Agrega nueva cotización
    $('#newQuote')
        .unbind('click')
        .on('click', function () {
            window.location = 'Budget';
        });

    // Agrega nueva cotización
    $('#newQuote')
        .unbind('click')
        .on('click', function () {
            window.location = 'Budget';
        });

    // Agrega nueva cotización
    $('.toSave')
        .unbind('click')
        .on('click', function () {
            let pjtId = $('.version_current').attr('data_project');
            promoteProject(pjtId);
        });
    // Imprime la cotización en pantalla
    $('.toPrint')
        .unbind('on')
        .on('click', function () {
            let verId = $('.version_current').attr('data_version');
            printBudget(verId);
        });

    // Busca los elementos que coincidan con lo escrito el input de cliente y poyecto
    $('.inputSearch')
        .unbind('keyup')
        .on('keyup', function () {
            let id = $(this);
            let obj = id.parents('.finder__box').attr('id');
            let txt = id.val().toUpperCase();
            sel_items(txt, obj);
        });

    $('.cleanInput')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('.finder__box').children('.invoiceInput');
            id.val('');
            id.trigger('keyup');
        });

    // Abre el modal de comentarios
    $('.sidebar__comments .toComment')
        .unbind('click')
        .on('click', function () {
            showModalComments();
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
function getProjects(pjId) {
    swpjt = 0;
    var pagina = 'Budget/listProjects';
    var par = `[{"pjId":"${pjId}"}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de proyectos padre */
function getProjectsParents() {
    swpjt = 0;
    var pagina = 'Budget/listProjectsParents';
    var par = `[{"pjId":""}]`;
    var tipo = 'json';
    var selector = putProjectsParents;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de clientes */
function getCustomers() {
    var pagina = 'Budget/listCustomers';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = putCustomers;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene los Id's de los elementos relacionados con la seleccion del cliente */
function getCustomersOwner() {
    var pagina = 'Budget/listCustomersOwn';
    var par = `[{"cusId":"", "cutId":""}]`;
    var tipo = 'json';
    var selector = putCustomersOwner;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de proyectos */
function getVersion(pjtId) {
    var pagina = 'Budget/listVersion';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = putVersion;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de productos */
function getProducts(word, dstr, dend) {
    var pagina = 'Budget/listProducts';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de cotizaciones */
function getBudgets() {
    var pagina = 'Budget/listBudgets';
    var par = `[{"verId":"${vers}"}]`;
    var tipo = 'json';
    var selector = putBudgets;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de descuentos */
function getDiscounts() {
    var pagina = 'Budget/listDiscounts';
    var par = `[{"level":"1"}]`;
    var tipo = 'json';
    var selector = putDiscounts;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de relacionados al prducto*/
function getProductsRelated(id, tp) {
    var pagina = 'Budget/listProductsRelated';
    var par = `[{"prdId":"${id}","type":"${tp}"}]`;
    var tipo = 'json';
    var selector = putProductsRelated;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de projectos del producto  */
function getStockProjects(prdId) {
    var pagina = 'ProjectPlans/stockProdcuts';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putStockProjects;
    fillField(pagina, par, tipo, selector);
}
/** Obtiene el listado de los tipos de proyecto */
function getProjectType() {
    var pagina = 'Budget/listProjectsType';
    var par = `[{"pjt":""}]`;
    var tipo = 'json';
    var selector = putProjectsType;
    fillField(pagina, par, tipo, selector);
}
/** Obtiene el listado de los comentarios del proyecto */
function getComments(pjtId) {
    var pagina = 'Budget/listComments';
    var par = `[{"pjId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = putComments;
    fillField(pagina, par, tipo, selector);
}

/** LLENA DE DATOS */
/**  Llena el listado de proyectos */
function putProjects(dt) {
    if (dt[0].pjt_id > 0) {
        proj = dt;
        $.each(proj, function (v, u) {
            let H = ` <li id="P${u.pjt_id}" class="alive" data_content="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}">${u.pjt_name}</li>`;
            $('.finder_list-projects ul').append(H);
        });

        selectorProjects(proj[0].pjId);
        swpjt = 1;
    } else {
        $('.finder_list-projects ul').html('');
    }
}
/**  Llena el listado de proyectos padre */
function putProjectsParents(dt) {
    proPar = dt;
    if (dt[0].pjt_id > 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.pjt_id}">${u.pjt_name}</option>`;
            $('#txtProjectParent').append(H);
        });
    }
}

/**  Llena el listado de prductores */
function putCustomers(dt) {
    cust = dt;
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = ` <li id="C${u.cus_id}" class="alive" data_content="${v}|${u.cut_name}">${u.cus_name}</li>`;
            $('.finder_list-customer ul').append(H);
        }
    });
    selectCustomer();
}
/**  Llena el listado de prductores */
function putCustomersOwner(dt) {
    relc = dt;
}

/**  Llena el listado de descuentos */
function putDiscounts(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.dis_discount}">${u.dis_discount * 100}%</option>`;
        $('#selDiscount').append(H);
    });
}

/**  Llena el listado de versiones */
function putVersion(dt) {
    $('.version__list ul').html('');
    if (dt[0].ver_id != 0) {
        $('.version__list-title').html('DOCUMENTOS');
        let firstVersion = dt[0].ver_id;
        let caret = '';
        $.each(dt, function (v, u) {
            caret = firstVersion == u.ver_id ? '<i class="fas fa-caret-right"></i>' : '';
            let H = `<li id="V${u.ver_id}" data_code="${u.ver_code}">
                        <span class="element_caret">${caret}</span>
                        <span class="element_code">${u.ver_code}</span>
                        <span class="element_date"> ${moment(u.ver_date).format('DD-MMM-yyyy')}</span>
                    </li> `;

            $('.version__list ul').append(H);
        });

        $('.version__list ul li').on('click', function () {
            let version = $(this).attr('id').substring(1, 100);
            let versionCode = $(this).attr('data_code');
            vers = version;

            $('.element_caret').html('');
            $('#V' + version + ' .element_caret').html('<i class="fas fa-caret-right"></i>');

            $('.version_current')
                .html('Version: ' + versionCode)
                .attr('data_version', version)
                .attr('data_versionCode', versionCode);

            getBudgets();
            showButtonVersion('H');
            showButtonComments('S');
            showButtonToPrint('S');
            showButtonToSave('S');
        });

        $('#V' + firstVersion).trigger('click');
    }
}

/** Llena el listado de los tipos de proyecto */
function putProjectsType(dt) {
    tpprd = dt;
}

function selectorProjects(pjId) {
    $('.finder_list-projects ul li')
        .unbind('click')
        .on('click', function () {
            cleanQuoteTable();
            showButtonVersion('H');
            showButtonToPrint('H');
            showButtonToSave('H');
            actionSelProject($(this));
            $('.projectfinder').trigger('click');
        });
}

function actionSelProject(obj) {
    let status = obj.attr('class');

    if (status == 'alive') {
        let idSel = obj.parents('.dato');
        let indx = obj.attr('data_content').split('|')[0];
        let pj = proj[indx];

        $('.panel__name').css({visibility: 'visible'}).children('span').html(pj.pjt_name).attr('data_id', pj.pjt_id).attr('title', pj.pjt_name);
        $('#projectNumber').html(pj.pjt_number);
        $('#projectLocation').html(pj.pjt_location);
        $('#projectPeriod').html(`<span>${pj.pjt_date_start} - ${pj.pjt_date_end}</span><i class="fas fa-calendar-alt id="periodcalendar"></i>`);
        $('#projectLocationType').html(pj.loc_type_location);
        $('#projectType').html(pj.pjttp_name);
        fillProducer(pj.cus_parent);
        getVersion(pj.pjt_id);
        getCalendarPeriods(pj);

        $('.version_current').attr('data_project', pj.pjt_id);
        $('.projectInformation').attr('data_project', pj.pjt_id);

        $.each(cust, function (v, u) {
            if (u.cus_id == pj.cus_id) {
                $('#CustomerName').html(u.cus_name);
                $('#CustomerType').html(`<span>${u.cut_name}</span>`);
                $('#CustomerAddress').html(u.cus_address);
                $('#CustomerEmail').html(u.cus_email);
                $('#CustomerPhone').html(u.cus_phone);
                $('#CustomerQualification').html(u.cus_qualificaton);
            }
        });

        $('.invoice_controlPanel .addSection').css({visibility: 'visible'});
    }
}

function getCalendarPeriods(pj) {
    let fecha = moment(Date()).format('DD/MM/YYYY');
    $('#projectPeriod').daterangepicker(
        {
            showDropdowns: true,
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
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                firstDay: 1,
            },
            showCustomRangeLabel: false,
            singleDatePicker: false,
            startDate: fecha,
            endDate: fecha,
            minDate: fecha,
            opens: 'left',
        },
        function (start, end, label) {
            $('#projectPeriod span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
            let projDateStart = start.format('YYYYMMDD');
            let projDateEnd = end.format('YYYYMMDD');

            let par = `
        [{
            "pjtDateStart"  : "${projDateStart}",
            "pjtDateEnd"    : "${projDateEnd}",
            "pjtId"         : "${pj.pjt_id}"
        }]
        `;
            var pagina = 'Budget/UpdatePeriodProject';
            var tipo = 'html';
            var selector = SetUpdatePeriodProject;
            fillField(pagina, par, tipo, selector);
        }
    );
}

function SetUpdatePeriodProject(dt) {
    console.log(dt);
    let topDays = getDaysPeriod();
    $('.invoice__box-table table tbody tr.budgetRow').each(function (v) {
        let tr = $(this);
        console.log(tr.attr('id'));
        let bdgDaysBase = tr.children('td.daysBase').children('.input_invoice').val();
        console.log(bdgDaysBase, topDays);
        if (bdgDaysBase > topDays) {
            tr.children('td.daysBase').children('.input_invoice').val(topDays);
        }
    });

    updateTotals();
    showButtonVersion('S');
}

function selectCustomer() {
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
            selProduct(text);
        });

    $('.close_listProducts').on('click', function () {
        $('.invoice__section-products').fadeOut(400, function () {
            $('#listProductsTable table tbody').html('');
            $('#txtProductFinder').val('');
        });
    });
}

/** ++++++ Selecciona los productos del listado */
function selProduct(res) {
    res = res.toUpperCase();
    let rowCurr = $('#listProductsTable table tbody tr');
    let hearCnt = $('#listProductsTable table tbody tr th');

    if (res.length > 2) {
        let dstr = 0;
        let dend = 0;
        if (res.length == 3) {
            getProducts(res.toUpperCase(), dstr, dend);
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

function putProducts(dt) {
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
        fillBudget(prod[inx], vers, inx);
    });
}

function fillBudget(pr, vr, ix) {
    let nRows = $(`#listProductsTable table tbody tr`).length;
    loadBudget(ix, nRows);
}

function loadBudget(inx, bdgId) {
    let insurance = prod[inx].prd_insured == 0 ? 0 : 0.1;
    let produ = prod[inx].prd_name.replace(/\"/g, '°');
    let days = getDaysPeriod();
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

    let ky = registeredProduct('bdg' + prod[inx].prd_id);
    console.log(ky);
    if (ky == 0) {
        fillBudgetProds(par, days);
    }

    updateTotals();
    showButtonVersion('S');
    showButtonToPrint('H');
    showButtonToSave('H');
}

function registeredProduct(id) {
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

function putBudgets(dt) {
    budg = dt;
    let days = getDaysPeriod();

    $('.budgetRow').remove();

    if (budg[0].bdg_id > 0) {
        $.each(budg, function (v, u) {
            let jsn = JSON.stringify(u);
            fillBudgetProds(jsn, days);
        });
    }
    expandCollapseSection();
    updateTotals();
    sectionShowHide();
}

// *************************************************
// Llena el listado de productos seleccionados
// *************************************************
function fillBudgetProds(jsn, days) {
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
    stickyTable();
    expandCollapseSection();
    activeInputSelector();
}

function activeInputSelector() {
    // Cambia el dato de cantidad y dias de cada celda
    $('.input_invoice')
        .unbind('blur')
        .on('blur', function () {
            updateTotals();
            showButtonToPrint('H');
            showButtonToSave('H');

            let bgRows = $('#invoiceTable table tbody tr.budgetRow').length;
            if (bgRows > 0) {
                showButtonVersion('S');
            }
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
            let nRows = $('.invoice__box-table table tbody tr.budgetRow').length;
            if (nRows > 0) {
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
                updateTotals();
                showButtonVersion('S');
                showButtonToPrint('H');
                showButtonToSave('H');
            });
        }
        obj.parent().remove();
    });
}

// Muestra la información del producto seleccionado
function infoProduct(bdgId, type) {
    getProductsRelated(bdgId.substring(3, 20), type);

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({'z-index': 401});
    let template = $('#infoProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    // template.show();
    $('.invoice__modal-general .modal__header-concept').html('Productos Relacionados');
    closeModals();
}
// Muestra la información de productos relacionados
function putProductsRelated(dt) {
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
// Muestra el inventario de productos
function stockProduct(bdgId, type) {
    getStockProjects(bdgId.substring(3, 20));

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({'z-index': 401});
    let template = $('#stockProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('inventarios del producto');
    closeModals();
}

function putStockProjects(dt) {
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

function editProject(pjtId) {
    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({'z-index': 401});
    let template = $('#dataProjectTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('Edición de datos del proyecto');
    closeModals();
    fillContent();
    fillData();
}

function fillContent() {
    // configura el calendario de seleccion de periodos
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
                monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                firstDay: 1,
            },
            showCustomRangeLabel: false,
            singleDatePicker: false,
            startDate: fecha,
            endDate: fecha,
            minDate: fecha,
        },
        function (start, end, label) {
            $('#txtPeriodProjectEdt').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
            looseAlert($('#txtPeriodProjectEdt').parent());

            // $('#txtPeriodProject').parent().children('span').html('');
            // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        }
    );
    // Llena el selector de tipo de proyecto
    $.each(tpprd, function (v, u) {
        let H = `<option value="${u.pjttp_id}"> ${u.pjttp_name}</option>`;
        $('#txtTypeProjectEdt').append(H);
    });
    // Llena el selector de clientes
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = `<option value="${u.cus_id}"> ${u.cus_name}</option>`;
            $('#txtCustomerEdt').append(H);
        }
    });
    // Llena el selector de relacion de clientes
    $.each(cust, function (v, u) {
        if (u.cut_id == 2) {
            let H = `<option value="${u.cus_id}"> ${u.cus_name}</option>`;
            $('#txtCustomerRelEdt').append(H);
        }
    });

    $('.textbox')
        .unbind('focus')
        .on('focus', function () {
            let group = $(this).parent();
            looseAlert(group);
        });
}

function fillData() {
    $('.textbox__result').show();
    $('.project__selection').hide();

    let pj = proj;
    $('#txtProjectIdEdt').val(pj[0].pjt_id);
    $('#txtProjectEdt').val(pj[0].pjt_name);
    $('#txtPeriodProjectEdt').val(pj[0].pjt_date_start + ' - ' + pj[0].pjt_date_end);
    $('#txtTimeProject').val(pj[0].pjt_time);
    $('#txtLocationEdt').val(pj[0].pjt_location);
    $('#txtCustomerOwnerEdt').val(pj[0].cuo_id);
    $(`#txtTypeProjectEdt option[value = "${pj[0].pjttp_id}"]`).attr('selected', 'selected');
    $(`#txtTypeLocationEdt option[value = "${pj[0].loc_id}"]`).attr('selected', 'selected');
    $(`#txtCustomerEdt option[value = "${pj[0].cus_id}"]`).attr('selected', 'selected');
    $(`#txtCustomerRelEdt option[value = "${pj[0].cus_parent}"]`).attr('selected', 'selected');

    let depend = pj[0].pjt_parent;
    let boxDepend = depend != '0' ? 'PROYECTO ADJUNTO' : 'PROYECTO UNICO';

    $(`#resProjectDepend`).html(boxDepend);

    let selection = pj[0].pjt_parent;
    if (selection == 1) {
        $('#txtProjectParent').parents('tr').removeAttr('class');
        $(`#txtProjectParent option[value = "${selection}"]`).attr('selected', 'selected');
        let parent = '';
        $.each(proPar, function (v, u) {
            if (pj[0].pjt_parent == u.pjt_id) {
                parent = u.pjt_name;
            }
        });
        $('#resProjectParent').html(parent);
    } else {
        $('#txtProjectParent').parents('tr').addClass('hide');
        $(`#txtProjectParent option[value = "0"]`).attr('selected', 'selected');
    }

    $('#saveProject').html('Guardar cambios').removeAttr('class').addClass('bn btn-ok update');

    $('#saveProject.update')
        .unbind('click')
        .on('click', function () {
            let ky = validatorFields($('#formProject'));
            if (ky == 0) {
                let projId = $('#txtProjectIdEdt').val();
                let projName = $('#txtProjectEdt').val();
                let projLocation = $('#txtLocationEdt').val();
                let cuoId = $('#txtCustomerOwnerEdt').val();
                let projLocationTypeValue = $('#txtTypeLocationEdt option:selected').val();
                let projPeriod = $('#txtPeriodProjectEdt').val();
                let projTime = $('#txtTimeProject').val();
                let projType = $('#txtTypeProjectEdt option:selected').val();
                let cusCte = $('#txtCustomerEdt option:selected').val();
                let cusCteRel = $('#txtCustomerRelEdt option:selected').val();

                let projDateStart = moment(projPeriod.split(' - ')[0], 'DD/MM/YYYY').format('YYYYMMDD');
                let projDateEnd = moment(projPeriod.split(' - ')[1], 'DD/MM/YYYY').format('YYYYMMDD');

                let par = `
                [{
                    "projId"        : "${projId}",
                    "pjtName"       : "${projName.toUpperCase()}",
                    "pjtLocation"   : "${projLocation.toUpperCase()}",
                    "pjtDateStart"  : "${projDateStart}",
                    "pjtDateEnd"    : "${projDateEnd}",
                    "pjtTime"       : "${projTime}",
                    "pjtType"       : "${projType}",
                    "locId"         : "${projLocationTypeValue}",
                    "cuoId"         : "${cuoId}",
                    "cusId"         : "${cusCte}",
                    "cusParent"     : "${cusCteRel}"
                }]`;

                // console.log(par);
                var pagina = 'Budget/UpdateProject';
                var tipo = 'html';
                var selector = loadProject;
                //   fillField(pagina, par, tipo, selector);
            }
        });
}

function loadProject(dt) {
    $('.finder_list-projects ul').html('');
    getProjects(dt);
    waitShowProject(dt);
    automaticCloseModal();
}

function waitShowProject(pjtId) {
    if (swpjt == 1) {
        let obj = $('#P' + pjtId);
        actionSelProject(obj);
    } else {
        setTimeout(() => {
            waitShowProject(pjtId);
        }, 500);
    }
}

function newProject() {
    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({'z-index': 401});
    let template = $('#dataProjectTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('Nuevo proyecto');
    $('#saveProject').html('Guardar proyecto').removeAttr('class').addClass('bn btn-ok insert');
    closeModals();
    fillContent();
    actionNewProject();

    $('.textbox__result').hide();
    $('.project__selection').show();

    $('#txtProjectDepend')
        .unbind('change')
        .on('change', function () {
            let selection = $(this).val();
            if (selection == 1) {
                $('#txtProjectParent').parents('tr').removeAttr('class');
            } else {
                $('#txtProjectParent').parents('tr').addClass('hide');
                $(`#txtProjectParent option[value = "0"]`).attr('selected', 'selected');
            }
        });
}
function actionNewProject() {
    $('#saveProject.insert')
        .unbind('click')
        .on('click', function () {
            let ky = validatorFields($('#formProject'));
            if (ky == 0) {
                let projId = $('#txtProjectIdEdt').val();
                let projName = $('#txtProjectEdt').val();
                let projLocation = $('#txtLocationEdt').val();
                let projLocationTypeValue = $('#txtTypeLocationEdt option:selected').val();
                let projPeriod = $('#txtPeriodProjectEdt').val();
                let projTime = $('#txtTimeProject').val();
                let projType = $('#txtTypeProjectEdt option:selected').val();
                let cusCte = $('#txtCustomerEdt option:selected').val();
                let cusCteRel = $('#txtCustomerRelEdt option:selected').val();
                let proDepend = $('#txtProjectDepend option:selected').val();

                let projDateStart = moment(projPeriod.split(' - ')[0], 'DD/MM/YYYY').format('YYYYMMDD');
                let projDateEnd = moment(projPeriod.split(' - ')[1], 'DD/MM/YYYY').format('YYYYMMDD');

                let proStatus = '';
                let proParent = '';

                switch (proDepend) {
                    case '0':
                        proStatus = 1;
                        proParent = 0;
                        break;
                    case '1':
                        proStatus = 1;
                        proParent = $('#txtProjectParent option:selected').val();
                        break;
                    case '2':
                        proStatus = 40;
                        proParent = 0;
                        break;
                    default:
                }

                let cuoId = 0;
                $.each(relc, function (v, u) {
                    if (cusCte == u.cus_id && cusCteRel == u.cus_parent) {
                        cuoId = u.cuo_id;
                    }
                });

                let par = `
            [{
                "projId"        : "${projId}",
                "pjtName"       : "${projName.toUpperCase()}",
                "pjtLocation"   : "${projLocation.toUpperCase()}",
                "pjtDateStart"  : "${projDateStart}",
                "pjtDateEnd"    : "${projDateEnd}",
                "pjtTime"       : "${projTime}",
                "pjtType"       : "${projType}",
                "locId"         : "${projLocationTypeValue}",
                "cuoId"         : "${cuoId}",
                "cusId"         : "${cusCte}",
                "cusParent"     : "${cusCteRel}",
                "pjtParent"     : "${proParent}",
                "pjtStatus"     : "${proStatus}"
            }]
            `;

                var pagina = 'Budget/SaveProject';
                var tipo = 'html';
                var selector = loadProject;
                fillField(pagina, par, tipo, selector);
            }
        });
}

// *************************************************
// Lista los comentarios al proyecto
// *************************************************
function showModalComments() {
    let template = $('#commentsTemplates');
    let pjtId = $('.version_current').attr('data_project');

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({'z-index': 401});
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('Comentarios');
    closeModals();
    fillComments(pjtId);
}

function fillComments(pjtId) {
    console.log(pjtId);
    // Agrega nuevo comentario
    $('#newComment')
        .unbind('click')
        .on('click', function () {
            console.log('Comentraios');
            let pjtId = $('.version_current').attr('data_project');

            let comSrc = 'projects';
            let comComment = $('#txtComment').val();

            if (comComment.length > 3) {
                let par = `
                    [{
                        "comSrc"        : "${comSrc}",
                        "comComment"    : "${comComment}",
                        "pjtId"         : "${pjtId}"
                    }]
                    `;
                var pagina = 'Budget/InsertComment';
                var tipo = 'json';
                console.log(par);
                var selector = addComment;
                fillField(pagina, par, tipo, selector);
            }
        });

    getComments(pjtId);
}
function putComments(dt) {
    $('.comments__list').html('');
    if (dt[0].com_id > 0) {
        $.each(dt, function (v, u) {
            console.log(u);
            fillCommnetElements(u);
        });
    }
}

function fillCommnetElements(u) {
    console.log(u.com_comment);
    let H = `
        <div class="comment__group">
            <div class="comment__box comment__box-date"><i class="far fa-clock"></i>${u.com_date}</div>
            <div class="comment__box comment__box-text">${u.com_comment}</div>
            <div class="comment__box comment__box-user">${u.com_user}</div>
        </div>
    `;

    $('.comments__list').prepend(H);
}

function addComment(dt) {
    console.log(dt[0]);
    fillCommnetElements(dt[0]);
    $('#txtComment').val('');
}

// *************************************************
// imprime la cotización
// *************************************************

function printBudget(verId) {
    let user = Cookies.get('user').split('|');
    let v = verId;
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');

    console.log(user);

    window.open(`${url}app/views/Budget/BudgetReport.php?v=${v}&u=${u}&n=${n}&h=${h}`, '_blank');
}

// *************************************************
// Guarda la cotización seleccionada
// *************************************************
function saveBudget(dt) {
    let verId = dt.split('|')[0];
    let pjtId = dt.split('|')[1];

    $('#invoiceTable table tbody tr.budgetRow').each(function () {
        let tr = $(this);
        let prdId = tr.attr('id').substring(3, 10);
        let bdgSku = tr.attr('data_sku');
        let bdgLevel = tr.attr('data_level');
        let bdgProduct = tr.children('th.product').children('.elipsis').text().replace(/\"/g, '°');
        let bdgQuantity = tr.children('td.quantityBase').children('.input_invoice').val();
        let bdgPriceBase = tr.children('td.priceBase').text().replace(/,/g, '');
        let bdgDaysBase = tr.children('td.daysBase').children('.input_invoice').val();
        let bdgDaysCost = tr.children('td.daysCost').children('.input_invoice').val();
        let bdgDesctBase = parseFloat(tr.children('td.discountBase').text()) / 100;
        let bdgDaysTrip = tr.children('td.daysTrip').children('.input_invoice').val();
        let bdgDescTrip = parseFloat(tr.children('td.discountTrip').text()) / 100;
        let bdgDaysTest = tr.children('td.daysTest').children('.input_invoice').val();
        let bdgDescTest = parseFloat(tr.children('td.discountTest').text()) / 100;
        let bdgInsured = tr.attr('data_insured');
        let bdgSection = tr.parents('tbody').attr('id').substring(2, 5);

        if (bdgSku != undefined) {
            let par = `
            [{
                "bdgSku"          : "${bdgSku}",
                "bdgLevel"        : "${bdgLevel}",
                "bdgSection"      : "${bdgSection}",
                "bdgProduc"       : "${bdgProduct.toUpperCase()}",
                "bdgPricBs"       : "${bdgPriceBase}",
                "bdgQtysBs"       : "${bdgQuantity}",
                "bdgDaysBs"       : "${bdgDaysBase}",
                "bdgDaysCs"       : "${bdgDaysCost}",
                "bdgDescBs"       : "${bdgDesctBase}",
                "bdgDaysTp"       : "${bdgDaysTrip}",
                "bdgDescTp"       : "${bdgDescTrip}",
                "bdgDaysTr"       : "${bdgDaysTest}",
                "bdgDescTr"       : "${bdgDescTest}",
                "bdgInsured"      : "${bdgInsured}",
                "verId"           : "${verId}",
                "prdId"           : "${prdId}",
                "pjtId"           : "${pjtId}"
            }]`;

            var pagina = 'Budget/SaveBudget';
            var tipo = 'html';
            var selector = respBudget;
            fillField(pagina, par, tipo, selector);
        }
    });
}

function respBudget(dt) {
    getVersion(dt);
}

/**  ++++  Obtiene los días definidos para el proyectos */
function getDaysPeriod() {
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
function updateTotals() {
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

    let ttlrws = $('#invoiceTable').find('tbody tr.budgetRow').length;
    $('#numberProducts').html(ttlrws);
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
function showButtonComments(acc) {
    elm = $('.sidebar__comments .toComment');
    acc == 'S' ? elm.css({visibility: 'visible'}) : elm.css({visibility: 'hidden'});
}
function cleanQuoteTable() {
    $('#invoiceTable table tbody.sections_products').each(function () {
        let id = $(this);
        let status = id.css('display');
        if (status == 'table-row-group') {
            id.hide().find('tr.budgetRow').remove();
        }
    });
}
function cleanVersionList() {
    $('.version__list-title').html('');
    $('.version__list ul li').remove();
}
function cleanTotalsArea() {
    $('.sidebar__totals .totals-numbers').html('0.00');
    $('.sidebar__totals .totals-numbers.simple').html('0');
    $('.version_current').html('').attr('data_version', null).attr('data_project', null).attr('data_versionCode', null);
}
/** *************************************************************** */

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
            automaticCloseModal();
        });
}

function automaticCloseModal() {
    $('.invoice__modal-general').slideUp(400, function () {
        $('.invoice__modalBackgound').fadeOut(400);
        $('.invoice__modal-general .modal__body').html('');
    });
}

function modalLoading(acc) {
    if (acc == 'S') {
        $('.invoice__modalBackgound').fadeIn('slow');
        $('.invoice__loading').slideDown('slow').css({'z-index': 401, display: 'flex'});
    } else {
        $('.invoice__loading').slideUp('slow', function () {
            $('.invoice__modalBackgound').fadeOut('slow');
        });
    }
}

/**  +++ Oculta los elementos del listado que no cumplen con la cadena  */
function sel_items(txt, obj) {
    if (txt.length < 1) {
        $(`#${obj} .finder_list ul li`).css({display: 'block'});
    } else {
        $(`#${obj} .finder_list ul li`).css({display: 'none'});
    }

    $(`#${obj} .finder_list ul li`).each(function (index) {
        var cm = $(this).text().toUpperCase();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(txt);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

/** ***** VALIDA EL LLENADO DE LOS CAMPOS ******* */
function validatorFields(frm) {
    let ky = 0;
    frm.find('.required').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            $(this).addClass('textbox-alert');
            $(this).parent().children('.textAlert').css({visibility: 'visible'});

            ky = 1;
        }
    });
    return ky;
}

/* ************************************************************************ */
/* PROMUEVE COTIZACION A PRESUPUESTO                                       */
/* ************************************************************************ */
function promoteProject(pjtId) {
    modalLoading('S');

    var pagina = 'Budget/PromoteProject';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = showPromoteProject;
    fillField(pagina, par, tipo, selector);
}
function showPromoteProject(dt) {
    let verId = $('.invoice_controlPanel .version_current').attr('data_version');
    var pagina = 'Budget/PromoteVersion';
    var par = `[{"verId":"${verId}","pjtId":"${dt}"}]`;
    var tipo = 'html';
    var selector = showPromoteVersion;
    fillField(pagina, par, tipo, selector);
}

function showPromoteVersion(dt) {
    console.log(dt);
    let pjtId = dt.split('|')[0];
    $('#P' + pjtId).remove();

    showPromoteBudget(dt);
}

function showPromoteBudget(dt) {
    let pjtId = dt.split('|')[0];
    let verId = dt.split('|')[1];

    var pagina = 'Budget/ProcessProjectProduct';
    var par = `[{"verId":"${verId}", "pjtId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = showResult;
    fillField(pagina, par, tipo, selector);
}

function showResult(dt) {
    console.log(dt);
    modalLoading('H');
    cleanFormat();
}

function cleanFormat() {
    showButtonVersion('H');
    showButtonToPrint('H');
    showButtonToSave('H');
    showButtonComments('H');
    cleanQuoteTable();
    cleanVersionList();
    cleanTotalsArea();
}

let cust, proj, prod, vers, budg, tpprd, relc, proPar, tpcall, dstgral;
var swpjt = 0;
let viewStatus = 'C'; // Columns Trip & Test C-Colalapsed, E-Expanded

$('document').ready(function () {
    url = getAbsolutePath();
    verifica_usuario();
    inicial();
});

//INICIO DE PROCESOS
function inicial() {
    stickyTable();
    eventsAction();
    getProjects('0');
    getProjectsParents();
    getCustomers();
    getCustomersOwner();
    getDiscounts();
    getProjectType();
    getProjectTypeCalled();
    discountInsuredEvent();
    
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

function discountInsuredEvent() {
    $('.selectioninsured')
        .unbind('click')
        .on('click', function () {
            let elm = $(this);
            console.log(elm.offset().left);
            console.log(elm.offset().top);

            let posLeft = elm.offset().left - 90;
            let posTop = elm.offset().top - 80;

            $('.invoiceDiscSelect')
                .unbind('mouseleave')
                .css({ top: posTop + 'px', left: posLeft + 'px' })
                .fadeIn(400)
                .on('mouseleave', function () {
                    $('.invoiceDiscSelect').fadeOut(400);
                })
                .unbind('change')
                .on('change', function (e) {
                    let insured = parseFloat(
                        $('#insuTotal').text().replace(/\,/g, '')
                    );
                    //console.log(insured);
                    if (insured > 0) {
                        let data = parseFloat(e.target.value);
                        data = data * 100 + '<small>%</small>';
                        $('#insuDesctoPrc').html(data);

                        updateTotals();
                        $('.invoiceDiscSelect').fadeOut(400);
                        // console.log(e.target.value, data, insured, dsctoInsured);
                    }
                });
        });
}

function eventsAction() {
    // Despliega la seccion de detalle de información del proyecto
    $('.projectInformation')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-finder').css({ top: '-100%' });
            $('.projectfinder').removeClass('open');

            let rotate = $(this).attr('class').indexOf('rotate180');
            if (rotate >= 0) {
                $('.invoice__section-details').css({
                    top: '-100%',
                    bottom: '100%',
                });
                $(this).removeClass('rotate180');
            } else {
                $('.invoice__section-details').css({
                    top: '32px',
                    bottom: '0px',
                });
                $(this).addClass('rotate180');
            }
        });

    // Despliega la sección de seleccion de proyecto y cliente
    $('.projectfinder')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-details').css({
                top: '-100%',
                bottom: '100%',
            });
            $('.projectInformation').removeClass('rotate180');

            let open = $(this).attr('class').indexOf('open');
            if (open >= 0) {
                $('.invoice__section-finder').css({ top: '-100%' });
                $(this).removeClass('open');
            } else {
                $('.invoice__section-finder').css({ top: '32px' });
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
            let item = $(this).attr('data-option');
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
            let nRows = $(
                '.invoice__box-table table tbody tr.budgetRow'
            ).length;
            if (nRows > 0) {
                let pjtId = $('.version_current').attr('data-project');
                let verCurr = $(
                    '.sidebar__versions .version__list ul li:first'
                ).attr('data-code');
                if (verCurr == undefined) {
                    verCurr = 'V0';
                }
                let vr = parseInt(verCurr.substring(1, 10));
                let verNext = 'C' + refil(vr + 1, 4);
                let discount = parseFloat($('#insuDesctoPrc').text()) / 100;

                let par = `
                [{
                    "pjtId"           : "${pjtId}",
                    "verCode"         : "${verNext}",
                    "discount"        : "${discount}"
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
            let pjtId = $('.projectInformation').attr('data-project');
            editProject(pjtId);
        });
    // Agrega nuevo proyecto
    $('#btnNewProject')
        .unbind('click')
        .on('click', function () {
            getProjectsParents();
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
            let pjtId = $('.version_current').attr('data-project');
            promoteProject(pjtId);
        });
    // Imprime la cotización en pantalla
    $('.toPrint')
        .unbind('on')
        .on('click', function () {
            let verId = $('.version_current').attr('data-version');
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
        $('.showColumns')
            .parents('table')
            .removeAttr('class')
            .addClass('collapsed');
    } else {
        $('.showColumns').removeClass('rotate180');
        $('.coltrip')
            .show()
            .children('.input_invoice')
            .attr('disable', 'false');
        $('.coltest')
            .show()
            .children('.input_invoice')
            .attr('disable', 'false');
        $('.showColumns')
            .parents('table')
            .removeAttr('class')
            .addClass('expanded');
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
    var pagina = 'Budget/stockProdcuts';
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

/** Obtiene el listado de los tipos de proyecto */
function getProjectTypeCalled() {
    var pagina = 'Budget/listProjectsTypeCalled';
    var par = `[{"pjt":""}]`;
    var tipo = 'json';
    var selector = putProjectsTypeCalled;
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

function getRelPrdAcc(id, tp) {

    var pagina = 'Budget/GetAccesories';
    var par = `[{"prodId":"${id}","type":"${tp}"}]`;
    var tipo = 'json';
    var selector = putRelPrdAcc;
    fillField(pagina, par, tipo, selector);
}

function putRelPrdAcc(dt){
    console.log(dt);
}

/** LLENA DE DATOS */
/**  Llena el listado de proyectos */
function putProjects(dt) {
    if (dt[0].pjt_id > 0) {
        proj = dt;
        $('.finder_list-projects ul').html('');
        $('.finder_list-projectsParent ul').html('');

        $.each(proj, function (v, u) {
            if (u.pjt_status == '1') {
                let H = ` <li id="P${u.pjt_id}" class="alive" data-element="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}|${u.pjt_number}|M${u.pjt_parent}|${u.pjt_name}">${u.pjt_name}</li>`;
                $('.finder_list-projects ul').append(H);
            } else {
                let M = ` <li id="M${u.pjt_id}" class="alive" data-element="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}|${u.pjt_number}|${u.pjt_name}">${u.pjt_name}</li>`;
                $('.finder_list-projectsParent ul').append(M);
            }
        });

        selectorProjects(proj[0].pjId);
        swpjt = 1;
    } else {
        $('.finder_list-projects ul').html('');
        $('.finder_list-projectsParent ul').html('');
    }
}
/**  Llena el listado de proyectos padre */
function putProjectsParents(dt) {
    proPar = dt;
    $('#txtProjectParent').html('');
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
    $('.finder_list-customer ul').html('');
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = ` <li id="C${u.cus_id}" class="alive" data-element="${v}|${u.cut_name}|${u.cus_name}">${u.cus_name}</li>`;
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
    $('#selDiscount').html('');
    $('#selDiscInsr').html('');
    $.each(dt, function (v, u) {
        let H = `<option value="${u.dis_discount}">${
            u.dis_discount * 100
        }%</option>`;
        $('#selDiscount').append(H);
        $('#selDiscInsr').append(H);
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
            caret =
                firstVersion == u.ver_id
                    ? '<i class="fas fa-caret-right"></i>'
                    : '';
            let H = `<li id="V${u.ver_id}" data-code="${
                u.ver_code
            }" data-discount="${u.ver_discount_insured}">
                        <span class="element_caret">${caret}</span>
                        <span class="element_code">${u.ver_code}</span>
                        <span class="element_date"> ${moment(u.ver_date).format(
                            'DD-MMM-yyyy'
                        )}</span>
                    </li> `;

            $('.version__list ul').append(H);
        });

        $('.version__list ul li').on('click', function () {
            let version = $(this).attr('id').substring(1, 100);
            let versionCode = $(this).attr('data-code');
            let discount = $(this).data('discount');
            vers = version;

            $('.element_caret').html('');
            $('#V' + version + ' .element_caret').html(
                '<i class="fas fa-caret-right"></i>'
            );

            $('.version_current')
                .html('Version: ' + versionCode)
                .attr('data-version', version)
                .attr('data-versionCode', versionCode);

            $('#insuDesctoPrc').html(discount * 100 + '<small>%</small>');

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

/** Llena el listado de los tipos de proyecto */
function putProjectsTypeCalled(dt) {
    tpcall = dt;
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

    $('.finder_list-projectsParent ul li')
        .unbind('click')
        .on('click', function () {
            let pjtParent = $(this).attr('id').substring(1, 10);
            $('.finder_list-projects ul li').removeClass('alive');
            $.each(proj, function (v, u) {
                if (pjtParent == u.pjt_parent) {
                    let pjtId = u.pjt_id;
                    $(`#P${pjtId}`).addClass('alive');
                }
            });
        });
}

function actionSelProject(obj) {
    let status = obj.attr('class');

    if (status == 'alive') {
        let idSel = obj.parents('.dato');
        let indx = obj.data('element').split('|')[0];
        let pj = proj[indx];

        $('.panel__name')
            .css({ visibility: 'visible' })
            .children('span')
            .html(pj.pjt_name)
            .attr('data-id', pj.pjt_id)
            .attr('title', pj.pjt_name);
        $('#projectNumber').html(pj.pjt_number);
        $('#projectLocation').html(pj.pjt_location);
        $('#projectPeriod').html(
            `<span>${pj.pjt_date_start} - ${pj.pjt_date_end}</span><i class="fas fa-calendar-alt id="periodcalendar"></i>`
        );
        $('#projectLocationType').html(pj.loc_type_location);
        $('#projectType').html(pj.pjttp_name);
        fillProducer(pj.cus_parent);
        getVersion(pj.pjt_id);
        getCalendarPeriods(pj);

        $('.version_current').attr('data-project', pj.pjt_id);
        $('.projectInformation').attr('data-project', pj.pjt_id);

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

        $('.invoice_controlPanel .addSection').css({ visibility: 'visible' });
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
            opens: 'left',
        },
        function (start, end, label) {
            $('#projectPeriod span').html(
                start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY')
            );
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
        let bdgDaysBase = tr
            .children('td.daysBase')
            .children('.input_invoice')
            .val();
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
            let indx = $(this).data('element').split('|')[0];
            let type = $(this).data('element').split('|')[1];
            let cs = cust[indx];

            $('#CustomerName').html(cs.cus_name);
            $('.finder_list-projects ul li').removeClass('alive');
            $('.finder_list-projectsParent ul li').removeClass('alive');
            $.each(proj, function (v, u) {
                if (cs.cus_id == u.cus_id) {
                    let pjtId = u.pjt_id;
                    $(`#P${pjtId}`).addClass('alive');
                    $(`#M${pjtId}`).addClass('alive');
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

    $('.productos__box-table').attr('data-section', item);

    $('#txtProductFinder')
        .unbind('keyup')
        .on('keyup', function () {
            let text = $(this).val().toUpperCase();
            //showButtonToCharge('S');
            selProduct(text);
        });

    $('.close_listProducts').on('click', function () {
        $('.invoice__section-products').fadeOut(400, function () {
            $('#listProductsTable table tbody').html('');
            $('#txtProductFinder').val('');
            showButtonToCharge('S');
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
            // $('.invoice_button .toCharge').show();
            $('.toCharge').removeClass('hide-items');  //jjr
            getProducts(res.toUpperCase(), dstr, dend);
        } else {
            rowCurr.css({ display: 'none' });
            rowCurr.each(function (index) {
                var cm = $(this)
                    .data('element')
                    .toUpperCase()
                    .replace(/|/g, '');

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
    
    $('#listProductsTable table tbody').html('');
    prod = dt;
    $.each(dt, function (v, u) {
        let H = `
            <tr data-indx ="${v}" data-element="${
            u.prd_sku
        }|${u.prd_name.replace(/"/g, '')}|${u.sbc_name}">
                <th class="col_product" title="${
                    u.prd_name
                }"><div class="elipsis">${u.prd_name}</div></th>
                <td class="col_quantity">${u.stock}</td>
                <td class="col_type">${u.prd_level}</td>
                <td class="col_category">${u.sbc_name}</td>
                <td class="col_category">${u.prd_price}</td>
            </tr> `;
        $('#listProductsTable table tbody').append(H);
    });
    $('.toCharge').addClass('hide-items');   //jjr
    
    $('#listProductsTable table tbody tr').on('click', function () {
        let inx = $(this).attr('data-indx');
        fillBudget(prod[inx], vers, inx);
    });

}

function fillBudget(pr, vr, ix) {
    let nRows = $(`#listProductsTable table tbody tr`).length;
    loadBudget(ix, nRows);
}

function loadBudget(inx, bdgId) {
    let insurance = prod[inx].prd_insured == 0 ? 0 : 0.1;
    // let produ = prod[inx].prd_name.replace(/\"/g, '°');
    let produ = prod[inx].prd_name.replace(/\"/g, '°').replace(/\,/g, '^');
    let subct = prod[inx].sbc_name.replace(/\"/g, '°').replace(/\,/g, '^');
    let days = getDaysPeriod();
    let section = $('.productos__box-table')
        .attr('data-section')
        .substring(2, 5);

    let par = `{
        "bdg_id"                : "${bdgId}",
        "bdg_prod_sku"          : "${prod[inx].prd_sku}",
        "bdg_prod_name"         : "${produ}",
        "bdg_prod_price"        : "${prod[inx].prd_price}",
        "bdg_quantity"          : "1",
        "bdg_days_base"         : "${days}",
        "bdg_days_cost"         : "${days}",
        "bdg_discount_base"     : "0",
        "bdg_discount_insured"  : "0",
        "bdg_days_trip"         : "0",
        "bdg_discount_trip"     : "0",
        "bdg_days_test"         : "0",
        "bdg_discount_test"     : "0",
        "bdg_insured"           : "${insurance}",
        "bdg_prod_level"        : "${prod[inx].prd_level}",
        "prd_id"                : "${prod[inx].prd_id}",
        "bdg_stock"             : "${prod[inx].stock}",
        "sbc_name"              : "${subct}",
        "bdg_section"           : "${section}"
    }
    `;

    let ky = registeredProduct('bdg' + prod[inx].prd_id);
    // console.log(ky);
    if (ky == 0) {
        fillBudgetProds(par, days);
    }

    updateTotals();
    showButtonVersion('S');
    showButtonToPrint('H');
    showButtonToSave('H');
    reOrdering();
}

function registeredProduct(id) {
    ky = 0;
    $('#invoiceTable table tbody tr').each(function () {
        let idp = $(this).attr('id');
        if (id == idp) {
            let qty =
                parseInt(
                    $(this)
                        .children('td.col_quantity')
                        .children('.input_invoice')
                        .val()
                ) + 1;
            $(this)
                .children('td.col_quantity')
                .children('.input_invoice')
                .val(qty);
            ky = 1;
        }
    });
    return ky;
}

function putBudgets(dt) {
    //console.log('Recargando ',dt);
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

    $('tbody.sections_products').sortable({
        items: 'tr:not(tr.blocked)',
        cursor: 'pointer',
        axis: 'y',
        dropOnEmpty: false,
        start: function (e, ui) {
            ui.item.addClass('selected');
        },
        stop: function (e, ui) {
            ui.item.removeClass('selected');
            $(this)
                .find('tr')
                .each(function (index) {
                    if (index > 0) {
                        $(this).find('i.move_item').attr('data-order', index);
                    }
                });
            showButtonVersion('S');
        },
    });

    reOrdering();
}

function reOrdering() {
    $('tbody.sections_products')
        .find('tr.budgetRow')
        .each(function (index) {
            if (index >= 0) {
                $(this)
                    .find('i.move_item')
                    .attr('data-order', index + 1);
            }
        });
}

// *************************************************
// Llena el listado de productos seleccionados
// *************************************************
function fillBudgetProds(jsn, days) {
    let pds = JSON.parse(jsn);
    // console.log(pds.bdg_prod_name);

    // AQUI Aplicar el porcentaje de descuento al seguro 15-ago-2022 8:52 am
    let prdName = pds.bdg_prod_name.replace(/°/g, '"').replace(/\^/g, ',');

    let H = `
    <tr id="bdg${pds.prd_id}" data-sku="${pds.bdg_prod_sku}" data-insured="${
        pds.bdg_insured
    }" data-level="${pds.bdg_prod_level}" class="budgetRow">
        <th class="wclprod col_product product"><i class="fas fa-ellipsis-v move_item" data-order="0"></i><div class="elipsis" title="${prdName}">${prdName}</div><i class="fas fa-bars menu_product" id="mnu${
        pds.prd_id
    }"></i></th>
        <td class="wcldays col_quantity colbase quantityBase"><input type="text" class="input_invoice" value="${
            pds.bdg_quantity
        }" tabindex=1></td>
        <td class="wclnumb col_price colbase priceBase">${mkn(
            pds.bdg_prod_price,
            'n'
        )}</td>
        <td class="wcldays col_days colbase daysBase"><input type="text" class="input_invoice" value="${
            pds.bdg_days_base
        }" tabindex=2></td>
        <td class="wcldays col_days colbase daysCost"><input type="text" class="input_invoice" value="${
            pds.bdg_days_cost
        }" tabindex=3></td>
        <td class="wcldisc col_discount colbase discountBase" data-key="1"><i class="fas fa-caret-left selectioncell"></i><span class="discData">${
            parseFloat(pds.bdg_discount_base) * 100
        }<small>%</small></span></td>
        <td class="wcldisc col_discount colbase discountInsu" data-key="${
            pds.bdg_insured
        }"><i class="fas fa-caret-left selectioncell"></i><span class="discData">${
        parseFloat(pds.bdg_discount_insured) * 100
    }<small>%</small></span></td>
        <td class="wclnumb col_cost colbase costBase">0.00</td>
        <td class="wcldays col_days coltrip daysTrip"><input type="text" class="input_invoice" value="${
            pds.bdg_days_trip
        }" tabindex=4></td>
        <td class="wcldisc col_discount coltrip discountTrip" data-key="1"><i class="fas fa-caret-left selectioncell"></i><span class="discData">${
            parseFloat(pds.bdg_discount_trip) * 100
        }<small>%</small></span></td>
        <td class="wclnumb col_cost coltrip costTrip">0.00</td>
        <td class="wcldays col_days coltest daysTest"><input type="text" class="input_invoice" value="${
            pds.bdg_days_test
        }" tabindex=5></td>
        <td class="wcldisc col_discount coltest discountTest" data-key="1"><i class="fas fa-caret-left selectioncell"></i><span class="discData">${
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
            let nRows = $(
                '.invoice__box-table table tbody tr.budgetRow'
            ).length;
            if (nRows > 0) {
                if (typeSet == 'inpt') {
                    $('.invoiceMainInput')
                        .unbind('mouseleave')
                        .css({ top: posTop + 'px', left: posLeft + 'px' })
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
                        .css({ top: posTop + 'px', left: posLeft + 'px' })
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

                            $('td.discountInsu').each(function () {
                                let key = parseFloat($(this).data('key'));
                                if (key == 0)
                                    $(this)
                                        .children('.discData')
                                        .html('0<small>%</small>');
                            });
                        });
                }
            }
        });

    // Muestra los selectores de descuento por celda
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
                .css({ top: posTop + 'px', left: posLeft + 'px' })
                .fadeIn(400)
                .on('mouseleave', function () {
                    $('.invoiceMainSelect').fadeOut(400);
                })
                .children('.input_invoice')
                .val('')
                .unbind('change')
                .on('change', function (e) {
                    let key = parseFloat(id.parent().data('key'));
                    let data = e.target.value;

                    if (key > 0) {
                        data = data * 100 + '<small>%</small>';
                        id.parent().children('.discData').html(data);
                    }

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
                .css({ top: posTop + 'px', left: posLeft + 'px' })
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
                    let type = id.parents('tr').attr('data-level');
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
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#infoProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    // template.show();
    $('.invoice__modal-general .modal__header-concept').html(
        'Productos Relacionados'
    );
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
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#stockProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html(
        'inventarios del producto'
    );
    closeModals();
}

function putStockProjects(dt) {
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
    let inx = findIndex(pjtId, proj);
    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#dataProjectTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html(
        'Edición de datos del proyecto'
    );
    closeModals();
    fillContent();
    fillData(inx);
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
    $.each(tpprd, function (v, u) {
        let H = `<option value="${u.pjttp_id}"> ${u.pjttp_name}</option>`;
        $('#txtTypeProjectEdt').append(H);
    });
    // Llena el selector de tipo de llamados
    $.each(tpcall, function (v, u) {
        let H = `<option value="${u.pjttc_id}"> ${u.pjttc_name}</option>`;
        $('#txtTypeCalled').append(H);
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

function fillData(inx) {
    $('.textbox__result').show();
    $('.project__selection').hide();

    let pj = proj;

    $('#txtProjectIdEdt').val(pj[inx].pjt_id);
    $('#txtProjectEdt').val(pj[inx].pjt_name);
    $('#txtPeriodProjectEdt').val(
        pj[inx].pjt_date_start + ' - ' + pj[inx].pjt_date_end
    );
    $('#txtTimeProject').val(pj[inx].pjt_time);
    $('#txtLocationEdt').val(pj[inx].pjt_location);
    $('#txtCustomerOwnerEdt').val(pj[inx].cuo_id);
    $(`#txtTypeProjectEdt option[value = "${pj[inx].pjttp_id}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtTypeLocationEdt option[value = "${pj[inx].loc_id}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtCustomerEdt option[value = "${pj[inx].cus_id}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtCustomerRelEdt option[value = "${pj[inx].cus_parent}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtTypeCalled option[value = "${pj[inx].pjttc_id}"]`).attr(
        'selected',
        'selected'
    );
    $('#txtHowRequired').val(pj[inx].pjt_how_required);
    $('#txtTripGo').val(pj[inx].pjt_trip_go);
    $('#txtTripBack').val(pj[inx].pjt_trip_back);
    $('#txtCarryOn').val(pj[inx].pjt_to_carry_on);
    $('#txtCarryOut').val(pj[inx].pjt_to_carry_out);
    $('#txtTestTecnic').val(pj[inx].pjt_test_tecnic);
    $('#txtTestLook').val(pj[inx].pjt_test_look);

    let depend = pj[inx].pjt_parent;
    let boxDepend = depend != '0' ? 'PROYECTO ADJUNTO' : 'PROYECTO UNICO';

    $(`#resProjectDepend`).html(boxDepend);

    let selection = pj[inx].pjt_parent;
    if (selection == 1) {
        $('#txtProjectParent').parents('tr').removeAttr('class');
        $(`#txtProjectParent option[value = "${selection}"]`).attr(
            'selected',
            'selected'
        );
        let parent = '';
        $.each(proPar, function (v, u) {
            if (pj[inx].pjt_parent == u.pjt_id) {
                parent = u.pjt_name;
            }
        });
        $('#resProjectParent').html(parent);
    } else {
        $('#txtProjectParent').parents('tr').addClass('hide');
        $(`#txtProjectParent option[value = "0"]`).attr('selected', 'selected');
    }

    $('#saveProject')
        .html('Guardar cambios')
        .removeAttr('class')
        .addClass('bn btn-ok update');

    $('#saveProject.update')
        .unbind('click')
        .on('click', function () {
            let ky = validatorFields($('#formProject'));
            if (ky == 0) {
                let projId = $('#txtProjectIdEdt').val();
                let projName = $('#txtProjectEdt').val();
                let projLocation = $('#txtLocationEdt').val();
                let cuoId = $('#txtCustomerOwnerEdt').val();
                let projLocationTypeValue = $(
                    '#txtTypeLocationEdt option:selected'
                ).val();
                let projPeriod = $('#txtPeriodProjectEdt').val();
                let projTime = $('#txtTimeProject').val();
                let projType = $('#txtTypeProjectEdt option:selected').val();
                let projTypeCalled = $('#txtTypeCalled option:selected').val();
                let cusCte = $('#txtCustomerEdt option:selected').val();
                let cusCteRel = $('#txtCustomerRelEdt option:selected').val();
                let howRequired = $('#txtHowRequired').val();
                let tripGo = $('#txtTripGo').val();
                let tripBack = $('#txtTripBack').val();
                let toCarryOn = $('#txtCarryOn').val();
                let toCarryOut = $('#txtCarryOut').val();
                let testTecnic = $('#txtTestTecnic').val();
                let testLook = $('#txtTestLook').val();

                let projDateStart = moment(
                    projPeriod.split(' - ')[0],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');
                let projDateEnd = moment(
                    projPeriod.split(' - ')[1],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');

                let par = `
                [{
                    "projId"         : "${projId}",
                    "pjtName"        : "${projName.toUpperCase()}",
                    "pjtLocation"    : "${projLocation.toUpperCase()}",
                    "pjtDateStart"   : "${projDateStart}",
                    "pjtDateEnd"     : "${projDateEnd}",
                    "pjtTime"        : "${projTime}",
                    "pjtType"        : "${projType}",
                    "locId"          : "${projLocationTypeValue}",
                    "cuoId"          : "${cuoId}",
                    "cusId"          : "${cusCte}",
                    "cusParent"      : "${cusCteRel}",
                    "pjttcId"        : "${projTypeCalled}",
                    "pjtHowRequired" : "${howRequired.toUpperCase()}",
                    "pjtTripGo"      : "${tripGo}",
                    "pjtTripBack"    : "${tripBack}",
                    "pjtToCarryOn"   : "${toCarryOn}",
                    "pjtToCarryOut"  : "${toCarryOut}",
                    "pjtTestTecnic"  : "${testTecnic}",
                    "pjtTestLook"    : "${testLook}"
                }]`;

                console.log(par);
                var pagina = 'Budget/UpdateProject';
                var tipo = 'html';
                var selector = loadProject;
                fillField(pagina, par, tipo, selector);
            }
        });
}

function loadProject(dt) {
    // console.log(dt);
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
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#dataProjectTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('Nuevo proyecto');
    $('#saveProject')
        .html('Guardar proyecto')
        .removeAttr('class')
        .addClass('bn btn-ok insert');
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
                $(`#txtProjectParent option[value = "0"]`).attr(
                    'selected',
                    'selected'
                );
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
                let projLocationTypeValue = $(
                    '#txtTypeLocationEdt option:selected'
                ).val();
                let projPeriod = $('#txtPeriodProjectEdt').val();
                let projTime = $('#txtTimeProject').val();
                let projType = $('#txtTypeProjectEdt option:selected').val();
                let projTypeCall = $('#txtTypeCalled option:selected').val();
                let cusCte = $('#txtCustomerEdt option:selected').val();
                let cusCteRel = $('#txtCustomerRelEdt option:selected').val();
                let proDepend = $('#txtProjectDepend option:selected').val();
                let howRequired = $('#txtHowRequired').val();
                let tripGo = $('#txtTripGo').val();
                let tripBack = $('#txtTripBack').val();
                let toCarryOn = $('#txtCarryOn').val();
                let toCarryOut = $('#txtCarryOut').val();
                let testTecnic = $('#txtTestTecnic').val();
                let testLook = $('#txtTestLook').val();

                let projDateStart = moment(
                    projPeriod.split(' - ')[0],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');
                let projDateEnd = moment(
                    projPeriod.split(' - ')[1],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');

                let proStatus = '';
                let proParent = '';

                switch (proDepend) {
                    case '0':
                        proStatus = 1;
                        proParent = 0;
                        break;
                    case '1':
                        proStatus = 1;
                        proParent = $(
                            '#txtProjectParent option:selected'
                        ).val();
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
                "projId"         : "${projId}",
                "pjtName"        : "${projName.toUpperCase()}",
                "pjtLocation"    : "${projLocation.toUpperCase()}",
                "pjtDateStart"   : "${projDateStart}",
                "pjtDateEnd"     : "${projDateEnd}",
                "pjtTime"        : "${projTime}",
                "pjtType"        : "${projType}",
                "locId"          : "${projLocationTypeValue}",
                "cuoId"          : "${cuoId}",
                "cusId"          : "${cusCte}",
                "pjttcId"        : "${projTypeCall}",
                "cusParent"      : "${cusCteRel}",
                "pjtParent"      : "${proParent}",
                "pjtStatus"      : "${proStatus}",
                "pjtHowRequired" : "${howRequired.toUpperCase()}",
                "pjtTripGo"      : "${tripGo}",
                "pjtTripBack"    : "${tripBack}",
                "pjtToCarryOn"   : "${toCarryOn}",
                "pjtToCarryOut"  : "${toCarryOut}",
                "pjtTestTecnic"  : "${testTecnic}",
                "pjtTestLook"    : "${testLook}"
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
    let pjtId = $('.version_current').attr('data-project');

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
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
            let pjtId = $('.version_current').attr('data-project');

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

    window.open(
        `${url}app/views/Budget/BudgetReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
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
        let bdgSku = tr.attr('data-sku');
        let bdgLevel = tr.attr('data-level');
        let bdgProduct = tr
            .children('th.product')
            .children('.elipsis')
            .text()
            .replace(/\"/g, '°').replace(/\'/g, '¿');
        let bdgQuantity = tr
            .children('td.quantityBase')
            .children('.input_invoice')
            .val();
        let bdgPriceBase = tr.children('td.priceBase').text().replace(/,/g, '');
        let bdgDaysBase = tr
            .children('td.daysBase')
            .children('.input_invoice')
            .val();
        let bdgDaysCost = tr
            .children('td.daysCost')
            .children('.input_invoice')
            .val();
        let bdgDesctBase = parseFloat(tr.children('td.discountBase').text()) / 100;
        let bdgDesctInsr = parseFloat(tr.children('td.discountInsu').text()) / 100;
        let bdgDaysTrip = tr
            .children('td.daysTrip')
            .children('.input_invoice')
            .val();
        let bdgDescTrip = parseFloat(tr.children('td.discountTrip').text()) / 100;
        let bdgDaysTest = tr
            .children('td.daysTest')
            .children('.input_invoice')
            .val();
        let bdgDescTest = parseFloat(tr.children('td.discountTest').text()) / 100;
        let bdgInsured = tr.attr('data-insured');
        let bdgSection = tr.parents('tbody').attr('id').substring(2, 5);
        let bdgOrder = tr
            .children('th.col_product')
            .children('i.move_item')
            .data('order');

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
                "bdgDescIn"       : "${bdgDesctInsr}",
                "bdgDaysTp"       : "${bdgDaysTrip}",
                "bdgDescTp"       : "${bdgDescTrip}",
                "bdgDaysTr"       : "${bdgDaysTest}",
                "bdgDescTr"       : "${bdgDescTest}",
                "bdgInsured"      : "${bdgInsured}",
                "bdgOrder"        : "${bdgOrder}",
                "verId"           : "${verId}",
                "prdId"           : "${prdId}",
                "pjtId"           : "${pjtId}"
            }]`;
            //console.log(par);
            var pagina = 'Budget/SaveBudget';
            var tipo = 'html';
            var selector = respBudget;
            fillField(pagina, par, tipo, selector);
        }
    });
}

function respBudget(dt) {
    //console.log('REGRESO', dt);
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
        desctins = 0;
    $('.budgetRow').each(function (v) {
        let pid = $(this).attr('id');

        let qtybs = parseInt(
            $(this).children('td.quantityBase').children('.input_invoice').val()
        );
        let prcbs = parseFloat(
            pure_num($(this).children('td.priceBase').text())
        );
        let dayre = parseInt(
            $(this).children('td.daysBase').children('.input_invoice').val()
        );
        let daybs = parseInt(
            $(this).children('td.daysCost').children('.input_invoice').val()
        );
        let desbs = parseFloat($(this).children('td.discountBase').text());
        let desIn = parseFloat($(this).children('td.discountInsu').text());
        let assur = parseFloat($(this).attr('data-insured'));

        stt01 = qtybs * prcbs; // Importe de cantidad x precio
        stt02 = stt01 * daybs; // Costo de Importe x días cobro
        stt03 = desbs / 100; //   Porcentaje de descuento base
        stt04 = stt02 * stt03; // Costo de Importe x porcentaje descuento base
        cstbs = stt02 - stt04; // Costo base
        costbase += cstbs; //     Total de Costo Base

        $(this).children('.costBase').html(mkn(cstbs, 'n'));

        let daytr = parseInt(
            $(this).children('td.daysTrip').children('.input_invoice').val()
        );
        let destr = parseFloat($(this).children('td.discountTrip').text());

        stt05 = stt01 * daytr; // Costo de Importe x dias viaje
        stt06 = destr / 100; //   Porcentaje de descuento viaje
        stt07 = stt05 * stt06; // Costo de Importe x porcentaje descuento viaje
        csttr = stt05 - stt07; // Costo viaje
        costtrip += csttr; //     Total de Costo Viaje

        $(this).children('.costTrip').html(mkn(csttr, 'n'));

        let dayts = parseInt(
            $(this).children('td.daysTest').children('.input_invoice').val()
        );
        let dests = parseFloat($(this).children('td.discountTest').text());

        stt08 = stt01 * dayts; // Costo de Importe x dias prueba
        stt09 = dests / 100; //   Porcentaje de descuento prueba
        stt10 = stt08 * stt09; // Costo de Importe x porcentaje prueba
        cstts = stt08 - stt10; // Costo prueba
        costtest += cstts; //     Total de Costo Prueba

        $(this).children('.costTest').html(mkn(cstts, 'n'));

        assre = stt01 * daybs * assur;
        assin = assre * (desIn / 100);

        costassu += assre - assin; //     Total de Seguro

        let prcdscins = parseFloat($('#insuDesctoPrc').html()) / 100;

        desctins = costassu * prcdscins;
    });

    $('#costBase').html(mkn(costbase, 'n'));
    $('#costTrip').html(mkn(costtrip, 'n'));
    $('#costTest').html(mkn(costtest, 'n'));
    $('#insuTotal').html(mkn(costassu, 'n'));
    $('#insuDescto').html(mkn(desctins, 'n'));

    let desctot = costassu - desctins;

    totlCost = costbase + costtrip + costtest + desctot;

    $('#costTotal').html(mkn(totlCost, 'n'));

    let ttlrws = $('#invoiceTable').find('tbody tr.budgetRow').length;
    $('#numberProducts').html(ttlrws);
}

/** ***** MUESTRA Y OCULTA BOTONES ******* */
function showButtonVersion(acc) {
    elm = $('.version__button .invoice_button');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function showButtonToPrint(acc) {
    elm = $('.invoice_controlPanel .toPrint');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function showButtonToSave(acc) {
    elm = $('.invoice_controlPanel .toSave');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}

function showButtonComments(acc) {
    elm = $('.sidebar__comments .toComment');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
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
    $('.sidebar__totals .totals-concept .discData').html('0<small>%</small>');
    $('.version_current')
        .html('')
        .attr('data-version', null)
        .attr('data-project', null)
        .attr('data-versionCode', null);
}
function showButtonToCharge(acc) {
    elm = $('.invoice_button .toCharge');
    acc == 'S'
        /* ? elm.css({ visibility: 'visible' })  
        : elm.css({ visibility: 'hidden' }); */

       ? elm.css.removeClass('hide-items')
       : elm.css.addClass('hide-items')
}
/** *************************************************************** */

/** ***** MUESTRA Y OCULTA ELEMENTOS DEL MENU DE SECCIONES ******** */
function sectionShowHide() {
    $('#invoiceTable table tbody.sections_products').each(function () {
        let status = $(this).css('display');
        let id = $(this).attr('id').substring(2, 5);
        if (status == 'table-row-group') {
            $(`.invoice__section .menu-sections li[data-option="${id}"] `).css({
                display: 'none',
            });
        } else {
            $(`.invoice__section .menu-sections li[data-option="${id}"] `).css({
                display: 'block',
            });
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
    subaccion();
    $('.invoice__modal-general').slideUp(400, function () {
        $('.invoice__modalBackgound').fadeOut(400);
        $('.invoice__modal-general .modal__body').html('');
    });
}

function modalLoading(acc) {
    if (acc == 'S') {
        $('.invoice__modalBackgound').fadeIn('slow');
        $('.invoice__loading')
            .slideDown('slow')
            .css({ 'z-index': 401, display: 'flex' });
    } else {
        $('.invoice__loading').slideUp('slow', function () {
            $('.invoice__modalBackgound').fadeOut('slow');
        });
    }
}

/**  +++ Oculta los elementos del listado que no cumplen con la cadena  */
function sel_items(txt, obj) {
    if (txt.length < 1) {
        $(`#${obj} .finder_list ul li`).css({ display: 'block' });
    } else {
        $(`#${obj} .finder_list ul li`).css({ display: 'none' });
    }

    $(`#${obj} .finder_list ul li`).each(function (index) {
        // var cm = $(this).text().toUpperCase();
        var cm = $(this).data('element').toUpperCase();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(txt);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({ display: 'block' });
        }
    });
}

/** ***** VALIDA EL LLENADO DE LOS CAMPOS ******* */
function validatorFields(frm) {
    let ky = 0;
    frm.find('.required').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            $(this).addClass('textbox-alert');
            $(this)
                .parent()
                .children('.textAlert')
                .css({ visibility: 'visible' });

            ky = 1;
        }
    });
    return ky;
}

/* ************************************************************************ */
/* PROMUEVE COTIZACION A PRESUPUESTO                                        */
/* ************************************************************************ */
function promoteProject(pjtId) {
    // console.log('TERMINO PROMO-COTIZ-1');
    modalLoading('S');

    /* let locprdid=520;  // codigo para probar funcion
    let locserid=1416;
    getRelPrdAcc(locprdid,locserid);
    modalLoading('H'); */

    let verId = $('.invoice_controlPanel .version_current').attr(
        'data-version'
    );

    var pagina = 'Budget/ProcessProjectProduct';
    var par = `[{"verId":"${verId}", "pjtId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = showResult;
    fillField(pagina, par, tipo, selector);
}

function showResult(dt) {
    console.log(dt);
    let pjtId = dt.split('|')[0];
    $('#P' + pjtId).remove();
    modalLoading('H');
    // console.log('TERMINO PROMO-COTIZ-2');
    // promoteProject2(pjtId);
    cleanFormat();
}

/* PROMUEVE COTIZACION A PRESUPUESTO 2.0                                       */
/* function promoteProject2(pjtId) {
    modalLoading('S');
    let verId = $('.invoice_controlPanel .version_current').attr(
        'data-version'
    );

    var pagina = 'Budget/ProcessProjectProm';
    var par = `[{"verId":"${verId}", "pjtId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = showResult2;
    fillField(pagina, par, tipo, selector);
} */

/* function showResult2(dt) {
    let pjtId = dt.split('|')[0];
    $('#P' + pjtId).remove();
    modalLoading('H');
    cleanFormat();
} */

/* PROMUEVE COTIZACION A PRESUPUESTO 3.0                                       */
/* function promoteProject3(pjtId) {
    modalLoading('S');
    let verId = $('.invoice_controlPanel .version_current').attr(
        'data-version'
    );

    var pagina = 'Budget/ProcessProjectProduct';
    var par = `[{"verId":"${verId}", "pjtId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = showResult3;
    fillField(pagina, par, tipo, selector);
}

function showResult3(dt) {
    let pjtId = dt.split('|')[0];
    $('#P' + pjtId).remove();
    modalLoading('H');
    cleanFormat();
} */

/* ************************************************************************ */

function cleanFormat() {
    showButtonVersion('H');
    showButtonToPrint('H');
    showButtonToSave('H');
    showButtonComments('H');
    cleanQuoteTable();
    cleanVersionList();
    cleanTotalsArea();
}

function findIndex(id, dt) {
    inx = -1;
    $.each(dt, function (v, u) {
        if (id == u.pjt_id) {
            inx = v;
        }
    });

    return inx;
}

function subaccion() {
    console.log('');
}

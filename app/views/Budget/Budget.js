let cust, proj;

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
            if (rotate >= 0) {
                $(this).removeClass('rotate180');
                $('.coltrip').show().children('.input_invoice').attr('disable', 'false');
                $('.coltest').show().children('.input_invoice').attr('disable', 'false');
                $(this).parents('table').width('1360px');
            } else {
                $(this).addClass('rotate180');
                $('.coltrip').hide().children('.input_invoice').attr('disable', 'true');
                $('.coltest').hide().children('.input_invoice').attr('disable', 'true');
                $(this).parents('table').width('880px');
            }
        });

    $('.invoice_controlPanel .addSection')
        .unbind('click')
        .on('click', function () {
            $('.menu-sections').slideDown('slow');
            $('.menu-sections').on('mouseleave', function () {
                $(this).slideUp('slow');
            });
        });

    $('.menu-sections ul li')
        .unbind('click')
        .on('click', function () {
            let item = $(this).attr('class');
            $(this).hide();

            $(`#${item}`).show();
            console.log(item);
        });

    $('.invoice__box-table .invoice_button')
        .unbind('click')
        .on('click', function () {
            let item = $(this).parents('tbody').attr('id');

            showListProducts(item);
        });
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

/**  Obtiene el listado de proyectos */
function get_products(word, dstr, dend) {
    var pagina = 'Budget/listProducts';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = put_products;
    fillField(pagina, par, tipo, selector);
}

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
    if (dt[0].ver_id != 0) {
        $('.version__list-title').html('DOCUEMNTOS');
        $.each(dt, function (v, u) {
            let H = `<li><span>${u.ver_code}</span><span> ${moment(u.ver_date).format('DD-MMM-yyyy')}</span></li> `;

            $('.version__list ul').append(H);
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

function fillProducer(cusId) {
    $.each(cust, function (v, u) {
        if (u.cus_id == cusId) {
            $('#CustomerProducer').html(u.cus_name);
        }
    });
}

function showListProducts(item) {
    $('.invoice__section-products').fadeIn('slow');

    $('#txtProductFinder')
        .unbind('keyup')
        .on('keyup', function () {
            let text = $(this).val().toUpperCase();
            console.log(text);
            sel_product(text);
        });
}

/** ++++++ Selecciona los productos del listado */
function sel_product(res) {
    res = res.toUpperCase();

    if (res.length > 2) {
        let dstr = 0;
        let dend = 0;
        if (res.length == 3) {
            get_products(res.toUpperCase(), dstr, dend);
        } else {
            $('#listProductsTable table tbody tr').hide();
            $('#listProductsTable table tbody tr th').each(function (index) {
                var cm = $(this).attr('title').toUpperCase().replace(/|/g, '');

                cm = omitirAcentos(cm);
                var cr = cm.indexOf(res);
                if (cr > -1) {
                    $(this).css({display: 'block'});
                }
            });
        }
        $('#listProductsTable table tbody tr').show();
    } else {
        $(`#listProductsTable table tbody`).html('');
        $(`#listProductsTable table tbody tr`).hide();
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
    console.log(dt);
    $.each(dt, function (v, u) {
        let H = `
            <tr>
                <th class="col_product" title="${u.prd_name}"><div class="elipsis">${u.prd_name}</div></th>
                <td class="col_quantity">${u.stock}</td>
                <td class="col_type">${u.prd_level}</td>
                <td class="col_category">${u.sbc_name}</td>
            </tr> `;
        $('#listProductsTable table tbody').append(H);
    });
}

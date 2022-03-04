let cust, proj, relc, vers, prod, disc, budg;
let rgcnt = 1,
    rgevn = 0;

$('document').ready(function () {
    url = getAbsolutePath();
    verifica_usuario();
    inicial();
});

function inicial() {
    get_customers();
    get_projects();
    get_discounts();
    button_actions();
    get_customers_owner();
}

/** OBTENCION DE DATOS */
/**  Obtiene el listado de clientes */
function get_customers() {
    var pagina = 'Budget/listCustomers';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_customers;
    caching_events('get_customers');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_projects() {
    var pagina = 'Budget/listProjects';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = put_projects;
    caching_events('get_projects');
    fillField(pagina, par, tipo, selector);
}

/** Obtiene el listado de los tipos de proyecto */
function load_project_type() {
    var pagina = 'Budget/listProjectsType';
    var par = `[{"pjt":""}]`;
    var tipo = 'json';
    var selector = put_projects_type;
    caching_events('put_projects_type');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene los Id's de los elementos relacionados con la seleccion del cliente */
function get_rel_customers(cusId, cutId) {
    var pagina = 'Budget/listCustomersDef';
    var par = `[{"cusId":"${cusId}", "cutId":"${cutId}"}]`;
    var tipo = 'json';
    var selector = put_rel_customers;
    caching_events('get_rel_customers');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene los Id's de los elementos relacionados con la seleccion del cliente */
function get_customers_owner() {
    var pagina = 'Budget/listCustomersOwn';
    var par = `[{"cusId":"", "cutId":""}]`;
    var tipo = 'json';
    var selector = put_customers_owner;
    caching_events('get_customers_owner');
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene los Id's de los proyectos relacionados con la seleccion del cliente */
function get_rel_projects(id, prn) {
    var pagina = 'Budget/listProjectsDef';
    var par = `[{"cusId":"${id}"}]`;
    var tipo = 'json';
    var selector = put_rel_projects;
    caching_events('get_rel_projects');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_version(pjtId) {
    var pagina = 'Budget/listVersion';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = put_version;
    caching_events('get_version');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de cotizaciones */
function get_budgets() {
    let dstrO = $('#PeriodProject').text().split(' - ')[0];
    let dendO = $('#PeriodProject').text().split(' - ')[1];
    let dstr = moment(dstrO, 'DD/MM/YYYY').format('YYYY-MM-DD');
    let dend = moment(dendO, 'DD/MM/YYYY').format('YYYY-MM-DD');
    var pagina = 'Budget/listBudgets';
    var par = `[{"verId":"${vers}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = put_budgets;
    caching_events('get_budgets');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de descuentos */
function get_discounts() {
    var pagina = 'Budget/listDiscounts';
    var par = `[{"level":"1"}]`;
    var tipo = 'json';
    var selector = put_discounts;
    caching_events('get_discounts');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos */
function get_products(word, dstr, dend) {
    var pagina = 'Budget/listProducts';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = put_products;
    caching_events('get_products');
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de relacionados al prducto*/
function get_products_related(id, tp) {
    var pagina = 'Budget/listProductsRelated';
    var par = `[{"prdId":"${id}","type":"${tp}"}]`;
    var tipo = 'json';
    var selector = put_products_related;
    caching_events('get_products');
    fillField(pagina, par, tipo, selector);
}

/**  Llena el listado de prductores */
function put_customers(dt) {
    caching_events('put_customers');
    cust = dt;
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = ` <li id="C${u.cus_id}" class="enable" data_content="${v}|${u.cut_name}">${u.cus_name}</li>`;
            $('#Customer .list_items ul').append(H);
        }
    });
    select_customer();
}

/**  Llena el listado de proyectos */
function put_projects(dt) {
    caching_events('put_projects');
    if (dt[0].pjt_id > 0) {
        proj = dt;
        $.each(proj, function (v, u) {
            let H = ` <li id="P${u.pjt_id}" class="enable" data_content="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}">${u.pjt_name}</li>`;
            $('#Projects .list_items ul').append(H);
        });

        selector_projects();
    } else {
        $('#Projects .list_items ul').html('');
    }
}

/** Llena el listado de los tipos de proyecto */
function put_projects_type(dt) {
    $.each(dt, function (v, u) {
        let H = `<option value="${u.pjttp_id}"> ${u.pjttp_name}</option>`;
        $('#txtTypeProject').append(H);
    });
}

/**  Llena el listado de prductores */
function put_rel_customers(dt) {
    caching_events('put_rel_customers');
    $('#Relation .list_items ul li').css({display: 'none'});
    $.each(dt, function (v, u) {
        $(`#R${u.cus_id}`).css({display: 'block'});
    });
    select_relation();
}

/**  Llena el listado de prductores */
function put_customers_owner(dt) {
    caching_events('put_customers_owner');
    relc = dt;
}

/**  Llena el listado de descuentos */
function put_discounts(dt) {
    caching_events('put_discounts');
    disc = dt;
}

/**  Llena el listado de prductores */
function put_rel_projects(dt) {
    caching_events('put_rel_projects');
    $('#Projects .list_items ul li').removeClass('enable').addClass('disable');
    $.each(dt, function (v, u) {
        $('#Projects .list_items ul li').each(function () {
            let grp = $(this).attr('data_content');
            let pard = grp.split('|')[3];
            if (pard == u.cuo_id) {
                $(this).addClass('enable').removeClass('disable');
            }
        });
    });
    selector_projects();
}
/**  Llena el listado de versiones */
function put_version(dt) {
    caching_events('put_version');
    let H = `
    <div class="full text_center">
        <h6>DOCUMENTOS</h6>
    </div>`;
    $('#versions').html(H);

    if (dt[0].ver_id != 0) {
        $.each(dt, function (v, u) {
            H = `
            <div class="blocks documents">
                <div class="half vers left" id="V${u.ver_id}">${u.ver_code}</div>
                <div class="half right">${moment(u.ver_date).format('DD-MMM-yyyy')}</div>
            </div>
        `;
            $('#versions').append(H);
        });
        let vr = parseInt(dt[0].ver_code.substring(1, 10));
        let vt = refil(vr + 1, 4);
        $('#version').html('C' + vt);

        $('.documents .vers')
            .unbind('click')
            .on('click', function () {
                vers = $(this).attr('id').substring(1, 100);
                let code = $(this).text();
                $('.box_list_products').css({display: 'none'});
                get_budgets();
                fill_dinamic_table();
                add_boton();
                $('.menu_version').html('Versión: ' + code);
                $('.menu_version').attr('data_content', vers);
                hide_control_menu('block');
            });
    } else {
        $('#version').text('C0001');
        let vr = parseInt($('#version').text().substring(1, 10));
    }
}

/**  Llena el listado de cotizaciones */
function put_budgets(dt) {
    budg = dt;
    rgcnt = 1;
    caching_events('put_budgets');
    let days = get_days_period();
    if (dt[0].bdg_id > 0) {
        $.each(dt, function (v, u) {
            let jsn = JSON.stringify(u);
            rgevn = 0;
            fill_budget_prods(jsn, days);
        });
        rgcnt = 1;
        update_totals();
    } else {
        console.log('no budgets there are');
    }
}

/**  Llena el listado de productos */
function put_products(dt) {
    caching_events('put_products');
    prod = dt;
    let H = '';
    $.each(dt, function (v, u) {
        let level = '';
        switch (u.prd_level) {
            case 'A':
                level = 'ACCESORIO';
                break;
            case 'K':
                level = 'PAQUETE';
                break;
            case 'P':
                level = 'PRODUCTO';
                break;
            default:
        }
        if (u.prd_name != undefined) {
            // let ava = u.stock > 0 ? 'enable' : 'disable';
            let ava = 'enable';
            H += `
                <li class="${ava}" data_indx ="${v}" data_content="${u.prd_sku}|${u.prd_name.replace(/"/g, '')}|${u.sbc_name}">
                    <div class="prodName">${u.prd_name}</div>
                    <div class="prodStock">${u.stock}</div>
                    <div class="prodLevel">${level}</div>
                    <div class="prodsubct">${u.sbc_name}</div>
                </li>
            `;
        }
    });
    $('.list_products ul').html(H);

    $('.list_products ul li').on('click', function () {
        let inx = $(this).attr('data_indx');
        console.log(inx);
        fill_budget(prod[inx], vers, inx);
    });
}

/**  Activa los botones de acciones */
function button_actions() {
    caching_events('button_actions');
    $('#addProducer')
        .unbind('click')
        .on('click', function () {
            add_client();
        });

    $('#addProject')
        .unbind('click')
        .on('click', function () {
            add_project();
        });

    $('#newQuote')
        .unbind('click')
        .on('click', function () {
            // new_quote();
            window.location = 'Budget';
        });
    $('.frame_fix_col .sel i').on('click', function (e) {
        let idsel = $(this).attr('id');
        let x = e.pageX;
        let y = e.pageY;
        show_minimenues(idsel, x, y);
    });

    $('.dato')
        .unbind('keyup')
        .on('keyup', function () {
            let idSel = $(this).attr('id');
            let grp = $(`#${idSel} .grouper`).text().toUpperCase();
            $(`#${idSel}`).children('.list_items').slideDown(200);
            $(`#${idSel}`).children('i').addClass('rotar');
            $('.customerType').html('');
            sel_items(grp, idSel);
        });

    $('.dato .grouper')
        .unbind('focus')
        .on('focus', function () {
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });

    $('.dato')
        .parent()
        .parent()
        .parent()
        .on('mouseleave', function () {
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });

    $('.dato .fa-caret-down')
        .unbind('click')
        .on('click', function () {
            //console.log($(this).parent().html());
            let idSel = $(this).parent().attr('id');
            let clss = $(`#${idSel}`).children('i').attr('class').indexOf('rotar');
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
            if (clss < 0) {
                $(`#${idSel}`).children('.list_items').slideDown(200);
                $(`#${idSel}`).children('i').addClass('rotar');
            }
        });

    $('.dato')
        .unbind('change')
        .on('change', function () {
            console.log($(this).html());
        });

    $('.serc')
        .unbind('click')
        .on('click', function () {
            let projFind = $('#numProject .search').text();
            let found = 0;
            console.log(projFind, proj);
            $.each(proj, function (v, u) {
                if (projFind == u.pjt_number) {
                    console.log(u);
                    $('#C' + u.cus_id).trigger('click');
                    $('#P' + u.pjt_id).trigger('click');
                    $('#R' + u.cus_parent).trigger('click');
                    found = 1;
                }
            });
            if (found == 0) {
                $('.error').html('Proyecto no encontrado');
                clean_projects_field();
                clean_customer_field();
                setTimeout(() => {
                    $('.error').html('&nbsp;');
                }, 3000);
            } else {
                $('.error').html('&nbsp;');
            }
        });

    $('#addBudget')
        .unbind('click')
        .on('click', function () {
            let nRows = $('.frame_content table tbody tr').length;
            if (nRows > 0) {
                save_version();
            }
        });
}

/** Coloca el boton de agregar nuevo producto en la tabla  */
function add_boton() {
    caching_events('add_boton');
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
            $('.list_products').css({bottom: '35px'});
            $('.sel_product').css({top: h1 - 35 + 'px'});
        } else {
            $('.list_products').css({top: '35px'});
            $('.sel_product').css({top: 0});
        }

        hide_control_menu('none');

        $('.box_list_products')
            .css({top: posTop + 'px', left: posLeft + 'px'})
            .slideDown(200);
        $(`.list_products`).css({display: 'none'});

        $('.close-finder')
            .unbind('click')
            .on('click', function () {
                $('.box_list_products').fadeOut(200, function () {
                    $('.sel_product .textbox-finder').val('');
                    $(`#Products .list_products ul`).html('');
                });
            });

        $('#Products .sel_product .textbox-finder')
            .unbind('keyup')
            .on('keyup', function () {
                let idSel = $(this).parent().attr('id');
                let text = $(this).val().toUpperCase();
                sel_product(text, idSel);
            });
    });
    //$('#addProduct').addClass('hide');
}

function modal_products() {
    caching_events('modal_products');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );
}

/** Selectores de items */
/** Clientes */
function select_customer() {
    caching_events('select_customer');
    $('#Customer .list_items ul li.enable')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            let indx = $(this).attr('data_content').split('|')[0];
            let type = $(this).attr('data_content').split('|')[1];
            idSel.children('.grouper').html('<i class="fas fa-times-circle clean"></i> ' + $(this).html());
            idSel.children('.customerType').html('<span>' + type + '</span>');
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
            let cs = cust[indx];
            let respons = cs.cut_id == 1 ? 'Productor responsable' : 'Casa productora';
            $('#Relation').parent().children('.concepto').html(respons);
            $('#AddressProducer').html(cs.cus_address);
            $('#EmailProducer').html(cs.cus_email);
            $('#PhoneProducer').html(cs.cus_phone);
            $('#QualificationProducer').html(cs.cus_qualification);
            $('#Relation .grouper').html('');
            $('#Customer .grouper').attr('data_identy', cs.cus_id);
            $('#Relation').html('');
            // get_rel_customers(cs.cus_id, cs.cut_id);
            get_rel_projects(cs.cus_id);
            clean_projects_field();

            $('#Customer i.clean')
                .unbind('click')
                .on('click', function () {
                    clean_customer_field();
                    clean_projects_field();
                });
        });
}
/** Relacion */
function select_relation() {
    caching_events('select_relation');
    $('#Relation .list_items li')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            idSel.children('.grouper').html($(this).html());
            let pdrt = $(this).attr('id');
            let prnt = $('#Customer .grouper').attr('data_identy');

            get_rel_projects(pdrt.substring(1, pdrt.length), prnt);
            clean_projects_field();
            $('.list_items').slideUp(200);
            $('i').removeClass('rotar');
        });
}

/** Proyectos */
function selector_projects() {
    caching_events('selector_projects');
    $('#Projects .list_items ul li')
        .unbind('click')
        .on('click', function () {
            let status = $(this).attr('class');
            if (status == 'enable') {
                let idSel = $(this).parents('.dato');
                let indx = $(this).attr('data_content').split('|')[0];
                $('.list_items').slideUp(200);
                $('i').removeClass('rotar');
                let pj = proj[indx];
                $('#C' + pj.cus_id).trigger('click');
                idSel.children('.grouper').html('<i class="fas fa-times-circle clean"></i> ' + $(this).html());
                $('#LocationProject').html(pj.pjt_location);
                $('#TypeLocation').html(pj.loc_type_location);
                $('#DateProject').html(pj.pjt_date_project);
                $('#TypeProject').html(pj.pjttp_name);
                $('#PeriodProject').html('<span>' + pj.pjt_date_start + ' - ' + pj.pjt_date_end + '</span><i class="fas fa-calendar-alt id="periodcalendar""></i>');
                $('#numProject .search').html(pj.pjt_number);
                $('#IdProject').val(pj.pjt_id);
                $('#IdCuo').val(pj.cuo_id);
                $('#IdCus').val(pj.cus_id);
                $('#IdCusPrn').val(pj.cus_parent);
                fillProducer(pj.cus_parent);

                get_version(pj.pjt_id);
                fill_dinamic_table();
                add_boton();

                $('#Projects i.clean')
                    .unbind('click')
                    .on('click', function () {
                        clean_projects_field();
                    });
                let fecha = moment(Date()).format('DD/MM/YYYY');
                $('#PeriodProject').daterangepicker(
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
                        $('#PeriodProject span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
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
        });
}

function fillProducer(cusId) {
    $.each(cust, function (v, u) {
        if (u.cus_id == cusId) {
            $('#Relation').html(u.cus_name);
        }
    });
}

function SetUpdatePeriodProject(dt) {
    console.log(dt);

    let topDays = get_days_period();
    console.log(topDays);

    $('.frame_content #tblControl tbody tr').each(function (v) {
        let tr = $(this);
        let bdgDaysBase = tr.children('td.daybase').text().replace(/,/g, '');
        if (bdgDaysBase > topDays) {
            tr.children('td.daybase').text(topDays);
        }
    });
    rgcnt = 1;
    update_totals();
}

/**  +++++   Arma el escenario de la cotizacion  */
function fill_dinamic_table() {
    caching_events('fill_dinamic_table');
    let H = `
    
    <table class="table_control" id="tblControl" style="width: 1310px;">
        <thead>
            <tr class="headrow">
                <th rowspan="2" class="w1 fix product">PRODUCTO</th>
                <th rowspan="2" class="w1 fix subcate hide">SUBCATEGORIA</th>
                <th colspan="5" class="zone_01 headrow" >COTIZACIÓN BASE</th>
                <th colspan="3" class="zone_02 headrow" >VIAJE</th>
                <th colspan="3" class="zone_03 headrow" >PRUEBAS</th>
            </tr>
            <tr>
                <th class="w2 zone_01" >Cantidad</th>
                <th class="w3 zone_01" >Precio</th>
                <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="daybase"></i>Días</th>
                <th class="w2 zone_01 sel" ><i class="fas fa-caret-left" id="desbase"></i>Desc.</th>
                <th class="w3 zone_01" >Costo</th>
                <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="daytrip"></i>Días</th>
                <th class="w2 zone_02 sel" ><i class="fas fa-caret-left" id="destrip"></i>Desc.</th>
                <th class="w3 zone_02" >Costo</th>
                <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="daytest"></i>Días</th>
                <th class="w2 zone_03 sel" ><i class="fas fa-caret-left" id="destest"></i>Desc.</th>
                <th class="w3 zone_03" >Costo</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
    `;
    $('#tbl_dynamic').html(H);
    tbldynamic('tbl_dynamic');
    build_menu_control();

    $('#tblControl th i')
        .unbind('click')
        .on('click', function (e) {
            let idsel = $(this).attr('id');
            let x = e.pageX;
            let y = e.pageY;
            show_minimenues(idsel, x, y);
        });
}
/** ++++  Muestra las cuadros de opcion de dias y descuentos */
function show_minimenues(idsel, x, y) {
    console.log(idsel, x, y);
    let inic = idsel.substring(0, 3);
    let days = get_days_period();
    psy = y - 20;
    psx = x - 50;
    let H = '';

    if (inic == 'day') {
        H = `
        <div class="box_days">
            <input type="text" id="txtdays" class="minitext">
        </div>
        `;

        $('body').append(H);
        $('.box_days').css({top: psy + 'px', left: psx + 'px'});

        $('.minitext').on('mouseout', function () {
            let dys = $('.minitext').val();
            dys = days_validator(dys, days, idsel);
            $('.' + idsel).text(dys);
            rgcnt = 1;

            $('.box_days').remove();
        });
    } else if (inic == 'dsc') {
        fill_discount(psy, psx);

        $('.box_desc li')
            .unbind('click')
            .on('click', function () {
                let ds = $(this).attr('data_content');
                $('.box_desc').remove();
                let desc = ds * 100;
                $('#' + idsel)
                    .parent()
                    .children('span')
                    .text(mkn(desc, 'p'));
                rgcnt = 1;
                update_totals();
            });
    } else if (inic == 'mnu') {
        set_minimenu();
    } else {
        fill_discount(psy, psx);

        $('.box_desc li')
            .unbind('click')
            .on('click', function () {
                let ds = $(this).attr('data_content');
                console.log(ds);
                $('.box_desc').remove();
                let desc = ds * 100;
                $('.' + idsel)
                    .children('span')
                    .text(mkn(desc, 'p'));
                rgcnt = 1;
                update_totals();
            });
    }
}
/**  ++++  Obtiene los días definidos para el proyectos */
function get_days_period() {
    let Period = $('#PeriodProject span').text();
    console.log(Period);
    let start = moment(Period.split(' - ')[0], 'DD/MM/YYYY');
    let end = moment(Period.split(' - ')[1], 'DD/MM/YYYY');
    let days = end.diff(start, 'days') + 1;

    return days;
}

/**   ++++++  Construye el menu de control */
function build_menu_control() {
    let H = `
        <ul class="menu_block">
            <li class="menu_version" data_content=""></li>
            <li class="menu_button" id="mkproj"><i class="fas fa-upload"></i> Hacer proyecto</li>
            <li class="menu_button" id="printr"><i class="fas fa-print"></i> Imprimir</li>
        </ul>
        `;
    $('.menu_control').html(H);

    $('.menu_button').on('click', function () {
        let acc = $(this).attr('id');
        switch (acc) {
            case 'mkproj':
                make_project();
                break;
            case 'printr':
                getListBudget();
                // alert('Imprimir cotización');
                break;
            case 'expexl':
                alert('Exportar cotizacion a Excel');
                break;
            case 'exppdf':
                alert('Exportar cotizacion a PDF');
                break;
            default:
        }
    });
}

function getListBudget() {
    let projectId = $('#IdProject').val();
    let versionId = $('.menu_version').attr('data_content');
    console.log(projectId, versionId);
    var pagina = 'Budget/saveBudgetList';
    var par = `[{"verId":"${versionId}"}]`;
    var tipo = 'html';
    var selector = printBudget;
    fillField(pagina, par, tipo, selector);
}
function printBudget(dt) {
    let usr = dt.split('|')[0];
    let nme = dt.split('|')[1];
    window.open(url + 'app/views/Budget/BudgetReport.php?u=' + usr + '&n=' + nme, '_blank');
}

/** Limpiadores de campos */
/** Limpia proyectos */
function clean_projects_field() {
    caching_events('clean_projects_field');
    $('#Projects .grouper').html('');
    $('#LocationProject').html('');
    $('#PeriodProject').html('');
    $('#TypeLocation').html('');
    $('#DateProject').html('');
    $('#numProject .search').html('');
    $('#TypeProject').html('');
    $('#version').html('');
    $('#versions').html('');
    $('#IdProject').val('');
    $('#IdCus').val('');
    $('#IdCusPrn').val('');
    $('#IdCuo').val('');

    $('#Projects .list_items ul li').addClass('enable').removeClass('disable');
    $('#addBudget').removeClass('enable').addClass('disable');
    $('#tbl_dynamic').html('');
    $('.box_list_products').css({display: 'none'});
    hide_control_menu('none');
    $('#costbase').html(0);
    $('#costtrip').html(0);
    $('#costtest').html(0);
    $('#costassu').html(0);
    $('#total').html(0);
}
/** Limpia clientes */
function clean_customer_field() {
    caching_events('clean_customer_field');
    $('#Customer .grouper').html('');
    $('#Customer .grouper').attr('data_identy', '');
    $('#Relation .grouper').html('');
    $('#Relation').parent().children('.concepto').html('');
    $('#AddressProducer').html('');
    $('#EmailProducer').html('');
    $('#PhoneProducer').html('');
    $('#QualificationProducer').html('');
    $('#Customer .customerType').html('');
    $('#Projects .list_items ul li').addClass('enable').removeClass('disable');
}

/** Actualiza los totales */
function update_totals() {
    let ttlrws = $('.frame_content').find('tbody tr').length;
    if (rgcnt == 1) {
        rgcnt = 0;
        caching_events('update_totals');
        let costbase = 0,
            costtrip = 0,
            costtest = 0;
        costassu = 0;
        let total = 0;
        $('.frame_content #tblControl tbody tr').each(function (v) {
            let pid = $(this).attr('id');
            if ($(this).children('td.qtybase').html() != undefined) {
                qtybs = parseInt(pure_num($(this).children('td.qtybase').text()));
                prcbs = parseFloat(pure_num($(this).children('td.prcbase').text()));
                daybs = parseInt(pure_num($(this).children('td.daybase').text()));
                desbs = parseInt(pure_num($(this).children('td.desbase').text()));
                daytr = parseInt($(this).children('td.daytrip').text());
                destr = parseInt($(this).children('td.destrip').text());
                dayts = parseInt($(this).children('td.daytest').text());
                dests = parseInt($(this).children('td.destest').text());
                assur = parseFloat($(this).attr('data_insured'));

                qtyst = parseInt(pure_num($(this).children('td.qtybase').attr('data_quantity')));

                // if (qtybs > qtyst) {
                //     qtybs = qtyst;
                // }

                $(this).children('td.qtybase').text(qtybs);
                stt01 = qtybs * prcbs; // Importe de cantidad x precio
                stt02 = stt01 * daybs; // Costo de Importe x días base
                stt03 = desbs / 100; // Porcentaje de descuento base
                stt04 = stt02 * stt03; // Costo de Importe x porcentaje descuento base
                cstbs = stt02 - stt04; // Costo base
                assre = stt01 * assur;

                stt05 = stt01 * daytr; // Costo de Importe x dias viaje
                stt06 = destr / 100; // Porcentaje de descuento viaje
                stt07 = stt05 * stt06; // Costo de Importe x porcentaje descuento viaje
                csttr = stt05 - stt07; // Costo viaje

                stt08 = stt01 * dayts; // Costo de Importe x dias prueba
                stt09 = dests / 100; // Porcentaje de descuento prueba
                stt10 = stt08 * stt09; // Costo de Importe x porcentaje prueba
                cstts = stt08 - stt10; // Costo prueba

                costbase += cstbs; // Total de Costo Base
                costtrip += csttr; // Total de Costo Viaje
                costtest += cstts; // Total de Costo Prueba
                costassu += assre; // Total de Seguro

                $('#' + pid)
                    .children('td.costbase')
                    .html(mkn(cstbs, 'n'));
                $('#' + pid)
                    .children('td.costtrip')
                    .html(mkn(csttr, 'n'));
                $('#' + pid)
                    .children('td.costtest')
                    .html(mkn(cstts, 'n'));
            }
        });
        total = costbase + costtrip + costtest + costassu;
        $('#costbase').html(mkn(costbase, 'n'));
        $('#costtrip').html(mkn(costtrip, 'n'));
        $('#costtest').html(mkn(costtest, 'n'));
        $('#costassu').html(mkn(costassu, 'n'));
        $('#total').html(mkn(total, 'n'));

        $('#ttlproducts').html(ttlrws);

        order_subcategories();
        set_minimenu();
    }
}

/**  +++ Oculta los productos del listado que no cumplen con la cadena  */
function sel_items(res, sele) {
    if (res.length < 1) {
        $(`#${sele} .list_items ul li`).css({display: 'block'});
    } else {
        $(`#${sele} .list_items ul li`).css({display: 'none'});
    }

    $(`#${sele} .list_items ul li`).each(function (index) {
        var cm = $(this).text().toUpperCase();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

/**  ++++++  Guarda la nueva version */
function save_version() {
    caching_events('save_version');
    let bdgSku = 0;
    let pjtId = $('#IdProject').val();
    let verCode = $('#version').text();
    $('.frame_content #tblControl tbody tr').each(function (v) {
        let tr = $(this);
        if (tr.attr('data_sku') != undefined) {
            bdgSku = 1;
        }
    });
    if (bdgSku == 1) {
        let par = `
        [{
            "pjtId"           : "${pjtId}",
            "verCode"         : "${verCode}"
        }]`;

        var pagina = 'Budget/SaveVersion';
        var tipo = 'html';
        var selector = save_budget;
        fillField(pagina, par, tipo, selector);
    }
}

/**  +++++++ Guarda la cotización    */
function save_budget(verId) {
    caching_events('save_budget');
    console.log('Guardando Cotizacion');

    $('.frame_content #tblControl tbody tr').each(function (v) {
        let tr = $(this);
        if (tr.attr('id') != undefined) {
            let prdId = tr.attr('id').substring(3, 10);
            let bdgSku = tr.attr('data_sku');
            let bdgLevel = tr.attr('data_level');
            let bdgProduct = tr.children('td.product').text().replace(/\"/g, '°');
            let bdgQuantity = tr.children('td.qtybase').text().replace(/,/g, '');
            let bdgPriceBase = tr.children('td.prcbase').text().replace(/,/g, '');
            let bdgDaysBase = tr.children('td.daybase').text().replace(/,/g, '');
            let bdgDesctBase = parseFloat(tr.children('td.desbase').text());
            let bdgDayTrip = tr.children('td.daytrip').text().replace(/,/g, '');
            let bdgDesTrip = parseFloat(tr.children('td.destrip').text());
            let bdgDayTest = tr.children('td.daytest').text().replace(/,/g, '');
            let bdgDesTest = parseFloat(tr.children('td.destest').text());
            let bdgInsured = tr.attr('data_insured');
            let pjtId = $('#IdProject').val();

            if (bdgSku != undefined) {
                let par = `
                [{
                    "bdgSku"          : "${bdgSku}",
                    "bdgLevel"        : "${bdgLevel}",
                    "bdgProduc"       : "${bdgProduct}",
                    "bdgPricBs"       : "${bdgPriceBase}",
                    "bdgQtysBs"       : "${bdgQuantity}",
                    "bdgDaysBs"       : "${bdgDaysBase}",
                    "bdgDescBs"       : "${bdgDesctBase}",
                    "bdgDaysTp"       : "${bdgDayTrip}",
                    "bdgDescTp"       : "${bdgDesTrip}",
                    "bdgDaysTr"       : "${bdgDayTest}",
                    "bdgDescTr"       : "${bdgDesTest}",
                    "bdgInsured"      : "${bdgInsured}",
                    "verId"           : "${verId}",
                    "prdId"           : "${prdId}",
                    "pjtId"           : "${pjtId}"
                }]`;

                var pagina = 'Budget/SaveBudget';
                var tipo = 'html';
                var selector = resp_budget;
                fillField(pagina, par, tipo, selector);
            }
        }
    });
}

function resp_budget(dt) {
    caching_events('resp_budget');
    $('#P' + dt).trigger('click');
}

/**  +++++ Guarda el producto en la cotización +++++ */
function fill_budget(pr, vr, ix) {
    caching_events('fill_budget');
    //console.log(pr);
    // console.log(vr);
    // console.log(ix);

    $('#Products .sel_product .textbox-finder').val('');

    let insurance = pr.prd_insured == 0 ? 0 : 0.1;

    var par = `
    [{
        "prdSku"    : "${pr.prd_sku}",
        "prdName"   : "${pr.prd_name}",
        "prdPrice"  : "${pr.prd_price}",
        "prdId"     : "${pr.prd_id}",
        "prdInsur"  : "${insurance}",
        "subname"   : "${pr.sbc_name}",
        "verId"     : "${vr}",
        "indx"      : "${ix}"
    }]
    `;

    let nRows = $('.frame_content table tbody tr').length;

    load_budget(ix, nRows);
}

/**   ++++++  Arma los elementos para agregar ala cotización */
function load_budget(inx, bdgId) {
    caching_events('load_budget');

    let insurance = prod[inx].prd_insured == 0 ? 0 : 0.1;
    let produ = prod[inx].prd_name.replace(/\"/g, '°');
    let days = get_days_period();

    let par = `{
        "bdg_id"            : "${bdgId}",
        "bdg_prod_sku"      : "${prod[inx].prd_sku}",
        "bdg_prod_name"     : "${produ}",
        "bdg_prod_price"    : "${prod[inx].prd_price}",
        "bdg_quantity"      : "1",
        "bdg_days_base"     : "${days}",
        "bdg_discount_base" : "0",
        "bdg_days_trip"     : "0",
        "bdg_discount_trip" : "0",
        "bdg_days_test"     : "0",
        "bdg_discount_test" : "0",
        "bdg_insured"       : "${insurance}",
        "bdg_prod_level"    : "${prod[inx].prd_level}",
        "prd_id"            : "${prod[inx].prd_id}",
        "bdg_stock"         : "${prod[inx].stock}",
        "sbc_name"          : "${prod[inx].sbc_name}"
    }
    `;
    // console.log(par);
    let ky = registered_product('bdg' + prod[inx].prd_id);
    if (ky == 0) {
        rgevn = 0;
        rgcnt = 1;
        fill_budget_prods(par, days);
    }
}

function registered_product(id) {
    let ky = 0;
    $('.frame_content table tbody tr').each(function () {
        let idp = $(this).attr('id');
        if (id == idp) {
            let qty = parseInt($(this).children('td.qtybase').text()) + 1;
            $(this).children('td.qtybase').text(qty);
            rgcnt = 1;
            update_totals();
            $('.sel_product .textbox-finder').val('');
            $('.box_list_products').fadeOut(200, function () {
                $(`#Products .list_products ul`).html('');
            });
            ky = 1;
        }
    });
    return ky;
}

/** ++++++ Llena la tabla de cotizaciones */
function fill_budget_prods(pd, days) {
    caching_events('fill_budget_prods');
    let pds = JSON.parse(pd);
    let prdName = pds.bdg_prod_name.replace(/°/g, '"');
    let H = `
    <tr id="bdg${pds.prd_id}" class="bdg${pds.prd_id}" data_sku="${pds.bdg_prod_sku}" data_insured="${pds.bdg_insured}" data_level="${pds.bdg_prod_level}" >
        <td class="w1 product"><i class="fas fa-ellipsis-v"></i>${prdName}<i class="fas fa-bars minimenu" id="mnu${pds.prd_id}"></i></td>
        <td class="w1 subcate hide">${pds.sbc_name}</td>
        <td class="w2 zone_01 quantity qtybase" data_quantity="${pds.bdg_stock}" contenteditable="true">${pds.bdg_quantity}</td>
        <td class="w3 zone_01 price prcbase">${mkn(pds.bdg_prod_price, 'n')}</td>
        <td class="w2 zone_01 days daybase" contenteditable="true">${pds.bdg_days_base}</td>
        <td class="w2 zone_01 desct desbase sel"><i class="fas fa-caret-left" id="dscbase${pds.prd_id}"></i><span>${mkn(pds.bdg_discount_base, 'n')}</span>%</td>
        <td class="w3 zone_01 cost costbase">0.00</td>
        <td class="w2 zone_02 days daytrip" contenteditable="true">${pds.bdg_days_trip}</td>
        <td class="w2 zone_02 desct destrip sel"><i class="fas fa-caret-left" id="dsctrip${pds.prd_id}"></i><span>${mkn(pds.bdg_discount_trip, 'n')}</span>%</td>
        <td class="w3 zone_02 cost costtrip">0.00</td>
        <td class="w2 zone_03 days daytest" contenteditable="true">${pds.bdg_days_test}</td>
        <td class="w2 zone_03 desct destest sel"><i class="fas fa-caret-left" id="dsctest${pds.prd_id}"></i><span>${mkn(pds.bdg_discount_test, 'n')}</span>%</td>
        <td class="w3 zone_03 cost costtest">0.00</td>
    </tr>
    `;
    // $('.table_control tbody tr:last-child').before(H);
    $('#tblControl tbody').append(H);

    $('#addProduct').removeClass('hide');

    editable_disable('tbl_dynamic');

    $('.sel_product .textbox-finder').val('');
    $('.box_list_products').fadeOut(200, function () {
        $(`#Products .list_products ul`).html('');
    });

    let nRows = $('.frame_content table tbody tr').length;
    if (nRows > 0) {
        $('#addBudget').removeClass('disable').addClass('enable');
    }

    $('#tblControl td i')
        .unbind('click')
        .on('click', function (e) {
            let idsel = $(this).attr('id');
            let x = e.pageX;
            let y = e.pageY;

            show_minimenues(idsel, x, y);
        });

    update_totals();

    $('.quantity')
        .unbind('blur')
        .on('blur', function () {
            hide_control_menu('none');

            qtybs = parseInt(pure_num($(this)[0].outerText));
            qtyst = parseInt(pure_num($(this)[0].attributes[1].value));

            if (qtybs > qtyst) {
                qtybs = qtyst;
            }
            if (qtybs < 1) qtybs = 1;
            $(this).html(qtybs);

            rgcnt = 1;
            update_totals();
        });
    $('.days')
        .unbind('blur')
        .on('blur', function () {
            hide_control_menu('none');
            let dy = $(this).attr('class');
            let days = get_days_period();
            if (dy.indexOf('daybase') >= 0) {
                let dys = $(this).text();
                let sel = 'daybase';
                dys = days_validator(dys, days, sel);
                $(this).text(dys);
            } else if (dy.indexOf('daytrip') >= 0) {
                let dys = $(this).text();
                let sel = 'daytrip';
                dys = days_validator(dys, days, sel);
                $(this).text(dys);
            } else if (dy.indexOf('daytest') >= 0) {
                let dys = $(this).text();
                let sel = 'daytest';
                dys = days_validator(dys, days, sel);
                $(this).text(dys);
            }
            rgcnt = 1;
            update_totals();
        });
}

function set_minimenu() {
    $('.minimenu')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('tr');
            let posLeft = id.offset().left;
            let posTop = id.offset().top;
            let prdId = id.attr('id').substring(3, 10);
            let prdLvl = id.attr('data_level');
            $('.box_minimenu')
                .css({top: posTop - 35 + 'px', left: posLeft + 320 + 'px'})
                .fadeIn(400);

            var H = `
        <li data_content="${prdId}" class="mini_option killProd"><i class="fas fa-trash"></i> Eliminar</li>
        <li data_content="${prdId}" data_level="${prdLvl}" class="mini_option infoProd"><i class="fas fa-info-circle"></i> Información</li>
            `;
            $('.list_menu ul').html(H);

            $('.box_minimenu')
                .unbind('mouseleave')
                .on('mouseleave', function () {
                    $(this).fadeOut(200);
                });

            $('.mini_option')
                .unbind('click')
                .on('click', function () {
                    let option = $(this).attr('class').split(' ')[1];
                    let prdId = $(this).attr('data_content');
                    let prdLvl = $(this).attr('data_level');
                    let blkSts = $('.menu_block').css('display');
                    switch (option) {
                        case 'killProd':
                            hide_control_menu('none');
                            let rsp = confirm('¿Realmente requieres de eliminar este producto?');
                            if (rsp) {
                                kill_product(prdId);
                            }
                            break;
                        case 'infoProd':
                            show_info_product(prdId, prdLvl);
                            break;
                        default:
                    }
                });
        });
}

function order_subcategories() {
    $('.frame_content table thead th').each(function (colm) {
        $(this)
            .unbind('click')
            .on('click', function () {
                let regs = $('.frame_content').find('tbody > tr').get();
                let cl = $(this).text();
                regs.sort(function (a, b) {
                    // console.log($(a).children('td').text());
                    let v1 = $(a).children('td').eq(colm).text().toUpperCase();
                    let v2 = $(b).children('td').eq(colm).text().toUpperCase();
                    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
                });

                $.each(regs, function (i, e) {
                    $('.frame_content tbody').append(e);
                });

                let newrg = $('.frame_content').find('tbody').html();
                $('.frame_fix_row tbody').html(newrg);
                $('.frame_fix_col tbody').html(newrg);
                $('.frame_fix_top tbody').html(newrg);
            });
    });

    $('.frame_content table thead .subcate').trigger('click');
}

function kill_product(id) {
    $('.bdg' + id).fadeOut(500, function () {
        $('.bdg' + id).remove();
        rgcnt = 1;
        update_totals();
    });
}

function show_info_product(id, lvl) {
    caching_events('add_client');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );

    let H = `
        <div class="row">
            <div class="form col-sm-12 col-md-12 col-lg-8 col-xl-8 qst">
                <div class="product_container">
                    <h2>Nombre del producto<br><small><small>Producto</small></small></h2>
                    <span class="subcatego"></span><span class="catego"></span>
                    <table>
                        <tr>
                            <th>SKU</th>
                            <th id="titcol">NOMBRE DEL ACCESORIO</th>
                            <th>PRECIO</th>
                        </tr>
                        
                    </table>
                    <div class="space_end"></div>
                </div>
                <div class="fix_buttons">
                    <button class="bn btn-cn">Cerrar</button>
                </div>
            </div>
            <div class="form col-sm-12 col-md-12 col-lg-4 col-xl-4 image img01"></div>
        </div>
    `;
    $('.box_modal').html(H);
    get_products_related(id, lvl);

    $('.btn-cn').on('click', function () {
        close_modal();
    });
}
/**  Llena el listado de relacionados al prducto */
function put_products_related(dt) {
    let name = '',
        titcol = '';
    switch (dt[0].prd_level) {
        case 'K':
            name = dt[0].prd_name + '<br><span>PAQUETE</span>';
            titcol = 'NOMBRE DEL PAQUETE Y PRODUCTOS';
            break;
        case 'P':
            name = dt[0].prd_name + '<br><span>PRODUCTO</span>';
            titcol = 'NOMBRE DEL PRODUCTO Y ACCESORIOS';
            break;
        case 'A':
            name = dt[0].prd_name + '<br><span>ACCESORIO</span>';
            titcol = 'NOMBRE DEL ACCESORIO';
            break;
        default:
    }
    $('.product_container h2').html(name);
    $('#titcol').html(titcol);
    $('.catego').html('<small>CÁTALOGO:</small> ' + dt[0].cat_name);
    $('.subcatego').html('<small>SUBCATEGORIA:</small> ' + dt[0].sbc_name);

    $.each(dt, function (v, u) {
        let cls = v == 0 ? 'blk' : '';
        let H = `
        <tr>
            <td class="pdd_sku ${cls}">${u.prd_sku}</td>
            <td class="pdd_nam ${cls}">${u.prd_name}</td>
            <td class="pdd_prc ${cls}">${mkn(u.prd_price, 'n')}</td>
        </tr>
        `;
        $('.product_container table').append(H);
    });
}

/** ++++ Oculta el menu de control */
function hide_control_menu(prm) {
    $('.menu_block').css({display: prm});
}

/**  Agrega nuevo cliente */
function add_client() {
    caching_events('add_client');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );

    let H = `
        <div class="row">
            <div class="form col-sm-12 col-md-12 col-lg-8 col-xl-8 qst">
                
                <div class="form_group">
                    <label for="txtCustomerName">Nombre del cliente:</label>
                    <input type="text" id="txtCustomerName" name="txtCustomerName" class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerType">Tipo de cliente:</label>
                    <div class="subgroup">
                    Casa Productora<span id="t1"> <i class="far fa-circle tt"></i></span>Productor<span id="t2"><i class="far fa-circle tt"></i></span>
                    </div>
                </div>

                <div class="form_group">
                    <label for="txtCustomerContact">Nombre del contacto:</label>
                    <input type="text" id="txtCustomerContact" name="txtCustomerContact"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerAddress">Domicilio:</label>
                    <input type="text" id="txtCustomerAddress" name="txtCustomerAddress"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerMail">Correo electrónico:</label>
                    <input type="text" id="txtCustomerMail" name="txtCustomerMail"  class="textbox">
                </div>

                <div class="form_group">
                    <label for="txtCustomerPhone">Teléfono:</label>
                    <input type="text" id="txtCustomerPhone" name="txtCustomerPhone"  class="textbox">
                </div>

                    <button class="bn btn-ok" id="saveCostumer">agregar cliente</button>
                    <button class="bn btn-cn">Cancelar</button>
            </div>
            <div class="form col-sm-12 col-md-12 col-lg-4 col-xl-4 image img01"></div>
        </div>
    `;
    $('.box_modal').html(H);

    $('.tt').on('click', function () {
        let typeCus = $(this).parent('span').attr('id');
        $('.tt').removeClass('fas').addClass('far');
        $(this).removeClass('far').addClass('fas');
    });

    $('#saveCostumer').on('click', function () {
        save_costumer();
    });

    $('.btn-cn').on('click', function () {
        close_modal();
    });
}

/**  Coloca los datos del cliente del formulario en la cotización */
function save_costumer() {
    caching_events('save_costumer');
    let CustomerName = $('#txtCustomerName').val();
    let CustomerContact = $('#txtCustomerContact').val();
    let CustomerAddress = $('#txtCustomerAddress').val();
    let CustomerMail = $('#txtCustomerMail').val();
    let CustomerPhone = $('#txtCustomerPhone').val();
    let CustomerId = $('.tt.fas').parent().attr('id').substring(1, 2);

    $('#Customer').text(CustomerName);
    $('#AddressProducer').text(CustomerAddress);
    $('#EmailProducer').text(CustomerMail);
    $('#PhoneProducer').text(CustomerPhone);

    var par = `
        [{
            "cus_name"      : "${CustomerName}",
            "cus_contact"   : "${CustomerContact}",
            "cus_address"   : "${CustomerAddress}",
            "cus_email"     : "${CustomerMail}",
            "cus_phone"     : "${CustomerPhone}",
            "cus_id"        : "${CustomerId}"
        }]`;
    console.log(par);

    close_modal();
}

/**  Agrega nuevo proyecto */
function add_project() {
    caching_events('add_project');
    $('.box_modal_deep').css({display: 'flex'});
    $('.box_modal').animate(
        {
            top: '70px',
        },
        500
    );
    clean_projects_field();
    clean_customer_field();

    let H = `
    <div class="row">
        <div class="form col-sm-12 col-md-12 col-lg-8 col-xl-8 qst">
            <div class="form_group">
                <label for="txtProject">Nombre del proyecto:</label>
                <input type="text" id="txtProject" name="txtProject" class="textbox" autocomplete="off"><br>
                <span class="alert"></span>
            </div>

            <div class="form_group" id="reportrange">
                <label for="txtPeriodProject">Periodo:</label><br>
                <input type="text" id="txtPeriodProject"  name="txtPeriodProject" class="textbox">
                <i class="fas fa-calendar-alt" id="calendar"></i><br>
                <span class="alert"></span>
            </div>

            <div class="form_group">
                <label for="txtLocation">Locación:</label>
                <input type="text" id="txtLocation" name="txtLocation" class="textbox" autocomplete="off">
            </div>

            <div class="form_group">
                <label for="txtTypeProject">Tipo de proyecto:</label>
                <select id="txtTypeProject" name="txtTypeProject" class="form-select" >
                    <option value="0"> Selecciona un tipo de proyecto</option>
                </select>
                <span class="alert"></span>
            </div>

            <div class="form_group">
                <label for="txtTypeLocation">Tipo de locación:</label>
                <select id="txtTypeLocation" name="txtTypeLocation" class="form-select" >
                    <option value="1"> Local</option>
                    <option value="2"> Foraneo</option>
                </select>
            </div>

            <div class="form_group">
                <label for="txtCustomer">Cliente:</label>
                <select id="txtCustomer" class="form-select">
                    <option value="0"> Ninguno</option>
                </select>
                <span class="alert"></span>
            </div>

            <div class="form_group">
                <label for="txtCustomerRel">Relación:</label>
                <select id="txtCustomerRel" class="form-select">
                    <option value="0"> Ninguno</option>
                </select>
                <span class="alert"></span>
            </div>
            <div class="space_end"></div>

            <div class="fix_buttons">
                <button class="bn btn-ok" id="saveProject">agregar proyecto</button>
                <button class="bn btn-cn">Cancelar</button>
            </div>
        </div>
        <div class="form col-sm-12 col-md-12 col-lg-4 col-xl-4 image img02"></div>
    </div>
`;

    $('.box_modal').html(H);

    load_project_type();

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
            opens: 'right',
        },
        function (start, end, label) {
            $('#txtPeriodProject').val(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
            // $('#txtPeriodProject').parent().children('span').html('');
            // console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
        }
    );

    // Llena el selector de clientes
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = `<option value="${u.cus_id}"> ${u.cus_name}</option>`;
            $('#txtCustomer').append(H);
        }
    });

    // Llena el selector de relacion de clientes
    $.each(cust, function (v, u) {
        if (u.cut_id == 2) {
            let H = `<option value="${u.cus_id}"> ${u.cus_name}</option>`;
            $('#txtCustomerRel').append(H);
        }
    });

    $('#saveProject').on('click', function () {
        let ky = 0;

        if ($('#txtProject').val() == '') {
            ky = 1;
            $('#txtProject').parent().children('span').html('Debes agregar Nombre del proyecto');
        }
        if ($('#txtPeriodProject').val() == '') {
            ky = 1;
            $('#txtPeriodProject').parent().children('span').html('Debes agregar las fechas del projecto');
        }
        console.log($('#txtTypeProject option:selected').val());
        if ($('#txtTypeProject option:selected').val() == '0') {
            ky = 1;
            $('#txtTypeProject').parent().children('span').html('Debes seleccionar el tipo de projecto');
        }
        if ($('#txtCustomer option:selected').val() == '0') {
            ky = 1;
            $('#txtCustomer').parent().children('span').html('Debes seleccionar un cliente');
        }

        if (ky == 0) {
            save_project();
        }
    });

    $('.textbox').on('focus', function () {
        $(this).parent().children('span').html('');
    });

    $('#txtCustomer').on('change', function () {
        $('#txtCustomer').parent().children('span').html('');
        $('#txtCustomerRel option').show();
        let cte = $('#txtCustomer option:selected').val();
        $('#txtCustomerRel option[value="' + cte + '"]').hide();
    });

    $('.btn-cn').on('click', function () {
        close_modal();
    });
}

/**  Coloca los datos del proyecto del formulario en la cotización */
function save_project() {
    caching_events('save_project');
    let projName = $('#txtProject').val();
    let projLocation = $('#txtLocation').val();
    let projLocationTypeValue = $('#txtTypeLocation option:selected').val();
    let projLocationTypeText = $('#txtTypeLocation option:selected').text();
    let projPeriod = $('#txtPeriodProject').val();
    let projType = $('#txtTypeProject option:selected').val();
    let cusCte = $('#txtCustomer option:selected').val();
    let cusCteRel = $('#txtCustomerRel option:selected').val();

    let projDateStart = moment(projPeriod.split(' - ')[0], 'DD/MM/YYYY').format('YYYYMMDD');
    let projDateEnd = moment(projPeriod.split(' - ')[1], 'DD/MM/YYYY').format('YYYYMMDD');

    let cuoId = 0;
    $.each(relc, function (v, u) {
        if (cusCte == u.cus_id && cusCteRel == u.cus_parent) {
            cuoId = u.cuo_id;
        }
    });

    let par = `
    [{
        "pjtName"       : "${projName}",
        "pjtLocation"   : "${projLocation}",
        "pjtDateStart"  : "${projDateStart}",
        "pjtDateEnd"    : "${projDateEnd}",
        "pjtType"       : "${projType}",
        "locId"         : "${projLocationTypeValue}",
        "cuoId"         : "${cuoId}",
        "cusId"         : "${cusCte}",
        "cusParent"     : "${cusCteRel}"
    }]
    `;

    console.log(par);

    $('#version').html('C0001');
    close_modal();

    $('#Projects i.clean')
        .unbind('click')
        .on('click', function () {
            clean_projects_field();
        });

    var pagina = 'Budget/SaveProject';
    var tipo = 'html';
    var selector = load_project;
    fillField(pagina, par, tipo, selector);
}

/**  ++++++ Inicia la carga de proyectos */
function load_project(dt) {
    caching_events('load_project');
    $('#Projects .list_items ul').html('');
    get_projects();

    setTimeout(() => {
        $('#P' + dt).trigger('click');
    }, 2000);
}

/**  Cierra la ventana del modal */
function close_modal() {
    caching_events('close_modal');
    $('.box_modal').animate(
        {
            top: '120%',
        },
        500,
        function () {
            $('.box_modal_deep').css({display: 'none'});
        }
    );
}

/** ++++++ Selecciona los productos del listado */
function sel_product(res, sele) {
    res = res.toUpperCase();

    if (res.length > 2) {
        // $(`#${sele} .list_products ul`).html('');
        let dstrO = $('#PeriodProject').text().split(' - ')[0];
        let dendO = $('#PeriodProject').text().split(' - ')[1];
        let dstr = moment(dstrO, 'DD/MM/YYYY').format('YYYY-MM-DD');
        let dend = moment(dendO, 'DD/MM/YYYY').format('YYYY-MM-DD');
        if (res.length == 3) {
            get_products(res.toUpperCase(), dstr, dend);
        } else {
            $('#Products .list_products ul li').css({display: 'none'});
            $('#Products .list_products ul li.enable').each(function (index) {
                var cm = $(this).attr('data_content').toUpperCase().replace(/|/g, '');

                cm = omitirAcentos(cm);
                var cr = cm.indexOf(res);
                if (cr > -1) {
                    $(this).css({display: 'block'});
                }
            });
        }
        $('#Products .list_products').css({display: 'block'});
    } else {
        $(`#Products .list_products ul`).html('');
        $(`#Products .list_products`).css({display: 'none'});
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

/**  Muestra el menu de descuentos */
function fill_discount(psy, psx) {
    let H = `
        <div class="box_desc">
            <ul></ul>
        </div>
    `;
    $('body').append(H);
    $.each(disc, function (v, u) {
        H = `<li data_content="${u.dis_discount}">${u.dis_name}</li>`;
        $('.box_desc ul').append(H);
    });

    $('.box_desc').css({top: psy - 20 + 'px', left: psx - 30 + 'px'});

    $('.box_desc').on('mouseleave', function () {
        $(this).remove();
    });
}

/**  Valida los parametros de días */
function days_validator(dys, days, idsel) {
    console.log(dys, days, idsel);
    if (dys != '') {
        if (idsel == 'daybase') {
            if (dys > days) {
                alert('El numero de días no puede ser mayor \nal periodo definido para el proyecto.');
                dys = days;
            }
        } else if (idsel == 'daytrip') {
            let mod = dys % 2;
            if (mod != 0 || dys > 6) {
                alert('El numero de días debe ser par y no mayor a 6 días.');
                dys = 0;
            }
        } else if (idsel == 'daytest') {
            if (dys > 5) {
                alert('El numero de días debe ser mayor a 5 días.');
                dys = 5;
            }
        }
        // $('.' + idsel).text(dys);
        return dys;
    }
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

/**  +++++ Cachando eventos   */
function caching_events(ev) {
    //console.log(ev);
}
/**  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */
/**  +++++ Convierte la cotizacion en un proyecto                                */
/**  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  */

function make_project() {
    let projectId = $('#IdProject').val();
    let versionId = $('.menu_version').attr('data_content');
    promote_project();
}

function get_budgets_promote() {
    $('.frame_content #tblControl tbody tr').each(function (v) {
        let tr = $(this);
        if (tr.attr('id') != undefined) {
            let pjtdt_sku = tr.attr('data_sku');

            if (bdgSku != undefined) {
                let par = `
                [{
                    "bdgSku"          : "${bdgSku}",
                }]`;
            }
        }
    });
}

function promote_project() {
    modal_loading();

    let projectId = $('#IdProject').val();
    var pagina = 'Budget/PromoteProject';
    var par = `[{"pjtId":"${projectId}"}]`;
    var tipo = 'html';
    var selector = show_promote_project;
    caching_events('promote_project');
    fillField(pagina, par, tipo, selector);
}

function show_promote_project(dt) {
    let versionId = $('.menu_version').attr('data_content');
    var pagina = 'Budget/PromoteVersion';
    var par = `[{"verId":"${versionId}","pjtId":"${dt}"}]`;
    var tipo = 'html';
    var selector = show_promote_version;
    caching_events('promote_version');
    fillField(pagina, par, tipo, selector);
}

function show_promote_version(dt) {
    let pjtId = dt.split('|')[0];
    let verId = dt.split('|')[1];

    $('#P' + pjtId).remove();
    clean_projects_field();
    clean_customer_field();
    show_promote_budget(dt);
}

function show_promote_budget(dt) {
    let pjtId = dt.split('|')[0];
    let verId = dt.split('|')[1];

    var pagina = 'Budget/ProcessProjectProduct';
    var par = `[{"verId":"${verId}", "pjtId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = show_result;
    caching_events('promote_version');
    fillField(pagina, par, tipo, selector);
}

function show_result(dt) {
    console.log(dt);
    $('.box_loading_deep').css({display: 'none'});
}

function modal_loading() {
    $('.box_loading_deep').css({display: 'flex'});
    $('.box_loading').animate(
        {
            top: '170px',
        },
        500
    );
}

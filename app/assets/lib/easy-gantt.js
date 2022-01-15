$.fn.gantt = function (options) {
    moment.locale('es');

    let lastindex = [];

    let dtStart = moment(options.dtStart, 'YYYY-MM-DD'); // Define início del calendario
    let dtEnd = moment(options.dtEnd, 'YYYY-MM-DD'); // Define el fin del calendario
    let countMonth = dtEnd.diff(dtStart, 'month'); // Verifica cantidad de meses entre fechas

    let firstDay = '01/' + dtStart.format('MM/YYYY'); // Define el primer dia de fecha início
    let lastDay = dtEnd.endOf('month').format('DD') + '/' + dtEnd.format('MM/YYYY'); // Define el último dia de la fecha final
    let countDays = 1 + moment(lastDay, 'DD/MM/YYYY').diff(moment(firstDay, 'DD/MM/YYYY'), 'days'); // Verifica la cantidad de dias entre las fechas
    let periodDays = moment(options.dtEnd, 'YYYY-MM-DD').diff(moment(options.dtStart, 'YYYY-MM-DD'), 'days') + 1; // total de dias del perido
    let tasks = options.data;
    let divGantt = $(this);
    let unic = divGantt.attr('id') + '_' + moment().format('s'); // Crea la instancia única para minupular la tabla
    let idThead = '#thead_' + unic;
    let idTbody = '#tbody_' + unic;
    let conflicts = '#conflicts_' + unic;
    let tooltipShow = options.tooltipShow === false ? false : true;

    $(this).css({'margin-left': 'auto', 'margin-right': 'auto', width: '100%'});

    let table = `<div id="conflicts_${unic}"></div><div></div>
                <table class="tb-gantt" id="${unic}" border="0">
                    <thead id="thead_${unic}">
                    </thead>
                    <tbody id="tbody_${unic}">
                    </tbody>
                </table>
                `;
    $(this).html(table);

    var headerMonthTable = '<th></th>';
    for (let i = 0; i <= countMonth; i++) {
        let month = moment(dtStart, 'DD/MM/YYYY').add(i, 'month').format('MMMM YYYY').toUpperCase();
        let countDaysMonth = moment(dtStart, 'DD/MM/YYYY').add(i, 'month').endOf('month').format('DD');
        let classMonth = i % 2 == 0 ? 'month-name-odd' : 'month-name-par';
        headerMonthTable += `<th class="${classMonth}" colspan="${countDaysMonth}">${month}</th>`;
    }
    $(idThead).html('<tr>' + headerMonthTable + '</tr>');

    // Coloca la cabecera de los días
    var headerDaysTable = '<th></th>';
    for (let i = 0; i <= countDays - 1; i++) {
        let day = moment(firstDay, 'DD/MM/YYYY').add(i, 'days').format('DD');
        let dayNumber = moment(firstDay, 'DD/MM/YYYY').add(i, 'days').dayOfYear();
        headerDaysTable += `<th class="days" day_number="${dayNumber}"><p>${day}</p></th>`;
    }
    $(idThead).append('<tr>' + headerDaysTable + '</tr>');

    // Coloca la cabecera de los días
    let taskOrigin = '';
    $.each(tasks, function (index, task) {
        let taskName = task.name ? task.name : '';
        if (taskName != taskOrigin) {
            var bodyDaysTable = `<th>${taskName}</th>`;
            for (let i = 0; i <= countDays - 1; i++) {
                let dayNumber = moment(firstDay, 'DD/MM/YYYY').add(i, 'days').format('YYYYMMDD');
                bodyDaysTable += `<td class="days ${dayNumber} block" day_serie="${taskName}-${dayNumber}" pjtpd_id_detail="${task.parent}"></td>`;
            }
            var dataRow = '<tr data_row="' + task.id + '">' + bodyDaysTable + '</tr>';
            $(idTbody).append(dataRow);
            taskOrigin = taskName;
        }
    });

    $.each(tasks, function (index, task) {
        let taskName = task.name ? task.name : '';
        let tsksqnc = task.seqnc;
        let tskdays = moment(task.date_end, 'YYYY-MM-DD').diff(moment(task.date_start, 'YYYY-MM-DD'), 'days');

        for (var i = 0; i <= tskdays; i++) {
            var daycurr = moment(task.date_start, 'YYYY-MM-DD').add(i, 'days').format('YYYYMMDD');
            //    console.log(taskName, daycurr, tsksqnc);

            $(`#tbody_${unic} td[day_serie="${taskName}-${daycurr}"]`).attr('day_serie', taskName + '-' + daycurr + '-' + tsksqnc);
        }
        // console.log('----');
    });

    //Define el rango del proyecto

    $.each(tasks, function (index, task) {
        let taskName = task.name ? task.name : '';
        let tsksqc = task.seqnc;
        let tskdtst = moment(task.date_start, 'YYYY-MM-DD').format('YYYYMMDD');
        let tskdten = moment(task.date_end, 'YYYY-MM-DD').format('YYYYMMDD');

        var dtcurr = '';
        for (var i = 0; i < periodDays; i++) {
            dtcurr = moment(options.dtStart, 'YYYY-MM-DD').add(i, 'days').format('YYYYMMDD');
            $(`#tbody_${unic} td.${dtcurr}`).removeClass('block').addClass('free reference');
            //            $(`#tbody_${unic} td[day_serie="${taskName}-${dtcurr}-${task.seqnc}"]`).removeClass('block').addClass('free reference');

            if (dtcurr >= tskdtst && dtcurr <= tskdten) {
                //console.log(taskName, dtcurr, tskdtst, tskdten, tsksqc);
                $(`#tbody_${unic} td[day_serie="${taskName}-${dtcurr}-${tsksqc}"].free`).attr('sku', taskName);
                $(`#tbody_${unic} td[day_serie="${taskName}-${dtcurr}-${tsksqc}"].free`).attr('pjtpd_day_start', tskdtst);
                $(`#tbody_${unic} td[day_serie="${taskName}-${dtcurr}-${tsksqc}"].free`).attr('pjtpd_day_end', tskdten);
                $(`#tbody_${unic} td[day_serie="${taskName}-${dtcurr}-${tsksqc}"].free`).attr('pjtpd_sequence', tsksqc);
            }
        }
        // console.log('-----');
    });

    var H = '<div class="E"></div>';
    $(`#tbody_${unic} td.free`).html(H);

    //Define el rango de la seleccion inicial
    $.each(tasks, function (index, task) {
        let d1 = moment(task.date_start, 'YYYY-MM-DD');
        let d2 = moment(task.date_end, 'YYYY-MM-DD');
        let dycnt = d2.diff(d1, 'days');
        //console.log(d1.format('YYYYMMDD'), d2.format('YYYYMMDD'), task.id.toString());
        var dtcurr = '';
        let taskName = task.name ? task.name : '';

        lastindex.push(task.id);

        for (var i = 0; i <= dycnt; i++) {
            dtcurr = moment(task.date_start, 'YYYY-MM-DD').add(i, 'days').format('YYYYMMDD');
            var A = '';
            switch (i) {
                case 0:
                    A = 'I'; /** Inicial */
                    break;
                case dycnt:
                    A = 'F'; /** Final */
                    break;
                default:
                    A = 'M'; /** Medio */
                    break;
            }

            $(`#tbody_${unic} td[day_serie="${taskName}-${dtcurr}-${task.seqnc}"].free`).children('div').removeAttr('class').addClass(A).attr('data_id', task.id);
        }
    });

    $('td.free.reference').on('mousemove', function (e) {
        $('.tooltip-gantt').css('top', e.pageY + 10);
        $('.tooltip-gantt').css('left', e.pageX + 20);
        $('.tooltip-gantt').show();

        let sqnc = $(this).attr('pjtpd_sequence');

        let ds = moment($(this).attr('pjtpd_day_start'), 'YYYYMMDD');
        let de = moment($(this).attr('pjtpd_day_end'), 'YYYYMMDD');

        let dst = moment($(this).attr('pjtpd_day_start'), 'YYYYMMDD').format('DD MMMM YYYY').toUpperCase();
        let den = moment($(this).attr('pjtpd_day_end'), 'YYYYMMDD').format('DD MMMM YYYY').toUpperCase();

        let taskdays = de.diff(ds, 'days') + 1;
        let busy = $(this).children('div').attr('class');

        if (busy != 'E') {
            let tooltipGantt = `<div class="tooltip-gantt">
                <b>${$(this).attr('sku')}</b><br>
                <span>${dst} a ${den}</span><br>
                <span>${taskdays} días</span>
                <hr>
                <span>${$(this).attr('pjtpd_id_detail')} - ${sqnc}</span>
                </div>`;
            $('body').append(tooltipGantt);
            $('.tooltip-gantt').css('z-index', 10000);
        }
    });

    $('td.free.reference').on('mouseleave', function (e) {
        // Arrasta o tooltip de acordo com o mouse
        $('.tooltip-gantt').remove();
    });

    $('td.free').on('mouseover', function () {
        var column = $(this).attr('class').split(' ')[1];
        $(`.${column}`).addClass('over');
    });
    $('td.free').on('mouseleave', function () {
        var column = $(this).attr('class').split(' ')[1];
        $(`.${column}`).removeClass('over');
    });

    lastindex.sort();
    let lastItem = lastindex[lastindex.length - 1];
    $('td.free')
        .unbind('mousedown')
        .on('mousedown', function (e) {
            if (e.ctrlKey) {
                var rf = $(this);
                //console.log(rf.children().attr('class'));
                var dayPrev = $(this).prev().children('div');
                var dayNext = $(this).next().children('div');
                var clsPrev = dayPrev.attr('class') == undefined ? 'E' : dayPrev.attr('class');
                var clsNext = dayNext.attr('class') == undefined ? 'E' : dayNext.attr('class');
                var taskname = rf.attr('data_name');

                // console.log(taskname);
                if (rf.children().attr('class') == 'E') {
                    if (clsPrev == 'E' && clsNext == 'E') {
                        $(this).children('div').removeAttr('class').addClass('A');
                        //console.log('Medida 1');
                    }
                    if (clsPrev == 'A' && clsNext == 'I') {
                        $(this).children('div').removeAttr('class').addClass('M');
                        $(this).prev().children('div').removeAttr('class').addClass('I');
                        $(this).next().children('div').removeAttr('class').addClass('M');
                        //console.log('Medida 2');
                    }
                    if ((clsPrev == 'A' || clsPrev == 'I' || clsPrev == 'M') && clsNext == 'E') {
                        $(this).children('div').removeAttr('class').addClass('F');
                        $(this).prev().children('div').removeAttr('class').addClass('I');
                        //console.log('Medida 3');
                    }
                    if (clsPrev == 'F' && clsNext == 'E') {
                        $(this).children('div').removeAttr('class').addClass('F');
                        $(this).prev().children('div').removeAttr('class').addClass('M');
                        //console.log('Medida 4');
                    }
                    if (clsPrev == 'E' && clsNext == 'I') {
                        $(this).children('div').removeAttr('class').addClass('I');
                        $(this).next().children('div').removeAttr('class').addClass('M');
                        //console.log('Medida 5');
                    }
                    if (clsPrev == 'E' && clsNext == 'A') {
                        $(this).children('div').removeAttr('class').addClass('I');
                        $(this).next().children('div').removeAttr('class').addClass('F');
                        //console.log('Medida 6');
                    }
                    if (clsPrev == 'F' && clsNext == 'I') {
                        $(this).children('div').removeAttr('class').addClass('M');
                        $(this).prev().children('div').removeAttr('class').addClass('M');
                        $(this).next().children('div').removeAttr('class').addClass('M');
                        //console.log('Medida 7');
                    }
                    if (clsPrev == 'A' && clsNext == 'A') {
                        $(this).children('div').removeAttr('class').addClass('M');
                        $(this).prev().children('div').removeAttr('class').addClass('I');
                        $(this).next().children('div').removeAttr('class').addClass('F');
                        //console.log('Medida 7A');
                    }
                    if (clsPrev == 'F' && clsNext == 'A') {
                        $(this).children('div').removeAttr('class').addClass('M');
                        $(this).prev().children('div').removeAttr('class').addClass('M');
                        $(this).next().children('div').removeAttr('class').addClass('F');
                        //console.log('Medida 7B');
                    }
                    var sku = $(this).attr('day_serie').split('-')[0];
                    $(this).attr('sku', sku);
                } else {
                    if ($(this).children('div').attr('class') == 'M' && clsPrev == 'M' && clsNext == 'M') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('F');
                        $(this).next().children('div').removeAttr('class').addClass('I');
                        //console.log('Medida 8');
                    }
                    if ($(this).children('div').attr('class') == 'M' && clsPrev == 'I' && clsNext == 'M') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('A');
                        $(this).next().children('div').removeAttr('class').addClass('I');
                        //console.log('Medida 9');
                    }
                    if ($(this).children('div').attr('class') == 'I' && clsPrev == 'E' && clsNext == 'F') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('E');
                        $(this).next().children('div').removeAttr('class').addClass('A');
                        //console.log('Medida 10');
                    }
                    if ($(this).children('div').attr('class') == 'F' && clsPrev == 'I' && clsNext == 'E') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('A');
                        $(this).next().children('div').removeAttr('class').addClass('E');
                        //console.log('Medida 11');
                    }
                    if ($(this).children('div').attr('class') == 'A' && clsPrev == 'E' && clsNext == 'E') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('E');
                        $(this).next().children('div').removeAttr('class').addClass('E');
                        //console.log('Medida 12');
                    }
                    if ($(this).children('div').attr('class') == 'I' && clsPrev == 'E' && clsNext == 'M') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('E');
                        $(this).next().children('div').removeAttr('class').addClass('I');
                        //console.log('Medida 13');
                    }
                    if ($(this).children('div').attr('class') == 'F' && clsPrev == 'M' && clsNext == 'E') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('F');
                        $(this).next().children('div').removeAttr('class').addClass('E');
                        //console.log('Medida 14');
                    }
                    if ($(this).children('div').attr('class') == 'M' && clsPrev == 'M' && clsNext == 'F') {
                        $(this).children('div').removeAttr('class').addClass('E');
                        $(this).prev().children('div').removeAttr('class').addClass('F');
                        $(this).next().children('div').removeAttr('class').addClass('A');
                        //console.log('Medida 15');
                    }
                }

                redraw_period($(this).parent('tr'), '0');
            }

            // var ps = $(this).children('.reference').attr('class').split(' ')[1];
            // var pr = $(this).children('.reference').attr('data_part');
        });

    $(function () {
        $('#' + unic).scroll(function (ev) {
            /**
             * When the table scrolls we use the scroll offset to move
             * the axis to the correct place. Use a CSS transform rather
             * that just setting the left and top properties so we keep
             * the table sizing (no position change) and because
             * transforms are hardware accelerated.
             */
            $('#' + unic + '.tb-gantt thead th').css({transform: 'translateY(' + this.scrollTop + 'px)'});
            // There are better ways to handle this, but this make the idea clear.
            $('#' + unic + '.tb-gantt tbody th').css({transform: 'translateX(' + this.scrollLeft + 'px)'});
        });
    });
};

function redraw_period(th, ky) {
    var dini;
    var dfin;
    var stl = '';
    var seq = 1;
    var sqq = 0;
    var dys = 0;
    var ddy = 0;

    $(th)
        .children('td')
        .each(function () {
            var div = $(this).children('div');
            var key = div.attr('class');
            if (key != 'E') {
                if (key === 'I') {
                    stl += div.parents('tr').attr('data_row') + ',';
                    stl += seq + ',';
                    stl += div.parents('td').attr('pjtpd_id_detail') + ',';
                    stl += div.parents('td').attr('day_serie').split('-')[0] + ',';
                    stl += div.parents('td').attr('class').split(' ')[1] + ',';
                    ddy = 1;
                }
                if (key === 'M') {
                    dys++;
                }
                if (key === 'F') {
                    seq++;
                    ddy = dys + 2;
                    dys = 0;
                    stl += div.parents('td').attr('class').split(' ')[1] + ',' + ddy + '|';
                }
                if (key === 'A') {
                    stl += div.parents('tr').attr('data_row') + ',';
                    stl += seq + ',';
                    stl += div.parents('td').attr('pjtpd_id_detail') + ',';
                    stl += div.parents('td').attr('day_serie').split('-')[0] + ',';
                    stl += div.parents('td').attr('class').split(' ')[1] + ',';
                    stl += div.parents('td').attr('class').split(' ')[1] + ',1|';
                    ddy = 0;
                }
            }
        });
    stl = stl.slice(0, stl.length - 1);
    $('.tooltip-gantt').remove();
    /*
        stl position 

        0 - pjtpd_id
        1 - pjtpd_sequence
        2 - pjtdt_id
        3 - pjtdt_sku
        4 - pjtpd_day_start
        5 - pjtpd_day_end
        6 - total range days
*/

    if (ky == 0) {
        updateTooltipInfo(stl);
    } else {
        return stl;
    }
}

function updateTooltipInfo(stl) {
    let gpopar = stl.split('|');
    $.each(gpopar, function (v, u) {
        var itm = u.split(',');
        var sqc = itm[1];
        var sku = itm[3];
        var dst = itm[4];
        var den = itm[5];

        var dys = moment(den, 'YYYYMMDD').diff(moment(dst, 'YYYYMMDD'), 'days');
        for (var i = 0; i <= dys; i++) {
            var dcr = moment(dst, 'YYYYMMDD').add(i, 'days').format('YYYYMMDD');
            $(`td[sku="${sku}"].${dcr}`).attr('pjtpd_day_start', dst);
            $(`td[sku="${sku}"].${dcr}`).attr('pjtpd_day_end', den);
            $(`td[sku="${sku}"].${dcr}`).attr('pjtpd_sequence', sqc);
            $(`td[sku="${sku}"].${dcr}`).attr('day_serie', `${sku}-${dcr}-${sqc}`);
        }
    });
}

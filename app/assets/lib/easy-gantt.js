$.fn.gantt = function (options) {
    moment.locale('es');

    let lastindex = [];

    let dtStart = moment(options.dtStart, 'YYYY-MM-DD'); // Define início del calendario
    let dtEnd = moment(options.dtEnd, 'YYYY-MM-DD'); // Define el fin del calendario
    let countMonth = dtEnd.diff(dtStart, 'month'); // Verifica cantidad de meses entre fechas

    let firstDay = '01/' + dtStart.format('MM/YYYY'); // Define el primer dia de fecha início
    let lastDay = dtEnd.endOf('month').format('DD') + '/' + dtEnd.format('MM/YYYY'); // Define el último dia de la fecha final
    let countDays = 1 + moment(lastDay, 'DD/MM/YYYY').diff(moment(firstDay, 'DD/MM/YYYY'), 'days'); // Verifica la cantidad de dias entre las fechas
    let periodDays = dtEnd.diff(dtStart, 'days'); // total de dias del perido
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
                bodyDaysTable += `<td class="days ${dayNumber} block" day_serie="${taskName}-${dayNumber}" ></td>`;
            }
            $(idTbody).append('<tr>' + bodyDaysTable + '</tr>');
            taskOrigin = taskName;
        }
    });

    //Define el rango del proyecto
    $.each(tasks, function (index, task) {
        let taskName = task.name ? task.name : '';

        var datePeriodProject = '';
        for (var i = 0; i < periodDays; i++) {
            datePeriodProject = moment(options.dtStart, 'YYYY-MM-DD').add(i, 'days').format('YYYYMMDD');
            if (taskName != '') {
                $(`#tbody_${unic} td[day_serie="${taskName}-${datePeriodProject}"]`).removeClass('block').addClass('free');
                $(`#tbody_${unic} td[day_serie="${taskName}-${datePeriodProject}"].free`).attr('day_task', taskName);
                $(`#tbody_${unic} td[day_serie="${taskName}-${datePeriodProject}"].free`).attr('day_start', moment(task.date_start, 'YYYY-MM-DD').format('YYYYMMDD'));
                $(`#tbody_${unic} td[day_serie="${taskName}-${datePeriodProject}"].free`).attr('day_end', moment(task.date_end, 'YYYY-MM-DD').format('YYYYMMDD'));
            }
        }
    });

    //Define el rango de la seleccion inicial
    $.each(tasks, function (index, task) {
        let d1 = moment(task.date_start, 'YYYY-MM-DD');
        let d2 = moment(task.date_end, 'YYYY-MM-DD');
        let dycnt = d2.diff(d1, 'days');
        console.log(d1.format('YYYYMMDD'), d2.format('YYYYMMDD'), task.id.toString());
        var datePeriodProject = '';
        let taskName = task.name ? task.name : '';

        lastindex.push(task.id);

        for (var i = 0; i <= dycnt; i++) {
            datePeriodProject = moment(task.date_start, 'YYYY-MM-DD').add(i, 'days').format('YYYYMMDD');
            // console.log(taskName, datePeriodProject);
            var A = '';
            switch (i) {
                case 0:
                    A = 'I';
                    break;
                case dycnt:
                    A = 'F';
                    break;
                default:
                    A = 'A';
                    break;
            }
            var H = `
            <div class="reference ${A}"></div>
            `;
            $(`#tbody_${unic} td[day_serie="${taskName}-${datePeriodProject}"].free`).html(H);
        }
    });

    $('td.free .reference').on('mousemove', function (e) {
        $('.tooltip-gantt').css('top', e.pageY + 10);
        $('.tooltip-gantt').css('left', e.pageX + 20);
        $('.tooltip-gantt').show();

        let ds = moment($(this).parent().attr('day_start'), 'YYYYMMDD');
        let de = moment($(this).parent().attr('day_end'), 'YYYYMMDD');

        let dst = moment($(this).parent().attr('day_start'), 'YYYYMMDD').format('DD MMM YYYY').toUpperCase();
        let den = moment($(this).parent().attr('day_end'), 'YYYYMMDD').format('DD MMM YYYY').toUpperCase();

        let taskdays = de.diff(ds, 'days') + 1;

        let tooltipGantt = `<div class="tooltip-gantt">
        <b>${$(this).parent().attr('day_task')}</b><br>
        <span>${dst} a ${den}</span><br>
        <span>${taskdays} días</span>
        <hr>
        <span></span>
        </div>`;
        $('body').append(tooltipGantt);
        $('.tooltip-gantt').css('z-index', 10000);
    });

    $('td.free .reference').on('mouseout', function (e) {
        // Arrasta o tooltip de acordo com o mouse
        $('.tooltip-gantt').hide();
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
        .unbind('click')
        .on('click', function () {
            var rf = $(this);
            // console.log(rf.children().attr('class'));
            if (rf.children().attr('class') == undefined) {
                var dayPrev = $(this).prev().children('div').attr('class');
                var dayNext = $(this).next().children('div').attr('class');
                var taskname = rf.attr('data_name');

                console.log(dayPrev, dayNext, taskname);
                if (dayPrev == undefined && dayNext == undefined) {
                    var dhed = 'I';
                    var dprt = parseInt(lastItem) + 1;
                    var dnam = rf.attr('day_task');
                    var dstr = rf.attr('day_start');
                    var dend = rf.attr('day_end');
                    var ddys = 1;
                    redraw_period(this, dhed, dprt, dnam, dstr, dend, ddys);
                    lastItem = dprt;
                }

                if ((dayPrev.split(' ')[1] == 'I' || dayPrev.split(' ')[1] == 'A') && dayNext == undefined) {
                    var dhed = 'A';
                    var dprt = parseInt(lastItem);
                    var dnam = rf.attr('day_task');
                    var dstr = rf.attr('day_start');
                    var dend = rf.attr('day_end');
                    var ddys = 1;
                    redraw_period(this, dhed, dprt, dnam, dstr, dend, ddys);
                }

                if ((dayPrev.split(' ')[1] == 'I' || dayPrev.split(' ')[1] == 'A') && dayNext.split(' ')[1] == 'F') {
                    var dhed = 'A';
                    var dprt = parseInt(lastItem);
                    var dnam = rf.attr('day_task');
                    var dstr = rf.attr('day_start');
                    var dend = rf.attr('day_end');
                    var ddys = 1;
                    redraw_period(this, dhed, dprt, dnam, dstr, dend, ddys);
                }
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

function redraw_period(sel, dhed, dprt, dnam, dstr, dend, ddys) {
    var H = `
    <div class="reference ${dhed}" 
        data_part   = "${dprt}"
        data_name   = "${dnam}"
        data_start  = "${dstr}"
        data_end    = "${dend}"
        data_days   = "${ddys}">
    </div>
    `;
    $(sel).html(H);
}

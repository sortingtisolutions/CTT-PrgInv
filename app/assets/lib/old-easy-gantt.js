$.fn.gantt = function (options) {
    moment.locale('es');

    let dtStart = moment(options.dtStart, 'YYYY-MM-DD'); // Define início del calendario
    let dtEnd = moment(options.dtEnd, 'YYYY-MM-DD'); // Define el fin del calendario
    let countMonth = dtEnd.diff(dtStart, 'month'); // Verifica cantidad de meses entre fechas

    let firstDay = '01/' + dtStart.format('MM/YYYY'); // Define el primer dia de fecha início
    let lastDay = dtEnd.endOf('month').format('DD') + '/' + dtEnd.format('MM/YYYY'); // Define el último dia de la fecha final
    let countDays = 1 + moment(lastDay, 'DD/MM/YYYY').diff(moment(firstDay, 'DD/MM/YYYY'), 'days'); // Verifica la cantidad de dias entre las fechas
    let tasks = options.data;
    let divGantt = $(this);
    let unic = divGantt.attr('id') + '_' + moment().format('s'); // Crea la instancia única para minupular la tabla
    let idThead = '#thead_' + unic;
    let idTbody = '#tbody_' + unic;
    let conflicts = '#conflicts_' + unic;
    let tooltipShow = options.tooltipShow === false ? false : true;

    $(this).css({'margin-left': 'auto', 'margin-right': 'auto', width: '100%'});

    let table = `<div id="conflicts_${unic}"></div><div></div>
                <table class="tb-gantt" id="${unic}">
                    <thead id="thead_${unic}">
                    </thead>
                    <tbody id="tbody_${unic}">
                    </tbody>
                </table>
                `;
    $(this).html(table);

    // Coloca la cabecera de los meses
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

    // Mapeia todos os IDs de dependências
    let deps = $.map(tasks, function (val, i) {
        if (val.dep) {
            return val.dep.split(',');
        }
    });

    $.each(tasks, function (index, task) {
        if (deps.indexOf(task.id.toString()) < 0 && task.date_start && task.date_end) {
            let d1 = moment(task.date_start, 'YYYY-MM-DD');
            let d2 = moment(task.date_end, 'YYYY-MM-DD');
            let taskName = task.name ? task.name : '';
            let titleName = task.title ? task.title : taskName;
            let taskColor = task.color ? task.color : '#ADFF2F';
            let daysCount = d2.diff(d1, 'days') + 1;
            let labelT = options.labelTask ? taskName : '';
            let classTd = index % 2 == 0 ? 'td-bg1' : 'td-bg2';
            console.log(daysCount);
            var tasksTable = '<tr>';
            tasksTable += `<th colspan="1"><p><i class="far fa-calendar-plus addPeriod" id="${task.parent}" title="agregar nuevo periodo"></i>&nbsp;${titleName}</p></th>`;
            tasksTable += `<td class="celda" colspan="${countDays}" id="TSK${task.parent}"></td>`;
            $(idTbody).append(tasksTable);
        }
    });

    let daysstart = dtStart.diff(moment(firstDay, 'DD/MM/YYYY'), 'days');
    let daysend = moment(options.dtEnd, 'YYYYMMDD').diff(moment(options.dtStart, 'YYYYMMDD'), 'days') + 1;
    let str = parseInt(daysstart) * 20;
    let lng = parseInt(daysend) * 20;

    console.log(options.dtStart, options.dtEnd, daysstart, daysend, lng);
    H = `<div class="rango periodo_01" style="left:${str}px; width: ${lng}px;"></div>`;
    $(`.celda`).append(H);

    $.each(tasks, function (index, task) {
        let d1 = moment(task.date_start, 'YYYY-MM-DD');
        let d2 = moment(task.date_end, 'YYYY-MM-DD');

        let dystr = d1.diff(moment(firstDay, 'DD/MM/YYYY'), 'days') * 20;
        let taskdays = d2.diff(d1, 'days') + 1;
        let dyend = (d2.diff(d1, 'days') + 1) * 20;

        let dstart = moment(task.date_start, 'YYYYMMDD').format('DD-MMM-YYYY').toUpperCase();
        let dend = moment(task.date_end, 'YYYYMMDD').format('DD-MMM-YYYY').toUpperCase();

        H = `<div class="rango periodo_02" style="left:${dystr}px; width: ${dyend}px;" 
                task_name="${task.name}"
                start="${dstart}"
                end="${dend}"
                task_days="${taskdays}"
                >
        <i class="far fa-calendar-plus editPeriod" id="${task.id}" title="editar periodo"></i>
        </div>`;
        $(`#TSK${task.parent}`).append(H);
    });

    $('.periodo_02').on('mousemove', function (e) {
        // Arrasta o tooltip de acordo com o mouse
        $('.tooltip-gantt').css('top', e.pageY + 10);
        $('.tooltip-gantt').css('left', e.pageX + 20);
        $('.tooltip-gantt').show();

        let tooltipGantt = `<div class="tooltip-gantt">
        <b>${$(this).attr('task_name')}</b><br>
        <span>${$(this).attr('start')} a ${$(this).attr('end')}</span><br>
        <span>${$(this).attr('task_days')} días</span>
        <hr>
        <span></span>
        </div>`;
        $('body').append(tooltipGantt);
        $('.tooltip-gantt').css('z-index', 10000);
    });

    $('.periodo_02').on('mouseout', function (e) {
        // Arrasta o tooltip de acordo com o mouse
        $('.tooltip-gantt').hide();
    });

    var idElm = '';
    var dys = '';
    var dye = '';

    $('.periodo_02 i.editPeriod').on('mouseover', function () {
        idElm = $(this).attr('id');
        dys = moment($(this).parent().attr('start'), 'DD-MMM-YYYY').format('DD/MM/YYYY');
        dye = moment($(this).parent().attr('end'), 'DD-MMM-YYYY').format('DD/MM/YYYY');
        console.log($(this).parent());
    });

    $('.periodo_02 i.editPeriod').daterangepicker(
        {
            showDropdowns: false,
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
            dateStart: dys,
            minDate: moment(options.dtStart, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            maxDate: moment(options.dtEnd, 'YYYY-MM-DD').format('DD/MM/YYYY'),
            opens: 'left',
        },
        function (start, end, label) {
            console.log(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'), idElm, dys, dye);

            update_range_sector(idElm, start, end, firstDay);
        }
    );

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

function update_range_sector(id, d1, d2, firstDay) {
    console.log(id, d1, d2, firstDay);

    let dystr = d1.diff(moment(firstDay, 'DD/MM/YYYY'), 'days') * 20;
    let taskdays = d2.diff(d1, 'days') + 1;
    let dyend = (d2.diff(d1, 'days') + 1) * 20;
    let elemt = $('#' + id).parent('div.periodo_02');

    elemt.css({left: dystr + 'px'});
    elemt.css({width: dyend + 'px'});
    elemt.attr('start', d1.format('DD-MMM-YYYY').toUpperCase());
    elemt.attr('end', d2.format('DD-MMM-YYYY').toUpperCase());
    elemt.attr('task_days', taskdays);
    //    update_range_data(id, d1, d2);

    console.log(id, d1.format('YYYY-MM-DD'), d2.format('YYYY-MM-DD'));
}

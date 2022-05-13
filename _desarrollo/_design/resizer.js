var widthDay = 20;
var fechaInicial = '20220510';
var fechaFinal = '20220610';

let series = [
    {serie: 'serie1', start: '20220511', end: '20220531'},

];

function iniciador() {
    moment.locale('es');
    let fecha1 = moment(fechaInicial, 'YYYYMMDD');
    let fecha2 = moment(fechaFinal, 'YYYYMMDD');
    let dias = fecha2.diff(fecha1, 'days');
    fulldias = dias;

    let serie = 250;
    let th = widthDay * (fulldias + 1);
    let tabla = serie + th;
    $('#periodsTable').css({width: tabla + 'px'});
    $('#periodsTable .wseries').css({width: th + 'px'});

    setSeries();
    colocaDias();
    rellenaDias();
    fechasOrigen();

    function colocaDias() {
        var H = '';

        let p1 = 0,
            p2 = 0,
            p3 = 1;
        let mn = moment(fechaInicial).format('MMMM');
        for (var a = 0; a <= fulldias; a++) {
            let ndia = moment(fechaInicial).add(a, 'days').format('D');
            let mdia = moment(fechaInicial).add(a, 'days').format('d');
            let mmon = moment(fechaInicial).add(a, 'days').format('MMMM');
            var tipoDia = 'numdia-habil';
            if (mdia == 6) {
                tipoDia = 'numdia-inhabil';
            }
            if (mdia == 0) {
                tipoDia = 'numdia-inhabil';
            }
            H = '<div class="numdia ' + tipoDia + '">' + ndia + '</div>';
            $('.thSerie').append(H);
            p1++;
            p2++;
            if (mn != mmon) {
                colocaMeses(mn, p1 - 1, p2 - 1, p3);
                p1 = 1;
                p3 = p2;
                mn = mmon;
            }
        }
        colocaMeses(mn, p1, p2, p3);
    }
    function colocaMeses(mn, p1, p2, p3) {
        let lf = p3 * widthDay - widthDay;
        let wt = p1 * widthDay;
        var H = `<div class="titMonth" id="${mn}}" style="left:${lf}px; width:${wt}px">${mn}</div>`;
        $('.thSerie').append(H);
    }
    function rellenaDias() {
        var H = '';
        for (var a = 0; a <= fulldias; a++) {
            let ndia = moment(fechaInicial).add(a, 'days').format('D');
            let mdia = moment(fechaInicial).add(a, 'days').format('d');
            var tipoDia = 'seldia-habil';
            if (mdia == 6) {
                tipoDia = 'seldia-inhabil';
            }
            if (mdia == 0) {
                tipoDia = 'seldia-inhabil';
            }
            H = `<div class="seldia ${tipoDia}" data-position="${a + 1}" data-dia="${ndia}">&nbsp;</div>`;
            $('.tdSerie').append(H);
        }

        resizing();

        $('.seldia-habil').on('dblclick', function () {
            let pos = parseInt($(this).attr('data-position'));
            let dtstart = moment(fechaInicial, 'YYYYMMDD').format('D');

            console.log(pos, dtstart, pos - dtstart);

            // let posIni = parseInt($(this).attr('data-eldia')) * widthDay - widthDay;
            let posIni = parseInt(pos * widthDay) - widthDay;

            console.log(posIni);
            let td = $(this).parent('td');
            H = ' <div class="rango" style="left: ' + posIni + 'px"></div>';
            td.append(H);
            resizing();
        });
    }

    $(`#periodsTable`).sticky({
        top: 'thead tr:first-child',
        left: 'tr th:first-child',
    });
}

function setSeries() {
    let sr = '';
    $.each(series, function (v, u) {
        if (sr != u.serie) {
            H = `
            <tr>
                <th><span class="name_serie">${u.serie}</span></th>
                <td id="${u.serie}" class="tdSerie wseries"></td>
            </tr>`;
            $('#periodsTable tbody').append(H);
            sr = u.serie;
        }
    });
}

function fechasOrigen() {
    console.log(series);
    let dini = moment(fechaInicial);
    $.each(series, function (v, u) {
        let dst = moment(u.start);
        let den = moment(u.end);
        let dif = den.diff(dst, 'days');
        let pointSt = dst.diff(dini, 'days') * widthDay;
        let widthSg = dif * widthDay + widthDay;
        console.log(u.serie, pointSt, widthSg);

        H = ` <div class="rango" style="left: ${pointSt}px; width:${widthSg}px"></div>`;
        $('#' + u.serie).append(H);
    });
    resizing();
}

function resizing() {
    counts = 0;
    $('.rango').resizable({
        containment: '.tdSerie',
        grid: [widthDay, widthDay],
        axis: 'x',
        handles: 'e',
        snap: true,
        resize: function (e, ui) {
            updateCounterStatus($(this));
        },
    });

    $('.rango').draggable({
        axis: 'x',
        grid: [widthDay, widthDay],
        containment: '.tdSerie',
        cursor: 'grabbing',
        drag: function () {
            updateCounterStatus($(this));
        },
    });
}
function updateCounterStatus(elm) {
    let dayStart = parseInt(elm.css('left')) / widthDay;
    let daysSelec = parseInt(elm.css('width')) / widthDay;
    $('.contador').html(dayStart + 1 + ' - ' + parseInt(daysSelec));
    elm.css({height: '18px'});
}

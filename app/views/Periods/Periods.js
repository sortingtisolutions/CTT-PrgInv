var widthDay = 20;
var serie = 250;
var rowLimit = 16;
var fechaInicial = '';
var fechaFinal = '';
var rngFrame = `<div class="rango__info">
                    <span class="info__sku"></span>
                    <span class="info__start"></span>
                    <span class="info__end"></span>
                    <hr>
                    <span class="info__days"></span>
                    <span class="info__segmen"></span>
                    
                </div>`;
var killme = '<i class="fas fa-times killme" title="Elimina este segmento"></i>';

var series = [];

$(document).ready(function () {
    getFullProjectRangePeriod();
});
//INICIO DE PROCESOS
function iniciador() {
    $('#periodsTable tbody').html('');
    moment.locale('es');
    let fecha1 = moment(fechaInicial, 'YYYYMMDD');
    let fecha2 = moment(fechaFinal, 'YYYYMMDD');
    let dias = fecha2.diff(fecha1, 'days');
    fulldias = dias;

    let th = widthDay * (fulldias + 1);
    let tabla = serie + th;
    $('#periodsTable').css({width: tabla + 'px'});
    $('#periodsTable .wseries').css({width: th + 'px'});

    setSeries();
    colocaDias();
    rellenaDias();

    function colocaDias() {
        var H = '';
        let p1 = 0,
            p2 = 0,
            p3 = 1;
        $('.thSerie').html('');
        let mn = moment(fechaInicial).format('MMMM YY');
        for (var a = 0; a <= fulldias; a++) {
            let ndia = moment(fechaInicial).add(a, 'days').format('D');
            let mdia = moment(fechaInicial).add(a, 'days').format('d');
            let mmon = moment(fechaInicial).add(a, 'days').format('MMMM YY');
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

            let posIni = parseInt(pos * widthDay) - widthDay;

            let elm = $(this).parents('tr').data('detail');
            let ix = getIndexSerie(elm);

            let td = $(this).parent('td');
            H = `<div class="rango" style="left:${posIni}px" data-element="${series[ix].pjtdt_id}" data-segment="1"  data-range = "">${rngFrame}${killme}</div>`;
            td.append(H);
            resizing();
            setTimeout(() => {
                numberSegments(elm);
            }, 1000);
            killSegment();
        });
    }

    $(`#periodsTable`).sticky({
        top: 'thead tr:first-child',
        left: 'tr th:first-child',
    });
    showinfoSegment();

    $('.toApplyPeriods')
        .unbind('click')
        .on('click', function () {
            let item = '';
            let arrg = '';

            let pjtdt_id = '';
            let gpo = $('#periodsTable tbody tr td div.rango');
            gpo.each(function (v) {
                let pjtdtId = $(this).data('element');

                if (item != pjtdtId) {
                    pjtdt_id += pjtdtId + ',';
                    item = pjtdtId;
                }
                arrg++;
            });
            pjtdt_id = pjtdt_id.substring(0, pjtdt_id.length - 1);

            var pagina = 'Periods/deletePeriods';
            var par = `[{"pjtdtId":"${pjtdt_id}", "counter":"${arrg}"}]`;
            var tipo = 'html';
            var selector = putDeletePeriods;
            fillField(pagina, par, tipo, selector);
        });
}

function putDeletePeriods(dt) {
    let cnt = dt.split('|')[0];
    let gpo = $('#periodsTable tbody tr td div.rango');
    gpo.each(function () {
        let pjtdtId = $(this).data('element');
        let sequency = $(this).data('segment');
        let start = $(this).data('range').split('-')[0];
        let end = $(this).data('range').split('-')[1];
        let data = {pjtdtId: pjtdtId, sequency: sequency, start: start, end: end, cnt: cnt};
        let par = '[' + JSON.stringify(data) + ']';
        var pagina = 'Periods/savePeriods';
        var tipo = 'html';
        var selector = putSavePeriods;
        fillField(pagina, par, tipo, selector);
    });
}

var cnts = 0;
function putSavePeriods(dt) {
    cnts++;
    if (dt == cnts) {
        cnts = 0;
        automaticCloseModal();
    }
}

function numberSegments(id) {
    $('#periodsTable tbody tr[data-detail="' + id + '"] td div.rango').each(function (i) {
        $(this)
            .attr('data-segment', i + 1)
            .addClass('displayable');
    });
    showinfoSegment();
}

function showinfoSegment() {
    $('.rango')
        .unbind('mousemove')
        .on('mousemove', function (e) {
            var parentOffset = $(this).offset();
            // let pss = e.pageX - parentOffset.left;
            let pss = 1;

            let real = e.clientX - parentOffset.left - 100;

            $('.rango__info')
                .css({left: real + 'px', top: '1.5rem'})
                .children('span.info__datos')
                .html(pss + ' - ' + real);
        });

    $('.rango')
        .unbind('mouseover')
        .on('mouseover', function () {
            $('.rango__info').html();
            var elm = $(this).data('element');
            let ix = getIndexSerie(elm);

            let range = $(this).attr('data-range').split('-');
            let dateIni = range[0];
            let dateEnd = range[1];

            $('.rango__info .info__sku').html('SKU: ' + series[ix].pjtdt_prod_sku);
            $('.rango__info .info__start').html(dateIni);
            $('.rango__info .info__end').html(dateEnd);

            let restDays = moment(dateEnd).diff(moment(dateIni), 'days') + 1;
            $('.rango__info .info__days').html(restDays + ' días');
            $('.rango__info .info__segmen').html('segmento :' + $(this).attr('data-segment'));
        });
}

function killSegment() {
    $('.killme')
        .unbind('click')
        .on('click', function () {
            let segment = $(this);
            let id = segment.parents('tr').data('detail');
            segment.parent().remove();
            numberSegments(id);
        });
}

function setSeries() {
    let sr = '';
    let rowbusy = 0;
    $('#periodsTable tbody').html('');
    $.each(series, function (v, u) {
        if (sr != u.pjtdt_id) {
            let nameSerie = u.pjtdt_prod_sku != 'Pendiente' ? u.serie.split('-')[1] : '<span class="pending">PENDIENTE</span>';
            H = `
            <tr data-detail="${u.pjtdt_id}">
                <th><span class="name_serie">${nameSerie}</span></th>
                <td id="${u.pjtdt_id}" class="tdSerie wseries"></td>
            </tr>`;
            $('#periodsTable tbody').append(H);
            sr = u.pjtdt_id;
            rowbusy++;
        }
    });

    if (rowLimit >= rowbusy) {
        rowspace = rowLimit - rowbusy;
    } else {
        rowspace = rowbusy + 5;
    }

    for (var i = 1; i <= rowspace; i++) {
        H = `
        <tr>
            <th><span class="name_serie">&nbsp;</span></th>
            <td class="tdSerie wseries"></td>
        </tr>`;
        $('#periodsTable tbody').append(H);
    }

    fechasOrigen();
}

function fechasOrigen() {
    let dini = moment(fechaInicial);
    $.each(series, function (v, u) {
        let dst = moment(u.start);
        let den = moment(u.end);
        let dif = den.diff(dst, 'days');
        let pointSt = dst.diff(dini, 'days') * widthDay;
        let widthSg = dif * widthDay + widthDay;

        var H = `<div id="${u.pjtpd_sequence}-${u.pjtdt_id}">`;
        $('#' + u.pjtdt_id).append(H);

        let idSeq = u.pjtpd_sequence + '-' + u.pjtdt_id;

        let elm = $('#' + idSeq);
        elm.css({left: pointSt + 'px', width: widthSg + 'px'})
            .addClass('rango displayable')
            .attr('data-element', u.pjtdt_id)
            .attr('data-segment', u.pjtpd_sequence)
            .attr('data-range', u.start + '-' + u.end)
            .html(rngFrame)
            .append(killme);
    });
    resizing();
    killSegment();
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
    let daysSelec = parseInt(elm.css('width')) / widthDay - 1;
    $('.contador').html(dayStart + ' - ' + parseInt(daysSelec));
    elm.css({height: '18px'});

    let sr = elm.data('element');
    let ix = getIndexSerie(sr);

    let dateIni = moment(fechaInicial).add(dayStart, 'days').format('YYYYMMDD');
    let dateEnd = moment(dateIni).add(parseInt(daysSelec), 'days').format('YYYYMMDD');

    elm.attr('data-element', series[ix].pjtdt_id).attr('data-range', dateIni + '-' + dateEnd);

    $('.rango__info .info__start').html(dateIni);
    $('.rango__info .info__end').html(dateEnd);
    showinfoSegment();
}

function getFullProjectRangePeriod() {
    let pjtId = $('#periodBox').attr('data-project');

    var pagina = 'Periods/getPeriodProject';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = putFullProjectRangePeriod;
    fillField(pagina, par, tipo, selector);
}
function putFullProjectRangePeriod(dt) {
    fechaInicial = dt[0].pjt_date_start;
    fechaFinal = dt[0].pjt_date_end;

    getSerieRangePeriod();
}
function getSerieRangePeriod() {
    let pjtId = $('#periodBox').attr('data-project');
    let prdId = $('#periodBox').attr('data-product');
    var pagina = 'Periods/getPeriodSeries';
    var par = `[{"pjtId":"${pjtId}","prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putSerieRangePeriod;
    fillField(pagina, par, tipo, selector);
}
function putSerieRangePeriod(dt) {
    if (dt[0].ser_id != '0') {
        $('.toApplyPeriods').attr('data-detail', dt[0].pjtcn_id);
        series = dt;
        iniciador();
    }
}

function getIndexSerie(sr) {
    let inx;
    $.each(series, function (v, u) {
        if (u.pjtdt_id == sr) {
            inx = v;
        }
    });

    return inx;
}

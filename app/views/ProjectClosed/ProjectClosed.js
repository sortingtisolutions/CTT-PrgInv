let pjts = null;

const pjs = $('#txtProjects');
const exp = $('#txtExpendab');
const man = $('#txtMaintenance');
const dis = $('#txtDiscount');
const com = $('#txtComments');

const tblprod = $('#tblProducts');
const totprj = $('#totProject');
const totexp = $('#totExpendab');
const totman = $('#totMaintenance');
const totdis = $('#totDiscount');
const totals = $('#totals');

const size = [
    { s: 20 },
    { s: 100 },
    { s: 400 },
    { s: 80 },
    { s: 80 },
    { s: 100 },
    { s: 600 },
];

$('document').ready(function () {
    url = getAbsolutePath();
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    if (altr == 1) {
        getProjects();
        widthTable(tblprod);

        $('#GuardarClosure').on('click', function () {
            saveDocumentClosure();
        
         });
      
         $('#PrintClosure').on('click', function () {
            /* LimpiaModal();
            getTipoProveedor();
            getOptionYesNo(); */
         });

    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}

// Obtiene el listado de los proyectos en etapa de pryecto
function getProjects() {
    let data = [
        {
            pjtId: '',
        },
    ];

    var pagina = 'ProjectClosed/listProjects';
    var par = JSON.stringify(data);
    var tipo = 'JSON';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);

    function putProjects(dt) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.pjt_id}">${u.pjt_name}</option>`;
            pjs.append(H);
        });

        pjs.unbind('change').on('change', function () {
            deep_loading('O');
            let pjtId = $(this).val();
            activeProjectsFunctions(pjtId);
        });
    }

    function activeProjectsFunctions(pjtId) {
        deep_loading('C');

        activaCampos(pjtId);
        findExpenda(pjtId);
        findMaintenance(pjtId);
        findDiscount(pjtId);

        setTimeout(() => {
            updateTotals();
        }, 2000);
    }
}

function activaCampos(pjtId) {
    $('.list-finder').removeClass('hide-items');
    getProjectContent(pjtId);
}

function getProjectContent(pjtId) {
    let data = [
        {
            pjtId: pjtId,
        },
    ];

    var pagina = 'ProjectClosed/projectContent';
    var par = JSON.stringify(data);
    var tipo = 'JSON';
    var selector = putProjectContent;
    fillField(pagina, par, tipo, selector);
    function putProjectContent(dt) {
        console.log(dt);
        tblprod.find('tbody').html('');
        $.each(dt, function (v, u) {
            let H = `<tr>
                        <td class="cn"></td>
                        <td class="lf">${u.pjtdt_prod_sku}</td>
                        <td class="lf">${u.pjtcn_prod_name}</td>
                        <td class="cn">1</td>
                        <td class="cn"></td>
                        <td class="rg">${fnm(
                            u.pjtcn_prod_price,
                            2,
                            '.',
                            ','
                        )}</td>
                        <td class="lf">${u.ser_comments}</td>
                    </tr>`;
            tblprod.append(H);
        });
        widthTable(tblprod);

        let tot = dt.reduce((tt, pc) => tt + parseFloat(pc.costo), 0);
        totprj.html(fnm(tot, 2, '.', ','));
        console.log(tot);
    }
}

function findExpenda(pjtId) {
    let data = [
        {
            pjtId: pjtId,
        },
    ];

    var pagina = 'ProjectClosed/saleExpendab';
    var par = JSON.stringify(data);
    var tipo = 'JSON';
    var selector = putSaleExpendab;
    fillField(pagina, par, tipo, selector);
    function putSaleExpendab(dt) {
        let cfr = dt[0].expendables;
        totexp.html(fnm(cfr, 2, '.', ','));
        exp.unbind('keyup').on('keyup', function () {
            let val = $(this).val();
            if (val == '') {
                val = cfr;
            }
            totexp.html(fnm(val, 2, '.', ','));
            updateTotals();
        });
    }
}

function saveDocumentClosure() {
    
        let cloTotProy = $('#totProject').val();
        let cloTotMaint = $('#totMaintenance').val();
        let cloTotExpen = $('#totExpendab').val();
        let cloTotCombu = $('#totDiesel').val();
        let cloTotDisco = $('#totDiscount').val();
        let cloCommen = $(`#txtComments`).val();
        let cusId = 1;
        let pjtid = 1;
        let usrid = 1;
        let verid = 1;

        var par = `
            [{
                "cloTotProy" : "${cloTotProy}",
                "cloTotMaint" : "${cloTotMaint}",
                "cloTotExpen" : "${cloTotExpen}",
                "cloTotCombu" : "${cloTotCombu}",
                "cloTotDisco" : "${cloTotDisco}",
                "cloCommen" : " ${cloCommen}",
                "cusId" :   "${cusId}",
                "pjtid" : "${pjtid}",
                "usrid" : "${usrid}",
                "verid" : "${verid}"
            }]
        `;
        console.log('EDITA ',par);
        var pagina = 'ProjectClosed/saveDocumentClosure';
        var tipo = 'html';
        var selector = resSaveClosure;
        fillField(pagina, par, tipo, selector);
}

function resSaveClosure(dt) {
    console.log(dt);
    /* $('#CustomerModal .btn_close').trigger('click');
    activeIcons(); */
}


function findMaintenance(pjtId) {
    let cfr = 0;
    man.unbind('keyup').on('keyup', function () {
        let val = $(this).val();
        if (val == '') {
            val = cfr;
        }
        totman.html(fnm(val, 2, '.', ','));
        updateTotals();
    });
}

function findDiscount(pjtId) {
    let cfr = 0;
    dis.unbind('keyup').on('keyup', function () {
        let val = $(this).val();
        if (val == '') {
            val = cfr;
        }
        totdis.html(fnm(val, 2, '.', ','));
        updateTotals();
    });
}

function updateTotals() {
    let total = parseFloat(totprj.html().replace(',', ''));
    total += parseFloat(totexp.html().replace(',', ''));
    total += parseFloat(totman.html().replace(',', ''));
    total -= parseFloat(totdis.html().replace(',', ''));
    // console.log(total);
    // totals.html(total);
    totals.html(fnm(total, 2, ',', '.'));
}

function widthTable(tbl) {
    $.each(size, (i, v) => {
        let thcel = tbl.find('thead tr').children('th').eq(i);
        let tdcel = tbl.find('tbody tr').children('td').eq(i);
        thcel.css({ width: v.s + 'px' });
        tdcel.css({ width: v.s + 'px' });
    });

    let wdt = size.reduce((acc, sz) => acc + sz.s, 0);
    tbl.css({ width: wdt + 'px' });
    tbl.sticky({ top: 'thead tr:first-child' });
}

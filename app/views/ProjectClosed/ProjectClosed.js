let pjts = null;

const pjs = $('#txtProjects');
const exp = $('#txtExpendab');
const man = $('#txtMaintenance');
const dis = $('#txtDiscount');
const com = $('#txtComments');
const extd = $('#txtDiesel');

const tblprod = $('#tblProducts');
const totprj = $('#totProject');
const totexp = $('#totExpendab');
const totman = $('#totMaintenance');
const totdie = $('#totDiesel');
const totdis = $('#totDiscount');
const totals = $('#totals');

const size = [
    { s: 20 },
    { s: 100 },
    { s: 400 },
    { s: 70 },
    { s: 70 },
    { s: 90 },
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
        listChgStatus();

        $('#GuardarClosure').on('click', function () {
            let locID = $(this);
            let pjtid = locID.parents('tr').attr('id');

            //console.log('Paso ToWork..', pjtid);
            confirm_to_Closure(pjtid);
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

function listChgStatus() {
    var pagina = 'ProjectClosed/listChgStatus';
    var par = '[{"parm":""}]';
    var tipo = 'json';
    var selector = putChgStatus;
    fillField(pagina, par, tipo, selector);
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
        findExtraDiesel(pjtId);
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
        {pjtId: pjtId, },
        ];

    var pagina = 'ProjectClosed/projectContent';
    var par = JSON.stringify(data);
    var tipo = 'JSON';
    var selector = putProjectContent;
    fillField(pagina, par, tipo, selector);
    }

    function putProjectContent(dt) {
        console.log(dt);
        if (dt[0].pjtdt_id!=''){
            /* <td class="lf">${u.ser_comments}</td> 
                <td class="lf"><input class="serprod fieldIn" type="text" id="id-${u.ser_id}" value="">${u.ser_comments}</td> */
            tblprod.find('tbody').html('');
            $.each(dt, function (v, u) {

                let H = `<tr id=${u.prd_id}, iname="${u.pjtcn_prod_name}">
                            <td class="cn"><i class='fas fa-pen modif'></i></td>
                            <td class="lf">${u.pjtdt_prod_sku}</td>
                            <td class="lf">${u.pjtcn_prod_name}</td>
                            <td class="cn">1</td>
                            <td class="cn">${u.ser_situation}</td>
                            <td class="rg">${fnm(u.costo, 2, '.', ',')}</td>
                            <td class="lf">${u.ser_comments}</td>
                        </tr>`;
                tblprod.append(H);
            });
        }    
        widthTable(tblprod);

        let tot = dt.reduce((tt, pc) => tt + parseFloat(pc.costo), 0);
        totprj.html(fnm(tot, 2, '.', ','));
        console.log(tot);
        activeIcons();
    }

function findExpenda(pjtId) {
    let data = [
        { pjtId: pjtId, },
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

function findExtraDiesel(pjtId) {
    let cfr = 0;
    extd.unbind('keyup').on('keyup', function () {
        let val = $(this).val();
        if (val == '') {
            val = cfr;
        }
        totdie.html(fnm(val, 2, '.', ','));
        updateTotals();
    });
}

function updateTotals() {
    let total = parseFloat(totprj.html().replace(',', ''));
    total += parseFloat(totexp.html().replace(',', ''));
    total += parseFloat(totman.html().replace(',', ''));
    total += parseFloat(totdie.html().replace(',', ''));
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

function confirm_to_Closure(pjtid) {
    $('#starClosure').modal('show');
    $('#txtIdClosure').val(pjtid);
    //borra paquete +
    $('#btnClosure').on('click', function () {
        /* let Id = $('#txtIdClosure').val();
        let tabla = $('#tblProducts').DataTable(); */
        $('#starClosure').modal('hide');

        //console.log('Datos',pjtid,Id);
        /* var pagina = 'WhOutputs/UpdateSeriesToWork';
        var par = `[{"pjtid":"${pjtid}"}]`;
        var tipo = 'json';
        var selector = putToWork;
        fillField(pagina, par, tipo, selector); */
    });
}

function putToWork(dt){
    console.log(dt)
}

function activeIcons() {
    console.log('Activa Iconos');
    $('.modif')
        .unbind('click')
        .on('click', function () {
            console.log('Click Iconos');
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id'); 
            let Lname = sltor.parents('tr').attr('iname');
            let prdNm = 'Modifica producto' ; //+ '-' + Lname
            console.log('Click Iconos',prdId, Lname);
            $('#txtPrdName').val(Lname);

            $('#ProductModal').removeClass('overlay_hide');
            $('.overlay_closer .title').html(prdNm);
            putSelectProduct(prdId);
            $('#ProductModal .btn_close')
                .unbind('click')
                .on('click', function () {
                    $('.overlay_background').addClass('overlay_hide');
                });
        });

}

function putChgStatus(dt) {
    if (dt[0].cin_id != '0') {
        let cinId = dt[0].cin_id;
        $.each(dt, function (v, u) {
            var H = `<option value="${u.pjtcr_id}">${u.pjtcr_definition}-${u.pjtcr_description}</option>`;
            $('#txtCinId').append(H);
        });
    }
}

function saveEditProduct() {
    
    let prdId = $('#txtPrdId').val();
    let prdNm = $('#txtPrdName').val().replace(/\"/g, '°');
    let prdCn = $(`#txtCinId option:selected`).val() == 0 ? '' : $(`#txtCinId option:selected`).text().split('-')[0];
    let prdNp = $('#txtPrdNameProvider').val();

    var par = `
            [{
                "prdId" : "${prdId}",
                "prdNm" : "${prdNm}",
                "prdCn" : "${prdCn}",
                "prdNp" : "${prdNp}"
            }] `;
    console.log(par);
   /*  var pagina = 'Products/saveEdtProduct';
    var tipo = 'html';
    var selector = resEdtProduct;
    fillField(pagina, par, tipo, selector); */
    resEdtProduct(prdId);
}

function putSelectProduct(dt) {
    // listChgStatus();
    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            $('#txtCinId').val('');
            saveEditProduct();
        });
}

function resEdtProduct(dt) {
    $('#txtCinId').val('');
    $('#ProductModal .btn_close').trigger('click');
    activeIcons();
}

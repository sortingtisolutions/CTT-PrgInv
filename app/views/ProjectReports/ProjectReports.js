let pjts = null;

const exp = $('#txtExpendab');
const man = $('#txtMaintenance');
const dis = $('#txtDiscount');
const com = $('#txtComments');

const tblprod = $('#tblProducts');
const fchini = $('#fechaInitial');
const fchfin = $('#fechaEnd');
const findana = $('#txtAnalyst');
const findcli = $('#txtClient');
const totals = $('#totals');

const size = [
    { s: 20 },
    { s: 250 },
    { s: 250 },
    { s: 100 },
    { s: 100 },
    { s: 500 },
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
        deep_loading('C');
        settingTable();
        activaCheck();
        getAnalysts();

        $('#btn_generate')
        .unbind('click')
        .on('click', function () {
            let pjtId = '0';
            findCampos();
            // getProjectContent(pjtId);
        });

        $('#btn_print')
        .unbind('click')
        .on('click', function () {
            let pjtId = '0';
            console.log('Print');
            printReport();
            // getProjectContent(pjtId);
        });

    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}

function settingTable() {
    let title = 'Lista de Proyectos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    // console.log('PASO 1');
    $('#tblProducts').DataTable({
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [50, 100, -1],
            [50, 100, 'Todos'],
        ],
        buttons: [
            {
                //Botón para Excel
                extend: 'excel',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
            },
            {
                //Botón para PDF
                extend: 'pdf',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
            },
            {
                //Botón para imprimir
                extend: 'print',
                footer: true,
                title: title,
                filename: filename,

                //Aquí es donde generas el botón personalizado
                text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 200px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            { data: 'editable', class: 'edit', orderable: false },
            { data: 'category', class: 'sku' },
            { data: 'catname', class: 'category-name' },
            { data: 'storename', class: 'store-name' },
            { data: 'quantity', class: 'quantity' },
            { data: 'storename', class: 'store-name' },
            { data: 'quantity', class: 'quantity' },
        ],
    });
}

// Obtiene el listado de los proyectos en etapa de pryecto
function getAnalysts() {
    let data = [
        { pjtId: '', },
    ];
    var pagina = 'ProjectReports/listAnalysts';
    var par = '[{"parm":""}]';
    var tipo = 'JSON';
    var selector = putAnalyst;
    fillField(pagina, par, tipo, selector);
    
    function putAnalyst(dt) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.emp_id}">${u.emp_fullname}</option>`;
            findana.append(H);
        });
    }

    /* findana.unbind('change').on('change', function () {
        deep_loading('O');
        let pjtId = $(this).val();
    }); */
}

function getCustomers() {
    let data = [
        { pjtId: '', },
    ];
    var pagina = 'ProjectReports/listCustomers';
    var par = '[{"parm":""}]';
    var tipo = 'JSON';
    var selector = putCustomers;
    fillField(pagina, par, tipo, selector);
    
    function putCustomers(dt) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.emp_id}">${u.emp_fullname}</option>`;
            findcli.append(H);
        });
    }
    /* findcli.unbind('change').on('change', function () {
        deep_loading('O');
        let pjtId = $(this).val();
    }); */
}

function getProjectContent(fechaIni,fechaFin,findAna,findCli,bandera) {
    let data = [
        {
            fechaIni: fechaIni,
            fechaFin: fechaFin,
            findAna: findAna,
            findCli: findCli,
            bandera: bandera
        },
    ];
    console.log('-DATOS ENVIADOS',data);
    var pagina = 'ProjectReports/projectContent';
    var par = JSON.stringify(data);
    var tipo = 'JSON';
    var selector = putProjectContent;
    fillField(pagina, par, tipo, selector);

    function putProjectContent(dt) {
        console.log('Registros', dt);
        tblprod.find('tbody').html('');
        $.each(dt, function (v, u) {
            let H = `<tr>
                        <td class="cn"</td>
                        <td class="cn">${u.pjt_name}</td>
                        <td class="lf">${u.pjttp_name}</td>
                        <td class="lf">${u.allsum}</td>
                        <td class="cn">${u.cus_name}</td>
                        <td class="lf">${u.pjt_name}</td>
                        <td class="lf">${u.pjttp_name}</td>
                    </tr>`;
            tblprod.append(H);
        });
        // widthTable(tblprod);
    }
}
function activaCampos(pjtId) {
    /* $('.list-finder').removeClass('hide-items');
    getProjectContent(pjtId); */
}

function activaCheck() {
    $('#checkIsAll').click(function () {
        $('input[type="checkbox"]').attr('checked', $('#checkIsAll').is(':checked'));
    });

   /*  $('#checkIsAll')
        .unbind('click')
        .on('click', function () {
            let itm = $(this).val(x);
            console.log('Aqui',itm);
            if (itm == 1) {
                $('#checkBack').val()='1';
                //$('input[type="checkbox"]').attr('check', 'checked');
            } else {
                console.log('0');
                $('input[type="checkbox"]').attr('checked', $('#checkIsAll').is(':checked'));
            }
        }) */
}



function findCampos(pjtId) {
    let fechaIni = fchini.val();
    const valorfchin = (fechaIni) => isNaN(Date.parse(fechaIni));
    let fechaFin = fchfin.val();
    let findAna  = findana.val();
    let findCli  = findcli.val(); 
    let bandera  = 0;

    if (valorfchin) {
        bandera  = 0;
    } else {
        bandera  = 1;
    }
    if (findAna) {
        bandera  = 2;
    }
    if (findCli) {
        bandera  = 2;
    }

    console.log(valorfchin(fechaIni),fechaFin,findAna,findCli,bandera);
    // let projDateStart = moment(fechaIni, 'DD/MM/YYYY').format('DD/MM/YYYY');
    // console.log(projDateStart);
    getProjectContent(fechaIni,fechaFin,findAna,findCli,bandera);
    
}

function printReport() {
    let user = Cookies.get('user').split('|');
    // let v = verId;
    let v=5;
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');

    console.log('Id-User', u, 'Name', n);
    window.open(
        `${url}app/views/ProjectReports/ProjectReportsReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
}

function findMaintenance(pjtId) {
  
}

function findDiscount(pjtId) {
   
}

function updateTotals() {
   
}

function widthTable(tbl) {
    /* $.each(size, (i, v) => {
        let thcel = tbl.find('thead tr').children('th').eq(i);
        let tdcel = tbl.find('tbody tr').children('td').eq(i);
        thcel.css({ width: v.s + 'px' });
        tdcel.css({ width: v.s + 'px' });
    });

    let wdt = size.reduce((acc, sz) => acc + sz.s, 0);
    tbl.css({ width: wdt + 'px' });
    tbl.sticky({ top: 'thead tr:first-child' }); */
}

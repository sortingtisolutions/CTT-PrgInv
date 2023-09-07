let products;
//let prjid = window.location.pathname.split("/").pop();
let prjid, serIdNew;
let serIdAnt=0;
let user,v,u,n,em;  //datos de usuaria para impresion
//var prjid;

$(document).ready(function () {
    if (verifica_usuario()) {
        // let temporal=Cookies.get('user');
        // console.log(temporal);
        prjid=Cookies.get('pjtid');
        inicial();
    }
});

//INICIO DE PROCESOS
function inicial() {
    user = Cookies.get('user').split('|');
    u = user[0];
    n = user[2];
    em = user[3];

    setting_table_AsignedProd();
    getProjects(prjid);
    getComments(prjid);
    getDetailProds(prjid,em);
    getFreelances(prjid);

    // Boton para registrar la salida del proyecto y los productos
    $('#recordOutPut').on('click', function () {
        confirm_to_GetOut(prjid);
     });

    // Boton para imprimir la salida de los productos
     $('#printOutPut').on('click', function () {
        printOutPut(prjid);
     });
}

// Solicita los paquetes  OK
function getProjects(prjid) {
    //console.log(prjid)
    var pagina = 'WhOutputContent/listProjects';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}

// Solicita los productos del proyecto  OK
function getDetailProds(prjid,empid) {
    var pagina = 'WhOutputContent/listDetailProds';
    var par = `[{"pjt_id":"${prjid}", "empid":"${empid}"}]`;
    var tipo = 'json';
    var selector = putDetailsProds;
    fillField(pagina, par, tipo, selector);
}

function getFreelances(prjid) {
    //console.log(prjid)
    var pagina = 'WhOutputContent/listFreelances';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = putFreelances;
    fillField(pagina, par, tipo, selector);
}
//Solicita las series de los productos  OK
function getSeries(pjtcnid) {
    // console.log('ID-Contenido Producto', pjtcnid);
    var pagina = 'WhOutputContent/listSeries';
    var par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}

// Solicita las series disponibles
function getSerieDetail(serid, serorg) {
    var pagina = 'WhOutputContent/listSeriesFree';
    var par = `[{"serid":"${serid}", "serorg":"${serorg}" }]`;
    var tipo = 'json';
    var selector = putSerieDetails;
    fillField(pagina, par, tipo, selector);
}

// Solicita los comentarios al proyecto
function getComments(prjid) {
    //console.log(prjid)
    var pagina = 'WhOutputContent/listComments';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = puComments;
    fillField(pagina, par, tipo, selector);
}

//**************  NIVEL 1 DE DATOS *****************************************

// Configura la tabla de productos del proyecto
function setting_table_AsignedProd() {
    let title = 'Contenido de proyectos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblAsignedProd').DataTable({
        bDestroy: true,
        order: [[ 4, 'asc' ], [ 1, 'asc' ]],
        dom: 'Blfrtip',
        lengthMenu: [
                [100, 200, -1],
                [100, 200, 'Todos'],
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
               /*  {
                    //Botón para imprimir
                    extend: 'print',
                    footer: true,
                    title: title,
                    filename: filename,

                    //Aquí es donde generas el botón personalizado
                    text: '<button class="btn btn-print"><i class="fas fa-print"></i></button>',
                }, */
                {
                    // Boton imprimir contenido jjr
                    text: 'Print Contenido',
                    className: 'btn-apply',
                    action: function (e, dt, node, config) {
                        // printContent(prjid, 'A');
                        printReports(prjid, 'C');
                    },
                },
                {
                    // Boton imprimir detalle jjr
                    text: ' Print Detalle ',
                    className: 'btn-apply',
                    action: function (e, dt, node, config) {
                        // printDetail(prjid);
                        printReports(prjid, 'D');
                    },
                },
                 {
                    // Boton imprimir detalle jjr
                    text: ' Print Accesories ',
                    className: 'btn-apply',
                    action: function (e, dt, node, config) {
                        // printDetail(prjid);
                        printReports(prjid, 'A');
                    },
                },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 240px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit'},
            {data: 'pack_sku', class: 'sel sku'},
            {data: 'packname', class: 'sel supply'},
            {data: 'packcount', class: 'sel sku'},
            {data: 'packstatus', class: 'sel sku'},
            {data: 'packlevel', class: 'sel sku'},
        ],
    });
}

//AGREGA LOS DATOS GENERALES DEL PROYECTO
function putProjects(dt) {
    /* let user = Cookies.get('user').split('|');
    let u = user[0];
    let n = user[2]; */
    let usrname=n.replaceAll('+',' ');
    // console.log('Datas-',n, usrname);
    $('#txtProjectName').val(dt[0].pjt_name);
    $('#txtProjectNum').val(dt[0].pjt_number);
    $('#txtTipoProject').val(dt[0].pjttp_name);
    $('#txtStartDate').val(dt[0].pjt_date_start);
    $('#txtEndDate').val(dt[0].pjt_date_end);
    $('#txtLocation').val(dt[0].pjt_location);
    $('#txtCustomer').val(dt[0].cus_name);
    $('#txtAnalyst').val(usrname);
    // $('#txtFreelance').val(dt[0].freelance);
}

// ### LISTO ### Llena la TABLA INICIAL de los detalles del proyecto
function putDetailsProds(dt) {

    if (dt[0].pjtpd_id != '0')
    {
        let valstage='';
        let locsecc='';

        let tabla = $('#tblAsignedProd').DataTable();
        // $('#tblAsignedProd table tbody').html('');
        $.each(dt, function (v, u){

            if (u.section == 'Base') { valstage='#e2e8f8'; }
            else if (u.section == 'Extra') { valstage='#f8e2e8'; }
            else if (u.section == 'Por dia') { valstage='#e8f8c2'; }
            else { valstage='#e2f8f2'; }

            //console.log(valstage);
            let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);

            var rownode=tabla.row
                .add({
                    editable: `<i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i>`,
                    pack_sku: skufull,
                    packname: u.pjtcn_prod_name,
                    packcount: u.pjtcn_quantity,
                    packstatus: u.section,
                    packlevel: u.pjtcn_prod_level,
                    /* '<input class="serprod fieldIn" type="text" id="PS-' + par[0].sercostimp + '" value="' + par[0].sercostimp + '">' */
                    /* pack_sku: `<span class="hide-support" id="SKU-${u.pjtcn_prod_sku}">${u.pjtcn_id}</span>${u.pjtcn_prod_sku}`, */
                })
                .draw().node();
            $(rownode).css("background-color", valstage)
            // $("tr").css("background-color", valstage);
            $(`#SKU-${u.pjtcn_prod_sku}`).parent().parent().attr('id', u.pjtcn_id).addClass('indicator');
        });
        activeIcons();
    }
}

function putFreelances(dt) {
    if (dt[0].free_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.free_id}"> ${u.free_name} - ${u.are_name}</option>`;
            $('#txtFreelance').append(H);
        });
    }
}
// ***************** se agregan los comentarios del proyecto jjr ***************
function puComments(dt) {
    if (dt[0].com_id != '0')
    {
        let valConcat=''
        $.each(dt, function (v, u){
            valConcat=valConcat + u.com_user + ': ' + u.com_comment;
        });
    $('#txtComments').text(valConcat);
    }
}

// ### LISTO ###   habilita el botones para validar en TABLA INICIAL
function activeIcons() {
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            //let selected = $(this).parent().attr('id');
            let pjtcnid = $(this).attr('id');
            // traer cantidad
            // console.log('Click Nivel 2', pjtcnid);
            if (pjtcnid > 0) {
                getSeries(pjtcnid);
            }
        });
}

//**************  NIVEL 2 DE DATOS  *****************************************

// ### LISTO ### Llena prepara la table dentro del modal para series ### LISTO -- MODAL 1###
function putSeries(dt) {
    // console.log('putSeries');
    settingSeries(dt);
    build_modal_serie_old(dt);
    activeIconsSerie();
}

function settingSeries(dt){

    $('#SerieModal').removeClass('overlay_hide');
    $('#tblSerie').DataTable({
        // retrieve: true,
        bDestroy: true,
        // dom: 'Blfrtip',
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, -1],
            [100, 200, 'Todos'],
        ],
        buttons: [
            {
                // Boton imprimir contenido jjr
                text: 'Select All OK',
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    readAceptTable();
                    // printContent(prjid);
                },
            },
            /* {
                // Boton imprimir detalle jjr
                text: ' Print Detalle ',
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    printDetail(prjid);;
                },
            }, */
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'sermodif', class: 'edit'},
            {data: 'seriesku', class: 'sku left'},
            {data: 'sernumber', class: 'sku'},
            {data: 'sertype', class: 'sku'},
            {data: 'serfchout', class: 'sku'},
            {data: 'serfchin', class: 'sku'},
        ],
    });

    $('#SerieModal .btn_close')
        .unbind('click')
        .on('click', function () {
            //console.log('Cierra Series');
            $('.overlay_background').addClass('overlay_hide');
            $('.overlay_closer .title').html('');
            $('#tblSerie').DataTable().destroy;
    });

}

// ### LISTO ### Llena con datos de series la tabla del modal --- MODAL 1
function build_modal_serie_old(dt) {
        //  console.log('build_modal_serie_old',dt);
         let tabla = $('#tblSerie').DataTable();
        $('.overlay_closer .title').html(`ASIGNADAS: ${dt[0].prd_name}`);
         tabla.rows().remove().draw();
         $.each(dt, function (v, u){
             let skufull = u.pjtdt_prod_sku.slice(7, 11) == '' ? u.pjtdt_prod_sku.slice(0, 7) : u.pjtdt_prod_sku.slice(0, 7) + u.pjtdt_prod_sku.slice(7, 11);
             let sku = u.pjtdt_prod_sku.slice(0, 7);
             let acc = u.pjtdt_prod_sku.slice(7,8) == 'A' ? skufull : sku;
             let valstage = u.ser_stage == 'TR' ? 'color:#CC0000' : 'color:#3c5777';
             //console.log(dt);
             tabla.row
                 .add({
                     sermodif: `<i class="fas fa-edit toChange" data-content="${acc}|${skufull}|${u.pjtdt_id}|${u.ser_id}"></i>
                                <i class="fas fa-check-circle toCheck" id="${skufull}" style="${valstage}"></i>`,
                     seriesku: skufull,
                     sernumber: u.ser_no_econo,
                     sertype: u.ser_serial_number,
                     serfchout: u.pjtpd_day_start,
                     serfchin: u.pjtpd_day_end,
                 })
                 .draw();
             $(`#${u.pjt_id}`).parents('tr').attr('id',u.pjt_id).attr('content',u.ser_id);
         });
}

/** ### LISTO ### +++++  Activa los iconos del modal de serie */
function activeIconsSerie() {
    $('.toChange')
        .unbind('click')
        .on('click', function () {
            let serprd = $(this).attr('data-content').split('|')[0];
            let serorg = $(this).attr('data-content').split('|')[1];
            let detIdChg = $(this).attr('data-content').split('|')[2];
            let serIdChg = $(this).attr('data-content').split('|')[3];

            // console.log('Click Nivel 3', serprd, serorg, detIdChg, serIdChg);
            if (serprd != "") {
                getSerieDetail(serprd, detIdChg);
            }
    });

    $('.toCheck')
        .unbind('click')
        .on('click', function () {
        let serprd = $(this).attr('id');
        // console.log("Para validar: "+serprd);
            checkSerie(serprd);
            // si cantidad = 1
            $('.overlay_background').addClass('overlay_hide');
            $('.overlay_closer .title').html('');
            $('#tblSerie').DataTable().destroy;
            // si es mayor a 1 no cierro
        });
        
}

function checkSerie(pjtcnid) {
    // console.log('ID-Producto-Check', pjtcnid);
    var pagina = 'WhOutputContent/checkSeries';
    var par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'html';
    var selector = myCheck;
    fillField(pagina, par, tipo, selector);
}

function myCheck(dt){
    // console.log('myCheck',dt);
    $('#'+dt).css({"color":"#CC0000"});
    $('#'+dt).children(".claseElemento").css({"color":"#CC0000"});

}

function readAceptTable() {
    $('#tblSerie tbody tr').each(function (v, u) {
        // console.log("DENTRO EACH readAceptTable: ");
        let serId = $(this).attr('id');
         let serdata = $(this).attr('content');
        console.log("readAceptTable: ", serdata);
        // checkSerie(serId);
        setTimeout(function(){
            console.log('Segundo plano');
            $('#'+serId).css({"color":"#CC0000"});
            $('#'+serId).children(".claseElemento").css({"color":"#CC0000"});
        }, 300);
    });
}
//**************  NIVEL 3 DE DATOS  *****************************************

// *****************  CONFIGURACION TABLA CAMBIO DE SERIES **************
function settingChangeSerie(){
    // console.log('setting');
    $('#ChangeSerieModal').removeClass('overlay_hide');
    $('#tblChangeSerie').DataTable({
        // retrieve: true,
        bDestroy: true,
        // dom: 'Blfrtip',
        order: [[2, 'asc']],
        lengthMenu: [
            [100, 200, -1],
            [100, 200, 'Todos'],
        ],
        buttons: [
            {
                // Boton imprimir contenido jjr
                text: 'Select All OK',
                className: 'btn-apply',
                action: function (e, dt, node, config) {
                    // printContent(prjid);
                },
            },
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'serchange', class: 'edit'},
            /* {data: 'serdetsku', class: 'sku left'},
            {data: 'serdetname', class: 'supply left'}, */
            {data: 'serdetnumber', class: 'supply'},
            {data: 'serdetsitu', class: 'sku'},
          /*   {data: 'serdetstag', class: 'sku'}, */
        ],
    });

    $('#ChangeSerieModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
            $('.overlay_closer .title').html('');
            $('#tblChangeSerie').DataTable().destroy;
        });
}


// AGREGA LAS SERIES DISPONIBLES
function putSerieDetails(dt){
    // console.log(dt);
    if(dt[0].ser_id !='0'){
        settingChangeSerie();
        let locicon='';
        let tabla = $('#tblChangeSerie').DataTable();
        // $('.overlay_closer .title').html(` ${dt[0].prd_name} - ${dt[0].prd_sku}`);
        $('#ChangeSerieModal .overlay_closer .title').html(`DISPONIBLES`);
        tabla.rows().remove().draw();
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    // serchoose: '<input class="serprod fieldIn" type="checkbox" id="CH-' + u.ser_id + '" value="'+'">',
                    /* serchange: `<i class='fas fa-edit toEdit' "></i> <i class='fas fa-check-circle toStop' "></i>`, */
                    serchange: `<i class='fas fa-check-circle toChangeSer' id="${u.ser_id}" seridorg="${u.id_orig}"></i>`,
                    /* serdetsku: u.ser_sku,
                    serdetname: u.prd_name, */
                    serdetnumber: u.ser_serial_number,
                    serdetsitu: u.ser_no_econo
                    /* serdetstag: u.ser_stage */
                })
                .draw();
            //$(`#${u.ser_id}`).parents('tr').attr('id', u.ser_id);
        });
        // build_modal_seriefree(dt);
        activeIconsNewSerie();
    } else{
        alert('Ya no existen Series Disponibles para cambiar');
    }
}

/** +++++  Activa los iconos del modal de serie free */
function activeIconsNewSerie() {
    $('.toChangeSer')
    .unbind('click')
    .on('click', function () {
        let serIdSel = $(this).attr('id');
        let serIdOrg = $(this).attr('seridorg');
        serIdNew=serIdSel;
        // console.log("New Serie", serIdSel, serIdOrg );

        $('#'+serIdSel).css({"color":"#CC0000"});  //#3c5777  normal
        // $('#'+serIdOrig).children(".claseElemento").css({"color":"#CC0000"});
        changeSerieNew(serIdSel, serIdOrg);
    });
}

function changeSerieNew(serIdNew,serIdOrg) {
    // console.log('ID-New Serie', serIdNew, serIdOrg);
    var pagina = 'WhOutputContent/changeSerieNew';
    var par = `[{"serIdNew":"${serIdNew}", "serIdOrg":"${serIdOrg}" }]`;
    var tipo = 'html';
    var selector = myCheckUp;
    fillField(pagina, par, tipo, selector);
}

function myCheckUp(dt){
    console.log('myCheckUp-',dt);
    $('.overlay_background').addClass('overlay_hide');
    $('.overlay_closer .title').html('');
    $('#tblChangeSerie').DataTable().destroy;

}


/**********  Confirma salida de equipos ***********/
function confirm_to_GetOut(pjtid) {
    $('#starClosure').modal('show');
    $('#txtIdClosure').val(pjtid);

    $('#btnClosure').on('click', function () {
        $('#starClosure').modal('hide');

        console.log('Datos CLICK',pjtid);
        modalLoading('S');

        var pagina = 'WhOutputContent/ProcessGetOutProject';
        var par = `[{"pjtid":"${pjtid}"}]`;
        var tipo = 'json';
        var selector = putToWork;
        fillField(pagina, par, tipo, selector);
        /* let Arg='23|56|PASO1,PASO2 ';
        putToWork(Arg); */
    });
}

function putToWork(dt){
    console.log('TERMINO ACTUALIZAR', dt);
    // console.log('Regreso', folio);
    let folio=dt;
    $('#recordOutPut').hide();
    $('.bprint').removeClass('hide-items');
    $('.resFolio').text(refil(folio, 7));
    $('#MoveFolioModal').modal('show');
    $('#btnHideModal').on('click', function () {
        // window.location = 'WhOutputs';
        $('#MoveFolioModal').modal('hide');

    });
    modalLoading('H');
}

function modalLoading(acc) {
    if (acc == 'S') {
        $('.invoice__modalBackgound').fadeIn('slow');
        $('.invoice__loading')
            .slideDown('slow')
            .css({ 'z-index': 401, display: 'flex' });
    } else {
        $('.invoice__loading').slideUp('slow', function () {
            $('.invoice__modalBackgound').fadeOut('slow');
        });
    }
}

/**********  Impresion de la salida de un proyecto ***********/
function printOutPut(verId) {
    // let user = Cookies.get('user').split('|');
    // let u = user[0];
    // let n = user[2];
    let h = localStorage.getItem('host');
    let v = verId;
    // console.log('Datos', v, u, n, h);
    window.open(
        `${url}app/views/WhOutputContent/WhOutputContentReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
}

/**********  Impresion del contenido de un proyecto ***********/
function printReports(pjtId, typrint) {
    // let user = Cookies.get('user').split('|');
    // let u = user[0];
    // let n = user[2];

    let v = pjtId;
    let h = localStorage.getItem('host');
    // console.log('Datos', v, u, n, h);
    switch (typrint) {
        case "C":  // Contenido global
            window.open(
                `${url}app/views/WhOutputContent/WhOutputContentReport.php?v=${v}&u=${u}&n=${n}&em=${em}&h=${h}`,
                '_blank'
            );
        //   console.log("Contenido");
          break;
        case "D":  // Detalles del contenido con series
            window.open(
                `${url}app/views/WhOutputContent/WhOutputDetailReport.php?v=${v}&u=${u}&n=${n}&em=${em}&h=${h}`,
                '_blank'
            );
        //   console.log("Detalle");
          break;
        case "A": // Detalles y Accesorios del contenido con series
            window.open(
                `${url}app/views/WhOutputContent/WhOutputAccesoryReport.php?v=${v}&u=${u}&n=${n}&em=${em}&h=${h}`,
                '_blank'
            );
        //   console.log("Con Accesorios");
          break;
        default:
          console.log("No Hay REPORTE");
          break;
      }


    // window.open(
    //     `${url}app/views/WhOutputContent/WhOutputContentReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
    //     '_blank'
    // );
}

/**********  Impresion del contenido de un proyecto ***********/
/* function printContent(verId) {
    // let user = Cookies.get('user').split('|');
    // let u = user[0];
    // let n = user[2];
    let v = verId;
    let h = localStorage.getItem('host');
    // console.log('Datos', v, u, n, h);
    window.open(
        `${url}app/views/WhOutputContent/WhOutputContentReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
} */

/**********  Impresion del detalle(series) de un proyecto ***********/
/* function printDetail(verId) {
    // let user = Cookies.get('user').split('|');
    let v = verId;
    // let u = user[0];
    // let n = user[2];
    let h = localStorage.getItem('host');
    window.open(
        `${url}app/views/WhOutputContent/WhOutputDetailReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
} */



let products;
//let prjid = window.location.pathname.split("/").pop();
let prjid, serIdNew;
let serIdAnt=0;
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
    setting_table_AsignedProd();
    getProjects(prjid);
    getDetailProds();

    // Boton para registrar la salida del proyecto y los productos
    $('#recordOutPut').on('click', function () {
        // let locID = $(this);
        // let pjtid = locID.parents('tr').attr('id');
        // console.log('Paso A Guardar..', prjid);
        confirm_to_GetOut(prjid);
            
     });

     $('#printOutPut').on('click', function () {
        printOutPutContent(prjid);
        
     });

     $('#printdetails').on('click', function(){
        printDetail(prjid);
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
function getDetailProds() {
    var pagina = 'WhOutputContent/listDetailProds';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = putDetailsProds;
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

//**************  NIVEL 1 DE DATOS *****************************************

// Configura la tabla de productos del proyecto

function setting_table_AsignedProd() {
    let title = 'Contenido de proyectos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblAsignedProd').DataTable({
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
                [100, 200, -1],
                [100, 200, 'Todos'],
            ],
        // pageLength: 1000,
        // select: true,
       
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
                 /* // Boton aplicar cambios
                {
                text: 'Generar paquete',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    //read_package_table();
                }, */
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
        scrollY: 'calc(100vh - 240px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'editable', class: 'edit'},
            {data: 'pack_sku', class: 'sel sku'},
            {data: 'packname', class: 'sel supply'},
            {data: 'packcount', class: 'sel sku'},
            {data: 'packlevel', class: 'sel sku'},
            {data: 'packstatus', class: 'sel sku'},
        ],
    });
}

//AGREGA LOS DATOS GENERALES DEL PROYECTO
function putProjects(dt) {
    let user = Cookies.get('user').split('|');
    let u = user[0];
    let n = user[2];
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
    $('#txtFreelance').val(dt[0].freelance);
}

// ### LISTO ### Llena la TABLA INICIAL de los detalles del proyecto
function putDetailsProds(dt) {
    if (dt[0].pjtpd_id != '0')
    {
        // let tabla = $('#tblAsignedProd').DataTable();
        let valstage='';
        $('#tblAsignedProd tbody').html('');
        $.each(dt, function (v, u){
            if (u.pjt_status == 4)
                { valstage='color:#008000'; }
            else if (u.pjt_status == 7)
                { valstage='color:#FFA500'; }
            else
            { valstage='color:#CC0000'; }
            //console.log(valstage);

            let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
            var H = `
                <tr id="${u.pjt_id}">
                    <td class="sku"><i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i></td>
                    <td class="sku">${skufull}</td>
                    <td class="supply">${u.pjtcn_prod_name}</td>
                    <td class="sku">${u.pjtcn_quantity}</td>
                    <td class="supply">${u.pjtcn_prod_level}</td>   
                    <td class="supply">${u.pjtcn_status}</td>
                </tr>`;
            $('#tblAsignedProd tbody').append(H);
        });
//         {
//         let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
//             tabla.row
//                 .add({
//                     editable: `<i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i>`,
//  /*                   pack_sku: `<span class="hide-support" id="SKU-${u.pjtcn_prod_sku}">${u.pjtcn_id}</span>${u.pjtcn_prod_sku}`, */
//                     pack_sku: skufull,
//                     packname: u.pjtcn_prod_name,
//                     packcount: u.pjtcn_quantity,
//                     packlevel: u.pjtcn_prod_level,
//                     packstatus: u.pjtcn_status,
//                     /* '<input class="serprod fieldIn" type="text" id="PS-' + par[0].sercostimp + '" value="' + par[0].sercostimp + '">' */
//                 })
//                 .draw();
// /*<i class="fas fa-times-circle choice pack kill" id="D-${u.pjtpd_id}"></i>`, */
//             $(`#SKU-${u.pjtcn_prod_sku}`).parent().parent().attr('id', u.pjtcn_id).addClass('indicator');
//         });
        activeIcons();
    }
}

// ### LISTO ###   habilita el botones para validar en TABLA INICIAL
function activeIcons() {
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            //let selected = $(this).parent().attr('id');
            let pjtcnid = $(this).attr('id');
            console.log('Click Nivel 2', pjtcnid);
            if (pjtcnid > 0) {
                getSeries(pjtcnid);
            }
        });

}

//**************  NIVEL 2 DE DATOS  *****************************************

// ### LISTO ### Llena prepara la table dentro del modal para series ### LISTO -- MODAL 1###
function putSeries(dt) {
    settingSeries(dt);
    build_modal_serie_old(dt);
    activeIconsSerie();
}

function settingSeries(dt){
        
    $('#SerieModal').removeClass('overlay_hide');
    $('#tblSerie').DataTable({
        // destroy: true,
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, -1],
            [100, 200, 'Todos'],
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
            {data: 'sername', class: 'supply left'},
            {data: 'sernumber', class: 'sernumber'},
            {data: 'sertype', class: 'sertype'},
            {data: 'serstat', class: 'sku'},
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
   
    // activeIcons();
}

// ### LISTO ### Llena con datos de series la tabla del modal --- MODAL 1
function build_modal_serie_old(dt) {
        //  console.log('build_modal_serie_old',dt);
         let tabla = $('#tblSerie').DataTable();
         $('.overlay_closer .title').html(`SERIE ASIGNADA: ${dt[0].pjtdt_prod_sku} - ${dt[0].prd_name}`);
         tabla.rows().remove().draw();
         $.each(dt, function (v, u){
             let skufull = u.pjtdt_prod_sku.slice(7, 11) == '' ? u.pjtdt_prod_sku.slice(0, 7) : u.pjtdt_prod_sku.slice(0, 7) + u.pjtdt_prod_sku.slice(7, 11);
             let sku = u.pjtdt_prod_sku.slice(0, 7);
             let accesory = u.pjtdt_prod_sku.slice(7,8);
             let acc = u.pjtdt_prod_sku.slice(7,8) == 'A' ? skufull : sku;
             let valstage = u.ser_stage == 'TR' ? 'color:#CC0000' : 'color:#3c5777';
             //console.log(dt);
             tabla.row
                 .add({
                     // sermodif: `<i class='fas fa-edit toLink2' id="${u.pjtdt_prod_sku.slice(0, 7)}"  sku_original = "${skufull}"></i> <i class='fas fa-check-circle toCheck' id="${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}"></i>`,
                     // <i class="fas fa-edit toChange" id="${acc}" sku_original="${skufull}" detId=${u.pjtdt_id}></i> 
                     sermodif: `<i class="fas fa-edit toChange" data-content="${acc}|${skufull}|${u.pjtdt_id}|${u.ser_id}"></i> 
                                <i class="fas fa-check-circle toCheck" id="${skufull}" style="${valstage}"></i>`,
                     seriesku: skufull,
                     sername: u.prd_name,
                     sernumber: u.ser_serial_number,
                     sertype: u.prd_level,
                     serstat: u.prd_level,
                 })
                 .draw();
             $(`#${u.pjt_id}`).parents('tr').attr('id',u.pjt_id);
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
    $('#'+dt).css({"color":"#CC0000"});
    $('#'+dt).children(".claseElemento").css({"color":"#CC0000"});
    /* $('#'+dt).attr("id",NuevoSku).children("td.nombreclase").text(NuevoSku);
    $('#'+dt).attr("id",sernumber).children("td.nombreclase").text(sernumber);
    $('#'+dt).attr("id",sertype).children("td.nombreclase").text(NuevoSku); */
}


//**************  NIVEL 3 DE DATOS  *****************************************

// *****************  CONFIGURACION TABLA CAMBIO DE SERIES **************
function settingChangeSerie(){
    // console.log('setting');
    $('#ChangeSerieModal').removeClass('overlay_hide');
    $('#tblChangeSerie').DataTable({
        bDestroy: true,
        order: [[1, 'asc']],
        lengthMenu: [
            [50, 100, -1],
            [50, 100, 'Todos'],
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
            {data: 'serdetsku', class: 'sku left'},
            {data: 'serdetname', class: 'supply left'},
            {data: 'serdetnumber', class: 'supply'},
            {data: 'serdetsitu', class: 'sku'},
            {data: 'serdetstag', class: 'sku'},
        ],
    });

    $('#ChangeSerieModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
            $('.overlay_closer .title').html('');
            $('#tblChangeSerie').DataTable().destroy;
        });
    
   /*  $('#ChangeSerieModal #btn_save')
        .unbind('click')
        .on('click', function () {
            console.log('Click Aplicar Seleccion');
    }); */
}


// AGREGA LAS SERIES DISPONIBLES
function putSerieDetails(dt){
    // console.log(dt);
    if(dt[0].ser_id !='0'){
        settingChangeSerie();
        let locicon='';
        let tabla = $('#tblChangeSerie').DataTable();
        $('.overlay_closer .title').html(`NUMERO DE SERIE A CAMBIAR: ${dt[0].prd_name} - ${dt[0].prd_sku}`);
        tabla.rows().remove().draw();
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    // serchoose: '<input class="serprod fieldIn" type="checkbox" id="CH-' + u.ser_id + '" value="'+'">',
                    /* serchange: `<i class='fas fa-edit toEdit' "></i> <i class='fas fa-check-circle toStop' "></i>`, */
                    serchange: `<i class='fas fa-check-circle toChangeSer' id="${u.ser_id}" seridorg="${u.id_orig}"></i>`,
                    serdetsku: u.ser_sku,
                    serdetname: u.prd_name,
                    serdetnumber: u.ser_serial_number,
                    serdetsitu: u.ser_situation,
                    serdetstag: u.ser_stage
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

    function read_exchange_table() {
        if (folio == undefined) {
            var pagina = 'MoveStoresIn/NextExchange';
            var par = '[{"par":""}]';
            var tipo = 'html';
            var selector = putNextExchangeNumber;
            fillField(pagina, par, tipo, selector);
        } else {
            $('#tblChangeSerie tbody tr').each(function (v, u) {
                let seriesku = $(this).attr('data-content').split('|')[3];
                let prodname = $($(u).find('td')[2]).text();
                let quantity = $($(u).find('td')[3]).text();
                let sericost = $($(u).find('td')[4]).text();
                let serienum = $($(u).find('td')[5]).children('.serprod').val();
                //let serienum = $('.serprod').val();
                let petition = $($(u).find('td')[6]).text();
                let costpeti = $($(u).find('td')[7]).children('.serprod').val();
                let codeexch = $($(u).find('td')[8]).text();
                let storname = $($(u).find('td')[9]).text();
                let serbrand = $($(u).find('td')[12]).text();
                let comments = $($(u).find('td')[13]).text();
               
                let typeexch = $(this).attr('data-content').split('|')[1];
                let producid = $(this).attr('data-content').split('|')[0];
                let storesid = $(this).attr('data-content').split('|')[2];
                let sericoin = $(this).attr('data-content').split('|')[4];
                let suppliid = $(this).attr('data-content').split('|')[5];
                let docinvoi = $(this).attr('data-content').split('|')[6];
    
                let truk = `${folio}|${seriesku}|${prodname}|${quantity}|${serienum}|${storname}|${comments}|${codeexch}|${typeexch}|${producid}|${storesid}|${sericost}|${sericoin}|${suppliid}|${docinvoi}|${petition}|${costpeti}|${serbrand}`;
                console.log(truk);
                build_data_structure(truk);
            });
        }
    }
    
function confirm_to_GetOut(pjtid) {
    $('#starClosure').modal('show');
    $('#txtIdClosure').val(pjtid);

    $('#btnClosure').on('click', function () {
        $('#starClosure').modal('hide');

        console.log('Datos CLICK',pjtid);
        modalLoading('S');
        
        /* var pagina = 'WhOutputContent/ProcessGetOutProject';
        var par = `[{"pjtid":"${pjtid}"}]`;
        var tipo = 'json';
        var selector = putToWork;
        fillField(pagina, par, tipo, selector); */
        let Arg='23|56|PASO1,PASO2 ';
        putToWork(Arg);
    });
}

function putToWork(dt){
    console.log('TERMINO ACTUALIZAR', dt);
    // let ver     =dt.split(' | ')[0];
    // let folio   =dt.split(' | ')[1];    
    // let paso    =dt.split(' | ')[2];
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

   /*  $('#btnPrintReport').on('click', function () {
        console.log(dt);
        // $('.btn-print').trigger('click');
    }); */

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

function printDetail(verId) {
    let user = Cookies.get('user').split('|');
    let v = verId;
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');
    /* let v = 1;
    let u = 1;
    let n = 'SuperUsuario';
 */
    console.log('Datos', v, u, n, h);

    window.open(
        `${url}app/views/WhOutputContent/WhOutputDetailReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
}

function printOutPutContent(verId) {
    let user = Cookies.get('user').split('|');
    let v = verId;
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');
    /* let v = 1;
    let u = 1;
    let n = 'SuperUsuario';
 */
    console.log('Datos', v, u, n, h);

    window.open(
        `${url}app/views/WhOutputContent/WhOutputContentReport.php?v=${v}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
}

// otra forma de presentar los datos
function build_modal_serie_new(dt) {
    // console.log('Nivel 2');
   /*  $('#tblSerie').DataTable();
    $('.overlay_closer .title').html(`SERIE ASIGNADA: ${dt[0].pjtdt_prod_sku} - ${dt[0].prd_name}`);
    $.each(dt, function (v, u){
        let skufull = u.pjtdt_prod_sku.slice(7, 11) == '' ? u.pjtdt_prod_sku.slice(0, 7) : u.pjtdt_prod_sku.slice(0, 7) + u.pjtdt_prod_sku.slice(7, 11);
        let sku = u.pjtdt_prod_sku.slice(0, 8);
        let accesory = u.pjtdt_prod_sku.slice(7,8);
        let acc = u.pjtdt_prod_sku.slice(7,8) == 'A' ? skufull : sku;
        let valstage = u.ser_stage == 'TA' ? 'color:#CC0000' : 'color:#3c5777';
        console.log(dt);
        var H =`
            <tr id="${u.pjt_id}">
                <td class="sku"><i class="fas fa-edit toChange" id="${acc}" sku_original="${skufull}"></i> 
                            <i class="fas fa-check-circle toCheck" id="${skufull}" style="${valstage}"></i></td>
                <td class="sku">${skufull}</td>
                <td class="supply">${u.prd_name}</td>
                <td class="supply">${u.ser_serial_number}</td>
                <td class="sku">${u.prd_level}</td>
                <td class="sku">${u.prd_level}</td>
            </tr>`;
        $('#tblSerie tbody').append(H);
    });
     */
}

function build_modal_seriefree(dt) {
    /*  console-log(dt);
     let tabla = $('#tblBoxSubmenu').DataTable();
     $('#boxSubmenu .title').html(`${dt[0].prd_name}`);
     tabla.rows().remove().draw();
     console.log("DT-Nivel 3>"+dt[0].ser_sku)
     $.each(dt, function (v, u) {
     let skufull2 = u.ser_sku.slice(7, 11) == '' ? u.ser_sku.slice(0, 7) : u.ser_sku.slice(0, 7) + u.ser_sku.slice(7, 11);
         //let skufull2 = "1010D023A008001";
         tabla.row
             .add({
                 deditable: `<i class='fas fa-check-circle toLink3' id="${u.ser_id}" sku_original="${u.id_orig}"></i>`,
                 dseriesku: skufull2,
                 dsername: u.prd_name,
                 dsernumber: u.ser_serial_number,
             })
             .draw();
         $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.ser_id);
     });
     activeIconsSerieFree(); */
 }
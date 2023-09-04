let products;
//let prjid = window.location.pathname.split("/").pop();
let prjid;
let glbcnid,glbprjnum;
let motmanteince;
let user,v,u,n,em;  //datos de usuaria para impresion

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
    getDetailProds(prjid,em);
    getFreelances(prjid);
    getReason();
    
    $('#recordInPut').on('click', function () {
        alert('Actualizar Registros');
        createTblRespaldo(prjid,glbprjnum)
        confirm_to_GetOut(prjid);
     });

     $('#printInPut').on('click', function () {
        printOutPutContent(prjid);
    
     });
}

// Solicita los paquetes  OK
function getProjects(prjid) {
    // console.log(prjid)
    var pagina = 'WorkInputContent/listProjects';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}

// Solicita los productos del proyecto  OK
function getDetailProds(prjid,empid) {
    var pagina = 'WorkInputContent/listDetailProds';
    var par = `[{"pjt_id":"${prjid}", "empid":"${empid}"}]`;
    var tipo = 'json';
    var selector = putDetailsProds;
    fillField(pagina, par, tipo, selector);
}

function getSeries(pjtcnid) {
    // console.log('ID-Contenido Producto', pjtcnid);
    var pagina = 'WorkInputContent/listSeries';
    var par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'json';
    var selector = putSeries;
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
function getReason() {
    // console.log('ID-Contenido Producto', pjtcnid);
    var pagina = 'WorkInputContent/listReason';
    var par = `[{"pjtcnid":""}]`;
    var tipo = 'json';
    var selector = putReason;
    fillField(pagina, par, tipo, selector);
}

// Solicita las series disponibles
function getSerieDetail(serid, serorg) {
    var pagina = 'WorkInputContent/listSeriesFree';
    var par = `[{"serid":"${serid}", "serorg":"${serorg}" }]`;
    var tipo = 'json';
    var selector = putSerieDetails;
    fillField(pagina, par, tipo, selector);
}

function createTblRespaldo(prjid,prjnum) {
    console.log('createTblRespaldo', prjid,prjnum)
    var pagina = 'WorkInputContent/createTblResp';
    var par = `[{"prjid":"${prjid}", "prjnum":"${prjnum}"}]`;
    var tipo = 'json';
    var selector = putCreateTbl;
    fillField(pagina, par, tipo, selector);
}

//**************  NIVEL 1 DE DATOS *****************************************
// Configura la tabla de productos del proyecto
function setting_table_AsignedProd() {
    
    let tabla = $('#tblAsigInput').DataTable({
        bDestroy: true,
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
                [100, 200, -1],
                [100, 200, 'Todos'],
            ],
        buttons: [
            {
                // Boton aplicar cambios
                text: 'Generar paquete',
                className: 'btn-apply hidden-field',
                action: function (e, dt, node, config) {
                    /*read_package_table();*/
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
            {data: 'packlevel', class: 'sel sku'},
            {data: 'packstatus', class: 'sel supply'},
        ],
    });
}

//AGREGA LOS DATOS GENERALES DEL PROYECTO
function putProjects(dt) {
    // console.log('DATOS del PROYECTO', dt);
    let usrname=n.replaceAll('+',' ');
    $('#txtProjectName').val(dt[0].pjt_name);
    $('#txtProjectNum').val(dt[0].pjt_number);
    glbprjnum=dt[0].pjt_number;
    $('#txtTipoProject').val(dt[0].pjttp_name);
    $('#txtEndDate').val(dt[0].pjt_date_end);
    $('#txtAnalyst').val(usrname);
}

function putFreelances(dt) {
    if (dt[0].free_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.free_id}"> ${u.free_name} - ${u.are_name}</option>`;
            $('#txtFreelance').append(H);
        });
    }
}

// ### LISTO ### Llena la TABLA INICIAL de los detalles del proyecto

function putDetailsProds(dt) {
    if (dt[0].pjtpd_id != '0')
    {
        let tabla = $('#tblAsigInput').DataTable();
        let valcontent='';

        $.each(dt, function (v, u)         {
        // let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
        let skufull = u.pjtcn_prod_sku;
            tabla.row
                .add({
                    editable: `<i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i>`,
                    pack_sku: skufull,
                    packname: u.pjtcn_prod_name,
                    packcount: u.pjtcn_quantity,
                    packlevel: u.pjtcn_prod_level,
                    packstatus: valcontent,
                })
                .draw();
            $(`#SKU-${u.pjtcn_prod_sku}`).parent('tr').attr('id', u.pjtcn_id).addClass('indicator');
        });
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
            // console.log('Click Nivel 2', pjtcnid);
            if (pjtcnid > 0) {
                glbcnid=pjtcnid;
                getSeries(pjtcnid);
            }
        });
}


//**************  NIVEL 2 DE DATOS  *****************************************
function putSeries(dt) {
    // console.log('putSeries');
    settingSeries();
    build_modal_serie(dt);
}

function putCreateTbl(dt) {
    console.log('putCreateTbl',dt);
    let result=dt;
}
function settingSeries(){
    $('#SerieModal').removeClass('overlay_hide');
    $('#tblSerie').DataTable({
        // retrieve: true,
        bDestroy: true,
        dom: 'Blfrtip',
        order: [[1, 'asc']],
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
            /* {data: 'sername', class: 'supply left'}, */
            {data: 'sernumber', class: 'sku'},
            {data: 'sereconum', class: 'sku'},
            {data: 'sertype', class: 'sku'},
            
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
function build_modal_serie(dt) {
        //  console.log('build_modal_serie',dt);
        let valstage='';
        let valmant='';
        let tabla = $('#tblSerie').DataTable();
        // $('#tblSerie').DataTable();
        $('.overlay_closer .title').html(`ASIGNADAS: ${dt[0].prd_name}`);
         tabla.rows().remove().draw();
        //  $('#tblSerie tbody').html('');
         $.each(dt, function (v, u){
             let skufull = u.pjtdt_prod_sku;
             let sku = u.pjtdt_prod_sku.slice(0, 7);
             if (u.ser_situation=='D'){
                valstage='color:#CC0000';
                valmant='color:#3c5777';
             } else if(u.ser_situation=='M'){
                valstage='color:#3c5777';
                valmant='color:#CC0000';
             } else {
                valstage='color:#3c5777';
                valmant='color:#3c5777';
             }
             tabla.row
                 .add({
                     sermodif: `<i class="fas fa-wrench toChange" data-content="${skufull}|${u.pjtdt_id}|${u.ser_id}" style="${valmant}"></i> 
                                <i class="fas fa-check-circle toAcept" id="${u.ser_id}" data-content="${skufull}|${u.pjtdt_id}|${u.ser_id}" style="${valstage}"></i>`,
                     seriesku: skufull,
                     sernumber: u.ser_serial_number,
                     sereconum: u.ser_serial_number,
                     sertype: u.prd_level,
                 })
                 .draw();
             $(`#${u.ser_id}`).parents('tr').attr('id', u.ser_id);
         });
         activeIconsSer();
}

/** ### LISTO ### +++++  Activa los iconos del modal de serie */
function activeIconsSer() {
    $('.toChange')
        .unbind('click')
        .on('click', function () {
            let serprd = $(this).attr('data-content').split('|')[0];
            let serorg = $(this).attr('data-content').split('|')[1];
            let serId = $(this).attr('data-content').split('|')[2];
            // console.log('Click Nivel-3', serprd, serorg, serId);
            if (serprd != "") {
                // getReason(serId);
                openReason(serId);
            }
    });
    
    $('.toAcept')
        .unbind('click')
        .on('click', function () {
            let serprd = $(this).attr('data-content').split('|')[0];
            let serorg = $(this).attr('data-content').split('|')[1];
            let serId = $(this).attr('data-content').split('|')[2];
            console.log("Para aceptar: ",serprd, serorg, serId);
            checkSerie(serId);
        });
}

function checkSerie(serId) {
    // console.log('ID-Producto-Check', pjtcnid);
    var pagina = 'WorkInputContent/checkSeries';
    var par = `[{"serId":"${serId}"}]`;
    var tipo = 'html';
    var selector = myCheck; 
    fillField(pagina, par, tipo, selector);
}

function myCheck(dt){
    // console.log('myCheck', dt);
    $('#'+dt).css({"color":"#CC0000"});
    $('#'+dt).children(".claseElemento").css({"color":"#CC0000"});
}

function readAceptTable() {
    $('#tblSerie tbody tr').each(function (v, u) {
        
        // console.log("DENTRO EACH: ", $(this).find('td')[0].children);
        let serId = $(this).attr('id');
         let serdata = $(this).attr('data');
        console.log("readAceptTable: ", serId);
        checkSerie(serId);
        setTimeout(function(){
            console.log('');
        }, 3000);
        /* $('.overlay_background').addClass('overlay_hide');
        $('.overlay_closer .title').html('');
        $('#tblSerie').DataTable().destroy; */
    });
}

// ### LISTO ### Llena prepara la table dentro del modal para series ### LISTO -- MODAL 1###
function putReason(dt) {
    settingReason();
    build_modalReason(dt);
}

function settingReason(){
        // console.log('Setting-Series');
        // $('#ReasonMtModal').removeClass('overlay_hide');
        $('#tblMaintenance').DataTable({
            bDestroy: true,
            order: [[1, 'asc']],
            lengthMenu: [
                [100, 150, 200, -1],
                [100, 150, 200, 'Todos'],
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
                {data: 'seriesku', class: 'supply'},
                {data: 'sername', class: 'supply'},
            ],
        } );

        $('#ReasonMtModal .btn_close')
        .unbind('click')
        .on('click', function () {
            // console.log('Cierra Motivos');
            $('.overlay_background').addClass('overlay_hide');
            $('.overlay_closer .title').html('');
            $('#tblMaintenance').remove;
            $('#tblMaintenance').DataTable().destroy;
            
        });
        activeIcons();
}
// ### LISTO ### Llena con datos de series la tabla del modal --- MODAL 1
function build_modalReason(dt) {
        // console.log('Nivel 2', dt);
        $('#ReasonMtModal .overlay_closer .title').html('LISTADO DE MOTIVOS:');
        let tabla = $('#tblMaintenance').DataTable();
        // tabla.rows().remove().draw();
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    sermodif: `<i class='fas fa-check-circle toCheck' id="${u.pjtcr_id}" data="${u.pjtcr_definition}|${u.pjtcr_code_stage}"></i>`,
                    seriesku: u.pjtcr_definition,
                    sername: u.pjtcr_description,
                })
                .draw();
            //$(`#E${u.pjtcn_id}`).parents('tr').attr('data-product', u.pjtcn_id);
        });
        // activeIconsReason();
}

function openReason(serId){
    $('#ReasonMtModal').removeClass('overlay_hide');
    $('#ReasonMtModal .overlay_closer .title').html('LISTADO DE MOTIVOS:');
    let tabla = $('#tblMaintenance').DataTable().draw();
    activeIconsReason(serId);
}

/** ### LISTO ### +++++  Activa los iconos del modal de serie */
function activeIconsReason(serId) {
    // console.log('ACTIVA MOTIVOS DE MANTENIMIENTO');
    $('.toCheck')
        .unbind('click')
        .on('click', function () {
        let codmot = $(this).attr('id');
        let motdesc = $(this).attr('data').split('|')[0];
        let codstag = $(this).attr('data').split('|')[1];
        console.log('Cierra Motivo seleccionado',codmot ,motdesc,'TR',glbcnid, 'SER-ID',serId);
        regMaintenance(serId,codmot,codstag);

        let el = $(`#tblAsigInput tr[id="${glbcnid}"]`);
        $(el.find('td')[5]).html(motdesc);
        $('.overlay_background').addClass('overlay_hide');
        $('.overlay_closer .title').html('');
        $('#tblMaintenance').DataTable().destroy;
    
    });
}

function regMaintenance(serId,codmot,codstag) {
    var par = `[  {"serId":     "${serId}"},
                  {"codmot":    "${codmot}"},
                  {"codstag":   "${codstag}"},
                  {"prjid":     "${prjid}"}
               ]`;
    // console.log('regMaintenance', serId,codmot,codstag,prjid);
    var pagina = 'WorkInputContent/regMaintenance';
    // var par = `[{"serId":"${serId}"},{"codmot":"${codmot}"},{"codstag":"${codstag}"}]`;
    var tipo = 'html';
    var selector = myCheck; 
    fillField(pagina, par, tipo, selector);
}


//**************  NIVEL 3 DE DATOS  *****************************************

function settingChangeSerie(){
   /*  console.log('setting');
    $('#ChangeReasonMtModal').removeClass('overlay_hide');
    $('#tblChangeSerie').DataTable({
        destroy: true,
        order: [[1, 'asc']],
        lengthMenu: [
            [10, 30, 50, -1],
            [10, 30, 50, 'Todos'],
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
            {data: 'serchoose', class: 'sku'},
            {data: 'serdetnumber', class: 'sernumber'},
            {data: 'serdetsitu', class: 'sertype'},
            {data: 'serdetstag', class: 'sertype'},
        ],
    });

    $('#ChangeReasonMtModal .btn_close')
        .unbind('click')
        .on('click', function () {
           $('.overlay_background').addClass('overlay_hide');
            //$('#tblChangeSerie').DataTable().remove().draw();
            // activeIcons();
        });
     */
}

// AGREGA LAS SERIES DISPONIBLES
function putSerieDetails(dt){
    
    /* console.log(dt);
    settingChangeSerie();
    console.log('Configuro SET');
    let tabla = $('#tblChangeSerie').DataTable();
    $('.overlay_closer .title').html(`NUMERO DE SERIE A CAMBIAR: ${dt[0].prd_name} - ${dt[0].prd_sku}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                // sermodif: `<i class='fas fa-edit toChange' id="${acc}"  sku_original = "${skufull}"></i> <i class='fas fa-check-circle toCheck' id="${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}"></i>`,
                // serchange: `<i class='fas fa-edit toEdit' "></i> <i class='fas fa-check-circle toStop' "></i>`,
                serchange: u.ser_id,
                serdetsku: u.ser_sku,
                serdetname: u.prd_name,
                serchoose: '<input class="serprod fieldIn" type="checkbox" id="CH-' + u.ser_id + '" value="'+'">',
                serdetnumber: u.ser_serial_number,
                serdetsitu: u.ser_situation,
                serdetstag: u.ser_stage
            })
            .draw();
        //$(`#E${u.pjtcn_id}`).parents('tr').attr('data-product', u.pjtcn_id);
    });
    console.log('MODAL SERIES DISPONIBLES-');
    // build_modal_seriefree(dt);
    // activeIconsSerie(); */

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

/** +++++  Activa los iconos del modal de serie free */
function activeIconsSerieFree() {
   /*  $('.toLink3')
    .unbind('click')
    .on('click', function () {
        let serIdOrig = $(this).attr('sku_original');
        let trParent = $(this).parents('tr')
        let skufull = trParent.children('.skufull').text()
        console.log(">> "+skufull, serIdOrig)
        let tablaSerie = $('#tblMaintenance i[sku_original="'+serIdOrig+'"]').parents('tr')
        tablaSerie.children('.sku').text(skufull)
        console.log(tablaSerie.children('.sku'), skufull)
        $('#boxSubmenu').remove()

    });

    $('.closeFree')
        .unbind('click')
        .on('click', function () {
        $('#boxSubmenu').remove()

        }); */
}

/* function checkSerie(pjtcnid) {
    console.log('ID-Producto-Check', pjtcnid);
    var pagina = 'WorkInputContent/checkSeries';
    var par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'html';
    var selector = myCheck; 
    fillField(pagina, par, tipo, selector);
} */
    
/* function myCheck(dt){
    //$('#ChangeReasonMtModal').addClass('overlay_hide');
    $('#'(this)).css({"color":"#CC0000"});
    $('#'(this)).children(".claseElemento").css({"color":"#CC0000"});

    // $('#'+dt).attr("id",NuevoSku).children("td.nombreclase").text(NuevoSku);
    // $('#'+dt).attr("id",sernumber).children("td.nombreclase").text(sernumber);
    // $('#'+dt).attr("id",sertype).children("td.nombreclase").text(NuevoSku);

    //cambiar attr de id para cambiarlo

    //alert("Registro actualizado")
} */

/* function read_exchange_table() {
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
} */
    
    /* function goThroughStore(strId) {
        let inx = -1;
        $.each(strs, function (v, u) {
            if (strId == u.str_id) inx = v;
        });
        return inx;
    }
 */
    /* function putUpdateStore(dt) {
        getStores();
        if (strs.length > 0) {
            // console.log(dt);
            let ix = goThroughStore(dt);
            // console.log(strs[ix].str_id);
            // console.log($(`#${strs[ix].str_id}`).children('td.store-name').html());
    
            $(`#${strs[ix].str_id}`).children('td.store-name').html(strs[ix].str_name);
            $(`#${strs[ix].str_id}`).children('td.store-owner').html(strs[ix].emp_fullname);
            $(`#${strs[ix].str_id}`).children('td.store-type').html(strs[ix].str_type);
    
            putQuantity(strs[ix].str_id);
            $('#LimpiarFormulario').trigger('click');
        } else {
            setTimeout(() => {
                putUpdateStore(dt);
            }, 100);
        }
    } */

/* function putSerieDetails_old(dt) {
  let H = '<div class="box_submenu" id="boxSubmenu" style="position: fixed; top: 0%; bottom: 0%; left: 0%; width: 100%; background-color: #ffffff;\n' +
    ' background-color: rgba(255, 255, 255, 0.6);'+
    '  z-index: 200;">' +
    '<div  style="position: fixed; top: 12%; bottom: 10%; left: 10%; width: 75%; background-color: #ffffff;\n' +
    '    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.5);\n' +
    '    border-radius: 10px;\n' +
    '    padding: 15px;\n' +
    '  z-index: 200;" >'+

   '<span class="title" style="font-family: $font_secundary;\n' +
    '        color: $dark;\n' +
    '        font-size: 1.7em;"></span>' +
    '<span class="btn_close closeFree" style="font-size: 1.1em;\n' +
    '        font-weight: 900;\n' +
    '        border: 3px solid $dark;\n' +
    '        border-radius: 30px;\n' +
    '        color: $dark;\n' +
    '        padding: 4px 10px;\n' +
    '        margin-top: 4px;\n' +
    '        display: inline-block;\n' +
    '        cursor: pointer;\n' +
    '        &:hover {\n' +
    '          background-color: $dark;\n' +
    '          color: $light;">Cerrar</span>' +
    '<table className="display compact nowrap" id="tblBoxSubmenu" style="width:  100%">'+
    '<thead>'+
  '<tr>'+
  '  <th colSpan="4"></th>'+
  '  </tr>'+
  '  <tr>'+
  '    <th style="width:  10%"></th>'+
  '    <th style="width: 15%">SKU</th>'+
  '    <th style="width: 50%">Descripcion Producto</th>'+
  '    <th style="width:  25%">Num Serie</th>'+
  '  </tr>'+
  '  </thead>'+
  ' </table>'+
  ' </div></div>';
  $('#ReasonMtModal .overlay_modal').append(H);

//   *
//    * ejemplo para actualizar tabla
//    * let sku = ${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}
//    * $('#ReasonMtModal .overlay_modal' #sku}
  


  $('#tblBoxSubmenu').DataTable({
    destroy: true,
    order: [[1, 'asc']],
    lengthMenu: [
      [100, 150, 200, -1],
      [100, 150, 200, 'Todos'],
    ],
    pagingType: 'simple_numbers',
    language: {
      url: 'app/assets/lib/dataTable/spanish.json',
    },
    scrollY: 'calc(100vh - 290px)',
    scrollX: true,
    fixedHeader: true,
    columns: [
      {data: 'deditable', class: 'edit'},
      {data: 'dseriesku', class: 'sku left skufull'},
      {data: 'dsername', class: 'product-name left pname'},
      {data: 'dsernumber', class: 'sernumber'},
    ],
  });
  build_modal_seriefree(dt);
} */

function putDetailsProds_old(dt) {
    //     if (dt[0].pjtpd_id != '0')
    //     {
    //         let tabla = $('#tblAsigInput').DataTable();
    //         $.each(dt, function (v, u)         {
    //         let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
    //             tabla.row
    //                 .add({
    //                     editable: `<i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i>`,
    //  /*                   pack_sku: `<span class="hide-support" id="SKU-${u.pjtcn_prod_sku}">${u.pjtcn_id}</span>${u.pjtcn_prod_sku}`, */
    //                     pack_sku: skufull,
    //                     packname: u.pjtcn_prod_name,
    //                     packcount: u.pjtcn_quantity,
    //                     packlevel: u.pjtcn_prod_level,
    //                     packstatus: '<input class="serprod fieldIn" type="text" id="id' + u.pjtcn_id + '" value="'+'">'
    //                     /* '<input class="serprod fieldIn" type="text" id="PS-' + par[0].sercostimp + '" value="' + par[0].sercostimp + '">' */
    //                 })
    //                 .draw();
    // /*<i class="fas fa-times-circle choice pack kill" id="D-${u.pjtpd_id}"></i>`, */
    //             $(`#SKU-${u.pjtcn_prod_sku}`).parent().parent().attr('id', u.pjtcn_id).addClass('indicator');
    //         });
    //         activeIcons();
    //     }
    }
    
    

/*
  $('#ChangeReasonMtModal .btn_back')
    .unbind('click')
    .on('click', function () {
      getReason(28);
      //$('#ChangeReasonMtModal').addClass('overlay_hide');
    });

    $('.serief.modif')
        .unbind('click')
        .on('click', function () {
            let serId = $(this).attr('id').slice(1, 10);

            $('#ChangeReasonMtModal').removeClass('overlay_hide');

            $('#ChangeReasonMtModal .btn_close_sec')
                .unbind('click')
                .on('click', function () {
                    $('#ChangeReasonMtModal').addClass('overlay_hide');
                });
                getReasonFree(serId);
        });
*/

/** +++++  Activa los iconos OK */

//Solicita las series de los productos  OK


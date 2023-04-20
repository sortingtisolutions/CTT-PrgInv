let products;
//let prjid = window.location.pathname.split("/").pop();
let prjid;
let glbcnid;
let motmanteince;
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
}

// Solicita los paquetes  OK
function getProjects(prjid) {
    console.log(prjid)
    var pagina = 'WorkInputContent/listProjects';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}

// Solicita los productos del proyecto  OK
function getDetailProds() {
    var pagina = 'WorkInputContent/listDetailProds';
    var par = `[{"pjt_id":"${prjid}"}]`;
    var tipo = 'json';
    var selector = putDetailsProds;
    fillField(pagina, par, tipo, selector);
}

//Solicita las series de los productos  OK
function getSeries(pjtcnid) {
    // console.log('ID-Contenido Producto', pjtcnid);
    var pagina = 'WorkInputContent/listSeries';
    var par = `[{"pjtcnid":""}]`;
    var tipo = 'json';
    var selector = putSeries;
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

//**************  NIVEL 1 DE DATOS *****************************************

// Configura la tabla de productos del proyecto
function setting_table_AsignedProd() {
    
    let tabla = $('#tblAsigInput').DataTable({
        order: [[1, 'asc']],
        pageLength: 1000,
        select: true,
        dom: 'Brti',
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
    $('#txtProjectName').val(dt[0].pjt_name);
    $('#txtProjectNum').val(dt[0].pjt_number);
    $('#txtTipoProject').val(dt[0].pjttp_name);
    /* $('#txtStartDate').val(dt[0].pjt_date_start); */
    $('#txtEndDate').val(dt[0].pjt_date_end);
    // $('#txtLocation').val(dt[0].pjt_location);
    // $('#txtCustomer').val(dt[0].cus_name);
    $('#txtAnalyst').val(dt[0].analyst);
    $('#txtFreelance').val(dt[0].freelance);
}

// ### LISTO ### Llena la TABLA INICIAL de los detalles del proyecto
function putDetailsProds_old(dt) {
    if (dt[0].pjtpd_id != '0')
    {
        let tabla = $('#tblAsigInput').DataTable();
        $.each(dt, function (v, u)         {
        let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
            tabla.row
                .add({
                    editable: `<i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i>`,
 /*                   pack_sku: `<span class="hide-support" id="SKU-${u.pjtcn_prod_sku}">${u.pjtcn_id}</span>${u.pjtcn_prod_sku}`, */
                    pack_sku: skufull,
                    packname: u.pjtcn_prod_name,
                    packcount: u.pjtcn_quantity,
                    packlevel: u.pjtcn_prod_level,
                    packstatus: '<input class="serprod fieldIn" type="text" id="id' + u.pjtcn_id + '" value="'+'">'
                    /* '<input class="serprod fieldIn" type="text" id="PS-' + par[0].sercostimp + '" value="' + par[0].sercostimp + '">' */
                })
                .draw();
/*<i class="fas fa-times-circle choice pack kill" id="D-${u.pjtpd_id}"></i>`, */
            $(`#SKU-${u.pjtcn_prod_sku}`).parent().parent().attr('id', u.pjtcn_id).addClass('indicator');
        });
        activeIcons();
    }
}


function putDetailsProds(dt) {
   /*  $('#tblAsigInput').DataTable();
    tblprod.find('tbody').html('');
    $.each(dt, function (v, u) {
        let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
        let H = `<tr>
                    <td class="cn"><i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i></td>
                    <td class="lf">${skufull}</td>
                    <td class="lf">${u.pjtcn_prod_name}</td>
                    <td class="cn">${u.pjtcn_quantity}</td>
                    <td class="cn">${u.pjtcn_prod_level}</td>
                    <td class="lf"><input class="serprod fieldIn" type="text" id="id-${u.pjtcn_id}" value=""></td>
                </tr>`;
        tblprod.append(H);
    }); */
    /* widthTable(tblprod); */
    /* activeIcons(); */

    if (dt[0].pjtpd_id != '0')
    {
        let tabla = $('#tblAsigInput').DataTable();
        $.each(dt, function (v, u)         {
        let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
            tabla.row
                .add({
                    editable: `<i class="fas fa-solid fa-wrench toLink" id="${u.pjtcn_id}"></i>`,
                    pack_sku: skufull,
                    packname: u.pjtcn_prod_name,
                    packcount: u.pjtcn_quantity,
                    packlevel: u.pjtcn_prod_level,
                    packstatus: '<input class="serprod fieldIn" type="text" id="id' + u.pjtcn_id + '" value="'+'">'
                })
                .draw();
            $(`#SKU-${u.pjtcn_prod_sku}`).parent().parent().attr('id', u.pjtcn_id).addClass('indicator');
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
            glbcnid=pjtcnid;
            console.log('Cont-Producto', pjtcnid);
            if (pjtcnid > 0) {
                getSeries(pjtcnid);
            }
        });
}

//**************  NIVEL 2 DE DATOS  *****************************************

// ### LISTO ### Llena prepara la table dentro del modal para series ### LISTO -- MODAL 1###
function putSeries(dt) {
    settingSeries();
    build_modal_serie(dt);
}

function settingSeries(){
        // console.log('Setting-Series');
        $('#ReasonMtModal').removeClass('overlay_hide');
        $('#tblMaintenance').DataTable({
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
                {data: 'sermodif', class: 'edit'},
                {data: 'seriesku', class: 'supply'},
                {data: 'sername', class: 'supply'},
            ],
        } );

        $('#ReasonMtModal .btn_close')
        .unbind('click')
        .on('click', function () {
            console.log('Cierra Motivos');
            $('.overlay_background').addClass('overlay_hide');
            $('.overlay_closer .title').html('');
            let Dtable=$('#tblMaintenance').DataTable();
            Dtable.rows().remove().draw();
            
        });
        activeIcons();
}
// ### LISTO ### Llena con datos de series la tabla del modal --- MODAL 1
function build_modal_serie(dt) {
        console.log('Nivel 2', dt);
        let tabla = $('#tblMaintenance').DataTable();
        $('.overlay_closer .title').html('LISTADO DE MOTIVOS:');
        /* tabla.rows().remove().draw(); */
        $.each(dt, function (v, u) {
            // let valstage = u.ser_stage == 'TA' ? 'color:#CC0000' : 'color:#3c5777';
            tabla.row
                .add({
                    // <i class="fa-solid fa-wrench"></i>
                    // sermodif: `<i class='fas fa-wrenc toLink2' id="${u.pjtdt_prod_sku.slice(0, 7)}"  sku_original = "${skufull}"></i> <i class='fas fa-check-circle toCheck' id="${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}"></i>`,
                    // sermodif: `<i class='fas fa-edit toChange' id="${u.rmt_id}"></i></i> <i class='fas fa-check-circle toCheck' id=""></i>`,
                    sermodif: `<i class='fas fa-check-circle toCheck' id="${u.rmt_id}" data="${u.rmt_description}"></i>`,
                    seriesku: u.rmt_code,
                    sername: u.rmt_description,
                })
                .draw();
            //$(`#E${u.pjtcn_id}`).parents('tr').attr('data-product', u.pjtcn_id);
        });
        
        activeIconsSerie();
}


/** ### LISTO ### +++++  Activa los iconos del modal de serie */
function activeIconsSerie() {
    console.log('ACTIVA MOTIVOS DE MANTENIMIENTO');
    $('.toCheck')
        .unbind('click')
        .on('click', function () {
        let serprd = $(this).attr('id');
        let motdesc = $(this).attr('data');
        console.log('Click Selecciona Motivo', serprd, motdesc);
        motmanteince = motdesc;

        console.log('Cierra Motivos seleccionado');
        $('.overlay_background').addClass('overlay_hide');
        $('.overlay_closer .title').html('');

        $('#tblAsigInput').DataTable().row().val()=motmanteince;
        // myCheck(serprd);
    
        });
   /*  $('.toChange')
        .unbind('click')
        .on('click', function () {
            let serprd = $(this).attr('id');
            let serorg = $(this).attr('sku_original');
                //let serprd = "28";
                //let qty = $(this).parent('td').attr('data-content');
                console.log('Click Modal Series', serprd);
                if (serprd != "") {
                    getSerieDetail(serprd, serorg);
            }
    }); */
}

//**************  NIVEL 3 DE DATOS  *****************************************

function settingChangeSerie(){
    console.log('setting');
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
           /* $('#tblChangeSerie').DataTable().remove().draw(); */
            // activeIcons();
        });
    
}

// AGREGA LAS SERIES DISPONIBLES
function putSerieDetails(dt){
    
    console.log(dt);
    settingChangeSerie();
    console.log('Configuro SET');
    let tabla = $('#tblChangeSerie').DataTable();
    $('.overlay_closer .title').html(`NUMERO DE SERIE A CAMBIAR: ${dt[0].prd_name} - ${dt[0].prd_sku}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        tabla.row
            .add({
                /* sermodif: `<i class='fas fa-edit toChange' id="${acc}"  sku_original = "${skufull}"></i> <i class='fas fa-check-circle toCheck' id="${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}"></i>`, */
                /* serchange: `<i class='fas fa-edit toEdit' "></i> <i class='fas fa-check-circle toStop' "></i>`, */
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
    // activeIconsSerie();

}

function build_modal_seriefree(dt) {
    console-log(dt);
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
    activeIconsSerieFree();
}

/** +++++  Activa los iconos del modal de serie free */
function activeIconsSerieFree() {
    $('.toLink3')
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

        });
}

function checkSerie(pjtcnid) {
    console.log('ID-Producto-Check', pjtcnid);
    var pagina = 'WorkInputContent/checkSeries';
    var par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'html';
    var selector = myCheck; 
    fillField(pagina, par, tipo, selector);
    }
    
    function myCheck(dt){
    //$('#ChangeReasonMtModal').addClass('overlay_hide');
    $('#'(this)).css({"color":"#CC0000"});
    $('#'(this)).children(".claseElemento").css({"color":"#CC0000"});
    
    /* $('#'+dt).attr("id",NuevoSku).children("td.nombreclase").text(NuevoSku);
    $('#'+dt).attr("id",sernumber).children("td.nombreclase").text(sernumber);
    $('#'+dt).attr("id",sertype).children("td.nombreclase").text(NuevoSku); */
    
    //cambiar attr de id para cambiarlo
    
    //alert("Registro actualizado")
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
    
    function goThroughStore(strId) {
        let inx = -1;
        $.each(strs, function (v, u) {
            if (strId == u.str_id) inx = v;
        });
        return inx;
    }

    function putUpdateStore(dt) {
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
    }

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


/*
  $('#ChangeReasonMtModal .btn_back')
    .unbind('click')
    .on('click', function () {
      getSeries(28);
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
                getSeriesFree(serId);
        });
*/

/** +++++  Activa los iconos OK */

//Solicita las series de los productos  OK


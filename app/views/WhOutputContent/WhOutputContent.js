let products;
//let prjid = window.location.pathname.split("/").pop();
let prjid;
//var prjid;

$(document).ready(function () {
    if (verifica_usuario()) {
        prjid=Cookies.get('pjtid');
        inicial();
    }
});

function inicial() {
    setting_table_AsignedProd();
    getProjects();
    getDetailProds();
}

// Solicita los paquetes  OK
function getProjects(pjtid) {
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
    console.log('ID-Contenido Producto', pjtcnid);
    var pagina = 'WhOutputContent/listSeries';
    var par = `[{"pjtcnid":"${pjtcnid}"}]`;
    var tipo = 'json';
    var selector = putSeries;
    fillField(pagina, par, tipo, selector);
}

// Solicita las series disponibles
function getSerieDetail(serid, serorg) {
    var pagina = 'WhOutputContent/listSeriesFree';
    var par = `[{"pjtser_id":"${serid}", "serorg":"${serorg}" }]`;
    var tipo = 'json';
    var selector = putSerieDetails;
    fillField(pagina, par, tipo, selector);
}




// Configura la tabla de productos del proyecto
function setting_table_AsignedProd() {
    let tabla = $('#tblAsignedProd').DataTable({
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
            {data: 'packname', class: 'sel product-name'},
            {data: 'packcount', class: 'sel sku'},
            {data: 'packlevel', class: 'sel sku'},
        ],
    });
}

// ### LISTO ### Llena la TABLA INICIAL de los detalles del proyecto
function putDetailsProds(dt) {
    if (dt[0].pjtpd_id != '0')
    {
        let tabla = $('#tblAsignedProd').DataTable();
        $.each(dt, function (v, u)
        {
        let skufull = u.pjtcn_prod_sku.slice(7, 11) == '' ? u.pjtcn_prod_sku.slice(0, 7) : u.pjtcn_prod_sku.slice(0, 7) + '-' + u.pjtcn_prod_sku.slice(7, 11);
            tabla.row
                .add({
                    editable: `<i class="fas fa-edit toLink" id="${u.pjtcn_id}"></i>`,
 /*                   pack_sku: `<span class="hide-support" id="SKU-${u.pjtcn_prod_sku}">${u.pjtcn_id}</span>${u.pjtcn_prod_sku}`, */
                    pack_sku: skufull,
                    packname: u.pjtcn_prod_name,
                    packcount: u.pjtcn_quantity,
                    packlevel: u.pjtcn_prod_level
                })
                .draw();
/*<i class="fas fa-times-circle choice pack kill" id="D-${u.pjtpd_id}"></i>`, */
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
            console.log('Cont-Producto', pjtcnid);
            if (pjtcnid > 0) {
                getSeries(pjtcnid);
            }
        });

    $('.modif')
        .unbind('click')
        .on('click', function () {
            let sltor = $(this);
            let prdId = sltor.parents('tr').attr('id');
            let prdNm = 'Modifica producto';

           // $('#ProductModal').removeClass('overlay_hide');
           // $('.overlay_closer .title').html(prdNm);
            /*getSelectProduct(prdId);*/
            /*$('#ProductModal .btn_close')
                .unbind('click')
                .on('click', function () {
                    $('.overlay_background').addClass('overlay_hide');
                }); */
        });


}

//AGREGA LOS DATOS GENERALES DEL PROYECTO
function putProjects(dt) {
        $('#txtTipoProject').val(dt[0].pjttp_name);
        $('#txtProjectName').val(dt[0].pjt_name);
        $('#txtProjectNum').val(dt[0].pjt_number);
        $('#txtStartDate').val(dt[0].pjt_date_start);
        $('#txtEndDate').val(dt[0].pjt_date_end);
        $('#txtLocation').val(dt[0].pjt_location);
        $('#txtCustomer').val(dt[0].cuo_id);
        $('#txtAnalyst').val(dt[0].analyst);
        $('#txtFreelance').val(dt[0].freelance);
}
// ### LISTO ### Llena prepara la table dentro del modal para series ### LISTO -- MODAL 1###
function putSeries(dt) {

    $('#SerieModal').removeClass('overlay_hide');
    $('#tblSerie').DataTable({
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
            {data: 'seriesku', class: 'sku left'},
            {data: 'sername', class: 'product-name left'},
            {data: 'sernumber', class: 'sernumber'},
            {data: 'sertype', class: 'sertype'},

        ],
    });

    $('#SerieModal .btn_close')
        .unbind('click')
        .on('click', function () {
           $('.overlay_background').addClass('overlay_hide');

            activeIcons();
        });
    build_modal_serie(dt);
}
// ### LISTO ### Llena con datos de series la tabla del modal --- MODAL 1
function build_modal_serie(dt) {
            let tabla = $('#tblSerie').DataTable();
            $('.overlay_closer .title').html(`${dt[0].pjtdt_prod_sku} - ${dt[0].prd_name}`);
            tabla.rows().remove().draw();
            $.each(dt, function (v, u) {
                let skufull = u.pjtdt_prod_sku.slice(7, 11) == '' ? u.pjtdt_prod_sku.slice(0, 7) : u.pjtdt_prod_sku.slice(0, 7) + u.pjtdt_prod_sku.slice(7, 11);
                let sku = u.pjtdt_prod_sku.slice(0, 8);
                let accesory = u.pjtdt_prod_sku.slice(7,8);
                let acc = u.pjtdt_prod_sku.slice(7,8) == 'A' ? skufull : sku;
                tabla.row
                    .add({
                       // sermodif: `<i class='fas fa-edit toLink2' id="${u.pjtdt_prod_sku.slice(0, 7)}"  sku_original = "${skufull}"></i> <i class='fas fa-check-circle toCheck' id="${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}"></i>`,
                      sermodif: `<i class='fas fa-edit toLink2' id="${acc}"  sku_original = "${skufull}"></i> <i class='fas fa-check-circle toCheck' id="${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}"></i>`,
                        seriesku: skufull,
                        sername: u.prd_name,
                        sernumber: u.ser_serial_number,
                        sertype: u.prd_level,

                    })
                    .draw();
                //$(`#E${u.pjtcn_id}`).parents('tr').attr('data-product', u.pjtcn_id);
            });
            console.log('MODAL SERIE-');
            activeIconsSerie();
}

/** ### LISTO ### +++++  Activa los iconos del modal de serie */
function activeIconsSerie() {
    $('.toLink2')
    .unbind('click')
    .on('click', function () {
      console.log("MODAL");
        let serprd = $(this).attr('id');
      let serorg = $(this).attr('sku_original');
        //let serprd = "28";
        //let qty = $(this).parent('td').attr('data-content');

        console.log('Click Modal Series', serprd);
        if (serprd != "") {
            getSerieDetail(serprd, serorg);
        }
    });

  $('.toCheck')
    .unbind('click')
    .on('click', function () {
      let serprd = $(this).attr('id');
      //let serprd = "28";
      console.log("Para validar: "+serprd);
      checkSerie(serprd);
      console.log('Check despues', serprd);
      /*if (serprd != "") {
        getSerieDetail(serprd);
      }*/
    });

}

// AGREGA LAS SERIES DISPONIBLES
function putSerieDetails(dt) {
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
  $('#SerieModal .overlay_modal').append(H);

  /**
   * ejemplo para actualizar tabla
   * let sku = ${u.pjtdt_prod_sku.slice(0,7)+u.pjtdt_prod_sku.slice(7,11)}
   * $('#SerieModal .overlay_modal' #sku}
   */


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
}

    function build_modal_seriefree(dt) {
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
        let tablaSerie = $('#tblSerie i[sku_original="'+serIdOrig+'"]').parents('tr')
        tablaSerie.children('.sku').text(skufull)
        console.log(tablaSerie.children('.sku'), skufull)
        $('#boxSubmenu').remove()

    });

  $('.closeFree')
    .unbind('click')
    .on('click', function () {
      $('#boxSubmenu').remove()

    });
/*
  $('#ChangeSerieModal .btn_back')
    .unbind('click')
    .on('click', function () {
      getSeries(28);
      //$('#ChangeSerieModal').addClass('overlay_hide');
    });

    $('.serief.modif')
        .unbind('click')
        .on('click', function () {
            let serId = $(this).attr('id').slice(1, 10);

            $('#ChangeSerieModal').removeClass('overlay_hide');

            $('#ChangeSerieModal .btn_close_sec')
                .unbind('click')
                .on('click', function () {
                    $('#ChangeSerieModal').addClass('overlay_hide');
                });


                getSeriesFree(serId);
        });
*/
}
/** +++++  Activa los iconos OK */

//Solicita las series de los productos  OK
function checkSerie(pjtcnid) {
  console.log('ID-Producto-Check', pjtcnid);
  var pagina = 'WhOutputContent/checkSeries';
  var par = `[{"pjtcnid":"${pjtcnid}"}]`;
  var tipo = 'html';
  var selector = myCheck; //build_modal_serie;
  fillField(pagina, par, tipo, selector);
}

function myCheck(dt){
  //$('#ChangeSerieModal').addClass('overlay_hide');
  $('#'+dt).css({"color":"#CC0000"});
  $('#'+dt).children(".claseElemento").css({"color":"#CC0000"});

  $('#'+dt).attr("id",NuevoSku).children("td.nombreclase").text(NuevoSku);
  $('#'+dt).attr("id",sernumber).children("td.nombreclase").text(sernumber);
  $('#'+dt).attr("id",sertype).children("td.nombreclase").text(NuevoSku);

  //cambiar attr de id para cambiarlo

  //alert("Registro actualizado")
}

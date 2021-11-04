let products;
//let prjid = window.location.pathname.split("/").pop();
let prjid = '5';
//var prjid;

$(document).ready(function () {
    if (verifica_usuario()) {
        //prjid=cookie.get('pjrId');
        inicial();
    }
});

function inicial() {
    setting_table_AsignedProd();
    console.log('Ventana1', prjid);
    getProjects();
    getDetailProds();
}

// Solicita los paquetes  OK
function getProjects() {
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
function getSerieDetail(serid) {
    var pagina = 'WhOutputContent/listSeriesFree';
    var par = `[{"pjtser_id":"${serid}"}]`;
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

// ### LISTO ### Llena la tabla de los detalles del proyecto
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

// ### LISTO ###   habilita el boton para validar
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
// ### LISTO ### Llena prepara la table dentro del modal para series ### LISTO ###
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
            {data: 'sernumber', class: 'sku'},
            {data: 'sertype', class: 'sku'},
            {data: 'serstatus', class: 'sku'},
            {data: 'cinvoice', class: 'sku'},
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
// ### LISTO ### Llena con datos de series la tabla del modal
function build_modal_serie(dt) {
            let tabla = $('#tblSerie').DataTable();
            $('.overlay_closer .title').html(`${dt[0].pjtdt_prod_sku} - ${dt[0].prd_name}`); 
            tabla.rows().remove().draw();
            $.each(dt, function (v, u) {
                let skufull = u.pjtdt_prod_sku.slice(7, 11) == '' ? u.pjtdt_prod_sku.slice(0, 7) : u.pjtdt_prod_sku.slice(0, 7) + '-' + u.pjtdt_prod_sku.slice(7, 11);
                tabla.row
                    .add({
                        sermodif: `<i class='fas fa-edit toLink' id="${u.pjtdt_prod_sku.slice(0, 7)}"></i>`,
                        seriesku: skufull,
                        sername: u.prd_name,
                        sernumber: u.ser_id,
                        sertype: u.prd_level,
                        serstatus: u.prd_status,
                        cinvoice: u.pjtcn_id,
                    })
                    .draw();
                $(`#E${u.pjtcn_id}`).parents('tr').attr('data-product', u.pjtcn_id);
            });
            console.log('MODAL SERIE-');
            activeIconsSerie();
}

/** ### LISTO ### +++++  Activa los iconos del modal de serie */
function activeIconsSerie() {  
    $('.toLink')
    .unbind('click')
    .on('click', function () {
        let serprd = $(this).attr('id');
        let qty = $(this).parent('td').attr('data-content');
        console.log('Click Modal Series', serprd);  
        if (serprd != "") {
            getSerieDetail(serprd);
        }
    });

}

// AGREGA LAS SERIES DISPONIBLES
function putSerieDetails(dt) {
        $('#ChangeSerieModal').removeClass('overlay_hide');

        $('#tblChangeSerie').DataTable({
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
                {data: 'dseriesku', class: 'sku left'},
                {data: 'dsername', class: 'product-name left'},
                {data: 'dsernumber', class: 'sku'},
                {data: 'dsertype', class: 'sku'},
                {data: 'dserstatus', class: 'sku'},
            ],
        });
            
        $('#ChangeSerieModal .btn_close')
            .unbind('click')
            .on('click', function () {
                $('.overlay_background').addClass('overlay_hide');
               // activeIconsSerie();
             });
        build_modal_seriefree(dt);
}

    function build_modal_seriefree(dt) {
        //console.log('PASO 4 --- build_modal_seriefree');
            let tabla = $('#tblChangeSerie').DataTable();
            /*$('.overlay_closer .title').html(`${dt[0].ser_sku} - ${dt[0].pjtcn_prod_name}`); */
            $('.overlay_closer .title').html(`${dt[0].ser_sku}`); 
            tabla.rows().remove().draw();
            $.each(dt, function (v, u) {
            let skufull = u.ser_sku.slice(7, 11) == '' ? u.ser_sku.slice(0, 7) : u.ser_sku.slice(0, 7) + '-' + u.ser_sku.slice(7, 11);
            let nametemporal = "MISMO NOMBRE";
                tabla.row
                    .add({
                        deditable: `<i class='fas fa-edit serie modif' id="E${u.ser_id}"></i>`,
                        dseriesku: skufull,
                        dsername: nametemporal,
                        dsernumber: u.ser_serial_number,
                        dsertype: u.ser_situation,
                        dserstatus: u.ser_stage,
                    })
                    .draw();
                $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.ser_id);
            });
           /*  activeIcons(); */
        }



/** +++++  Activa los iconos del modal de serie free */
function activeIconsSerieFree() {  
    $('.toLink')
    .unbind('click')
    .on('click', function () {
        let prd = $(this).parents('tr').attr('id');
        let qty = 1;
        //console.log('Modal 3');
        if (qty > 0) {
            getSeriesFree(serId);
        }
    });
    
    $('.serief.modif')
        .unbind('click')
        .on('click', function () {
            let serId = $(this).attr('id').slice(1, 10);
  
            $('#ChangeSerieModal').removeClass('overlay_hide');
  
            $('#ChangeSerieModal .btn_close')
                .unbind('click')
                .on('click', function () {
                    $('#ChangeSerieModal').addClass('overlay_hide');
                });
                getSeriesFree(serId);
        });

}
/** +++++  Activa los iconos OK */


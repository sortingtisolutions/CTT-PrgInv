let products;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    setting_table_detailprods();
    getProjects();
    getDetailProds();
}

// Configura la tabla de paquetes
function setting_table_detailprods() {
    let tabla = $('#tblAsignedProd').DataTable({
        order: [[4, 'desc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, 300, -1],
            [100, 200, 300, 'Todos'],
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
            {data: 'proj_sku', class: 'sel sku'},
            {data: 'packname', class: 'sel product-name'},
            {data: 'packpric', class: 'sel serie'},
            {data: 'packpric', class: 'sel count'},
            {data: 'packpric', class: 'sel level'}
        ],
    });
}

// Solicita los paquetes
function getProjects() {
    var pagina = 'WhOutputContent/listProjects';
    var par = `[{"pckId":""}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}
// Solicita los paquetes
function getDetailProds() {
    var pagina = 'WhOutputContent/listDetailProds';
    var par = `[{"prdId":""}]`;
    var tipo = 'json';
    var selector = putDetailsProjs;
    fillField(pagina, par, tipo, selector);
}

// Llena la tabla de paquetes
function putDetailsProjs(dt) {
    if (dt[0].pjtpd_id != '0') {
        let tabla = $('#tblAsignedProd').DataTable();
        $.each(dt, function (v, u) {
            tabla.row
                .add({
                    editable: `<i class="fas fa-pen choice pack modif" id="E-${u.pjtpd_id}"></i>
                           <i class="fas fa-times-circle choice pack kill" id="D-${u.pjtpd_id}"></i>`,
                    pack_sku: `<span class="hide-support" id="SKU-${u.pjtdt_prod_sku}">${u.pjtpd_id}</span>${u.pjtdt_prod_sku}`,
                    packname: u.pjtdt_prod_name,
                    packserie: u.ser_id,
                    packcount: u.pjtdt_quantity,
                    packlevel: u.pjtcn_id
                })
                .draw();

            $(`#SKU-${u.prd_sku}`).parent().parent().attr('id', u.prd_id).addClass('indicator');
        });
        action_selected_packages();
    }
}

function active_params() {
    $('#txtIdPackages').val(0);
    $('#txtPackageName').val('');
    $('#txtPackagePrice').val('');
    $('.mainTitle').html('Generar paquete');
    $(`#txtCategoryPack`).attr('disabled', false);
    $(`#txtSubcategoryPack`).attr('disabled', false);
    $('#btn_packages').html('Crear paquete').addClass('disabled');
    $(`#txtCategoryPack`).val(0);
    $(`#txtCategoryPack option[value="0"]`).trigger('change');
    $(`#txtSubcategoryPack`).val(0);
    $('#btn_packages_cancel').addClass('hide-items');
}

function action_selected_products() {
    $('#tblProducts .choice')
        .unbind('click')
        .on('click', function () {
            let edt = $(this).attr('class').indexOf('kill');
            // console.log(edt);
            let prdId = $(this).attr('id');
            confirm_delet_product(prdId);
        });
}

function putProjects(dt) {
    let chc = dt[0].pjtpd_id;
    
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

function select_products(prdId) {
    var pagina = 'Packages/listProductsPack';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putProductsPack;
    fillField(pagina, par, tipo, selector);
}

function putNewProductsPack(dt) {
    let tabla = $('#tblProducts').DataTable();
    tabla.row
        .add({
            editable: `<i class="fas fa-times-circle choice prod kill" id="D-${dt[0].prd_id}-${dt[0].prd_parent}"></i>`,
            prod_sku: `<span class="hide-support" id="SKU-${dt[0].prd_sku}">${dt[0].prd_id}</span>${dt[0].prd_sku}`,
            prodname: dt[0].prd_name,
            prodpric: dt[0].prd_price,
        })
        .draw();
    action_selected_products();
}

function confirm_delet_product(id) {
    $('#delProdModal').modal('show');
    $('#txtIdProductPack').val(id);
    //borra paquete +
    $('#btnDelProduct').on('click', function () {
        let Id = $('#txtIdProductPack').val();
        let prdId = Id.split('-')[1];
        let prdParent = Id.split('-')[2];
        let tabla = $('#tblProducts').DataTable();
        $('#delProdModal').modal('hide');

        let prdRow = $(`#${Id}`).parents('tr');

        tabla.row(prdRow).remove().draw();

        var pagina = 'Packages/deleteProduct';
        var par = `[{"prdId":"${prdId}","prdParent":"${prdParent}"}]`;
        var tipo = 'json';
        var selector = putDelPackages;
        fillField(pagina, par, tipo, selector);
    });
}

function putDelPackages(dt) {
    $('#delPackModal').modal('hide');
}

/**  ++++ Omite acentos para su facil consulta */
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}

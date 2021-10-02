let products;

$(document).ready(function () {
    verifica_usuario();
    inicial();
});

function inicial() {
    setting_table_AsignedProd();
    getProjects();
    getDetailProds();
}

// Configura la tabla de paquetes
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
                    read_package_table();
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
            {data: 'packserie', class: 'sel serie'},
            {data: 'packcount', class: 'sel count'},
            {data: 'packlevel', class: 'sel level'},
        ],
    });
}


// Solicita los paquetes
function getProjects() {
    var pagina = 'WhOutputContent/listProjects';
    var par = `[{"pjtpd_id":""}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}

// Solicita los paquetes
function getDetailProds() {
    var pagina = 'WhOutputContent/listDetailProds';
    var par = `[{"pjtpd_id":""}]`;
    var tipo = 'json';
    var selector = putDetailsProjs;
    fillField(pagina, par, tipo, selector);
}

// Llena la tabla de paquetes
function putDetailsProjs(dt) 
{
    console.log('PASO 2');
    if (dt[0].pjtpd_id != '0') 
    {
        let tabla = $('#tblAsignedProd').DataTable();
        $.each(dt, function (v, u) 
        {
            tabla.row
                .add({
                    editable: `<i class="fas fa-edit choice pack modif" id="E-${u.pjtpd_id}"></i>`,
                    pack_sku: `<span class="hide-support" id="SKU-${u.pjtdt_prod_sku}">${u.pjtpd_id}</span>${u.pjtdt_prod_sku}`,
                    packname: u.pjtdt_prod_name,
                    packserie: u.ser_id,
                    packcount: u.pjtdt_quantity,
                    packlevel: u.pjtdt_prod_level
                })
                .draw();
/*<i class="fas fa-times-circle choice pack kill" id="D-${u.pjtpd_id}"></i>`, */
            $(`#SKU-${u.prd_sku}`).parent().parent().attr('id', u.prd_id).addClass('indicator');
        });
/*        action_selected_packages();*/
    }
}

function putProjects(dt) 
{
        console.log(dt);
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


let seccion = '';
let docs;
let grp = 50;
let num = 0;
let cats, subs, sku1, sku2, sku3, sku4;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    setTimeout(() => {
        deep_loading('O');
        //console.log('UNO');
        $('.tblProdMaster').css({display: 'none'});
        // setting_table();
        getProjects(0);
    }, 100);
}

/** +++++  Obtiene los proyectos de la base */
function getProjects(catId) {
    var pagina = 'WhOutputs/listProjects';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

/* function getSelectProject(pjtid) {
    var pagina = 'WhOutputs/getSelectProject';
    var par = `[{"prdId":"${pjtid}"}]`;
    var tipo = 'json';
    var selector = putSelectProject;
    fillField(pagina, par, tipo, selector);
} */

/** +++++  coloca los productos en la tabla */
function putProducts(dt) {
    console.log('DOS',dt);
    $('#tblProyects tbody').html('');
    if (dt[0].pjt_id != '0') {
        var catId = dt[0].cat_id;
        //console.log('444',dt);
        $.each(dt, function (v, u) {
            var H = `
                <tr id="${u.pjt_id}">
                    <td class="edit"><i class='fas fa-edit detail'></i><i class='fas fa-door-open toLink'></i></td>
                    <td class="sku">${u.pjttp_name}</td>
                    <td class="sku">${u.pjt_name}</td>
                    <td class="sku">${u.pjt_number}</td>
                    <td class="sku  list">${u.pjt_date_start}</td>
                    <td class="sku  list">${u.pjt_date_end}</td>
                    <td class="sku  list">${u.pjt_date_project}</td>
                    <td class="product-name editable">${u.pjt_location}</td>
                </tr>`;
            $('#tblProyects tbody').append(H);
        });
        settingTable();
        activeIcons();
    } else {
        settingTable();
    }
}

/** +++++  configura la table de productos */
function settingTable() {
    let title = 'Control salida de proyectos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    //console.log('555');
    $('#tblProyects').DataTable({
        order: [[2, 'desc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 200, 300, -1],
            [100, 200, 300, 'Todos'],
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
            {data: 'editable',      class: 'edit', orderable: false},
            {data: 'pjttp_name',    class: 'sku'},
            {data: 'pjt_name',      class: 'sku'},
            {data: 'pjt_number',    class: 'sku'},
            {data: 'pjt_date_start', class: 'sku'},
            {data: 'pjt_date_end',  class: 'sku'},
            {data: 'pjt_date_project', class: 'sku'},
            {data: 'pjt_location',  class: 'sku'},
        ],
    });

      $('.tblProdMaster')
        .delay(500)
        .slideDown('fast', function () {
            //$('.deep_loading').css({display: 'none'});
            //$('#tblProyects').DataTable().draw();
            deep_loading('C');
        });

}

/** +++++  Activa los iconos */
function activeIcons() {
    $('.toLink')
        .unbind('click')
        .on('click', function () {
            let prd = 4;
            /* let prd = $(this).parents('tr').attr('id');
            let qty = $(this).parent().attr('data-content').split('|')[2]; */
            console.log('Paso link..');
            confirm_delet_product(prd);
        });

    $('.detail')
        .unbind('click')
        .on('click', function () {
            console.log('Pasando siguiente ventana...');
            let sltor = $(this);
            let pjtid = sltor.parents('tr').attr('id');
            let prdNm = 'Modifica proyecto';

            console.log(pjtid);
            Cookies.set('pjtid', pjtid, {expires:1});

            window.location = 'WhOutputContent';
        });

}

function confirm_delet_product(id) {
    $('#delProdModal').modal('show');
    $('#txtIdProductPack').val(id);
    //borra paquete +
    $('#btnDelProduct').on('click', function () {
        let Id = $('#txtIdProductPack').val();
        var arrayID = Id.split('-');
        let prdId = arrayID[0];
        let prdParent = arrayID[1];

        let tabla = $('#tblProducts').DataTable();
        $('#delProdModal').modal('hide');

        let prdRow = $(`#${Id}`).parents('tr');
        tabla.row(prdRow).remove().draw();

       /*  var pagina = 'ProductAccessory/deleteProduct';
        var par = `[{"prdId":"${prdId}","prdParent":"${prdParent}"}]`;
        var tipo = 'json';
        var selector = putDelPackages;
        fillField(pagina, par, tipo, selector); */
    });
}

/*
function putSelectProject(dt) {
    cleanProductsFields();
    console.log(dt);
    let prdId = dt[0].pjtcn_id;
    let prdName = dt[0].pjtcn_prod_sku;
    let prdSku = dt[0].pjtcn_prod_name;
    let prdModel = dt[0].pjtcn_quantity;
    let prdPrice = dt[0].pjtcn_prod_level;
    let prdEnglishName = dt[0].pjt_date_project;
    let prdCodeProvider = dt[0].pjt_location;
    let prdNameProvider = dt[0].pjt_status;
    let prdComments = dt[0].pjt_id;

    $('#txtPrdId').val(prdId);
    $('#txtPrdName').val(prdName);
    $('#txtPrdSku').val(prdSku);
    $('#txtPrdModel').val(prdModel);
    $('#txtPrdPrice').val(prdPrice);
    $('#txtPrdEnglishName').val(prdEnglishName);
    $('#txtPrdCodeProvider').val(prdCodeProvider);
    $('#txtPrdNameProvider').val(prdNameProvider);
    $('#txtPrdComments').val(prdComments);

    $('#btn_save')
        .unbind('click')
        .on('click', function () {
            saveEditProduct();
        });

    function cleanProductsFields() {
        $('.textbox').val('');
        $('td.data select').val(0);
        $('td.data .checkbox').html('<i class="far fa-square" data_val="0"></i>');
        $('.required').removeClass('fail').parent().children('.fail_note').addClass('hide');
    }
}
*/

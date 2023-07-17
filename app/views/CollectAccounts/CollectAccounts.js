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
        //deep_loading('O');
        //console.log('UNO');
        $('.tblProdMaster').css({display: 'none'});
        // setting_table();
        getProjects(0);
    }, 100);
}

/** +++++  Obtiene los proyectos de la base */
function getProjects(catId) {
    var pagina = 'CollectAccounts/listProjects';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

/** +++++  configura la table de productos */
function settingTable() {
    let title = 'Control salida de proyectos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    //console.log('555');
    $('#tblCollets').DataTable({
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
            {data: 'clt_folio',      class: 'supply'},
            {data: 'clt_create',    class: 'date'},
            {data: 'clt_namecli',    class: 'supply'},
            {data: 'clt_namepjt',   class: 'supply'},
            {data: 'clt_payall',    class: 'supply'},
            {data: 'clt_paid',      class: 'supply'},
            {data: 'clt_pending',   class: 'supply'},
            {data: 'clt_limitpay',  class: 'date'},
            {data: 'clt_lastpay',   class: 'date'},
        ],
    });

      $('.tblProdMaster')
        .delay(500)
        .slideDown('fast', function () {
            //$('.deep_loading').css({display: 'none'});
            //$('#tblCollets').DataTable().draw();
            deep_loading('C');
        });
}

/** +++++  coloca los productos en la tabla */
function putProducts(dt) {
    //console.log('DOS',dt);
    $('#tblCollets tbody').html('');
    if (dt[0].clt_id != '0') {
        //var catId = dt[0].cat_id;
        //console.log('444',dt);
        $.each(dt, function (v, u) {
            var H = `
                <tr id="${u.clt_id}">
                    <td><i class='fas fa-edit detail'></i><i class='fas fa-door-open toWork'></i></td>
                    <td class="supply">${u.clt_folio}</td>
                    <td class="date">${u.clt_date_generated}</td>
                    <td class="supply">${u.cus_name}</td>
                    <td class="supply">${u.pjt_name}</td>
                    <td class="supply">${u.ctl_amount_payable}</td>
                    <td class="supply">${u.ctl_amount_payable}</td>
                    <td class="supply">${u.ctl_amount_payable}</td>
                    <td class="date">${u.clt_deadline}</td>
                    <td class="date">${u.clt_deadline}</td>
                </tr>`;
            $('#tblCollets tbody').append(H);
        });
        settingTable();
        activeIcons();
    } else {
        settingTable();
    }
}

/** +++++  Activa los iconos */
function activeIcons() {
    $('.toWork')
        .unbind('click')
        .on('click', function () {
            let locID = $(this);
            let pjtid = locID.parents('tr').attr('id');

            //console.log('Paso ToWork..', pjtid);
            confirm_to_work(pjtid);
        });

    $('.detail')
        .unbind('click')
        .on('click', function () {
            /* console.log('Pasando siguiente ventana...');
            let sltor = $(this);
            let pjtid = sltor.parents('tr').attr('id');
            let prdNm = 'Modifica proyecto';

            console.log(pjtid);
            Cookies.set('pjtid', pjtid, {expires:1});

            window.location = 'WhOutputContent'; */
        });

}

function confirm_to_work(pjtid) {
    $('#starToWork').modal('show');
    $('#txtIdProductPack').val(pjtid);
    //borra paquete +
    $('#btnToWork').on('click', function () {
        let Id = $('#txtIdProductPack').val();
        let tabla = $('#tblProducts').DataTable();
        $('#starToWork').modal('hide');

        //console.log('Datos',pjtid,Id);
        var pagina = 'CollectAccounts/UpdateSeriesToWork';
        var par = `[{"pjtid":"${pjtid}"}]`;
        var tipo = 'json';
        var selector = putToWork;
        fillField(pagina, par, tipo, selector);
    });
}

function putToWork(dt){
    console.log(dt)
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

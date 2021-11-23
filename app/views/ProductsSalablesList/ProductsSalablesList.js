let sale;
let ix;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});

function inicial() {
    if (altr == 1) {
        deep_loading('O');
        settingTable();
        getSales();
        fillSales();
        confirm_alert();
    } else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}

function settingTable() {
    let title = 'Ventas de expendables';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    $('#tblSales').DataTable({
        order: [[2, 'des']],
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
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'numbsale', class: 'numberSale center'},
            {data: 'datesale', class: 'dateSale center'},
            {data: 'customer', class: 'customer'},
            {data: 'projname', class: 'project'},
            {data: 'payforms', class: 'payForm'},
            {data: 'sallernm', class: 'seller'},
        ],
    });
}

// Solicita las ventas
function getSales() {
    var pagina = 'ProductsSalablesList/Sales';
    var par = `[{"parm":""}]`;
    var tipo = 'json';
    var selector = putSales;
    fillField(pagina, par, tipo, selector);
}
// Solicita el detalle de la venta
function getSalesDetail(salId) {
    var pagina = 'ProductsSalablesList/SalesDetail';
    var par = `[{"salId":"${salId}"}]`;
    var tipo = 'json';
    var selector = putSalesDetail;
    fillField(pagina, par, tipo, selector);
}

function putSales(dt) {
    sale = dt;
}

function fillSales() {
    if (sale != null) {
        fillSalesTbl();
    } else {
        setTimeout(() => {
            fillSales();
        }, 100);
    }
}

/** ---- Llena la tabla de subcategorias ---- */
function fillSalesTbl() {
    if (sale[0].sal_id != 0) {
        $('#tblSales tbody').html('');

        let tabla = $('#tblSales').DataTable();

        $.each(sale, function (v, u) {
            var rw = tabla.row
                .add({
                    editable: `<i class="fas fa-eye view"></i>`,
                    numbsale: u.sal_number,
                    datesale: u.sal_date,
                    customer: u.sal_customer_name,
                    projname: u.sal_project,
                    payforms: u.sal_pay_form,
                    sallernm: u.sal_saller,
                })
                .draw()
                .node();

            $(rw).attr('id', u.sal_id);
            $(rw).attr('index', v);
        });
        activeActions();
    }
    deep_loading('C');
}

/** +++++  Activa la accion de eventos */
function activeActions() {
    /**  ---- Habilita los iconos de control de la tabla ----- */
    $('#tblSales tbody tr td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            let salId = $(this).parents('tr').attr('id');
            ix = $(this).parents('tr').attr('index');

            switch (acc) {
                case 'view':
                    getSalesDetail(salId);
                    break;
                case 'print':
                    alert('imprime el detalle de la venta ' + salId);
                    break;
                default:
            }
        });
}

/** +++++  Abre el modal y coloca el detalle de la venta */
function putSalesDetail(dt) {
    $('.overlay_closer .title').html(`Número de Venta - ${sale[ix].sal_number}`);
    $('#tblSaleDetail tbody').html('');

    console.log(dt);

    $.each(dt, function (v, u) {
        let amount = u.sld_price * u.sld_quantity;
        amount = formato_numero(amount, 2, '.', ',');
        let H = `
            <tr>
                <td>${u.sld_sku}</td>
                <td>${u.sld_name}</td>
                <td>${u.sld_quantity}</td>
                <td>${u.sld_price}</td>
                <td>${amount}</td>
            </tr>
        `;
        $('#tblSaleDetail tbody').append(H);
    });

    settindSaleDetailTbl(sale[ix].sal_id);
    $('#SaleDetailModal').removeClass('overlay_hide');

    $('#SaleDetailModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
            $('#tblSaleDetail').DataTable().destroy();
        });
}

function settindSaleDetailTbl(salId) {
    $('#tblSaleDetail').DataTable({
        destroy: true,
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [100, 150, 200, -1],
            [100, 150, 200, 'Todos'],
        ],
        buttons: [
            {
                // Boton nuevo producto
                text: '<button class="btn btn-print"><i class="fas fa-print"></i>  Imprimir reporte</button>',

                action: function (e, dt, node, config) {
                    printReport(salId);
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
            {data: 'saldtsku', class: 'sku'},
            {data: 'saldtnme', class: 'productName'},
            {data: 'saldtqty', class: 'quantity center'},
            {data: 'saldtprc', class: 'price'},
            {data: 'saldtamt', class: 'price'},
        ],
    });
}

function printReport(salId) {
    // alert('Imprime reporte ' + salId);
    var us = Cookies.get('user');

    let sal = salId;
    let usr = us.split('|')[0];
    let nme = us.split('|')[2];
    let hst = localStorage.getItem('host');
    window.open(url + 'app/views/ProductsSalables/ProductsSalablesReport.php?i=' + sal + '&u=' + usr + '&n=' + nme + '&h=' + hst, '_blank');
    // window.location = 'ProductsSalables';
}

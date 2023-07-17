let sale;
let ix;
let folio;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
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
            var icoView = `<i class="fas fa-eye view"></i>`;
            var icoComm = '';
            if (u.comments != 0) {
                icoComm = `<i class="far fa-comment-dots comments"></i>`;
            }
            var rw = tabla.row
                .add({
                    editable: icoView + icoComm,
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
                case 'comments':
                    showComments(salId);
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

    $.each(dt, function (v, u) {
        let amount = u.sld_price * u.sld_quantity;
        var icoRtn = '<i class="fas fa-reply-all return" title="Aplicar devolución"></i>';
        if (u.sld_situation == 'DEVOLUCION') {
            amount = amount * -1;
            icoRtn = `<i class="far fa-comment-dots comments"></i>`;
        }
        amount = formato_numero(amount, 2, '.', ',');

        let nameProd = u.sld_name.replace(/"/g, '°');

        let H = `
            <tr id="${u.sld_id}" sale="${u.sal_id}|${u.sld_sku}|${nameProd}|${u.sld_price}|${u.ser_id}|${u.pjt_id}|${u.sld_id}" class="${u.sld_situation.toLowerCase()}">
                <td>${icoRtn}</td>
                <td>${u.sld_sku}</td>
                <td>${u.sld_name}</td>
                <td>${u.sld_quantity}</td>
                <td>${u.sld_price}</td>
                <td>${amount}</td>
                <td>${u.sld_date}</td>
            </tr>
        `;
        $('#tblSaleDetail tbody').append(H);
    });

    $.each(dt, function (v, u) {
        if (u.sld_situation === 'VENTA') {
            var sldSku = u.sld_sku;
            var sldQty = u.sld_quantity;

            $.each(dt, function (m, n) {
                if (n.sld_situation === 'DEVOLUCION' && n.sld_sku == sldSku) {
                    sldQty = sldQty - n.sld_quantity;
                }
            });

            if (u.sld_quantity > sldQty) {
                $(`#tblSaleDetail tbody #${u.sld_id}`).attr('realQty', sldQty);
            }
            if (sldQty < 1) {
                $(`#tblSaleDetail tbody #${u.sld_id} td i.return`).remove();
            }
        }
    });

    settindSaleDetailTbl(sale[ix].sal_id);
    $('#SaleDetailModal').removeClass('overlay_hide');

    $('#tblSaleDetail tbody tr td i.return').on('click', function () {
        var rw = $(this).parents('tr');
        var qtySel = rw.attr('realQty');
        if (qtySel == undefined) {
            qtySel = rw.children('td.quantity').text('');
        }
        let H = `
            <div class="rtnprod_deep">
                <div class="rtnprod_frame">
                    <h1>DEVOLUCION</h1>
                    <label>Cantidad a devolver</label><br>
                    <input type="text" id="txtQuantity" dataqty="${qtySel}" value="${qtySel}"><span class="alertqty alerta"></span><br><br>
                    <label>Comentario</label>
                    <textarea id="txtComments">${rw.attr('sale').split('|')[2]}: </textarea>
                    <button class="bn btn-ok" id="comApply">Aceptar</button>
                    <button class="bn btn-cn" id="comCancel">Cancelar</button><br>
                    <input type="text" id="txtSale" style="width:100%" value="${rw.attr('sale')}">
                </div>
            </div>
        `;

        $('body').append(H);

        $('#comCancel').on('click', function () {
            $('.rtnprod_deep').remove();
        });

        $('#txtQuantity').on('keyup', function () {
            var qtyNew = $(this).val();
            var qtyAnt = $(this).attr('dataqty');
            if (qtyNew > qtyAnt) {
                $(this).val(qtyAnt);
            }
            $('.alertqty').html('');
        });

        $('#txtComments').on('focus', function () {
            $(this).attr('placeholder', '');
        });

        $('#comApply').on('click', function () {
            returnApply();
        });
    });

    $('#SaleDetailModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');
            $('#tblSaleDetail').DataTable().destroy();
        });
}

function setReturn(dt) {
    console.log(dt);
    var dat = $('#txtSale').val().split('|');
    var qty = $('#txtQuantity').val();
    var com = $('#txtComments').val();
    var qcr = $(`#tblSaleDetail #${dat[6]} td.quantity`).text();
    var qrl = qcr - qty;

    // $(`#tblSaleDetail #${dat[6]} td.quantity`).text(qrl);
    $('#tblSaleDetail tbody tr').remove();
    getSalesDetail(dt);

    $('#comCancel').trigger('click');
}

function returnApply() {
    var dat = $('#txtSale').val().split('|');
    var qty = $('#txtQuantity').val();
    var com = $('#txtComments').val();
    // folio = 100;
    if (folio == undefined) {
        var pagina = 'ProductsSalablesList/NextExchange';
        var par = '[{"par":""}]';
        var tipo = 'html';
        var selector = putNextExchangeNumber;
        fillField(pagina, par, tipo, selector);
    } else {
        if (qty > 0 && com != '') {
            let par = `
        [{
            "sldSku" : "${dat[1]}",
            "sldNme" : "${dat[2]}",
            "sldPrc" : "${dat[3]}",
            "saleId" : "${dat[0]}",
            "seriId" : "${dat[4]}",
            "projId" : "${dat[5]}",
            "sldtId" : "${dat[6]}",
            "sldQty" : "${qty}",
            "sldSit" : "DEVOLUCION",
            "sldsec" : "sales",
            "commen" : "${com}",
            "nfolio" : "${folio}",
            "storId" : "5"
        }]
        `;
            // console.log(par);
            var pagina = 'ProductsSalablesList/SaveReturn';
            var tipo = 'html';
            var selector = setReturn;
            fillField(pagina, par, tipo, selector);
        } else {
            if (qty < 1) $('.alertqty').html('la cantidad no puede ser menor a uno');
            if (com == '') $('#txtComments').attr('placeholder', 'Debes agregar el motivo de la devolución');
        }
    }
}

function putNextExchangeNumber(dt) {
    console.log(dt);
    folio = dt;
    returnApply();
}

function settindSaleDetailTbl(salId) {
    $('#tblSaleDetail').DataTable({
        destroy: true,
        order: [[6, 'asc']],
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
            {data: 'editable', class: 'edit', orderable: false},
            {data: 'saldtsku', class: 'sku'},
            {data: 'saldtnme', class: 'productName'},
            {data: 'saldtqty', class: 'quantity center'},
            {data: 'saldtprc', class: 'price'},
            {data: 'saldtamt', class: 'price'},
            {data: 'saldtdte', class: 'sku'},
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

function getComments(salId) {
    var pagina = 'ProductsSalablesList/getComments';
    var par = `[{"salId":"${salId}"}]`;
    var tipo = 'json';
    var selector = putComments;
    fillField(pagina, par, tipo, selector);
}

function putComments(dt) {
    //console.log(dt);
        $.each(dt, function (v, u) {
        var H = `
            <div class="commet_item">
                <div class="com_comment">${u.com_comment}</div>
                <div class="com_date">${u.com_date}</div>
                <div class="com_id">ID: ${u.com_id}</div>
                <div class="com_user">${u.com_user}</div>
            </div> `;

        $('.comments_area').append(H);
    });
}

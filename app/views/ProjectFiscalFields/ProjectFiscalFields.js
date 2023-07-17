let customerPercent = 0;
let customerFields = 6;
let selectedProject = 0;

$('document').ready(function () {
    url = getAbsolutePath();
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    settingTable();
}

function getCustomerFields(cusId) {
    var pagina = 'ProjectFiscalFields/getCustomerFields';
    var par = `[{"cusId":"${cusId}"}]`;
    var tipo = 'json';
    var selector = putCustomerFields;
    fillField(pagina, par, tipo, selector);
}
/** +++++  configura la table de proyectos */
function settingTable() {
    let title = 'Lista de proyectos';
    // $('#tblProjects').DataTable().destroy();
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    var tabla = $('#tblProjects').DataTable({
        order: [[6, 'desc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [50, 100, 200, 300, -1],
            [50, 100, 200, 300, 'Todos'],
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
        createdRow: function (nRow, aData, iDataIndex) {
            $(nRow).attr('id', aData['projecid']);
        },
        processing: true,
        serverSide: true,
        ajax: {url: 'ProjectFiscalFields/tableProjects', type: 'POST'},
        columns: [
            {data: 'smarlock', class: 'smarlock edit fsicon tr', orderable: false},
            {data: 'editable', class: 'editable edit alt tc', orderable: false},
            {data: 'custfill', class: 'custfill tr fw700', orderable: false},
            {data: 'projecid', class: 'projecid id hide'},
            {data: 'projnumb', class: 'projnumb tc'},
            {data: 'projname', class: 'projname product-name'},
            {data: 'custname', class: 'custname product-name'},
            {data: 'dateinit', class: 'dateinit date'},
            {data: 'datefnal', class: 'datefnal date'},
            {data: 'projloca', class: 'projloca product-name'},
        ],
    });

    $('.tblProjMaster')
        .delay(1000)
        .slideDown('fast', function () {
            deep_loading('C');
            activeIcons();
        });
}

function activeIcons() {
    $('.toggle-icon')
        .unbind('click')
        .on('click', function () {
            let toggleIcon = $(this);
            let pjtId = toggleIcon.attr('id');
            let status = toggleIcon.attr('class').indexOf('-on');
            let pjtStatus = 0;

            if (status >= 0) {
                toggleIcon.removeAttr('class').addClass('fas fa-toggle-off toggle-icon');
                toggleIcon.attr('title', 'Liberado');
                pjtStatus = 2;
            } else {
                toggleIcon.removeAttr('class').addClass('fas fa-toggle-on toggle-icon');
                toggleIcon.attr('title', 'bloqueado');
                pjtStatus = 5;
            }

        freeProject(pjtId, pjtStatus);
        });

    $('.kill')
        .unbind('click')
        .on('click', function () {
            let editIcon = $(this);
            let cusId = editIcon.attr('id');

            selectedProject = editIcon.parents('tr').attr('id');
            showCustomModal(cusId);
        });
}

function freeProject(pjtId, pjtStatus) {
    console.log(pjtId, pjtStatus);

    var pagina = 'ProjectFiscalFields/updateStatus';
    var par = `[{"pjtId":"${pjtId}","pjtStatus":"${pjtStatus}"}]`;
    var tipo = 'html';
    var selector = putUpdateProjects;
    fillField(pagina, par, tipo, selector);
}

function putUpdateProjects(dt) {
    console.log(dt);
}

function showCustomModal(cusId) {
    // console.log(cusId);
    $('#CustomerModal').removeClass('overlay_hide');

    $('#CustomerModal .btn_close')
        .unbind('click')
        .on('click', function () {
            $('.overlay_background').addClass('overlay_hide');

            let cusPerc = $('#txtCustomerPercent').val();
            let cusname = $('#txtCustomerName').val();

            console.log(selectedProject);

            $(`#${selectedProject} td.custname`).html(cusname);
            let cusSpan = '';
            switch (true) {
                case cusPerc <= 16:
                    cusSpan = 'rng1';
                    break;
                case cusPerc > 16 && cusPerc <= 33:
                    cusSpan = 'rng2';
                    break;
                case cusPerc > 33 && cusPerc <= 50:
                    cusSpan = 'rng3';
                    break;
                case cusPerc > 50 && cusPerc <= 66:
                    cusSpan = 'rng4';
                    break;
                case cusPerc > 66 && cusPerc <= 90:
                    cusSpan = 'rng5';
                    break;
                default:
                    cusSpan = 'rng6';
                    break;
            }
            var cusEditable = '';
            $(`#${selectedProject} td.custfill`).html(`<span class="rng ${cusSpan}">${cusPerc}%</span>`);
            if (cusPerc < 100) {
                cusEditable = `<i class="fas fa-address-card kill" id="${cusId}"></i>`;
            }
            $(`#${selectedProject} td.editable`).html(cusEditable);
            activeIcons();
        });

    getCustomerFields(cusId);
}

function putCustomerFields(dt) {
    let cusId = dt[0].cus_id;

    $('#customerName').html(dt[0].cus_name);
    $('#customerAddress').html(dt[0].cus_address);
    $('#customerEmail').html(dt[0].cus_email);
    $('#customerRFC').html(dt[0].cus_rfc);
    $('#customerPhone').html(dt[0].cus_phone);
    $('#customerRepresentative').html(dt[0].cus_legal_representative);
    $('#customerContact').html(dt[0].cus_contact);
    $('#customerType').html(dt[0].cut_name);

    $('#txtCustomerName').val(dt[0].cus_name);
    $('#txtCustomerAddress').val(dt[0].cus_address);
    $('#txtCustomerEmail').val(dt[0].cus_email);
    $('#txtCustomerRFC').val(dt[0].cus_rfc);
    $('#txtCustomerPhone').val(dt[0].cus_phone);
    $('#txtCustomerRepresentative').val(dt[0].cus_legal_representative);
    $('#txtCustomerId').val(dt[0].cus_id);
    $('#txtCustomerPercent').val(dt[0].cus_fill);

    dt[0].cus_name == '' || dt[0].cus_name == null ? $('#fraCustomerName').show() : $('#fraCustomerName').hide();
    dt[0].cus_address == '' || dt[0].cus_address == null ? $('#fraCustomerAddress').show() : $('#fraCustomerAddress').hide();
    dt[0].cus_email == '' || dt[0].cus_email == null ? $('#fraCustomerEmail').show() : $('#fraCustomerEmail').hide();
    dt[0].cus_rfc == '' || dt[0].cus_rfc == null ? $('#fraCustomerRFC').show() : $('#fraCustomerRFC').hide();
    dt[0].cus_phone == '' || dt[0].cus_phone == null ? $('#fraCustomerPhone').show() : $('#fraCustomerPhone').hide();
    dt[0].cus_legal_representative == 0 || dt[0].cus_legal_representative == null ? $('#fraCustomerRepresentative').show() : $('#fraCustomerRepresentative').hide();

    $('#customerFieldPrecent').html(counterField());

    $('#btnCustomerApply').on('click', function () {
        let cusName = $('#txtCustomerName').val();
        let cusAddress = $('#txtCustomerAddress').val();
        let cusEmail = $('#txtCustomerEmail').val();
        let cusRFC = $('#txtCustomerRFC').val();
        let cusPhone = $('#txtCustomerPhone').val();
        let cusLegalRep = $('#txtCustomerRepresentative').val();

        let par = `[{
            "cusId"         :   "${cusId}",
            "cusName"       :   "${cusName}",
            "cusAddress"    :   "${cusAddress}",
            "cusEmail"      :   "${cusEmail}",
            "cusRFC"        :   "${cusRFC}",
            "cusPhone"      :   "${cusPhone}",
            "cusLegalRep"   :   "${cusLegalRep}"
        }]`;
        var pagina = 'ProjectFiscalFields/updateInfoCustomer';
        var tipo = 'html';
        var selector = putInfoCustomer;
        fillField(pagina, par, tipo, selector);
    });

    $('.textbox-required').on('blur', function () {
        $('#customerFieldPrecent').html(counterField());
    });
}

function counterField() {
    let countInputsEmpty = 0;
    $('.textbox-required').each(function () {
        var field = $(this).val();
        if (field == '' || field == null || field == 0) countInputsEmpty++;
    });
    let customerPercent = parseInt((1 - countInputsEmpty / customerFields) * 100);
    return customerPercent;
}

function putInfoCustomer(dt) {
    getCustomerFields(dt);
}

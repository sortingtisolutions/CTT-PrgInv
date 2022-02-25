var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});


function inicial() {
   getProveedoresTable();
   getTipoProveedor();
   //Open modal *
   $('#nuevoProveedor').on('click', function () {
      LimpiaModal();
      $('#formProveedor').removeClass('was-validated');
   });

   //Guardar y salva Usuario *
   $('#GuardarUsuario').on('click', function () {
      if (validaFormulario() == 1) {
         SaveProveedores();
      }
   });
   //borra Usuario +
   $('#BorrarProveedor').on('click', function () {
      DeleteProveedor();
   });

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
      getTipoProveedor();
   });

   $('#ProveedoresTable tbody').on('click', 'tr', function () {
      positionRow = table.page.info().page * table.page.info().length + $(this).index();

      setTimeout(() => {
         RenglonesSelection = table.rows({selected: true}).count();
         if (RenglonesSelection == 0 || RenglonesSelection == 1) {
            $('.btn-apply').addClass('hidden-field');
         } else {
            $('.btn-apply').removeClass('hidden-field');
         }
      }, 10);
   });
}

//Valida los campos seleccionado *
function validaFormulario() {
   var valor = 1;
   var forms = document.querySelectorAll('.needs-validation');
   Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
         form.classList.add('was-validated');
         valor = 0;
      }
   });
   return valor;
}

function getProjects(word, dstr, dend) {
   var pagina = 'ProjectList/GetProveedores';
   var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
   var tipo = 'json';
   var selector = put_products;
   //caching_events('get_products');
   fillField(pagina, par, tipo, selector);
}

function getProveedoresTable() {
   var location = 'ProjectList/GetProveedores';
   $('#ProveedoresTable').DataTable().destroy();
   $('#tablaProveedoresRow').html('');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         //console.log(respuesta);
         var renglon = '';
         console.log('R-',respuesta);
         respuesta.forEach(function (row, index) {

            if(row.pjt_id != 0){
            renglon =
               '<tr>' +
               '<td class="text-center edit"> ' +
               '<button onclick="EditProveedores(' +
               row.pjt_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
               /* '<button onclick="ConfirmDeletProveedor(' +
               row.pjt_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' + */
               '</td>' +
               "<td class='dtr-control text-center' hidden>" +
               row.pjt_id +
               '</td>' +
               '<td>' +
               row.pjt_name +
               '</td>' +

               '<td hidden> ' +
               row.sut_id +
               '</td>' +

               '<td>' +
               row.pjt_number +
               '</td>' +

               '<td>' +
               row.pjttp_name +
               '</td>' +
               '<td>' +
               row.cus_name +
               '</td>' +
               '<td>' +
               row.pjt_location +
               '</td>' +
               '<td>' +
               row.pjs_name +
               '</td>' +
               '</tr>';
            }
            $('#tablaProveedoresRow').append(renglon);
         });

         let title = 'Proveedores';
         let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#ProveedoresTable').DataTable({
            order: [[1, 'asc']],
            select: {
               style: 'multi',
               info: false,
            },
            lengthMenu: [
               [50, 100, -1],
               ['50','100', 'Todo'],
            ],
            dom: 'Blfrtip',
            buttons: [
               {
                  extend: 'excel',
                  footer: true,
                  title: title,
                  filename: filename,
                  //   className: 'btnDatableAdd',
                  text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
               },
               {
                  extend: 'pdf',
                  footer: true,
                  title: title,
                  filename: filename,
                  //   className: 'btnDatableAdd',
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
               {
                  text: 'Borrar seleccionados',
                  className: 'btn-apply hidden-field',
                  action: function () {
                     var selected = table.rows({selected: true}).data();
                     var idSelected = '';
                     selected.each(function (index) {
                        idSelected += index[1] + ',';
                     });
                     idSelected = idSelected.slice(0, -1);
                     if (idSelected != '') {
                        ConfirmDeletProveedor(idSelected);
                     }
                  },
               },
            ],
            // columnDefs: [
            //    { responsivePriority: 1, targets: 0 },
            //    { responsivePriority: 2, targets: -1 },
            // ],
            scrollY: 'calc(100vh - 260px)',
            scrollX: true,
            // scrollCollapse: true,
            paging: true,
            pagingType: 'simple_numbers',
            fixedHeader: true,
            language: {
               url: './app/assets/lib/dataTable/spanish.json',
            },
         });
      },
      get success() {
         return this._success;
      },
      set success(value) {
         this._success = value;
      },
      error: function () {},
   }).done(function () {});
}



//Edita el Proveedores *
function EditProveedores(id) {
   UnSelectRowTable();
   LimpiaModal();
   $('#titulo').text('Editar Proveedor');

   var location = 'Proveedores/GetProveedor';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         //console.log(respuesta);
         $('#NomProveedor').val(respuesta.sup_business_name);
         $('#RfcProveedor').val(respuesta.sup_rfc);
         $('#EmpIdProveedor').val(respuesta.emp_id);
         $('#IdProveedor').val(respuesta.sup_id);
         $('#ContactoProveedor').val(respuesta.sup_contact);
         $('#EmailProveedor').val(respuesta.sup_email);
         $('#PhoneProveedor').val(respuesta.sup_phone);

         getTipoProveedor(respuesta.sut_id);

         //$('#ProveedorModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//confirm para borrar **
function ConfirmDeletProveedor(id) {
   $('#BorrarProveedorModal').modal('show');
   $('#IdProveedorBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}
//BORRAR DATOS DEL PROVEEDOR * *
function DeleteProveedor() {
   var location = 'Proveedores/DeleteProveedores';
   IdProveedor = $('#IdProveedorBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdProveedor: IdProveedor,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            var arrayObJ = IdProveedor.split(',');
            if (arrayObJ.length == 1) {
               table
                  .row(':eq(' + positionRow + ')')
                  .remove()
                  .draw();
            } else {
               table.rows({selected: true}).remove().draw();
            }
            $('#BorrarProveedorModal').modal('hide');
         }
         LimpiaModal();
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Proveedores **
function SaveProveedores() {
   var location = 'Proveedores/SaveProveedores';
   var IdProveedor = $('#IdProveedor').val();
   var NomProveedor = $('#NomProveedor').val();
   var ContactoProveedor = $('#ContactoProveedor').val();
   var RfcProveedor = $('#RfcProveedor').val();
   var EmailProveedor = $('#EmailProveedor').val();
   var PhoneProveedor = $('#PhoneProveedor').val();


   var tipoProveedorId = $('#selectRowTipoProveedor option:selected').attr('id');
   var tipoProveedorName = $('#selectRowTipoProveedor option:selected').text();

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdProveedor: IdProveedor,
         NomProveedor: NomProveedor,
         ContactoProveedor: ContactoProveedor,
         RfcProveedor: RfcProveedor,
         EmailProveedor: EmailProveedor,
         PhoneProveedor: PhoneProveedor,
         tipoProveedorId: tipoProveedorId
      },
      url: location,
      success: function (respuesta) {
         if (IdProveedor != '') {
            table
               .row(':eq(' + positionRow + ')')
               .remove()
               .draw();
         }
         if (respuesta != 0) {
            //getAlmacenesTable();
            var rowNode = table.row
               .add({
                  [0]:
                     '<button onclick="EditProveedores(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletProveedor(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: respuesta,
                  [2]: NomProveedor,
                  [3]: tipoProveedorId,
                  [4]: tipoProveedorName,
                  [5]: ContactoProveedor,
                  [6]: RfcProveedor,
                  [7]: EmailProveedor,
                  [8]: PhoneProveedor,
               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            $(rowNode).find('td').eq(1).addClass('text-center');
            $(rowNode).find('td').eq(1).attr("hidden",true);
            $(rowNode).find('td').eq(3).attr("hidden",true);

            LimpiaModal();
            getTipoProveedor();
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
   $('#NomProveedor').val('');
   $('#RfcProveedor').val('');
   $('#EmpIdProveedor').val('');
   $('#IdProveedor').val('');
   $('#ContactoProveedor').val('');
   $('#EmailProveedor').val('');
   $('#PhoneProveedor').val('');
   $('#titulo').text('Nuevo Proveedor');
   $('#formProveedor').removeClass('was-validated');
}


// Optiene los usuarios disponibles para encargados *
function getTipoProveedor(id) {
   $('#selectRowTipoProveedor').html("");
   var location = 'Proveedores/GetTipoProveedores';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.sut_id + '  value="' + row.sut_id + '">' + row.sut_name + '</option> ';
         });
         $('#selectRowTipoProveedor').append(renglon);
         if (id != undefined) {
            $("#selectRowTipoProveedor option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}
let customerPercent = 0;
let customerFields = 6;
let selectedProject = 0;

$('document').ready(function () {
    url = getAbsolutePath();
    if (verifica_usuario()) {
        inicial();
    }
});

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
    console.log(cusId);
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

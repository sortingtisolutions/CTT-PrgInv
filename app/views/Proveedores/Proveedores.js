var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});
//INICIO DE PROCESOS
function inicial() {
   getProveedoresTable();
   getTipoProveedor();
   getOptionYesNo(0);

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
      getOptionYesNo();
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

//OBTIENE LA LISTA DE LOS PROVEEDORES PARA MOSTRAR EN TABLE
function getProveedoresTable() {
   var location = 'Proveedores/GetProveedores';
   $('#ProveedoresTable').DataTable().destroy();
   $('#tablaProveedoresRow').html('');
   console.log('OTIENE PROVEEDORES');
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         //console.log(respuesta);
         var renglon = '';
         respuesta.forEach(function (row, index) {

            if(row.sup_id != 0){
            renglon =
               '<tr>' +
               '<td class="text-center edit"> ' +
               '<button onclick="EditProveedores(' +
               row.sup_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
               '<button onclick="ConfirmDeletProveedor(' + row.sup_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +
               "<td class='dtr-control text-center' hidden>" + row.sup_id + '</td>' +
               '<td>' + row.sup_business_name + '</td>' +
               '<td>' + row.sup_trade_name + '</td>' +
               '<td hidden> ' + row.sut_id + '</td>' +

               '<td>' + row.sup_contact + '</td>' +
               '<td>' + row.sup_rfc + '</td>' +
               '<td>' + row.sup_proof_tax_situation + '</td>' +   
               '<td>' + row.sup_email + '</td>' +
               '<td>' + row.sup_phone + '</td>' +
               '<td>' + row.sup_phone_extension + '</td>' +
               '<td class="sku">' + row.sut_id + '</td>' +
               '<td class="sku">' + row.sup_money_advance + '</td>' +
               '<td class="sku">' + row.sup_advance_amount + '</td>' +
               '<td>' + row.sup_id_international_supplier + '</td>' +
               '<td>' + row.sup_description_id_is + '</td>' +
               '<td>' + row.sup_credit + '</td>' +
               '<td>' + row.sup_credit_days + '</td>' +
               '<td class="sku">' + row.sup_balance + '</td>' +
               '<td>' + row.sup_way_pay + '</td>' +
               '<td>' + row.sup_bank + '</td>' +
               '<td>' + row.sup_clabe + '</td>' +
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
               [100, 200, -1],
               ['100','200', 'Todo'],
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


// Obtiene el tipo de proveedor disponibles para encargados *
function getTipoProveedor(id) {
   $('#selectRowTipoProveedor').html("");
   var location = 'Proveedores/GetTipoProveedores';
   console.log('OBTIENE TIPO PROVEEDOR');
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
         console.log(respuesta);
         $('#NomProveedor').val(respuesta.sup_business_name);
         $('#NomComercial').val(respuesta.sup_trade_name);
         $('#ContactoProveedor').val(respuesta.sup_contact);
         $('#RfcProveedor').val(respuesta.sup_rfc);
         $('#EmailProveedor').val(respuesta.sup_email);
         $('#PhoneProveedor').val(respuesta.sup_phone);
         $('#PhoneAdicional').val(respuesta.sup_phone_extension);
         $('#MontoAnticipo').val(respuesta.sup_advance_amount);
         $('#ProveInternacional').val(respuesta.sup_id_international_supplier);
         $('#DatoDescripcion').val(respuesta.sup_description_id_is);
         $('#DiasCredito').val(respuesta.sup_credit_days);
         $('#MontoCredito').val(respuesta.sup_balance);
         $('#DatoBanco').val(respuesta.sup_bank);
         $('#DatoClabe').val(respuesta.sup_clabe);
      
         $('#EmpIdProveedor').val(respuesta.emp_id);
         $('#IdProveedor').val(respuesta.sup_id);
        
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

function SaveProveedores() {

   var IdProveedor = $('#IdProveedor').val();

   var NomProveedor = $('#NomProveedor').val().toUpperCase();
   var NomComercial = $('#NomComercial').val().toUpperCase();
   var ContactoProveedor = $('#ContactoProveedor').val().toUpperCase();
   var RfcProveedor = $('#RfcProveedor').val().toUpperCase();
   var selectConstancia = $('#selectConstancia option:selected').text();

   var EmailProveedor = $('#EmailProveedor').val();
   var PhoneProveedor = $('#PhoneProveedor').val();
   var PhoneAdicional = $('#PhoneAdicional').val();
   var tipoProveedorId = $('#selectRowTipoProveedor option:selected').attr('id');
   var tipoProveedorName = $('#selectRowTipoProveedor option:selected').text();

   var selectAnticipo = $('#selectAnticipo option:selected').text();
   var MontoAnticipo = $('#MontoAnticipo').val();
   var ProveInternacional = $('#ProveInternacional').val();
   var DatoDescripcion = $('#DatoDescripcion').val();

   var selectCredito = $('#selectCredito option:selected').text();
   var DiasCredito = $('#DiasCredito').val();
   var MontoCredito = $('#MontoCredito').val();
   var selectFormaPago = $('#selectFormaPago option:selected').text();
   var DatoBanco = $('#DatoBanco').val();
   var DatoClabe = $('#DatoClabe').val();
   var par = `
       [{
           "IdProveedor" :       "${IdProveedor}",
           "NomProveedor" :      "${NomProveedor}",
           "NomComercial" :      "${NomComercial}",
           "ContactoProveedor" : "${ContactoProveedor}",
           "RfcProveedor" :      "${RfcProveedor}",
           "selectConstancia" :  "${selectConstancia}",
           "EmailProveedor"   :  "${EmailProveedor}",
           "PhoneProveedor" :    "${PhoneProveedor}",
           "PhoneAdicional" :    "${PhoneAdicional}",
           "tipoProveedorId" :   "${tipoProveedorId}",
           "selectAnticipo" :    "${selectAnticipo}",
           "MontoAnticipo" :     "${MontoAnticipo}",
           "ProveInternacional" : "${ProveInternacional}",
           "DatoDescripcion" :   "${DatoDescripcion}",
           "selectCredito" :     "${selectCredito}",
           "DiasCredito" :       "${DiasCredito}",
           "MontoCredito" :      "${MontoCredito}",
           "selectFormaPago" :   "${selectFormaPago}",
           "DatoBanco"   :       "${DatoBanco}",
           "DatoClabe"   :       "${DatoClabe}"
       }]`;
   console.log(par);
   var pagina = 'Proveedores/SaveProveedores';
   var tipo = 'html';
   var selector = putSaveProveedor;
   fillField(pagina, par, tipo, selector);
}

function putSaveProveedor(){
   //console.log('Put SaveNew');
   LimpiaModal();
   getProveedoresTable();
   getTipoProveedor();
   getOptionYesNo();

}

//Guardar Proveedores **
function SaveProveedores_old() {
   var location = 'Proveedores/SaveProveedores';

   var IdProveedor = $('#IdProveedor').val();

   var NomProveedor = $('#NomProveedor').val().toUpperCase();
   var NomComercial = $('#NomComercial').val().toUpperCase();
   var ContactoProveedor = $('#ContactoProveedor').val().toUpperCase();
   var RfcProveedor = $('#RfcProveedor').val().toUpperCase();
   var selectConstancia = $('#selectConstancia option:selected').text();
   var EmailProveedor = $('#EmailProveedor').val();
   var PhoneProveedor = $('#PhoneProveedor').val();
   var PhoneAdicional = $('#PhoneAdicional').val();
   var tipoProveedorId = $('#selectRowTipoProveedor option:selected').attr('id');
   var tipoProveedorName = $('#selectRowTipoProveedor option:selected').text();
   var selectAnticipo = $('#selectAnticipo option:selected').text();
   var MontoAnticipo = $('#MontoAnticipo').val();
   var ProveInternacional = $('#ProveInternacional').val();
   var DatoDescripcion = $('#DatoDescripcion').val();
   var selectCredito = $('#selectCredito option:selected').text();
   var DiasCredito = $('#DiasCredito').val();
   var MontoCredito = $('#MontoCredito').val();
   var selectFormaPago = $('#selectFormaPago option:selected').text();
   var DatoBanco = $('#DatoBanco').val();
   var DatoClabe = $('#DatoClabe').val();

   console.log(PhoneAdicional);
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdProveedor:      IdProveedor,
         NomProveedor:     NomProveedor,
         NomComercial:     NomComercial,
         ContactoProveedor: ContactoProveedor,
         RfcProveedor:     RfcProveedor,
         selectConstancia: selectConstancia,
         EmailProveedor:   EmailProveedor,
         PhoneProveedor:   PhoneProveedor,
         PhoneAdicional:   PhoneAdicional,
         tipoProveedorId:  tipoProveedorId,
         selectAnticipo:   selectAnticipo,
         MontoAnticipo:    MontoAnticipo,
         ProveInternacional: ProveInternacional,
         DatoDescripcion:  DatoDescripcion,
         selectCredito:    selectCredito,
         DiasCredito:      DiasCredito,
         MontoCredito:     MontoCredito,
         selectFormaPago: selectFormaPago,
         DatoBanco:        DatoBanco,
         DatoClabe:        DatoClabe
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
           /*  var rowNode = table.row
               .add({
                  [0]:
                     '<button onclick="EditProveedores(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletProveedor(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: IdProveedor,
                  [2]: NomProveedor,
                  [3]: NomComercial,
                  [4]: ContactoProveedor,
                  [5]: RfcProveedor,
                  [6]: selectConstancia,
                  [7]: EmailProveedor,
                  [8]: PhoneProveedor,
                  [9]: PhoneAdicional,
                  [10]: tipoProveedorId,
                  [11]: selectAnticipo,
                  [12]: MontoAnticipo,
                  [13]: ProveInternacional,
                  [14]: DatoDescripcion,
                  [15]: selectCredito,
                  [16]: DiasCredito,
                  [17]: MontoCredito,
                  [18]: selectFormaPago,
                  [19]: DatoBanco,
                  [20]: DatoClabe,
               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            $(rowNode).find('td').eq(1).addClass('text-center');
            $(rowNode).find('td').eq(1).attr("hidden",true);
            $(rowNode).find('td').eq(3).attr("hidden",true);
 */
            LimpiaModal();
            getProveedoresTable();
            getTipoProveedor();
            getOptionYesNo();
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});

   console.log('FIN SAVE');
}

//Limpia datos en modal  **
function LimpiaModal() {
   console.log('LIMPIANDO');
   $('#NomProveedor').val('');
   $('#NomComercial').val('');
   $('#ContactoProveedor').val('');
   $('#RfcProveedor').val('');

   $('#EmailProveedor').val('');
   $('#PhoneProveedor').val('');
   $('#PhoneAdicional').val('');

   $('#MontoAnticipo').val('');
   $('#ProveInternacional').val('');
   $('#DatoDescripcion').val('');
   $('#DiasCredito').val('');
   $('#MontoCredito').val('');

   $('#DatoBanco').val('');
   $('#DatoClabe').val('');
   $('#EmpIdProveedor').val('');
   $('#IdProveedor').val('');
   /* $('#PhoneProveedor').val(''); */
   $('#titulo').text('Nuevo Proveedor');
   $('#formProveedor').removeClass('was-validated');
   console.log('TERMINANDO');
}


function getOptionYesNo(id) {
   $('#selectConstancia').html("");
   renglon = "<option id='2'  value=''></option> ";
   $('#selectConstancia').append(renglon);
   renglon = "<option id='1'  value='Si'>Si</option> ";
   $('#selectConstancia').append(renglon);
   renglon = "<option id='0'  value='No'>No</option> ";
   $('#selectConstancia').append(renglon);

   $('#selectAnticipo').html("");
   renglon = "<option id='2'  value=''></option> ";
   $('#selectAnticipo').append(renglon);
   renglon = "<option id='1'  value='Si'>Si</option> ";
   $('#selectAnticipo').append(renglon);
   renglon = "<option id='0'  value='No'>No</option> ";
   $('#selectAnticipo').append(renglon);

   $('#selectCredito').html("");
   renglon = "<option id='2'  value=''></option> ";
   $('#selectCredito').append(renglon);
   renglon = "<option id='1'  value='Si'>Si</option> ";
   $('#selectCredito').append(renglon);
   renglon = "<option id='0'  value='No'>No</option> ";
   $('#selectCredito').append(renglon);

   $('#selectFormaPago').html("");
   renglon = "<option id='2'  value=''></option> ";
   $('#selectFormaPago').append(renglon);
   renglon = "<option id='1'  value='Si'>Si</option> ";
   $('#selectFormaPago').append(renglon);
   renglon = "<option id='0'  value='No'>No</option> ";
   $('#selectFormaPago').append(renglon);
}
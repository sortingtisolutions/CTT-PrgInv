var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getAlmacenesTable();
   getEncargadoAlmacen();
   
   //Open modal *
   $('#nuevoAlmacen').on('click', function () {
      LimpiaModal();
   });
   //Guardar almacen *
   $('#GuardarAlmacen').on('click', function () {
      if (validaFormulario() == 1) {
         SaveAlmacen();
      }
   });
   //borra almacen +
   $('#BorrarProveedor').on('click', function () {
      DeletAlmacen();
   });

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });

   $('#AlmacenesTable tbody').on('click', 'tr', function () {
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

function getSeries(strId) {
   var pagina = 'Almacenes/listSeries';
   var par = `[{"strId":"${strId}"}]`;
   var tipo = 'json';
   var selector = putSeries;
   fillField(pagina, par, tipo, selector);
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

//Edita el Proveedores *
function EditAlmacen(id) {
   UnSelectRowTable();
   LimpiaModal();
   $('#titulo').text('Editar almacen');

   var location = 'Almacenes/GetAlmacen';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         $('#IdAlmacen').val(respuesta.str_id);
         $('#NomAlmacen').val(respuesta.str_name);
         $('#selectTipoAlmacen').val(respuesta.str_type);
         getEncargadoAlmacen(respuesta.emp_id); 
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletAlmacen(id) {
   //UnSelectRowTable();
   $('#BorrarAlmacenModal').modal('show');
   $('#IdAlmacenBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

//BORRAR  * *
function DeletAlmacen() {
   var location = 'Almacenes/DeleteAlmacen';
   IdAlmacen = $('#IdAlmacenBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdAlmacen: IdAlmacen,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            var arrayAlmacen = IdAlmacen.split(',');
            if (arrayAlmacen.length == 1) {
               table
                  .row(':eq(' + positionRow + ')')
                  .remove()
                  .draw();
            } else {
               table.rows({selected: true}).remove().draw();
            }
            $('#BorrarAlmacenModal').modal('hide');
         }
         LimpiaModal();
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Almacen **
function SaveAlmacen() {
   var location = 'Almacenes/SaveAlmacen';
   var IdAlmacen = $('#IdAlmacen').val();
   var NomAlmacen = $('#NomAlmacen').val();
   var tipoAlmacen = $('#selectTipoAlmacen option:selected').attr('id');
   var EncargadoAlmacen = $('#selectRowEncargado option:selected').attr('id');
   var Encargado = $('#selectRowEncargado option:selected').text();


   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdAlmacen: IdAlmacen,
         NomAlmacen: NomAlmacen,
         tipoAlmacen: tipoAlmacen,
         EncargadoAlmacen: EncargadoAlmacen
      },
      url: location,
      success: function (respuesta) {
         if (IdAlmacen != '') {
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
                     '<button onclick="EditAlmacen(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletAlmacen(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: respuesta,
                  [2]: NomAlmacen,
                  [3]: Encargado,
                  [4]: EncargadoAlmacen,
                  [5]: tipoAlmacen,
               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            $(rowNode).find('td').eq(1).addClass('text-center');
            $(rowNode).find('td').eq(4).attr("hidden",true);
            LimpiaModal();
         }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Limpia datos en modal  **
function LimpiaModal() {
   $('#titulo').text('Nuevo Almacen');
   $('#NomAlmacen').val('');
   $('#IdAlmacen').val('');
   $('#selectTipoAlmacen').val('0');
   getEncargadoAlmacen();
   $('#formProveedor').removeClass('was-validated');
}

//obtiene la informacion de tabla Proveedores *
function getAlmacenesTable() {
   var location = 'Almacenes/GetAlmacenes';
   $('#AlmacenesTable').DataTable().destroy();
   $('#tablaAlmacenesRow').html('');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         var renglon = '';
         respuesta.forEach(function (row, index) {
            renglon =
               '<tr id=" ' + row.str_id + '">' +
               '<td class="text-center edit"> ' +
               '<button onclick="EditAlmacen(' +
               row.str_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
               '<button onclick="ConfirmDeletAlmacen(' +
               row.str_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
               '</td>' +
               "<td class='dtr-control text-center'>" +
               row.str_id +
               '</td>' +
               '<td>' +
               row.str_name +
               '</td>' +
               '<td>' +
               row.emp_fullname +
               '</td>' +
               '<td hidden>' +
               row.emp_id +
               '</td>' +
               
               '<td>' +
               row.str_type +
               '</td>' +
               // se agrego campo de cantidad
               '<td class="quantity text-left data-content=" ' + row.cantidad + '"><span class="toLink">' +
               row.cantidad +
               '</span></td>' +
               '</tr>';
            $('#tablaAlmacenesRow').append(renglon);
         });
         activeIcons();

         let title = 'Almacenes';
         let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#AlmacenesTable').DataTable({
            order: [[1, 'asc']],
            select: {
               style: 'multi',
               info: false,
            },
            lengthMenu: [
               [25, 50, 100, -1],
               ['25', '50', 'Todo'],
            ],
            dom: 'Blfrtip',
            buttons: [
               {
                  extend: 'pdf',
                  footer: true,
                  title: title,
                  filename: filename,
                  //   className: 'btnDatableAdd',
                  text: '<button class="btn btn-pdf"><i class="fas fa-file-pdf"></i></button>',
               },
               {
                  extend: 'excel',
                  footer: true,
                  title: title,
                  filename: filename,
                  //   className: 'btnDatableAdd',
                  text: '<button class="btn btn-excel"><i class="fas fa-file-excel"></i></button>',
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
                        ConfirmDeletAlmacen(idSelected);
                     }
                  },
               },
            ],
            // columnDefs: [
            //    { responsivePriority: 1, targets: 0 },
            //    { responsivePriority: 2, targets: -1 },
            // ],
            scrollY: 'calc(100vh - 280px)',
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

// Optiene los usuarios disponibles para encargados *
function getEncargadoAlmacen(id) {
   $('#selectRowEncargado').html("");
   var location = 'Almacenes/GetEncargadosAlmacen';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.emp_id + '  value="' + row.emp_id + '">' + row.emp_fullname + '</option> ';
         });
         $('#selectRowEncargado').append(renglon);
         if (id != undefined) {
            $("#selectRowEncargado option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}
//agregado para mostrar datos en el modal
function activeIcons() {
   console.log('Se Activo el Boton');
   $('.toLink')
       .unbind('click')
       .on('click', function () {
           let prd = $(this).parents('tr').attr('id');
         /* let qty = $(this).parent('td').attr('data-content');*/
          /*let prd = 15;*/
          let qty = 1;
           console.log('Se TOCO el Boton', qty );
           if (qty > 0) {
               console.log('Se TOCO el Boton y valido');
               getSeries(prd);
           }
       });
} 

function putSeries(dt) {
   console.log('Llenando datos en modal');
   $('#ExisteStrModal').removeClass('overlay_hide');
   $('#tblStrSerie').DataTable({
       destroy: true,
       order: [[1, 'desc']],
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
           {data: 'produsku', class: 'sku'},
           {data: 'serlnumb', class: 'product-name'},
           {data: 'dateregs', class: 'sku'},
           {data: 'sercost', class: 'quantity'},
           {data: 'cvstatus', class: 'code-type_s'},
           {data: 'cvestage', class: 'code-type_s'},
           {data: 'serstatus', class: 'quantity'},
           {data: 'serstore', class: 'catalog'},
           {data: 'comments', class: 'comments'},
       ],
   });

   $('#ExisteStrModal .btn_close')
       .unbind('click')
       .on('click', function () {
           $('.overlay_background').addClass('overlay_hide');
       });

   build_modal_serie(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_serie(dt) {
   let tabla = $('#tblStrSerie').DataTable();
   $('.overlay_closer .title').html(`${dt[0].prd_sku} - ${dt[0].prd_name}`);
   tabla.rows().remove().draw();
   $.each(dt, function (v, u) {
       
       tabla.row
           .add({
            //   sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i><i class="fas fa-times-circle serie kill" id="K${u.ser_id}"></i>`,
               sermodif: `<i></i>`,
               produsku: `${u.ser_sku.slice(0, 7)}-${u.ser_sku.slice(7, 11)}`,
               serlnumb: u.ser_serial_number,
               dateregs: u.ser_date_registry,
               sercost: u.ser_cost,
               cvstatus: u.ser_situation,
               cvestage: u.ser_stage,
               serstatus: u.ser_status,
               serstore: u.ser_serial_number,
               comments: u.ser_comments,
           })
           .draw();
       $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.prd_id);
   });
}

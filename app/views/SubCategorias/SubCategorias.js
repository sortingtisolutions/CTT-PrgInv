var table = null;
var positionRow = 0;
var sbcatnme;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   
   $('.deep_loading').css({display: 'flex'});

   getSubCategoriasTable('0');
   getCategorias();
   ListSubCategorias();

   //Open modal *
   $('#nuevaSubCategoria').on('click', function () {
      LimpiaModal();
      getCategorias('');
      ListSubCategorias();
   });
   //Guardar almacen *
   $('#GuardarCategoria').on('click', function () {
      if (validaFormulario() == 1) {
         SaveSubCategoria();
      }
   });
   //borra almacen +
   $('#BorrarSubCategorias').on('click', function () {
      DeletSubCategoria();
   });

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
   });
   
   $('#SubCategoriasTable tbody').on('click', 'tr', function () {
      positionRow = table.page.info().page * table.page.info().length + $(this).index();

      setTimeout(() => {
         RenglonesSelection = table.rows({selected: true}).count();
         if (RenglonesSelection == 0 || RenglonesSelection == 1) {
            $('.btn-apply').css('visibility', 'hidden');
         } else {
            $('.btn-apply').css('visibility', 'visible');
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

function getCategorias(sbcId) {
   var pagina = 'SubCategorias/GetCategorias';
   var par = `[{"sbcId":"${sbcId}"}]`;
   var tipo = 'json';
   var selector = LlenaCategorias;
   fillField(pagina, par, tipo, selector);
}

function ListSubCategorias(sbcId) {
   console.log('GETSUBCATEGORIAS');
   var pagina = 'SubCategorias/ListSubCategorias';
   var par = `[{"sbcId":"${sbcId}"}]`;
   var tipo = 'json';
   var selector = LlenaSubCategorias;
   fillField(pagina, par, tipo, selector);
}

function getSeries(sbcId) {
   var pagina = 'SubCategorias/listSeries';
   var par = `[{"sbcId":"${sbcId}"}]`;
   var tipo = 'json';
   var selector = putSeries;
   fillField(pagina, par, tipo, selector);
}

//Edita el Proveedores *
function EditSubCategoria(id, idCategoria) {
   console.log('NO debo entrar');
   UnSelectRowTable();
   LimpiaModal();
   $('#titulo').text('Editar Subcategoria');

   var location = 'SubCategorias/GetSubCategoria';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         $('#NomSubCategoria').val(respuesta.sbc_name);
         $('#IdSubCategoria').val(respuesta.sbc_id);
         $('#CodSubCategoria').val(respuesta.sbc_code);
         getCategorias(idCategoria);

         $('#SubCategoriaModal').modal('show');
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}
//confirm para borrar **
function ConfirmDeletSubCategoria(id) {
   //UnSelectRowTable();
   $('#BorrarSubCategoriaModal').modal('show');
   $('#IdSubCategoriaBorrar').val(id);
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}

//BORRAR  * *
function DeletSubCategoria() {
   var location = 'SubCategorias/DeleteSubCategoria';
   IdSubCategoria = $('#IdSubCategoriaBorrar').val();
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {
         IdSubCategoria: IdSubCategoria,
      },
      url: location,
      success: function (respuesta) {
         if ((respuesta = 1)) {
            var arrayObJ = IdSubCategoria.split(',');
            if (arrayObJ.length == 1) {
               table
                  .row(':eq(' + positionRow + ')')
                  .remove()
                  .draw();
            } else {
               table.rows({selected: true}).remove().draw();
            }
            $('#BorrarSubCategoriaModal').modal('hide');
         }
         LimpiaModal();
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {});
}

//Guardar Almacen **
function SaveSubCategoria() {
   var location = 'SubCategorias/SaveSubCategoria';
   var IdSubCategoria = $('#IdSubCategoria').val();
   var NomSubCategoria = $('#NomSubCategoria').val();
   var CodSubCategoria = $('#CodSubCategoria').val().toUpperCase();
   var idCategoria = $('#selectRowCategorias option:selected').attr('id');
   var nomCategoria = $('#selectRowCategorias option:selected').text();

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {IdSubCategoria: IdSubCategoria, NomSubCategoria: NomSubCategoria, CodSubCategoria: CodSubCategoria, idCategoria: idCategoria},
      url: location,
      success: function (respuesta) {
         if (IdSubCategoria != '') {
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
                     '<button onclick="EditSubCategoria(' +
                     respuesta +
                     ',' +
                     idCategoria +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletProveedor(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: respuesta,
                  [2]: CodSubCategoria,
                  [3]: NomSubCategoria,
                  [4]: nomCategoria,
                  [5]: padLeadingZeros(idCategoria,2) ,

               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            //$(rowNode).find('td').eq(1).addClass('text-center');
            $(rowNode).find('td').eq(1).attr("hidden",true);

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
   console.log('LIMPIA--');
   $('#NomSubCategoria').val('');
   $('#IdSubCategoria').val('');
   $('#selectRowCategorias').html('');
   $('#CodSubCategoria').val('');
   $('#formSubCategorias').removeClass('was-validated');
   $('#titulo').text('Nueva Subcategoria');
   getCategorias('');
}

// Optiene los categorias disponibles *


/*function putCategorias(id) {
   var location = 'SubCategorias/GetCategorias';
   console.log('PASO Catalogos');
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
        
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.cat_id + '  value="' + row.cat_id + '">' + row.cat_name + '</option> ';
         });
         $('#selectRowCategorias').append(renglon);
         if (id != undefined) {
            $("#selectRowCategorias option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
} */
/*function ListSubCategorias() {
   
   var location = 'SubCategorias/ListSubCategorias';
   console.log('Paso 1');
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         console.log(respuesta);
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.sbc_id + '  value="' + row.sbc_id + '">' + row.sbc_code + ' | ' + row.sbc_name + '</option> ';
         });
         $('#selectRowSubCat').append(renglon);
         if (id != undefined) {
            $("#selectRowSubCat option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
} */

//obtiene la informacion de tabla Proveedores *
function getSubCategoriasTable(idCategoria) {
   var location = 'SubCategorias/GetSubCategorias';
   $('#SubCategoriasTable').DataTable().destroy();
   $('#tablaSubCategoriasRow').html('');
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {idCategoria: idCategoria},
      url: location,
      _success: function (respuesta) {
         var renglon = '';
         respuesta.forEach(function (row, index) {
            if (row.sbc_id != 0) {
               renglon =
                  '<tr id="' + row.sbc_id + '">' +
                  '<td class="text-center edit"> ' +
                  '<button onclick="EditSubCategoria(' +
                  row.sbc_id +
                  ',' +
                  row.cat_id +
                  ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button>' +
                  '<button onclick="ConfirmDeletSubCategoria(' +
                  row.sbc_id +
                  ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' +
                  '</td>' +
                  "<td class='dtr-control text-center' hidden>" +
                  row.sbc_id +
                  '</td>' +

                  '<td>' +
                  row.sbc_code +
                  '</td>' +

                  '<td class="sbcatname">' +
                  row.sbc_name +
                  '</td>' +

                  '<td>' +
                  row.cat_name +
                  '</td>' +
                  
                  '<td>' +
                  padLeadingZeros(row.cat_id,2)   +
                  '</td>' +

                  '<td class="quantity text-left" data-content="' + row.cantidad + '"><span class="toLink">' +
                  row.cantidad  +
                  '</span></td>' +

                  '</tr>';
            }
            $('#tablaSubCategoriasRow').append(renglon);
            get_quantity(row.sbc_id);
         });
         activeIcons();

         let title = 'SubCategorias';
         let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#SubCategoriasTable').DataTable({
            order: [[1, 'asc']],
            select: {
               style: 'multi',
               info: false,
            },
            lengthMenu: [
               [50, 100, 200, -1],
               ['50', '100', 'Todo'],
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
                  className: 'btn-apply',
                  action: function () {
                     var selected = table.rows({selected: true}).data();
                     var idSelected = '';
                     selected.each(function (index) {
                        idSelected += index[1] + ',';
                     });
                     idSelected = idSelected.slice(0, -1);
                     if (idSelected != '') {
                        ConfirmDeletSubCategoria(idSelected);
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
         $('.deep_loading').css({display: 'none'});
      },
      get success() {
         return this._success;
      },
      set success(value) {
         this._success = value;
      },
      error: function (jqXHR, textStatus, errorThrown) {
         console.log(jqXHR, textStatus, errorThrown);
      },
   }).done(function () {}) ;
   
}

function padLeadingZeros(num, size) {
   var s = num+"";
   while (s.length < size) s = "0" + s;
   return s;
}

function activeIcons() {
   
   $('.toLink')
       .unbind('click')
       .on('click', function () {
           let prd = $(this).parents('tr').attr('id');
           let qty = $(this).parent('td').attr('data-content');
           sbcatnme = $(this).parents('tr').children('td.sbcatname').html();
           if (qty > 0) {
               console.log('Se TOCO el Boton y valido', qty );
               $('.deep_loading').css({display: 'flex'});
               getSeries(prd);
           }
       });
}

function LlenaCategorias(dt) {        
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         /*respuesta.forEach(function (row, index) {*/
         $.each(dt, function (v, row) 
         {
            renglon += '<option id=' + row.cat_id + '  value="' + row.cat_id + '">' + row.cat_name + '</option> ';
         });
         $('#selectRowCategorias').append(renglon);
         /*if (id != undefined) {
            $("#selectRowCategorias option[value='" + id + "']").attr('selected', 'selected');
         }
     /* },
      error: function () {},
   }).done(function () {}); */
}

function LlenaSubCategorias(dt) {        
   var renglon = "<option id='0'  value=''>Solo consulta ... </option> ";
   /*respuesta.forEach(function (row, index) {*/
   $.each(dt, function (v, row) {
      renglon += '<option id=' + row.sbc_id + '  value="' + row.sbc_id + '">' + row.cat_id + ' - ' + row.sbc_code + ' | ' + row.sbc_name + '</option> ';
   });
   $('#selectRowSubCat').append(renglon);
   /*if (id != undefined) {
      $("#selectRowSubCat option[value='" + id + "']").attr('selected', 'selected');
   }*/
/* },
error: function () {},
}).done(function () {}); */
}

function putSeries(dt) {
   $('#ExisteSbcModal').removeClass('overlay_hide');
   $('#tblSbcSerie').DataTable({
       destroy: true,
       order: [[1, 'asc']],
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
           {data: 'prodname', class: 'product-name'},
           {data: 'serlnumb', class: 'product-name'},
           {data: 'dateregs', class: 'sku'},
           {data: 'sercost', class: 'quantity'},
           {data: 'cvstatus', class: 'code-type_s'},
           {data: 'cvestage', class: 'code-type_s'},
           {data: 'comments', class: 'comments'},
       ],
   });

   $('#ExisteSbcModal .btn_close')
       .unbind('click')
       .on('click', function () {
           $('.overlay_background').addClass('overlay_hide');
       });

   build_modal_serie(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_modal_serie(dt) {
   let tabla = $('#tblSbcSerie').DataTable();
   $('.overlay_closer .title').html(`Subcategoria - ${sbcatnme}` );
   tabla.rows().remove().draw();
   $.each(dt, function (v, u) {
       
       tabla.row
           .add({
               /*sermodif: `<i class='fas fa-pen serie modif' id="E${u.ser_id}"></i><i class="fas fa-times-circle serie kill" id="K${u.ser_id}"></i>`,*/
               sermodif: `<i></i>`,
               produsku: `${u.ser_sku.slice(0, 7)}-${u.ser_sku.slice(7, 11)}`,
               prodname: u.prd_name,
               serlnumb: u.ser_serial_number,
               dateregs: u.ser_date_registry,
               sercost: u.ser_cost,
               cvstatus: u.ser_situation,
               cvestage: u.ser_stage,
               comments: u.ser_comments,
           })
           .draw();
       $(`#E${u.ser_id}`).parents('tr').attr('data-product', u.prd_id);
       $('.deep_loading').css({display: 'none'}); 
   });
}

function get_quantity(sbcatId){
   var pagina = 'SubCategorias/countQuantity';
   var par = `[{"sbcatId":"${sbcatId}"}]`;
   var tipo = 'json';
   var selector = putQuantity;
   fillField(pagina, par, tipo, selector);
}

function putQuantity(dt){
   let sbcatid = dt[0].sbcat_id;
   let qty = dt[0].cantidad;
   $('#tablaSubCategoriasRow #' + sbcatid).children('td.quantity').children('.toLink').html(qty);
   $('#tablaSubCategoriasRow #' + sbcatid).children('td.quantity').attr('data-content',qty);
   /*console.log(sbcatid,'|', qty);*/
   
}


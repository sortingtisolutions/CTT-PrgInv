var table = null;
var TblPjcts = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

function inicial() {
   getProjectsListTable();
   getTipoProjectsList();
   getTipoLocation();
   getCustomers();
   getRelation();
   //Open modal *
   $('#nuevoProjectsList').on('click', function () {
      LimpiaModal();
      $('#formProjectsList').removeClass('was-validated');
   });

   //Guardar y salva Usuario *
   $('#GuardarUsuario').on('click', function () {
      if (validaFormulario() == 1) {
         ActualizaProjects();
      }
   });
   /* //borra Usuario +
   $('#BorrarProjectsList').on('click', function () {
      DeleteProjectsList();
   }); */

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
      getTipoProjectsList();
   });

   $('#ProjectsListTable tbody').on('click', 'tr', function () {
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


function getProjectsListTable() {
   var location = 'ProjectsList/GetProjectsList';
   $('#ProjectsListTable').DataTable().destroy();
   $('#tablaProjectsListRow').html('');

   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      url: location,
      _success: function (respuesta) {
         //(console.log(respuesta);
         TblPjcts = respuesta;
         var renglon = '';
         respuesta.forEach(function (row, index) {
         //console.log(respuesta);
            if(row.pjt_id != 0){
            renglon =
               '<tr>' + '<td class="text-center edit"> ' +
               '<button onclick="EditProjectsList(' +
               row.pjt_id +
               ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif" style="color: brown;"></i></button>' +
               /* '<button onclick="ConfirmDeletProjectsList(' +
               row.pjt_id +
               ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>' + */
               '</td>' +
               "<td class='dtr-control text-center' hidden>" + row.pjt_id + '</td>' +
               '<td>' + row.pjt_name + '</td>' +
               '<td>' + row.pjt_number + '</td>' +
               '<td hidden> ' + row.pjttp_name + '</td>' +
               '<td>' + row.pjt_location + '</td>' +
               '<td>' + row.pjttp_name + '</td>' +
               '<td>' + row.loc_type_location + '</td>' +
               '<td>' + row.Casap + '</td>' +
               '<td>' + row.Productor + '</td>' +
               '<td>' + row.pjs_name + '</td>' +
               '</tr>';
            }
            $('#tablaProjectsListRow').append(renglon);
         });

         let title = 'ProjectsList';
         let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

         table = $('#ProjectsListTable').DataTable({
            order: [[1, 'asc']],
            select: {
               style: 'multi',
               info: false,
            },
            lengthMenu: [
               [50, 100, 200, -1],
               ['50','100' ,'200', 'Todo'],
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
               /* {
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
                        ConfirmDeletProjectsList(idSelected);
                     }
                  },
               }, */
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

//Edita el ProjectsList *
function EditProjectsList(id) {
   UnSelectRowTable();
   LimpiaModal();
  /*  $('#titulo').text('Edita ProjectsList'); */

   let ix = goThroughProjectsList(id);
   $('#IdProjectsList').val(TblPjcts[ix].pjt_id);
   $('#NomProjectsList').val(TblPjcts[ix].pjt_name);
   $('#ContactoProjectsList').val(TblPjcts[ix].pjt_location);
   
   $('#selectRowTipoProjects').val(TblPjcts[ix].pjttp_id);
   $('#selectRowTipoLocations').val(TblPjcts[ix].loc_id);
   $('#selectRowCustomers').val(TblPjcts[ix].casaid);
   $('#selectRowRelation').val(TblPjcts[ix].ptrid);
   /* console.log(TblPjcts[ix].casaid);
   console.log(TblPjcts[ix].ptrid); */
}

function UnSelectRowTable() {
   setTimeout(() => {
      table.rows().deselect();
   }, 10);
}


//Limpia datos en modal  **
function LimpiaModal() {
   $('#NomProjectsList').val('');
   $('#ContactoProjectsList').val('');
   $('#selectRowTipoProjects').val('');
   $('#selectRowTipoLocations').val('');
   $('#selectRowCustomers').val('');
   $('#selectRowRelation').val('');

   /* $('#titulo').text('Nuevo ProjectsList'); */
   $('#formProjectsList').removeClass('was-validated');
}



//Guardar ProjectsList **
function ActualizaProjects() {

   /* var location = 'ProjectsList/ActualizaProjectsList'; */

   var IdProjectsList = $('#IdProjectsList').val();
   var NomProjectsList = $('#NomProjectsList').val();
   var ContactoProjectsList = $('#ContactoProjectsList').val();

   var tipoProjectsId = $('#selectRowTipoProjects option:selected').attr('id');
   var tipoLocationId = $('#selectRowTipoLocations option:selected').attr('id');
   var tipoCustomerId = $('#selectRowCustomers option:selected').attr('id');
   var tipoRelationtId = $('#selectRowRelation option:selected').attr('id');
  
   console.log('Datos- ',IdProjectsList,NomProjectsList,ContactoProjectsList);
   console.log('IDs- ',tipoProjectsId,tipoLocationId);
   console.log('Cust-Rel- ',tipoCustomerId,tipoRelationtId);
   
   var par = `
   [{
       "IdProjectsList" : "${IdProjectsList}",
       "NomProjectsList" : "${NomProjectsList}",
       "ContactoProjectsList" : "${ContactoProjectsList}",
       "tipoProjectsId" : "${tipoProjectsId}",
       "tipoLocationId" : "${tipoLocationId}",
       "tipoCustomerId" : "${tipoCustomerId}",
       "tipoRelationtId" : "${tipoRelationtId}"
   }]
`;
//console.log('EDITA ',par);
var pagina = 'ProjectsList/ActualizaProjectsList';
var tipo = 'html';
var selector = resEdtProduct;
fillField(pagina, par, tipo, selector);


/*    $.ajax({
      type: 'POST',
      dataType: 'html',
      data: {
         IdProjectsList: IdProjectsList,
         NomProjectsList: NomProjectsList,
         ContactoProjectsList: ContactoProjectsList,
         tipoProjectsId: tipoProjectsId,
         tipoLocationId: tipoLocationId,
         tipoCustomerId: tipoCustomerId,
         tipoRelationtId: tipoRelationtId
      },
      url: location,
      success: function (respuesta) {
         //console.log('Look ',respuesta);
         if (IdProjectsList != '') {
           /*  table
               .row(':eq(' + positionRow + ')')
               .remove()
               .draw(); 
         }
         //if (respuesta != 0) {
            //getAlmacenesTable();
            /* var rowNode = table.row
               .add({
                  [0]:
                     '<button onclick="EditProjectsList(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-edit" aria-label="Left Align"><i class="fas fa-pen modif"></i></button><button onclick="ConfirmDeletProjectsList(' +
                     respuesta +
                     ')" type="button" class="btn btn-default btn-icon-delete" aria-label="Left Align"><i class="fas fa-times-circle kill"></i></button>',
                  [1]: respuesta,
                  [2]: NomProjectsList,
                  [3]: tipoProjectsId,
                  [4]: tipoProjectsListName,
                  [5]: ContactoProjectsList,
                  [6]: RfcProjectsList,
                  [7]: EmailProjectsList,
                  [8]: PhoneProjectsList,
               })
               .draw()
               .node();
            $(rowNode).find('td').eq(0).addClass('edit');
            $(rowNode).find('td').eq(1).addClass('text-center');
            $(rowNode).find('td').eq(1).attr("hidden",true);
            $(rowNode).find('td').eq(3).attr("hidden",true); 

            
            LimpiaModal();
            getTipoProjectsList();
          }
      },
      error: function (EX) {
         console.log(EX);
      },
   }).done(function () {}); */
}

function resEdtProduct(dt) {
   console.log('LOOK ',dt);
   LimpiaModal();
   getProjectsListTable();
   getTipoProjectsList();
   getTipoLocation();
   getCustomers();
   getRelation();
   
}

// Optiene los tipos de proyectos disponibles *
function getTipoProjectsList(id) {
   $('#selectRowTipoProjects').html("");
   var location = 'ProjectsList/GetTipoProjectsList';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.pjttp_id + '  value="' + row.pjttp_id + '">' + row.pjttp_name + '</option> ';
         });
         $('#selectRowTipoProjects').append(renglon);
         if (id != undefined) {
            $("#selectRowTipoProjects option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}

// Optiene los tipos de locaciones disponibles  *
function getTipoLocation(id) {
   $('#selectRowTipoLocations').html("");
   var location = 'ProjectsList/getTipoLocation';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.loc_id + '  value="' + row.loc_id + '">' + row.loc_type_location + '</option> ';
         });
         $('#selectRowTipoLocations').append(renglon);
         if (id != undefined) {
            $("#selectRowTipoLocations option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}

// Optiene clientes disponibles  *
function getCustomers(id) {
   $('#selectRowCustomers').html("");
   var location = 'ProjectsList/getCustomers';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.cus_id + '  value="' + row.cus_id + '">' + row.cus_name + '</option> ';
         });
         $('#selectRowCustomers').append(renglon);
         if (id != undefined) {
            $("#selectRowCustomers option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}

// Optiene clientes disponibles  *
function getRelation(id) {
   $('#selectRowRelation').html("");
   var location = 'ProjectsList/getRelation';
   $.ajax({
      type: 'POST',
      dataType: 'JSON',
      data: {id: id},
      url: location,
      success: function (respuesta) {
         var renglon = "<option id='0'  value=''>Seleccione...</option> ";
         respuesta.forEach(function (row, index) {
            renglon += '<option id=' + row.cus_id + '  value="' + row.cus_id + '">' + row.cus_name + '</option> ';
         });
         $('#selectRowRelation').append(renglon);
         if (id != undefined) {
            $("#selectRowRelation option[value='" + id + "']").attr('selected', 'selected');
         }
      },
      error: function () {},
   }).done(function () {});
}

function goThroughProjectsList(pjtId) {
   let inx = -1;
   $.each(TblPjcts, function (v, u) {
       if (pjtId == u.pjt_id) inx = v;
   });
   return inx;
}
var table = null;
var positionRow = 0;

$(document).ready(function () {
   verifica_usuario();
   inicial();
});

//INICIO DE PROCESOS MACRO
function inicial() 
{
   getProjectsCfdi();
   // getOptionYesNo(0);

   //Open modal *
   $('#nuevoProveedor').on('click', function () {
      LimpiaModal();
      $('#formProveedor').removeClass('was-validated');
   });

   //Guardar y salva Usuario *
   $('#GuardarCFDI').on('click', function () {
         // read_exchange_table();
         exchange_apply();
         LimpiaModal();
         getOptionYesNo();
   });

   $('#LimpiarFormulario').on('click', function () {
      LimpiaModal();
      getOptionYesNo();
   });
}

function getProjectsCfdi() {
   var pagina = 'AddInfoCfid/listProjectsCfdi';
   var par = `[{"cat_id":""}]`;
   var tipo = 'json';
   var selector = putProjectsCfdi;
   fillField(pagina, par, tipo, selector);
}

function saveExtraCfdi(pr) {
   // console.log('PR-',pr);
   var pagina = 'AddInfoCfid/saveExtraCfdi';
   var par = pr;
   var tipo = 'html';
   var selector = putsaveExtraCfdi;
   fillField(pagina, par, tipo, selector);
}

function putsaveExtraCfdi(dt) {
   console.log('Id Insert-',dt);

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

function putProjectsCfdi(dt) {
   // console.log(dt);
      let title = 'Detalle salida CFDI';
   let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
   $('#tblProjectCfdi').DataTable({
       bDestroy: true,
       order: [[1, 'asc']],
       dom: 'Blfrtip',
       lengthMenu: [
           [25, 50, 100, -1],
           [25, 50, 100, 'Todos'],
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
               //Botón para descargar PDF
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
           {
               text: 'Borrar seleccionados',
               // className: 'btn-apply hidden-field',
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
           {data: 'sermodif', class: 'edit'},
           {data: 'projname', class: 'supply'},
           {data: 'projnum', class: 'sku'},
           {data: 'projtnam', class: 'supply'},
           {data: 'cusname', class: 'supply'},
           {data: 'cusrfc', class: 'sku'},
           {data: 'cusphone', class: 'supply'},
           {data: 'cusaddre', class: 'product-name'},
           {data: 'cusemail', class: 'supply'},
           {data: 'cuscvect', class: 'sku'},
           {data: 'cusconna', class: 'supply'},
           {data: 'cusconph', class: 'sku'},
           {data: 'projloca', class: 'product-name'},
           {data: 'projend', class: 'date'},
           {data: 'distcfdi', class: 'supply'},
           {data: 'trancfdi', class: 'sku'},
           {data: 'operacfdi', class: 'supply'},
           {data: 'unidcfdi', class: 'supply'},
           {data: 'placacfdi', class: 'supply'},
           {data: 'permcfdi', class: 'supply'},
           {data: 'cantcfdi', class: 'sku'},
       ],
   });
   build_data_cfdi(dt);
}

/** +++++  Coloca los seriales en la tabla de seriales */
function build_data_cfdi(dt) {
   // console.log(dt);
   if(dt[0].pjt_id>0){
   let tabla = $('#tblProjectCfdi').DataTable();
   tabla.rows().remove().draw();
   $.each(dt, function (v, u) {
       tabla.row
           .add({
               sermodif: `<i class="fas fa-pen modif" id="${u.pjt_id}" data_pro="${u.pjt_name}"></i> `, //<i class="fas fa-times-circle kill"></i>
               projname: u.pjt_name,
               projnum: u.pjt_number,
               projtnam: u.pjttp_name,
               cusname: u.cus_name,
               cusrfc: u.cus_rfc,
               cusphone: u.cus_phone,
               cusaddre: u.cus_address,
               cusemail: u.cus_email,
               cuscvect: u.cus_cve_cliente,
               cusconna: u.cus_contact_name,
               cusconph: u.cus_contact_phone,
               projloca: u.pjt_location,
               projend: u.pjt_date_end,
               distcfdi: u.cfdi_distancia,
               trancfdi: u.cfid_transporte_ctt,
               operacfdi: u.cfdi_operador_movil,
               unidcfdi: u.cfdi_unidad_movil,
               placacfdi: u.cfdi_placas,
               permcfdi: u.cfdi_permiso_fed,
               cantcfdi: u.cfdi_cantidad_eq,
           })
           .draw();
       $(`#E${u.pjt_id}`).parents('tr').attr('id', u.pjt_id);
   });
   ActiveIcons();
   }
}

function  ActiveIcons(){
   $('td.edit i')
        .unbind('click')
        .on('click', function () {
            let acc = $(this).attr('class').split(' ')[2];
            // console.log(acc);
            switch (acc) {
                case 'modif':
                  let idproj = $(this).attr('id');
                  let nomproj = $(this).attr('data_pro');
                  // console.log('CLickVal-',id,nomproj);
                    editProjCfdi(idproj, nomproj);
                    break;
                case 'kill':
                  console.log('Elimina');
                  //   deleteCategory(catId);
                    break;
                default:
            }
        });
}

function editProjCfdi(idproj,nomproj) {
   $('#NomProject').val(nomproj);
   $('#IdProject').val(idproj);
}

function exchange_apply() {
   let pjtId = $('#IdProject').val();
   let pjtname = $('#NomProject').val();
   let distcfdi = $('#txtDistance').val();
   let trancfdi = $('#transporteCtt').val();
   let operacfdi = $('#txtOperaMov').val();
   let unidcfdi = $('#txtOperaUnid').val();
   let placacfdi = $('#txtPlacas').val();
   let permfed = $('#txtPermFed').val();
   let projqty = $('#txtQuantity').val();

   if (trancfdi == 'Si') {
       let par = `
       [{
           "pjtId"       : "${pjtId}",
           "pjtname"        : "${pjtname}",
           "distcfdi"       : "${distcfdi}",
           "trancfdi"      : "${trancfdi}",
           "operacfdi"      : "${operacfdi}",
           "unidcfdi"       : "${unidcfdi}",
           "placacfdi"       : "${placacfdi}",
           "permfed"       : "${permfed}",
           "projqty"       : "${projqty}"
       }]`;
         //   console.log(par);
           fill_table(par);
   } else {
       let par = `
       [{
         "pjtId"       : "${pjtId}",
         "pjtname"        : "${pjtname}",
         "distcfdi"       : "${distcfdi}",
         "trancfdi"      : "${trancfdi}",
         "operacfdi"      : "${operacfdi}",
         "unidcfdi"       : "${unidcfdi}",
         "placacfdi"       : "${placacfdi}",
         "prodqty"       : "${'1'}",
         "permfed"       : "${permfed}",
         "projqty"       : "${projqty}"
     }]`;
      //  console.log(par);
       fill_table(par);
   }
}

// Llena la tabla de los datos de movimientos
function fill_table(par) {
   // console.log('Paso 3 ', par);
   saveExtraCfdi(par);
   getProjectsCfdi();

}

$('#transporteCtt').on('change', function () {
   let valop = $(this).val();
   // console.log(valop);
   if (valop=='Si'){
      $('.pos1').removeClass('hide-items');
      // valop == 'Si' ? $('.pos1').addClass('hide-items') : $('.pos1').removeClass('hide-items');
      // valop == 'No' ? $('.pos2').addClass('hide-items') : $('.pos2').removeClass('hide-items');
   } else { $('.pos1').addClass('hide-items')  }
});

function read_exchange_table() {
       $('#tblProjectCfdi tbody tr').each(function (v, u) {
           let col14 = $($(u).find('td')[1]).text();
           let col15 = $($(u).find('td')[2]).text();
           let col16 = $($(u).find('td')[3]).text();
           let col17 = $($(u).find('td')[4]).text();
           let col18 = $($(u).find('td')[5]).text();
           let col19 = $($(u).find('td')[6]).text();
           let col20 = $($(u).find('td')[7]).text();
           let col21 = $($(u).find('td')[8]).text();
         //   let idproj = $($(u).find('td')[13]).text();
           let idproj = $('#IdProject').val();

           let truk = `${col14}|${col15}|${col16}|${col17}|${col18}|${col19}|${col20}|${col20}|${idproj}`;
         //   console.log(truk);
         //   build_data_structure(truk);
       });
   
}

function LimpiaModal() {
   console.log('LIMPIANDO');
   $('#IdProject').val('');
   $('#NomProject').val('');
   $('#txtDistance').val('');
   $('#txtOperaMov').val('');
   $('#txtOperaUnid').val('');
   $('#txtPlacas').val('');
   $('#txtPermFed').val('');
   $('#txtQuantity').val('');
   $('#formProveedor').removeClass('was-validated');
}

function getOptionYesNo(id) {
   $('#transporteCtt').html("");
   renglon = "<option id='0'  value=''></option> ";
   $('#transporteCtt').append(renglon);
   renglon = "<option id='1'  value='Si'>Si</option> ";
   $('#transporteCtt').append(renglon);
   renglon = "<option id='2'  value='No'>No</option> ";
   $('#transporteCtt').append(renglon);

}

function build_data_structure(pr) {
   let el = pr.split('|');
   let par = `
   [{
       "fol" :  "${el[0]}",
       "sku" :  "${el[1]}",
       "pnm" :  "${el[2].toUpperCase()}",
       "qty" :  "${el[3]}",
       "ser" :  "${el[4]}",
       "str" :  "${el[5]}",
       "com" :  "${el[6]}",
       "cod" :  "${el[7]}",
       "idx" :  "${el[8]}",
       "prd" :  "${el[9]}",
       "sti" :  "${el[10]}",
       "cos" :  "${el[11]}",
       "cin" :  "${el[12]}",
       "sup" :  "${el[13]}",
       "doc" :  "${el[14]}",
       "pet" :  "${el[15]}",
       "cpe" :  "${el[16]}",
       "bra" :  "${el[17]}",
       "cto" :  "${el[18]}",
       "nec" :  "${el[19]}"
   }]`;
}

let pj, px, pd;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    folio = getFolio();
    setting_table();
    getListProducts();

    $('#txtPrice').on('blur', function () {
        validator();
    });
    $('#btn_subletting').on('click', function () {
        let acc = $(this).attr('data_accion');
        updating_serie(acc);
    });
}

/**  +++++ Obtiene los datos de los proyectos activos +++++  */
function get_Proyectos() {
    /* var pagina = 'ProductsForSubletting/listProyects';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = put_Proyectos;
    fillField(pagina, par, tipo, selector); */
}
function getListProducts() {
    var pagina = 'SearchIndividualProducts/listProducts2';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putProductsList;
    fillField(pagina, par, tipo, selector);
}
/**  +++++ Obtiene los datos de los productos activos +++++  */
function get_products(pj) {
    console.log(pj);
    var pagina = 'SearchIndividualProducts/listProducts';
    var par = `[{"pjtId":"${pj}"}]`;
    var tipo = 'json';
    var selector = put_Products;
    fillField(pagina, par, tipo, selector);
}

/** ++++  formatea la tabla ++++++ */
function setting_table() {
    let title = 'Productos ';
    let filename =
        title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');

    $('#tblProductForSubletting').DataTable({
        order: [[1, 'desc']],
        dom: 'Blfrtip',
        select: {
            style: 'single',
            info: false,
        },
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
            {
                // Boton aplicar cambios
                text: 'Imprimir',
                className: 'btn-print hidden-field',
                action: function (e, dt, node, config) {                    
                    printProduct();
                },
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
            { data: 'editable', class: 'edit' },
            { data: 'prodname', class: 'product-name' },
            { data: 'prod_sku', class: 'sku' },
            { data: 'serie',    class: 'sku' },
            { data: 'proyecto', class: 'supply' },
            { data: 'fechaInicio', class: 'stores' },
            { data: 'fechaFin', class: 'date' },
            { data: 'estatus',  class: 'date' },
        ],
    });
}

function putProductsList(dt) {
    var sl = $('#txtProducts').offset();
    $('#listProduct .list-items').html('');
    $('#listProduct').css({top: sl.top + 30 + 'px'});// volver a tomar al hacer scroll.
    $('#listProduct').slideUp('200', function () {
        $('#listProduct .list-items').html('');
    });

    $.each(dt, function (v, u) {
        let H = `<div class="list-item" id="${u.prd_id}" data_complement="${u.prd_id}|${u.prd_name}">${u.prd_name}</div>`;
        $('#listProduct .list-items').append(H);
    });

    $('#txtProducts').on('focus', function () {
        $('#listProduct').slideDown('fast');
    });

    $('#txtProducts').on('scroll', function(){
        sl = $('#txtProducts').offset();
        $('#listProduct').css({top: sl.top + 30 + 'px'});
    });
    $('#listProduct').on('mouseleave', function () {
        $('#listProduct').slideUp('fast');
    });

    $('#txtProducts').keyup(function (e) {
        var res = $(this).val().toUpperCase();
        if (res == '') {
            $('#listProduct').slideUp(100);
        } else {
            $('#listProduct').slideDown(400);
        }
        res = omitirAcentos(res);
        sel_products(res);
    });

    $('#listProduct .list-item').on('click', function () {
        let prdNm = $(this).html();
        let prdId = $(this).attr('id');
        //console.log('selecciona elemento', prdId,'---', prdNm);
        $('#txtProducts').val(prdNm);
        $('#txtIdProducts').val(prdId);
        $('#listProduct').slideUp(100);
        get_products(prdId);
        //validator();
    });
}
function sel_products(res) {
    //console.log('SELECC',res);
    if (res.length < 2) {
        $('#llistProduct .list-items div.list-item').css({display: 'block'});
    } else {
        $('#listProduct .list-items div.list-item').css({display: 'none'});
    }

    $('#listProduct .list-items div.list-item').each(function (index) {
        var cm = $(this).attr('data_complement').toUpperCase().replace(/|/g, '');

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(res);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({display: 'block'});
        }
    });
}

/**  ++++ Omite acentos para su facil consulta */
function omitirAcentos(text) {
    var acentos = 'ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç';
    var original = 'AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc';
    for (var i = 0; i < acentos.length; i++) {
        text = text.replace(acentos.charAt(i), original.charAt(i));
    }
    return text;
}

/**  ++++   Coloca los productos en el listado del input */
function put_Products(dt) {
    // console.log('put_Products-', dt);
    pd = dt;
    let largo = $('#tblProductForSubletting tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla'
        ? $('#tblProductForSubletting tbody tr').remove()
        : '';
    let tabla = $('#tblProductForSubletting').DataTable();
    tabla.rows().remove().draw();
    let cn = 0;
    $('.btn-print').removeClass('hidden-field');
    if (pd[0].prd_name != undefined) {
        $.each(pd, function (v, u) 
        {
            tabla.row
                .add({
                    editable: `<i id="k${u.prd_id}" class=""></i>`,
                    prodname:   u.prd_name,
                    prod_sku:   u.ser_sku,
                    serie:      u.ser_serial_number,
                    proyecto:   u.pjt_name,
                    fechaInicio: u.pjtpd_day_start,
                    fechaFin:   u.pjtpd_day_end,
                    estatus:    u.ser_situation,
                })
                .draw();
        });
    }
}


/*  ++++++++ Valida los campos  +++++++ */
function validator() {
    let ky = 0;
    let msg = '';
    $('.required').each(function () {
        if ($(this).val() == 0) {
            msg += $(this).attr('data-mesage') + '\n';
            ky = 1;
        }
    });

    let period = $('#txtPeriod').val().split(' - ');
    let a = moment(period[1], 'DD/MM/YYYY');
    let b = moment(period[0], 'DD/MM/YYYY');
    let dif = a.diff(b, 'days');
    if (dif < 1) {
        ky = 1;
        msg += 'La fecha final debe ser por lo menos de un día de diferencia';
    }
    if (ky == 0) {
        $('#btn_subletting').removeClass('disabled');
    } else {
        $('#btn_subletting').addClass('disabled');
    }
    // console.log(msg);
}

function printProduct() {
    let user = Cookies.get('user').split('|');
    let p = $('#txtIdProducts').val();
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');
    console.log(p);   
    window.open(
        `${url}app/views/SearchIndividualProducts/SearchIndividualProductsReport.php?p=${p}&u=${u}&n=${n}&h=${h}`,
        '_blank'
    );
    

    /*  ++++++++ Define las fechas de inicio y de fin   +++++++ */
function define_days(st, dt, db, dr, ds) {
    /* let dats = '';
    let dytr = parseInt(dr) / 2;
    let dyin = parseInt(ds) + dytr;
    let dyfn = parseInt(db) + dytr;
    let dtin = moment(dt).subtract(dyin, 'days').format('DD/MM/YYYY');
    let dtfn = moment(dt)
        .add(dyfn - 1, 'days')
        .format('DD/MM/YYYY');

    if (st == 'i') {
        dats = dtin;
    } else {
        dats = dtfn;
    }
    return dats; */
}

}
/**  ++++   Coloca las monedas en el listado del input */
function put_coins(dt) {
    /*  $.each(dt, function (v, u) {
         let H = `<option value="${u.cin_id}">${u.cin_code} - ${u.cin_name}</option>`;
         $('#txtCoinType').append(H);
     });
 
     $('#txtCoinType').on('change', function () {
         validator();
     }); */
 }
 /**  ++++   Coloca los proveedores en el listado del input */
 function put_suppliers(dt) {
    /*  $.each(dt, function (v, u) {
         let H = `<option value="${u.sup_id}">${u.sup_business_name}</option>`;
         $('#txtSupplier').append(H);
     });
     $('#txtSupplier').on('change', function () {
         validator();
     }); */
 }
 /**  ++++   Coloca los almacenes en el listado del input */
 function put_stores(dt) {
    /*  $.each(dt, function (v, u) {
         let H = `<option value="${u.str_id}">${u.str_name}</option>`;
         $('#txtStoreSource').append(H);
     });
     $('#txtStoreSource').on('change', function () {
         validator();
     }); */
 }
 
 /* function updating_serie(acc) {
     let producId = $('#txtIdProduct').val();
     let produSku = $('#txtSkuProduct').val();
     let seriCost = $('#txtPrice').val();
     let dtResIni = moment(
         $('#txtPeriod').val().split(' - ')[0],
         'DD/MM/YYYY'
     ).format('YYYY-MM-DD');
     let dtResFin = moment(
         $('#txtPeriod').val().split(' - ')[1],
         'DD/MM/YYYY'
     ).format('YYYY-MM-DD');
     let comments = $('#txtComments').val();
     let supplier = $('#txtSupplier option:selected').val();
     let storesId = $('#txtStoreSource option:selected').val();
     let tpCoinId = $('#txtCoinType option:selected').val();
     let pjDetail = $('#txtProjectDetail').val();
     let projecId = $('#txtIdProject').val();
     let seriesId = $('#txtIdSerie').val();
 
     let par = `
     [{
         "producId"  :   "${producId}",
         "produSku"  :   "${produSku}",
         "seriCost"  :   "${seriCost}",
         "dtResIni"  :   "${dtResIni}",
         "dtResFin"  :   "${dtResFin}",
         "comments"  :   "${comments}",
         "supplier"  :   "${supplier}",
         "storesId"  :   "${storesId}",
         "tpCoinId"  :   "${tpCoinId}",
         "pjDetail"  :   "${pjDetail}",
         "seriesId"  :   "${seriesId}",
         "projecId"  :   "${projecId}"
     }]`;
     console.log(acc);
     if (acc == 'add') {
         var pagina = 'ProductsForSubletting/saveSubletting';
     } else {
         var pagina = 'ProductsForSubletting/changeSubletting';
     }
     var tipo = 'json';
     var selector = put_save_subleting;
     fillField(pagina, par, tipo, selector);
 } */
 
 function put_save_subleting(dt) {
     /* // console.log(dt);
     let tr = $('#' + dt[0].pjtdt_id);
     $($(tr[0].cells[2])).html(dt[0].pjtdt_prod_sku);
     $($(tr[0].cells[3])).html(dt[0].sub_price);
     $($(tr[0].cells[4])).html(dt[0].sup_business_name);
     $($(tr[0].cells[5])).html(dt[0].str_name);
     $($(tr[0].cells[6])).html(dt[0].sub_date_start);
     $($(tr[0].cells[7])).html(dt[0].sub_date_end);
     $($(tr[0].cells[8])).html(dt[0].sub_comments);
 
     tr[0].attributes[5].value = dt[0].str_id;
     tr[0].attributes[7].value = dt[0].sup_id;
     tr[0].attributes[8].value = dt[0].cin_id;
     tr[0].attributes[10].value = dt[0].ser_id;
 
     tr.trigger('click');
     tr.removeClass('selected');
     $('.objet').addClass('objHidden'); */
 }
 
 /** ++++  Setea el calendario ++++++ */
/* function setting_datepicket(sl, di, df) {
    let fc = moment(Date()).format('DD/MM/YYYY');
    $(sl).daterangepicker(
        {
            singleDatePicker: false,
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                daysOfWeek: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                monthNames: ['Enero','Febrero','Marzo','Abril','Mayo', 'Junio',
                    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
                firstDay: 1,
            },
            minDate: fc,
            startDate: moment(di, 'DD/MM/YYYY'),
            endDate: moment(df, 'DD/MM/YYYY'),
            opens: 'left',
            drops: 'auto',
        },
        function (start, end, label) {
            let sdin = start.format('DD/MM/YYYY');
            let sdfn = end.format('DD/MM/YYYY');
            $('#txtPeriod').html(sdin + ' - ' + sdfn);
            setTimeout(() => {
                validator();
            }, 500);
        }
    );
}
 */


/**  ++++   Coloca los proyectos en el listado del input */
function put_Proyectos(dt) {
    /*  pj = dt;
     //console.log(pj);
     $.each(dt, function (v, u) {
         let H = `<option data_indx="${v}" value="${u.pjt_id}">${u.pjt_name}</option>`;
         $('#txtProject').append(H);
     });
 
     $('#txtProject').on('change', function () {
         px = parseInt($('#txtProject option:selected').attr('data_indx'));
         $('#txtIdProject').val(pj[px].pjt_id);
         // let period = pj[px].pjt_date_start + ' - ' + pj[px].pjt_date_end;
         $('.objet').addClass('objHidden');
         get_products(pj[px].pjt_id);
     }); */
 }
 
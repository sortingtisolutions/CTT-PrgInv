let seccion = '';
let docs;
let grp = 50;
let num = 0;
let cats, subs, sku1, sku2, sku3, sku4;

$(document).ready(function () {
    if (verifica_usuario()) {
        inicial();
    }
});
//INICIO DE PROCESOS
function inicial() {
    setTimeout(() => {
        //deep_loading('O');
        //console.log('UNO');
        settingTable();
        getProjects(0);
        $('.tblProyects').css({display: 'none'});

    }, 100);
}

/** +++++  Obtiene los proyectos de la base */
function getProjects(catId) {
    var pagina = 'WorkInput/listProjects';
    var par = `[{"pjtId":""}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}

/** +++++  configura la table de productos */
function settingTable() {
    let title = 'Control salida de proyectos';
    let filename = title.replace(/ /g, '_') + '-' + moment(Date()).format('YYYYMMDD');
    //console.log('555');
    $('#tblProyects').DataTable({
        order: [[2, 'desc']],
        dom: 'Blfrtip',
        lengthMenu: [
            [50, 100, -1],
            [50, 100, 'Todos'],
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
            {data: 'editable',      class: 'edit', orderable: false},      
            {data: 'pjt_name',      class: 'supply'},
            {data: 'pjt_number',    class: 'sku'},
            {data: 'pjttp_name',    class: 'supply'},
            {data: 'pjt_date_start', class: 'date'},
            {data: 'pjt_date_end',  class: 'date'},
        ],
    });

      $('.tblProyects')
        .delay(500)
        .slideDown('fast', function () {
            //$('.deep_loading').css({display: 'none'});
            //$('#tblProyects').DataTable().draw();
            deep_loading('C');
        });

}

/** +++++  coloca los productos en la tabla */
function putProjects(dt) {
    // console.log('DOS',dt);
    let valstage='';
    let valicon='';
    
    if (dt[0].pjt_id != '0') {
        $('#tblProyects tbody').html('');
        // <td class="date">${u.pjt_date_project}</td>
        // <td class="supply editable">${u.pjt_location}</td>
        // <td class="sku"><i class='fas fa-edit detail'></i><i class='fas fa-door-open toWork'></i></td>
        
        $.each(dt, function (v, u) {
            if (u.pjt_status == 8)
            { valstage='color:#CC0000';
              valicon='fa fa-cog toWork'; }
            else 
             { valstage='color:#FFA500';
             valicon='fa fa-solid fa-edit detail'; }

            console.log(valstage);
            var H = `
                <tr id="${u.pjt_id}" style='${valstage}'>
                    <td class="sku"><i class="${valicon}"</td>
                    <td class="supply">${u.pjt_name}</td>
                    <td class="sku">${u.pjt_number}</td>
                    <td class="supply">${u.pjttp_name}</td>
                    <td class="date">${u.pjt_date_start}</td>
                    <td class="date">${u.pjt_date_end}</td>
                </tr>`;
            $('#tblProyects tbody').append(H);
        });
        // settingTable();
        activeIcons();
    } else {
        settingTable();
    }
}

/** +++++  Activa los iconos */
function activeIcons() {
    $('.toWork')
        .unbind('click')
        .on('click', function () {
            let locID = $(this);
            let pjtid = locID.parents('tr').attr('id');

            //console.log('Paso ToWork..', pjtid);
            confirm_to_work(pjtid);
        });

    $('.detail')
        .unbind('click')
        .on('click', function () {
            console.log('Pasando siguiente ventana...');
            let sltor = $(this);
            let pjtid = sltor.parents('tr').attr('id');
            let prdNm = 'Modifica proyecto';

            console.log(pjtid);
            Cookies.set('pjtid', pjtid, {expires:1});

            window.location = 'WorkInputContent';
        });
}

function confirm_to_work(pjtid) {
    $('#starToWork').modal('show');
    $('#txtIdProductPack').val(pjtid);
    //borra paquete +
    $('#btnToWork').on('click', function () {
        let Id = $('#txtIdProductPack').val();
        let tabla = $('#tblProducts').DataTable();
        $('#starToWork').modal('hide');

        //console.log('Datos',pjtid,Id);
        var pagina = 'WorkInput/UpdateSeriesToWork';
        var par = `[{"pjtid":"${pjtid}"}]`;
        var tipo = 'json';
        var selector = putToWork;
        fillField(pagina, par, tipo, selector);
    });
}

function putToWork(dt){
    console.log(dt)
    window.location.reload();
}

function modalLoading(acc) {
    if (acc == 'S') {
        $('.invoice__modalBackgound').fadeIn('slow');
        $('.invoice__loading')
            .slideDown('slow')
            .css({ 'z-index': 401, display: 'flex' });
    } else {
        $('.invoice__loading').slideUp('slow', function () {
            $('.invoice__modalBackgound').fadeOut('slow');
        });
    }
}
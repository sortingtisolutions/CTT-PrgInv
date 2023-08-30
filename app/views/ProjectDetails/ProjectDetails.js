let cust, proj, prod, vers, budg, tpprd, relc, proPar, interfase, tpcall, dstgral, glbpjtid,loct;
let gblsku;
var swpjt = 0;
let rowsTotal = 0;
let viewStatus = 'C'; // Columns Trip & Test C-Colalapsed, E-Expanded
let glbSec=0;  // jjr
let product_name=''; // Ed

$('document').ready(function () {
    url = getAbsolutePath();
    verifica_usuario();
    inicial();
});
//INICIO DE PROCESOS
function inicial() {
    if (altr == 1) {
    stickyTable();
    eventsAction();
    getProjects('0');
    getProjectsParents();
    getCustomers();
    getCustomersOwner();
    getDiscounts();
    getProjectType();
    getProjectTypeCalled();
    getCalendarPeriods();
    discountInsuredEvent();
    getLocationType();
    getEdosRepublic();
    getCategories();
    
    confirm_alert();
    }else {
        setTimeout(() => {
            inicial();
        }, 100);
    }
}
function getEdosRepublic() {
    var pagina = 'ProjectDetails/getEdosRepublic';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = putEdosRepublic;
    fillField(pagina, par, tipo, selector);
}
function stickyTable() {
    $(`#invoiceTable table`).sticky({
        top: 'thead tr:first-child',
        left: 'tr th:first-child',
    });

    $(`#listProductsTable table`).sticky({
        top: 'thead tr:first-child',
    });
}

function discountInsuredEvent() {
    $('.selectioninsured')
        .unbind('click')
        .on('click', function () {
            let elm = $(this);

            let posLeft = elm.offset().left - 90;
            let posTop = elm.offset().top - 80;

            $('.invoiceDiscSelect')
                .unbind('mouseleave')
                .css({ top: posTop + 'px', left: posLeft + 'px' })
                .fadeIn(400)
                .on('mouseleave', function () {
                    $('.invoiceDiscSelect').fadeOut(400);
                })
                .unbind('change')
                .on('change', function (e) {
                    let insured = parseFloat(
                        $('#insuTotal').text().replace(/\,/g, '')
                    );
                    if (insured > 0) {
                        let data = parseFloat(e.target.value);
                        data = data * 100 + '<small>%</small>';
                        $('#insuDesctoPrc').html(data);

                        updateTotals();
                        $('.invoiceDiscSelect').fadeOut(400);
                        // console.log(e.target.value, data, insured, dsctoInsured);
                    }
                });
        });
}

function eventsAction() {
    // Despliega la seccion de detalle de información del proyecto
    $('.projectInformation')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-finder').css({ top: '-100%' });
            $('.projectfinder').removeClass('open');

            let rotate = $(this).attr('class').indexOf('rotate180');
            if (rotate >= 0) {
                $('.invoice__section-details').css({
                    top: '-100%',
                    bottom: '100%',
                });
                $(this).removeClass('rotate180');
            } else {
                $('.invoice__section-details').css({
                    top: '32px',
                    bottom: '0px',
                });
                $(this).addClass('rotate180');
            }
        });

    // Despliega la sección de seleccion de proyecto y cliente
    $('.projectfinder')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-details').css({
                top: '-100%',
                bottom: '100%',
            });
            $('.projectInformation').removeClass('rotate180');

            let open = $(this).attr('class').indexOf('open');
            if (open >= 0) {
                $('.invoice__section-finder').css({ top: '-100%' });
                $(this).removeClass('open');
            } else {
                $('.invoice__section-finder').css({ top: '32px' });
                $(this).addClass('open');
            }
        });

    // Despliega y contrae las columnas de viaje y prueba
    $('.showColumns')
        .unbind('click')
        .on('click', function () {
            let rotate = $(this).attr('class').indexOf('rotate180');
            viewStatus = rotate >= 0 ? 'E' : 'C';
            expandCollapseSection();
        });

    // Despliega y contrae el menu de opciones de secciones
    $('.invoice_controlPanel .addSection')
        .unbind('click')
        .on('click', function () {
            $('.menu-sections').slideDown('slow');
            $('.menu-sections').on('mouseleave', function () {
                $(this).slideUp('slow');
                sectionShowHide();
            });
        });

    // muestra en la cotización la seccion seleccionada
    $('.menu-sections ul li')
        .unbind('click')
        .on('click', function () {
            let item = $(this).attr('data-option');
            glbSec = $(this).attr('data-option');
            $(this).hide();

            $(`#SC${item}`).show();
        });

    // Despliega y contrae el listado de projectos
    $('.invoice_controlPanel .toImport')
        .unbind('click')
        .on('click', function () {
            let pos = $(this).offset();
            $('.import-sections')
                .slideDown('slow')
                .css({ top: '30px', left: pos.left + 'px' })
                .on('mouseleave', function () {
                    $(this).slideUp('slow');
                });

            fillProjectsAttached();
        });

    // Despliega la lista de productos para agregar a la cotización
    $('.invoice__box-table .invoice_button')
        .unbind('click')
        .on('click', function () {
            let item = $(this).parents('tbody').attr('id');
            glbSec = item.substring(3,2);  // jjr
            showListProducts(item);
        });

    // Elimina la sección de la cotización
    $('.removeSection')
        .unbind('click')
        .on('click', function () {
            let id = $(this);
            let section = id.parents('tbody');
            section.hide().find('tr.budgetRow').remove();
            sectionShowHide();
        });

    // Guarda version actual
    $('.version__button .toSaveBudget')
        .unbind('click')
        .on('click', function () {
            let boton = $(this).html();
            let nRows = $(
                '.invoice__box-table table tbody tr.budgetRow'
            ).length;
            if (nRows > 0) {
                let pjtId = $('.version_current').attr('data-project');
                glbpjtid=pjtId;
                let verId = $('.version_current').attr('data-version');
                let discount = parseFloat($('#insuDesctoPrc').text()) / 100;
                if (verId != undefined){
                    modalLoading('S');
                    let par = `
                    [{
                        "pjtId"     : "${pjtId}",
                        "verId"     : "${verId}",
                        "discount"  : "${discount}",
                        "action"    : "${interfase}"
                    }]`;
                    // console.log('Salvando Solo',par);
                    var pagina = 'ProjectDetails/SaveBudget';
                    var tipo = 'html';
                    var selector = putsaveBudget;
                    fillField(pagina, par, tipo, selector);
                } else{
                    alert('No tienes una version creada, ' + 
                            'debes crear en el modulo de cotizaciones');
                }
            }
        });

    // Guarda nueva version
    $('.version__button .toSaveBudgetAs')
        .unbind('click')
        .on('click', function () {
            let boton = $(this).html();
            let nRows = $(
                '.invoice__box-table table tbody tr.budgetRow'
            ).length;
            if (nRows > 0) {
                let pjtId = $('.version_current').attr('data-project');
                glbpjtid=pjtId;
                // let verCurr = $('.sidebar__versions .version__list ul li:first').attr('data-code');
                let verCurr = lastVersionFinder();
                let vr = parseInt(verCurr.substring(1, 10));
                let verNext = 'P' + refil(vr + 1, 4);
                let discount = parseFloat($('#insuDesctoPrc').text()) / 100;
                let lastmov = moment().format("YYYY-MM-DD HH:mm:ss");  // agregado por jjr
                // console.log('FECHA- ', lastmov);
                if (vr != undefined){   //agregado por jjr
                    modalLoading('S');
                    let par = `
                    [{
                        "pjtId"           : "${pjtId}",
                        "verCode"         : "${verNext}",
                        "discount"        : "${discount}",
                        "lastmov"        : "${lastmov}"
                    }]`;
                    var pagina = 'ProjectDetails/SaveBudgetAs';
                    var tipo = 'html';
                    var selector = putSaveBudgetAs;
                    fillField(pagina, par, tipo, selector);
                } else{
                    alert('No tienes una version creada, ' + 
                            'debes crear en el modulo de cotizaciones');
                }
            }
        });

    // Edita los datos del proyecto
    $('#btnEditProject')
        .unbind('click')
        .on('click', function () {
            let pjtId = $('.projectInformation').attr('data-project');
            editProject(pjtId);
        });

    // Agrega nueva cotización
    $('.toSave')
        .unbind('click')
        .on('click', function () {
            let pjtId = $('.version_current').attr('data-project');
            let verId = $('.version_current').attr('data-version');
            cancelProject(pjtId, verId);  // comentado por jjr
            // promoteProject(pjtId, verId);  // agregado por jjr
        });
    // Imprime la cotización en pantalla
    $('.toPrint')
        .unbind('click')
        .on('click', function () {
            let verId = $('.version_current').attr('data-version');
            let pjtId = $('.version_current').attr('data-project');
            printBudget(verId);
        });

    // Busca los elementos que coincidan con lo escrito el input de cliente y poyecto
    $('.inputSearch')
        .unbind('keyup')
        .on('keyup', function () {
            let id = $(this);
            let obj = id.parents('.finder__box').attr('id');
            let txt = id.val().toUpperCase();
            sel_items(txt, obj);
        });

    $('.cleanInput')
        .unbind('click')
        .on('click', function () {
            let id = $(this).parents('.finder__box').children('.invoiceInput');
            id.val('');
            id.trigger('keyup');
        });

    // Limpiar la pantalla
    $('#newQuote')
        .unbind('click')
        .on('click', function () {
            window.location = 'ProjectDetails';
        });

    // Abre el modal de comentarios
    $('.sidebar__comments .toComment')
        .unbind('click')
        .on('click', function () {
            showModalComments();
        });

    expandCollapseSection();
}

function expandCollapseSection() {
    if (viewStatus == 'C') {
        $('.showColumns').addClass('rotate180');
        $('.coltrip').hide().children('.input_invoice').attr('disable', 'true');
        $('.coltest').hide().children('.input_invoice').attr('disable', 'true');
        $('.showColumns')
            .parents('table')
            .removeAttr('class')
            .addClass('collapsed');
    } else {
        $('.showColumns').removeClass('rotate180');
        $('.coltrip')
            .show()
            .children('.input_invoice')
            .attr('disable', 'false');
        $('.coltest')
            .show()
            .children('.input_invoice')
            .attr('disable', 'false');
        $('.showColumns')
            .parents('table')
            .removeAttr('class')
            .addClass('expanded');
    }
}

/** OBTENCION DE DATOS */
/**  Obtiene el listado de proyectos */
function getProjects(pjId) {
    swpjt = 0;
    var pagina = 'ProjectDetails/listProjects';
    var par = `[{"pjId":"${pjId}"}]`;
    var tipo = 'json';
    var selector = putProjects;
    fillField(pagina, par, tipo, selector);
}

function getProductsSub(word, dstr, dend) {
    var pagina = 'ProjectDetails/listProductsSub';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de proyectos padre */
function getProjectsParents() {
    swpjt = 0;
    var pagina = 'ProjectDetails/listProjectsParents';
    var par = `[{"pjId":""}]`;
    var tipo = 'json';
    var selector = putProjectsParents;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de clientes */
function getCustomers() {
    var pagina = 'ProjectDetails/listCustomers';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = putCustomers;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene los Id's de los elementos relacionados con la seleccion del cliente */
function getCustomersOwner() {
    var pagina = 'ProjectDetails/listCustomersOwn';
    var par = `[{"cusId":"", "cutId":""}]`;
    var tipo = 'json';
    var selector = putCustomersOwner;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de proyectos */
function getVersion(pjtId) {
    var pagina = 'ProjectDetails/listVersion';
    var par = `[{"pjtId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = putVersion;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de productos */
/* function getProducts(word, dstr, dend) {
    var pagina = 'ProjectDetails/listProducts';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
} */

/**  Obtiene el listado de cotizaciones */
function getBudgets(pjtId, verId) {
    var pagina = 'ProjectDetails/listBudgets';
    var par = `[{"pjtId":"${pjtId}","verId":"${verId}"}]`;
    var tipo = 'json';
    var selector = putBudgets;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de descuentos */
function getDiscounts() {
    var pagina = 'ProjectDetails/listDiscounts';
    var par = `[{"level":"1"}]`;
    var tipo = 'json';
    var selector = putDiscounts;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de relacionados al prducto*/
function getProductsRelated(id, tp, vr,sec) {// *** Ed
    var pagina = 'ProjectDetails/listProductsRelated';
    var par = `[{"prdId":"${id}","type":"${tp}","verId":"${vr}","section":"${sec}"}]`;
    var tipo = 'json';
    console.log(par);
    var selector = putProductsRelated;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de projectos del paquete  */
function getProductsRelatedPk(id, tp, vr, sec) {
    var pagina = 'ProjectDetails/listProductsRelated';
    var par = `[{"prdId":"${id}","type":"${tp}","verId":"${vr}","section":"${sec}"}]`;
    var tipo = 'json';
    var selector = putProductsRelatedPk;
    fillField(pagina, par, tipo, selector);
}

/**  Obtiene el listado de projectos del producto  */
function getStockProjects(prdId) {
    var pagina = 'ProjectDetails/stockProducts';
    var par = `[{"prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putStockProjects;
    fillField(pagina, par, tipo, selector);
}
/** Obtiene el listado de los tipos de proyecto */
function getProjectType() {
    var pagina = 'ProjectDetails/listProjectsType';
    var par = `[{"pjt":""}]`;
    var tipo = 'json';
    var selector = putProjectsType;
    fillField(pagina, par, tipo, selector);
}
/** Obtiene el listado de los tipos de proyecto */
function getProjectTypeCalled() {
    var pagina = 'ProjectDetails/listProjectsTypeCalled';
    var par = `[{"pjt":""}]`;
    var tipo = 'json';
    var selector = putProjectsTypeCalled;
    fillField(pagina, par, tipo, selector);
}
/** Obtiene el listado de los comentarios del proyecto */
function getComments(pjtId) {
    var pagina = 'ProjectDetails/listComments';
    var par = `[{"pjId":"${pjtId}"}]`;
    var tipo = 'json';
    var selector = putComments;
    fillField(pagina, par, tipo, selector);
}

/** Obtiene el listado de los comentarios del proyecto */
function getChangeProd(catsub) {
    var pagina = 'ProjectDetails/listChangeProd';
    var par = `[{"catsub":"${catsub}"}]`;
    var tipo = 'json';
    var selector = putChangeProd;
    fillField(pagina, par, tipo, selector);
}

function getNewProdChg(skuold, skunew) {
    var pagina = 'ProjectDetails/getNewProdChg';
    var par = `[{"skuold":"${skuold}","skunew":"${skunew}"}]`;
    var tipo = 'json';
    var selector = putNewProdChg;
    fillField(pagina, par, tipo, selector);
}

/** Obtiene el conteo productos para subarrendo */
function getCounterPending(pjtvrId, prdId) {
    var pagina = 'ProjectDetails/countPending';
    var par = `[{"pjtvrId":"${pjtvrId}","prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putCounterPending;
    fillField(pagina, par, tipo, selector);
}

function getExistTrip(pjtvrId, prdId) {
    var pagina = 'ProjectDetails/getExistTrip';
    var par = `[{"pjtvrId":"${pjtvrId}","prdId":"${prdId}"}]`;
    var tipo = 'json';
    var selector = putExistTrip;
    fillField(pagina, par, tipo, selector);
}
function getLocationType() {
    var pagina = 'ProjectDetails/getLocationType';
    var par = `[{"prm":""}]`;
    var tipo = 'json';
    var selector = putLocationType;
    fillField(pagina, par, tipo, selector);
}
function getLocationsEdos(prj_id){
    var pagina = 'ProjectDetails/ListLocationsEdos';
    var par = `[{"prj_id":"${prj_id}"}]`;
    var tipo = 'json';
    var selector = putLocationsEdos;
    fillField(pagina, par, tipo, selector);
}
// ** Ed
function getCategories() {
    //console.log('categos');
    var pagina = 'ProjectDetails/listCategories';
    var par = `[{"store":""}]`;
    var tipo = 'json';
    var selector = putCategories;
    fillField(pagina, par, tipo, selector);
}
// ** Ed
function getSubCategories(catId) {
    //console.log(catId);
    var pagina = 'ProjectDetails/listSubCategories';
    var par = `[{"catId":"${catId}"}]`;
    var tipo = 'json';
    var selector = putSubCategories;
    fillField(pagina, par, tipo, selector);
}
/**  Obtiene el listado de productos */
function getProducts(word, dstr, dend) {
    var pagina = 'ProjectDetails/listProducts3';
    var par = `[{"word":"${word}","dstr":"${dstr}","dend":"${dend}"}]`;
    var tipo = 'json';
    var selector = putProducts;
    fillField(pagina, par, tipo, selector);
}

/** LLENA DE DATOS */
/**  Llena el listado de proyectos */

// ** Ed
function putCategories(dt) {
    
    $('#txtCategory').append('');
    if (dt[0].cat_id != 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.cat_id}"> ${u.cat_name}</option>`;
            $('#txtCategory').append(H);
        });

        $('#txtCategory').on('change', function () {
            let catId = $(this).val();
            $('#txtSubCategory').html('');
            $('#txtSubCategory').val('Selecciona la subategoria');
            
            /* NOTA EN EL CAMPO DE PRODUCTOS PARA QUE NO ESCRIBAN */
            // $('#txtProducts').val('     Cargando Informacion . . . .');
            getSubCategories(catId);
            
           
        });
    }
}
// ** Ed
function putSubCategories(dt) {
    //console.log('putSubCategories',dt);
    
    $('#txtSubCategory').append('');
    if (dt[0].sbc_id != 0) {
        let word = $('#txtProductFinder').val();
        let subcatId = $('#txtSubCategory').val();
        $.each(dt, function (v, u) {
            let H = `<option value="${u.sbc_id}" data-code="${u.sbc_code}"> ${u.sbc_name}</option>`;
            $('#txtSubCategory').append(H);
            
        });
        console.log(dt[0].sbc_id);
        getProducts(word,dt[0].sbc_id);
        $('#txtSubCategory').on('change', function () {
            let subcatId = $(this).val();
            getProducts(word,subcatId);
           
        });
    }
}
function putProjects(dt) {
    if (dt[0].pjt_id > 0) {
        proj = dt;
        let valstage='';
        $('.finder_list-projects ul').html('');
        $('.finder_list-projectsParent ul').html('');
        $.each(proj, function (v, u) {

            if (u.pjt_status == 4)
                { valstage='color:#008000'; }
            else if (u.pjt_status == 7)
                { valstage='color:#FFA500'; }
            else
                { valstage='color:#CC0000'; }

            if (u.pjt_status == '3' || u.pjt_status == '4' || u.pjt_status == '7' || u.pjt_status == '8') {
                let H = ` <li id="P${u.pjt_id}" class="alive" data-element="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}|${u.pjt_number}|M${u.pjt_parent}|${u.pjt_name}" style='${valstage}'>${u.pjt_name}</li>`;
                $('.finder_list-projects ul').append(H);
            } else {
                let M = ` <li id="M${u.pjt_id}" class="alive" data-element="${v}|${u.cus_id}|${u.cus_parent}|${u.cuo_id}|${u.pjt_number}|${u.pjt_name}" style='${valstage}'>${u.pjt_name}</li>`;
                $('.finder_list-projectsParent ul').append(M);
            }
        });

        selectorProjects(proj[0].pjId);
        swpjt = 1;
    } else {
        $('.finder_list-projects ul').html('');
        $('.finder_list-projectsParent ul').html('');
    }
}

function putLocationsEdos(dt){
    console.log(dt);
    let tabla = $('#listLocationsTable').DataTable();
    tabla.rows().remove().draw();
    if (dt[0]['loc_id']!=0) {
        $.each(dt, function (v, u) {
            tabla.row
            .add({
                editable: `<i class="fas fa-times-circle kill delete" id ="md${u.lce_id}"></i>`,
                loc:u.lce_location,
                edoRep: u.edos_name,
            })
            .draw();
            $('#md' + u.lce_id)
            .parents('tr')
            .attr('id', u.lce_id);
    
            $('.delete')
            .unbind('click')
            .on('click', function () {
                console.log($(this).parents('tr').attr('id'));
                let locId = $(this).parents('tr').attr('id');
                $('#confirmModal').modal('show');
    
                $('#confirmModalLevel').html('¿Seguro que desea borrar la locacion?');
                $('#N').html('Cancelar');
                $('#confirmButton').html('Borrar locacion').css({display: 'inline'});
                $('#Id').val(locId); 
    
                //   $('#BorrarAlmacenModal').modal('show');
                //$('#IdAlmacenBorrar').val(locId);
    
                $('#confirmButton').on('click', function () {
                    var pagina = 'ProjectDetails/DeleteLocation';
                    var par = `[{"loc_id":"${locId}"}]`;
                    var tipo = 'html';
                    var selector = putDeleteLocation;
                    fillField(pagina, par, tipo, selector); 
                }); 
                //tabla.row($(this).parent('tr')).remove().draw();
            });
        });
    }
    
}
function putDeleteLocation(dt) {
    //getLocationsEdos();
    let tabla = $('#listLocationsTable').DataTable();
     tabla
        .row($(`#${dt}`))
        .remove()
        .draw();
    $('#confirmModal').modal('hide');  
}
/**  Llena el listado de proyectos padre */
function putProjectsParents(dt) {
    proPar = dt;
    $('#txtProjectParent').html('');
    if (dt[0].pjt_id > 0) {
        $.each(dt, function (v, u) {
            let H = `<option value="${u.pjt_id}">${u.pjt_name}</option>`;
            $('#txtProjectParent').append(H);
        });
    }
}

/**  Llena el listado de prductores */
function putCustomers(dt) {
    cust = dt;
    $('.finder_list-customer ul').html('');
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = ` <li id="C${u.cus_id}" class="alive" data-element="${v}|${u.cut_name}|${u.cus_name}">${u.cus_name}</li>`;
            $('.finder_list-customer ul').append(H);
        }
    });
    selectCustomer();
}
/**  Llena el listado de prductores */
function putCustomersOwner(dt) {
    relc = dt;
}

function putExistTrip(dt) {
    theredaytrip = dt[0].existrip;
    // console.log('putExistTrip',theredaytrip)
}

/**  Llena el listado de descuentos */
function putDiscounts(dt) {
    $('#selDiscount').html('');
    $('#selDiscInsr').html('');
    $.each(dt, function (v, u) {
        let H = `<option value="${u.dis_discount}">${u.dis_discount * 100}%</option>`;
        $('#selDiscount').append(H);
        $('#selDiscInsr').append(H);
    });
}

function putLocationType(dt) {
    loct =dt;
/* 
    $('#txtTypeLocationEdt').on('change', function () {
        validator();
    }); */
}

/**  Llena el listado de versiones */
function putVersion(dt) {
    $('.version__list ul').html('');
    if (dt[0].ver_id != 0) {
        $('.version__list-title').html('DOCUMENTOS');
        let firstVersion = '';
        let caret = '';
        $.each(dt, function (v, u) {
            let master =
                u.ver_master == 1 ? '<i class="fas fa-check-circle"></i>' : '';
            if (u.ver_active == 1) {
                firstVersion = u.ver_id;
                caret = '<i class="fas fa-caret-right"></i>';
            } else {
                caret = '';
            }
            let H = `<li id="V${u.ver_id}" data-code="${
                u.ver_code
            }" data-master="${u.ver_master}" data-active="${
                u.ver_active
            }" data-project="${u.pjt_id}" data-discount="${
                u.ver_discount_insured
            }">
                        <span class="element_caret element_caret-master">${master}</span>
                        <span class="element_caret element_caret-active">${caret}</span>
                        <span class="element_code">${u.ver_code}</span>
                        <span class="element_date"> ${moment(u.ver_date).format(
                            'DD-MMM-yyyy'
                        )}</span>
                    </li> `;

            $('.version__list ul').append(H);
        });

        $('.version__list ul li')
            .unbind('click')
            .on('click', function () {
                let version = $(this).attr('id').substring(1, 100);

                let pjtId = $(this).attr('data-project');
                vers = version;

                let versionCode = $(this).data('code');
                let versionId = $(this).attr('id').substring(1, 100);
                let versionMaster = $(this).data('master');
                let versionActive = $(this).data('active');
                let discount = $(this).data('discount');

                $('.version_current')
                    .html('Version: ' + versionCode)
                    .attr('data-version', version)
                    .attr('data-code', versionCode)
                    .attr('data-master', versionMaster)
                    .attr('data-active', versionActive)
                    .attr('data-insured', discount);

                $('#insuDesctoPrc').html(discount * 100 + '<small>%</small>');

                getBudgets(pjtId, versionId);
                showButtonVersion('H');
                showButtonComments('S');
                updateActiveVersion(version);

                if (versionMaster == 1) {
                    interfase = 'MST';
                } else {
                    interfase = 'ACT';
                }
            });

        $('#V' + firstVersion).trigger('click');
    }
}

function updateActiveVersion(verId) {
    $('.element_caret-active').html('');

    let li = $('#V' + verId);
    let caret = li.children('.element_caret-active');
    caret.html('<i class="fas fa-caret-right"></i>');
}
function updateMasterVersion(verId) {
    $('.element_caret-master').html('');

    let li = $('#V' + verId);
    let caret = li.children('.element_caret-master');
    caret.html('<i class="fas fa-check-circle"></i>');
}

function fillProjectsAttached() {
    let idd = $('.version_current').attr('data-project');
    let indx = findIndex(idd, proj);
    let parent = proj[indx].pjt_parent;
    $('.import-sections ul li').remove();
    $.each(proj, function (v, u) {
        if (parent == u.pjt_parent && idd != u.pjt_id) {
            let H = ` <li class="import_project"    data-option="${u.pjt_id}">${u.pjt_name}</li>`;
            $('.import-sections ul').append(H);
        }
    });

    $('.import-sections ul li')
        .unbind('click')
        .on('click', function () {
            let ido = $(this).attr('data-option');
            console.log(ido);
            modalLoading('S');
            let verCurr = lastVersionFinder();

            let vr = parseInt(verCurr.substring(1, 10));

            let verNext = 'P' + refil(vr + 1, 4);

            var par = `[{
                "pjtId"      :   "${idd}",
                "pjtIdo"     :   "${ido}",
                "verCode"    :   "${verNext}"
                }]`;

            var pagina = 'ProjectDetails/importProject';
            var tipo = 'html';
            var selector = putSaveBudgetAs;
            fillField(pagina, par, tipo, selector);
        });
}

/** Llena el listado de los tipos de proyecto */
function putProjectsType(dt) {
    tpprd = dt;
}

/** Llena el listado de los tipos de proyecto */
function putProjectsTypeCalled(dt) {
    tpcall = dt;
}
function selectorProjects(pjId) {
    $('.finder_list-projects ul li')
        .unbind('click')
        .on('click', function () {
            cleanQuoteTable();
            showButtonVersion('H');
            // showButtonToPrint('H');
            // showButtonToSave('H');
            actionSelProject($(this));
            $('.projectfinder').trigger('click');
        });

    $('.finder_list-projectsParent ul li')
        .unbind('click')
        .on('click', function () {
            let pjtParent = $(this).attr('id').substring(1, 10);
            $('.finder_list-projects ul li').removeClass('alive');
            $.each(proj, function (v, u) {
                if (pjtParent == u.pjt_parent) {
                    let pjtId = u.pjt_id;
                    $(`#P${pjtId}`).addClass('alive');
                }
            });
        });
}

var pj = '';
function actionSelProject(obj) {
    let status = obj.attr('class');

    if (status == 'alive') {
        let idSel = obj.parents('.dato');
        let indx = obj.data('element').split('|')[0];
        pj = proj[indx];

        pj.pjt_parent > 0 ? showButtonToImport('S') : showButtonToImport('H');

        $('.panel__name')
            .css({ visibility: 'visible' })
            .children('span')
            .html(pj.pjt_name)
            .attr('data-id', pj.pjt_id)
            .attr('title', pj.pjt_name);
        $('#projectNumber').html(pj.pjt_number);
        $('#projectLocation').html(pj.pjt_location);
        $('#projectPeriod').html(
            `<span>${pj.pjt_date_start} - ${pj.pjt_date_end}</span><i class="fas fa-calendar-alt id="periodcalendar"></i>`
        );
        $('#projectLocationType').html(pj.loc_type_location);
        $('#projectType').html(pj.pjttp_name);

        fillProducer(pj.cus_parent);
        getVersion(pj.pjt_id);
        getExistTrip('1', pj.pjt_id);
        // getCalendarPeriods(pj);

        $('.version_current').attr('data-project', pj.pjt_id);
        $('.projectInformation').attr('data-project', pj.pjt_id);

        $.each(cust, function (v, u) {
            if (u.cus_id == pj.cus_id) {
                $('#CustomerName').html(u.cus_name);
                $('#CustomerType').html(`<span>${u.cut_name}</span>`);
                $('#CustomerAddress').html(u.cus_address);
                $('#CustomerEmail').html(u.cus_email);
                $('#CustomerPhone').html(u.cus_phone);
                $('#CustomerQualification').html(u.cus_qualificaton);
            }
        });

        $('.invoice_controlPanel .addSection').css({ visibility: 'visible' });
    }
}

function getCalendarPeriods() {
    let fecha = moment(Date()).format('DD/MM/YYYY');

    $('#projectPeriod').daterangepicker(
        {
            showDropdowns: true,
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom',
                weekLabel: 'W',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                monthNames: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre',
                ],
                firstDay: 1,
            },
            showCustomRangeLabel: false,
            singleDatePicker: false,
            startDate: fecha,
            endDate: fecha,
            minDate: fecha,
            opens: 'left',
        },
        function (start, end, label) {
            $('#projectPeriod span').html(
                start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY')
            );
            let projDateStart = start.format('YYYYMMDD');
            let projDateEnd = end.format('YYYYMMDD');

            let par = `
        [{
            "pjtDateStart"  : "${projDateStart}",
            "pjtDateEnd"    : "${projDateEnd}",
            "pjtId"         : "${pj.pjt_id}"
        }]
        `;
            var pagina = 'ProjectDetails/UpdatePeriodProject';
            var tipo = 'html';
            var selector = SetUpdatePeriodProject;
            fillField(pagina, par, tipo, selector);
        }
    );
}

function SetUpdatePeriodProject(dt) {
    let topDays = getDaysPeriod();
    $('.invoice__box-table table tbody tr.budgetRow').each(function (v) {
        let tr = $(this);
        let bdgDaysBase = tr
            .children('td.daysBase')
            .children('.input_invoice')
            .val();
        if (bdgDaysBase > topDays) {
            tr.children('td.daysBase').children('.input_invoice').val(topDays);
        }
    });

    updateTotals();
    showButtonVersion('S');
}

function selectCustomer() {
    $('.finder_list-customer ul li')
        .unbind('click')
        .on('click', function () {
            let idSel = $(this).parents('.dato');
            let indx = $(this).data('element').split('|')[0];
            let type = $(this).data('element').split('|')[1];
            let cs = cust[indx];

            $('#CustomerName').html(cs.cus_name);
            $('.finder_list-projects ul li').removeClass('alive');
            $('.finder_list-projectsParent ul li').removeClass('alive');
            $.each(proj, function (v, u) {
                if (cs.cus_id == u.cus_id) {
                    let pjtId = u.pjt_id;
                    $(`#P${pjtId}`).addClass('alive');
                    $(`#M${pjtId}`).addClass('alive');
                }
            });
        });
}

function fillProducer(cusId) {
    $.each(cust, function (v, u) {
        if (u.cus_id == cusId) {
            $('#CustomerProducer').html(u.cus_name);
        }
    });
}

// Muestra el listado de productos disponibles para su seleccion en la cotización
function showListProducts(item) {
   
    $('.invoice__section-products').fadeIn('slow');

    $('.productos__box-table').attr('data-section', item);
    $('.invoice__section-products').draggable({
        handle: ".modal__header"
    });
    $('#txtProductFinder')
        .unbind('keyup')
        .on('keyup', function () {
            let text = $(this).val().toUpperCase();
            selProduct(text);
        });

    $('.close_listProducts')
        .unbind('click')
        .on('click', function () {
            $('.invoice__section-products').fadeOut(400, function () {
                $('#listProductsTable table tbody').html('');
                $('#txtProductFinder').val('');
                limpiar_form();
            });
        });
        $('#LimpiarFormulario').unbind('click')
        .on('click', function () {
            limpiar_form();
        });
}

function limpiar_form(){
    $('#txtProductFinder').val('');
    $('#txtCategory').val(0);
    $('#txtSubCategory').val(0);
    getProducts('', 0);
}

/** ++++++ Selecciona los productos del listado */
function selProduct(res) {
    res = res.toUpperCase();
    let rowCurr = $('#listProductsTable table tbody tr');
    let hearCnt = $('#listProductsTable table tbody tr th');
    
    let sub_id = $('#txtSubCategory').val();

    if (res.length > 0) {
        let dstr = 0;
        let dend = 0;
        if (res.length == 1) {
            $('.toCharge').removeClass('hide-items');  //jjr
            if (glbSec != 4) {  //IF agragado por jjr
                // console.log('Normal');
                //getProducts(res.toUpperCase(), dstr, dend);
                getProducts(res.toUpperCase(), sub_id);
            } else {
                console.log('Subarrendo');
                getProductsSub(res.toUpperCase(), dstr, dend);
            }
        } else {
            rowCurr.css({ display: 'none' });
            rowCurr.each(function (index) {
                var cm = $(this)
                    .data('element')
                    .toUpperCase()
                    .replace(/|/g, '');

                cm = omitirAcentos(cm);
                var cr = cm.indexOf(res);
                if (cr > -1) {
                    $(this).show();
                }
            });
        }
        // rowCurr.show();
    } else {
        $(`#listProductsTable table tbody`).html('');
        rowCurr.addClass('oculto');
    }
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

function putProducts(dt) {
    prod = dt;
    $('#listProductsTable table tbody').html('');
    if (dt[0].prd_id>0){  // agregado por jjr
    $.each(dt, function (v, u) {
        let H = `
            <tr data-indx ="${v}" data-element="${u.prd_sku}|${u.prd_name.replace(/"/g, '')}|${u.sbc_name}">
                <th class="col_product" title="${u.prd_name}">
                <div class="elipsis">${u.prd_name}</div></th>
                <td class="col_quantity">${u.stock}</td>
                <td class="col_type">${u.prd_level}</td>
                <td class="col_category">${u.sbc_name}</td>
                <td class="col_category">${u.prd_price}</td>
            </tr> `;
        $('#listProductsTable table tbody').append(H);
    });
    }
    $('.toCharge').addClass('hide-items');   //jjr

    $('#listProductsTable table tbody tr')
        // .unbind('click')
        .on('click', function () {
            // console.log('Click Producto');
            let inx = $(this).attr('data-indx');
            fillBudget(prod[inx], vers, inx);
        });
}

function fillBudget(pr, vr, ix) {
    // console.log(ix);
    let nRows = $(`#listProductsTable table tbody tr`).length;
    loadBudget(ix, nRows);
}

function loadBudget(inx, bdgId) {
    // console.log('loadBudget',prod[inx], 'INX', inx);
    let insurance = prod[inx].prd_insured == 0 ? 0 : 0.1;
    let produ = prod[inx].prd_name.replace(/\"/g, '°').replace(/\,/g, '^').replace(/\'/g, '¿');
    let subct = prod[inx].sbc_name.replace(/\"/g, '°').replace(/\,/g, '^');
    let days = getDaysPeriod();
    let section = $('.productos__box-table')
        .attr('data-section')
        .substring(2, 5);
    let pjtId = $('.version_current').attr('data-project');
    let verId = $('.version_current').attr('data-version');
    let order = 0;

    let par = `{
        "pjtvr_id"                  : "0",
        "pjtvr_prod_sku"            : "${prod[inx].prd_sku}",
        "pjtvr_prod_name"           : "${produ}",
        "pjtvr_prod_price"          : "${prod[inx].prd_price}",
        "pjtvr_quantity"            : "1",
        "pjtvr_days_base"           : "${days}",
        "pjtvr_days_cost"           : "${days}",
        "pjtvr_discount_base"       : "0",
        "pjtvr_discount_insured"    : "0",
        "pjtvr_days_trip"           : "0",
        "pjtvr_discount_trip"       : "0",
        "pjtvr_days_test"           : "0",
        "pjtvr_discount_test"       : "0",
        "pjtvr_insured"             : "${insurance}",
        "pjtvr_prod_level"          : "${prod[inx].prd_level}",
        "prd_id"                    : "${prod[inx].prd_id}",
        "pjt_id"                    : "${pjtId}",
        "ver_id"                    : "${verId}",
        "pjtvr_stock"               : "${prod[inx].stock}",
        "pjtvr_order"               : "${order}",
        "sbc_name"                  : "${subct}",
        "pjtvr_section"             : "${section}",
        "daybasereal"               : "${days}"
    }
    `;

    let ky = registeredProduct('bdg' + prod[inx].prd_id, section);
    let stus = 'A';
    if (ky == 0) {
        var pagina = 'ProjectDetails/AddProductMice';
        var tipo = 'html';
        var selector = putAddProductMice;
        fillField(pagina, '[' + par + ']', tipo, selector);

        fillBudgetProds(par, days, stus);
    }

    updateTotals();
    showButtonVersion('S');
    // showButtonToPrint('H');
    // showButtonToSave('H');
    reOrdering();
}

function putAddProductMice(dt) {
    $('#bdg0').attr('id', 'bdg' + dt);
}

function registeredProduct(id, section) {  // parametro de section agregado por jjr
    ky = 0;
    
    $('#invoiceTable table tbody tr').each(function () {
        let idp = $(this).attr('id');
        let isec = $(this).attr('data-sect');  // agregado por jjr
        // console.log('Parametros- ', id, section);
        // console.log('Valores THIS- ', idp, isec);
        if (id == idp && section==isec) {  // modificado por jjr
            // console.log('Agrega Cantidad');
            let qty =
                parseInt(
                    $(this)
                        .children('td.col_quantity')
                        .children('.input_invoice')
                        .val()
                ) + 1;
            $(this)
                .children('td.col_quantity')
                .children('.input_invoice')
                .val(qty);
            ky = 1;
        }
    });
    return ky;
}

function putBudgets(dt) {
    // console.log('putBudgets-',dt)
    budg = dt;
    let days = getDaysPeriod();

    $('.budgetRow').remove();

    if (budg[0].pjtvr_id > 0) {
        $.each(budg, function (v, u) {
            let jsn = JSON.stringify(u);
            let stus = 'N';
            fillBudgetProds(jsn, days, stus);
        });
    }
    expandCollapseSection();
    updateTotals();
    sectionShowHide();

    /* $('tbody.sections_products').sortable({
        items: 'tr:not(tr.blocked)',
        cursor: 'pointer',
        axis: 'y',
        dropOnEmpty: false,
        start: function (e, ui) {
            ui.item.addClass('selected');
        },
        stop: function (e, ui) {
            ui.item.removeClass('selected');
            $(this)
                .find('tr')
                .each(function (index) {
                    if (index > 0) {
                        $(this).find('i.move_item').attr('data-order', index);
                    }
                });
            showButtonVersion('S');
            OrderMice(1);
        },
    }); */

    reOrdering();
}

function reOrdering() {
    $('tbody.sections_products')
        .find('tr.budgetRow')
        .each(function (index) {
            // console.log('reOrdering', index);
            if (index >= 0) {
                $(this)
                    .find('i.move_item')
                    .attr('data-order', index + 1);
            }
        });
    OrderMice(0);
}

// *************************************************
// Llena el listado de productos seleccionados
// *************************************************
function fillBudgetProds(jsn, days, stus) {
    let pds = JSON.parse(jsn);
    
    let prdName = pds.pjtvr_prod_name.replace(/°/g, '"').replace(/\^/g, ',').replace(/\¿/g, '\'');
            /* if (u.pjt_status == 4)
            { valstage='color:#008000'; }
            else if (u.pjt_status == 7)
            { valstage='color:#FFA500'; }
            else
            { valstage='color:#CC0000'; }
            console.log(valstage); */
    
    let H = `
    <tr id="bdg${pds.prd_id}" 
        data-sku     = "${pds.pjtvr_prod_sku}" 
        data-status  = "${stus}" 
        data-insured = "${pds.pjtvr_insured}" 
        data-level   = "${pds.pjtvr_prod_level}" 
        data-mice    = "${pds.pjtvr_id}" 
        data-sect    = "${pds.pjtvr_section}"
        class="budgetRow">

    <!-- Nombre del Producto -->
        <th class="wclprod col_product product">
            <i class="fas fa-ellipsis-v move_item" data-order="0"></i>
            <div class="elipsis" title="${prdName}">${prdName}</div>
            <i class = "fas fa-bars menu_product" id="mnu${pds.prd_id}"></i>
        </th>
        
    <!-- Cantidad -->
        <td class="wcldays col_quantity colbase quantityBase">
            <input type="text" class="input_invoice" 
                value="${pds.pjtvr_quantity}" 
                data-real="${pds.pjtvr_quantity}" 
                tabindex=1>
                <div class="col_quantity-led" title=""></div>
        </td>
        
    <!-- Precio -->
        <td class="wclnumb col_price colbase priceBase">
            ${mkn(pds.pjtvr_prod_price, 'n')}</td>
        
    <!-- Dias Base -->
        <td class="wcldays col_days colbase daysBase">
            <input type="text" class="input_invoice" 
                value="${pds.daybasereal}" 
                data-real="${pds.daybasereal}" 
                tabindex=2>
        </td>

    <!-- Dias costo -->
        <td class="wcldays col_days colbase daysCost">
            <input type="text" class="input_invoice" 
                value="${pds.pjtvr_days_cost}" 
                data-real="${pds.pjtvr_days_cost}" 
                tabindex=3>
        </td>

    <!-- Descuento base -->
        <td class="wcldisc col_discount colbase discountBase" 
            data-key="1" 
            data-real="${parseFloat(pds.pjtvr_discount_base) * 100}"
        >
            <i class="fas fa-caret-left selectioncell"></i>
            <span class="discData">
                ${parseFloat(pds.pjtvr_discount_base) * 100}<small>%</small>
            </span>
        </td>

    <!-- Descuento al seguro -->
        <td class="wcldisc col_discount colbase discountInsu" 
            data-key="${pds.pjtvr_insured}" 
            data-real="${parseFloat(pds.pjtvr_discount_insured) * 100}"
        >
            <i class="fas fa-caret-left selectioncell"></i>
            <span class="discData">
                ${parseFloat(pds.pjtvr_discount_insured) * 100}<small>%</small>
            </span>
        </td>


    <!-- Costo base -->
        <td class="wclnumb col_cost colbase costBase">0.00</td>

    <!-- Dias viaje -->
        <td class="wcldays col_days coltrip daysTrip">
            <input type="text" class="input_invoice" 
                value="${pds.pjtvr_days_trip}" 
                data-real="${pds.pjtvr_days_trip}" 
                tabindex=4>
        </td>

    <!-- Descuento viaje -->
        <td class="wcldisc col_discount coltrip discountTrip" 
            data-key="1"     
            data-real="${parseFloat(pds.pjtvr_discount_trip) * 100}"
        >
            <i class="fas fa-caret-left selectioncell"></i>
            <span class="discData">${
                parseFloat(pds.pjtvr_discount_trip) * 100
            }<small>%</small></span>
        </td>
        
    <!-- Costo viaje -->
        <td class="wclnumb col_cost coltrip costTrip">0.00</td>

    <!-- Dias prueba -->
        <td class="wcldays col_days coltest daysTest">
            <input type="text" class="input_invoice" 
                value="${pds.pjtvr_days_test}" 
                data-real="${pds.pjtvr_days_test}" 
                tabindex=5>
        </td>

    <!-- Descuento prueba -->
        <td class="wcldisc col_discount coltest discountTest" 
            data-key="1" 
            data-real="${parseFloat(pds.pjtvr_discount_test) * 100}"
        >
            <i class="fas fa-caret-left selectioncell"></i>
            <span class="discData">
                ${parseFloat(pds.pjtvr_discount_test) * 100}<small>%</small>
            </span>
        </td>
        
    <!-- Costo prueba -->
        <td class="wclnumb col_cost coltest costTest">0.00</td>

    <!-- Boton de expancion -->
        <td class="wclexpn col_caret colcontrol"></td>

    </tr>  
    `;
    $(`#SC${pds.pjtvr_section}`).show();
    $(`#SC${pds.pjtvr_section} tr.lastrow`).before(H);

    stickyTable();
    expandCollapseSection();
    activeInputSelector();

    /******************** Comentarios en la seccion de subarrendos *********************/
    if (pds.comments > 0) { // Agregado por Edna
        $(`#bdg${pds.prd_id} .col_quantity-led`)
            .removeAttr('class')
            .addClass('col_quantity-led col_quantity-comment')
            .attr('title', 'Comentarios al producto');
    }

    getCounterPending(pds.pjtvr_id, pds.prd_id);
}

function putCounterPending(dt) {
    if (dt[0].counter > 0) {
        let word =
            dt[0].counter > 1 ? dt[0].counter + ' productos' : 'Un producto';
        $(`#bdg${dt[0].prd_id} .col_quantity-led`)
            .removeAttr('class')
            .addClass('col_quantity-led col_quantity-pending')
            .attr('title', `${word} en pendiente`);
    }
    purgeInterfase();
}
function putEdosRepublic(dt) {
    // console.log(dt);
    edosRep = dt;
    $.each(edosRep, function (v, u) {
        let H = `<option value="${u.edos_id}">${u.edos_name}</option>`;
        $('#txtEdosRepublic_2').append(H);
    });
}
function activeInputSelector() {
    // Cambia el dato de cantidad y dias de cada celda
    $('.input_invoice')
        .unbind('blur')
        .on('blur', function () {
            updateTotals();
            // showButtonToPrint('H');
            // showButtonToSave('H');

            let bgRows = $('#invoiceTable table tbody tr.budgetRow').length;
            if (bgRows > 0) {
                showButtonVersion('S');
            }
        });

    // Muestra los seletores generales de columna para cantidad, dias y descuentos
    $('.selectionInput')
        .unbind('click')
        .on('click', function () {
            let id = $(this);
            let section = id.attr('class').split(' ')[3];
            let typeSet = id.attr('class').split(' ')[4];

            let posLeft = id.offset().left;
            let posTop = id.offset().top - 20;
            let selector = section;
            let nRows = $(
                '.invoice__box-table table tbody tr.budgetRow'
            ).length;
            if (nRows > 0) {
                if (typeSet == 'inpt') {
                    $('.invoiceMainInput')
                        .unbind('mouseleave')
                        .css({ top: posTop + 'px', left: posLeft + 'px' })
                        .fadeIn(400)
                        .on('mouseleave', function () {
                            $('.invoiceMainInput').fadeOut(400);
                        })
                        .children('.input_invoice')
                        .val('')
                        .unbind('keyup')
                        .on('keyup', function (e) {
                            let data = e.target.value;
                            $(`td.${selector} .input_invoice`).val(data);
                        });
                }
                if (typeSet == 'selt') {
                    $('.invoiceMainSelect')
                        .unbind('mouseleave')
                        .css({ top: posTop + 'px', left: posLeft + 'px' })
                        .fadeIn(400)
                        .on('mouseleave', function () {
                            $('.invoiceMainSelect').fadeOut(400);
                        })
                        .children('.input_invoice')
                        .val('')
                        .unbind('change')
                        .on('change', function (e) {
                            let data = e.target.value;
                            data = data * 100 + '<small>%</small>';
                            $(`td.${selector} .discData`).html(data);
                            $('.invoiceMainSelect').fadeOut(400);

                            $('td.discountInsu').each(function () {
                                let key = parseFloat($(this).data('key'));
                                if (key == 0)
                                    $(this)
                                        .children('.discData')
                                        .html('0<small>%</small>');
                            });
                        });
                }
            }
        });

    // Muestra los selectores de descuento por celda
    $('.selectioncell')
        .unbind('click')
        .on('click', function () {
            let id = $(this);
            let section = id.parent().attr('class').split(' ')[2];

            let posLeft = id.offset().left - 90;
            let posTop = id.offset().top - 80;
            let selector = section;

            $('.invoiceMainSelect')
                .unbind('mouseleave')
                .css({ top: posTop + 'px', left: posLeft + 'px' })
                .fadeIn(400)
                .on('mouseleave', function () {
                    $('.invoiceMainSelect').fadeOut(400);
                })
                .children('.input_invoice')
                .val('')
                .unbind('change')
                .on('change', function (e) {
                    let key = parseFloat(id.parent().data('key'));
                    let data = e.target.value;

                    if (key > 0) {
                        data = data * 100 + '<small>%</small>';
                        id.parent().children('.discData').html(data);
                    }

                    $('.invoiceMainSelect').fadeOut(400);
                });
        });

    let id;
    $('.menu_product')
        .unbind('click')
        .on('click', function () {
            id = $(this);
            let posLeft = id.offset().left - 20;
            let posTop = id.offset().top - 100;
            $('.invoice__menu-products')
                .css({ top: posTop + 'px', left: posLeft + 'px' })
                .fadeIn(400);
        });

    $('.invoice__menu-products')
        .unbind('mouseleave')
        .on('mouseleave', function () {
            $('.invoice__menu-products').fadeOut(400);
        });

    $('.invoice__menu-products ul li')
        .unbind('click')
        .on('click', function () {
            let event = $(this).attr('class');
            let bdgId = id.parents('tr').attr('id');
            let type = id.parents('tr').attr('data-level');
            let sec = id.parents('tr').attr('data-sect');
			let nameProd = id.parents('tr').find('th').eq(0).find('.elipsis').text();// *** Agregado por Ed
            console.log('Sec->',sec,bdgId,type);
            if (type != 'K' && sec =='1') {
                switch (event) {
                    case 'event_killProduct':
                        killProduct(bdgId);
                        break;
                    case 'event_InfoProduct':
                        infoProduct(bdgId, type,sec);// *** Ed
                        break;
                    case 'event_PerdProduct':
                        window.alert('EQUIPO BASE, No se modifican las fechas individuales');
                        // periodProduct(bdgId);
                        break;
                    case 'event_StokProduct':
                        stockProduct(bdgId,nameProd);
                        break;
                    case 'event_ChangePakt':
                        if(type!='K'){
                            window.alert('ESTE NO ES UN PAQUETE');
                            // alert('ESTE NO ES UN PAQUETE');
                        }else{
                            // infoPackage(bdgId, type);
                            // console.log('ESTE SI ES UN PAQUETE');
                        }
                        break;
                    default:
                }
            }
            else if(type != 'K' && sec != '1' )
            {  // agregado por JJR, que hace en caso de PAQUETE ???
                switch (event) {
                    case 'event_killProduct':
                        killProduct(bdgId);
                        break;
                    case 'event_InfoProduct':
                        infoProduct(bdgId, type,sec); // *** Ed
                        break;
                    case 'event_PerdProduct':
                        periodProduct(bdgId,nameProd);
                        break;
                    case 'event_StokProduct':
                        stockProduct(bdgId,nameProd);
                        break;
                    case 'event_ChangePakt':
                        if(type!='K'){
                            window.alert('ESTE NO ES UN PAQUETE');
                        }else{
                            //product_name = nameProd;
                            // infoPackage(bdgId, type);
                            // console.log('ESTE SI ES UN PAQUETE');
                        }
                        break;
                    default:
                }
            }
            else if(type == 'K' && sec == '1' )
            {  // agregado por JJR, que hace en caso de PAQUETE ???
                switch (event) {
                    case 'event_killProduct':
                        killProduct(bdgId);
                        break;
                    case 'event_InfoProduct':
                        infoProduct(bdgId, type,sec); // *** Ed
                        break;
                    case 'event_PerdProduct':
                        /* periodProduct(bdgId);*/
                        break; 
                    case 'event_StokProduct':
                        stockProduct(bdgId,nameProd);
                        break;
                    case 'event_ChangePakt':
                        if(type!='K'){
                            window.alert('ESTE NO ES UN PAQUETE');
                        }else{
                            infoPackage(bdgId, type, sec);
                            // console.log('ESTE SI ES UN PAQUETE');
                        }
                        break;
                    default:
                }
            }
        });
}

// Elimina el registro de la cotizacion
function killProduct(bdgId) {
    // console.log('INICIA KILL');
    let H = `<div class="emergent__warning">
    <p>¿Realmente requieres de borrar este producto?</p>
    <button id="killYes" class="btn btn-primary">Si</button>  
    <button id="killNo" class="btn btn-danger">No</button>  
    </div>`;

    $('body').append(H);

    $('.emergent__warning .btn')
        .unbind('click')
        .on('click', function () {
            let obj = $(this);
            let resp = obj.attr('id');
            if (resp == 'killYes') {
                $('#' + bdgId).fadeOut(500, function () {
                    let pjtId = $('.version_current').attr('data-project');
                    let section = $(this)
                        .parents('tbody')
                        .attr('id')
                        .substring(2, 5);
                    let pid = bdgId.substring(3, 10);
                    updateTotals();
                    showButtonVersion('S');
                    // showButtonToPrint('H');
                    // showButtonToSave('H');
                    updateMice( pjtId, pid, 'pjtvr_quantity_ant', 0, section,  'D' );
                    $('#' + bdgId).remove();
                });
            }
            obj.parent().remove();
        });
}

// Muestra la información del producto seleccionado
function infoProduct(bdgId, type,sec) { // *** Ed
    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#infoProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    // template.show();
    $('.invoice__modal-general .modal__header-concept').html(
        'Informacion de  los Productos Relacionados'
    );
    closeModals();
    setTimeout(() => {
        let verId = $('.version_current').data('version');
        getProductsRelated(bdgId.substring(3, 20), type, verId,sec);
    }, 500);
}

function infoPackage(bdgId, type, sec) {
    setTimeout(() => {
        let verId = $('.version_current').data('version');
        // console.log('Dat-Info-',bdgId.substring(3, 20), type, verId);
        getProductsRelatedPk(bdgId.substring(3, 20), type, verId, sec); //*** Faltaria hacer lo mismo que con el resto de productos */
    }, 500);
}

function infoDetallePkt(lcatsub) {
    setTimeout(() => {
        // console.log('infoDetallePkt-'lcatsub);
        getChangeProd(lcatsub);
    }, 500);
    
}

// Muestra la información de productos relacionados
function putProductsRelated(dt) {
    console.log('putProductsRelated',dt);
    $('.invoice__modal-general table tbody').html('');
    $.each(dt, function (v, u) {
        let levelProduct = u.prd_level == 'P' ? 'class="levelProd"' : '';
        let prodSku =
            u.pjtdt_prod_sku == '' ? '' : u.pjtdt_prod_sku.toUpperCase();
        let pending = prodSku == 'PENDIENTE' ? 'pending' : 'free';
		let sku_prod = u.pjtdt_prod_sku;
        let skushort;
        if (sku_prod=='Pendiente') {
            skushort = 'No Existe Serie';
        }else{
            skushort=u.pjtdt_prod_sku.substring(0,7);
        }
        let prod_sku= prodSku == 'PENDIENTE' ? 'SIN SERIE': u.pjtdt_prod_sku.toUpperCase();
        		  
        if (u.prd_level != 'K') {
            let H = `
            <tr ${levelProduct}>
                <td>${skushort}</td>
                <td><span class="${pending}">${prod_sku}</span></td>
                <td>${u.prd_level}</td>
                <td>${u.prd_name}</td>
                <td>${u.cat_name}</td>
                <td>${u.ser_comments}</td>
            </tr>
           
        `;
            $('.invoice__modal-general table tbody').append(H);
        }
    });
    $(`.invoice__modal-general table`).sticky({
        top: 'thead tr:first-child',
    });
}
function putProductsRelatedSons(dt, pr) {
    /* let H = '';
    $.each(dt, function (v, u) {
        if (u.prd_parent == pr) {
            let levelProduct =
                u.prd_level == 'A' ? 'class="levelAccesory"' : '';
            let prodSku =
                u.pjtdt_prod_sku == '' ? '' : u.pjtdt_prod_sku.toUpperCase();
            let pending = prodSku == 'PENDIENTE' ? 'pending' : 'free';
            H += `
            <tr >
                <td>${u.prd_sku}</td>
                <td><span class="${pending}">${u.pjtdt_prod_sku.toUpperCase()}</span></td>
                <td>${u.prd_level}</td>
                <td ${levelProduct} >${u.prd_name}</td>
                <td>${u.cat_name}</td>
            </tr>
            `;
        }
    });
    return H; */
}

function settingChangeSerie(){
    // console.log('settingChangeSerie');
    $('#ChangeSerieModal').removeClass('overlay_hide');

    $('#tblChangeSerie').DataTable({
        bDestroy: true,
        order: [[1, 'asc']],
        lengthMenu: [
            [50, 100, -1],
            [50, 100, 'Todos'],
        ],
        pagingType: 'simple_numbers',
        language: {
            url: 'app/assets/lib/dataTable/spanish.json',
        },
        scrollY: 'calc(100vh - 290px)',
        scrollX: true,
        fixedHeader: true,
        columns: [
            {data: 'serchange', class: 'edit'},
            {data: 'serdetsku', class: 'sku left'},
            {data: 'serchoose', class: 'sku'},
            {data: 'serdetname', class: 'supply left'},
            {data: 'serdetstag', class: 'sku'},
        ],
    });

    $('#ChangeSerieModal .btn_close')
        .unbind('click')
        .on('click', function () {
            // console.log('Click Close 1');
           $('.overlay_background').addClass('overlay_hide');
           $('.overlay_closer .title').html('');
           $('#tblChangeSerie').DataTable().destroy;
        });
}

function putProductsRelatedPk(dt){
 
    // console.log('putProductsRelatedPk', dt);
    settingChangeSerie();
    let tabla = $('#tblChangeSerie').DataTable();
    $('.overlay_closer .title').html(`PRODUCTOS A CAMBIAR : ${dt[0].prd_name} - ${dt[0].pjtdt_prod_sku}`);
    tabla.rows().remove().draw();
    $.each(dt, function (v, u) {
        let levelProduct = u.prd_level == 'P' ? 'class="levelProd"' : '';
        let cat=u.prd_sku.substring(0,2);
        let catsub=u.pjtdt_prod_sku.substring(0,4);
        let locsku=u.pjtdt_prod_sku.substring(0,7);
        // console.log('CATSUB-',catsub);
        let valicon='';

        if(catsub=='010N' || catsub=='010S' || catsub=='010P'){
        valicon=`<i class='fas fa-edit changePk' data_cat="${catsub}" data_sku="${locsku}" ></i>`
        tabla.row
            .add({
                serchange: u.prd_id,
                serdetsku: locsku,
                serchoose: u.prd_level,
                serdetname: u.prd_name,
                serdetstag: valicon,
            })
            .draw();
            // $(`#${u.pjt_id}`).parents('tr').attr('data_cat', catsub, 'data_sku', gblsku);
        }else{
           tabla.row
            .add({
                serchange: u.prd_id,
                serdetsku: u.prd_sku,
                serchoose: u.prd_level,
                serdetname: u.prd_name,
                serdetstag: valicon,
            })
            .draw();
            // $(`#${u.pjt_id}`).parents('tr').attr('data_cat', catsub, 'data_sku', gblsku);
        } 
    });

  /*   $(`.invoice__modal-general table`).sticky({
        top: 'thead tr:first-child',
    }); */
    ActiveChangePKT();

}

function ActiveChangePKT(){
    $('.changePk')
    .unbind('click')
    .on('click', function () {
        let id = $(this).attr('data_cat');
        gblsku = $(this).attr('data_sku');
        let lcatsub=id;
        // console.log('THIS-', lcatsub, gblsku);
        // settingProdChg();
        $('#SerieData').removeClass('overlay_hide');

            $('#SerieData .btn_close')
                .unbind('click')
                .on('click', function () {
                    // console.log('Click Close 2');
                    $('#SerieData').addClass('overlay_hide');
                    $('#tblDataChg').DataTable().destroy;
                });

        infoDetallePkt(lcatsub);
        // alert('Seleccion de Producto a cambiar ' + lcatsub + ' disponible');
    });
}

function settingProdChg(){
    $('#SerieData').removeClass('overlay_hide');
    $('#tblDataChg').DataTable({
        order: [[1, 'asc']],
        dom: 'Blfrtip',
        bDestroy: true,
        lengthMenu: [
            [50, 100, -1],
            [50, 100, 'Todos'],
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
            {data: 'seriesku', class: 'sku left'},
            {data: 'sername', class: 'supply left'},
            {data: 'stock', class: 'supply left'},
        ],
    });
}

function putChangeProd(dt) {
    // console.log('putChangeProd',dt);
    settingProdChg();
    
    let tablaChg = $('#tblDataChg').DataTable();
    $('#SerieData .overlay_closer .title').html(`LISTA DE PRODUCTOS DISPONIBLES :`);
    tablaChg.rows().remove().draw();
    if (dt[0].prd_id > 0) {
        $.each(dt, function (v, u) {
            // console.log(u);
            tablaChg.row
             .add({
                 sermodif: `<i class="fas fa-edit toChange" id="${u.prd_id}" sku_original="${u.prd_sku}"></i>`,
                 seriesku: u.prd_sku,
                 sername: u.prd_name,
                 stock: u.stock,
             })
             .draw();
        //  $(`#${u.pjt_id}`).parents('tr').attr('id',u.pjt_id);
        });
        ApplyChangePKT();
    }
}


function ApplyChangePKT(){
    $('.toChange')
    .unbind('click')
    .on('click', function () {
        // console.log($(this));
        let skuold=gblsku;
        let skunew = $(this).attr('sku_original');
        // console.log('Val--',skuold, skunew);
        getNewProdChg(skuold, skunew);

    });
}

function putNewProdChg(dt) {
    console.log('putNewProdChg',dt);
    // $('#ChangeSerieModal .overlay_background').addClass('overlay_hide');
    // $('#ChangeSerieModal tblChangeSerie').DataTable().destroy;
    $('.overlay_background').addClass('overlay_hide');
    $('.overlay_closer .title').html('');
    $('#tblChangeSerie').DataTable().destroy;
}

// Muestra el inventario de productos
function stockProduct(bdgId,nameProd) {
    getStockProjects(bdgId.substring(3, 20));

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#stockProductTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept')
        .html('inventarios del producto: '+nameProd);
    closeModals();
}
function putStockProjects(dt) {
    $('.invoice__modal-general table tbody').html('');
    if (dt[0].prd_name != 0) {
        $.each(dt, function (v, u) {
            let empty =
                u.pjtdt_prod_sku.toUpperCase() == 'PENDIENTE'
                    ? u.pjtdt_prod_sku.toUpperCase()
                    : '';
            let pending =
                u.pjtdt_prod_sku.toUpperCase() == 'PENDIENTE' ? 'pending' : '';
            let situation =
                u.ser_situation != 'D'
                    ? 'class="levelSituation rw' + pending + '"'
                    : 'class="rw' + pending + '"';
            let H = `
            <tr ${situation}>
                <td><span class="${pending}">${empty}</span></td>
                <td>${u.ser_sku}</td>
                <td>${u.ser_serial_number}</td>
                <td>${u.ser_situation}</td> 
                <td>${u.pjt_name}</td>
                <td>${u.pjtpd_day_start}</td>
                <td>${u.pjtpd_day_end}</td>
            </tr>
        `;
            $('.invoice__modal-general table tbody').append(H);
        });
    }

    $(`.invoice__modal-general table`).sticky({
        top: 'thead tr:first-child',
    });
}

// Edita los datos del proyecto
function editProject(pjtId) {
    let inx = findIndex(pjtId, proj);
    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#dataProjectTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept')
        .html('Edición de datos del proyecto');
    closeModals();
    fillContent();
    fillData(inx);
}

function fillContent() {
    // configura el calendario de seleccion de periodos
    let fecha = moment(Date()).format('DD/MM/YYYY');

    $('#calendar').daterangepicker(
        {
            autoApply: true,
            locale: {
                format: 'DD/MM/YYYY',
                separator: ' - ',
                applyLabel: 'Apply',
                cancelLabel: 'Cancel',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom',
                weekLabel: 'W',
                daysOfWeek: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                monthNames: [
                    'Enero',
                    'Febrero',
                    'Marzo',
                    'Abril',
                    'Mayo',
                    'Junio',
                    'Julio',
                    'Agosto',
                    'Septiembre',
                    'Octubre',
                    'Noviembre',
                    'Diciembre',
                ],
                firstDay: 1,
            },
            showCustomRangeLabel: false,
            singleDatePicker: false,
            startDate: fecha,
            endDate: fecha,
            minDate: fecha,
        },
        function (start, end, label) {
            $('#txtPeriodProjectEdt').val(
                start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY')
            );
            looseAlert($('#txtPeriodProjectEdt').parent());
        }
    );
    // Llena el selector de tipo de proyecto
    $.each(tpprd, function (v, u) {
        let H = `<option value="${u.pjttp_id}"> ${u.pjttp_name}</option>`;
        $('#txtTypeProjectEdt').append(H);
    });
    $.each(loct, function (v, u) {
        let H = `<option value="${u.loc_id}">${u.loc_type_location}</option>`;
        $('#txtTypeLocationEdt').append(H);
    });
    // Llena el selector de tipo de llamados
    $.each(tpcall, function (v, u) {
        let H = `<option value="${u.pjttc_id}"> ${u.pjttc_name}</option>`;
        $('#txtTypeCalled').append(H);
    });
    // Llena el selector de clientes
    $.each(cust, function (v, u) {
        if (u.cut_id == 1) {
            let H = `<option value="${u.cus_id}"> ${u.cus_name}</option>`;
            $('#txtCustomerEdt').append(H);
        }
    });
    // Llena el selector de relacion de clientes
    $.each(cust, function (v, u) {
        if (u.cut_id == 2) {
            let H = `<option value="${u.cus_id}"> ${u.cus_name}</option>`;
            $('#txtCustomerRelEdt').append(H);
        }
    });

    $('.textbox')
        .unbind('focus')
        .on('focus', function () {
            let group = $(this).parent();
            looseAlert(group);
        });
}

function fillData(inx) {
    $('.textbox__result').show();
    $('.project__selection').hide();

    let pj = proj;
    $('#txtProjectIdEdt').val(pj[inx].pjt_id);
    $('#txtProjectEdt').val(pj[inx].pjt_name);
    $('#txtPeriodProjectEdt').val(
        pj[inx].pjt_date_start + ' - ' + pj[inx].pjt_date_end
    );
    $('#txtTimeProject').val(pj[inx].pjt_time);
    $('#txtLocationEdt').val(pj[inx].pjt_location);
    $('#txtCustomerOwnerEdt').val(pj[inx].cuo_id);
    $(`#txtTypeProjectEdt option[value = "${pj[inx].pjttp_id}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtTypeLocationEdt option[value = "${pj[inx].loc_id}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtCustomerEdt option[value = "${pj[inx].cus_id}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtCustomerRelEdt option[value = "${pj[inx].cus_parent}"]`).attr(
        'selected',
        'selected'
    );
    $(`#txtTypeCalled option[value = "${pj[inx].pjttc_id}"]`).attr(
        'selected',
        'selected'
    );
    $('#txtHowRequired').val(pj[inx].pjt_how_required);
    $('#txtTripGo').val(pj[inx].pjt_trip_go);
    $('#txtTripBack').val(pj[inx].pjt_trip_back);
    $('#txtCarryOn').val(pj[inx].pjt_to_carry_on);
    $('#txtCarryOut').val(pj[inx].pjt_to_carry_out);
    $('#txtTestTecnic').val(pj[inx].pjt_test_tecnic);
    $('#txtTestLook').val(pj[inx].pjt_test_look);

    $('#saveProject')
        .html('Guardar cambios')
        .removeAttr('class')
        .addClass('bn btn-ok update');

        if (pj[inx].loc_id == 2 || pj[inx].loc_id == 4){
            /* $('#txtEdosRepublic').parents('tr').removeAttr('class'); */
            $('#txtTripGo').parents('tr').removeAttr('class');
            $('#txtTripBack').parents('tr').removeAttr('class');
            $('#seeLocation').parents('tr').removeAttr('class');
            add = 2;
            //$('#btn_save_locations').addClass('hide');
            
        }
             // $('#txtEdosRepublic').parents('tr').removeAttr('class');
            $('#txtTripGo').parents('tr').removeAttr('class');
            $('#txtTripBack').parents('tr').removeAttr('class');
    
            $('#txtTypeLocationEdt')
            .unbind('change')
            .on('change', function () {
            let selectiontl = $(this).val();
            if (selectiontl == 2 || selectiontl == 4) {
                //console.log('Foraneo');
                /* $('#txtEdosRepublic').parents('tr').removeAttr('class');*/
                $('#txtTripGo').parents('tr').removeAttr('class');
                $('#txtTripBack').parents('tr').removeAttr('class'); 
                $('#txtLocationEdt').parents('tr').addClass('hide');
                $('#seeLocation').parents('tr').removeAttr('class');	
                add = 2;							
                //$('#btn_save_locations').addClass('hide');						
                // $('#txtLocationEdt').val('');
            } else {
                console.log('Otro');
                $('#txtLocationEdt').val('CDMX');
                /* $('#txtEdosRepublic').parents('tr').addClass('hide'); */
                $('#txtTripGo').parents('tr').addClass('hide');
                $('#txtTripBack').parents('tr').addClass('hide');
                $('#seeLocation').parents('tr').addClass('hide');	
                // $(`#txtTypeLocationEdt option[value = "1"]`).attr(
                //     'selected',
                //     'selected'
                // );
            }
        });
    let depend = pj[inx].pjt_parent;
    let boxDepend = depend != '0' ? 'PROYECTO ADJUNTO' : 'PROYECTO UNICO';

    $(`#resProjectDepend`).html(boxDepend);

    let selection = pj[inx].pjt_parent;
    if (selection == 1) {
        $('#txtProjectParent').parents('tr').removeAttr('class');
        $(`#txtProjectParent option[value = "${selection}"]`).attr(
            'selected',
            'selected'
        );
        let parent = '';
        $.each(proPar, function (v, u) {
            if (pj[inx].pjt_parent == u.pjt_id) {
                parent = u.pjt_name;
            }
        });
        $('#resProjectParent').html(parent);
    } else {
        $('#txtProjectParent').parents('tr').addClass('hide');
        $(`#txtProjectParent option[value = "0"]`).attr('selected', 'selected');
    }
    $('#seeLocation')
    .html('Ver Locación')
    .removeAttr('class')
    .addClass('bn btn-ok insert');

    $('#seeLocation')
        .unbind('click')
        .on('click', function(){
            let prj_id = $('#txtProjectIdEdt').val();
            settingTable();
            getLocationsEdos(prj_id);
            
        });
    $('#saveProject.update')
        .unbind('click')
        .on('click', function () {
            let ky = validatorFields($('#formProject'));
            if (ky == 0) {
                let projId = $('#txtProjectIdEdt').val();
                let projName = $('#txtProjectEdt').val();
                let projLocation = $('#txtLocationEdt').val();
                let cuoId = $('#txtCustomerOwnerEdt').val();
                let projLocationTypeValue = $(
                    '#txtTypeLocationEdt option:selected'
                ).val();
                let projPeriod = $('#txtPeriodProjectEdt').val();
                let projTime = $('#txtTimeProject').val();
                let projType = $('#txtTypeProjectEdt option:selected').val();
                let projTypeCalled = $('#txtTypeCalled option:selected').val();
                let cusCte = $('#txtCustomerEdt option:selected').val();
                let cusCteRel = $('#txtCustomerRelEdt option:selected').val();
                let howRequired = $('#txtHowRequired').val();
                let tripGo = $('#txtTripGo').val();
                let tripBack = $('#txtTripBack').val();
                let toCarryOn = $('#txtCarryOn').val();
                let toCarryOut = $('#txtCarryOut').val();
                let testTecnic = $('#txtTestTecnic').val();
                let testLook = $('#txtTestLook').val();

                let projDateStart = moment(
                    projPeriod.split(' - ')[0],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');
                let projDateEnd = moment(
                    projPeriod.split(' - ')[1],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');

                let par = `
                [{
                    "projId"         : "${projId}",
                    "pjtName"        : "${projName.toUpperCase()}",
                    "pjtLocation"    : "${projLocation.toUpperCase()}",
                    "pjtDateStart"   : "${projDateStart}",
                    "pjtDateEnd"     : "${projDateEnd}",
                    "pjtTime"        : "${projTime}",
                    "pjtType"        : "${projType}",
                    "locId"          : "${projLocationTypeValue}",
                    "cuoId"          : "${cuoId}",
                    "cusId"          : "${cusCte}",
                    "cusParent"      : "${cusCteRel}",
                    "pjttcId"        : "${projTypeCalled}",
                    "pjtHowRequired" : "${howRequired.toUpperCase()}",
                    "pjtTripGo"      : "${tripGo}",
                    "pjtTripBack"    : "${tripBack}",
                    "pjtToCarryOn"   : "${toCarryOn}",
                    "pjtToCarryOut"  : "${toCarryOut}",
                    "pjtTestTecnic"  : "${testTecnic}",
                    "pjtTestLook"    : "${testLook}"
                }]
                `;

                var pagina = 'ProjectDetails/UpdateProject';
                var tipo = 'html';
                var selector = loadProject;
                fillField(pagina, par, tipo, selector);
            }
        });
}
function settingTable(){
        $('#addLocationModal').removeClass('overlay_hide');

        $('#addLocationEdos')
        .unbind('click')
        .on('click', function () {
            putLocations();
        });

        $('#listLocationsTable').DataTable({
            bDestroy: true,
            lengthMenu: [
                [50, 100, -1],
                [50, 100, 'Todos'],
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
                { data: 'loc', class: 'product-name' },
                { data: 'edoRep', class: 'sku' },
            ],
        });
        
        $('#addLocationModal .btn_close')
            .unbind('click')
            .on('click', function () {
                $('#addLocationModal').addClass('overlay_hide');
                
            }); 

        $('#btn_save_locations')
        .unbind('click')
        .on('click', function (){
            $('#listLocationsTable tbody tr').each(function (v, u) {
                let loc=$($(u).find('td')[1]).text();
                let edo =$(this).attr('id');
                let  aux = $(this).attr('data-content');
                let truk = `${loc}|${edo}`;
                //console.log(truk);
                console.log(aux);
                if(aux == 1){
                    build_data_structure(truk);
                }
            });
        });
}
function putLocations(){ //** AGREGO ED */
    let loc=$('#txtLocationExtra').val();
    let edo =$('#txtEdosRepublic_2').val();
    let name_edo =$(`#txtEdosRepublic_2 option[value="${edo}"]`).text(); // por alguna razon cada que se cierra el modal principal, y se reabre para generar un nuevo proyecto se genera una repeticion de datos
    
    par = `
            [{
                "support"  : "${edo}",
                "loc"       : "${loc}",
                "edoRep"       : "${name_edo}"
            }]`;
    
    console.log(par);
    /* if (add ==2) {
        let prjId = $('#txtProjectIdEdt').val();
        let par = `
        [{
            "loc" :  "${loc}",
            "edo" :  "${edo}",
            "prjId" : "${prjId}"
        }]`;
        //save_exchange(par);
    }else{ */
        
        fill_table(par);
        clean_selectors();
    //}
    

}
function fill_table(par) { //** AGREGO ED */
    let largo = $('#listLocationsTable tbody tr td').html();
    largo == 'Ningún dato disponible en esta tabla' ? $('#listLocationsTable tbody tr').remove() : '';
    par = JSON.parse(par);

    let tabla = $('#listLocationsTable').DataTable();
    
    tabla.row
        .add({
            editable: `<i class="fas fa-times-circle kill" id ="md${par[0].support}"></i>`,
            loc:par[0].loc,
            edoRep: par[0].edoRep,
        })
        .draw();

    $('#md' + par[0].support)
        .parents('tr')
        .attr('id', par[0].support)
        .attr('data-content', 1);

    $('.edit')
    .unbind('click')
    .on('click', function () {
        tabla.row($(this).parent('tr')).remove().draw();
    });

}

function build_data_structure(pr) {
    let el = pr.split('|');
    let par ;
    if (add ==2) {
        let prjId = $('#txtProjectIdEdt').val();
        par = `
        [{
            "loc" :  "${el[0]}",
            "edo" :  "${el[1]}",
            "prjId" : "${prjId}"
        }]`;
        
    }
    console.log(' Antes de Insertar', par);
    save_exchange(par);
}
function save_exchange(pr) {
    //   console.log(pr);
    
    var pagina = 'ProjectDetails/SaveLocations';
    var par = pr;
    var tipo = 'html';
    var selector = exchange_result;
    console.log(par);
    fillField(pagina, par, tipo, selector);
    //console.log(fillField(pagina, par, tipo, selector));
}

function exchange_result(dt) {
    console.log(dt);
    if (add ==1) {
        $('#listLocationsTable').DataTable().destroy; //** Es como si no hiciera caso a esta instruccion */
        $('#addLocationModal').addClass('overlay_hide');
    
    }else{
        let prj_id = $('#txtProjectIdEdt').val();
            
        getLocationsEdos(prj_id);
        clean_selectors();
    }
   
}


function clean_selectors(){  //** AGREGO ED */
    $('#txtLocationExtra').val('');
    $('#txtEdosRepublic_2').val('');
}

function loadProject(dt) {
    $('.finder_list-projects ul').html('');
    getProjects(dt);
    waitShowProject(dt);
    automaticCloseModal();
}

function waitShowProject(pjtId) {
    if (swpjt == 1) {
        let obj = $('#P' + pjtId);
        actionSelProject(obj);
    } else {
        setTimeout(() => {
            waitShowProject(pjtId);
        }, 500);
    }
}

function newProject() {
    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#dataProjectTemplate');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('Captura de datos para un nuevo proyecto');
    $('#saveProject')
        .html('Guardar proyecto')
        .removeAttr('class')
        .addClass('bn btn-ok insert');
    closeModals();
    fillContent();
    actionNewProject();
}
function actionNewProject() {
    $('#saveProject.insert')
        .unbind('click')
        .on('click', function () {
            let ky = validatorFields($('#formProject'));
            if (ky == 0) {
                let projId = $('#txtProjectIdEdt').val();
                let projName = $('#txtProjectEdt').val();
                let projLocation = $('#txtLocationEdt').val();
                // let cuoId = $('#txtCustomerOwnerEdt').val();
                let projLocationTypeValue = $(
                    '#txtTypeLocationEdt option:selected'
                ).val();
                let projPeriod = $('#txtPeriodProjectEdt').val();
                let projType = $('#txtTypeProjectEdt option:selected').val();
                let cusCte = $('#txtCustomerEdt option:selected').val();
                let cusCteRel = $('#txtCustomerRelEdt option:selected').val();

                let projDateStart = moment(
                    projPeriod.split(' - ')[0],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');
                let projDateEnd = moment(
                    projPeriod.split(' - ')[1],
                    'DD/MM/YYYY'
                ).format('YYYYMMDD');

                let cuoId = 0;
                $.each(relc, function (v, u) {
                    if (cusCte == u.cus_id && cusCteRel == u.cus_parent) {
                        cuoId = u.cuo_id;
                    }
                });

                let par = `
                [{
                    "projId"        : "${projId}",
                    "pjtName"       : "${projName.toUpperCase()}",
                    "pjtLocation"   : "${projLocation.toUpperCase()}",
                    "pjtDateStart"  : "${projDateStart}",
                    "pjtDateEnd"    : "${projDateEnd}",
                    "pjtType"       : "${projType}",
                    "locId"         : "${projLocationTypeValue}",
                    "cuoId"         : "${cuoId}",
                    "cusId"         : "${cusCte}",
                    "cusParent"     : "${cusCteRel}"
                }]
                `;
                var pagina = 'ProjectDetails/SaveProject';
                var tipo = 'html';
                var selector = loadProject;
                fillField(pagina, par, tipo, selector);
            }
        });
}

// *************************************************
// Lista los comentarios al proyecto
// *************************************************
function showModalComments() {
    let template = $('#commentsTemplates');
    let pjtId = $('.version_current').attr('data-project');

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('Comentarios');
    closeModals();
    fillComments(pjtId);
}
function fillComments(pjtId) {
    // Agrega nuevo comentario
    $('#newComment')
        .unbind('click')
        .on('click', function () {
            let pjtId = $('.version_current').attr('data-project');

            let comSrc = 'projects';
            let comComment = $('#txtComment').val();

            if (comComment.length > 3) {
                let par = `
                [{
                    "comSrc"        : "${comSrc}",
                    "comComment"    : "${comComment}",
                    "pjtId"         : "${pjtId}"
                }]
                `;
                var pagina = 'ProjectDetails/InsertComment';
                var tipo = 'json';
                var selector = addComment;
                fillField(pagina, par, tipo, selector);
            }
        });

    getComments(pjtId);
}
function putComments(dt) {
    $('.comments__list').html('');
    if (dt[0].com_id > 0) {
        $.each(dt, function (v, u) {
            fillCommnetElements(u);
        });
    }
}
function fillCommnetElements(u) {
    let H = `
        <div class="comment__group">
            <div class="comment__box comment__box-date"><i class="far fa-clock"></i>${u.com_date}</div>
            <div class="comment__box comment__box-text">${u.com_comment}</div>
            <div class="comment__box comment__box-user">${u.com_user}</div>
        </div>
    `;

    $('.comments__list').prepend(H);
}

function addComment(dt) {
    fillCommnetElements(dt[0]);
    $('#txtComment').val('');
}

function lastVersionFinder() {
    let lstversion = [];

    $('.version__list ul li').each(function () {
        lstversion.push($(this).data('code'));
    });
    let listado = lstversion.sort();
    return listado.sort().reverse()[0];
}

// *************************************************
// imprime la cotización
// *************************************************

function printBudget(verId) {
    let user = Cookies.get('user').split('|');
    let v = verId;
    let u = user[0];
    let n = user[2];
    let h = localStorage.getItem('host');
    if (theredaytrip != 0){ // agregado jjr cambiar impresion c-s
        window.open(
            `${url}app/views/ProjectDetails/ProjectDetailsReport-c-v.php?v=${v}&u=${u}&n=${n}&h=${h}`,
            '_blank'
        );
    } else{
        window.open(
            `${url}app/views/ProjectDetails/ProjectDetailsReport-s-v.php?v=${v}&u=${u}&n=${n}&h=${h}`,
            '_blank'
        );   
    }
}

function putsaveBudget(dt) {
    console.log('putsaveBudget',dt);
    let verId = dt.split('|')[0];
    let pjtId = dt.split('|')[1];
    
    getBudgets(pjtId, verId);
    interfase = 'MST';
    purgeInterfase();
    updateActiveVersion(verId);
    updateMasterVersion(verId);
    getVersion(glbpjtid);
    getExistTrip(verId,pjtId);
    modalLoading('H');
}

// *************************************************
// Guarda la cotización seleccionada
// *************************************************
function putSaveBudgetAs(dt) {
    // console.log(dt);
    let verId = dt.split('|')[0];
    let pjtId = dt.split('|')[1];

    interfase = 'MST';
    // console.log('putSaveBudgetAs-',glbpjtid);
    getVersion(glbpjtid);
    getExistTrip(verId,pjtId);
    modalLoading('H');
}

/**  ++++  Obtiene los días definidos para el proyectos */
function getDaysPeriod() {
    let Period = $('#projectPeriod span').text();
    let start = moment(Period.split(' - ')[0], 'DD/MM/YYYY');
    let end = moment(Period.split(' - ')[1], 'DD/MM/YYYY');
    let days = end.diff(start, 'days') + 1;

    return days;
}

// Da formato a los numero
function mkn(cf, tp) {
    let nm = cf;
    switch (tp) {
        case 'n':
            nm = formato_numero(cf, '2', '.', ',');
            break;
        case 'p':
            nm = formato_numero(cf, '1', '.', ',');
            break;
        default:
    }
    return nm;
}

// Actualiza los totales
function updateTotals() {
    let costbase = 0,
        costtrip = 0,
        costtest = 0,
        costassu = 0,
        totlCost = 0,
        totlPrds = 0;
    $('.budgetRow').each(function (v) {
        let pid = $(this).attr('id');

        let qtybs = parseInt(
            $(this).children('td.quantityBase').children('.input_invoice').val()
        );
        let qtyan = parseInt(
            $(this)
                .children('td.quantityBase')
                .children('.input_invoice')
                .attr('data-quantity')
        );
        let prcbs = parseFloat(
            pure_num($(this).children('td.priceBase').text())
        );
        let dayre = parseInt(
            $(this).children('td.daysBase').children('.input_invoice').val()
        );
        let daybs = parseInt(
            $(this).children('td.daysCost').children('.input_invoice').val()
        );
        let desbs = parseFloat($(this).children('td.discountBase').text());
        let desIn = parseFloat($(this).children('td.discountInsu').text());
        let assur = $(this).attr('data-insured');

        stt01 = qtybs * prcbs; // Importe de cantidad x precio
        stt02 = stt01 * daybs; // Costo de Importe x días base
        stt03 = desbs / 100; // Porcentaje de descuento base
        stt04 = stt02 * stt03; // Costo de Importe x porcentaje descuento base
        cstbs = stt02 - stt04; // Costo base
        costbase += cstbs; // Total de Costo Base

        $(this).children('.costBase').html(mkn(cstbs, 'n'));

        let daytr = parseInt(
            $(this).children('td.daysTrip').children('.input_invoice').val()
        );
        let destr = parseFloat($(this).children('td.discountTrip').text());

        stt05 = stt01 * daytr; // Costo de Importe x dias viaje
        stt06 = destr / 100; // Porcentaje de descuento viaje
        stt07 = stt05 * stt06; // Costo de Importe x porcentaje descuento viaje
        csttr = stt05 - stt07; // Costo viaje
        costtrip += csttr; // Total de Costo Viaje

        $(this).children('.costTrip').html(mkn(csttr, 'n'));

        let dayts = parseInt(
            $(this).children('td.daysTest').children('.input_invoice').val()
        );
        let dests = parseFloat($(this).children('td.discountTest').text());

        stt08 = stt01 * dayts; // Costo de Importe x dias prueba
        stt09 = dests / 100; // Porcentaje de descuento prueba
        stt10 = stt08 * stt09; // Costo de Importe x porcentaje prueba
        cstts = stt08 - stt10; // Costo prueba
        costtest += cstts; // Total de Costo Prueba

        $(this).children('.costTest').html(mkn(cstts, 'n'));

        assre = stt01 * daybs * assur;
        assin = assre * (desIn / 100);

        costassu += assre - assin; //     Total de Seguro

        let prcdscins = parseFloat($('#insuDesctoPrc').html()) / 100;
        desctins = costassu * prcdscins;
        totlPrds++;
    });

    $('#costBase').html(mkn(costbase, 'n'));
    $('#costTrip').html(mkn(costtrip, 'n'));
    $('#costTest').html(mkn(costtest, 'n'));
    $('#insuTotal').html(mkn(costassu, 'n'));
    $('#insuDescto').html(mkn(desctins, 'n'));
    $('#prodTotal').html(mkn(totlPrds, 's'));

    let desctot = costassu - desctins;

    totlCost = costbase + costtrip + costtest + desctot;

    $('#costTotal').html(mkn(totlCost, 'n'));

    getDataMice();
}

/** ***** MUESTRA Y OCULTA BOTONES ******* */
function showButtonVersion(acc) {
    elm = $('.version__button .invoice_button');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function showButtonToPrint(acc) {
    elm = $('.invoice_controlPanel .toPrint');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function showMenuProduct(acc) {
    elm = $('#invoiceTable tbody tr.budgetRow .menu_product');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function showButtonToSave(acc) {
    elm = $('.invoice_controlPanel .toSave');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function showLedPending(acc) {
    elm = $('.col_quantity-pending');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function showButtonToImport(acc) {
    elm = $('.invoice_controlPanel .toImport');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}

function showButtonComments(acc) {
    elm = $('.sidebar__comments .toComment');
    acc == 'S'
        ? elm.css({ visibility: 'visible' })
        : elm.css({ visibility: 'hidden' });
}
function cleanQuoteTable() {
    $('#invoiceTable table tbody.sections_products').each(function () {
        let id = $(this);
        let status = id.css('display');
        if (status == 'table-row-group') {
            id.hide().find('tr.budgetRow').remove();
        }
    });
}
function cleanVersionList() {
    $('.version__list-title').html('');
    $('.version__list ul li').remove();
}
function cleanTotalsArea() {
    $('.sidebar__totals .totals-numbers').html('0.00');
    $('.sidebar__totals .totals-numbers.simple').html('0');
    $('.version_current')
        .html('')
        .attr('data-version', null)
        .attr('data-project', null)
        .attr('data-code', null);
}
/** *************************************************************** */

/** ***** MUESTRA Y OCULTA ELEMENTOS DEL MENU DE SECCIONES ******** */
function sectionShowHide() {
    $('#invoiceTable table tbody.sections_products').each(function () {
        let status = $(this).css('display');
        let id = $(this).attr('id').substring(2, 5);
        if (status == 'table-row-group') {
            $(`.invoice__section .menu-sections li[data-option="${id}"] `).css({
                display: 'none',
            });
        } else {
            $(`.invoice__section .menu-sections li[data-option="${id}"] `).css({
                display: 'block',
            });
        }
    });
}

/** ***** CIERRA MODALES ******* */
function closeModals(table) {
    $('.invoice__modal-general .modal__header .closeModal')
        .unbind('click')
        .on('click', function () {
            automaticCloseModal();
        });
}

function automaticCloseModal() {
    subaccion();
    $('.invoice__modal-general').slideUp(400, function () {
        $('.invoice__modal-general .modal__body').html('');
        $('.invoice__modalBackgound').fadeOut(400);
    });
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

/**  +++ Oculta los elementos del listado que no cumplen con la cadena  */
function sel_items(txt, obj) {
    if (txt.length < 1) {
        $(`#${obj} .finder_list ul li`).css({ display: 'block' });
    } else {
        $(`#${obj} .finder_list ul li`).css({ display: 'none' });
    }

    $(`#${obj} .finder_list ul li`).each(function (index) {
        var cm = $(this).data('element').toUpperCase();

        cm = omitirAcentos(cm);
        var cr = cm.indexOf(txt);
        if (cr > -1) {
            //            alert($(this).children().html())
            $(this).css({ display: 'block' });
        }
    });
}

/** ***** VALIDA EL LLENADO DE LOS CAMPOS ******* */
function validatorFields(frm) {
    let ky = 0;
    frm.find('.required').each(function () {
        if ($(this).val() == '' || $(this).val() == 0) {
            $(this).addClass('textbox-alert');
            $(this)
                .parent()
                .children('.textAlert')
                .css({ visibility: 'visible' });

            ky = 1;
        }
    });
    return ky;
}

/* ************************************************************************ */
/* CANCELA PROYECTO                                                         */
/* ************************************************************************ */
function cancelProject(pjtId, verId) {
    let H = `<div class="emergent__warning">
    <p>¿Realmente requieres de cancelar este proyecto?</p>
    <button id="killYes" class="btn btn-primary">Si</button>  
    <button id="killNo" class="btn btn-danger">No</button>  
    </div>`;

    $('body').append(H);

    $('.emergent__warning .btn').on('click', function () {
        let obj = $(this);
        let resp = obj.attr('id');
        if (resp == 'killYes') {
            modalLoading('S');
            var pagina = 'ProjectDetails/cancelProject';
            var par = `[{"pjtId":"${pjtId}", "verId":"${verId}"}]`;
            var tipo = 'html';
            var selector = showCancelProject;
            fillField(pagina, par, tipo, selector);
        }
        obj.parent().remove();
    });
}
function showCancelProject(dt) {
    setTimeout(() => {
        modalLoading('H');
        setTimeout(() => {
            window.location = 'ProjectDetails';
        }, 1000);
    }, 3000);
}

function cleanFormat() {
    showButtonVersion('H');
    // showButtonToPrint('H');
    // showButtonToSave('H');
    showButtonComments('H');
    cleanQuoteTable();
    cleanVersionList();
    cleanTotalsArea();
}


function getDataMice() {
    let pjtId = $('.version_current').attr('data-project');
    $('.budgetRow').each(function (v) {
        let pid = parseInt($(this).attr('id').substring(3, 10));
        let section = $(this).parents('tbody').attr('id').substring(2, 5);

        /** == Valida la cantidad ================================= */
        let quantity_act = parseInt(
            $(this).children('td.quantityBase').children('.input_invoice').val()
        );
        let quantity_ant = parseInt(
            $(this)
                .children('td.quantityBase')
                .children('.input_invoice')
                .attr('data-real')
        );
        $(this)
            .children('td.quantityBase')
            .children('.input_invoice')
            .attr('data-real', quantity_act);
        if (quantity_act != quantity_ant) {
            updateMice(pjtId, pid,'pjtvr_quantity', quantity_act,section,'U' );
        }

        /** == Valida los días base =============================== */
        let daysBase_act = parseInt(
            $(this).children('td.daysBase').children('.input_invoice').val()
        );
        let daysBase_ant = parseInt(
            $(this)
                .children('td.daysBase')
                .children('.input_invoice')
                .attr('data-real')
        );
        $(this)
            .children('td.daysBase')
            .children('.input_invoice')
            .attr('data-real', daysBase_act);
        if (daysBase_act != daysBase_ant) {
            updateMice(pjtId, pid, 'pjtvr_days_base', daysBase_act, section, 'U' );
        }

        /** == Valida los días costo ============================== */
        let daysCost_act = parseInt(
            $(this).children('td.daysCost').children('.input_invoice').val()
        );
        let daysCost_ant = parseInt(
            $(this)
                .children('td.daysCost')
                .children('.input_invoice')
                .attr('data-real')
        );
        $(this)
            .children('td.daysCost')
            .children('.input_invoice')
            .attr('data-real', daysCost_act);
        if (daysCost_act != daysCost_ant) {
            updateMice(pjtId, pid, 'pjtvr_days_cost',daysCost_act, section, 'U'  );
        }

        /** == Valida los descuentos base ========================= */
        let discountBase_act = parseFloat(
            $(this).children('td.discountBase').text()
        );
        let discountBase_ant = parseFloat(
            $(this).children('td.discountBase').attr('data-real')
        );
        $(this).children('td.discountBase').attr('data-real', discountBase_act);
        if (discountBase_act != discountBase_ant) {
            updateMice(pjtId,pid, 'pjtvr_discount_base',discountBase_act / 100, section, 'U' );
        }

        /** == Valida los descuentos as seguro ==================== */
        let discountInsu_act = parseFloat(
            $(this).children('td.discountInsu').text()
        );
        let discountInsu_ant = parseFloat(
            $(this).children('td.discountInsu').attr('data-real')
        );

        $(this).children('td.discountInsu').attr('data-real', discountInsu_act);
        if (discountInsu_act != discountInsu_ant) {
            updateMice(pjtId, pid, 'pjtvr_discount_insured', discountInsu_act / 100, section,'U' );
        }

        let daysTrip_act = parseInt(
            $(this).children('td.daysTrip').children('.input_invoice').val()
        );
        let daysTrip_ant = parseInt(
            $(this)
                .children('td.daysTrip')
                .children('.input_invoice')
                .attr('data-real')
        );
        $(this)
            .children('td.daysTrip')
            .children('.input_invoice')
            .attr('data-real', daysTrip_act);
        if (daysTrip_act != daysTrip_ant) {
            updateMice( pjtId,pid,'pjtvr_days_trip',daysTrip_act, section, 'U');
        }

        let discountTrip_act = parseFloat(
            $(this).children('td.discountTrip').text()
        );
        let discountTrip_ant = parseFloat(
            $(this).children('td.discountTrip').attr('data-real')
        );

        $(this).children('td.discountTrip').attr('data-real', discountTrip_act);
        if (discountTrip_act != discountTrip_ant) {
            updateMice( pjtId, pid,'pjtvr_discount_trip',discountTrip_act / 100, section,'U');
        }

        let daysTest_act = parseInt(
            $(this).children('td.daysTest').children('.input_invoice').val()
        );
        let daysTest_ant = parseInt(
            $(this)
                .children('td.daysTest')
                .children('.input_invoice')
                .attr('data-real')
        );
        $(this)
            .children('td.daysTest')
            .children('.input_invoice')
            .attr('data-real', daysTest_act);
        if (daysTest_act != daysTest_ant) {
            updateMice(pjtId, pid, 'pjtvr_days_test', daysTest_act, section, 'U' );
        }

        let discountTest_act = parseFloat(
            $(this).children('td.discountTest').text()
        );

        let discountTest_ant = parseFloat(
            $(this).children('td.discountTest').attr('data-real')
        );

        $(this).children('td.discountTest').attr('data-real', discountTest_act);
        if (discountTest_act != discountTest_ant) {
            updateMice(pjtId,pid,'pjtvr_discount_test',discountTest_act / 100,section,'U' );
        }

        let ordering = parseInt($(`#SC${section}`).data('switch'));
        let order = $(this)
            .children('th')
            .children('.move_item')
            .attr('data-order');
        if (ordering > 0) {
            console.log(pjtId, pid, 'pjtvr_order', order, section, 'N');
            updateMice(pjtId, pid, 'pjtvr_order', order, section, 'N');
        }
    });
}
/**
 *
 * @param {*} pj Id del proyecto
 * @param {*} pd Id del producto
 * @param {*} fl Campo afectado
 * @param {*} dt Valor del campo
 * @param {*} sc Numero de la sección
 * @param {*} ac Accion a realizar
 */
function updateMice(pj, pd, fl, dt, sc, ac) {
    // console.log('UPDATEMICE', pj, pd, fl, dt, sc, ac);

    $(`#SC${sc}`).attr('data-switch', '0');
    var par = `[{
        "pjtId"      :   "${pj}",
        "prdId"      :   "${pd}",
        "field"      :   "${fl}",
        "value"      :   "${dt}",
        "section"    :   "${sc}",
        "action"     :   "${ac}"
        }]`;
    var pagina = 'ProjectDetails/updateMice';
    var tipo = 'html';
    var selector = receiveResponseMice;
    fillField(pagina, par, tipo, selector);
}
function receiveResponseMice(dt) {
    console.log(dt);

}

function OrderMice(m) {
    let pjtId = $('.version_current').attr('data-project');
    $('.budgetRow').each(function (v) {
        let pid = parseInt($(this).attr('id').substring(3, 10));
        let section = $(this).parents('tbody').attr('id').substring(2, 5);
        let order = $(this)
            .children('th')
            .children('.move_item')
            .attr('data-order');
        if (m == 1) {
            $(`#SC${section}`).attr('data-switch', '1');

            var par = `[{
            "pjtId"      :   "${pjtId}",
            "prdId"      :   "${pid}",
            "order"      :   "${order}",
            "section"    :   "${section}"
            }]`;
            var pagina = 'ProjectDetails/updateOrder';
            var tipo = 'html';
            var selector = receiveResponseMice;
            fillField(pagina, par, tipo, selector);
        } else {
            $(`#SC${section}`).attr('data-switch', '0');
        }
    });
}

/* ************************************************************************ */
/* DEFINE LOS PERIODOS DE CADA SERIE DEL PRODUCTO SELECCIONADO              */
/* ************************************************************************ */

/* ==== Define los periodos de cada serie ======================== */
function periodProduct(prd,nameProd) {
    let prdId = prd.substring(3, 10);
    let pjtId = $('.version_current').attr('data-project');

    $('.invoice__modalBackgound').fadeIn('slow');
    $('.invoice__modal-general').slideDown('slow').css({ 'z-index': 401 });
    let template = $('#PeriodsTemplates');
    $('.invoice__modal-general .modal__body').append(template.html());
    $('.invoice__modal-general .modal__header-concept').html('Periodos del producto: '+nameProd);
    $('#periodBox').html('');
    $('#periodBox').attr('data-project', pjtId).attr('data-product', prdId);

    var pagina = 'Periods/exec';
    var par = `[{"pjId":"${pjtId}"}]`;
    var tipo = 'html';
    var selector = putPeriods;
    fillField(pagina, par, tipo, selector);
    closeModals();
}

function putPeriods(dt) {
    $('#periodBox').html(dt);
}

function purgeInterfase() {
    switch (interfase) {
        case 'MST':
            showButtonToPrint('S');
            showButtonToSave('S');
            showMenuProduct('S');
            showLedPending('S');
            break;
        case 'ACT':
            // showButtonToPrint('H');
            // showButtonToSave('H');
            showMenuProduct('H');
            showLedPending('H');
            break;
        default:
    }
}

function findIndex(id, dt) {
    inx = -1;
    $.each(dt, function (v, u) {
        if (id == u.pjt_id) {
            inx = v;
        }
    });

    return inx;
}

function subaccion() {
    let pjtId = $('.version_current').data('project');
    let verId = $('.version_current').data('version');

    getBudgets(pjtId, verId);
}

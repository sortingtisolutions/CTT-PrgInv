$(document).ready(function () {
    altr = 1;
});

function deep_loading(op) {
    if (op == 'C') {
        $('.deep_loading').remove();
    } else {
        let H = `
        <div class="deep_loading">
            <div class="flash_loading"> Cargando datos...</div>
        </div>
    `;

        $('body').append(H);
    }
}

function confirm_alert() {
    let H = `
    <div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="confirmModal" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">
                <div class="modal-header "></div>
                    <div class="modal-body" style="padding: 0px !important;">
                        <div class="row">
                            <input type="hidden" class="form-control" id="Id" aria-describedby="basic-addon3">
                            <div class="col-12 text-center">
                                <span class="modal-title text-center" style="font-size: 1.2rem;" id="confirmModalLevel"></span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" id="N" data-bs-dismiss="modal"></button>
                        <button type="button" class="btn btn-danger" id="confirmButton"></button>
                    </div>
                </div>
            </div>
        </div>
    `;

    $('body').append(H);
}

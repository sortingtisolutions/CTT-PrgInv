altr = '1';
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

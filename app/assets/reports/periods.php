<?php

    $pjtId = $_GET['pj'];
    $prdId = $_GET['pr'];

 ?>

<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css" />
        <link rel="stylesheet" href="../css/periods.css?v=1.0.0.0" />
        <link rel="stylesheet" href="../css/estilos.css?v=1.0.0.0"/>
        <link rel="stylesheet" href="../css/sticky-table.css?v=1.0.0.0" />

        <title>Document</title>
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
        <script src="../lib/moment/moment-with-locales.min.js"></script>
        <script src="https://kit.fontawesome.com/72178fea46.js" crossorigin="anonymous"></script>
    </head>
    <body>
        
        <div class="periods_content">
            <table id="periodsTable" class="periods__table" data-project="<?php echo $pjtId; ?>"  data-product="<?php echo $prdId; ?>">
                <thead>
                    <tr>
                        <th>series</th>
                        <th class="thSerie wseries"></th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <div class="contador"></div>
        <script src="../lib/functions.js?v=1.0.0.0"></script>
        <script src="../lib/sticky.js?v=1.0.0.0"></script>
        <script src="../lib/resizer.js?v=1.0.0.0"></script>

    </body>
</html>
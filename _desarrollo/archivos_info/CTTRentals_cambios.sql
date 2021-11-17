-- Actualizacion del 16 de noviembre 2021

ALTER TABLE `cttapp_cire`.`ctt_products_packages` 
ADD COLUMN `pck_quantity` INT NULL COMMENT 'Cantidad de productos' AFTER `prd_id`;


DROP TABLE `cttapp_cire`.`ctt_sales`;
CREATE TABLE `cttapp_cire`.`ctt_sales` (
    `sal_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id de la venta',
    `sal_number`            VARCHAR(100) NULL               COMMENT 'Numero de venta',
    `sal_date`              DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de venta',
    `sal_pay_form`          VARCHAR(100) NULL               COMMENT 'Forma de pago',
    `sal_number_invoice`    VARCHAR(100) NULL               COMMENT 'Numero de factura',
    `sal_customer_name`     VARCHAR(100) NULL               COMMENT 'Nombre del cliente',
    `str_id`                INT NULL                        COMMENT 'Id del almacen relacion ctt_stores',
    `pjt_id`                INT NULL                        COMMENT 'Id del proyeto relacion ctt_projects',
PRIMARY KEY (`sal_id`))
COMMENT = 'Ventas de productos.';




DROP TABLE `cttapp_cire`.`ctt_sales_details`;
CREATE TABLE `cttapp_cire`.`ctt_sales_details` (
    `sld_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del detalle de la venta',
    `sld_sku`               VARCHAR(100) NULL               COMMENT 'SKU de la serie del producto',
    `sld_name`              VARCHAR(100) NULL               COMMENT 'Nombre del producto',
    `sld_price`             DECIMAL(10,2) NULL              COMMENT 'Precio unitario del producto',
    `sld_quantity`          INT NOT NULL                    COMMENT 'Cantidad',
    `sal_id`                INT NOT NULL                    COMMENT 'Id de la venta relacion ctt_sales',
    `ser_id`                INT NULL                        COMMENT 'Id de la serie relacion ctt_series',
PRIMARY KEY (`sld_id`))
COMMENT = 'Detalle de las ventas de productos.';
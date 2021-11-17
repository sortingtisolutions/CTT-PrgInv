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





INSERT INTO `cttapp_cire`.`ctt_modules` (`mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES ('sales', 'Venta de productos', 'Modulo de venta de productos', '#');
INSERT INTO `cttapp_cire`.`ctt_modules` (`mod_code`, `mod_name`, `mod_description`, `mod_item`) VALUES ('ProdSalables', 'Venta de productos Expendables', 'Modulos de venta deproductos expendables', 'ProductsSalables');

INSERT INTO `cttapp_cire`.`ctt_menu` (`mnu_parent`, `mnu_item`, `mnu_description`, `mnu_order`, `mod_id`) VALUES ('0', 'Venta', 'Seccion de ventas', '3', '32');
UPDATE `cttapp_cire`.`ctt_menu` SET `mnu_order` = '4' WHERE (`mnu_id` = '23');
UPDATE `cttapp_cire`.`ctt_menu` SET `mnu_order` = '5' WHERE (`mnu_id` = '5');

INSERT INTO `cttapp_cire`.`ctt_menu` (`mnu_parent`, `mnu_item`, `mnu_description`, `mnu_order`, `mod_id`) VALUES ('33', 'Venta de expendables', 'Modulo de venta de expendables', '1', '33');

INSERT INTO `cttapp_cire`.`ctt_users_modules` (`usr_id`, `mod_id`) VALUES ('1', '32');
INSERT INTO `cttapp_cire`.`ctt_users_modules` (`usr_id`, `mod_id`) VALUES ('1', '33');




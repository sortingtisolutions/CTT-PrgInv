-- Actualizacion del 3 de septiembre 2021


ALTER TABLE `cttapp_cire`.`ctt_projects_detail` 
DROP COLUMN `pjtdt_status`,
DROP COLUMN `pjtdt_insured`,
DROP COLUMN `pjtdt_discount_test`,
DROP COLUMN `pjtdt_days_test`,
DROP COLUMN `pjtdt_discount_trip`,
DROP COLUMN `pjtdt_days_trip`,
DROP COLUMN `pjtdt_discount_base`,
DROP COLUMN `pjtdt_days_base`,
DROP COLUMN `pjtdt_quantity`,
DROP COLUMN `pjtdt_prod_level`,
DROP COLUMN `pjtdt_prod_price`,
DROP COLUMN `pjtdt_prod_name`;

ALTER TABLE `cttapp_cire`.`ctt_projects_detail` 
ADD COLUMN `prd_id` INT NULL COMMENT 'Id del producto relación con ctt_products' AFTER `ser_id`;


ALTER TABLE `cttapp_cire`.`ctt_series` 
CHANGE COLUMN `pjtdt_id` `pjtcn_id` INT(11) NULL DEFAULT NULL COMMENT 'Id del detalle de proyecto relacion ctt_projects_content' ;




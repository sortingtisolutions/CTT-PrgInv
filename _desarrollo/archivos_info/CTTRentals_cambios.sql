-- Actualizacion del 11 de ENERO 2022

ALTER TABLE ctt_series DROP COLUMN ser_reserve_start;

ALTER TABLE ctt_series DROP COLUMN ser_reserve_end;

--ALTER TABLE ctt_series CHANGE COLUMN pjtdt_id INT(11) NULL DEFAULT 0 COMMENT 'Id del detalle de proyecto relacion ctt_projects_detail' ;

ALTER TABLE ctt_projects_detail ADD COLUMN pjtdt_belongs INT NULL DEFAULT 0 COMMENT 'Id del detalle padre' AFTER pjtdt_id;

ALTER TABLE ctt_projects_periods ADD COLUMN pjtdt_belongs INT NULL COMMENT 'Id del detalle padre' AFTER pjtdt_id;

ALTER TABLE ctt_projects_periods ADD COLUMN pjtpd_sequence INT NULL DEFAULT 1 COMMENT 'Secuencia de periodos' AFTER pjtdt_belongs;


-- Actualizacion del 29 de ENERO 2022
CREATE TABLE `cttapp_cire`.`ctt_comments` (
    `com_id`                INT NOT NULL AUTO_INCREMENT     COMMENT 'Id del comentario',
    `com_source_section`    VARCHAR(50)                     COMMENT 'Sección a la que pertenece',
    `com_action_id`         INT                             COMMENT 'Id del movimiento de la sección',
    `com_date`              DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del comentario',
    `com_user`              VARCHAR(50)                     COMMENT 'Nombre del empleado quee generó el comentario',
    `com_comment`           VARCHAR(300)                    COMMENT 'Comentario',
    `com_status`            INT DEFAULT 0                   COMMENT 'Estatus del comentario 1-aplicado 0-no aplicado',
PRIMARY KEY (`com_id`)) 
ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT ='Comentarios de las secciones del sistema';

ALTER TABLE ctt_sales_details ADD COLUMN sld_situation VARCHAR(50) NULL COMMENT 'Situación del producto' AFTER sld_quantity;
ALTER TABLE ctt_sales_details ADD COLUMN sld_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del movimiento' AFTER sld_situation;

--AGREGADOS JORGE JUAREZ
ALTER TABLE `ctt_series` CHANGE `ser_cost_import` `ser_cost_import` INT(11) NOT NULL COMMENT 'Costo individual de importacion';

ALTER TABLE `ctt_series` ADD `ser_import_petition` VARCHAR(20) NULL DEFAULT NULL COMMENT 'Numero de Pedimento de importación' AFTER `ser_cost_import`;

CREATE TABLE `ctt_scores` (
	`scr_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Id del Valor',
	`scr_values` INT NULL DEFAULT '0' COMMENT 'Valor numerico de la calificacion',
	`scr_description` VARCHAR(100) NULL COMMENT 'Descripcion General de la calificacion',
	INDEX `ndx_src_id` (`scr_id`)
) COMMENT='Tabla de calificaciones de los clientes' COLLATE='utf8mb4_general_ci';

ALTER TABLE `ctt_products_packages` CHANGE `pck_quantity` `pck_quantity` INT NULL DEFAULT '1' COMMENT 'Cantidad de productos';

ALTER TABLE `ctt_customers` CHANGE `cus_prospect` `cus_prospect` VARCHAR(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT 'Tipo cliente 1-cliente 0-prospecto';
ALTER TABLE `ctt_customers` CHANGE `cut_id` `cut_id` INT(11) NOT NULL COMMENT 'Tipo Producción relación con ctt_customer_type';

ALTER TABLE `ctt_customers`
	CHANGE COLUMN `cus_legal_representative` `cus_legal_representative` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Representante legal' COLLATE 'utf8mb4_general_ci' AFTER `cus_sponsored`;

ALTER TABLE `ctt_customers`
	CHANGE COLUMN `cus_legal_act` `cus_legal_act` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Nombre Archivo Acta Constitutiva' AFTER `cus_legal_representative`;

ALTER TABLE `ctt_customers`
	CHANGE COLUMN `cus_contract` `cus_contract` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Nombre Archivo de Contrato de Servicio' AFTER `cus_legal_act`;

ALTER TABLE `ctt_customers`
	CHANGE COLUMN `cus_status` `cus_status` INT(11) NULL DEFAULT '1' COMMENT 'Estatus del Cliente 1-activo 0-inactivo' AFTER `cut_id`;

-- Actualizacion del 16 de FEBRERO 2022
ALTER TABLE ctt_customers ADD COLUMN cus_fill INT NULL DEFAULT '0' COMMENT 'Porcentaje de llenado de campos fiscales' AFTER cus_contract;

CREATE VIEW ctt_vw_projects AS
SELECT 
	CONCAT(cu.cus_fill, '%') as custfill
	, '<i class="fas fa-id-card kill"></i>' as editable
    , pj.pjt_id as projecid
    , pj.pjt_number as projnumb
    , pj.pjt_name as projname 
    , date_format(pj.pjt_date_project, '%Y/%m/%d') as dateregr
    , cu.cus_name AS custname
FROM ctt_projects AS pj
INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
INNER JOIN ctt_customers As cu ON cu.cus_id = co.cus_id
WHERE pjt_status = 2;

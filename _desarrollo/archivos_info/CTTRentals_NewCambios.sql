ALTER TABLE `ctt_subletting`
	ADD COLUMN `prd_id` INT(11) NULL DEFAULT NULL COMMENT 'ID del producto relacion con ctt_products' AFTER `cin_id`;

CREATE TABLE `ctt_attends_projects` (
	`atp_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la relacion de la atencion',
	`pjt_id` INT(11) NULL DEFAULT NULL COMMENT 'Id relacion con ctt_projects',
	`usr_id` INT(11) NULL DEFAULT NULL COMMENT 'Id relacion con ctt_users',
	`wta_id` INT(11) NULL DEFAULT NULL COMMENT 'Id relacion con ctt_way_to_attends',
	`status` INT NULL DEFAULT '1' COMMENT '1=activo, 0=Inactivo',
	PRIMARY KEY (`atp_id`) USING BTREE
)
COMMENT='Relacion de usuarios para atender las distintas facetas del proyecto'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=3
;

CREATE TABLE `ctt_way_to_attends` (
	`wta_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la forma para atender un proyecto',
	`wta_descripcion` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Descripcion de la forma de atencion' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`wta_id`) USING BTREE
)
COMMENT='Tabla con las distintas formas de atender un proyecto'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

ALTER TABLE `ctt_projects`
	ADD COLUMN `pjt_whomake` INT(11) NOT NULL COMMENT 'Id de usuario que realiza proyecto' AFTER `pjttc_id`,
	ADD COLUMN `pjt_whoattend` INT(11) NOT NULL COMMENT 'Id de Usuario que atiende en almacen' AFTER `pjt_whomake`;

ALTER TABLE `ctt_projects`
	CHANGE COLUMN `pjt_whomake` `pjt_whomake` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Id de usuario que realiza proyecto' COLLATE 'utf8mb4_general_ci' AFTER `pjttc_id`,
	CHANGE COLUMN `pjt_whoattend` `pjt_whoattend` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Id de Usuario que atiende en almacen' COLLATE 'utf8mb4_general_ci' AFTER `pjt_whomake`;


ALTER TABLE `ctt_projects_status`
	CHANGE COLUMN `pjs_status` `pjs_status` INT NOT NULL COMMENT 'Status de proyecto' COLLATE 'utf8mb4_general_ci' FIRST;

ALTER TABLE `ctt_series`
	ADD COLUMN `str_id` INT(11) NULL DEFAULT '0' COMMENT 'ID relacion con ctt_stores almacenes' AFTER `prd_id_acc`;

CREATE TABLE `ctt_infocfdi` (
	`cfdi_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Id Datos complementarios CFDI',
	`cfdi_distancia` INT NULL COMMENT 'Distancia del Proyecto en KM',
	`cfid_transporte_ctt` VARCHAR(2) NULL DEFAULT NULL COMMENT 'Lleva Transporte de CTT' COLLATE 'utf8mb4_general_ci',
	`cfdi_operador_movil` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`cfdi_unidad_movil` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`cfdi_placas` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`cfdi_permiso_fed` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`cfdi_cantidad_eq` VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`pjt_id` INT NULL DEFAULT NULL COMMENT 'Id relacion proyecto ctt_proyects',
	`cus_id` INT NULL DEFAULT NULL COMMENT 'id relacion clientes ctt_customers',
	PRIMARY KEY (`cfdi_id`)
)
COMMENT='Tabla complementaria de datos para el CFDI'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `ctt_suppliers` (
	`sup_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del proveedor',
	`sup_business_name` VARCHAR(100) NULL DEFAULT '' COMMENT 'Nombre de la empresa' COLLATE 'utf8mb4_general_ci',
	`sup_trade_name` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Nombre Comercial' COLLATE 'utf8mb4_general_ci',
	`sup_contact` VARCHAR(100) NULL DEFAULT '' COMMENT 'Nombre del responsable' COLLATE 'utf8mb4_general_ci',
	`sup_rfc` VARCHAR(15) NULL DEFAULT '' COMMENT 'Registro Federal de Contribuyentes' COLLATE 'utf8mb4_general_ci',
	`sup_email` VARCHAR(100) NULL DEFAULT '' COMMENT 'Correo electrónico' COLLATE 'utf8mb4_general_ci',
	`sup_phone` VARCHAR(100) NULL DEFAULT '' COMMENT 'Número telefónico' COLLATE 'utf8mb4_general_ci',
	`sup_phone_extension` VARCHAR(10) NOT NULL DEFAULT '' COMMENT 'Extension del telefono' COLLATE 'utf8mb4_general_ci',
	`sup_status` VARCHAR(1) NULL DEFAULT '1' COMMENT 'Estatus del proveedor 1-Activo, 0-Inactivo' COLLATE 'utf8mb4_general_ci',
	`sup_credit` VARCHAR(5) NOT NULL DEFAULT '0' COMMENT 'Ofrece credito Si / No' COLLATE 'utf8mb4_general_ci',
	`sup_credit_days` INT(11) NOT NULL DEFAULT 0 COMMENT 'Dias de Credito',
	`sup_balance` INT(11) NULL DEFAULT 0 COMMENT 'Saldo',
	`sup_money_advance` VARCHAR(5) NOT NULL DEFAULT '0' COMMENT 'Anticipo Si / No' COLLATE 'utf8mb4_general_ci',
	`sup_advance_amount` INT(11) NULL DEFAULT 0 COMMENT 'Monto de anticipo',
	`sup_comments` VARCHAR(100) NOT NULL DEFAULT '' COMMENT 'Comentarios sobre el cliente' COLLATE 'utf8mb4_general_ci',
	`sut_id` INT(11) NULL DEFAULT NULL COMMENT 'Tipo de Proveedor',
	`sup_proof_tax_situation` VARCHAR(50) NULL DEFAULT '' COMMENT 'Constancia de situacion fiscal Si / No' COLLATE 'utf8mb4_general_ci',
	`sup_id_international_supplier` VARCHAR(50) NULL DEFAULT '' COMMENT 'Id Proveedor internacional' COLLATE 'utf8mb4_general_ci',
	`sup_description_id_is` VARCHAR(100) NULL DEFAULT '' COMMENT 'Descripcion del Proveedor Internacional' COLLATE 'utf8mb4_general_ci',
	`sup_way_pay` VARCHAR(100) NULL DEFAULT '' COMMENT 'Forma de pago' COLLATE 'utf8mb4_general_ci',
	`sup_bank` VARCHAR(100) NULL DEFAULT '' COMMENT 'Banco' COLLATE 'utf8mb4_general_ci',
	`sup_clabe` VARCHAR(25) NULL DEFAULT '' COMMENT 'Numero de cuenta' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`sup_id`) USING BTREE
)
COMMENT='Proveedores de la empresa.'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=87
;

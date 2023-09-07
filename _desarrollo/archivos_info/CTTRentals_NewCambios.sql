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

-- *************  JUNIO 5 2023 ************
CREATE TABLE `ctt_who_attend_projects` (
	`whoatd_id` INT(11) NOT NULL AUTO_INCREMENT,
	`pjt_id` INT(11) NOT NULL COMMENT 'Id del Proyecto',
	`usr_id` INT(11) NOT NULL COMMENT 'Id del Usuario del sistema',
	`emp_id` INT(11) NOT NULL COMMENT 'id del empleado',
	`emp_fullname` VARCHAR(100) NULL DEFAULT '' COMMENT 'Nombre del empleado' COLLATE 'utf8mb4_general_ci',
	`are_id` INT(11) NOT NULL COMMENT 'Id de la area asignada al empleado',
	PRIMARY KEY (`whoatd_id`) USING BTREE
)
COMMENT='Empleados que atienden el proyecto en las diferentes etapas'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

--*********** 16 de junio ********************
ALTER TABLE `ctt_projects`
	ADD COLUMN `edos_id` INT(11) NOT NULL COMMENT 'Id del estado en caso de foraneo' AFTER `pjttc_id`;

--*********** 26 de junio ********************
ALTER TABLE `ctt_subcategories`
	ADD COLUMN `sbc_order_print` INT(11) NOT NULL AFTER `cat_id`;

CREATE TABLE `ctt_estados_mex` (
	`edos_id` INT(11) NOT NULL AUTO_INCREMENT,
	`edos_name` VARCHAR(50) NULL DEFAULT NULL COMMENT 'nombre del estado' COLLATE 'utf8mb4_general_ci',
	`edos_abrev` VARCHAR(5) NULL DEFAULT NULL COMMENT 'abreviatura del estado' COLLATE 'utf8mb4_general_ci',
	`edos_capital` VARCHAR(50) NULL DEFAULT NULL COMMENT 'capital del estado' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`edos_id`) USING BTREE
)
COMMENT='Catalogo de los estados de la republica mexicana'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `ctt_freelances` (
	`free_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Id del Freelance',
	`free_cve` INT(11) NULL DEFAULT NULL COMMENT 'clave para control del Freelance',
	`free_name` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Nombre del Freelance' COLLATE 'utf8mb4_general_ci',
	`free_area_id` INT(11) NULL DEFAULT NULL COMMENT 'Id con relacion a ctt_area',
	`free_rfc` VARCHAR(15) NULL DEFAULT NULL COMMENT 'RFC del Freelance' COLLATE 'utf8mb4_general_ci',
	`free_adress` VARCHAR(200) NULL DEFAULT NULL COMMENT 'Direccion del Freelance' COLLATE 'utf8mb4_general_ci',
	`free_email` VARCHAR(100) NULL DEFAULT NULL COMMENT 'correo electronico' COLLATE 'utf8mb4_general_ci',
	`free_phone` VARCHAR(13) NULL DEFAULT NULL COMMENT 'telefono del freelance' COLLATE 'utf8mb4_general_ci',
	`free_unit` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Unidad movil que opera' COLLATE 'utf8mb4_general_ci',
	`free_plates` VARCHAR(10) NULL DEFAULT NULL COMMENT 'Placas de la unidad' COLLATE 'utf8mb4_general_ci',
	`free_license` VARCHAR(15) NULL DEFAULT NULL COMMENT 'Numero de licencia del Freelance' COLLATE 'utf8mb4_general_ci',
	`free_fed_perm` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Permiso federal del Freelance' COLLATE 'utf8mb4_general_ci',
	`free_clase` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Clase de la unidad movil' COLLATE 'utf8mb4_general_ci',
	`free_año` INT(4) NULL DEFAULT NULL COMMENT 'Año de la unidad movil',
	PRIMARY KEY (`free_id`) USING BTREE
)
COMMENT='Tabla de datos de los Freelance '
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

ALTER TABLE `ctt_series`
	CHANGE COLUMN `ser_import_petition` `ser_import_petition` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Numero de Pedimento de importación' COLLATE 'utf8mb4_general_ci' AFTER `ser_cost_import`;

ALTER TABLE `ctt_products`
	CHANGE COLUMN `prd_stock` `prd_stock` INT(11) NULL DEFAULT 0 COMMENT 'Cantidad existente en almacenes' AFTER `cin_id`;

ALTER TABLE `ctt_projects_content`
	ADD COLUMN `pjtvr_action` VARCHAR(2) NULL DEFAULT NULL COMMENT 'accion sobre el registro' COLLATE 'utf8mb4_general_ci' AFTER `pjtvr_id`;

ALTER TABLE `ctt_projects_version`
	ADD COLUMN `pjtvr_action` VARCHAR(2) NOT NULL DEFAULT '' COMMENT 'accion a seguir' COLLATE 'utf8mb4_general_ci' AFTER `pjt_id`;

ALTER TABLE `ctt_categories`
	ADD COLUMN `are_id` INT(11) NULL DEFAULT NULL COMMENT 'Id relacion con el area' AFTER `str_id`;

ALTER TABLE `ctt_categories`
	CHANGE COLUMN `cat_id` `cat_id` INT(11) NOT NULL COMMENT 'ID del catálogo' FIRST;

ALTER TABLE `ctt_categories`
	CHANGE COLUMN `str_id` `str_id` INT(11) NULL DEFAULT 0 COMMENT 'Id Relacion ctt_stores' AFTER `cat_status`,
	CHANGE COLUMN `are_id` `are_id` INT(11) NULL DEFAULT 0 COMMENT 'Id relacion con el area' AFTER `str_id`;

ALTER TABLE `ctt_project_change_reason`
	ADD COLUMN `pjtcr_code_stage` VARCHAR(3) NULL DEFAULT '' COMMENT 'Codigo del motivo del cambio de estatus' COLLATE 'utf8mb4_general_ci' AFTER `pjtcr_description`;

CREATE TABLE `ctt_assign_proyect` (
	`ass_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la asignacion',
	`pjt_id` INT(11) NULL DEFAULT NULL COMMENT 'Id relacion con ctt_projects',
	`free_id` INT(11) NULL DEFAULT NULL COMMENT 'Id relacion con ctt_freelances',
	`ass_date_start` DATETIME NULL DEFAULT NULL COMMENT 'Fecha de asignacion del freelance',
	`ass_date_end` DATETIME NULL DEFAULT NULL COMMENT 'Fecha en la que se completa la asignacion',
	`ass_coments` VARCHAR(50) NULL DEFAULT NULL COMMENT 'Comentarios sobre la asignacion' COLLATE 'utf8mb4_general_ci',
	`ass_status` INT(11) NULL DEFAULT NULL COMMENT 'Estado actual de la asignacion. ',
	PRIMARY KEY (`ass_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `ctt_maintenance_status` (
	`mts_id` INT(11) NOT NULL AUTO_INCREMENT,
	`mts_description` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`mts_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

CREATE TABLE `ctt_products_maintenance` (
	`pmt_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la tabla',
	`pmt_days` INT(11) NULL DEFAULT NULL COMMENT 'Dias de duracion de reparacion si existe',
	`pmt_hours` INT(11) NULL DEFAULT NULL COMMENT 'Horas de duracion de reparacion, si existe',
	`pmt_date_start` DATE NULL DEFAULT NULL COMMENT 'Fecha de comienzo de la reparación ',
	`pmt_date_end` DATE NULL DEFAULT NULL COMMENT 'Fecha final de la reparacion',
	`pmt_comments` VARCHAR(50) NULL DEFAULT '' COMMENT 'Comentarios sobre la reparacion' COLLATE 'utf8mb4_general_ci',
	`mts_id` INT(11) NULL DEFAULT '0' COMMENT '1. revisado 2. atendiendose 3. concluido',
	`ser_id` INT(11) NULL DEFAULT '0' COMMENT 'Id en relacion con la tabla ctt_series',
	`pjtcr_id` INT(11) NULL DEFAULT '0' COMMENT 'Id en relacion con la tabla ctt_project_change_reason',
	PRIMARY KEY (`pmt_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

--*******************************
DROP TABLE IF EXISTS
CREATE TABLE `ctt_subletting` (
	`sub_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID del subarrendo',
	`sub_price` DECIMAL(10,2) NULL DEFAULT '0.00' COMMENT 'precio de renta del producto por unidad',
	`sub_quantity` INT(11) NULL DEFAULT NULL COMMENT 'Cantidad de piezas subarrendadas',
	`sub_collection_time` TIME NULL DEFAULT NULL,
	`sub_delivery_time` TIME NULL DEFAULT NULL,
	`sub_location` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`sub_name_provider_staff` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`sub_name_provider_ctt` VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8mb4_general_ci',
	`sub_date_start` DATETIME NULL DEFAULT NULL COMMENT 'Fecha de inicio de periodo de subarrendo',
	`sub_date_end` DATETIME NULL DEFAULT NULL COMMENT 'Fecha de término de periodo de subarrendo',
	`sub_comments` VARCHAR(300) NOT NULL COMMENT 'Comentarios referentes al subarrendo' COLLATE 'utf8mb4_general_ci',
	`ser_id` INT(11) NULL DEFAULT NULL COMMENT 'Id del serial del producto relacion ctt_serial',
	`sup_id` INT(11) NULL DEFAULT NULL COMMENT 'Id del proveedor relacion ctt_suppliers',
	`prj_id` INT(11) NULL DEFAULT NULL COMMENT 'Id del proyecto ',
	`cin_id` INT(11) NULL DEFAULT NULL COMMENT 'ID del tipo de moneda relacion ctt_coin',
	`prd_id` INT(11) NULL DEFAULT NULL COMMENT 'ID del producto relacion con ctt_products',
	PRIMARY KEY (`sub_id`) USING BTREE
)
COMMENT='Tabla de situación de subarrendos'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

--******* 02-ago-23 ********************
CREATE TABLE `ctt_products_maintenance` (
	`pmt_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'Id de la tabla',
	`pmt_days` INT(11) NULL DEFAULT '0' COMMENT 'Dias de duracion de reparacion si existe',
	`pmt_hours` INT(11) NULL DEFAULT '0' COMMENT 'Horas de duracion de reparacion, si existe',
	`pmt_date_start` DATE NULL DEFAULT NULL COMMENT 'Fecha de comienzo de la reparación ',
	`pmt_date_end` DATE NULL DEFAULT NULL COMMENT 'Fecha final de la reparacion',
	`pmt_price` DECIMAL(20,2) NULL DEFAULT 0 COMMENT 'Costo del mantenimiento',
	`pmt_comments` VARCHAR(50) NULL DEFAULT '' COMMENT 'Comentarios sobre la reparacion' COLLATE 'utf8mb4_general_ci',
	`pmt_date_register` DATETIME NULL DEFAULT NULL COMMENT 'Fecha de registro de mantenimiento',
	`ser_id` INT(11) NULL DEFAULT '0' COMMENT 'Id en relacion con la tabla ctt_series',
	`pjt_id` INT(11) NULL DEFAULT '0' COMMENT 'Id en relacion a la tabla ctt_projects',
	`pjtcr_id` INT(11) NULL DEFAULT '0' COMMENT 'Id en relacion con la tabla ctt_project_change_reason',
	`mts_id` INT(11) NULL DEFAULT '0' COMMENT '1. Sin Atender 2. atendiendose 3. concluido',
	PRIMARY KEY (`pmt_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;


--******* 15-ago-23 ********************
CREATE VIEW ctt_vw_list_products AS
SELECT pd.prd_id, pd.prd_sku, pd.prd_name, pd.prd_price, pd.prd_level, 
            pd.prd_insured, sb.sbc_name,cat_name,
    CASE 
        WHEN prd_level ='K' THEN 
            (SELECT prd_stock
                    FROM ctt_products WHERE prd_id = pd.prd_id)
        WHEN prd_level ='P' THEN 
            (SELECT prd_stock-fun_buscarentas(pd.prd_sku) 
                    FROM ctt_products WHERE prd_id = pd.prd_id)
        ELSE 
            (SELECT prd_stock-fun_buscarentas(pd.prd_sku) 
                    FROM ctt_products WHERE prd_id = pd.prd_id)
        END AS stock
FROM ctt_products AS pd
INNER JOIN ctt_subcategories AS sb ON sb.sbc_id = pd.sbc_id
INNER JOIN ctt_categories AS ct ON ct.cat_id=sb.cat_id
WHERE pd.prd_status = 1 AND pd.prd_visibility = 1 AND sb.cat_id NOT IN (16)
ORDER BY pd.prd_name;



CREATE TABLE `ctt_locacion_estado` (
	`lce_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'ID de la tabla',
	`lce_location` VARCHAR(50) NULL DEFAULT '' COMMENT 'Lugar de la locacion' COLLATE 'utf8mb4_general_ci',
	`edos_id` INT(11) NULL DEFAULT '0' COMMENT 'Relacion con la tabla estados_mex',
	`pjt_id` INT(11) NULL DEFAULT '0' COMMENT 'Relacion con la tabla project',
	PRIMARY KEY (`lce_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=19
;

--************** 06 sep 23 *****************
CREATE TABLE `prc_into_crontab` (
	`prc_id` INT NULL COMMENT 'Id del proceso a ejecutar',
	`pjt_id` INT NULL COMMENT 'Id del Proyecto',
	`ver_id` INT NULL COMMENT 'Id del  version del documento',
	`pjtvr_id` INT NULL COMMENT 'Id de la version del proyecto',
	`date_register` DATETIME NULL DEFAULT CURRENT_TIMESTAMP() COMMENT 'Fecha y Hora actualizada',
	`prc_status` INT NULL DEFAULT 0 COMMENT 'Status del Proceso'
)
COMMENT='Tabla que registra los procesos a ejecutar en crontab para accesorios'
COLLATE='utf8mb4_general_ci'
;
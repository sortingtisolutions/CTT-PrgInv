-- Actualizacion del 11 de ENERO 2022
ALTER TABLE
  ctt_series DROP COLUMN ser_reserve_start;
ALTER TABLE
  ctt_series DROP COLUMN ser_reserve_end;
--ALTER TABLE ctt_series CHANGE COLUMN pjtdt_id INT(11) NULL DEFAULT 0 COMMENT 'Id del detalle de proyecto relacion ctt_projects_detail' ;
ALTER TABLE
  ctt_projects_detail
ADD
  COLUMN pjtdt_belongs INT NULL DEFAULT 0 COMMENT 'Id del detalle padre'
AFTER
  pjtdt_id;
ALTER TABLE
  ctt_projects_periods
ADD
  COLUMN pjtdt_belongs INT NULL COMMENT 'Id del detalle padre'
AFTER
  pjtdt_id;
ALTER TABLE
  ctt_projects_periods
ADD
  COLUMN pjtpd_sequence INT NULL DEFAULT 1 COMMENT 'Secuencia de periodos'
AFTER
  pjtdt_belongs;

-- Actualizacion del 29 de ENERO 2022
  CREATE TABLE `cttapp_cire`.`ctt_comments` (
    `com_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Id del comentario',
    `com_source_section` VARCHAR(50) COMMENT 'Sección a la que pertenece',
    `com_action_id` INT COMMENT 'Id del movimiento de la sección',
    `com_date` DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del comentario',
    `com_user` VARCHAR(50) COMMENT 'Nombre del empleado quee generó el comentario',
    `com_comment` VARCHAR(300) COMMENT 'Comentario',
    `com_status` INT DEFAULT 0 COMMENT 'Estatus del comentario 1-aplicado 0-no aplicado',
    PRIMARY KEY (`com_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8 COMMENT = 'Comentarios de las secciones del sistema';
ALTER TABLE
  ctt_sales_details
ADD
  COLUMN sld_situation VARCHAR(50) NULL COMMENT 'Situación del producto'
AFTER
  sld_quantity;
ALTER TABLE
  ctt_sales_details
ADD
  COLUMN sld_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de registro del movimiento'
AFTER
  sld_situation;
  
--AGREGADOS JORGE JUAREZ
ALTER TABLE
  `ctt_series` CHANGE `ser_cost_import` `ser_cost_import` INT(11) NOT NULL COMMENT 'Costo individual de importacion';
ALTER TABLE
  `ctt_series`
ADD
  `ser_import_petition` VARCHAR(20) NULL DEFAULT NULL COMMENT 'Numero de Pedimento de importación'
AFTER
  `ser_cost_import`;
CREATE TABLE `ctt_scores` (
    `scr_id` INT NOT NULL AUTO_INCREMENT COMMENT 'Id del Valor',
    `scr_values` INT NULL DEFAULT '0' COMMENT 'Valor numerico de la calificacion',
    `scr_description` VARCHAR(100) NULL COMMENT 'Descripcion General de la calificacion',
    INDEX `ndx_src_id` (`scr_id`)
  ) COMMENT = 'Tabla de calificaciones de los clientes' COLLATE = 'utf8mb4_general_ci';
ALTER TABLE
  `ctt_products_packages` CHANGE `pck_quantity` `pck_quantity` INT NULL DEFAULT '1' COMMENT 'Cantidad de productos';
ALTER TABLE
  `ctt_customers` CHANGE `cus_prospect` `cus_prospect` VARCHAR(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT '0' COMMENT 'Tipo cliente 1-cliente 0-prospecto';
ALTER TABLE
  `ctt_customers` CHANGE `cut_id` `cut_id` INT(11) NOT NULL COMMENT 'Tipo Producción relación con ctt_customer_type';
ALTER TABLE
  `ctt_customers` CHANGE COLUMN `cus_legal_representative` `cus_legal_representative` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Representante legal' COLLATE 'utf8mb4_general_ci'
AFTER
  `cus_sponsored`;
ALTER TABLE
  `ctt_customers` CHANGE COLUMN `cus_legal_act` `cus_legal_act` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Nombre Archivo Acta Constitutiva'
AFTER
  `cus_legal_representative`;
ALTER TABLE
  `ctt_customers` CHANGE COLUMN `cus_contract` `cus_contract` VARCHAR(100) NULL DEFAULT NULL COMMENT 'Nombre Archivo de Contrato de Servicio'
AFTER
  `cus_legal_act`;
ALTER TABLE
  `ctt_customers` CHANGE COLUMN `cus_status` `cus_status` INT(11) NULL DEFAULT '1' COMMENT 'Estatus del Cliente 1-activo 0-inactivo'
AFTER
  `cut_id`;
-- Actualizacion del 16 de FEBRERO 2022
ALTER TABLE
  ctt_customers
ADD
  COLUMN cus_fill INT NULL DEFAULT '0' COMMENT 'Porcentaje de llenado de campos fiscales'
AFTER
  cus_contract;

DROP VIEW ctt_vw_projects;
CREATE VIEW ctt_vw_projects AS
SELECT
  CASE
    WHEN cu.cus_fill <= 16 THEN concat(
      '<span class="rng rng1">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 16
    AND cu.cus_fill <= 33 THEN concat(
      '<span class="rng rng2">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 33
    AND cu.cus_fill <= 50 THEN concat(
      '<span class="rng rng3">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 50
    AND cu.cus_fill <= 66 THEN concat(
      '<span class="rng rng4">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 66
    AND cu.cus_fill <= 90 THEN concat(
      '<span class="rng rng5">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 99 THEN concat(
      '<span class="rng rng6">',
      cu.cus_fill,
      '%</span>'
    )
    ELSE ''
  END AS custfill,
  CASE
    WHEN cu.cus_fill < 100 THEN concat(
      '<i class="fas fa-address-card kill" id="',
      cu.cus_id,
      '"></i>'
    )
    ELSE ''
  END AS editable,
  CASE
    WHEN pj.pjt_status = '2' THEN concat(
      '<i class="fas fa-toggle-off toggle-icon" title="liberado" id="',
      pj.pjt_id,
      '"></i>'
    )
    WHEN pj.pjt_status = '3' THEN concat(
      '<i class="fas fa-toggle-on toggle-icon" title="bloqueado" id="',
      pj.pjt_id,
      '"></i>'
    )
    WHEN pj.pjt_status = '4' THEN concat(
      '<i class="fas fa-toggle-off toggle-icon" title="liberado" id="',
      pj.pjt_id,
      '"></i>'
    )
    ELSE ''
  END AS smarlock,
  pj.pjt_id AS projecid,
  pj.pjt_number AS projnumb,
  pj.pjt_name AS projname,
  pj.pjt_location AS projloca,
  date_format(pj.pjt_date_start, '%Y/%m/%d') AS dateinit,
  date_format(pj.pjt_date_end, '%Y/%m/%d') AS datefnal,
  cu.cus_name AS custname
FROM
  ctt_projects AS pj
  INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
  INNER JOIN ctt_customers as cu ON cu.cus_id = co.cus_id
WHERE
  pj.pjt_status IN (2, 3, 4);
-- Actualizacion del 19 de MARZO 2022
  -- Paso 1
  -- Elimina el trigger que actualiza las categorias
  DROP TRIGGER actualiza_subcategorias;
-- Paso 2
  -- Elimina el trigger que actualiza las los productos ( si no existe omite este paso )
  DROP TRIGGER update_products;
-- Paso 3
  -- Agrega el campo de STOCK en la tabla de productos
ALTER TABLE
  ctt_products
ADD
  COLUMN prd_stock INT NULL COMMENT 'Cantidad existente en almacenes'
AFTER
  prd_insured;
-- Paso 4
  -- Agrega el campo de prd_id en la tabla de ctt_stores_products
ALTER TABLE
  ctt_stores_products
ADD
  COLUMN prd_id INT NULL COMMENT 'Id del producto asociado a la serie'
AFTER
  ser_id;
-- Paso 5
  -- Actualiza el campo de prd_id la tabla en ctt_stores_products
UPDATE
  ctt_stores_products AS sp
  INNER JOIN ctt_series AS sr ON sr.ser_id = sp.ser_id
SET
  sp.prd_id = sr.prd_id
WHERE
  sp.prd_id is null;
-- Paso 6
  -- Elimina la vista de ctt_vw_productos y creaela nuevamente
  DROP VIEW ctt_vw_products;
CREATE VIEW ctt_vw_products AS
SELECT
  CONCAT(
    '<i class="fas fa-pen modif" data="',
    pr.prd_id,
    '"></i><i class="fas fa-times-circle kill" data="',
    pr.prd_id,
    '"></i>'
  ) AS editable,
  pr.prd_id AS producid,
  pr.prd_sku AS produsku,
  pr.prd_name AS prodname,
  pr.prd_price AS prodpric,
  CONCAT('<span class="toLink">', prd_stock, '</span> ') AS prodqtty,
  pr.prd_level AS prodtype,
  sv.srv_name AS typeserv,
  cn.cin_code AS prodcoin,
  CONCAT(
    '<i class="fas fa-file-invoice" id="',
    dc.doc_id,
    '"></i> '
  ) AS prddocum,
  sc.sbc_name AS subcateg,
  ct.cat_name AS categori,
  pr.prd_english_name AS prodengl,
  pr.prd_comments AS prdcomme,
  ct.cat_id
FROM
  ctt_products AS pr
  INNER JOIN ctt_coins AS cn ON cn.cin_id = pr.cin_id
  INNER JOIN ctt_services AS sv ON sv.srv_id = pr.srv_id
  AND sv.srv_status = '1'
  INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id
  AND sc.sbc_status = '1'
  INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
  AND ct.cat_status = '1'
  LEFT JOIN ctt_products_documents AS dc ON dc.prd_id = pr.prd_id
  AND dc.dcp_source = 'P'
WHERE
  pr.prd_status = 1
  AND pr.prd_level IN ('A', 'P');
-- Paso 7
  -- Genera el trigger que actualiza el stock de subcategorias
  CREATE TRIGGER update_categories
AFTER
UPDATE
  ON ctt_stores_products FOR EACH ROW
UPDATE
  ctt_subcategories as sc
SET
  sbc_quantity = (
    SELECT
      ifnull(sum(sp.stp_quantity), 0)
    FROM
      ctt_stores_products AS sp
      INNER JOIN ctt_series AS sr ON sr.ser_id = sp.ser_id
      INNER JOIN ctt_products AS pr ON pr.prd_id = sr.prd_id
    WHERE
      sr.ser_status = 1
      AND pr.prd_level IN ('P', 'K')
      and pr.sbc_id = sc.sbc_id
  );
-- Paso 8
  -- Genera el trigger que actualiza el stock de productos
  CREATE TRIGGER update_products
AFTER
UPDATE
  ON ctt_stores_products FOR EACH ROW
UPDATE
  ctt_products as sc
SET
  prd_stock = (
    SELECT
      ifnull(sum(sp.stp_quantity), 0)
    FROM
      ctt_stores_products AS sp
      INNER JOIN ctt_series AS sr ON sr.ser_id = sp.ser_id
      INNER JOIN ctt_products AS pr ON pr.prd_id = sr.prd_id
    WHERE
      sr.ser_status = 1
      AND pr.prd_level IN ('P', 'K')
      AND sr.prd_id = sc.prd_id
  )
WHERE
  sp.prd_id = prd_id;


-- Actualizacion del 7 de ABRIL 2022
  DROP VIEW ctt_vw_projects;
CREATE VIEW ctt_vw_projects AS
SELECT
  CASE
    WHEN cu.cus_fill <= 16 THEN concat(
      '<span class="rng rng1">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 16
    AND cu.cus_fill <= 33 THEN concat(
      '<span class="rng rng2">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 33
    AND cu.cus_fill <= 50 THEN concat(
      '<span class="rng rng3">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 50
    AND cu.cus_fill <= 66 THEN concat(
      '<span class="rng rng4">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 66
    AND cu.cus_fill <= 90 THEN concat(
      '<span class="rng rng5">',
      cu.cus_fill,
      '%</span>'
    )
    WHEN cu.cus_fill > 99 THEN concat(
      '<span class="rng rng6">',
      cu.cus_fill,
      '%</span>'
    )
    ELSE ''
  END AS custfill,
  CASE
    WHEN cu.cus_fill < 100 THEN concat(
      '<i class="fas fa-address-card kill" id="',
      cu.cus_id,
      '"></i>'
    )
    ELSE ''
  END AS editable,
  CASE
    WHEN pj.pjt_status = '2' THEN concat(
      '<i class="fas fa-toggle-off toggle-icon" title="liberado" id="',
      pj.pjt_id,
      '"></i>'
    )
    WHEN pj.pjt_status = '3' THEN concat(
      '<i class="fas fa-toggle-on toggle-icon" title="bloqueado" id="',
      pj.pjt_id,
      '"></i>'
    )
    WHEN pj.pjt_status = '4' THEN concat(
      '<i class="fas fa-toggle-off toggle-icon" title="liberado" id="',
      pj.pjt_id,
      '"></i>'
    )
    ELSE ''
  END AS smarlock,
  pj.pjt_id AS projecid,
  pj.pjt_number AS projnumb,
  pj.pjt_name AS projname,
  pj.pjt_location AS projloca,
  date_format(pj.pjt_date_start, '%Y/%m/%d') AS dateinit,
  date_format(pj.pjt_date_end, '%Y/%m/%d') AS datefnal,
  cu.cus_name AS custname
FROM
  ctt_projects AS pj
  INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
  INNER JOIN ctt_customers as cu ON cu.cus_id = co.cus_id
WHERE
  pj.pjt_status IN (2, 3, 4);
-- Actualizacion del 18 de ABRIL 2022
ALTER TABLE
  ctt_budget
ADD
  COLUMN bdg_section SMALLINT(1) NULL DEFAULT 1 COMMENT 'Numero de seccion'
AFTER
  bdg_prod_level;

ALTER TABLE ctt_budget ADD COLUMN bdg_days_cost INT COMMENT 'Días en cotización en renta' AFTER bdg_days_base;



  -- Actualizacion del 25 de ABRIL 2022
ALTER TABLE ctt_projects_content ADD COLUMN pjtcn_days_cost INT COMMENT 'Días en cotización en renta' AFTER pjtcn_days_base;





  -- Actualizacion del 02 de MAYO 2022
ALTER TABLE ctt_projects_content ADD COLUMN pjtcn_section INT COMMENT 'Numero de seccion' AFTER pjtcn_prod_level;

CREATE TABLE ctt_projects_version (
  `pjtvr_id` 		          int(11) NOT NULL AUTO_INCREMENT       COMMENT 'Id del contenido del projecto',
  `pjtvr_prod_sku`        varchar(15) DEFAULT NULL              COMMENT 'SKU identificador del producto',
  `pjtvr_prod_name`       varchar(100) DEFAULT NULL             COMMENT 'Nombre del producto',
  `pjtvr_prod_price`      decimal(10,2) DEFAULT NULL            COMMENT 'Precio unitario del producto',
  `pjtvr_quantity`        int(11) DEFAULT NULL                  COMMENT 'Cantidad de productos',
  `pjtvr_days_base`       int(11) DEFAULT NULL                  COMMENT 'Días solicitados en renta',
  `pjtvr_days_cost`       int(11) DEFAULT NULL                  COMMENT 'Días en cotización en renta',
  `pjtvr_discount_base`   decimal(10,2) DEFAULT NULL            COMMENT 'Descuento aplicado a la renta',
  `pjtvr_days_trip`       int(11) DEFAULT NULL                  COMMENT 'Días solicitados en viaje',
  `pjtvr_discount_trip`   decimal(10,2) DEFAULT NULL            COMMENT 'Descuento aplicado al viaje',
  `pjtvr_days_test`       int(11) DEFAULT NULL                  COMMENT 'Días solicitados en prueba',
  `pjtvr_discount_test`   decimal(10,2) DEFAULT NULL            COMMENT 'Descuento aplicado en prueba',
  `pjtvr_insured`         decimal(10,2) DEFAULT 0.10            COMMENT 'Porcentaje de seguro',
  `pjtvr_prod_level`      varchar(1) DEFAULT 'P'                COMMENT 'Nivel del producto  K=Kit, P=Producto',
  `pjtvr_section`         INT(11)                               COMMENT 'Numero de seccion',
  `pjtvr_status`          varchar(1) DEFAULT '1'                COMMENT 'Status del contendo del proyecto 1-activo 0-inactivo',
  `ver_id`                int(11) NOT NULL                      COMMENT 'FK Id de la version relación ctt_version',
  `prd_id`                int(11) NOT NULL                      COMMENT 'FK Id del producto relación ctt_products',
  `pjt_id`                int(11) NOT NULL                      COMMENT 'FK Id del proyecto relación ctt_proyect',
  PRIMARY KEY (`pjtvr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Contenido de la version del proyecto';



 -- Actualizacion del 13 de MAYO 2022
CREATE TABLE `ctt_projects_mice` (
  `pjtvr_id`            int(11) NOT NULL AUTO_INCREMENT         COMMENT 'Id del contenido del projecto',
  `pjtvr_action`        varchar(2) DEFAULT 'N'                  COMMENT 'Action que debe realizar',
  `pjtvr_prod_sku`      varchar(15) DEFAULT NULL                COMMENT 'SKU identificador del producto',
  `pjtvr_prod_name`     varchar(100) DEFAULT NULL               COMMENT 'Nombre del producto',
  `pjtvr_prod_price`    decimal(10,2) DEFAULT NULL              COMMENT 'Precio unitario del producto',
  `pjtvr_quantity`      int(11) DEFAULT NULL                    COMMENT 'Cantidad de productos',
  `pjtvr_quantity_ant`  int(11) DEFAULT NULL                    COMMENT 'Cantidad anterior',
  `pjtvr_days_base`     int(11) DEFAULT NULL                    COMMENT 'Días solicitados en renta',
  `pjtvr_days_cost`     int(11) DEFAULT NULL                    COMMENT 'Días en cotización en renta',
  `pjtvr_discount_base` decimal(10,2) DEFAULT NULL              COMMENT 'Descuento aplicado a la renta',
  `pjtvr_days_trip`     int(11) DEFAULT NULL                    COMMENT 'Días solicitados en viaje',
  `pjtvr_discount_trip` decimal(10,2) DEFAULT NULL              COMMENT 'Descuento aplicado al viaje',
  `pjtvr_days_test`     int(11) DEFAULT NULL                    COMMENT 'Días solicitados en prueba',
  `pjtvr_discount_test` decimal(10,2) DEFAULT NULL              COMMENT 'Descuento aplicado en prueba',
  `pjtvr_insured`       decimal(10,2) DEFAULT 0.10              COMMENT 'Porcentaje de seguro',
  `pjtvr_prod_level`    varchar(1) DEFAULT 'P'                  COMMENT 'Nivel del producto  K=Kit, P=Producto',
  `pjtvr_section`       int(11) DEFAULT NULL                    COMMENT 'Numero de seccion',
  `pjtvr_status`        varchar(1) DEFAULT '1'                  COMMENT 'Status del contendo del proyecto 1-activo 0-inactivo',
  `ver_id`              int(11) NOT NULL                        COMMENT 'FK Id de la version relación ctt_version',
  `prd_id`              int(11) NOT NULL                        COMMENT 'FK Id del producto relación ctt_products',
  `pjt_id`              int(11) NOT NULL                        COMMENT 'FK Id del proyecto relación ctt_proyect',
  PRIMARY KEY (`pjtvr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Contenido de la version del proyecto';

ALTER TABLE ctt_version ADD COLUMN ver_current smallint COMMENT 'Id de la version actual' AFTER ver_status;


-- Actualizacion del 14 de MAYO 2022
ALTER TABLE ctt_version CHANGE COLUMN `ver_current` `ver_active` SMALLINT(1) NULL DEFAULT 0 COMMENT 'Version activa en pantalla';
ALTER TABLE ctt_version ADD COLUMN `ver_master` SMALLINT(1) NULL DEFAULT 0 COMMENT 'Version Maestra en Base de datos' AFTER `ver_active`







-- Actualizacion del 24 de MAYO 2022
ALTER TABLE ctt_products ADD COLUMN `prd_reserved` INT NULL DEFAULT 0 COMMENT 'Cantidad reservado' AFTER `prd_stock`;



DROP TRIGGER update_products;
CREATE TRIGGER update_products AFTER UPDATE ON ctt_stores_products FOR EACH ROW
UPDATE ctt_products as sc
SET prd_stock = (
	select  count(*) from ctt_series where prd_id = sc.prd_id
) WHERE sc.prd_id = prd_id ;




 ALTER TABLE `ctt_series` ADD INDEX indx_prd_id (`prd_id` ASC) ;


 ALTER TABLE `ctt_stores_products` ADD INDEX indx_prd_id (`prd_id` ASC) ;



DROP TRIGGER `update_products_reserve`;
 CREATE TRIGGER update_products_reserve AFTER UPDATE ON ctt_series FOR EACH ROW
UPDATE ctt_products as sc
SET prd_reserved = (
	select  count(*) from ctt_series where pjtdt_id > 0  and  prd_id = sc.prd_id
)
WHERE sc.prd_id = prd_id;





-- Actualizacion del 26 de MAYO 2022
ALTER TABLE ctt_projects ADD COLUMN `pjt_parent` INT NULL DEFAULT 0 COMMENT 'Proyecto padre' AFTER `pjt_id`;

ALTER TABLE ctt_projects ADD COLUMN `pjt_time` VARCHAR(200) NULL  COMMENT 'Tiempo de duración del proyecto' AFTER `pjt_date_end`;





-- Actualizacion del 30 de JUNIO 2022
ALTER TABLE `cttapp_cire`.`ctt_projects_version` 
CHANGE COLUMN `pjtvr_id` `pjtvr_id` INT(11) NOT NULL COMMENT 'Id del contenido del projecto' ;

ALTER TABLE `cttapp_cire`.`ctt_projects_content` ADD COLUMN `pjtvr_id` INT NULL AFTER `pjt_id`;

ALTER TABLE `cttapp_cire`.`ctt_projects_detail` 
CHANGE COLUMN `pjtcn_id` `pjtvr_id` INT(11) NOT NULL COMMENT 'FK Id del proyecto relación ctt_projects_content' ;




-- Actualizacion del 20 de JULIO 2022



CREATE TABLE `cttapp_cire`.`ctt_movements` (
  `mov_id`          INT NOT NULL AUTO_INCREMENT   COMMENT 'Id del movimiento',
  `mov_quantity`    INT NULL                      COMMENT 'Cantidad modificada',
  `mov_type`        VARCHAR(45) NULL              COMMENT 'Tipo de movimiento',
  `mov_status`      VARCHAR(1) NULL DEFAULT '1'   COMMENT 'Status del movimiento 1= sin revision, 0 = Revisado',
  `mov_date`        TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha y hora del movimiento',
  `prd_id`          INT NULL                      COMMENT 'Id del producto relación ctt_products',
  `pjt_id`          INT NULL                      COMMENT 'Id del proyecto relación ctt_projects',
  `usr_id`          INT NULL                      COMMENT 'Id del usuario relación ctt_users',
  PRIMARY KEY (`mov_id`))
COMMENT = 'Registra los movimientos de proyectos';


CREATE TABLE `ctt_sidebar` (
  `sdb_id`          int NOT NULL AUTO_INCREMENT   COMMENT 'ID del sidebar',
  `sdb_parent`      int DEFAULT   NULL            COMMENT 'ID del sidebar padre',
  `sdb_item`        varchar(100)  NOT NULL        COMMENT 'Elementos del sidebar',
  `sdb_description` varchar(300)  NULL            COMMENT 'Descripción del elemento del sidebar',
  `sdb_order`       int DEFAULT   NULL            COMMENT 'Ordenamiento de los elementos del sidebar para su presentación',
  `mod_id`          int DEFAULT   NULL            COMMENT 'ID del modulo relación ctt_module',
  PRIMARY KEY (`sdb_id`)) 
COMMENT='Tabla de los elementos que componene el sidebar';





-- Actualizacion del 8 de agosto 2022
ALTER TABLE `cttapp_cire`.`ctt_projects` 
ADD COLUMN `pjt_how_required` VARCHAR(100) NULL COMMENT 'Quien solicitó'    AFTER `pjt_status`,
ADD COLUMN `pjt_trip_go`      VARCHAR(45)  NULL COMMENT 'Viaje de Ida'      AFTER `pjt_how_required`,
ADD COLUMN `pjt_trip_back`    VARCHAR(45)  NULL COMMENT 'Viaje de vuelta'   AFTER `pjt_trip_go`,
ADD COLUMN `pjt_to_carry_on`  VARCHAR(45)  NULL COMMENT 'Carga'             AFTER `pjt_trip_back`,
ADD COLUMN `pjt_to_carry_out` VARCHAR(45)  NULL COMMENT 'Descarga'          AFTER `pjt_to_carry_on`,
ADD COLUMN `pjt_test_tecnic`  VARCHAR(45)  NULL COMMENT 'Pruebas técnicas'  AFTER `pjt_to_carry_out`,
ADD COLUMN `pjt_test_look`    VARCHAR(45)  NULL COMMENT 'Pruebas Look'      AFTER `pjt_test_tecnic`;


CREATE TABLE ctt_projects_type_called (
  pjttc_id      int(11) NOT NULL AUTO_INCREMENT   COMMENT 'Id del tipo de llamado',
  pjttc_name    varchar(100) DEFAULT NULL         COMMENT 'Nombre del tipo de llamado',
  PRIMARY KEY (`pjttc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='Tipos de llamado';


ALTER TABLE `cttapp_cire`.`ctt_projects` 
ADD COLUMN `pjttc_id` INT NOT NULL COMMENT 'Fk Id del Tipo de llamado relacion ctt_projects_type_called' AFTER `pjttp_id`;






-- Actualizacion del 11 de agosto 2022
ALTER TABLE `cttapp_cire`.`ctt_budget` 
ADD COLUMN `bdg_order` INT NULL DEFAULT 0 COMMENT 'Posición en la lista de secciones' AFTER `bdg_insured`;

ALTER TABLE `cttapp_cire`.`ctt_projects_content` 
ADD COLUMN `pjtcn_order` INT NULL DEFAULT 0 COMMENT 'Posición en la lista de secciones' AFTER `pjtcn_status`;

ALTER TABLE `cttapp_cire`.`ctt_projects_mice` 
ADD COLUMN `pjtvr_order` INT NULL DEFAULT 0 COMMENT 'Posición en la lista de secciones' AFTER `pjtvr_status`;


ALTER TABLE `cttapp_cire`.`ctt_projects_version` 
ADD COLUMN `pjtvr_order` INT NULL DEFAULT 0 COMMENT 'Posición en la lista de secciones' AFTER `pjtvr_status`;





-- Actualizacion del 15 de agosto 2022
ALTER TABLE `cttapp_cire`.`ctt_budget` 
ADD COLUMN `bdg_discount_insured` DECIMAL(10,2) NULL DEFAULT 0.00 COMMENT 'Descuento sobre el seguro' AFTER `bdg_discount_base`;


ALTER TABLE `cttapp_cire`.`ctt_projects_version` 
ADD COLUMN `pjtvr_discount_insured` DECIMAL(10,2) NULL DEFAULT 0.00 COMMENT 'Descuento sobre el seguro' AFTER `pjtvr_discount_base`;


ALTER TABLE `cttapp_cire`.`ctt_projects_content` 
ADD COLUMN `pjtcn_discount_insured` DECIMAL(10,2) NULL DEFAULT 0.00 COMMENT 'Descuento sobre el seguro' AFTER `pjtcn_discount_base`;


ALTER TABLE `cttapp_cire`.`ctt_projects_mice` 
ADD COLUMN `pjtvr_discount_insured` DECIMAL(10,2) NULL DEFAULT 0.00 COMMENT 'Descuento sobre el seguro' AFTER `pjtvr_discount_base`;

ALTER TABLE `cttapp_cire`.`ctt_version` 
ADD COLUMN `ver_discount_insured` DECIMAL(10,2) NULL DEFAULT 0.00 COMMENT 'Descuento sobre el seguro' AFTER `ver_master`;

ALTER TABLE `ctt_accesories`
CHANGE COLUMN `acr_parent` `prd_parent` INT(11) NULL DEFAULT NULL COMMENT 'ID del producto padre' AFTER `prd_id`;











-- Actualizacion del 22 de Septiembre 2022
ALTER TABLE `cttapp_cire`.`ctt_version` 
ADD COLUMN `ver_contain` JSON NULL COMMENT 'Contiene el detalle general de la cotización' AFTER `pjt_id`;









-- Actualizacion del 04 de Octubre 2022
DROP VIEW ctt_vw_subletting;
CREATE VIEW ctt_vw_subletting AS
SELECT
  pr.cin_id, pr.doc_id, sr.emp_id, pc.pjt_id, pc.pjtcn_days_base, pc.pjtcn_days_test, pc.pjtcn_days_trip, pc.pjtcn_discount_base, pc.pjtcn_discount_test,
  pc.pjtcn_discount_trip, pc.pjtcn_id, pc.pjtcn_insured, pc.pjtcn_prod_level, pc.pjtcn_prod_name, pc.pjtcn_prod_price, pc.pjtcn_prod_sku, pc.pjtcn_quantity, 
  pc.pjtcn_status, pd.pjtdt_id, pd.pjtdt_prod_sku, pr.prd_code_provider, pr.prd_coin_type, pr.prd_comments, pr.prd_english_name, pr.prd_id, pr.prd_insured, 
  pr.prd_level, pr.prd_lonely, pr.prd_model, pr.prd_name, pr.prd_name_provider, pr.prd_price, pr.prd_sku, pr.prd_status, pr.prd_visibility, sb.prj_id, pr.sbc_id, 
  pd.ser_id, pr.srv_id, sr.str_id, sr.str_name, sr.str_status, sr.str_type, sb.sub_comments, sb.sub_date_end, sb.sub_date_start, sb.sub_id, sb.sub_price, 
  sb.sub_quantity, sp.sup_business_name, sp.sup_comments, sp.sup_contact, sp.sup_credit, sp.sup_credit_days, sp.sup_email, sp.sup_id, sp.sup_money_advance, 
  sp.sup_phone, sp.sup_phone_extension, sp.sup_rfc, sp.sup_status, sp.sup_trade_name, sp.sut_id, pc.ver_id,
  ROW_NUMBER() OVER ( partition by pr.prd_sku ORDER BY pr.prd_name asc ) AS num
FROM ctt_projects_content AS pc
    INNER JOIN ctt_projects_detail AS pd ON pd.pjtvr_id = pc.pjtvr_id
    INNER JOIN ctt_products AS pr ON pr.prd_id = pd.prd_id
    LEFT JOIN ctt_subletting AS sb ON sb.ser_id = pd.ser_id
    LEFT JOIN ctt_suppliers AS sp ON sp.sup_id = sb.sup_id
    LEFT JOIN ctt_stores_products AS st ON st.ser_id = pd.ser_id
    LEFT JOIN ctt_stores AS sr ON sr.str_id = st.str_id
WHERE ( pd.pjtdt_prod_sku = 'Pendiente' OR LEFT(RIGHT(pd.pjtdt_prod_sku, 4), 1) = 'R');



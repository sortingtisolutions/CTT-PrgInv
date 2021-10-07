-- Actualizacion del 7 de octubre 2021

ALTER TABLE `ctt_series` CHANGE COLUMN `pjtcn_id` `pjtdt_id` INT(11) NULL DEFAULT NULL COMMENT 'Id del detalle de proyecto relacion ctt_projects_detail' ;

ALTER TABLE `ctt_customers` 
CHANGE COLUMN `Another_phone`         `cus_phone_2`                 VARCHAR(11)     NULL DEFAULT NULL   COMMENT 'Otro Telefono'                     AFTER `cus_phone`,
CHANGE COLUMN `Internal_code`         `cus_internal_code`           VARCHAR(5)      NULL DEFAULT NULL   COMMENT 'Otro Telefono'                     AFTER `cus_phone_2`,
CHANGE COLUMN `cus_rfc`               `cus_rfc`                     VARCHAR(100)    NULL DEFAULT NULL   COMMENT 'RFC del cliente'                   AFTER `cus_email`,
CHANGE COLUMN `legal_representative`  `cus_legal_representative`    INT             NULL DEFAULT NULL   COMMENT 'Representante legal 1-Si, 0-No'    AFTER `cus_sponsored`,
CHANGE COLUMN `Legal_act`             `cus_legal_act`               INT             NULL                COMMENT 'Acta Constitutiva 1-Si, 0-No'      AFTER `cus_legal_representative`,
CHANGE COLUMN `cus_contract`          `cus_contract`                INT             NULL                COMMENT 'Contrato de Servicio 1-Si, 0-No'   AFTER `cus_legal_act`;

ALTER TABLE `ctt_suppliers` 
CHANGE COLUMN `tradename`       `sup_trade_name`        VARCHAR(100)    NOT NULL            COMMENT 'Nombre Comercial'                              AFTER `sup_business_name`,
CHANGE COLUMN `sup_status`      `sup_status`            VARCHAR(1)      NULL DEFAULT NULL   COMMENT 'Estatus del proveedor 1-Activo, 0-Inactivo'    AFTER `sup_comments`,
CHANGE COLUMN `sut_id`          `sut_id`                INT(11)         NULL DEFAULT NULL   COMMENT 'Tipo de Proveedor'                             AFTER `sup_status`,
CHANGE COLUMN `phone extension` `sup_phone_extension`   VARCHAR(10)     NOT NULL            COMMENT 'Extension del telefono' ,
CHANGE COLUMN `credit`          `sup_credit`            INT(11)         NOT NULL            COMMENT 'Ofrece credito 1-Si, 0-No' ,
CHANGE COLUMN `Credit_days`     `sup_credit_days`       INT(11)         NOT NULL DEFAULT 0  COMMENT 'Dias de Credito' ,
CHANGE COLUMN `money_advance`   `sup_money_advance`     INT(11)         NOT NULL            COMMENT 'Anticipo 1-Si, 0-No' ,
CHANGE COLUMN `comments`        `sup_comments`          VARCHAR(100)    NOT NULL            COMMENT 'Comentarios sobre el cliente' ;

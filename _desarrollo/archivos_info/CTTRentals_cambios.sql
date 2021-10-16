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



DROP VIEW ctt_vw_subletting;

CREATE VIEW ctt_vw_subletting AS
SELECT 
	pr.cin_id, 
	pr.doc_id, 
	sr.emp_id, 
	pc.pjt_id, 
	pc.pjtcn_days_base, 
	pc.pjtcn_days_test, 
	pc.pjtcn_days_trip, 
	pc.pjtcn_discount_base, 
	pc.pjtcn_discount_test, 
	pc.pjtcn_discount_trip, 
	pc.pjtcn_id, 
	pc.pjtcn_insured, 
	pc.pjtcn_prod_level, 
	pc.pjtcn_prod_name, 
	pc.pjtcn_prod_price, 
	pc.pjtcn_prod_sku, 
	pc.pjtcn_quantity, 
	pc.pjtcn_status, 
	pd.pjtdt_id, 
	pd.pjtdt_prod_sku, 
	pr.prd_code_provider, 
	pr.prd_coin_type, 
	pr.prd_comments, 
	pr.prd_english_name, 
	pr.prd_id, 
	pr.prd_insured, 
	pr.prd_level, 
	pr.prd_lonely, 
	pr.prd_model, 
	pr.prd_name, 
	pr.prd_name_provider, 
	pr.prd_price, 
	pr.prd_sku, 
	pr.prd_status, 
	pr.prd_visibility, 
	sb.prj_id, 
	pr.sbc_id, 
	pd.ser_id, 
	pr.srv_id, 
	sr.str_id, 
	sr.str_name, 
	sr.str_status, 
	sr.str_type, 
	sb.sub_comments, 
	sb.sub_date_end, 
	sb.sub_date_start, 
	sb.sub_id, 
	sb.sub_price, 
	sb.sub_quantity, 
	sp.sup_business_name, 
	sp.sup_comments, 
	sp.sup_contact, 
	sp.sup_credit, 
	sp.sup_credit_days, 
	sp.sup_email, 	
	sp.sup_id, 
	sp.sup_money_advance, 
	sp.sup_phone, 
	sp.sup_phone_extension, 
	sp.sup_rfc, 
	sp.sup_status, 
	sp.sup_trade_name, 
	sp.sut_id, 
	pc.ver_id, 
	ROW_NUMBER() OVER (partition by pr.prd_sku ORDER BY pr.prd_name asc) AS reng
FROM ctt_projects_content       AS pc
INNER JOIN ctt_projects_detail  AS pd ON pd.pjtcn_id = pc.pjtcn_id 
INNER JOIN ctt_products         AS pr ON pr.prd_id = pd.prd_id 
LEFT JOIN ctt_subletting        AS sb ON sb.ser_id = pd.ser_id
LEFT JOIN ctt_suppliers         AS sp ON sp.sup_id = sb.sup_id
LEFT JOIN ctt_stores_products   AS st ON st.ser_id = pd.ser_id
LEFT JOIN ctt_stores            AS sr ON sr.str_id = st.str_id
WHERE (pd.pjtdt_prod_sku = 'Pendiente' OR LEFT(RIGHT(pd.pjtdt_prod_sku, 4),1) ='R');
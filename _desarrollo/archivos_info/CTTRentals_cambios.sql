-- Actualizacion del 25 de noviembre 2021

ALTER TABLE `cttapp_cire`.`ctt_subcategories` 
ADD COLUMN `sbc_quantity` INT NULL DEFAULT 0 COMMENT 'Cantidad de productos contenidos' AFTER `sbc_status`;




-- Actualizacion del 29 de diciembre 2021

DROP VIEW ctt_vw_subletting;

CREATE VIEW ctt_vw_subletting AS
SELECT 
    pr.cin_id,              pr.doc_id,              sr.emp_id,              pc.pjt_id,
    pc.pjtcn_days_base,     pc.pjtcn_days_test,     pc.pjtcn_days_trip,     pc.pjtcn_discount_base, 
    pc.pjtcn_discount_test, pc.pjtcn_discount_trip, pc.pjtcn_id,            pc.pjtcn_insured,
    pc.pjtcn_prod_level,    pc.pjtcn_prod_name,     pc.pjtcn_prod_price,    pc.pjtcn_prod_sku,
    pc.pjtcn_quantity,      pc.pjtcn_status,        pd.pjtdt_id,            pd.pjtdt_prod_sku,
    pr.prd_code_provider,   pr.prd_coin_type,       pr.prd_comments,        pr.prd_english_name,
    pr.prd_id,              pr.prd_insured,         pr.prd_level,           pr.prd_lonely,
    pr.prd_model,           pr.prd_name,            pr.prd_name_provider,   pr.prd_price,
    pr.prd_sku,             pr.prd_status,          pr.prd_visibility,      sb.prj_id,
    pr.sbc_id,              pd.ser_id,              pr.srv_id,              sr.str_id,
    sr.str_name,            sr.str_status,          sr.str_type,            sb.sub_comments,
    sb.sub_date_end,        sb.sub_date_start, 	    sb.sub_id,              sb.sub_price,
    sb.sub_quantity,        sp.sup_business_name,   sp.sup_comments,        sp.sup_contact,
    sp.sup_credit,          sp.sup_credit_days,     sp.sup_email,           sp.sup_id,
    sp.sup_money_advance,   sp.sup_phone,           sp.sup_phone_extension, sp.sup_rfc,
    sp.sup_status,          sp.sup_trade_name,      sp.sut_id,              pc.ver_id, 
	ROW_NUMBER() OVER (partition by pr.prd_sku ORDER BY pr.prd_name asc) AS reng
FROM ctt_projects_content       AS pc
INNER JOIN ctt_projects_detail  AS pd ON pd.pjtcn_id = pc.pjtcn_id 
INNER JOIN ctt_products         AS pr ON pr.prd_id = pd.prd_id 
LEFT JOIN ctt_subletting        AS sb ON sb.ser_id = pd.ser_id
LEFT JOIN ctt_suppliers         AS sp ON sp.sup_id = sb.sup_id
LEFT JOIN ctt_stores_products   AS st ON st.ser_id = pd.ser_id
LEFT JOIN ctt_stores            AS sr ON sr.str_id = st.str_id
WHERE (pd.pjtdt_prod_sku = 'Pendiente' OR LEFT(RIGHT(pd.pjtdt_prod_sku, 4),1) ='R');



DROP VIEW ctt_vw_subcategories;
CREATE VIEW ctt_vw_subcategories AS
    SELECT 
        CONCAT('<i class="fas fa-pen modif" data="', sc.sbc_id,'"></i><i class="fas fa-times-circle kill" data="', sc.sbc_id , '"></i>') AS editable,
        sc.sbc_id   AS subcatid,
        sc.sbc_code AS subccode,
        sc.sbc_name AS subcname,
        ct.cat_name AS catgname,
        ct.cat_id   AS catgcode,
        CONCAT_WS('<span class="toLink">', IFNULL(SUM(sc.sbc_quantity), 0), '</span>') AS quantity
    FROM ctt_subcategories AS sc
    INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
    WHERE sc.sbc_status = '1'
    AND ct.cat_status = '1'
    GROUP BY sc.sbc_id;



DROP TRIGGER actualiza_subcategorias;
CREATE TRIGGER actualiza_subcategorias AFTER UPDATE ON ctt_stores_products
FOR EACH ROW
    UPDATE ctt_subcategories as sc SET sbc_quantity = (
        SELECT  ifnull(sum(sp.stp_quantity),0) 
        FROM  ctt_stores_products           AS sp
        INNER JOIN ctt_series               AS sr ON sr.ser_id = sp.ser_id
        INNER JOIN ctt_products             AS pr ON pr.prd_id = sr.prd_id
        WHERE sr.ser_status = 1 AND pr.prd_level IN ('P','K') and pr.sbc_id = sc.sbc_id
    );

-- Actualizacion del 6 de diciembre 2021
ALTER TABLE `ctt_documents` ADD `doc_admission_date` DATE NULL DEFAULT NULL COMMENT 'Fecha de admision del documento' AFTER `dot_id`;
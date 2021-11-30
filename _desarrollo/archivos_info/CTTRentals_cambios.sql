-- Actualizacion del 25 de noviembre 2021

ALTER TABLE `cttapp_cire`.`ctt_subcategories` 
ADD COLUMN `sbc_quantity` INT NULL DEFAULT 0 COMMENT 'Cantidad de productos contenidos' AFTER `sbc_status`;



CREATE TRIGGER actualiza_subcategorias AFTER UPDATE ON ctt_stores_products
FOR EACH ROW
    UPDATE ctt_subcategories as sc SET sbc_quantity = (
        SELECT  ifnull(sum(sp.stp_quantity),0) 
        FROM  ctt_stores_products           AS sp
        INNER JOIN ctt_series               AS sr ON sr.ser_id = sp.ser_id
        INNER JOIN ctt_products             AS pr ON pr.prd_id = sr.prd_id
        INNER JOIN ctt_subcategories        AS st ON st.sbc_id = pr.sbc_id
        WHERE sr.ser_status = 1 AND pr.prd_level IN ('P','K') and st.sbc_id = sc.sbc_id
    );
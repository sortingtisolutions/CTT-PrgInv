ALTER TABLE `ctt_subletting`
	ADD COLUMN `prd_id` INT(11) NULL DEFAULT NULL COMMENT 'ID del producto relacion con ctt_products' AFTER `cin_id`;
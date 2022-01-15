-- Actualizacion del 11 de ENERO 2022

ALTER TABLE ctt_series DROP COLUMN ser_reserve_start;

ALTER TABLE ctt_series DROP COLUMN ser_reserve_end;

ALTER TABLE ctt_series CHANGE COLUMN pjtdt_id INT(11) NULL DEFAULT 0 COMMENT 'Id del detalle de proyecto relacion ctt_projects_detail' ;

ALTER TABLE ctt_projects_detail ADD COLUMN pjtdt_belongs INT NULL DEFAULT 0 COMMENT 'Id del detalle padre' AFTER pjtdt_id;

ALTER TABLE ctt_projects_periods ADD COLUMN pjtdt_belongs INT NULL COMMENT 'Id del detalle padre' AFTER pjtdt_id;

ALTER TABLE ctt_projects_periods ADD COLUMN pjtdt_sequence INT NULL DEFAULT 1 COMMENT Secuencia de periodos AFTER pjtdt_belongs;

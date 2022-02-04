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

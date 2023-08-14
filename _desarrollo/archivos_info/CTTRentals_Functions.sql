-- ************** FUNCIONES A CREAR ***********************

--**************fun_addstock**********************
DELIMITER //
CREATE FUNCTION fun_addstock(prdid INT) RETURNS INT
BEGIN

declare lexist	INT DEFAULT 0;
	
select count(*) into lexist from ctt_products
WHERE prd_id=prdid;

IF (lexist >= 1) THEN

	UPDATE ctt_products SET prd_stock=prd_stock+1 
	WHERE prd_id=prdid;

END IF;

RETURN lexist;
END //

-- ************** fun_buscarentas ***********************
DELIMITER //
CREATE OR REPLACE DEFINER=`root`@`localhost` FUNCTION `fun_buscarentas`(`lval` VARCHAR(15)) RETURNS INT
BEGIN
declare salida		VARCHAR(2);
declare p_sbc		INT;
declare p_idprd		INT;
	
declare cur_findsku cursor for
SELECT IFNULL(COUNT(*),0) FROM ctt_series AS sr
INNER JOIN ctt_products AS pr ON pr.prd_id=sr.prd_id
WHERE substr(sr.ser_sku,1,7)=lval AND pr.prd_level='P'
AND sr.ser_situation<>'D';

DECLARE CONTINUE HANDLER FOR NOT FOUND SET @find = TRUE;

	OPEN cur_findsku;
	loop1: LOOP
	FETCH cur_findsku INTO p_idprd;

	IF @find THEN
		LEAVE loop1;
	END IF;
	
	END LOOP loop1;
	CLOSE cur_findsku;
	
    RETURN p_idprd;
END //

--*****************fun_reststock*********************
DELIMITER //
CREATE FUNCTION fun_reststock(prdid INT) RETURNS INT
BEGIN

declare lexist	INT DEFAULT 0;
	
select count(*) into lexist from ctt_products
WHERE prd_id=prdid;

IF (lexist >= 1) THEN

	UPDATE ctt_products SET prd_stock=prd_stock-1 
	WHERE prd_id=prdid;

END IF;

RETURN lexist;
END //

-- ************** fun_updateuser ***********************
DELIMITER //
CREATE OR REPLACE DEFINER=`root`@`localhost` FUNCTION `fun_updateuser`(pjtid INT, areid INT(2), empid INT, empname VARCHAR(100), usrid INT) RETURNS INT
BEGIN

declare lexist	INT DEFAULT 0;
	
select count(*) into lexist from ctt_who_attend_projects
WHERE pjt_id=pjtid and are_id=areid;

IF (lexist = 1) then
	UPDATE ctt_who_attend_projects 
	SET emp_id=empid, 
		emp_fullname=empname,
		usr_id=usrid
	WHERE pjt_id=pjtid and are_id=areid;
ELSE
	INSERT INTO ctt_who_attend_projects (pjt_id,usr_id,emp_id,emp_fullname,are_id)
	VALUES (pjtid,usrid,empid,empname,areid);

END IF;

RETURN lexist;
END //


--***************fun_buscamaxacc*************************
DELIMITER //
CREATE FUNCTION fun_buscamaxacc(lval VARCHAR(15)) RETURNS VARCHAR(2)
BEGIN
-- Desarrolo por jjr
declare salida		VARCHAR(2);
declare p_sbc		INT;
declare p_idprd		VARCHAR(2);
	
declare cur_findsku cursor for
SELECT DISTINCT LPAD(IFNULL(MAX(SUBSTR(prd_sku,12,2)),0)+1,2,'0')
FROM ctt_products
WHERE substr(prd_sku,1,7)=lval AND prd_level='A';

DECLARE CONTINUE HANDLER FOR NOT FOUND SET @find = TRUE;

	OPEN cur_findsku;
	loop1: LOOP
	FETCH cur_findsku INTO p_idprd;

	IF @find THEN
		LEAVE loop1;
	END IF;
	
	END LOOP loop1;
	CLOSE cur_findsku;
	
    RETURN p_idprd;
END //

--***************fnc_ordersection*************************
DELIMITER //
CREATE OR REPLACE FUNCTION fnc_ordersection(valprdid INT) RETURNS INT
BEGIN

declare prdid		INT;
declare pckqty		INT;
declare prdname		VARCHAR(100);
declare prdstock	INT;
declare valant		INT DEFAULT 2;
declare valnew		INT DEFAULT 0;
	
DECLARE cur_findpkt cursor FOR
SELECT bdg_id, bdg_prod_sku,bdg_section,bdg_order
FROM ctt_budget
WHERE ver_id=5
GROUP BY bdg_id,bdg_prod_sku,bdg_section,bdg_order 
ORDER BY bdg_section, SUBSTR(bdg_prod_sku,1,4);

DECLARE CONTINUE HANDLER FOR NOT FOUND SET @find = TRUE;

	OPEN cur_findpkt;
	loop1: LOOP
	FETCH cur_findpkt INTO prdid,prdname,pckqty,prdstock;

	IF @find THEN
		LEAVE loop1;
	END IF;
	
		UPDATE ctt_budget SET bdg_order=valnew+1
		WHERE bdg_id=prdid;
	
		SET valnew=valnew+1;
	END LOOP loop1;
	CLOSE cur_findpkt;

    RETURN valnew;
END //

--***************fnc_maxpckts***********************
DELIMITER //
CREATE OR REPLACE FUNCTION fnc_maxpckts(valprdid INT) RETURNS INT
BEGIN

declare prdid		INT;
declare pckqty		INT;
declare prdname		VARCHAR(100);
declare prdstock	INT;
declare valant		INT;
declare valnew		INT DEFAULT 0;
	
DECLARE cur_findpkt cursor FOR
SELECT prd_id,pck_quantity FROM ctt_products_packages
WHERE prd_parent=valprdid ORDER BY prd_id;

DECLARE CONTINUE HANDLER FOR NOT FOUND SET @find = TRUE;

	OPEN cur_findpkt;
	loop1: LOOP
	FETCH cur_findpkt INTO prdid,pckqty;

	IF @find THEN
		INSERT INTO ctt_activity_log (log_event,emp_number,emp_fullname,acc_id)
		VALUES(valprdid,0,"FIN YA NO HAY MAS REGISTROS",valant);
		LEAVE loop1;
	END IF;
	
		SELECT prd_stock INTO prdstock FROM ctt_products
		WHERE prd_id=prdid;
			
		IF (prdstock < valant)  THEN
			set valant=prdstock;
			INSERT INTO ctt_activity_log (log_event,emp_number,emp_fullname,acc_id)
			VALUES(valprdid,prdid,'Si Cambio Valor',valant);
		END IF;
	
	END LOOP loop1;
	CLOSE cur_findpkt;
--	UPDATE ctt_products SET prd_stock=valant
--	WHERE prd_id=valprdid;
    RETURN valant;
	
END //

--*******************************
DELIMITER //
CREATE FUNCTION `fun_maxcontent`(`pprjId` INT) RETURNS int(11)
LANGUAGE SQL
NOT DETERMINISTIC
CONTAINS SQL
SQL SECURITY DEFINER
COMMENT ''
BEGIN
	DECLARE max_content INT;
	
	SELECT MAX(pjtcn_order) INTO max_content FROM ctt_projects_content WHERE pjt_id=pprjId;
	
	RETURN max_content;
END //
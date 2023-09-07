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
CREATE OR REPLACE FUNCTION `fun_buscarentas`(`lval` VARCHAR(15)) RETURNS INT
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
CREATE OR REPLACE FUNCTION `fun_updateuser`(pjtid INT, areid INT(2), empid INT, empname VARCHAR(100), usrid INT) RETURNS INT
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


--*****************************
DROP FUNCTION IF EXISTS `Fun_ProcessBackAccesories`;
DELIMITER //
CREATE FUNCTION Fun_ProcessBackAccesories(pverid INT(4), ppjtid INT(4)) RETURNS INT(2)
BEGIN
declare ssku 		CHAR(15);
declare tcont 		INT DEFAULT 0;

declare pjtdtid		INT;
declare pjtvrid		INT;
declare serid		INT;
declare prodId		INT;
declare dtstar		DATE;
declare dtinic		DATE;
declare dtfinl		DATE;

declare dybase		INT;
declare dytrip		INT;
declare dytest		INT;
declare ressettacc 	INT;

declare dyinic		INT;
declare dyfinl	 	INT;
declare lconta	 	INT;
declare asku 		CHAR(15);
declare lmensa		CHAR(30);
declare datos		CHAR(230);
declare acount	 	INT;


DECLARE cbase_content CURSOR FOR
SELECT pd.pjtdt_id, pd.pjtdt_prod_sku, pd.ser_id, pd.prd_id, pd.pjtvr_id, 
pj.pjt_date_start, pc.pjtcn_days_base, pc.pjtcn_days_trip, pc.pjtcn_days_test,
SUBDATE(pj.pjt_date_start, (pc.pjtcn_days_trip+pc.pjtcn_days_test)) AS resdate,
ADDDATE(pj.pjt_date_start, (pc.pjtcn_days_base+pc.pjtcn_days_trip)) AS sumtotal 
FROM ctt_projects_detail AS pd
INNER JOIN ctt_projects_content AS pc ON pc.pjtvr_id=pd.pjtvr_id
INNER JOIN ctt_projects AS pj ON pj.pjt_id=pc.pjt_id
WHERE pc.ver_id = pverid AND pd.ser_id>0 AND substr(pd.pjtdt_prod_sku,11,1)!='A';

DECLARE CONTINUE HANDLER FOR NOT FOUND SET @done=TRUE;

	SET lmensa = "start";
	set lconta=0;
	set ressettacc=0;
	
	OPEN cbase_content;
		loop1: LOOP
	FETCH cbase_content INTO pjtdtid,ssku,serid,prodId,pjtvrid,dtstar,dybase,dytrip,dytest,dtinic,dtfinl;

	IF @done THEN
		SET lmensa = "END CONTENT";
		INSERT INTO ctt_activity_log (log_event,emp_number,emp_fullname) VALUES(pverid,pverid,lmensa);
		LEAVE loop1;
	END IF;
		
	SELECT count(ser_id) INTO acount FROM ctt_series WHERE prd_id_acc = serid;
	
	SET datos = CONCAT(ssku,' --- ', pjtdtid,' - ',serid,' - ',dtinic,' - ',dtfinl);
	
	IF acount>0 THEN
		
		INSERT INTO ctt_projects_detail(
				pjtdt_belongs, pjtdt_prod_sku,ser_id, prd_id, pjtvr_id )
		SELECT  pjtdtid , a.ser_sku, a.ser_id, a.prd_id, pjtvrid
		FROM ctt_series a WHERE a.prd_id_acc=serid;
		
		UPDATE ctt_series SET ser_situation = 'EA', ser_stage = 'R',
				ser_reserve_count = ser_reserve_count + 1
		WHERE prd_id_acc = serid;
		
		INSERT INTO ctt_projects_periods 
			(pjtpd_day_start, pjtpd_day_end, pjtdt_id, pjtdt_belongs ) 
		SELECT dtinic , dtfinl , dt.pjtdt_id, dt.pjtdt_belongs
		FROM ctt_projects_detail dt 
		INNER JOIN ctt_series sr ON sr.ser_id=dt.ser_id
		WHERE sr.prd_id_acc = serid;
		
		INSERT INTO ctt_actions (acc_description,acc_type,mod_id) 
		VALUES(datos,serid,acount);
		set ressettacc=0;
		set lconta=lconta+1;
		
	ELSE 
		SET lmensa = "ERROR";
		INSERT INTO ctt_activity_log (log_event,emp_number,emp_fullname) 
		VALUES(serid,pjtvrid,lmensa);
	END IF;	
	
END LOOP loop1;
CLOSE cbase_content;

return lconta;
END //
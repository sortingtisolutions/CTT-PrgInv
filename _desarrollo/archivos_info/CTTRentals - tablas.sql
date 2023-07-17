-- CREATE DATABASE 'cttapp_cire'

/* ACCESORIOS */

DROP TABLE IF EXISTS `ctt_accesories`;
CREATE TABLE IF NOT EXISTS `ctt_accesories` (
    `acr_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del accesorio',
    `acr_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del accesorio D-Disponible, N-No disponible',
    `prd_id`                    int(11) NOT NULL                                COMMENT 'Id del producto relaciòn ctt_products',
    `prd_parent`                int(11) DEFAULT NULL                            COMMENT 'ID del producto padre',
  PRIMARY KEY (`acr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Productos o accesorios dependientes de otros productos';


/* ACCIONES  */
DROP TABLE IF EXISTS `ctt_actions`;
CREATE TABLE IF NOT EXISTS `ctt_actions` (
    `acc_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de la acción',
    `acc_description`           varchar(300) NOT NULL                           COMMENT 'Descripción de la acción realizada por el usuario en un modulo',
    `acc_type`                  varchar(50) NOT NULL                            COMMENT 'Tipo de accion',
    `mod_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del modulo relacion ctt_module',
  PRIMARY KEY (`acc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de tipos de acciones realizadas por un usuario dentro del sistema';


/* BITACORA DE ACTIVIDAD  */
DROP TABLE IF EXISTS `ctt_activity_log`;
CREATE TABLE IF NOT EXISTS `ctt_activity_log` (
    `log_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de la bitácora',
    `log_date`                  datetime DEFAULT current_timestamp()            COMMENT 'Fecha de registro de la actividad',
    `log_event`                 varchar(100) NOT NULL                           COMMENT 'Detalle de la acción realizada',
    `emp_number`                varchar(50) NOT NULL                            COMMENT 'Numero del empleado',
    `emp_fullname`              varchar(100) NOT NULL                           COMMENT 'Nombre del empleado',
    `acc_id`                    int(11) DEFAULT NULL                            COMMENT 'ID de la accion relacion ctt_actions',
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Bitácora de actividades realizadas en el sistema';



/* AREAS  */
DROP TABLE IF EXISTS `ctt_areas`;
CREATE TABLE IF NOT EXISTS `ctt_areas` (
    `are_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del área',
    `are_name`                  varchar(50) DEFAULT NULL                        COMMENT 'nombre del área',
    `are_status`                int(11) DEFAULT 1                               COMMENT 'Estatus del área 1-activo 0-inactivo',
  PRIMARY KEY (`are_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Áreas organizacionales de la empresa';



/* COTIZACIONES  */
DROP TABLE IF EXISTS `ctt_budget`;
CREATE TABLE IF NOT EXISTS `ctt_budget` (
    `bdg_id`                      int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id de la cotización',
    `bdg_prod_sku`                varchar(15) DEFAULT NULL                        COMMENT 'SKU identificador del producto',
    `bdg_prod_name`               varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto',
    `bdg_prod_price`              decimal(10,2) DEFAULT NULL                      COMMENT 'Precio unitario del producto',
    `bdg_prod_level`              varchar(1) DEFAULT 'P'                          COMMENT 'Nivel del producto  K=Kit, P=Producto',
    `bdg_section`                 smallint(1) DEFAULT 1                           COMMENT 'Sección en la que se agrupan los productos',
    `bdg_quantity`                int(11) DEFAULT NULL                            COMMENT 'Cantidad de productos',
    `bdg_days_base`               int(11) DEFAULT 1                               COMMENT 'Días solicitados en renta',
    `bdg_days_cost`               int(11) DEFAULT 1                               COMMENT 'Días en cotización en renta',
    `bdg_discount_base`           decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento aplicado a la renta',
    `bdg_discount_insured`        decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento sobre el seguro',
    `bdg_days_trip`               int(11) DEFAULT 0                               COMMENT 'Días solicitados en viaje',
    `bdg_discount_trip`           decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento aplicado al viaje',
    `bdg_days_test`               int(11) DEFAULT 0                               COMMENT 'Días solicitados en prueba',
    `bdg_discount_test`           decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento aplicado en prueba',
    `bdg_insured`                 decimal(10,2) DEFAULT 0.10                      COMMENT 'Porcentaje de seguro',
    `bdg_order`                   int(11) DEFAULT 0                               COMMENT 'Posición en la lista de secciones',
    `ver_id`                      int(11) NOT NULL                                COMMENT 'FK Id de la version relación ctt_version',
    `prd_id`                      int(11) NOT NULL                                COMMENT 'FK Id del producto relación ctt_products',
  PRIMARY KEY (`bdg_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Cotizaciones generadas';



/* CATALOGOS  */
DROP TABLE IF EXISTS `ctt_categories`;
CREATE TABLE IF NOT EXISTS `ctt_categories` (
    `cat_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del catálogo',
    `cat_name`                  varchar(100) CHARACTER SET utf8 DEFAULT NULL    COMMENT 'Nombre del catálogo',
    `cat_status`                varchar(1) CHARACTER SET utf8 DEFAULT '1'       COMMENT 'Estatus del catálogo 1-Activo, 0-Inactivo',
    `str_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del almcen relación ctt_stores',
  PRIMARY KEY (`cat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Corresponde a los catalogos de la organización.';




/* MONEDAS  */
DROP TABLE IF EXISTS `ctt_coins`;
CREATE TABLE IF NOT EXISTS `ctt_coins` (
    `cin_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de la moneda',
    `cin_code`                  varchar(3) DEFAULT NULL                         COMMENT 'Clave de la moneda',
    `cin_number`                int(11) DEFAULT NULL                            COMMENT 'Numero de la moneda',
    `cin_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre de la moneda',
    `cin_status`                int(11) DEFAULT 1                               COMMENT 'Estatus de la moneda 1-activo 0-inactivo',
  PRIMARY KEY (`cin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla catalogo de monedas';



/* COMENTARIOS  */
DROP TABLE IF EXISTS `ctt_comments`;
CREATE TABLE IF NOT EXISTS `ctt_comments` (
    `com_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del comentario',
    `com_source_section`        varchar(50) DEFAULT NULL                        COMMENT 'Sección a la que pertenece',
    `com_action_id`             int(11) DEFAULT NULL                            COMMENT 'Id del movimiento de la sección',
    `com_date`                  datetime DEFAULT current_timestamp()            COMMENT 'Fecha de registro del comentario',
    `com_user`                  varchar(50) DEFAULT NULL                        COMMENT 'Nombre del empleado quee generó el comentario',
    `com_comment`               varchar(300) DEFAULT NULL                       COMMENT 'Contenido del comentario',
    `com_status`                int(11) DEFAULT 0                               COMMENT 'Estatus del comentario 1-aplicado 0-no aplicado',
  PRIMARY KEY (`com_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Comentarios de las secciones del sistema';



/* GENERADOR DE FOLIOS  */
DROP TABLE IF EXISTS `ctt_counter_exchange`;
CREATE TABLE IF NOT EXISTS `ctt_counter_exchange` (
    `con_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del contador',
    `con_date`                  datetime DEFAULT current_timestamp()            COMMENT 'Fecha de registro del movimiento',
    `con_status`                int(11) DEFAULT 1                               COMMENT 'Estatus del folio 1-activo 0-inactivo',
  PRIMARY KEY (`con_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla generador de folios';




/* CLIENTES  */
DROP TABLE IF EXISTS `ctt_customers`;
CREATE TABLE IF NOT EXISTS `ctt_customers` (
    `cus_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del cliente',
    `cus_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del cliente',
    `cus_contact`               varchar(50) DEFAULT NULL                        COMMENT 'nombre del contacto',
    `cus_address`               varchar(300) DEFAULT NULL                       COMMENT 'Domicilio del cliente',
    `cus_email`                 varchar(100) DEFAULT NULL                       COMMENT 'Correo electrónico del cliente',
    `cus_rfc`                   varchar(15) DEFAULT NULL                        COMMENT 'RFC del cliente',
    `cus_phone`                 varchar(100) DEFAULT NULL                       COMMENT 'Teléfono del cliente',
    `cus_phone_2`               varchar(11) DEFAULT NULL                        COMMENT 'Otro Telefono',
    `cus_internal_code`         varchar(5) DEFAULT NULL                         COMMENT 'Clave Interna',
    `cus_qualification`         varchar(10) DEFAULT NULL                        COMMENT 'Calificación del cliente',
    `cus_prospect`              varchar(1) DEFAULT '0'                          COMMENT 'Registro de cliente 1-cliente 0-prospecto',
    `cus_sponsored`             varchar(1) DEFAULT '0'                          COMMENT 'Cliente con patrocinio 1-con patrocinio 0-sin patrocinio',
    `cus_legal_representative`  int(11) DEFAULT NULL                            COMMENT 'Representante legal 1-Si, 0-No',
    `cus_legal_act`             int(11) DEFAULT NULL                            COMMENT 'Acta Constitutiva 1-Si, 0-No',
    `cus_contract`              int(11) DEFAULT NULL                            COMMENT 'Contrato de Servicio 1-Si, 0-No',
    `cus_fill`                  int(11) DEFAULT 0                               COMMENT 'Porcentaje de llenado de campos fiscales',
    `cut_id`                    int(11) NOT NULL                                COMMENT 'Tipo de cliente relacion con ctt_customer_type',
    `cus_status`                int(11) DEFAULT 1                               COMMENT 'Estatus de la moneda 1-activo 0-inactivo',
  PRIMARY KEY (`cus_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Clientes y prospectos de cliente';



/* RELACION PRODUCTOR - CASA PRODUCTORA  */
DROP TABLE IF EXISTS `ctt_customers_owner`;
CREATE TABLE IF NOT EXISTS `ctt_customers_owner` (
    `cuo_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id de la relacion',
    `cus_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del cliente',
    `cus_parent`                int(11) DEFAULT NULL                            COMMENT 'Id del cliente relación',
  PRIMARY KEY (`cuo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Relacion de clientes pertenecientes a otros clientes';



/* TIPO DE CLIENTE  */
DROP TABLE IF EXISTS `ctt_customers_type`;
CREATE TABLE IF NOT EXISTS `ctt_customers_type` (
    `cut_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del tipo de cliente',
    `cut_name`                  varchar(50) DEFAULT NULL                        COMMENT 'Nombre del tipo de cliente',
  PRIMARY KEY (`cut_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Catálogo de tipos de cliente ';



/* CATALOGO DE DESCUENCTOS  */
DROP TABLE IF EXISTS `ctt_discounts`;
CREATE TABLE IF NOT EXISTS `ctt_discounts` (
    `dis_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del descuento',
    `dis_discount`              decimal(10,2) DEFAULT NULL                      COMMENT 'Porcentaje en decimal',
    `dis_name`                  varchar(10) DEFAULT NULL                        COMMENT 'Porcentaje en texto',
    `dis_level`                 int(11) DEFAULT NULL                            COMMENT 'Nivel ',
    `dis_status`                int(11) DEFAULT 1                               COMMENT 'Estatus del folio 1-activo 0-inactivo',
  PRIMARY KEY (`dis_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de descuentos';



/* DOCUMENTOS  */
DROP TABLE IF EXISTS `ctt_documents`;
CREATE TABLE IF NOT EXISTS `ctt_documents` (
    `doc_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del documento',
    `doc_code`                  varchar(100) DEFAULT NULL                       COMMENT 'Código del documento',
    `doc_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del documento',
    `doc_type`                  varchar(10) DEFAULT NULL                        COMMENT 'Extension del docuemnto',
    `doc_size`                  int(11) DEFAULT NULL                            COMMENT 'Tamaño del documento',
    `doc_content_type`          varchar(100) DEFAULT NULL                       COMMENT 'Tipo del contenido del documento',
    `doc_document`              blob DEFAULT NULL                               COMMENT 'Contenido del documento',
    `dot_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del tipo de documento relacion ctt_documents_type',
  PRIMARY KEY (`doc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Documentos de productos';



/* TIPO DE DOCUMENTOS  */
DROP TABLE IF EXISTS `ctt_documents_type`;
CREATE TABLE IF NOT EXISTS `ctt_documents_type` (
    `dot_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del tipo de documento',
    `dot_code`                  varchar(10) DEFAULT NULL                        COMMENT 'código del tipo de documento',
    `dot_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del tipo documento',
    `dot_status`                varchar(1) DEFAULT '1'                          COMMENT 'Estatus del tipo de documento  1-Activo, 0-Inactivo',
  PRIMARY KEY (`dot_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipos de documentos de productos';



/* EMPLEADOS  */
DROP TABLE IF EXISTS `ctt_employees`;
CREATE TABLE IF NOT EXISTS `ctt_employees` (
    `emp_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del empleado',
    `emp_number`                varchar(50) NOT NULL                            COMMENT 'Numero del empleado',
    `emp_fullname`              varchar(100) NOT NULL                           COMMENT 'Nombre del empleado',
    `emp_area`                  varchar(50) DEFAULT NULL                        COMMENT 'Area a la que pertenece el empleado',
    `emp_report_to`             int(11) DEFAULT NULL                            COMMENT 'ID del empleado jefe inmediato relacion asi mismo',
    `emp_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del empleado 1-Activo, 0-Inactivo',
    `pos_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del puesto relación ctt_post',
    `are_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del area relacion con ctt_areas',
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de los empleados de la empresa';



/* TIPO DE LOCACION  */
DROP TABLE IF EXISTS `ctt_location`;
CREATE TABLE IF NOT EXISTS `ctt_location` (
    `loc_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id de la locación',
    `loc_type_location`         varchar(100) DEFAULT NULL                       COMMENT 'Tipo de locación',
  PRIMARY KEY (`loc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Locación en donde se llevara la filmación';



/* MENU  */
DROP TABLE IF EXISTS `ctt_menu`;
CREATE TABLE IF NOT EXISTS `ctt_menu` (
    `mnu_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del menu',
    `mnu_parent`                int(11) DEFAULT NULL                            COMMENT 'ID del menu padre',
    `mnu_item`                  varchar(100) NOT NULL                           COMMENT 'Elementos del menu',
    `mnu_description`           varchar(300) DEFAULT NULL                       COMMENT 'Descripción del elemento del menu',
    `mnu_order`                 int(11) DEFAULT NULL                            COMMENT 'Ordenamiento de los elementos del menu para su presentación',
    `mod_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del modulo relación ctt_module',
  PRIMARY KEY (`mnu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de los elementos que componene el menu susperior';



/* MODULOS DEL SISTEMA  */
DROP TABLE IF EXISTS `ctt_modules`;
CREATE TABLE IF NOT EXISTS `ctt_modules` (
    `mod_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del módulo',
    `mod_code`                  varchar(50) NOT NULL                            COMMENT 'Código del modulo',
    `mod_name`                  varchar(50) DEFAULT NULL                        COMMENT 'Nombre del modulo',
    `mod_description`           varchar(300) DEFAULT NULL                       COMMENT 'Descripción del módulo',
    `mod_item`                  varchar(50) DEFAULT NULL                        COMMENT 'metodo que corresponde la sección',
  PRIMARY KEY (`mod_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de Módulos que componen el sistema';


/* MOVIMIENTOS  */
DROP TABLE IF EXISTS `ctt_movements`;
CREATE TABLE IF NOT EXISTS `ctt_movements` (
    `mov_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del movimiento',
    `mov_quantity`              int(11) DEFAULT NULL                            COMMENT 'Cantidad modificada',
    `mov_type`                  varchar(45) DEFAULT NULL                        COMMENT 'Tipo de movimiento',
    `mov_status`                varchar(1) DEFAULT '1'                          COMMENT 'Status del movimiento 1= sin revision, 0 = Revisado',
    `mov_date`                  timestamp NULL DEFAULT current_timestamp()      COMMENT 'Fecha y hora del movimiento',
    `prd_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del producto relación ctt_products',
    `pjt_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del proyecto relación ctt_projects',
    `usr_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del usuario relación ctt_users',
  PRIMARY KEY (`mov_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Registra los movimientos de proyectos';





/* PUESTOS  */
DROP TABLE IF EXISTS `ctt_position`;
CREATE TABLE IF NOT EXISTS `ctt_position` (
    `pos_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del puesto',
    `pos_name`                  varchar(50) NOT NULL                            COMMENT 'Nombre del puesto',
    `pos_description`           varchar(300) NOT NULL                           COMMENT 'Descripción del puesto',
    `pos_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del puesto 1-Activo, 0-Inactivo',
  PRIMARY KEY (`pos_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Puestos de empleados en la empresa';



/* PRODUCTOS  */
DROP TABLE IF EXISTS `ctt_products`;
CREATE TABLE IF NOT EXISTS `ctt_products` (
    `prd_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del proveedor',
    `prd_sku`                   varchar(15) DEFAULT NULL                        COMMENT 'SKU identificador del producto',
    `prd_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto',
    `prd_english_name`          varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto en ingles',
    `prd_code_provider`         varchar(30) DEFAULT NULL                        COMMENT 'Código del producto segun proveedor',
    `prd_name_provider`         varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto segun proveedor',
    `prd_model`                 varchar(50) DEFAULT NULL                        COMMENT 'Modelo del producto',
    `prd_price`                 decimal(10,2) DEFAULT NULL                      COMMENT 'Precio unitario del producto',
    `prd_coin_type`             varchar(30) DEFAULT NULL                        COMMENT 'Tipo de moneda',
    `prd_visibility`            varchar(1) DEFAULT NULL                         COMMENT 'Visibilidad del producto en cotización 1-visible, 0-no visible',
    `prd_comments`              varchar(300) DEFAULT NULL                       COMMENT 'Observaciones',
    `prd_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
    `prd_level`                 varchar(1) DEFAULT 'P'                          COMMENT 'Nivel del producto    K=Kit, P=Producto',
    `prd_lonely`                varchar(2) DEFAULT NULL                         COMMENT 'El producto no se puede rentar sin accesorios',
    `prd_insured`               varchar(1) DEFAULT '0'                          COMMENT 'Cotiza seguro 1-si, 0-no',
    `prd_stock`                 int(11) DEFAULT NULL                            COMMENT 'Cantidad existente en almacenes',
    `doc_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del docuemnto para relacionar la ficha técnica ctt_products_documents',
    `sbc_id`                    int(11) DEFAULT NULL                            COMMENT 'ID de la subcategoría relacion ctt_subcategories',
    `srv_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del tipo de servicio relacion ctt_services',
    `cin_id`                    int(11) DEFAULT 1                               COMMENT 'ID del tipo de moneda relacion ctt_coin',
  PRIMARY KEY (`prd_id`),
    KEY `idx_ctt_products_prd_name` (`prd_name`),
    KEY `idx_ctt_products_prd_sku` (`prd_sku`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Productos de la empresa.';



/* RELACION DE DOCUMENTOS - PRODUCTOS  */
DROP TABLE IF EXISTS `ctt_products_documents`;
CREATE TABLE IF NOT EXISTS `ctt_products_documents` (
    `dcp_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de relacion producto-documento',
    `dcp_source`                varchar(1) NOT NULL                             COMMENT 'Tipo de elemento P=Producto, S=Serie',
    `prd_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del producto relacion ctt_productos',
    `doc_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del documento relación ctt_documents',
  PRIMARY KEY (`dcp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Relación de documentos con productos';



/* PAQUETES  */
DROP TABLE IF EXISTS `ctt_products_packages`;
CREATE TABLE IF NOT EXISTS `ctt_products_packages` (
    `pck_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID dela relaión paquete producto',
    `prd_parent`                int(11) DEFAULT NULL                            COMMENT 'ID del producto padre',
    `prd_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del producto hijo relaciòn ctt_products',
    `pck_quantity`              int(11) DEFAULT 1                               COMMENT 'Cantidad de productos',
    `pck_reserved`              int(11) DEFAULT 0                               COMMENT 'Cantidad reservado',
  PRIMARY KEY (`pck_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla pivote que relaiona los productos a un paquete';



/* CATALOGO DE ETAPAS DEL PRODUCTO  */
DROP TABLE IF EXISTS `ctt_products_stages`;
CREATE TABLE IF NOT EXISTS `ctt_products_stages` (
    `ser_situation`             varchar(2) NOT NULL                             COMMENT 'Status de la serie',
    `ser_stage`                 varchar(2) NOT NULL                             COMMENT 'Etapa de la serie segun el status',
    `stage_name`                varchar(50) NOT NULL                            COMMENT 'Nombre la etapa',
    `stage_description`         varchar(100) DEFAULT NULL                       COMMENT 'Descripcion detalla de la etapa de la serie',
  PRIMARY KEY (`ser_stage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Catálogo de las etapars del producto';



/* CATALOGO DEL STATUS DEL PRODUCTO  */
DROP TABLE IF EXISTS `ctt_products_status`;
CREATE TABLE IF NOT EXISTS `ctt_products_status` (
    `ser_situation`             varchar(2) NOT NULL                             COMMENT 'Status de las series',
    `situation_name`            varchar(50) NOT NULL                            COMMENT 'Nombre del status de la serie',
    `situation_description`     varchar(100) DEFAULT NULL                       COMMENT 'Descripcion detalla del status de la serie',
  PRIMARY KEY (`ser_situation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Catálogo de status de proyecto';



/* CATALOGO DEL STATUS DEL PRODUCTO  */
DROP TABLE IF EXISTS `ctt_profiles`;
CREATE TABLE IF NOT EXISTS `ctt_profiles` (
    `prf_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del perfil',
    `prf_code`                  varchar(50) NOT NULL                            COMMENT 'Código del perfi',
    `prf_name`                  varchar(50) DEFAULT NULL                        COMMENT 'Nombre del perfil',
    `prf_description`           varchar(300) DEFAULT NULL                       COMMENT 'Descripción del perfil',
    `prf_mod_start`             varchar(50) DEFAULT NULL                        COMMENT 'ID del modulo de inicio',
    `prf_status`                varchar(1) DEFAULT '1'                          COMMENT 'Estatus del perfil 1-Activo, 0-Inactivo',
  PRIMARY KEY (`prf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de Perfiles';



/* RELACION DE MODULOS CON PERFILES DE USUARIO  */
DROP TABLE IF EXISTS `ctt_profiles_modules`;
CREATE TABLE IF NOT EXISTS `ctt_profiles_modules` (
    `pfm_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de la relacion perfil - modulo',
    `prf_id`                    int(11) NOT NULL                                COMMENT 'FK ID del perfil relacion ctt_profile',
    `mod_id`                    int(11) NOT NULL                                COMMENT 'FK ID del modulo relación ctt_modulo',
  PRIMARY KEY (`pfm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla pivote ctt_profile - ctt_modulo';



/* PROYECTOS  */
DROP TABLE IF EXISTS `ctt_projects`;
CREATE TABLE IF NOT EXISTS `ctt_projects` (
    `pjt_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del proyecto',
    `pjt_parent`                int(11) DEFAULT 0                               COMMENT 'Proyecto padre',
    `pjt_number`                varchar(50) DEFAULT NULL                        COMMENT 'Numero del proyecto',
    `pjt_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del proyecto',
    `pjt_date_project`          datetime DEFAULT current_timestamp()            COMMENT 'Fecha de generación del proyecto',
    `pjt_date_start`            datetime DEFAULT NULL                           COMMENT 'Fecha de inicio del proyecto',
    `pjt_date_end`              datetime DEFAULT NULL                           COMMENT 'Fecha de fin del proyecto',
    `pjt_time`                  varchar(200) DEFAULT NULL                       COMMENT 'Tiempo de duración del proyecto',
    `pjt_location`              varchar(200) DEFAULT NULL                       COMMENT 'Ubicación del desarrollo del proyecto',
    `pjt_status`                varchar(2) DEFAULT '1'                          COMMENT 'Estatus del proyecto 1-Activo, 0-Inactivo',
    `pjt_how_required`          varchar(100) DEFAULT NULL                       COMMENT 'Quien solicitó',
    `pjt_trip_go`               varchar(45) DEFAULT NULL                        COMMENT 'Viaje de Ida',
    `pjt_trip_back`             varchar(45) DEFAULT NULL                        COMMENT 'Viaje de vuelta',
    `pjt_to_carry_on`           varchar(45) DEFAULT NULL                        COMMENT 'Carga',
    `pjt_to_carry_out`          varchar(45) DEFAULT NULL                        COMMENT 'Descarga',
    `pjt_test_tecnic`           varchar(45) DEFAULT NULL                        COMMENT 'Pruebas técnicas',
    `pjt_test_look`             varchar(45) DEFAULT NULL                        COMMENT 'Pruebas Look',
    `cuo_id`                    int(11) NOT NULL                                COMMENT 'FK Id de propietario relacion con ctt_costumer_owner',
    `loc_id`                    int(11) NOT NULL                                COMMENT 'FK Id de la locación relación ctt_location',
    `pjttp_id`                  int(11) NOT NULL                                COMMENT 'Fk Id del Tipo de projecto relacion ctt_projects_type',
    `pjttc_id`                  int(11) NOT NULL                                COMMENT 'Fk Id del Tipo de llamado relacion ctt_projects_type_called',
  PRIMARY KEY (`pjt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='proyectos registrados';



/* CONTENIDO DEL PROYECTO  */
DROP TABLE IF EXISTS `ctt_projects_content`;
CREATE TABLE IF NOT EXISTS `ctt_projects_content` (
    `pjtcn_id`                  int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del contenido del proyecto',
    `pjtcn_prod_sku`            varchar(15) DEFAULT NULL                        COMMENT 'SKU identificador del producto',
    `pjtcn_prod_name`           varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto',
    `pjtcn_prod_price`          decimal(10,2) DEFAULT NULL                      COMMENT 'Precio unitario del producto',
    `pjtcn_quantity`            int(11) DEFAULT NULL                            COMMENT 'Cantidad de productos',
    `pjtcn_days_base`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en renta',
    `pjtcn_days_cost`           int(11) DEFAULT NULL                            COMMENT 'Días en cotización en renta',
    `pjtcn_discount_base`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado a la renta',
    `pjtcn_discount_insured`    decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento sobre el seguro',
    `pjtcn_days_trip`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en viaje',
    `pjtcn_discount_trip`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado al viaje',
    `pjtcn_days_test`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en prueba',
    `pjtcn_discount_test`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado en prueba',
    `pjtcn_insured`             decimal(10,2) DEFAULT 0.10                      COMMENT 'Porcentaje de seguro',
    `pjtcn_prod_level`          varchar(1) DEFAULT 'P'                          COMMENT 'Nivel del producto  K=Kit, P=Producto',
    `pjtcn_section`             int(11) DEFAULT NULL                            COMMENT 'Numero de seccion',
    `pjtcn_status`              varchar(1) DEFAULT '1'                          COMMENT 'Status del contendo del proyecto 1-activo 0-inactivo',
    `pjtcn_order`               int(11) DEFAULT 0                               COMMENT 'Posición en la lista de secciones',
    `ver_id`                    int(11) NOT NULL                                COMMENT 'FK Id de la version relación ctt_version',
    `prd_id`                    int(11) NOT NULL                                COMMENT 'FK Id del producto relación ctt_products',
    `pjt_id`                    int(11) NOT NULL                                COMMENT 'FK Id del proyecto relación ctt_proyect',
    `pjtvr_id`                  int(11) DEFAULT NULL                            COMMENT 'FK Id de la version del proyecto relación ctt_proyect_version',
  PRIMARY KEY (`pjtcn_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Contenido del proyecto cotización promovida';




/* DETALLE DEL PROYECTO  */
DROP TABLE IF EXISTS `ctt_projects_detail`;
CREATE TABLE IF NOT EXISTS `ctt_projects_detail` (
    `pjtdt_id`                  int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del detalle de proyecto',
    `pjtdt_belongs`             int(11) DEFAULT 0                               COMMENT 'Id del detalle al que pertenece',
    `pjtdt_prod_sku`            varchar(15) DEFAULT NULL                        COMMENT 'SKU identificador del producto',
    `ser_id`                    int(11) NOT NULL                                COMMENT 'FK Id de la serie relación ctt_series',
    `prd_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del producto relación con ctt_products',
    `pjtvr_id`                  int(11) NOT NULL                                COMMENT 'FK Id del proyecto relación ctt_projects_version',
  PRIMARY KEY (`pjtdt_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Detalle del proyecto, cotización promovida';



/* PROYECTO EN PANTALLA  */
DROP TABLE IF EXISTS `ctt_projects_mice`;
CREATE TABLE IF NOT EXISTS `ctt_projects_mice` (
    `pjtvr_id`                  int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del contenido del projecto',
    `pjtvr_action`              varchar(2) DEFAULT 'N'                          COMMENT 'Action que debe realizar',
    `pjtvr_prod_sku`            varchar(15) DEFAULT NULL                        COMMENT 'SKU identificador del producto',
    `pjtvr_prod_name`           varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto',
    `pjtvr_prod_price`          decimal(10,2) DEFAULT NULL                      COMMENT 'Precio unitario del producto',
    `pjtvr_quantity`            int(11) DEFAULT NULL                            COMMENT 'Cantidad de productos',
    `pjtvr_quantity_ant`        int(11) DEFAULT NULL                            COMMENT 'Cantidad anterior',
    `pjtvr_days_base`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en renta',
    `pjtvr_days_cost`           int(11) DEFAULT NULL                            COMMENT 'Días en cotización en renta',
    `pjtvr_discount_base`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado a la renta',
    `pjtvr_discount_insured`    decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento sobre el seguro',
    `pjtvr_days_trip`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en viaje',
    `pjtvr_discount_trip`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado al viaje',
    `pjtvr_days_test`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en prueba',
    `pjtvr_discount_test`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado en prueba',
    `pjtvr_insured`             decimal(10,2) DEFAULT 0.10                      COMMENT 'Porcentaje de seguro',
    `pjtvr_prod_level`          varchar(1) DEFAULT 'P'                          COMMENT 'Nivel del producto  K=Kit, P=Producto',
    `pjtvr_section`             int(11) DEFAULT NULL                            COMMENT 'Numero de seccion',
    `pjtvr_status`              varchar(1) DEFAULT '1'                          COMMENT 'Status del contendo del proyecto 1-activo 0-inactivo',
    `pjtvr_order`               int(11) DEFAULT 0                               COMMENT 'Posición en la lista de secciones',
    `ver_id`                    int(11) NOT NULL                                COMMENT 'FK Id de la version relación ctt_version',
    `prd_id`                    int(11) NOT NULL                                COMMENT 'FK Id del producto relación ctt_products',
    `pjt_id`                    int(11) NOT NULL                                COMMENT 'FK Id del proyecto relación ctt_proyect',
  PRIMARY KEY (`pjtvr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Contenido de la version del proyecto';



/* PERIODOS  */
DROP TABLE IF EXISTS `ctt_projects_periods`;
CREATE TABLE IF NOT EXISTS `ctt_projects_periods` (
    `pjtpd_id`                  int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del detalle de proyecto',
    `pjtpd_day_start`           date NOT NULL                                   COMMENT 'Dia de inicio de reserva',
    `pjtpd_day_end`             date NOT NULL                                   COMMENT 'Dia de termino de reserva',
    `pjtdt_id`                  int(11) NOT NULL                                COMMENT 'FK Id del proyecto relación ctt_projects_detail',
    `pjtdt_belongs`             int(11) DEFAULT NULL                            COMMENT 'Id del detalle padre',
    `pjtpd_sequence`            int(11) DEFAULT 1                               COMMENT 'Secuencia de periodos',
  PRIMARY KEY (`pjtpd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Dias de reservado de la serie del producto';



/* CATALGO DE STATUS DE PROYECTO  */
DROP TABLE IF EXISTS `ctt_projects_status`;
CREATE TABLE IF NOT EXISTS `ctt_projects_status` (
    `pjs_status`                varchar(2) DEFAULT NULL                         COMMENT 'Status de proyecto',
    `pjs_name`                  varchar(50) DEFAULT NULL                        COMMENT 'Nombre del status de proyecto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Catálogo de status de proyecto';



/* CATALGO DE TIPOS DE PROYECTO  */
DROP TABLE IF EXISTS `ctt_projects_type`;
CREATE TABLE IF NOT EXISTS `ctt_projects_type` (
    `pjttp_id`                  int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del tipo de proyecto',
    `pjttp_name`                varchar(100) DEFAULT NULL                       COMMENT 'Nombre del tipo de proyecto',
    `pjttp_min_download`        int(11) NOT NULL                                COMMENT 'Horas minimas requeridos para carga/descarga',
    `pjttp_max_download`        int(11) NOT NULL                                COMMENT 'Horas maximas requeridos para carga/descarga',
  PRIMARY KEY (`pjttp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipos de proyectos o eventos que se ofrecen y siministran';


/* CATALGO DE TIPOS DE LLAMADOS DE PROYECTO  */
DROP TABLE IF EXISTS `ctt_projects_type_called`;
CREATE TABLE IF NOT EXISTS `ctt_projects_type_called` (
    `pjttc_id`                  int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del tipo de llamado',
    `pjttc_name`                varchar(100) DEFAULT NULL                       COMMENT 'Nombre del tipo de llamado',
  PRIMARY KEY (`pjttc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipos de llamado';


/* VERSIONES DEL PROYECTO  */
DROP TABLE IF EXISTS `ctt_projects_version`;
CREATE TABLE IF NOT EXISTS `ctt_projects_version` (
    `pjtvr_id`                  int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del contenido del projecto',
    `pjtvr_prod_sku`            varchar(15) DEFAULT NULL                        COMMENT 'SKU identificador del producto',
    `pjtvr_prod_name`           varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto',
    `pjtvr_prod_price`          decimal(10,2) DEFAULT NULL                      COMMENT 'Precio unitario del producto',
    `pjtvr_quantity`            int(11) DEFAULT NULL                            COMMENT 'Cantidad de productos',
    `pjtvr_days_base`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en renta',
    `pjtvr_days_cost`           int(11) DEFAULT NULL                            COMMENT 'Días en cotización en renta',
    `pjtvr_discount_base`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado a la renta',
    `pjtvr_discount_insured`    decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento sobre el seguro',
    `pjtvr_days_trip`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en viaje',
    `pjtvr_discount_trip`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado al viaje',
    `pjtvr_days_test`           int(11) DEFAULT NULL                            COMMENT 'Días solicitados en prueba',
    `pjtvr_discount_test`       decimal(10,2) DEFAULT NULL                      COMMENT 'Descuento aplicado en prueba',
    `pjtvr_insured`             decimal(10,2) DEFAULT 0.10                      COMMENT 'Porcentaje de seguro',
    `pjtvr_prod_level`          varchar(1) DEFAULT 'P'                          COMMENT 'Nivel del producto  K=Kit, P=Producto',
    `pjtvr_section`             int(11) DEFAULT NULL                            COMMENT 'Numero de seccion',
    `pjtvr_status`              varchar(1) DEFAULT '1'                          COMMENT 'Status del contendo del proyecto 1-activo 0-inactivo',
    `pjtvr_order`               int(11) DEFAULT 0                               COMMENT 'Posición en la lista de secciones',
    `ver_id`                    int(11) NOT NULL                                COMMENT 'FK Id de la version relación ctt_version',
    `prd_id`                    int(11) NOT NULL                                COMMENT 'FK Id del producto relación ctt_products',
    `pjt_id`                    int(11) NOT NULL                                COMMENT 'FK Id del proyecto relación ctt_proyect',
  PRIMARY KEY (`pjtvr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Contenido de la version del proyecto';



/* VENTAS  */
DROP TABLE IF EXISTS `ctt_sales`;
CREATE TABLE IF NOT EXISTS `ctt_sales` (
    `sal_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id de la venta',
    `sal_number`                varchar(100) DEFAULT NULL                       COMMENT 'Numero de venta',
    `sal_date`                  datetime DEFAULT current_timestamp()            COMMENT 'Fecha de venta',
    `sal_pay_form`              varchar(100) DEFAULT NULL                       COMMENT 'Forma de pago',
    `sal_number_invoice`        varchar(100) DEFAULT NULL                       COMMENT 'Numero de factura',
    `sal_customer_name`         varchar(100) DEFAULT NULL                       COMMENT 'Nombre del cliente',
    `sal_saller`                varchar(100) DEFAULT NULL                       COMMENT 'Nombre de vendedor',
    `sal_project`               varchar(100) DEFAULT NULL                       COMMENT 'Nombre del projecto',
    `str_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del almacen relacion ctt_stores',
    `pjt_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del proyeto relacion ctt_projects',
  PRIMARY KEY (`sal_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Ventas de productos.';



/* DETALLE DE VENTAS  */
DROP TABLE IF EXISTS `ctt_sales_details`;
CREATE TABLE IF NOT EXISTS `ctt_sales_details` (
    `sld_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del detalle de la venta',
    `sld_sku`                   varchar(100) DEFAULT NULL                       COMMENT 'SKU de la serie del producto',
    `sld_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del producto',
    `sld_price`                 decimal(10,2) DEFAULT NULL                      COMMENT 'Precio unitario del producto',
    `sld_quantity`              int(11) NOT NULL                                COMMENT 'Cantidad',
    `sld_situation`             varchar(50) DEFAULT NULL                        COMMENT 'Situación del producto',
    `sld_date`                  datetime DEFAULT current_timestamp()            COMMENT 'Fecha de registro del movimiento',
    `sal_id`                    int(11) NOT NULL                                COMMENT 'Id de la venta relacion ctt_sales',
    `ser_id`                    int(11) DEFAULT NULL                            COMMENT 'Id de la serie relacion ctt_series',
  PRIMARY KEY (`sld_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Detalle de las ventas de productos.';



/* SERIES  */

ALTER TABLE `ctt_series` DROP INDEX `indx_prd_id`;
DROP TABLE IF EXISTS `ctt_series`;
CREATE TABLE IF NOT EXISTS `ctt_series` (
    `ser_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de la serie',
    `ser_sku`                   varchar(15) DEFAULT NULL                        COMMENT 'SKU identificador del producto',
    `ser_serial_number`         varchar(50) DEFAULT NULL                        COMMENT 'Numero de serie del producto',
    `ser_cost`                  decimal(10,2) DEFAULT NULL                      COMMENT 'Costo unitario del producto',
    `ser_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del producto 1-Activo, 0-Inactivo',
    `ser_situation`             varchar(5) DEFAULT NULL                         COMMENT 'Situación de estatus dentro del proceso ',
    `ser_stage`                 varchar(5) DEFAULT NULL                         COMMENT 'Etapa dentro del proceso',
    `ser_date_registry`         datetime DEFAULT current_timestamp()            COMMENT 'Fecha de registro del producto',
    `ser_date_down`             datetime DEFAULT NULL                           COMMENT 'Fecha de baja del producto',
    `ser_reserve_count`         int(11) DEFAULT NULL                            COMMENT 'Contador de rentas',
    `ser_behaviour`             varchar(1) NOT NULL                             COMMENT 'Comportamiento del producto C-Compra, R-Renta',
    `ser_brand`                 varchar(100) DEFAULT NULL                       COMMENT 'Marca de la series',
    `ser_cost_import`           int(11) DEFAULT NULL                            COMMENT 'Costo de importación',
    `ser_import_petition`       varchar(200) DEFAULT NULL                       COMMENT 'Pedimento de importación',
    `ser_comments`              varchar(500) DEFAULT NULL                       COMMENT 'Comentarios sobre la serie del producto',
    `prd_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del producto relacion ctt_productos',
    `sup_id`                    int(11) DEFAULT NULL                            COMMENT 'ID de la proveedor relacion ctt_suppliers',
    `cin_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del tipo de moneda relacion ctt_coins',
    `pjtdt_id`                  int(11) DEFAULT 0                               COMMENT 'Id del detalle de proyecto relacion ctt_projects_detail',
  PRIMARY KEY (`ser_id`),
  KEY `indx_prd_id` (`prd_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Numero serie de productos correspondientes a un modelo.';


 DROP TRIGGER IF EXISTS `update_products_reserve`;
DELIMITER $$
CREATE TRIGGER `update_products_reserve` AFTER UPDATE ON `ctt_series` FOR EACH ROW UPDATE ctt_products as sc
SET prd_reserved = (
	select  count(*) from ctt_series where pjtdt_id > 0  and  prd_id = sc.prd_id
)
WHERE sc.prd_id = prd_id
$$
DELIMITER ;


/* TIPO DE SERVICIO  */
DROP TABLE IF EXISTS `ctt_services`;
CREATE TABLE IF NOT EXISTS `ctt_services` (
    `srv_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del servicio',
    `srv_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del servicio',
    `srv_description`           varchar(300) DEFAULT NULL                       COMMENT 'Descripcion del servicio',
    `srv_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del servicio 1-Activo, 0-Inactivo',
  PRIMARY KEY (`srv_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipificación de los servicios.';




DROP TABLE IF EXISTS `ctt_sidebar`;
CREATE TABLE IF NOT EXISTS `ctt_sidebar` (
    `sdb_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del sidebar',
    `sdb_parent`                int(11) DEFAULT NULL                            COMMENT 'ID del sidebar padre',
    `sdb_item`                  varchar(100) NOT NULL                           COMMENT 'Elementos del sidebar',
    `sdb_description`           varchar(300) DEFAULT NULL                       COMMENT 'Descripción del elemento del sidebar',
    `sdb_order`                 int(11) DEFAULT NULL                            COMMENT 'Ordenamiento de los elementos del sidebar para su presentación',
    `mod_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del modulo relación ctt_module',
  PRIMARY KEY (`sdb_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de los elementos que componene el sidebar';


/* ALMACENES  */
DROP TABLE IF EXISTS `ctt_stores`;
CREATE TABLE IF NOT EXISTS `ctt_stores` (
    `str_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del almacén',
    `str_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del almacén',
    `str_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del almacen 1-Activo, 0-Inactivo',
    `str_type`                  varchar(100) DEFAULT NULL                       COMMENT 'Tipo de almacén',
    `emp_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del empleado relacion ctt_employes',
    `emp_fullname`              varchar(45) DEFAULT NULL                        COMMENT 'Nombre del empleado responsable',
  PRIMARY KEY (`str_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Listado de almacenes.';



/* INTERCAMBIO DE ALMACENES  */
DROP TABLE IF EXISTS `ctt_stores_exchange`;
CREATE TABLE IF NOT EXISTS `ctt_stores_exchange` (
    `exc_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del movimiento',
    `exc_date`                  datetime DEFAULT current_timestamp()            COMMENT 'Fecha de registro del movimiento',
    `exc_sku_product`           varchar(15) NOT NULL                            COMMENT 'SKU del producto',
    `exc_product_name`          varchar(200) NOT NULL                           COMMENT 'Nombre del producto',
    `exc_quantity`              int(11) DEFAULT NULL                            COMMENT 'Cantidad de piezas',
    `exc_serie_product`         varchar(200) NOT NULL                           COMMENT 'Numero de series del producto',
    `exc_store`                 varchar(50) NOT NULL                            COMMENT 'Almacen que afecto el movimiento',
    `exc_comments`              varchar(300) NOT NULL                           COMMENT 'Comentarios referentes al movimiento',
    `exc_proyect`               varchar(100) NOT NULL                           COMMENT 'Nombre del proyecto',
    `exc_employee_name`         varchar(100) NOT NULL                           COMMENT 'Nombre del empleado',
    `ext_code`                  varchar(100) NOT NULL                           COMMENT 'Còdigo del tipo de movimiento',
    `con_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del folio relación ctt_counter_exchange',
    `ext_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del tipo de movimiento relación ctt_type_exchange',
    `cin_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del tipo de moneda relación ctt_coins',
  PRIMARY KEY (`exc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Movimientos de productos entre almacenes';



/* INVENTARIO EN ALMACENES  */
ALTER TABLE `ctt_stores_products` DROP INDEX `indx_prd_id`;
DROP TABLE IF EXISTS `ctt_stores_products`;
CREATE TABLE IF NOT EXISTS `ctt_stores_products` (
    `stp_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del registro',
    `stp_quantity`              int(11) NOT NULL DEFAULT 0                      COMMENT 'Cantidad de productos',
    `str_id`                    int(11) NOT NULL                                COMMENT 'ID del almacen relacion ctt_store',
    `ser_id`                    int(11) NOT NULL                                COMMENT 'ID del numero de serie relacion ctt_series',
    `prd_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del producto asociado a la serie',
  PRIMARY KEY (`stp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de cantidad de productos en almacen';

ALTER TABLE `ctt_stores_products` ADD INDEX indx_prd_id (`prd_id` ASC) ;



/* DISPARADORES  */
/* Actualiza las categorias  */
DROP TRIGGER update_categories;
CREATE TRIGGER update_categories AFTER UPDATE ON ctt_stores_products FOR EACH ROW
UPDATE ctt_subcategories as sc
SET sbc_quantity = (
        SELECT ifnull(sum(sp.stp_quantity), 0)
        FROM ctt_stores_products        AS sp
        INNER JOIN ctt_series           AS sr ON sr.ser_id = sp.ser_id
        INNER JOIN ctt_products         AS pr ON pr.prd_id = sr.prd_id
        WHERE sr.ser_status = 1
        AND pr.prd_level IN ('P', 'K')
        AND pr.sbc_id = sc.sbc_id
  );

/** Actualiza el stock de productos en almacen en la tabla de productos  */
DROP TRIGGER update_products;
CREATE TRIGGER update_products AFTER UPDATE ON ctt_stores_products FOR EACH ROW
UPDATE ctt_products as sc
SET prd_stock = (
	SELECT  count(*) FROM ctt_series WHERE prd_id = sc.prd_id
)
WHERE sc.prd_id = prd_id ;



/* CATALOGO DE SUBCATEGORIAS  */
DROP TABLE IF EXISTS `ctt_subcategories`;
CREATE TABLE IF NOT EXISTS `ctt_subcategories` (
    `sbc_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de la subcategoría',
    `sbc_code`                  varchar(10) CHARACTER SET utf8 DEFAULT NULL     COMMENT 'Clave de la subcategoría',
    `sbc_name`                  varchar(100) CHARACTER SET utf8 DEFAULT NULL    COMMENT 'Nombre de la subcategoría',
    `sbc_behaviour`             varchar(2) CHARACTER SET utf8 DEFAULT NULL      COMMENT 'Comportamiento de la subcategoría',
    `sbc_status`                varchar(1) CHARACTER SET utf8 DEFAULT '1'       COMMENT 'Estatus de la subcategoría 1-Activo, 0-Inactivo',
    `sbc_quantity`              int(11) DEFAULT 0                               COMMENT 'Cantidad de productos contenidos',
    `cat_id`                    int(11) NOT NULL                                COMMENT 'ID del catálogo relación ctt_categories',
  PRIMARY KEY (`sbc_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Subcategorias.';



/* SUBARRENDOS  */
DROP TABLE IF EXISTS `ctt_subletting`;
CREATE TABLE IF NOT EXISTS `ctt_subletting` (
    `sub_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del subarrendo',
    `sub_price`                 decimal(10,2) DEFAULT 0.00                      COMMENT 'precio de renta del producto por unidad',
    `sub_quantity`              int(11) DEFAULT NULL                            COMMENT 'Cantidad de piezas subarrendadas',
    `sub_date_start`            datetime DEFAULT NULL                           COMMENT 'Fecha de inicio de periodo de subarrendo',
    `sub_date_end`              datetime DEFAULT NULL                           COMMENT 'Fecha de término de periodo de subarrendo',
    `sub_comments`              varchar(300) NOT NULL                           COMMENT 'Comentarios referentes al subarrendo',
    `ser_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del serial del producto relacion ctt_serial',
    `sup_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del proveedor relacion ctt_suppliers',
    `prj_id`                    int(11) DEFAULT NULL                            COMMENT 'Id del proyecto ',
    `cin_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del tipo de moneda relación ctt_coins',
  PRIMARY KEY (`sub_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de situación de subarrendos';



/* PROVEEDORES  */
DROP TABLE IF EXISTS `ctt_suppliers`;
CREATE TABLE IF NOT EXISTS `ctt_suppliers` (
    `sup_id`                    int(11) NOT NULL                                COMMENT 'ID del proveedor',
    `sup_business_name`         varchar(100) DEFAULT NULL                       COMMENT 'Nombre de la empresa',
    `sup_trade_name`            varchar(100) NOT NULL                           COMMENT 'Nombre Comercial',
    `sup_contact`               varchar(100) DEFAULT NULL                       COMMENT 'Nombre del responsable',
    `sup_rfc`                   varchar(15) DEFAULT NULL                        COMMENT 'Registro Federal de Contribuyentes',
    `sup_email`                 varchar(100) DEFAULT NULL                       COMMENT 'Correo electrónico',
    `sup_phone`                 varchar(100) DEFAULT NULL                       COMMENT 'Número telefónico',
    `sup_phone_extension`       varchar(10) NOT NULL                            COMMENT 'Extension del telefono',
    `sup_credit`                int(11) NOT NULL                                COMMENT 'Ofrece credito 1-Si, 0-No',
    `sup_credit_days`           int(11) NOT NULL DEFAULT 0                      COMMENT 'Dias de Credito',
    `sup_money_advance`         int(11) NOT NULL                                COMMENT 'Anticipo 1-Si, 0-No',
    `sup_comments`              varchar(100) NOT NULL                           COMMENT 'Comentarios sobre el cliente',
    `sup_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del proveedor 1-Activo, 0-Inactivo',
    `sut_id`                    int(11) DEFAULT NULL                            COMMENT 'Tipo de Proveedor'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Proveedores de la empresa.';



/* TIPO DE PROVEEDOR  */
DROP TABLE IF EXISTS `ctt_suppliers_type`;
CREATE TABLE IF NOT EXISTS `ctt_suppliers_type` (
    `sut_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id del tipo de proveedor',
    `sut_code`                  varchar(1) DEFAULT NULL                         COMMENT 'Código del tipo de proveedor',
    `sut_name`                  varchar(100) DEFAULT NULL                       COMMENT 'Nombre del tipo de proveddor',
    `sut_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del tipo de proveedor 1-Activo, 0-Inactivo',
  PRIMARY KEY (`sut_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipos de proveedores de la empresa.';



/* CATALOGO DEINTERCAMBIO DE ALMACEN  */
DROP TABLE IF EXISTS `ctt_type_exchange`;
CREATE TABLE IF NOT EXISTS `ctt_type_exchange` (
    `ext_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del tipo de movimiento',
    `ext_code`                  varchar(100) NOT NULL                           COMMENT 'Còdigo del tipo de movimiento',
    `ext_type`                  varchar(1) NOT NULL                             COMMENT 'Tipo de movimiento E-Entrada, S-Salida, R-Renta',
    `ext_description`           varchar(300) NOT NULL                           COMMENT 'Descripcion del movimiento',
    `ext_link`                  int(11) DEFAULT NULL                            COMMENT 'Relacion con otro movimiento',
    `ext_affect_product`        varchar(5) NOT NULL                             COMMENT 'Clave de afectaciòn a la situaciòn del producto',
    `ext_elements`              varchar(10) DEFAULT NULL                        COMMENT 'Elementos que se muestan en la interfase',
  PRIMARY KEY (`ext_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tipos de movimientos entre almacenes';



/* USUARIOS  */
DROP TABLE IF EXISTS `ctt_users`;
CREATE TABLE IF NOT EXISTS `ctt_users` (
    `usr_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID del usuario',
    `usr_username`              varchar(45) NOT NULL                            COMMENT 'Usuario',
    `usr_password`              varchar(200) DEFAULT NULL                       COMMENT 'Contraseña del Usuario',
    `usr_dt_registry`           datetime DEFAULT current_timestamp()            COMMENT 'Fecha de registro del usuario en el sistema',
    `usr_dt_last_access`        datetime DEFAULT current_timestamp()            COMMENT 'Fecha de ultimo acceso al sistema',
    `usr_dt_change_pwd`         datetime DEFAULT current_timestamp()            COMMENT 'Fecha proxima definida del cambio de sistema',
    `usr_status`                varchar(1) DEFAULT NULL                         COMMENT 'Estatus del usuario 1-Activo, 0-Inactivo',
    `prf_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del perfil relacion ctt_profiles',
    `emp_id`                    int(11) DEFAULT NULL                            COMMENT 'ID del empleado relacion ctt_employees',
  PRIMARY KEY (`usr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla de Usuarios registrados';



/* RELACION USUARIOS - MODULOS  */
DROP TABLE IF EXISTS `ctt_users_modules`;
CREATE TABLE IF NOT EXISTS `ctt_users_modules` (
    `urm_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'ID de la relacion usuario - modulo',
    `usr_id`                    int(11) NOT NULL                                COMMENT 'FK ID del usuario relacion ctt_users',
    `mod_id`                    int(11) NOT NULL                                COMMENT 'FK ID del modulo relación ctt_modules',
  PRIMARY KEY (`urm_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Tabla pivote m_to_m ctt_usuarios - ctt_modules';



/* VERSIONES DEL PROYECTO  */
DROP TABLE IF EXISTS `ctt_version`;
CREATE TABLE IF NOT EXISTS `ctt_version` (
    `ver_id`                    int(11) NOT NULL AUTO_INCREMENT                 COMMENT 'Id de la version',
    `ver_code`                  varchar(20) DEFAULT NULL                        COMMENT 'Código de la version',
    `ver_date`                  datetime DEFAULT current_timestamp()            COMMENT 'Fecha de generación del documento',
    `ver_status`                varchar(1) DEFAULT 'C'                          COMMENT 'Tipo de version C= Cotización P=Proyecto',
    `ver_active`                smallint(1) DEFAULT 0                           COMMENT 'Version activa en pantalla',
    `ver_master`                smallint(1) DEFAULT 0                           COMMENT 'Version Maestra en Base de datos',
    `ver_discount_insured`      decimal(10,2) DEFAULT 0.00                      COMMENT 'Descuento sobre el seguro',
    `pjt_id`                    int(11) NOT NULL                                COMMENT 'FK Id del projeto relación ctt_projects',
  PRIMARY KEY (`ver_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Version de docuemntos de cotización';



/* VISTAS  */

/* VISTA DE PRODUCTOS  */
DROP VIEW ctt_vw_products;
CREATE VIEW ctt_vw_products AS
SELECT
    CONCAT('<i class="fas fa-pen modif" data="', pr.prd_id,'"></i><i class="fas fa-times-circle kill" data="', pr.prd_id, '"></i> ') AS editable,
    pr.prd_id AS producid, pr.prd_sku AS produsku, pr.prd_name AS prodname, pr.prd_price AS prodpric,
    CONCAT('<span class="toLink">', prd_stock, '</span> ') AS prodqtty,
    pr.prd_level AS prodtype, sv.srv_name AS typeserv, cn.cin_code AS prodcoin,
    CONCAT('<i class="fas fa-file-invoice" id="', dc.doc_id, '"></i> ') AS prddocum,
    sc.sbc_name AS subcateg, ct.cat_name AS categori, pr.prd_english_name AS prodengl, pr.prd_comments AS prdcomme,  ct.cat_id
FROM ctt_products AS pr
    INNER JOIN ctt_coins AS cn ON cn.cin_id = pr.cin_id
    INNER JOIN ctt_services AS sv ON sv.srv_id = pr.srv_id AND sv.srv_status = '1'
    INNER JOIN ctt_subcategories AS sc ON sc.sbc_id = pr.sbc_id AND sc.sbc_status = '1'
    INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id AND ct.cat_status = '1'
    LEFT JOIN ctt_products_documents AS dc ON dc.prd_id = pr.prd_id AND dc.dcp_source = 'P'
WHERE pr.prd_status = 1 AND pr.prd_level IN ('A', 'P');



/* VISTA DE PROJECTOS  */
DROP VIEW ctt_vw_projects;
CREATE VIEW ctt_vw_projects AS
SELECT
    CASE    WHEN cu.cus_fill <= 16 THEN concat('<span class="rng rng1">', cu.cus_fill,'%</span>')
            WHEN cu.cus_fill > 16 AND cu.cus_fill <= 33 THEN concat( '<span class="rng rng2">', cu.cus_fill, '%</span>')
            WHEN cu.cus_fill > 33 AND cu.cus_fill <= 50 THEN concat( '<span class="rng rng3">', cu.cus_fill, '%</span>')
            WHEN cu.cus_fill > 50 AND cu.cus_fill <= 66 THEN concat( '<span class="rng rng4">', cu.cus_fill, '%</span>')
            WHEN cu.cus_fill > 66 AND cu.cus_fill <= 90 THEN concat( '<span class="rng rng5">', cu.cus_fill, '%</span>')
            WHEN cu.cus_fill > 99 THEN concat('<span class="rng rng6">', cu.cus_fill, '%</span>')
    ELSE '' END AS custfill,
    CASE    WHEN cu.cus_fill < 100 THEN concat('<i class="fas fa-address-card kill" id="', cu.cus_id, '"></i>')
    ELSE '' END AS editable,
    CASE    WHEN pj.pjt_status = '2' THEN concat('<i class="fas fa-toggle-off toggle-icon" title="liberado" id="', pj.pjt_id,'"></i>')
            WHEN pj.pjt_status = '3' THEN concat('<i class="fas fa-toggle-on toggle-icon" title="bloqueado" id="', pj.pjt_id,'"></i>')
            WHEN pj.pjt_status = '4' THEN concat('<i class="fas fa-toggle-off toggle-icon" title="liberado" id="', pj.pjt_id,'"></i>')
    ELSE '' END AS smarlock,
    pj.pjt_id AS projecid, pj.pjt_number AS projnumb, pj.pjt_name AS projname, pj.pjt_location AS projloca, date_format(pj.pjt_date_start, '%Y/%m/%d') AS dateinit,
    date_format(pj.pjt_date_end, '%Y/%m/%d') AS datefnal, cu.cus_name AS custname
FROM    ctt_projects AS pj
    INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
    INNER JOIN ctt_customers as cu ON cu.cus_id = co.cus_id
WHERE pj.pjt_status IN (2, 3, 4);



/* VISTA DE SUBCATEGORIA  */
DROP VIEW ctt_vw_subcategories;
CREATE VIEW ctt_vw_subcategories AS
SELECT CONCAT('<i class="fas fa-pen modif" data="', sc.sbc_id, '"></i><i class="fas fa-times-circle kill" data="', sc.sbc_id, '"></i>') AS editable,
  sc.sbc_id AS subcatid, sc.sbc_code AS subccode, sc.sbc_name AS subcname, ct.cat_name AS catgname, ct.cat_id AS catgcode,
  CONCAT('<span class="toLink">', IFNULL(SUM(sc.sbc_quantity), 0),'</span>') AS quantity, sbc_order_print AS ordprint
FROM ctt_subcategories AS sc
    INNER JOIN ctt_categories AS ct ON ct.cat_id = sc.cat_id
WHERE sc.sbc_status = '1' AND ct.cat_status = '1'
GROUP BY sc.sbc_id;



/* VISTA DE SUBARRENDO  */
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

/* VISTA DE PROYETCOS EN SUBARRENDO  */
DROP VIEW ctt_vw_project_subletting;
CREATE VIEW ctt_vw_project_subletting AS
SELECT num, pjt_id, prd_name, prd_sku, pjtdt_prod_sku, sub_price, sup_business_name, str_name, ser_id, DATE_FORMAT(sub_date_start, '%d/%m/%Y') AS sub_date_start, 
    DATE_FORMAT(sub_date_end, '%d/%m/%Y') AS sub_date_end, sub_comments, pjtcn_days_base, pjtcn_days_trip, pjtcn_days_test, ifnull(prd_id, 0) AS prd_id, 
    ifnull(sup_id, 0) AS sup_id, ifnull(str_id, 0) AS str_id, ifnull(sub_id, 0) AS sub_id, ifnull(sut_id, 0) AS sut_id, ifnull(pjtdt_id, 0) AS pjtdt_id, 
    ifnull(pjtcn_id, 0) AS pjtcn_id, ifnull(cin_id, 0) AS cin_id
FROM  ctt_vw_subletting;




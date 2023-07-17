<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsSalablesListModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }


// Obtiene las ventas *****
    public function Sales()
    {
        $qry = "SELECT *, (
                    SELECT count(*) FROM ctt_comments 
                    WHERE com_source_section = 'sales' 
                    AND com_action_id = sl.sal_id
                ) as comments FROM ctt_sales as sl ORDER BY sl.sal_date DESC;";
        return $this->db->query($qry);
    }

// Obtiene el detalle de ventas
    public function SalesDetail($params)
    {

        $salId = $this->db->real_escape_string($params['salId']);

        $qry = "SELECT sd.*, sl.pjt_id FROM ctt_sales_details AS sd 
                INNER JOIN ctt_sales AS sl ON sl.sal_id = sd.sal_id
                WHERE sl.sal_id = $salId; ";
        return $this->db->query($qry);
    }

// Obtiene los comentarios
    public function getComments($params)
    {

        $salId = $this->db->real_escape_string($params['salId']);

        $qry = "SELECT * FROM ctt_comments WHERE com_source_section = 'sales' AND com_action_id = $salId; ";
        return $this->db->query($qry);
    }

// Guarda la devolución
    public function SaveReturn($params, $user)
    {


        $userdt         = explode("|",$user);
        $usrNme         = $this->db->real_escape_string($userdt[2]);
        $usrNme         = strtoupper($usrNme);
        $sldSku         = $this->db->real_escape_string($params['sldSku']);
        $sldNme         = $this->db->real_escape_string($params['sldNme']);
        $sldPrc         = $this->db->real_escape_string($params['sldPrc']);
        $sldQty         = $this->db->real_escape_string($params['sldQty']);
        $saleId         = $this->db->real_escape_string($params['saleId']);
        $seriId         = $this->db->real_escape_string($params['seriId']);
        $sldSit         = $this->db->real_escape_string($params['sldSit']);
        $commen         = $this->db->real_escape_string($params['commen']);
        $projId         = $this->db->real_escape_string($params['projId']);
        $nfolio         = $this->db->real_escape_string($params['nfolio']);
        $storId         = $this->db->real_escape_string($params['storId']);
        $sldtId         = $this->db->real_escape_string($params['sldtId']);
        $sldsec         = $this->db->real_escape_string($params['sldsec']);

        // Agrega el registro de la devolución en la tabla de detalle
        $qr1 = "INSERT INTO ctt_sales_details 
                    (sld_sku, sld_name, sld_price, sld_quantity, sal_id, ser_id, sld_situation)
                VALUES
                    ('$sldSku', '$sldNme', '$sldPrc', '$sldQty', '$saleId', '$seriId', '$sldSit');";
        $this->db->query($qr1);
        $sldId = $this->db->insert_id;
        
        // Actualiza el stock del almacen de expendables
        $qr2 = "UPDATE ctt_stores_products 
                SET stp_quantity = stp_quantity + $sldQty 
                WHERE ser_id = $seriId AND str_id = 5;";
        $this->db->query($qr2);

        // Agrega el movimiento de almacenes
        $qr3 = "INSERT INTO ctt_stores_exchange 
                        (exc_sku_product, exc_product_name, exc_quantity, exc_serie_product, exc_store, exc_comments, exc_proyect, exc_employee_name, ext_code, con_id, ext_id, cin_id)
                SELECT sr.ser_sku AS exc_sku_product, pr.prd_name AS exc_product_name, 
                '$sldQty' as exc_quantity, sr.ser_id AS exc_serie_product,
                st.str_name AS sxc_store, 'DEVOLUCION DIRECTA EN MOSTRADOR' AS exc_comments, (
                    SELECT ucase(pjt_name) FROM ctt_projects WHERE pjt_id = $projId
                ) AS exc_proyect,
                '$usrNme' AS exc_employee_name,
                'ESF' AS ext_code,
                '$nfolio' AS con_id,
                '10' AS ext_id,
                sr.cin_id
                FROM ctt_series as sr
                INNER JOIN ctt_products AS pr ON pr.prd_id = sr.prd_id
                INNER JOIN ctt_stores AS st ON st.str_id = $storId
                WHERE sr.ser_id = '$seriId';";
        $this->db->query($qr3); 

        // Agrega el registro de la devolución en la tabla de detalle
        $qr4 = "INSERT INTO ctt_comments 
                    (com_source_section, com_action_id, com_comment, com_user)
                VALUES
                    ('$sldsec', '$saleId', '$commen', '$usrNme');";
        $this->db->query($qr4);

        return $saleId;
    }

    

// Registra el numero de folio 
    public function NextExchange()
    {
        $qry = "INSERT INTO ctt_counter_exchange (con_status) VALUES ('1');	";
        $this->db->query($qry);
        return $this->db->insert_id;
    }



}
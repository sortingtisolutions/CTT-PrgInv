<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ClosedProyectChangeModel extends Model
{
    public function __construct()
    {
        parent::__construct();
    }


// Listado de almacenes  ****
        public function listStores($params)
        {
            $qry = "SELECT str_id, str_name FROM ctt_stores WHERE str_id = 5 OR str_type = 'MOVILES' AND str_status = 1;";
            return $this->db->query($qry);
        }    

// Listado de productos
        public function listProducts($params)
        {
            $strId              = $this->db->real_escape_string($params['strId']);

            $qry = "SELECT sr.ser_id, sr.ser_sku, pd.prd_sku, pd.prd_name, pd.prd_price, SUM(sp.stp_quantity) as stock
                    FROM ctt_series AS sr
                    INNER JOIN ctt_stores_products AS sp ON sp.ser_id = sr.ser_id
                    INNER JOIN ctt_products AS pd ON pd.prd_id = sr.prd_id
                    WHERE sp.str_id = $strId AND pd.prd_status = 1
                    GROUP BY sr.ser_id, sr.ser_sku, pd.prd_sku, pd.prd_name, pd.prd_price
                    ORDER BY pd.prd_name ASC;";
            return $this->db->query($qry);
        }    


// Listado de proyectos
        public function listProjects($params)
        {
            $qry = "SELECT 
                        pj.pjt_id, pj.pjt_number, pj.pjt_name, cu.cus_name 
                    FROM ctt_projects AS pj
                    INNER JOIN ctt_customers_owner AS co ON co.cuo_id = pj.cuo_id
                    INNER JOIN ctt_customers AS cu On cu.cus_id = co.cus_id
                    WHERE pjt_status in (2,3,4) ORDER BY pj.pjt_number;";
            return $this->db->query($qry);
        }    

// Guarda la venta
        public function SaveSale($params, $user)
        {
            $salPayForm         = $this->db->real_escape_string($params['salPayForm']);
            $salNumberInvoice   = $this->db->real_escape_string($params['salNumberInvoice']);
            $salCustomerName    = $this->db->real_escape_string($params['salCustomerName']);
            $strId              = $this->db->real_escape_string($params['strId']);
            $pjtId              = $this->db->real_escape_string($params['pjtId']);
            $comId              = $this->db->real_escape_string($params['comId']);
            $pjtName            = $this->db->real_escape_string($params['pjtName']);
            $usrName            = strtoupper($user);

            $qr1 = "INSERT INTO ctt_sales 
                        (sal_pay_form, sal_number_invoice, sal_customer_name, str_id, pjt_id, sal_saller, sal_project)
                    VALUES
                        ('$salPayForm', '$salNumberInvoice', '$salCustomerName', '$strId', '$pjtId', '$usrName', '$pjtName');";

            $this->db->query($qr1);
            $salId = $this->db->insert_id;
            $salNumber = str_pad($salId, 7, '0', STR_PAD_LEFT); // Coloca 7 (0000000) digitos en el numero de venta

            $qr2 = "UPDATE ctt_sales SET sal_number = '$salNumber' WHERE sal_id = $salId";
            $this->db->query($qr2);

            $qr3 = "UPDATE ctt_comments SET com_action_id = '$salId', com_status = '1' WHERE com_id in ($comId)";
            $this->db->query($qr3);

            return $salId;
        }    


// Registra el numero de folio 
public function NextExchange()
{
    $qry = "INSERT INTO ctt_counter_exchange (con_status) VALUES ('1');	";
    $this->db->query($qry);
    return $this->db->insert_id;
}


// Guarda detalle de la venta
        public function SaveSaleDetail($params, $user)
        {
            $sldNameBrut    = $this->db->real_escape_string($params['sldName']);
            $employee_data  = explode("|",$user);
            $sldSku         = $this->db->real_escape_string($params['sldSku']);
            $sldName        = str_replace('°','"',$sldNameBrut);
            $sldPrice       = $this->db->real_escape_string($params['sldPrice']);
            $sldQuantity    = $this->db->real_escape_string($params['sldQuantity']);
            $salId          = $this->db->real_escape_string($params['salId']);
            $serId          = $this->db->real_escape_string($params['serId']);
            $strId          = $this->db->real_escape_string($params['strId']);
            $pjtId          = $this->db->real_escape_string($params['pjtId']);
            $folio          = $this->db->real_escape_string($params['folio']);
            $serSt          = 'VENTA';
            $usrName	    = $this->db->real_escape_string($employee_data[2]);

            $qry = "INSERT INTO ctt_sales_details 
                        (sld_sku, sld_name, sld_price, sld_quantity, sal_id, ser_id, sld_situation)
                    VALUES
                        ('$sldSku', '$sldName', '$sldPrice', '$sldQuantity', '$salId', '$serId', '$serSt');";
            $this->db->query($qry);
            
            $qry1 = "UPDATE ctt_stores_products SET stp_quantity = stp_quantity - $sldQuantity WHERE ser_id = $serId AND str_id = $strId;";
            $this->db->query($qry1);

            $qry2 = "INSERT INTO ctt_stores_exchange 
                                (exc_sku_product, exc_product_name, exc_quantity, exc_serie_product, exc_store, exc_comments, exc_proyect, exc_employee_name, ext_code, con_id, ext_id, cin_id)
                    SELECT sr.ser_sku AS exc_sku_product, pr.prd_name AS exc_product_name, 
                        '$sldQuantity' as exc_quantity, sr.ser_id AS exc_serie_product,
                        st.str_name AS sxc_store, 'VENTA DIRECTA EN MOSTRADOR' AS exc_comments, (
                            SELECT ucase(pjt_name) FROM ctt_projects WHERE pjt_id = $pjtId
                        ) AS exc_proyect,
                        '$usrName' AS exc_employee_name,
                        'SCI' AS ext_code,
                        '$folio' AS con_id,
                        '3' AS ext_id,
                        sr.cin_id
                    FROM ctt_series as sr
                    INNER JOIN ctt_products AS pr ON pr.prd_id = sr.prd_id
                    INNER JOIN ctt_stores AS st ON st.str_id = $strId
                    WHERE sr.ser_id = '$serId';";
            $this->db->query($qry2);

            return $salId .'|'.$employee_data[0] .'|'. $employee_data[2];
        }    
// Guarda archivo detalle de la venta
        public function saveSaleList($params)
        {
            
            $salId = $this->db->real_escape_string($params['salId']);

            $qry = "SELECT sl.*, sd.*, pj.pjt_number, pj.pjt_name, st.str_name
                    FROM ctt_sales AS sl
                    INNER JOIN ctt_sales_details AS sd ON sd.sal_id = sl.sal_id
                    INNER JOIN ctt_stores AS st ON st.str_id = sl.str_id
                    LEFT JOIN ctt_projects As pj ON pj.pjt_id = sl.pjt_id
                    WHERE sl.sal_id = $salId;";

            return $this->db->query($qry);
            
        }    



// Guarda comentario
    public function SaveComments($params, $user)
    {
        $section    = $this->db->real_escape_string($params['section']);
        $movemId    = $this->db->real_escape_string($params['sectnId']);
        $comment    = $this->db->real_escape_string($params['comment']);
        $usrName    = strtoupper($user);

        $qry = "INSERT INTO ctt_comments 
                    (com_source_section, com_action_id, com_comment, com_user)
                VALUES
                    ('$section', '$movemId', '$comment', '$usrName');";

        $this->db->query($qry);
        $comId = $this->db->insert_id;

        return $comId;
    }    


}
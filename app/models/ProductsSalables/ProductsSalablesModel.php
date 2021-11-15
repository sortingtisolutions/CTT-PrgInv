<?php
defined('BASEPATH') or exit('No se permite acceso directo');

class ProductsSalablesModel extends Model
{

    public function __construct()
    {
        parent::__construct();
    }

    
// Listado de almacenes
        public function listStores($params)
        {
            $qry = "SELECT str_id, str_name FROM ctt_stores WHERE str_id = 5 AND str_status = 1;";
            return $this->db->query($qry);
        }    

// Listado de productos
        public function listProducts($params)
        {
            $qry = "SELECT sr.ser_id, sr.ser_sku, pd.prd_sku, pd.prd_name, pd.prd_price, SUM(sp.stp_quantity) as stock
                    FROM ctt_series AS sr
                    INNER JOIN ctt_stores_products AS sp ON sp.ser_id = sr.ser_id
                    INNER JOIN ctt_products AS pd ON pd.prd_id = sr.prd_id
                    WHERE sp.str_id = 5 AND pd.prd_status = 1
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
                    WHERE pjt_status = 2 ORDER BY pj.pjt_number;";
            return $this->db->query($qry);
        }    

// Guarda la venta
        public function SaveSale($params)
        {
            $salPayForm         = $this->db->real_escape_string($params['salPayForm']);
            $salNumberInvoice   = $this->db->real_escape_string($params['salNumberInvoice']);
            $salCustomerName    = $this->db->real_escape_string($params['salCustomerName']);
            $strId              = $this->db->real_escape_string($params['strId']);
            $pjtId              = $this->db->real_escape_string($params['pjtId']);

            $qry = "INSERT INTO ctt_sales 
                        (sal_pay_form, sal_number_invoice, sal_customer_name, str_id, pjt_id)
                    VALUES
                        ('$salPayForm', '$salNumberInvoice', '$salCustomerName', '$strId', '$pjtId');";

            $this->db->query($qry);
            $salId = $this->db->insert_id;
            $salNumber = str_pad($salId, 7, '0', STR_PAD_LEFT);

            $qry1 = "UPDATE ctt_sales SET sal_number = $salNumber WHERE sal_id = $salId";
            $this->db->query($qry1);

            return $salId;
        }    
// Guarda detalle de la venta
        public function SaveSaleDetail($params)
        {
            $sldSku         = $this->db->real_escape_string($params['sldSku']);
            $sldName        = $this->db->real_escape_string($params['sldName']);
            $sldPrice       = $this->db->real_escape_string($params['sldPrice']);
            $sldQuantity    = $this->db->real_escape_string($params['sldQuantity']);
            $salId          = $this->db->real_escape_string($params['salId']);
            $serId          = $this->db->real_escape_string($params['serId']);

            $qry = "INSERT INTO ctt_sales_details 
                        (sld_sku, sld_name, sld_price, sld_quantity, sal_id, ser_id)
                    VALUES
                        ('$sldSku', '$sldName', '$sldPrice', '$sldQuantity', '$salId', '$serId');";

            $this->db->query($qry);
            
            $qry1 = "UPDATE ctt_stores_products SET stp_quantity = stp_quantity - $sldQuantity WHERE ser_id = $serId;";
            $this->db->query($qry1);

            /**
             * 
             * Pendiente el registro de movimiento entre almacenes
             * 
             */


            return $salId;
        }    

}
<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class ProductsOrderUpdataModel extends CI_Model {
		function updata($array,$id){
			$this->db->where('id_prod', $id);
			$this->db->update('sproducsstan', $array);
		}
		function insertbay($array){
			$this->db->insert( 'sbaytime' ,$array);
		}
		function saveOrder($date){
			$this->db->insert( 'sorders' , $date);
		}
	}
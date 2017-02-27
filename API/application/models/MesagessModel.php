<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class MesagessModel extends CI_Model {
		public function showMessages($id){
				$sql='SELECT * FROM `snotist`
						INNER join sproducts on sproducts.id = 	snotist.id_prod
						inner join sproductssetings ON snotist.id_prod = sproductssetings.id_prod ';
				$qwery = $this->db->query($sql);
				return $qwery->result();
		}
		public function delete($id){
			$this->db->where('id_rekord', $id);
			$this->db->delete('snotist');
		} 
	}
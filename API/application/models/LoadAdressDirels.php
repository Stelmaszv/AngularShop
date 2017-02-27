<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class LoadAdressDirels extends CI_Model {
		public $id;
		public function adressID(){
			$this->db->where('id', $this->id);
			$query = $this->db->get('suseresadres');
			return $query->result();
		}
		public function showadressloop(){
			$this->db->where('id_user', $this->id);
			$query = $this->db->get('suseresadres');
			return $query->result();
		}
	}
?>
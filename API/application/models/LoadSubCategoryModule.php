<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class LoadSubCategoryModule extends CI_Model {
		public function __construct(){
			parent::__construct();
		}
		private function sqlqwery($sql,$id){
			$query=$this->db->query($sql,$id);
			 return $query->result();
		}
		public function get_sub_categorys_MODEL($id){
			$sql = "SELECT * FROM `ssubcategory` WHERE `id_miancat` = ?"; 
			return $this->sqlqwery($sql,$id);

		}	
		public function returnname($id){
			$sql = "SELECT * FROM `ssubcategory` WHERE `id` = ?"; 
			return $this->sqlqwery($sql,$id);
		}
	}
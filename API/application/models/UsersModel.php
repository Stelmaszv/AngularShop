<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class UsersModel extends CI_Model {
		public function show_adress($id){	
			$sql = "SELECT * FROM `suseresadres` WHERE `id_user` = ?"; 
			$query=$this->db->query($sql,$id);
		 	return $query->result();
		}
		public function showUserss(){
			$sql = "SELECT * FROM `susers` INNER join suseresadmin on suseresadmin.id_user = susers.id_user"; 
			$query=$this->db->query($sql);
		 	return $query->result();
		}
		public function showUserssDitels($id){
			$sql = "SELECT * FROM `susers` INNER join suseresadmin on suseresadmin.id_user = susers.id_user WHERE susers.id_user = ? " ; 
			$query=$this->db->query($sql,$id);
			return $query->result();
		}
		private function setvalue($value,$returnONE,$returnTWO){
			switch ($value) {
					case $returnONE:
						$value=$returnTWO;
					break;
					case $returnTWO:
						$value=$returnONE;
					break;
			}
			return $value;
		}
		public function changepermissions($value,$role){

			if($role=='admin'){
				$value=$this->setvalue($value,'user','admin');
				$this->db->where('id_user',$this->id);
				$this->db->update('suseresadmin', array('role' => $value));

			}
		}
		public function setban($value,$role){
			if($role=='admin'){
				$value=$this->setvalue($value,1,0);
				$this->db->where('id_user',$this->id);
				$this->db->update('susers', array('ban' => $value));
			}	
		}
	}
?>
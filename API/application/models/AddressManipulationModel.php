<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class AddressManipulationModel extends CI_Model {
		public $array;
		public function createAdress(){
			$this->db->insert( 'suseresadres' ,$this->array);
		}
		public function  set_adress($id){
			$array=array(
				'chiused' => ''
			);
			$this->db->update('suseresadres', $array);			
			$this->db->where('id_user', $this->id);
			$query = $this->db->get('suseresadres');
			$array=$query->result();
			foreach ($array as $row) {
				$this->db->where('id',$row->id);
				$this->db->update('suseresadres', array('chiused' => ''));	
			}
				$this->db->where('id',$id);
				$this->db->update('suseresadres', array('chiused' => 'yes'));	
		}
		function DeleteAdress(){
				$this->db->where('id', $this->id);
				$this->db->delete('suseresadres'); 
		}
		function update_adress($ID,$data){

			$this->db->where('id',$ID);
			$this->db->update('suseresadres',$data[0]);	
			return $this->id;
		}

	}
?>
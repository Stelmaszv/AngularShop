<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class LoadOrdersModel extends CI_Model {
		public $id;
		public function __construct(){
			parent::__construct();
		}
		function sqlshort($sql,$id){
			$query=$this->db->query($sql,$id);
			return $query->result();
		}
		function loadUserOrders($id){
			return $this->sqlshort('SELECT * FROM `sorders` INNER join susers on susers.id_user = sorders.id_user where sorders.id_user = ?',$id);
		}
		function loadUserOrder(){
			return $this->sqlshort('SELECT * FROM `sorders` INNER join susers on susers.id_user = sorders.id_user where sorders.id = ?',$this->id);
		}
		function showAdress(){
			$this->db->where('id', $this->id);
			$query = $this->db->get('sorders');
			foreach ($query->result() as $row){
			    $value=$row->purchaser;
			}
			return $value;
		}
		function loadAdminOrders(){
			return $this->sqlshort('SELECT * FROM `sorders` INNER join susers on susers.id_user = sorders.id_user',false);
		}
		function UpdareOrderStatus($role,$stan){

			if($role=='admin'){
				$this->db->where('id',$this->id);
				$stan=$stan+1;
				if($stan<6){
					$this->db->update('sorders', array('updata'=>time(),'stan' => $stan));
				}else{
					$this->db->update('sorders', array('updata'=>time(),'stan' => 0));
				}
			}
		}
		public function fainInOrders($id){
			$qwery=$this->loadUserOrders($id);
			foreach ($qwery as $row) {
				$items= json_decode($row->pruducts);
				foreach ($items as $item) {
					if($item->id_prod==$this->id){
						echo 'tak';
					}
				}
			}
		}
	}
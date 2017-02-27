<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class OpininModel extends CI_Model {
		public function __construct(){
			parent::__construct();
		}
		function addOpinion($data){
			$this->db->insert( 'sopinion' ,$data);
		}
		function showQwery($sql,$id){

			$query=$this->db->query($sql,$id);
			return $query->result();
		}
		function abletoopinion($sql,$id){
			$query=$this->db->query($sql,$id);
			if(count($query->result())==0){
				return  'no';
			}
		}
		function opinionBan($role,$id,$ban){

			if($role=='admin'){
				$this->db->where('id_opinon',$id);
				$this->db->update('sopinion', array('banOpinion'=>$ban));		
			}
		}
		function getaverebleobinion($sql,$id){


			$result= array();
				foreach ($this->showQwery($sql,$id) as $row) {
					$items= json_decode($row->pruducts);
					foreach ($items as $item) {
						$stan=$this->abletoopinion('SELECT * FROM `sopinion` where id_prod= ? and id_user = ?',array($item->id_prod,$this->id));
						if($stan=='no'){
							if (!array_key_exists($item->id_prod,$result)){
								$result[]=$item;
							}
						}
					}
				}
			return $result;

		}
	}
?>
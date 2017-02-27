<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class WishListModel extends CI_Model {
		public function showWishList($id){
			$this->db->where('id_prod',$id);
			$query = $this->db->get('wishList');
			return $query->result();
		}
		public function sent_message($id,$name,$procent,$price){
			foreach ($this->showWishList($id) as $row) {
				$mesage='Produkt z twojej listy zyczeń jest w promoscji';
		
				$data=array(
					'id_user' 	=> $row->id_user,
					'id_prod' 	=>$id,
					'text'		=>$mesage,
					'procent'	=>$procent
				);
				$this->db->insert( 'snotist' ,$data);
			}
		}
		public function showList($id){
			$sqlqwery = "SELECT * FROM wishList 
					inner join sproducts on sproducts.id = wishList.id_prod 
					INNER JOIN sproducsstan ON sproducsstan.id_prod = sproducts.id 
					INNER JOIN sproductssetings on sproductssetings.id_prod = sproducts.id 
					INNER join sproductsditels on sproductsditels.id_prod = sproducts.id 
					INNER JOIN sproductscotegory on sproductscotegory.id_prod =sproducts.id
					INNER join scategory on scategory.id = sproductscotegory.id_category 
					INNER join ssubcategory on ssubcategory.id = sproductscotegory.id_subcategory 
			WHERE `id_user` = ?"; 	  
			$query=$this->db->query($sqlqwery,$id);
			return json_encode($query->result());
		}
		private function setkey($idUser){
			$keys= array();
			$sqlqwery = "SELECT * FROM `wishList` WHERE `id_user` = ?"; 	  
			$query=$this->db->query($sqlqwery,$idUser);
			$sql=$query->result();
			foreach($sql as $row){
				$keys[]= $row->id_prod;
			}
			return $keys;
		}
		public function IDinWM($id,$idUser){
			
			$sqlqwery = "SELECT * FROM `wishList` WHERE `id_user` = ? AND `id_prod` = ?";
			$query=$this->db->query($sqlqwery,array('id_user'=>$idUser,'id_prod'=>$id));
			if(count($sql=$query->result())>0){
				return 'tak';
			}else{
				return 'nie';
			}

		}
		public function upadate($id,$userID){
				$data=array(
						'id_user' =>$userID,
						'id_prod'=>$id
				);
				$this->db->insert( 'wishList' ,$data);
		}
		public function delete($id){
			$this->db->where('id_rekord', $id);
			$this->db->delete('wishList'); 
		}

	}
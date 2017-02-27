<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class Products extends CI_Model {
		private $sql;
		public function __construct(){
			parent::__construct();
			$this->load->model('WishListModel', 'WM');
			$this->sql="SELECT * FROM `sproducts` 
				INNER JOIN sproducsstan ON sproducsstan.id_prod = sproducts.id 
				INNER JOIN sproductssetings on sproductssetings.id_prod = sproducts.id 
				INNER join sproductsditels on sproductsditels.id_prod = sproducts.id
				INNER JOIN sproductscotegory on sproductscotegory.id_prod =sproducts.id
				INNER join scategory on scategory.id = sproductscotegory.id_category 
				INNER join ssubcategory on ssubcategory.id = sproductscotegory.id_subcategory
			";
			$this->count_bilans();
		}
		public function getALLproductsarry($id,$arrry){
			if(isset($id)){
				foreach($arrry as $row ){
					$row->WLIST=$this->WM->IDinWM($row->id_prod,$id);
				}
			}
			return $arrry;
		}
		public function getALLproducts($id){
			$query = $this->db->query($this->sql);
			$arrry=$query->result();
			return $this->getALLproductsarry($id,$arrry);

		}
		private function count_bilans(){
			$query = $this->db->query($this->sql);
			foreach ($query->result_array() as $row){
				$this->db->where('id_prod',$row['id_prod']);
				$this->db->update('sproducsstan', array('bilans'=>$this->Update_Bilans($row['id_prod'])));

			}	
		}
		private  function Update_Bilans($id){
			$sql="SELECT * FROM `sbaytime` WHERE `id_prod` = ? and byfirm=0";
			$query=$this->db->query($sql,$id);
			$priceplus=0;
			foreach ($query->result_array() as $row){
				$priceplus+=$row['bayprice']*$row['count'];
			}
			$sql="SELECT * FROM `sbaytime` WHERE `id_prod` = ? and byfirm=1";
			$query=$this->db->query($sql,$id);
			$priceminus=0;
			foreach ($query->result_array() as $row){
				$priceminus+=$row['bayprice']*$row['count'];
			}
			$bilans=$priceplus-$priceminus;
			return $bilans;
			
		}
	}
?>
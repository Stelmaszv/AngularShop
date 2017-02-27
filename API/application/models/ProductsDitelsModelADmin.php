<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class ProductsDitelsModelADmin extends CI_Model {
		public function __construct(){
			parent::__construct();
		}
		public function setProcent($price,$procent){
			
				if($procent>0){
					$promotionON='yes';
				}else{
					$promotionON='no';
				}
				$array = array('promotion_stan'=>$promotionON,'procentptomo'=>$procent,'newprice'=>$price);
				$this->db->where('id_prod',$this->id);
				$this->db->update('sproductssetings', $array);
			

		}
		public function SaveEdit($array){
			$this->db->where('id_prod',$this->id);
			$dataDitels= array(
				'description_info' =>$array['description_info'],
				'disrption'        =>$array['disrption'],
				'TAG'              =>$array['TAG']
			);
			$this->db->update('sproductsditels', $dataDitels);
			$this->db->where('id',$this->id);
			$dateName= array(
				'name'	=>$array['name'],
				'price' =>$array['price']
			);
			$this->db->update('sproducts', $dateName);
			$this->db->where('id_prod',$this->id);
			$sproductscotegory= array(
				'id_category' 	 =>$array['id_subcategory'],
				'id_subcategory' =>$array['id_category']
			);
			$this->db->update('sproductscotegory', $sproductscotegory);
			$this->setProcent($array['price'],0);
		}
		public function addProduct($array){
			$sproducts= array(
				'name'	=>$array['name'],
				'price' =>$array['price']
			);
			$this->db->insert( 'sproducts' ,$sproducts);
			$id=$this->db->insert_id();
			$sproductsditels= array(
				'id_prod'          =>$id,
 				'description_info' =>$array['description_info'],
				'disrption'        =>$array['disrption'],
				'TAG'              =>$array['TAG']
			);
			$this->db->insert( 'sproductsditels' ,$sproductsditels);
			$sproductscotegory= array(
				'id_prod'        =>$id,
				'id_category' 	 =>$array['id_category'],
				'id_subcategory' =>$array['id_subcategory']
			);
			$this->db->insert( 'sproductscotegory' ,$sproductscotegory);
			$sproductssetings = array(
				'id_prod'        		=>$id,
				'id_promotion'   		=>0,
				'promotion_stan' 		=>'no',
				'promotion_recommended' =>'no',
				'procentptomo'   		=>0,
				'newprice'       		=>0,
			);
			$this->db->insert( 'sproductssetings' ,$sproductssetings);
			$sproducsstan = array(
				'id_prod'    =>$id,
				'selled'     =>0,
				'recomended' =>0,
				'stancount'  =>0,
				'accessiblelevel' =>0,
				'rating'          =>0,
				'buybyfirm'       =>0,
				'bilans'          =>0
			);
			$this->db->insert( 'sproducsstan' ,$sproducsstan);
			mkdir (FCPATH.'..'.DIRECTORY_SEPARATOR.'photo'.DIRECTORY_SEPARATOR.$this->$id, 0777);
		}
		public function adddiliver($price,$qty,$userID){

			
			$this->db->where('id_prod',$this->id);
			$data=array(
				'id_prod'=> $this->id,
				'user_id_by'=>$userID,
				'time'=> time(),
				'count'=>$qty,
				'byfirm'=>1,
				'bayprice'=>$price
			);
			$sql='UPDATE `sproducsstan` SET `stancount` = stancount+'.$this->db->escape($qty).' where id_prod= '.$this->db->escape($this->id).' ';
			$this->db->query($sql);
			$this->db->insert( 'sbaytime' ,$data);
		}
		public function changeavailabilityModel($value){
			$this->db->where('id_prod',$this->id);
			$this->db->update('sproducsstan', array('accessiblelevel'=>$value));
		}
	}

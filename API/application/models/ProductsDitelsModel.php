<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class ProductsDitelsModel extends CI_Model {
		function __construct(){
			parent::__construct();
			$this->load->model('WishListModel', 'WM');
		}
		function  detils($id){
			$sql='SELECT * FROM `sproducts` 
						INNER JOIN sproducsstan ON sproducsstan.id_prod = sproducts.id 
						INNER JOIN sproductssetings on sproductssetings.id_prod = sproducts.id 
						INNER join sproductsditels on sproductsditels.id_prod = sproducts.id 
						INNER JOIN sproductscotegory on sproductscotegory.id_prod =sproducts.id 
						INNER join scategory on scategory.id = sproductscotegory.id_category 
						INNER join ssubcategory on ssubcategory.id = sproductscotegory.id_subcategory
				WHERE sproducts.id = ?';
				$this->qwery = $this->db->query($sql,$id);
				$this->row = $this->qwery->row_array();
		}
		function get_row($field){
			return $this->row[$field];
		}
		function show_table($id){
			$array=$this->qwery->result();
			foreach($array as $row){
				$row->WLIST=$this->WM->IDinWM($this->row['id_prod'],$id);
			}
			return $array;
		}

		private function setword($value){
			$this->words=str_word_count($value, 1);
			foreach ($this->words as $key) {
				 $value = $key;
			}
			return $value;
		}
		public function show_similar($value){
			
			$sql='SELECT * FROM `sproducts` 
					INNER JOIN sproducsstan ON sproducsstan.id_prod = sproducts.id 
					INNER JOIN sproductssetings on sproductssetings.id_prod = sproducts.id 
					INNER join sproductsditels on sproductsditels.id = sproducts.id 
					INNER JOIN sproductscotegory on sproductscotegory.id_prod =sproducts.id 
					INNER join scategory on scategory.id = sproductscotegory.id_category 
					INNER join ssubcategory on ssubcategory.id = sproductscotegory.id_subcategory
					where sproducts.name like ? ';
					 $this->qwery = $this->db->query($sql,'%'.$this->db->escape_like_str($this->setword($value)).'%');
					 $this->qwery->num_rows();
					 return $this->qwery->result();
		}
	}
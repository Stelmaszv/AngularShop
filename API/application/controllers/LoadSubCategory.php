<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class LoadSubCategory extends CI_Controller {
		public function __construct(){
			parent::__construct();
			$this->load->model('LoadSubCategoryModule', 'LSCM');
		}
		function getSubCategory(){
			
			echo json_encode($this->LSCM->get_sub_categorys_MODEL($_GET['categoryID']));
		}
		function returnIDsubcategory($ID){
			 $array=$this->LSCM->returnname($ID);
			foreach($array as $row){
				if($row->id == $ID){
					$array=array($row->subname);
				}
				
			}
			echo json_encode($array);
			
		}
	}


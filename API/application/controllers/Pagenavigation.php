<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class Pagenavigation extends CI_Controller {
		public function __construct(){
			parent::__construct();
			$this->criteria['first']=$this->input->get( 'for' );
			$this->criteria['secend']=$this->input->get( 'do' );
			$this->criteria['category']=$this->input->get( 'catname' );
			$this->criteria['subcategory']= $this->input->get( 'subcatname' );
			$this->criteria['keyword']=$this->input->get( 'keyword' );
			$this->load->model('PagenavigationModel', 'pages');
			$this->ditels = $this->pages->detils($this->sql_qvery(),2,$this->input->get( 'page' ));
			$this->ditels['page'] = $_GET['page'];
		}
		public function pages(){
			echo json_encode($this->pages->show_pages($this->input->get( 'page' )));
		}
		public function showpage(){
			echo json_encode($this->pages->show_results($this->input->get( 'userid' )));
		}
		public function  countKeyWord(){
				$words=str_word_count($this->criteria['keyword'], 1);
				$add_sql='';
				foreach ($words as $key) {
					$add_sql.=' and sproductsditels.TAG like   "%'.$this->db->escape_like_str($key).'%" ';				
				}
				$this->criteria['keyword']=$add_sql;
		}
		public function sql_qvery(){
			$this->countKeyWord();
				switch ($this->input->get( 'type' )) {
					case 'normal':
								$sql='SELECT * FROM `sproducts` INNER JOIN sproducsstan ON sproducsstan.id_prod = sproducts.id 
																INNER JOIN sproductssetings on sproductssetings.id_prod = sproducts.id 
																INNER join sproductsditels on sproductsditels.id_prod = sproducts.id 
																INNER JOIN sproductscotegory on sproductscotegory.id_prod =sproducts.id 
																INNER join scategory on scategory.id = sproductscotegory.id_category 
																INNER join ssubcategory on ssubcategory.id = sproductscotegory.id_subcategory 
																where scategory.catname like "%'.$this->db->escape_like_str($this->criteria['category']).'%" 
																and ssubcategory.subname like  "%'.$this->db->escape_like_str($this->criteria['subcategory']).'%" 
																'.$this->criteria['keyword'].'';	
					break;
					case 'betwen':
						$sql='SELECT * FROM `sproducts` INNER JOIN sproducsstan ON sproducsstan.id_prod = sproducts.id 
																INNER JOIN sproductssetings on sproductssetings.id_prod = sproducts.id 
																INNER join sproductsditels on sproductsditels.id_prod = sproducts.id 
																INNER JOIN sproductscotegory on sproductscotegory.id_prod =sproducts.id 
																INNER join scategory on scategory.id = sproductscotegory.id_category 
																INNER join ssubcategory on ssubcategory.id = sproductscotegory.id_subcategory 
																where scategory.catname like "%'.$this->db->escape_like_str($this->criteria['category']).'%" 
																and ssubcategory.subname like  "%'.$this->db->escape_like_str($this->criteria['subcategory']).'%" 
																'.$this->criteria['keyword'].' and sproducts.price BETWEEN '.$this->db->escape($this->criteria['first']).' AND '.$this->db->escape($this->criteria['secend']).' ';
					break;
				}
					
						
			return $sql;
			
		}
	}
	


?>

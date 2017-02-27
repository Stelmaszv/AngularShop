<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class PagenavigationModel extends CI_Model {
		public $ditels=array();
		private $sql;
		public function __construct(){
			parent::__construct();
			$this->load->model('Products', 'Products');
		}
		public function count_sql($sql){
			$this->sql=$sql;
			$query = $this->db->query($this->sql);
			return $query->num_rows();
		}
		public function count_pages($onpage){
			return ceil($this->ditels['count']/$onpage);
		}
		public function start($onpage,$page){
			return $onpage * ($page - 1);
		}
		public  function show_pages($get){
			$pages=array();
			$actual='';
			for($x=1;$x<$this->ditels['pages']+1;$x++){
				if($get==$x){
					$actual='yes';
				}else{
					$actual='no';
				}
				$pages[]=array(
					'page'    =>$x,
					'actual'  =>$actual
				);
			}
			return $pages;
		}
		public function detils($sql,$onpage,$page){
			$this->ditels['onpage']=$onpage;
			$this->ditels['count']=$this->count_sql($sql);		
			$this->ditels['pages']=$this->count_pages($onpage);
			$this->ditels['start']=$this->start($onpage,$page);
			return $this->ditels;
		}
		public function show_results($id){
			$this->sql.= ' limit '.intval($this->ditels['start']).', '.intval($this->ditels['onpage']).'';
			$query = $this->db->query($this->sql);
			$arrry=$query->result();
			return $this->Products->getALLproductsarry(39,$arrry);
		}
	}
?>
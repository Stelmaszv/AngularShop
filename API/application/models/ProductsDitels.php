<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class ProductsDitels extends CI_Controller {
		private $id;
		private $ditels;
		function __construct(){
			parent::__construct();
			$this->load->model('ProductsDitelsModel', 'PDM');
			$this->ditels=$this->PDM->detils($_GET['id'],$_GET['field']);
			
		}
		function getfield(){
			echo '<pre>';
			echo var_dump($this->ditels[1]);
			echo '</pre>';
		}
	}

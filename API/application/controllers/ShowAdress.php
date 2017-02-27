<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class ShowAdress extends CI_Controller {
		public $id;
		public function __construct(){
			parent::__construct();
			$this->load->model('LoadAdressDirels', 'LAD');
			$this->id=$this->input->get( 'id' );
			$this->LAD->id=$this->id;
		}
		function showAdress(){
			echo  json_encode($this->LAD->showadressloop());
		}
	}
?>
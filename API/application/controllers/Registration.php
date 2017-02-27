<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Registration extends CI_Controller {
		public function __construct(){
			parent::__construct();
			$post = file_get_contents( 'php://input' );
			$_POST = json_decode( file_get_contents( 'php://input' ) , true );
			$this->load->model('RegistrationLoginModel', 'RLM');
			$this->RLM->set_array($_POST);

		}
		public function checklogin(){
			$this->form_validation->set_rules( 'login' , 'login' , 'is_unique[susers.login]' );
			if ( $this->form_validation->run() ){
				echo 'tak';
			}
		}
		public function create(){
			$this->RLM->registration();
			echo $this->RLM->login();
		}
		public function login(){
			echo  $this->RLM->login();
		}
	}


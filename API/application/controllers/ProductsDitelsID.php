<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class ProductsDitelsID extends CI_Controller {
		function __construct(){
			parent::__construct();
			$this->load->model('ProductsDitelsModel', 'PDM');
			if(isset($_GET['id'])){
				$this->PDM->detils($this->input->get( 'id' ));
			}	
		}
		
		function getresult(){				
			echo json_encode($this->PDM->show_table($this->input->get( 'userid' )));
		}
	}
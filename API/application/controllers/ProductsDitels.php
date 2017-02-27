<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class ProductsDitels extends CI_Controller {
		function __construct(){
			parent::__construct();
			$this->load->model('ProductsDitelsModel', 'PDM');
			$this->PDM->detils($this->input->get('id'));
		}
		
		function getfield(){;				
			echo $this->PDM->get_row($_GET['field']);
		}
		function fainsomilar(){
			echo json_encode($this->PDM->show_similar($this->input->get('value')));
		}
	}

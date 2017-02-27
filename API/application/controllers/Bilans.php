<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Bilans extends CI_Controller {
	function product(){
		$this->load->model('BilansModel', 'BM');
		$this->BM->SetQwery($this->input->get( 'id' ));
		echo json_encode($this->BM->BilansProduct());
	}
}

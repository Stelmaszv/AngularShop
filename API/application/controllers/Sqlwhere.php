<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Sqlwhere extends CI_Controller {
	function __construct(){
		parent::__construct();
		$this->load->model('SqlwhereModel', 'SWM');
		$this->SWM->detils($_GET['table'],$_GET['where'],$_GET['value']);
	}
	public function showqwery(){
		echo json_encode($this->SWM->returnqwery());
	}
}
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Mesagess extends CI_Controller {
	function show($id){
		$this->load->model('MesagessModel', 'MM');
		echo json_encode($this->MM->showMessages($id));
	}
	function delete($id){
		$this->load->model('MesagessModel', 'MM');
		$this->MM->delete($id);
	}
}

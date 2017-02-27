<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Loadproductsall extends CI_Controller {
	function getproducts(){
		$this->load->model('Products', 'Products');
		echo  json_encode($this->Products->getALLproducts(39));
	}
}

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class WishList extends CI_Controller {
	function __construct(){
			parent::__construct();
			$this->load->model('WishListModel', 'WM');
	}
	public function IFinWishLis($id){
			echo json_encode($this->WM->IDinWM($id,39));
	}
	public function upadate($id,$userID){
		$this->WM->upadate($id,$userID);
	}
	public function show($id){
		echo $this->WM->showList($id);
	}
	public function delete($id){
		$this->WM->delete($id);
	}
}
?>
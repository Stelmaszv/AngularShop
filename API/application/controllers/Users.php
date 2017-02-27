<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {
	private $id;
	public function __construct(){
		parent::__construct();
		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( file_get_contents( 'php://input' ) , true );
		$this->load->model('UsersModel', 'UM');
		$this->id=$this->input->get( 'id' );
	}
	public function  getAdreessJasson(){
		echo json_encode($this->UM->show_adress($this->id));
	}
	public function showUserss(){
		echo json_encode($this->UM->showUserss());
	}
	public function showUserDitels(){
		echo json_encode($this->UM->showUserssDitels($this->id));
	}
	public function changepermissions(){
		$array=$this->input->post( 'tokken' );
		$this->UM->id=$this->input->post( 'id' );
		$this->UM->changepermissions($this->input->post( 'value' ),$array['role']);
	}
	public function setban(){
		$array=$this->input->post( 'tokken' );
		$this->UM->id=$this->input->post( 'id' );
		$this->UM->setban($this->input->post( 'value' ),$array['role']);

	}
}

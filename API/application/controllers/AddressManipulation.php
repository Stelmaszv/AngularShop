<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class AddressManipulation extends CI_Controller {
	public function __construct(){
			parent::__construct();
			$post = file_get_contents( 'php://input' );
			$_POST = json_decode( file_get_contents( 'php://input' ) , true );
			$this->load->model('AddressManipulationModel', 'AMM');
			$this->load->model('LoadAdressDirels', 'LAD');
			$this->id = $this->input->get( 'id' );
			$this->token = $this->input->post( 'token' );
			$this->adress = $this->input->post( 'address' );
			$this->LAD->id=$this->id;
	}
	function AddAddress(){
		$data=$this->adress;
		$data['id_user']=$this->token['id'];
		$this->AMM->array=$data;
		$this->AMM->createAdress();
	}
	function showAdressID(){
		echo json_encode($this->LAD->adressID());
	}
	function setmianAdres(){
		$this->AMM->set_adress($this->input->get( 'addressID' ));

	}
	function delteaddress(){
		$this->AMM->DeleteAdress();
	}
	function Update(){
		$this->LAD->id=$this->input->post( 'id' );
		echo $this->AMM->update_adress($this->input->post( 'id' ),$this->adress);
	}
}
?>

<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Opinin extends CI_Controller {
	public function __construct(){
		parent::__construct();
		$post = file_get_contents( 'php://input' );
		$_POST = json_decode( file_get_contents( 'php://input' ) , true );
		$this->id= $this->input->get('id');
		$this->load->model('OpininModel', 'OM');
		$this->OM->id=$this->id;
		$this->token = $this->input->post( 'token' );
		
	}
	function AddOpinion(){
		$this->opinion = $this->input->post( 'opinion' );
		$data= $this->opinion;

		$sql= array(
			'id_prod'     =>$this->input->post( 'id' ),
			'id_user'     =>$this->input->post( 'tokken' ),
			'text'    	  =>$data['text'],
			'value'   	  =>$data['value'],
			'time'    	  =>time(),
			'banOpinion'  =>0
 		);
 		$this->vardump->show($sql);
		$this->OM->addOpinion($sql);

	}
	function OpinionBan(){

		$arry=$this->input->post( 'tokken' );
		$this->OM->opinionBan($arry['role'],$this->input->post( 'id' ),$this->input->post( 'ban' ));
	}
	function showwopinions(){

		echo json_encode($this->OM->showQwery('SELECT * FROM `sopinion` INNER join sproducts on sopinion.id_prod =sproducts.id INNER join susers on sopinion.id_user=susers.id_user where sproducts.id= ? and banOpinion= 0',$this->id));
	}
	function showwopinionsAdmin(){

		echo json_encode($this->OM->showQwery('SELECT * FROM `sopinion` INNER join sproducts on sopinion.id_prod =sproducts.id INNER join susers on sopinion.id_user=susers.id_user where sproducts.id= ? ',$this->id));
	}
	function showwopinionsUser(){
		echo json_encode($this->OM->showQwery('SELECT * FROM `sopinion` INNER join sproducts on sopinion.id_prod =sproducts.id INNER join susers on sopinion.id_user=susers.id_user where susers.id_user= ?',$this->id));
	}
	function albletioapinion(){
		echo $this->OM->abletoopinion('SELECT * FROM `sopinion` where id_prod= ? and id_user = ?',array($this->id,$this->input->get( 'userID' )));
	}
	function averebleobinion(){
		echo json_encode($this->OM->getaverebleobinion('SELECT * FROM `sorders` where id_user =?',$this->id));
	}
}
?>
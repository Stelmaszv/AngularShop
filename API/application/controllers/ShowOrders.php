<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class ShowOrders extends CI_Controller {
		public function __construct(){
			parent::__construct();
			$post = file_get_contents( 'php://input' );
			$_POST = json_decode( file_get_contents( 'php://input' ) , true );
			$this->load->model('LoadOrdersModel', 'LOD');
			$this->load->model('LoadAdressDirels', 'LAD');
			if(isset($_GET['id'])){
				$this->id=$this->input->get( 'id' );
				$this->LOD->id=$this->id;
			}else{

				$this->id=false;
			}
		}
		function showAdressID(){
			$this->LAD->id=$this->LOD->showAdress();
			echo json_encode($this->LAD->adressID());
		}
		function showAdminOrders(){
			echo json_encode($this->LOD->loadAdminOrders());
		}
		function updateStatus(){
	
			$this->id=$this->input->post( 'id' );	
			$this->LOD->id=$this->id;		
			$tokken=$this->input->post( 'tokken' );
			$this->LOD->UpdareOrderStatus($tokken['role'],$this->input->post( 'stan' ));
		}
		function ShowUserOrder(){
			echo json_encode($this->LOD->loadUserOrders($this->input->get( 'id' )));
		}
		function showOrder(){
			echo json_encode($this->LOD->loadUserOrder());
		}
		function fainInOrders(){
			$this->LOD->id=$this->input->get( 'id' );
			echo $this->LOD->fainInOrders($this->input->get( 'userID' ));
		}
	}
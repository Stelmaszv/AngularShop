<?php
	defined('BASEPATH') OR exit('No direct script access allowed');
	class ProductsDitelsIDAdmin extends CI_Controller {
			function __construct(){
				parent::__construct();
				$this->load->model('ProductsDitelsModelADmin', 'PDMA');
				$this->load->model('Products', 'Products');
				$this->load->model('ProductsDitelsModel', 'PDM');
				$this->load->model('WishListModel', 'WLM');
				$post = file_get_contents( 'php://input' );
				$_POST = json_decode( file_get_contents( 'php://input' ) , true );
				$array=$this->input->post( 'tokken' );
				$this->PDMA->id=$this->input->post( 'id' );
				if($array['role']!='admin'){
					exit('Brak Uprawnien');
				}
			}

			function Edition(){
				$array= array(
					'name' 			   =>$this->input->post( 'name' ),
					'description_info' =>$this->input->post( 'description_info' ),
					'disrption'        =>$this->input->post( 'disrption' ),
					'price'            =>$this->input->post( 'price' ),
					'id_subcategory'      =>$this->input->post( 'id_category' ),
					'id_category'   =>$this->input->post( 'id_subcategory' ),
					'TAG'			   =>$this->input->post( 'TAG' )
				);
				$this->PDMA->SaveEdit($array);
			}
			function addProduct(){
				$array= array(
					'name' 			   =>$this->input->post( 'name' ),
					'description_info' =>$this->input->post( 'description_info' ),
					'disrption'        =>$this->input->post( 'disrption' ),
					'price'            =>$this->input->post( 'price' ),
					'id_category'      =>$this->input->post( 'id_category' ),
					'id_subcategory'   =>$this->input->post( 'id_subcategory' ),
					'TAG'			   =>$this->input->post( 'TAG' )
				);
				$this->PDMA->addProduct($array);

			}
			function setPromotion(){
				$this->PDMA->setProcent($this->input->post( 'nev' ),$this->input->post( 'procent' ));
				$this->PDM->detils($this->input->post( 'id' ));
				$this->WLM->sent_message($this->input->post( 'id' ),$this->PDM->get_row('name'),$this->input->post( 'procent' ),$this->input->post( 'nev' ));
			}
			function adddiliver(){
				$array=$this->input->post( 'tokken' );
				$this->PDMA->adddiliver($this->input->post( 'price' ),$this->input->post( 'qty' ),$array['id']);
			}
			function changeavailability(){
				$this->PDMA->changeavailabilityModel($this->input->post( 'value' ));
			}
	}
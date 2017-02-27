<?php
defined('BASEPATH') OR exit('No direct script access allowed');

	class Order extends CI_Controller {
		public function __construct(){
			parent::__construct();
			$post = file_get_contents( 'php://input' );
			$_POST = json_decode( file_get_contents( 'php://input' ) , true );
			$this->orderArray= $this->input->post( 'order' );
			$this->token = $this->input->post( 'token' );
			$this->pursher= $this->input->post( 'pursher' );
			$this->sent = $this->input->post( 'sent' );
			$this->diiverchused = $this->input->post( 'diiverchused' );
			$this->totalPrice = $this->input->post( 'totalPrice' );
			$this->load->model('ProductsDitelsModel', 'PDM');
			$this->load->model('ProductsOrderUpdataModel', 'POUM');
		}
		function mageOrder(){
			foreach($this->orderArray as $item){
				$this->PDM->detils($item['id_prod']);
				$stan=$this->PDM->get_row('stancount');
				$selled=$this->PDM->get_row('selled');
				$newqty=$stan-$item['qty'];
				$data = array('stancount' => $newqty,'selled' => $selled+$item['qty']);
				if($item['promotion_stan']=='no'){
					$price=$item['price'];
				}else{
					$price=$item['newprice'];
				}
				$insertdate= array('id_prod' => $item['id_prod'],'user_id_by'=>$this->token['id'],'time' => time(),'count' => $item['qty'],'byfirm'=>0,'bayprice'=>$price);
				if($stan>0){
					$this->POUM->updata($data,$item['id_prod']);
					$this->POUM->insertbay($insertdate);
				}
			}
			$this->inserorder();
		}
		function inserorder(){
			$data = array(
				'id_user' => $this->token['id'],
				'time' => time(),
				'pruducts' => json_encode($this->orderArray),
				'updata'=>time(),
				'purchaser'=>$this->pursher[0]['id'],
				'total'=>$this->totalPrice,
				'sent' =>$this->sent,
				'diiverchused'=>$this->diiverchused
			);
			$this->POUM->saveOrder($data);
		}
	}


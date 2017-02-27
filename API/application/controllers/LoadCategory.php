<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class LoadCategory extends CI_Controller {
		public function __construct(){
			parent::__construct();
			$this->load->model('LoadCategoryModel', 'CategoryM');
			$this->category=$this->CategoryM->load_all();
			$post = file_get_contents( 'php://input' );
			$_POST = json_decode( file_get_contents( 'php://input' ) , true );
		}
		public function returnCatID($id){
			foreach($this->category as $row){
				if($row->id==$id){
					$array=array($row->catname);
				}
			}
			echo json_encode($array);
		}
		public function all(){
			echo json_encode($this->category);
		}
		public function showArray(){
			echo json_encode($this->CategoryM->showarray());
		}
		public function delete(){
			$array=$this->input->post( 'tokken' );
				if($array['role']!='admin'){
					exit('Brak Uprawnien');
				}
			$this->CategoryM->deletecat($this->input->post( 'id' ),$this->input->post( 'type' ));
		}
		public function change(){
			$array=$this->input->post( 'tokken' );
				if($array['role']!='admin'){
					exit('Brak Uprawnien');
				}
			$this->CategoryM->update($this->input->post( 'id' ),$this->input->post( 'name' ),$this->input->post( 'type' ));
		}
		public function addcategoty(){
			$array=$this->input->post( 'tokken' );
				if($array['role']!='admin'){
					exit('Brak Uprawnien');
				}
			$this->CategoryM->addacat($this->input->post( 'name' ),$this->input->post( 'type' ),$this->input->post( 'id' ));
		}
	}

?>

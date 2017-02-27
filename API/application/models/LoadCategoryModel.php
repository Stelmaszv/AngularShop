<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class LoadCategoryModel extends CI_Model {
		public function __construct(){
			parent::__construct();
			$this->sql='SELECT * FROM `scategory`' ;
		}
		function set_array(){
			$query=$this->db->query($this->sql);
			return $query->result();
		}
		public function load_all(){
			return  $this->set_array();
		}
		public function showarray(){
			$query = $this->db->get('scategory');
			$array=array();
			foreach($query->result() as $row){
				$this->db->where('id_miancat', $row->id);
				$query = $this->db->get('ssubcategory');
				$subcategory=array();
				foreach($query->result() as $rowsub ){
					if($rowsub->id_miancat==$row->id){
						$subcategory[]= array( 'subname'=>$rowsub->subname,'check'=>false,'idsql'=>$rowsub->id);
					}
				}
				$array[]=array(
					'idsql'=>$row->id,
					'name'=>$row->catname,
					'subcategory'=>json_encode($subcategory)
				);

			}
			return $array;
		}
		public function update($id,$name,$type){
			switch ($type) {
				case 'mian':
					$this->db->where('id', $id);
					$this->db->update('scategory', array('catname' => $name));
				break;
				case 'sub':
					$this->db->where('id', $id);
					$this->db->update('ssubcategory', array('subname' => $name));
				break;
			}
		}
		public function deletecat($id,$type){
			switch ($type) {
				case 'mian':
					$query=$this->db->query('SELECT * FROM `sproductscotegory` where id_category = '.$this->db->escape($id).'');
					if(count($query->result())==0){
						$this->db->where('id', $id);
						$this->db->delete('scategory'); 
						$this->db->where('id_category', $id);
						$this->db->delete('sproductscotegory'); 
					}else{
						echo 'Nie Mozna usnąc poniewaz inny produkt jest pszypisany do tej kategori';
					}
				break;
				case 'sub':
					$query=$this->db->query('SELECT * FROM `sproductscotegory` where id_subcategory = '.$this->db->escape($id).''); 
					if(count($query->result())==0){
						$this->db->where('id', $id);
						$this->db->delete('ssubcategory'); 
						$this->db->where('id_subcategory', $id);
						$this->db->delete('sproductscotegory'); 
					}else{
						echo 'Nie Mozna usnąc poniewaz inny produkt jest pszypisany do tej kategori';
					}
				break;
			}

		}
		public function addacat($name,$type,$id){
			switch ($type) {
				case 'mian':
					$this->db->insert( 'scategory' ,array('catname'=>$name));
				break;
				case 'sub':
					$this->db->insert('ssubcategory',array('id_miancat'=>$id,'subname'=>$name));
				break;
			}
		}	

	}
?>
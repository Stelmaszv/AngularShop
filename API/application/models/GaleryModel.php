<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class GaleryModel extends CI_Model {
		function set_all($id){
			$this->id=$id;
			$this->url=FCPATH.'..'.DIRECTORY_SEPARATOR.'photo'.DIRECTORY_SEPARATOR.$this->id;
			$this->photo=$this->set_photo();
		}
		function show_galery(){

			return $this->photo; 
		}
		function set_photo(){
			 $newFiles = array();
			    foreach ( array_diff(scandir($this->url), array( '.' , '..' ) ) as $file ){
			    	$newFiles[] .= $file;
			    }
			  return $newFiles;
		}
	}

?>
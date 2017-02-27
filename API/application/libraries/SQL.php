<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class SQL{

    public function qwery($sql,$id){
    	$query=$this->db->query($sql,$id);
		return $query->result();
    }
}
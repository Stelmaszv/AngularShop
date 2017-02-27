<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class SqlwhereModel extends CI_Model {

		function  detils($table,$where,$value){
			$this->db->like( $where , $this->setword($value));
			$this->qwery = $this->db->get($table);

		}
		function returnqwery(){
			return $this->qwery->result();
		}
		function setword($value){
			$this->words=str_word_count($value, 1);
			foreach ($this->words as $key) {
				 $value = $key;
			}
			return $value;
		}
	}
	
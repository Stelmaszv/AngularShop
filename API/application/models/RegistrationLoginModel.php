<?php
	defined('BASEPATH') OR exit('No direct script access allowed');

	class RegistrationLoginModel extends CI_Model {
		function set_array($array){
			$this->array=$array;
		}
		function registration(){
			$this->array['password']=password_hash($this->array['password'], PASSWORD_BCRYPT);
			$this->db->insert( 'susers' ,$this->array);
		}
		function login(){
			$sql = "SELECT * FROM `susers` inner join suseresadmin on suseresadmin.id_user = susers.id_user WHERE susers.login like ?"; 
			$qwery = $this->db->query($sql,$this->array['login']);
			$row=$qwery->row_array();
			if(password_verify($this->array['password'],$row['password'])){
					$token = $this->jwt->encode( array(
					'id' 	=> $row['id_user'],
					'login' => $row['login'],
					'email' => $row['email'],
					'role'  => $row['role']
					) , config_item( 'encryption_key' ) );
					return json_encode($token);
			}else{
				return 'error';
			}
		}
	}
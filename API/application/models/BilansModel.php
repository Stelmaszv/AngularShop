<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
	class BilansModel extends CI_Model {
		private $array=array();
    private $id;
    private $sql;
		function __construct(){
			parent::__construct();
		}
    public function SetQwery($id){
      $this->id=$id;
      if(isset($id)){
          $this->sql='SELECT * FROM `sbaytime` INNER join susers on sbaytime.user_id_by = susers.id_user INNER join sproducts on sbaytime.id_prod = sproducts.id WHERE `id_prod` = ?';
      }else{
          $this->sql='SELECT * FROM `sbaytime` INNER join susers on sbaytime.user_id_by = susers.id_user INNER join sproducts on sbaytime.id_prod = sproducts.id';
      }
    }
		public function BilansProduct(){   
			$this->setMounts($this->id);
      return $this->array;
		}
		private function setMounts($id){
      
			$query=$this->db->query($this->sql,$this->id);
			foreach ($query->result() as $row) {
				$data = new dateBilanss($row->time);
				$return= $this->faind_mount($this->array,$data->returnYear(),$data->returnmountnumber());
        $dataArray=$this->addDate($data->returnYear(),$data->returnmountnumber());
				if($return!='not add'){
					$this->array[] = array(
						'year'=>$data->returnYear(),
						'mount'=>$data->returnmountnumber(),
						'data'=>json_encode($dataArray),
						'addtime'=>$row->time
					);
				}
					

       

			}
      
			
		}
		private function addDate($year,$mount){
        $dates=array();
        $query=$this->db->query($this->sql,$this->id);
        foreach ($query->result() as $row) {
            $data = new dateBilanss($row->time);
            if($data->returnYear()==$year && $data->returnmountnumber()==$mount){
              $dates[]=array(
                'id_prod'     =>$row->id_prod,
                'user_id_by'  =>$row->user_id_by,
                'name'        =>$row->name,
                'time'        =>$row->time,
                'count'       =>$row->count,
                'byfirm'      =>$row->byfirm,
                'login'       =>$row->login,
                'price'       =>$row->bayprice
              );
            }
        }
        return $dates;
		}
		private function faind_mount($mounts,$year,$mount){

			foreach ($mounts as $array) {
				if($mount==$array['mount'] && $year==$array['year']){
					return  'not add';
				}
				
				
			}
		}
		private function bilansarray(){
			return $this->array;
		}
	}
	class date{
     protected $data;
     protected $data_detils;
      function __construct($data){
          $this->data=$data;
      }
      protected function convert_data(){
          $day=date('d',$this->data);
          $mout=date('m',$this->data);
          $year=date('Y',$this->data);
          $huer=date('H',$this->data);
          $sec=date('i',$this->data);
          $mini=date('s',$this->data);
        return  $data2=''.$year.'-'.$mout.'-'.$day.' '.$huer.':'.$sec.':'.$mini.''; 

      }
      protected function set_value($data){
          $data_aktualna = Date('Y-m-d H:i:s');
          $liczba_sekund_dla_wydarzenia = StrToTime($data);
          $liczba_sekund_dla_aktualnej_daty = StrToTime($data_aktualna);
          $liczba_sekund_miedzy_datami =
          $liczba_sekund_dla_aktualnej_daty-$liczba_sekund_dla_wydarzenia;
          $liczba_sekund_w_roku = 365*24*60*60;
          $liczba_sekund_w_miesiacu = 30*24*60*60;
          $tydzien=$liczba_sekund_w_miesiacu/4;
          $liczba_sekund_w_dniu = 24*60*60;
          $liczba_sekund_w_godzinie = 60*60;
          $liczba_sekund_w_minucie = 60;
          $this->data_detils['years']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_roku);
          $this->data_detils['mount']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_miesiacu);
          $this->data_detils['days']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_dniu);
          $this->data_detils['hours']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_godzinie);
          $this->data_detils['minut']= Floor ($liczba_sekund_miedzy_datami/$liczba_sekund_w_minucie);
          $this->data_detils['weeks']= Floor ($liczba_sekund_miedzy_datami/$tydzien);
      }
      public function count_later_mormal($day){
        $this->set_value($this->convert_data());
        if($day>$this->data_detils['days']){
            return $this->count_down();
        }else{
            return $this->normal_form();
        }
      }
      protected function converMonut($data){
	      	switch ($data) {
	                        case '12';
	                        $mies='Grudnia';
	                        break;
	                        case '11';
	                        $mies='Listopada';
	                        break;
	                        case '10';
	                        $mies='Pażdziernika';
	                        break;
	                        case '09':
	                        $mies='Wrzeseńa';
	                        break;
	                        case '08':
	                        $mies='Sierpieńa';
	                        break;
	                        case '07':
	                        $mies='lipca';
	                        break;
	                        case '06':
	                        $mies='Czerwca';
	                        break;
	                        case '05';
	                        $mies='Maj';
	                        
	                        break;
	                        case '04':
	                        $mies='Kwietnia';
	                        
	                        break;
	                        case '03':
	                        $mies='Marca';
	                        
	                        break;
	                        case '02':
	                        $mies='Lutego'; 
	                        break;
	                        case '01':
	                        $mies='Stycznia'; 	            
	          	            break;
	        }
	        return $mies;
      }
      public function normal_form(){
              $dataw = date('d',$this->data);
              $datam = date('m',$this->data);
                 
                $wuswieldate=''.$dataw.' '.$this->converMonut($datam).' '.date('Y',$this->data).'';      
                return $wuswieldate;
      }
      public function count_down(){
               $this->set_value($this->convert_data());
        return $this->count_down_function();

      }
      public function both_dates(){
          return $this->normal_form().' ( '.$this->count_down().' )';
      }
      private function count_down_function(){
              $lat=$this->data_detils['years'];
              $mniut=$this->data_detils['minut'];
              $mesy=$this->data_detils['mount'];
              $godzin=$this->data_detils['hours'];
              $dni=$this->data_detils['days'];
              $tydzien=$this->data_detils['weeks'];
              if($lat==0 && $mesy==0 && $godzin==0 && $mniut==0 && $tydzien==0 && $dni==0){
                $dodano='W tej chwili';
              }else if($lat==0 && $mesy==0 && $godzin==0 && $mniut!=0 && $tydzien==0 && $dni==0){
                $dodano=$mniut.' minuty temu';
              }else if($lat==0 && $mesy==0 && $godzin!=0 && $mniut!=0 && $tydzien==0 && $dni==0){
                if($godzin==1){
                  $dodano='godzine temu';
                }else{
                  $dodano= $godzin.' Godzin temu'; 
                }
              }else if($lat==0 && $mesy==0 && $godzin!=0 && $mniut!=0 && $tydzien==0 && $dni!=0){
                if($tydzien==1){
                  $dodano ='wczoraj';
                }else{
                  $dodano= $dni.' dni temu';
                }
              }else if($lat==0 && $mesy==0 && $godzin!=0 && $mniut!=0 && $tydzien!=0 && $dni!=0){
                if($tydzien==1){
                   $dodano= 'tydzień temu';
                }else{
                   $dodano= $tydzien.' tygodnie  temu';  
                }
              }else if($lat==0 && $mesy!=0 && $godzin!=0 && $mniut!=0 && $tydzien!=0 && $dni!=0){
                if($mesy==1){
                  $dodano='Miesiąc temu';
                }else{
                  $dodano=$mesy.' Miesięcy temu';
                }

              }else if($lat!=0 && $mesy!=0 && $godzin!=0 && $mniut!=0 && $tydzien!=0 && $dni!=0){
                if($lat==1){
                  $dodano='rok temu';
                }else{
                  $dodano=$lat.' lat temu';
                }

              }
              return $dodano;
      }

  }
  class dateBilanss extends date{
      	function __construct($data){
      		parent::__construct($data);
      		$this->set_value($this->convert_data());
      	}
      	function returnMount(){
      		return $this->converMonut(date('m',$this->data));
      	}
      	function returnYear(){
      		return date('Y',$this->data);
      	}
      	function returnmountnumber(){
      		return date('m',$this->data);
      	}

  }
?>
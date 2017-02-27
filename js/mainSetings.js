var ProfilSetings = angular.module( 'mianSetings' , ['filtrs'] );
	ProfilSetings.controller( 'setProfil' , [ '$scope' ,'$routeParams' ,'$location','$http','token','getURL' ,function( $scope,$routeParams,$location,$http,token,getURL) {
	tokken=token.returntoken();
	loadMyopinions();
	ableopinions();
	$scope.WishList=getURL.returnURL('API/WishList/show/'+tokken.id);
	$scope.mesages=getURL.returnURL('API/Mesagess/show/'+tokken.id);
	$scope.deleteLIST = function(list,$index){
		$scope.WishList.splice( $index , 1 );
	    getURL.returnURL('API/WishList/delete/'+list.id_rekord);
	}
	$scope.orersscope =function(){
		get_orders();	
	}
	$scope.deleteMesage= function (mesages,$index){
		$scope.mesages.splice( $index , 1 );
		getURL.returnURL('API/Mesagess/delete/'+mesages.id_rekord);
	}
	$scope.adressScope = function(){
		$http.get( 'API/ShowAdress/showAdress?id='+tokken.id).success( function( adresDB ){
			$scope.adress=adresDB;
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	$scope.navBar = function(){
		if(tokken.role=="user"){
			return 'viewsJS/navBarProfil.htm';
		}else{
			return 'viewsJS/navBaradmin.htm'
		}
	}
	$scope.isActive = function ( path ) {
        return $location.path() === path;
    }
	function get_orders(){
		$scope.orders=getURL.returnURL('API/ShowOrders/ShowUserOrder?id='+tokken.id);
	}
	function ableopinions(){
		$http.get( 'API/Opinin/averebleobinion?id='+tokken.id).success( function( opinionDB ){
			$scope.ableopinions=opinionDB;
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	function loadMyopinions(){
		$scope.opinions=getURL.returnURL('API/Opinin/showwopinionsUser?id='+tokken.id);
	}
	$scope.MianView = function(){
		switch($routeParams.place){
			case 'orders':
				return 'viewsJS/orderProfil.htm';
			break;
			case 'showadress':
				return 'viewsJS/adresses.htm';
			break;
			case 'opinions':
				return 'viewsJS/Myopinions.htm';
			break;
			case 'WishList':
				return 'viewsJS/WishList.htm';
			break;
			case 'masagess':
				return 'viewsJS/masagess.htm';
			break;

		}
	}

}]);
ProfilSetings.controller( 'ShowOrder' , [ '$scope' ,'$routeParams' ,'$location','$http', function( $scope,$routeParams,$location,$http) {
	get_order();
	getaressID();

	$scope.id=$routeParams.id
	function get_order(){
		$http.get( 'API/ShowOrders/showOrder?id='+$routeParams.id).success( function( ordersDB ){
				$scope.orders=ordersDB;
				angular.forEach( $scope.orders , function( order , key ){
					var parsed = JSON.parse( order.pruducts );
					$scope.orders[key].items = parsed;
					console.log($scope.orders[key].items);
				});

		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	function getaressID(){
		$http.get( 'API/ShowOrders/showAdressID?id='+$routeParams.id).success( function( adresDB ){
				$scope.adressID=adresDB;
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	$scope.isActive = function ( path ) {
        return $location.path() === path;
    }
	$scope.navBar = function(){
		if(tokken.role=="user"){
			return 'viewsJS/navBarProfil.htm';
		}else{
			return 'viewsJS/navBaradmin.htm'
		}
	}
}]);
ProfilSetings.controller( 'addadress' , ['$scope','$location','$http','token','validate',function($scope,$location,$http,token,validate) {
		$scope.address = {
	    	 name: '',
	    	 surname: '',
	    	 adress: '',
	    	 postCode: '',
	    	 tele: '',
	    	 city: '',
	    	 region: '',
	    };
	$scope.adresserrs= {
    	phon:false,
    	submit:false

    }
    $scope.namberEroor=false;
    function saveadress(){
    		$http.post('API/AddressManipulation/AddAddress/',{
		 		address:$scope.address,
		 		token:token.returntoken()
		 	}).success( function( error ){
				window.location.href = "#setProfil/showadress";
			}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
			});
    }
	$scope.navBar = function(){
		if(tokken.role=="user"){
			return 'viewsJS/navBarProfil.htm';
		}else{
			return 'viewsJS/navBaradmin.htm'
		}
	}
	$scope.isActive = function ( path ) {
        return $location.path() === path;
    }
    $scope.add_address = function(address){
    	if(validate.phonNumber($scope.address.tele)){
    		saveadress();
    	}else{
    		$scope.adresserrs.phon=true;
    		$scope.adresserrs.submit=true;
    	}
    }

}]);
ProfilSetings.controller( 'shoowadressID' , ['$scope','$location','$http','$routeParams','token','validate',function($scope,$location,$http,$routeParams,token,validate) {
	tokken=token.returntoken();
	get_daddressID();
		$scope.adresserrs= {
    	phon:false,
    	submit:false

    }
    function get_daddressID(){
    	$http.get( 'API/AddressManipulation/showAdressID?id='+$routeParams.id).success( function( adresDB ){
				$scope.address=adresDB;
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
    }
    $scope.set_as_Main = function (){
    	$scope.address[0].chiused='yes';
    	$http.get( 'API/AddressManipulation/setmianAdres?id='+tokken.id+'&&addressID='+$routeParams.id).success( function( adresDB ){
    
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
    }
    function delteAdressn(){
    	$http.get( 'API/AddressManipulation/delteaddress?id='+$routeParams.id).success( function( adresDB ){
    		window.location.href = "#setProfil/showadress";
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
    }

    $scope.save_address = function (adress){
    	if(validate.phonNumber($scope.address[0].tele)){
	    	$http.post('API/AddressManipulation/Update/',{
	    			id:$routeParams.id,
			 		address:adress,
			 		token:token.returntoken()
			}).success( function( Update ){
				window.location.href = "#shoowadressID/"+$routeParams.id;
			}).error( function(){
					console.log( 'Błąd pobrania pliku json' );
			});
		}else{
			$scope.adresserrs.phon=true;
    		$scope.adresserrs.submit=true;
		}
		
    }
    $scope.deleteAdressSCope =function(){
    	value=confirm('Czy napewno czesz usnać ten adress ?');
    	if(value==true){
    		delteAdressn();
    	}
    }
    $scope.navBar = function(){
		if(tokken.role=="user"){
			return 'viewsJS/navBarProfil.htm';
		}else{
			return 'viewsJS/navBaradmin.htm'
		}
	}
	$scope.isActive = function ( path ) {
        return $location.path() === path;
    }
}]);
var execution = angular.module( 'execution' , [ 'ngRoute'] );
execution.controller( 'cart' , ['$scope','$http','$location','cartSrv','token' ,'store','$routeParams',function($scope,$http,$location,cartSrv,token,store,$routeParams){
	$scope.login=token.iflogin();
	$scope.steps=$routeParams.step;
	$scope.cart=cartSrv.show();
	$scope.adresschused=getstoredata(store.get( 'adress' ));
	$scope.diiverchused=getstoredata(store.get( 'payment' ));
	$scope.setscuset=getstoredata(store.get( 'sent' ));
	$scope.errors=[];
	$scope.selected=true;
	$scope.adreesSelect=showchusedAdress(1);
	$scope.diiver = {
        name: getstoredata(store.get( 'payment' ))
    };
    $scope.sent = {
    	 name: getstoredata(store.get( 'sent' ))
    };
    $scope.errorspaymnetdiliver=false;
	countTotal();
	$scope.totalall=sumall();
	checkcart();
	getAdreess();
	function checkcart(){
		carterroes();
		if($location.path()!="/cart"){
			if($location.path()!="/execution/4"){
				faind_erros();	
			}				
		}
		if($location.path()=="/execution/order"){
			faind_erros();	
			makeOrderDB()
			window.location.href='#execution/4';
		}
	}
	function faind_erros(){
		cart=cartSrv.show() 
		$http.get( 'API/Loadproductsall/getproducts' ).success( function( data ){
			angular.forEach( data , function( item,key ){
				angular.forEach( cart , function( item,cartkey ){
					if(data[key].id_prod==cart[cartkey].id_prod){
						if(cart[cartkey].qty<data[key].stancount){
							if(cart[cartkey].qty>data[key].stancount){
								window.location.href='#/cart';
							}	
						}else if(cart[cartkey].qty>data[key].stancount){
							window.location.href='#/cart';
						}else if(cart[cartkey].qty==data[key].stancount){
							return false;
						}
					}
						
				});
			});
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	function faindInArray(value){
		var faind=false;
		angular.forEach( $scope.errors , function( item,key ){
			if($scope.errors[key].name==value){
				faind=true;
			}
		});
		return faind;
	}
	function getValueformarray(value,array){
		angular.forEach( array , function( item,key ){
			if(array[key].name==value){
				faind=$scope.errors[key];
			}
		});
		return faind;
	}
	function carterroes(){
		cart=cartSrv.show() 
		$http.get( 'API/Loadproductsall/getproducts' ).success( function( data ){
			angular.forEach( data , function( item,key ){
				angular.forEach( cart , function( item,cartkey ){
					if(data[key].id_prod==cart[cartkey].id_prod){
						if(data[key].stancount<cart[cartkey].qty || data[key].stancount==0){
							if(!faindInArray(data[key].name,$scope.errors)){
								$scope.errors.push(data[key]);
							}
						}
					}
				});
			});
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	function sumall(){
		var sent=0,
			diliver=0;
		switch($scope.diiverchused){
			case "reception":
				diliver=6;
			break;
			case "transfer":
				diliver=3;
			break;
		}
		switch($scope.setscuset){
			case "courier":
				sent=16;
			break;
			case "mail":
				sent=10;
			break;
		}
		return $scope.total+sent+diliver;

	}
	function countTotal(){
		$scope.total=0;
		cart=cartSrv.show() 
		angular.forEach( cart , function( item,key ){
			if(cart[key].promotion_stan=='no'){
				$scope.total+=cart[key].qty*cart[key].price
			}else if(cart[key].promotion_stan=='yes'){
				$scope.total+=cart[key].qty*cart[key].newprice
			}
		});
	}
	function getAdreess(){
		if($scope.login){
			var tokken=token.returntoken();
			$http.get( 'API/Users/getAdreessJasson?id='+tokken.id ).success( function( adressDB ){
				$scope.adress=adressDB;
			}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
			});
		}
	}
	function showchusedAdress(id){
		var chused=[];
		angular.forEach( $scope.adress , function( item,key ){
			if($scope.adress[key].id==id){
				$scope.adress[key].chiused='yes';
				chused.push($scope.adress[key]);
			}else{
				$scope.adress[key].chiused='no';
			}
		});
		$scope.adressstore=chused;
	}
	function getstoredata(isset){
		if(isset){
			return isset
		}else{
			return false;
		}
	}
	function makeOrderDB(){
		$http.post('API/Order/mageOrder/',{
 			order:$scope.cart,
 			token:token.returntoken(),
 			pursher:$scope.adresschused,
 			sent:$scope.setscuset,
 			diiverchused:$scope.diiverchused,
 			totalPrice:sumall()
 		}).success( function( orderDB ){
			console.log(orderDB);
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	$scope.confirmOreder=function(){
		window.location.href='#execution/order';
	}
	$scope.chusethispayment= function(sent,diiver){
		
		if(sent.name && diiver.name  ){
			$scope.errorspaymnetdiliver=false;
			store.set( 'payment' , diiver.name );
			store.set( 'sent' , sent.name );
			window.location.href = '#/execution/3';
			location.reload();
		}else if(!sent.name && !diiver.name  ){
			$scope.errorspaymnetdiliver=true;
		}
	}
	$scope.step = function(){
		if(cart.length){
			switch($routeParams.step){
				case "1":
					return 'viewsJS/executionstep1.htm'
				break;
				case "2":
					return 'viewsJS/executionstep2.htm'
				break;
				case "3":
					return 'viewsJS/executionstep3.htm'
				break;	
				case "4":
					store.remove( 'cart' );
					store.remove( 'payment' );
					store.remove( 'adress' );
					store.remove( 'sent' );
					return 'viewsJS/sumary.htm'
				break;
			}
		}else if(!cart.length && $routeParams.step!="4"){
			window.location.href='#cart';
		}
	}
	$scope.relizeOreder=function(){
		location.reload();
		window.location.href='#execution/1';
	}
	$scope.OrederOver=function(){
		cartSrv.empty();
		window.location.href='#allproducts';
	}
	$scope.hederlink= function(step){
		switch(step){
			case 1:
				window.location.href='#execution/1';
			break;
			case 2:

				if($scope.adresschused){
					window.location.href='#execution/2';
				}
			break;
			case 3:
				if($scope.diiverchused && $scope.setscuset && $scope.adresschused){
					window.location.href='#execution/3';
				}
			break;
		}
	}
	$scope.ifAdressChused = function(){
		return ifAdressChusednormal();
	}
	$scope.chusethis= function(){
		store.set( 'adress' , $scope.adressstore );
		window.location.href = '#/execution/2';
		location.reload();

	}
	$scope.showchusedAdressScope = function(id){
		return showchusedAdress(id);
	}
	$scope.adrees= function (){
		return 'viewsJS/executionNav.html';
	}
	$scope.isActive = function ( path ) {
        return $location.path() === path;
    }
	$scope.ifisinarray=function(value){
		return faindInArray(value);
	}
	$scope.remuve_item_form_cart = function(product){
		$scope.cart.splice( product , 1 );
		cartSrv.update( $scope.cart );
	}
	$scope.empty_cart= function (){
		cartSrv.empty();
	}
	$scope.set_qty= function (product,number){
		if(product.stancount>=number.qty){
			product.qty=number.qty;
		}else if(product.stancount<number.qty){
			if(!faindInArray(product.name)){
					$scope.errors.push(product);
			}	
		}

		countTotal()
	}
	$scope.$watch( function (){
		cartSrv.update( cartSrv.show());
	});
}]);
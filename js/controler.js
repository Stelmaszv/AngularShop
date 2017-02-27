var controllers = angular.module( 'mianPage' , [ 'ngRoute' , 'ngSanitize','myServices','filtrs'] );

 controllers.controller( 'index' , [ '$scope' , '$http','getURL','$interval',function( $scope , $http,getURL,$interval){
 	$scope.products=getURL.returnURL('API/Loadproductsall/getproducts');
 	$scope.slites=getURL.returnURL('JANSON/BANER.json');
 	$scope.baner={"src" : "baners/baner01.png","namber" : 1}
	$scope.actived_baner = function ( data ) {
		$scope.baner = data;
	}
}]);
controllers.controller( 'login' , ['$scope','$http' ,'$routeParams','store','getURL',function($scope,$http,$routeParams,store,getURL){
	 $scope.notice=$routeParams.notice;
	 $scope.title=$routeParams.title;
	 $scope.id=$routeParams.id;
	 $scope.errors=false;
	 $scope.submit=false;
	 $scope.galery=false;
	$scope.logIN = function(user){

 		$scope.submit=true;
 		$scope.title= false;
		$scope.notice= false;
		$scope.id= false;
 		$http.post('API/Registration/login/',{
 			login:user.login,
 			password:user.password
 		}).success( function( data ){
 	
				if(data!='error'){

					store.set( 'token' , data );
					 $scope.notice=$routeParams.notice;
	 				$scope.title=$routeParams.title;
	 				$scope.id=$routeParams.id;
					if($scope.id){
						if($scope.notice!='login'){
							location.reload();
							heder="#/product/show/"+$scope.id+"/"+$scope.title;				
							window.location.href = heder;
						}else{
							location.reload();
							window.location.href='';
						}
					}else{
						window.location.href='';
					}
				}else{
					$scope.errors = true;

				}
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	



	}
}]);
controllers.controller( 'registration' , ['$scope','$http','store',function($scope,$http,store){
	 $scope.ifavailable = false;
	 $scope.password= false;
	 $scope.errors=false;
	 $scope.submit=false;
	 $scope.checkavailable =function(user){
	 	$scope.errors=false;
	 	$http.post('API/Registration/checklogin/',{
	 		login:user.login
	 	}).success( function( error ){
				if(!error){
					 $scope.ifavailable = false;
				}else{
					 $scope.ifavailable = true;
				}
			}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	 }
	 $scope.checkpass = function(user){
	 	$scope.errors=false;
	 	if(user.password==user.reepedpassword){
	 		$scope.password = true;
	 	}else{
	 		$scope.password= false;
	 	}
	 }
	 $scope.create_user =function (user){
	 	$scope.submit=true;
	 	if($scope.ifavailable && $scope.password && user.email){
	 		$scope.errors =false;
		 	$http.post('API/Registration/create/',{
		 		login:user.login,
		 		email:user.email,
		 		password:user.password
		 	}).success( function( error ){
					window.location.href = "#login/login/login/"+user.login;
				}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
			});
		}else{
			$scope.errors =true;
		}
	 }

}]);
controllers.controller( 'viewID' , [ '$scope' , '$http' ,'$routeParams','token','cartSrv','getURL',function( $scope , $http,$routeParams,token,cartSrv,getURL){
	var id = $routeParams.id;
	var title=$routeParams.title;
	

	get_opinion();
	$scope.discription='';
	$scope.sent=false;
	$scope.opinion = {
		'value': ''
	}
	$scope.wishList = function(products){
		if(token.iflogin()){
			tokenID = token.returntoken();
			userID=tokenID.id;
			products[0].WLIST='tak';
			getURL.returnURL('API/WishList/upadate/'+products[0].id_prod+'/'+userID);

		}else{
			window.location.href = "#/login/list/"+products[0].id_prod+"/"+products[0].name;
		}
	}
	$scope.init = function(event){
		get_product(id);
		similar_products(title);
		
		get_galery(id);
		ronIforder(id);
	}
	$scope.add_to_cart =function(products){
		if(token.iflogin()){
			cartSrv.add(products[0]);
		}else{
			window.location.href = "#/login/buy/"+products[0].id_prod+"/"+products[0].name;
		}
	}
	$scope.chcekcart = function(products){
		value=false;
		angular.forEach( cartSrv.show() , function( item,key ){
			if(item.id_prod == products[0].id_prod){
				value=true;
			}
		});

		return value; 
	}
	$scope.sentOpinion= function(opinion){
		tokenID = token.returntoken();
			$http.post('API/Opinin/AddOpinion/',{
			    id:id,
				opinion:opinion,
				tokken:43
			}).success( function( opinion){

				$scope.faind=false;
				$scope.sent=true;
				get_opinion();
			}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
			});	  		 
	}
	function ronIforder(id){
		getURL.returnURL('API/Opinin/albletioapinion?id='+id);
		$scope.faind=false;
		$scope.sent=true;
			
	}


	function ronIforder(id){
		if(token.iflogin()){
			findIDorders(id);
		}else{
			$scope.faind=false;
		}
	}
	function iffableOpinion(id,user){
		$http.get('API/Opinin/albletioapinion?id='+id+'&&userID='+user).success( function( opinion){
				if(opinion=='no'){
					$scope.faind=true;
				}else{
					$scope.faind=false;
				}
		}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
		});
	}
	function findIDorders(id){
		tokenID = token.returntoken();
			$http.get( 'API/ShowOrders/fainInOrders?id='+id+'&&userID='+tokenID.id).success( function( faind){
					if(faind){
						iffableOpinion(id,tokenID.id);
					}else{
						$scope.faind=false;
					}
				}).error( function(){
				console.log( 'Błąd pobrania pliku json' );
			});
		
		
	}
	function get_opinion(){
		$scope.opinions=getURL.returnURL('API/Opinin/showwopinions?id='+id);
	}
	function get_galery(){
		$scope.galery=getURL.returnURL('API/Galery/showPhoto?id='+id);
	}
	function get_product(id){
		if(token.iflogin()){
			tokenID = token.returntoken();
			userID=tokenID.id;
		}else{
			userID=0;
		}
		$scope.products=getURL.returnURL('API/ProductsDitelsID/getresult?id='+id+'&&userid='+userID);
	}
	function similar_products(value){
		$scope.similarP=getURL.returnURL('API/ProductsDitels/fainsomilar?id='+id+'&&value='+value);
	
	}


	$scope.$watch( function (){
		 //canceler.resolve();
		cartSrv.update( cartSrv.show());
	});

}]);
controllers.controller( 'shearch' , [ '$scope' , '$http' ,'$routeParams','token','cartSrv','getURL',function( $scope , $http,$routeParams,token,cartSrv,getURL){
	$scope.type='normal';
	claer_scope();
	$scope.wishList = function(products){

		if(token.iflogin()){
			tokenID = token.returntoken();
			userID=tokenID.id;

			products.WLIST='tak';
			getURL.returnURL('API/WishList/upadate/'+products.id_prod+'/'+userID);

		}else{
			window.location.href = "#/login/list/"+products.id_prod+"/"+products.name;
		}
	}
	$scope.add_to_cart = function(product){
		if(token.iflogin()){
			cartSrv.add(product);
		}else{
			window.location.href = "#/login/buy/"+product.id_prod+"/"+product.name;
		}
	}
	$scope.init = function(){
		pages_insite(1);
		set_page(1);
		load_category();

	}
	function criteria_scope(){
		 $scope.catage = [];
	}
	
	
	$scope.chcekcart = function(products){
		value=false;
		angular.forEach( cartSrv.show() , function( item,key ){
			if(item.id_prod == products.id_prod){
				value=true;
			}
		});

		return value; 
	}
	$scope.prizeforfunction =function(value){
		if($scope.prizefor>0){
			if(!isNaN($scope.prizefor) && !isNaN($scope.prizefor)){
				$scope.prizefor=value
			}else{
				$scope.prizefor=0;
			}
		}else{
			$scope.prizefor=0;
		}
	}
	$scope.prizefunctiondo =function(value){
		if($scope.prizedo>0){
			if(!isNaN($scope.prizedo) && !isNaN($scope.prizefor)){
					$scope.prizedo=value;
			}else{
				$scope.prizedo=0;
			}
		}else{
			$scope.prizedo=0;
		}
	}
	$scope.serchbetwescope =function(){
		if($scope.prizedo>0){
			if(!isNaN($scope.prizedo) && !isNaN($scope.prizefor)){
				$scope.type='betwen';
				pages_insite(1);
				set_page(1);
				load_category();
			}else{
				$scope.type='normal';
				pages_insite(1);
				set_page(1);
				load_category();
			}
		}else{
			$scope.prizedo=0;
			$scope.type='normal';
			pages_insite(1);
			set_page(1);
			load_category();

		}
	}
	function check_routs(){
		if($routeParams.category==undefined && $routeParams.subbcategiry==undefined){
			$scope.categoryactual='';
			$scope.subcategoryactual='';
		}
		else if($routeParams.category!=undefined && $routeParams.subbcategiry!=undefined){
			$scope.categoryactual=$routeParams.category;
			$scope.subcategoryactual=$routeParams.subbcategiry;
		}
		else if($routeParams.category!=undefined && $routeParams.subbcategiry==undefined){
			$scope.categoryactual=$routeParams.category;
			$scope.subcategoryactual='';
		}
	}
	function claer_scope(){
		check_routs()
		$scope.keyword='';
		$scope.prizefor=0;
		$scope.prizedo=0;
	}
	$scope.set_category = function(name,id){	
		claer_scope();
		$scope.categoryactual=name;
		$scope.subcategoryactual='';
		this.id=1;
		sub_category(id);
		set_page(1)
		pages_insite(1);
	}
	$scope.set_subcategory= function(name){
		$scope.keyword='';
		$scope.subcategoryactual=name;
		this.id=1;
		set_page(1)
		pages_insite(1);

	}
	$scope.search_criteria= function(){
		var criteria= '';
		if($scope.categoryactual!=''){
			switch($scope.categoryactual){
				case 'Gry Konslowe':
					return 'search/navigation_consol.html';
				break;
				case 'zwierzaki':
					return 'search/navigation_a.html';
				break;
				case 'komputery':
					return 'search/navigation_computers.html';
				break;
			}
			
		}
	}
	$scope.search_scope= function(value){
		search(value);
	}
	$scope.loop= function(array){
		varreturn='';
		angular.forEach( array , function( order , key ){
			
			if(array[key]!=true && array[key]!=false ){
				varreturn+=' '+array[key];
			}
			//}
		});
		search(varreturn);
	}
	function search(value){
		if(value.length>2){
			$scope.keyword=value;
			pages_insite(1);
			set_page(1)	
		}else{
			if(value.length==0){
				$scope.keyword='';
				pages_insite(1);
				set_page(1)	
			}	
		}
	}

	function sub_category(id){
		$http.get( 'API/LoadSubCategory/getSubCategory?categoryID='+id+'' ).success( function( data ){
			if(data.length>0){
				$scope.subcategorys =data;
			}else{
				$scope.subcategorys='';
			}
		}).error( function(){
			console.log( 'Błąd pobrania pliku json' );
		});
	}
	function load_category(){
		$scope.category=getURL.returnURL('API/LoadCategory/all');
	}
	function pages_insite(page){
		this.id=page;
		if(token.iflogin()){
			tokken=token.returntoken();
			iduser=tokken.id;
		}else{
			iduser=0;
		}
		$scope.pages=getURL.returnURL('API/Pagenavigation/pages?page='+this.id+'&&type='+$scope.type+'&&catname='+$scope.categoryactual+'&&subcatname='+$scope.subcategoryactual+'&&keyword='+$scope.keyword+'&&for='+$scope.prizefor+'&&do='+$scope.prizedo+'&&userid='+iduser);
	}
	function set_page(id){
		this.id=id;
		pages_insite(id);
		if(token.iflogin()){
			tokken=token.returntoken();
			iduser=tokken.id;
		}else{
			iduser=0;
		}
		$scope.products=getURL.returnURL('API/Pagenavigation/showpage?page='+this.id+'&&type='+$scope.type+'&&catname='+$scope.categoryactual+'&&subcatname='+$scope.subcategoryactual+'&&keyword='+$scope.keyword+'&&for='+$scope.prizefor+'&&do='+$scope.prizedo+'&&userid='+iduser);
		
	}
	$scope.setpage_scope=function(id){
		set_page(id);		
	}
	$scope.$watch( function (){
		cartSrv.update( cartSrv.show());
	});
}]);




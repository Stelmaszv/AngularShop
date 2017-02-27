var myServices = angular.module( 'myServices' , [] );
myServices.service( 'cartSrv' , [ 'store' , function( store ) {
        if ( store.get( 'cart' ) ){
            var cart = store.get( 'cart' );
        }else{
            var cart = [];
        }
        this.add = function ( product) {
            product.qty = 1 ;
            cart.push( product );
        }
        this.show = function () {
            return cart;
        }
        this.update = function ( newCart ) {
            store.set( 'cart' , newCart );
        };
        this.empty = function () {
            store.remove( 'cart' );
            cart.length = 0;
         };
}]);
myServices.service( 'getURL' , ['$http',function($http) {
    this.returnURL = function (url) {
        var arrayurl =[];
            $http.get(url).success( function( data ){
                 angular.forEach(data , function( item,key ){
                          arrayurl.push(data[key])
                 });
            }).error( function(){
                console.log( 'Błąd pobrania pliku json' );
            });
            return arrayurl;
    };
    this.Post= function(url,dataform){
          var arrayurl =[];
        $http.post(url,dataform).success( function( data ){
            angular.forEach(data , function( item,key ){
                arrayurl.push(data)

             });
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });

        return arrayurl;
    }
}]);  
myServices.service( 'validate' , [ function( ) {
    this.phonNumber= function(value){
            if(!isNaN(value)){
                if(value>999999999 || value<100000000){
                    return false;
                }else{
                    return true;
                }
            }else{
                return false;
            }
 
    }
}]);    
myServices.service( 'token' , [ 'store' , 'jwtHelper' , function( store , jwtHelper ) {
    var token = store.get( 'token' );
    this.returnonlytoken =function(){
        return token;
    }
    this.returntoken =function (){
        return jwtHelper.decodeToken(token);
    }
    this.iflogin = function () {
        if(token){           
            return true;
        }else{
            return false;
        }
    }
    this.del = function () {
        store.remove( 'token' );
    };
    this.isAdmin = function () {
        if(this.iflogin()){
            decodetokken=this.returntoken();
            if(decodetokken.role=='admin'){
                return true;
            }else{
                 return false;
            }
        }else{
            return false;
        }
    };
}]);
myServices.service( 'Active' , [ '$location' ,   function( $location) {
    this.isActive = function (path){
        return $location.path() === path;
    }
}]);
var controllersNavigation = angular.module( 'Navigation' , [] );
controllersNavigation.controller( 'navigation' , [ '$scope' , '$location','token','cartSrv',function( $scope , $location,token,cartSrv){
    $scope.cart=cartSrv.show();
    $scope.admin=token.isAdmin();
    $scope.login=token.iflogin();
    $scope.isActive = function ( path ) {
        return $location.path() === path;
    }
    $scope.correntlocation = function(){
        return $location.path();
    }
    $scope.logOUT = function(){
        token.del();
        window.location.href = "";
    }
}]);    

var view = angular.module("myApp", ["ngRoute","mianPage","Navigation","myServices","angular-storage","angular-jwt","execution","mianSetings","admin"]);
view.config(function($routeProvider) {
    $routeProvider.when("/showUserAdmin/:id", {
        controller : 'showUserAdmin',
        templateUrl : "viewsJS/showUserAdmin.htm"
    })
    $routeProvider.when("/index", {
    	controller : 'index',
        templateUrl : "viewsJS/start.htm"
    })
     $routeProvider.when("/shoowadressID/:id", {
        controller : 'shoowadressID',
        templateUrl : "viewsJS/addadressIDshow.htm"
    })
        $routeProvider.when("/addresseEition/:id", {
        controller : 'shoowadressID',
        templateUrl : "viewsJS/editionAdress.htm"
    })
     $routeProvider.when("/showOrder/:id", {
        controller : 'ShowOrder',
        templateUrl : "viewsJS/showOrder.htm"
    })
      $routeProvider.when("/showOrderAdmin/:id", {
        controller : 'showOrderAdmin',
        templateUrl : "viewsJS/showOrderAmin.htm"
      })
    $routeProvider.when("/cart", {
        controller : 'cart',
        templateUrl : "viewsJS/cart.htm"
    })
    $routeProvider.when("/addadress", {
        controller : 'addadress',
        templateUrl : "viewsJS/addadress.htm"
    })
     $routeProvider.when("/execution/:step", {
        controller : 'cart',
        templateUrl : "viewsJS/stepnavigation.htm"
    })
    $routeProvider.when("/setProfil/:place", {
        controller : 'setProfil',
        templateUrl : "viewsJS/setProfil.htm"
    })
     $routeProvider.when("/allproducts", {
        controller : 'shearch',
        templateUrl : "viewsJS/allproducts.htm"
    })
    $routeProvider.when("/allproducts/:category", {
        controller : 'shearch',
        templateUrl : "viewsJS/allproducts.htm"
    })
      $routeProvider.when("/allproducts/:category/:subbcategiry", {
        controller : 'shearch',
        templateUrl : "viewsJS/allproducts.htm"
    })
    $routeProvider.when("/product/showEdit/:id/:title", {
        controller : 'viewIDAdmin',
        templateUrl : "viewsJS/viewProductAdmin.htm"
    })
     $routeProvider.when("/product/show/:id/:title", {
        controller : 'viewID',
        templateUrl : "viewsJS/viewProduct.htm"
    })
    $routeProvider.when("/login/:notice/:id/:title", {
        controller : 'login',
        templateUrl : "viewsJS/login.htm"
    })
    $routeProvider.when("/login", {
        controller : 'login',
        templateUrl : "viewsJS/login.htm"
    })
     $routeProvider.when("/registration", {
        controller : 'registration',
        templateUrl : "viewsJS/registration.htm"
    })
     $routeProvider.when("/adminsection/:action", {
        controller : 'admin',
        templateUrl : "viewsJS/adminNavbar.htm"
    })
    $routeProvider.otherwise({
        redirectTo: '/index'
    });
});
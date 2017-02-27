var controllers = angular.module( 'mianPage' , [ 'ngRoute' ] );

	

controllers.controller( 'index' , [ '$scope' , '$http', function( $scope , $http){
	$http.get( 'JANSON/pruducts.json' ).
	success( function( data ){
		$scope.products = data;
		$scope.products_loop=1;
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});
	$http.get( 'JANSON/BANER.json' ).
	success( function( data ){
		$scope.slites = data;
		$scope.baner = data[0];
	}).error( function(){
		console.log( 'Błąd pobrania pliku json' );
	});
	$scope.actived_baner = function ( data ) {
		$scope.baner = data;
	}

}]);

var admin = angular.module( 'admin' , [ 'ngRoute','filtrs','ngSanitize','angularFileUpload','myDirectives'] );
admin.controller( 'admin' , [ '$scope' , '$http','getURL','Active','$routeParams','$filter','token',function( $scope , $http,getURL,Active,$routeParams,$filter,token){
    tokken=token.returntoken();
	$scope.products=getURL.returnURL('API/Loadproductsall/getproducts');
	$scope.users=getURL.returnURL('API/Users/showUserss');
    $scope.oders=getURL.returnURL('API/ShowOrders/showAdminOrders');
    $scope.category=getURL.returnURL('API/LoadCategory/all');

    arraycategory();
    function arraycategory(){

        $http.get('API/LoadCategory/showArray').success( function( ordersDB ){
               $scope.categoryArray=ordersDB;
                var  id=0;
                angular.forEach( $scope.categoryArray , function( order , key ){
                    
                       var parsed = JSON.parse( order.subcategory );
                       $scope.categoryArray[key].id=id;
                       $scope.categoryArray[key].items = parsed;
                       var subid=0
                       angular.forEach( $scope.categoryArray[key].items , function( order2 , key ){
                            order2.id=subid
                            order2.mianid=id;
                            subid++;
                       });
                      
                      
                    id++;
               });


        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }
    bilans();
    $scope.editon ={
                    'name'            :'',
                    'description_info':'',
                    'disrption'       :'',
                    'number'          :'',
                    'id_subcategory'  :'',
                    'catname'         :'',
                    'id_category'     :'',
                    'subname'         :'',
                    'TAG'             :''
 
                }

    function bilans(){

        $http.get('API/Bilans/product').success( function( ordersDB ){
               $scope.bilans=ordersDB;
                angular.forEach( $scope.bilans , function( order , key ){
                     var parsed = JSON.parse( order.data );
                     $scope.bilans[key].items = parsed;
               });

        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }
    $scope.changecatname= function (arrray,$index){

        console.log($scope.categoryArray);
       var falue=  confirm('Czy chesz usnac kategorie '+$scope.categoryArray[$index].name+'')
            if(falue==false){
                var nevvalue= prompt('Podaj Nazwe kategori:', $scope.categoryArray[$index].name);
                if(nevvalue!=null){
                    $scope.categoryArray[$index].name=nevvalue;
                    getURL.Post( 'API/LoadCategory/change',{
                        id:$scope.categoryArray[ $index].idsql,
                        type:'mian',
                        name:nevvalue,
                        tokken:tokken
                    });
                    
                }
            }else{
           

                $http.post('API/LoadCategory/delete',{
                id:$scope.categoryArray[ $index].idsql,
                type:'mian',
                tokken:tokken
                }).success( function( error ){
                    if(!error){
                       $scope.categoryArray.splice( $index , 1 );
                    }else{
                        alert(error)
                    }
                }).error( function(){
                    console.log( 'Błąd pobrania pliku json' );
                });


            }
        
    }
    $scope.saveChanges= function (){
       getURL.Post( 'API/LoadCategory/updateCategory',{
            array: $scope.categoryArray
        });
    }
    $scope.addnewcategory= function (){
        var nevvalue= prompt('Podaj Nazwe kategori:','');
                if(nevvalue!=null){

                    $scope.categoryArray.push(
                        {
                            'id':$scope.categoryArray.length,
                            'name':nevvalue,
                            'subcategory':"[]",
                            'items':[]
                        }


                    );
                    getURL.Post( 'API/LoadCategory/addcategoty',{
                        id:$scope.categoryArray.length,
                        type:'mian',
                        name:nevvalue,
                        tokken:tokken
                    });
                }
    }
    $scope.addsubcategory= function (array){

        var nevvalue= prompt('Podaj Nazwe Podkategori:', '');
        if(nevvalue!=null){
             $scope.categoryArray[array.id].items.push(
                {
                 'id':$scope.categoryArray[array.id].items.length,
                 'mianid':array.id,
                 'subname':nevvalue,
                 'check':false
                }
            );
             getURL.Post( 'API/LoadCategory/addcategoty',{
                        id:$scope.categoryArray[array.id].idsql,
                        type:'sub',
                        name:nevvalue,
                        tokken:tokken
            });
        }
    }
    $scope.changesubcatname = function (arrray,$index){
     var falue=  confirm('Czy chesz usnac Podkategorie '+arrray.subname+'')
        if(falue==false){
            var nevvalue= prompt('Podaj Nazwe Podkategori:', arrray.subname);

            if(nevvalue!=null){

                $scope.categoryArray[arrray.mianid].items[arrray.id].subname=nevvalue;
                    getURL.Post( 'API/LoadCategory/change',{
                        id:$scope.categoryArray[arrray.mianid].items[arrray.id].idsql,
                        type:'sub',
                        name:nevvalue,
                        tokken:tokken
                    });
            }
        }else{
            $http.post('API/LoadCategory/delete',{
                id:$scope.categoryArray[arrray.mianid].items[arrray.id].idsql,
                type:'sub',
                tokken:tokken
            }).success( function( error ){
                if(!error){
                    $scope.categoryArray[arrray.mianid].items.splice( arrray.id , 1 );
                }else{
                    alert(error)
                }
            }).error( function(){
                console.log( 'Błąd pobrania pliku json' );
            });
        }
        

        
    }
    $scope.changesubcat = function (ID){

        $scope.subcategory=getURL.returnURL('API/LoadSubCategory/getSubCategory?categoryID='+ID);
        $scope.editon.id_subcategory=0;
        $http.get('API/LoadCategory/returnCatID/'+ID).success( function( ordersDB ){
            $scope.editon.catname=ordersDB[0];
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
           
    }
    $scope.deltesubcategory = function(array){
        getURL.Post( 'API/LoadCategory/updateCategory',{
            array: $scope.categoryArray
        });
    }
    $scope.save= function(editon){
       if($scope.editon.id_subcategory>0){
            getURL.Post( 'API/ProductsDitelsIDAdmin/addProduct',{
                        name                  : editon.name,
                        description_info      : editon.description_info,
                        disrption             : editon.disrption,
                        price                 : editon.number,
                        tokken                : tokken,
                        id_category           : editon.id_subcategory,
                        id_subcategory        : editon.id_category,
                        TAG                   : editon.TAG
            });
            
            $scope.submitSAVE=true; 
        }else{
            alert('Nie wybrano pod podkategori');
        }
    }
    $scope.changesetcategory = function (ID){
        $http.get('API/LoadSubCategory/returnIDsubcategory/'+ID).success( function( ordersDB ){
            $scope.editon.subname=ordersDB[0];
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
       
    }
	$scope.navbaradmin= function (){
		return 'viewsJS/navBaradmin.htm'
	}
	$scope.isActive = function ( path ) {
        return Active.isActive(path);
    }

    $scope.MianView = function(){
    	switch($routeParams.action){
    		case 'users':
    			return 'viewsJS/users.htm';
    		break;
    		case 'products':
    			return 'viewsJS/productsAdmin.htm';
    		break;
    		case 'balance':
    			return 'viewsJS/balance.htm';
    		break;
    		case 'orders':
    			return 'viewsJS/ordersAdmins.htm';
    		break;
            case 'addproduct':
                return 'viewsJS/addproduct.htm';
            break;
            case 'category':
                return 'viewsJS/category.htm';
            break;
    	}	
    }
}]);
admin.controller( 'showOrderAdmin' , [ '$scope' , '$http','getURL','Active','$routeParams','token',function( $scope , $http,getURL,Active,$routeParams,token){
    tokken=token.returntoken();
    $scope.orders=getURL.returnURL( 'API/ShowOrders/ShowUserOrder?id='+tokken.id);
    $scope.adressID=getURL.returnURL( 'API/ShowOrders/showAdressID?id='+$routeParams.id);
    get_order();
    $scope.changestaus=function(orders){

       
            getURL.Post( 'API/ShowOrders/updateStatus',{
                id:$routeParams.id,
                tokken:tokken,
                stan:orders[0].stan
            });
            get_order();
        
    }
    $scope.navbaradmin= function (){
        return 'viewsJS/navBaradmin.htm'
    }
    function get_order(){
        $http.get( 'API/ShowOrders/showOrder?id='+$routeParams.id).success( function( ordersDB ){
                $scope.orders=ordersDB;
                angular.forEach( $scope.orders , function( order , key ){
                    var parsed = JSON.parse( order.pruducts );
                    $scope.orders[key].items = parsed;
                });

        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }
}]);
admin.controller( 'showUserAdmin' , [ '$scope' , '$http','getURL','Active','$routeParams','token',function( $scope , $http,getURL,Active,$routeParams,token){
    tokken=token.returntoken();
    $scope.user=getURL.returnURL( 'API/Users/showUserDitels?id='+$routeParams.id);
    $scope.address=getURL.returnURL( 'API/ShowAdress/showAdress?id='+$routeParams.id);
    $scope.Opinions=getURL.returnURL( 'API/Opinin/showwopinionsUser?id='+$routeParams.id);
    $scope.Ordres=getURL.returnURL( 'API/ShowOrders/ShowUserOrder?id='+$routeParams.id);
    $scope.activeDIV='UserInfo';
    $scope.navbaradmin= function (){
        return 'viewsJS/navBaradmin.htm'
    }
    $scope.set= function (value){
        $scope.activeDIV=value;
    }
    $scope.isActiveDiv= function(value){
        return $scope.activeDIV==value
    }
    $scope.changepermissions= function(value){
        getURL.Post( 'API/Users/changepermissions',{
                id:$routeParams.id,
                tokken:tokken,
                value:value
        });
        $scope.user=getURL.returnURL( 'API/Users/showUserDitels?id='+$routeParams.id);
    }
    $scope.ban= function(value){
        getURL.Post( 'API/Users/Setban',{
                id:$routeParams.id,
                tokken:tokken,
                value:value
        });
        $scope.user=getURL.returnURL( 'API/Users/showUserDitels?id='+$routeParams.id);
    }
}]);
admin.controller( 'viewIDAdmin' , [ '$scope' , '$http','getURL','Active','$routeParams','token','FileUploader',function( $scope , $http,getURL,Active,$routeParams,token,FileUploader){
    tokken=token.returntoken();
    $scope.activeDIV='Edit';
    $scope.price=0;
    $scope.qty=0;
    $scope.submit=false;
    $scope.submitPromotion=false;
    $scope.submitSAVE=false; 
    $scope.availability=0;
    $scope.procentpromo=40;
    $scope.diliver = {
        'price': 0,
        'qty':1 

    }
        var uploader = $scope.uploader = new FileUploader({
        url: 'API/Images/upload/' + $routeParams.id
    });

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.galery=getURL.returnURL('API/Galery/showPhoto?id='+$routeParams.id);
    };
    $scope.changeAvatar = function ( imageName){
         var text = 'Czy napewno chesz ustawic to zdjęcie jako avatar ?';
         $kom= confirm(text);
         if($kom==true ){
                $scope.product[0].photo=imageName;
                getURL.Post( 'API/Images/setAvatar/',{
                    id : $routeParams.id,
                    image : imageName
                });
         }
    }
    $scope.delImage = function ( imageName , $index,avatar) {
        var text = 'Czy napewno chesz usunąc to zdjęcie ?';
        $kom= confirm(text);
        if($kom==true && imageName!=avatar[0].photo ){
            $scope.galery.splice( $index , 1 );


            getURL.Post( 'API/Images/delete/',{
                    id : $routeParams.id,
                    image : imageName
            });
        }else if(imageName==avatar[0].photo){
            alert('nie mozna usnaąć zdjęcia głuwnego ')
        }
    };
    setEdition();
    bilansproduct()
    $scope.category=getURL.returnURL('API/LoadCategory/all');

    $scope.product=getURL.returnURL('API/ProductsDitelsID/getresult?id='+$routeParams.id);
    $scope.opinions=getURL.returnURL('API/Opinin/showwopinionsAdmin?id='+$routeParams.id);
    $scope.galery=getURL.returnURL('API/Galery/showPhoto?id='+$routeParams.id);
    function setEdition(){
         $http.get('API/ProductsDitelsID/getresult?id='+$routeParams.id).success( function( ordersDB ){


                $scope.editon ={
                    'name'            :ordersDB[0].name,
                    'description_info':ordersDB[0].description_info,
                    'disrption'       :ordersDB[0].disrption,
                    'number'          :ordersDB[0].price*1,
                    'id_subcategory'  :ordersDB[0].id_subcategory,
                    'catname'         :ordersDB[0].catname,
                    'id_category'     :ordersDB[0].id_category,
                    'subname'         :ordersDB[0].subname,
                    'TAG'             :ordersDB[0].TAG
 
                }
                $scope.subcategory=getURL.returnURL('API/LoadSubCategory/getSubCategory?categoryID='+ordersDB[0].id_category);
             console.log(ordersDB[0].id_subcategory)   
              console.log(ordersDB[0].id_category)   
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }
     $scope.editionSave = function(editon){
        if($scope.editon.id_subcategory>0){
            getURL.Post( 'API/ProductsDitelsIDAdmin/Edition',{
                        id                    : $routeParams.id,
                        name                  : editon.name,
                        description_info      : editon.description_info,
                        disrption             : editon.disrption,
                        price                 : editon.number,
                        tokken                : tokken,
                        id_category           : editon.id_category,
                        id_subcategory        : editon.id_subcategory,
                        TAG                   : editon.TAG
            });
            
            $scope.submitSAVE=true; 
        }else{
            alert('Nie wybrano pod podkategori');
        }
    }
    function bilansproduct(){
        $http.get('API/Bilans/product?id='+$routeParams.id).success( function( ordersDB ){
               $scope.bilansproduct=ordersDB;
                angular.forEach( $scope.bilansproduct , function( order , key ){
                     var parsed = JSON.parse( order.data );
                     $scope.bilansproduct[key].items = parsed;
               });

        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
    }
    $scope.changesubcat = function (ID){

        $scope.subcategory=getURL.returnURL('API/LoadSubCategory/getSubCategory?categoryID='+ID);
        $scope.editon.id_subcategory=0;
        $http.get('API/LoadCategory/returnCatID/'+ID).success( function( ordersDB ){
            $scope.editon.catname=ordersDB[0];
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
           
    }
    $scope.changesetcategory = function (ID){
        $http.get('API/LoadSubCategory/returnIDsubcategory/'+ID).success( function( ordersDB ){
            $scope.editon.subname=ordersDB[0];
        }).error( function(){
            console.log( 'Błąd pobrania pliku json' );
        });
       
    }
    $scope.changePromotin = function(price,procent){
        $scope.product[0].procentptomo=procent;
        procent=Math.round(price*procent/100);
        $price=$scope.product[0].price
        $scope.product[0].newprice=$price-procent;


    }
    $scope.setPromotion = function (){
         getURL.Post( 'API/ProductsDitelsIDAdmin/setPromotion',{
                    id:$routeParams.id,
                    tokken:tokken,
                    nev: $scope.product[0].newprice,
                    procent:$scope.product[0].procentptomo
        });
        $scope.submitPromotion=true; 
    }
    $scope.changeavailability= function (value){
       getURL.Post( 'API/ProductsDitelsIDAdmin/changeavailability',{
                    id:$routeParams.id,
                    tokken:tokken,
                    value:value
        });
       $scope.product=getURL.returnURL('API/ProductsDitelsID/getresult?id='+$routeParams.id);
    }
    $scope.navbaradmin= function (){
        return 'viewsJS/navBaradmin.htm'
    }
    $scope.set= function (value){
        $scope.activeDIV=value;
    }
    $scope.isActiveDiv= function(value){
        return $scope.activeDIV==value
    }
    $scope.adddiliver= function (diliver){  
        if(diliver.price>0 && diliver.qty>0){
            $scope.submit=true;
            getURL.Post( 'API/ProductsDitelsIDAdmin/adddiliver',{
                    id:$routeParams.id,
                    tokken:tokken,
                    price:diliver.price,
                    qty:diliver.qty,
            });
            $scope.product=getURL.returnURL('API/ProductsDitelsID/getresult?id='+$routeParams.id);
        }else{
            alert('nie poprawne dane')
        }
    }
    $scope.submit_set = function(){
        $scope.submit=false;
    }
    $scope.promotion_set = function(){
        $scope.submitPromotion=false;
    }
    $scope.deleteOpinion = function (opinion){
       if(opinion.banOpinion==0){
            var ban=1;
            var text='Czy napewno chcesz zbanowc ten komentarz ?';
       }else{
            var ban=0;
            var text='Czy napewno chcesz Odbanowac ten komentarz ?';
       }

       $kom= confirm(text);
       if($kom==true){
             getURL.Post( 'API/Opinin/OpinionBan',{
                    id:opinion.id_opinon,
                    ban:ban,
                    tokken:tokken
            });
            opinion.banOpinion= ban ;
       }
     
    }
}]);

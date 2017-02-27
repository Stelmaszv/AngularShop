var filtrs = angular.module( 'filtrs' , [] );
filtrs.filter('timestampToDate', function () {
    return function (timestamp) {
        var date = new Date(timestamp);
        date.getFullYear();
        date.getMonth();
        mount=getmount(date.getMonth());
        day=date.getDate();
        year= date.getFullYear()
        time='dnia '+day+' '+mount+' '+year+' roku'; 
        return time;
    };
    function getmount(munts){
    	var mies='';
		switch(munts){
				case 0:
					mies='Styczńa';
				break;
				case 1:
					mies='lutego';
				break;
				case 2:
					mies='marca';
				break;
				case 3:
					mies='kwietnia';
				break;
				case 4:
					mies='maja';
				break;
				case 5:
					mies='czerwca';
				break;
				case 6:
					mies='lipieca';
				break;
				case 7:
					mies='serpienia';
				break;
				case 8:
					mies='września';
				break;
				case 9:
					mies='pazdernika';
				break;
				case 10:
					mies='listopada';
				break;
				case 11:
					mies='grudnia';
				break;	
		}
	return mies;
	}
});
filtrs.filter('letestAdd', function () {
    return function (timestamp) {
    	var today = new Date();
    	todayday= today.getDate();
    	
    	var date = new Date(timestamp);
    	day=date.getDate();

    	if(date.getFullYear() == today.getFullYear() && date.getMonth()==today.getMonth()){
    		max=day+7;
    		if(todayday>=day && todayday<=max){
    			return true;
    		}
    	}
      
    };

});
filtrs.filter('converttoMount', function () {
    return function (mount) {
     	return getmount(mount);
    };
    function getmount(munts){
    	var mies='';
		switch(munts){
				case '01':
					mies='Styczeń';
				break;
				case '02':
					mies='Luty';
				break;
				case '03':
					mies='Marzec';
				break;
				case '04':
					mies='Kwiecień';
				break;
				case '05':
					mies='Maj';
				break;
				case '06':
					mies='Czerwca';
				break;
				case '07':
					mies='Lipiec';
				break;
				case '08':
					mies='Sierpień';
				break;
				case '09':
					mies='Wrzesień';
				break;
				case '10':
					mies='Październik';
				break;
				case '11':
					mies='listopad';
				break;
				case '12':
					mies='Grudzień';
				break;	
		}
	return mies;
	}

});
filtrs.filter('srortstring', function () {
    return function (mount) {
    	if(mount.length<15){
    		varlue=mount
    	}else{
    		varlue=returnsrotversion(mount);
    	}
     	return varlue;
    };
    function returnsrotversion(mount){
    	mount=mount.substring(0,15);
    	mount+='...'
    	return mount;
    }
   

});


angular.module('crudApp')
.factory('getPageFactory', ['$window' , '$http' , '$q' , function(win,$http,$q){
	return function(pageno){
		console.log("pageno ---->"+pageno);
		pageno = pageno-1;
		var deferred = $q.defer();
	 	$http.get("http://localhost:3000/people?_start="+(pageno*10)+"&_end="+(pageno*10)+9).then(function(response) {
	 		deferred.resolve(response);
	    });
	    return(deferred.promise);
	};
}]);
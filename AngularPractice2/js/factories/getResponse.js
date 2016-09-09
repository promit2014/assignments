angular.module('OmdbSearch')
.factory('getResponse', ['$window' , '$http' , '$q' , function(win,$http,$q){
	return function(movie){
		var deferred = $q.defer();
	 	$http.get("http://www.omdbapi.com/?s="+movie).then(function(response) {
	 		deferred.resolve(response.data);
	    });
	    return(deferred.promise);
	};
}]);
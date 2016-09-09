angular.module('OmdbSearch')
.factory('getMovieDetails', ['$window' , '$http' , '$q' , function(win,$http,$q){
	return function(movieId){
		var deferred = $q.defer();
	 	$http.get("http://www.omdbapi.com/?i="+movieId+"&plot=full").then(function(response) {
	 		deferred.resolve(response.data);
	    });
	    return(deferred.promise);
	};
}]);
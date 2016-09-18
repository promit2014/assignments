angular.module('crudApp')
.factory('deleteRecordFactory', ['$window' , '$http' , '$q' , function(win,$http,$q){
	return function(id){
		console.log("id to delete ---->"+id);
		var deferred = $q.defer();
	 	$http.delete("http://localhost:3000/people/"+id).then(function(response) {
	 		deferred.resolve(response);
	    });
	    return(deferred.promise);
	};
}]);
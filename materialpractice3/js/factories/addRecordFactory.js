angular.module('crudApp')
.factory('addRecordFactory', ['$window' , '$http' , '$q' , function(win,$http,$q){
	return function(data){

		console.log("data to insert ---->"+data);

		var deferred = $q.defer();

	 	var req = {
			method: 'POST',
			url: 'http://localhost:3000/people',
			headers: {
				'Content-Type': 'application/json'
			},
			data: data
		}

		$http(req).then(function(response){
			deferred.resolve(response.data);
		});

	    return(deferred.promise);
	};
}]);
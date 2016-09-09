//Referencing the angular module or accessing the reference of the angular module
angular.module('OmdbSearch')
.controller('searcher',[ '$scope' ,'$routeParams', 'getResponse' , 'getMovieDetails' , function($scope , $routeParams, getResponse , getMovieDetails) {

	var promise = getResponse($scope.movie);

	$scope.loading = true ; 
	$scope.error = false;
	
	promise.then(function(result){
		$scope.results = result.Search;
		if(result.Response=="False"){
			$scope.error = true;
			$scope.errMsg = result.Error;
		}
		$scope.loading = false;
	});

}]);


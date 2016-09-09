//Referencing the angular module or accessing the reference of the angular module
angular.module('OmdbSearch')
.controller('searcher',[ '$scope' ,'$window', 'getResponse' , 'getMovieDetails' , function($scope , $window , getResponse , getMovieDetails) {
	$scope.movie= "";
	$scope.response = function(movie){
		var promise = getResponse($scope.movie);
		$scope.error = false;
		promise.then(function(result){
			$scope.results = result.Search;
			if(result.Response=="False"){
				$scope.error = true;
				$scope.errMsg = result.Error;
			}
		});
	};

	$scope.getDetails = function(movieID){
		//var movieID = $routeParams.movieID;
		
		var promise = getMovieDetails(movieID);
		promise.then(function(result){
			$scope.movieDetails = result;
			console.log("exposing ---- "+$scope.movieDetails.Title);
			$window.location.href= "#/details";
		});
		console.log(movieID);
	};

}]);


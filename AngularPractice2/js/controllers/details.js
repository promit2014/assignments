//Referencing the angular module or accessing the reference of the angular module
angular.module('OmdbSearch')
.controller('details',[ '$scope' ,'$routeParams', 'getMovieDetails' , function($scope , $routeParams , getMovieDetails) {

	$scope.loading = true ;
	var promise = getMovieDetails($routeParams.movieID);

	promise.then(function(result){
		$scope.result = result;
		$scope.loading = false ;
	});

	$scope.VoteStringCreator = function(votes){
		return votes.split(',')[0]+" | "+votes.split(',')[1];
	}

}]);


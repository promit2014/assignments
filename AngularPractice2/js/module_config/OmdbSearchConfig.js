angular.module('OmdbSearch').config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/search/:title",{
		templateUrl : "results.html",
		controller : "searcher"
	}).when("/details/:movieID",{
		templateUrl : "details.html",
		controller : "details"
	});
}]);
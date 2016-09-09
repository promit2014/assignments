angular.module('OmdbSearch').config(['$routeProvider',function($routeProvider) {
	$routeProvider
	.when("/",{
		templateUrl : "results.html",
		controller : "searcher"
	}).when("/details",{
		templateUrl : "details.html",
		controller : "searcher",
	});
}]);
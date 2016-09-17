angular.module('crudApp').controller('resultsController', ['$scope', 'getPageFactory' , function($scope , getPageFactory) {
	//console.log("$scope.$parent.pageno BEFORE--->"+$scope.$parent.pageno);
	if(($scope.$parent.pageno != 1) &&($scope.$parent.pageno != undefined)){
		$scope.pageno = $scope.$parent.pageno;
		$scope.current_page = $scope.$parent.pageno;
	}else{
		$scope.pageno = 1;
	}
	$scope.$parent.total_count = 0;
	$scope.$parent.itemsPerPage = 10; 
	$scope.getData = function(pageno){
		$scope.$parent.pageno = pageno;
		var promise = getPageFactory(pageno);
		promise.then(function(response){
			$scope.$parent.total_count = parseInt(response.headers('X-Total-Count'));
			$scope.results = response.data;
			console.log("total --->"+$scope.$parent.total_count);
			console.log("$scope.$parent.pageno --->"+$scope.$parent.pageno);
		});
	};

	$scope.getData($scope.pageno);
}]);
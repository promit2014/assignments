angular.module('crudApp').controller('addController', ['$scope' , 'addRecordFactory' , '$mdToast' , '$document' , function($scope , addRecordFactory , $mdToast , $document) {

	$scope.originForm = angular.copy($scope.project);

	var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };


  	$scope.toastPosition = angular.extend({},last);

	$scope.getToastPosition = function() {
	    sanitizePosition();

	    return Object.keys($scope.toastPosition)
	      .filter(function(pos) { return $scope.toastPosition[pos]; })
	      .join(' ');
  	};

	function sanitizePosition() {
		var current = $scope.toastPosition;

		if ( current.bottom && last.top ) current.top = false;
		if ( current.top && last.bottom ) current.bottom = false;
		if ( current.right && last.left ) current.left = false;
		if ( current.left && last.right ) current.right = false;

		last = angular.extend({},current);
	}

    var showSimpleToast = function(name) {
	    var pinTo = $scope.getToastPosition();

	    $mdToast.show(
	      $mdToast.simple()
	        .textContent('Data For '+name+' Added Successfully')
	        .position(pinTo )
	        .hideDelay(3000)
	        .theme('error-toast')
	    );
  	};

	$scope.addData = function(data){
		var promise = addRecordFactory(data);
		promise.then(function(response){
			
			//confirmation in toast
			showSimpleToast(response.name);

			//reset the form after the addition
			$scope.project = angular.copy($scope.originForm); // Assign clear state to modified form 
		    $scope.projectForm.$setPristine();
		    $scope.projectForm.$setUntouched();

		});
	};


}]);
	
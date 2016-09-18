angular.module('crudApp').controller('resultsController', ['$scope', 'getPageFactory' , '$mdMedia' , '$mdDialog' , 'deleteRecordFactory' , '$mdToast' , function($scope , getPageFactory , $mdMedia , $mdDialog , deleteRecordFactory , $mdToast) {
	
	//size setter based on which the font is changed
	$scope.sizesetter = false;

	//watching for change in screen sizein order to manipulate font based on screen size
	$scope.$watch(function () { 
		$scope.sizesetter = $mdMedia('md') ; 
	});
	
	//======================Toast Declaration for Delete alert ===============================

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
	        .textContent('Data For '+name+' Deleted Successfully')
	        .position(pinTo )
	        .hideDelay(3000)
	    );
  	};

	//======================Toast Declaration ends ===========================================


	//setting the current page number from parent scope as user may come back to the view from any other view
	if(($scope.$parent.pageno != 1) &&($scope.$parent.pageno != undefined)){
		$scope.pageno = $scope.$parent.pageno;
		$scope.current_page = $scope.$parent.pageno;
	}else{
		$scope.pageno = 1;
	}

	$scope.$parent.total_count = 0;
	$scope.$parent.itemsPerPage = 10; 


	//getData is responsible for fetching the data via factory and populating the list
	$scope.getData = function(pageno){
		$scope.$parent.pageno = pageno;
		var promise = getPageFactory(pageno);
		promise.then(function(response){
			$scope.$parent.total_count = parseInt(response.headers('X-Total-Count'));
			$scope.results = response.data;
		});
	};

	//self calling of getdata function to populate data on page load
	$scope.getData($scope.pageno);

	//delete function that is called when delete button is presssed in the result table
	$scope.deleteRecord = function(record){
		showConfirm(record);
	}

	//get confirmation dialog box for deleting a record
	var showConfirm = function(record) {

		//properties of the comfiem dialog box of the dleete function
	    var confirm = $mdDialog.confirm()
	          .title('Please Confirm ! ')
	          .textContent('Are you sure you want to delete the record ?')
	          .ariaLabel('Confirm Delete')
	          .ok('Confirm')
	          .cancel('Cancel');

	    $mdDialog.show(confirm).then(function() {

	    	// get the promise after hitting the a[pi with delete request
	    	var promise = deleteRecordFactory(record.id);

	    	//remove the element from dom and show the toast
	    	promise.then(function(){
	    		deleteViewRemover(record);
	    		showSimpleToast(record.name);
	    	});
	      	
	    }, function() {
	      console.log("rejected");
	    });
  	};

  	//record removal from dom afetr successfull delete
  	var deleteViewRemover = function(record){
  		var index = $scope.results.indexOf(record);
  		$scope.results.splice(index,1);
  	}

}]);
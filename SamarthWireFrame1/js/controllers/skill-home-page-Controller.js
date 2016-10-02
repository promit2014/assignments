angular.module('samarth-skill-profile').controller('skill-home-page-Controller', ['$scope', function($scope){
	
	var originatorEv;

	$scope.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

}]);
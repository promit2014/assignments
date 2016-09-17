angular.module('crudApp').controller('sidenavController', [ '$scope' , '$mdSidenav' , '$mdComponentRegistry' , function($scope, $mdSidenav , $mdComponentRegistry) {
  $scope.openLeftMenu = function() {
    $mdSidenav('left').toggle();
  };
}]);
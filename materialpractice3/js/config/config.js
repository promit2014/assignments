angular.module('crudApp').
config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'results.html',
      controller : 'resultsController'
    })
    .state('add', {
      url: '/add',
      templateUrl: 'add.html',
      controller : 'addController'
    })
    .state('search', {
      url: '/search',
      template: 'search.html'
    })
    .state('edit', {
      url: '/edit',
      template: 'edit.html'
    });
}]);
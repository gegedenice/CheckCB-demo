angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('cameraPage', {
    url: '/camera',
    templateUrl: 'templates/cameraPage.html',
    controller: 'cameraPageCtrl'
  })

  .state('listPage', {
    url: '/list',
    templateUrl: 'templates/listPage.html',
    controller: 'listPageCtrl'
  })

  .state('resultPage', {
    url: '/result/:cb',
    templateUrl: 'templates/resultPage.html',
    controller: 'resultPageCtrl'
  })

  .state('home', {
    url: '/',
    templateUrl: 'templates/home.html',
    controller: 'homeCtrl'
  })

$urlRouterProvider.otherwise('/')


});

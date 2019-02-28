angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
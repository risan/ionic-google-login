'use strict';

var app = angular.module('app', [
  'ionic',
  'ngCordovaOauth',
  'app.Config',
  'app.Services',
  'app.Controllers'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'login.html'
  });

  $stateProvider.state('dashboard', {
    url: '/dashboard',
    templateUrl: 'dashboard.html'
  });

  $urlRouterProvider.otherwise('/login');
}]);

app.run(['$rootScope', '$state', '$ionicPlatform', 'User', function($rootScope, $state, $ionicPlatform, User) {
  $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
    if (toState.name === 'dashboard' && User.get() === null) {
      e.preventDefault();
      $state.go('login');
    }

    if (toState.name === 'login' && User.get() !== null) {
      e.preventDefault();
      $state.go('dashboard');
    }
  });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}]);

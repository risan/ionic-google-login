'use strict';

var app = angular.module('app', [
  'ionic',
  'ngCordovaOauth',
  'app.Config',
  'app.Services',
  'app.Controllers'
]);

app.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}]);

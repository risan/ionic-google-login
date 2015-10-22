'use strict';

angular.module('app.Services').service('User', ['$window', 'Google', function($window, Google) {
  var user = null;

  this.login = function(successCallback, errorCallback) {
    Google.getAccessToken(function(accessToken) {
      Google.getUser(accessToken, function(userData) {
        user = userData;
        $window.localStorage.setItem('user', angular.toJson(user));
        successCallback(user);
      }, function(error) {
        errorCallback(error.message);
      });
    }, function(error) {
      errorCallback(error);
    });
  };

  this.logout = function() {
    user = null;
    $window.localStorage.removeItem('user');
    return this;
  }

  this.get = function() {
    if (user === null && $window.localStorage.getItem('user')) {
      user = angular.fromJson($window.localStorage.getItem('user'));
    }

    return user;
  };
}]);

'use strict';

angular.module('app.Services').service('User', ['Google', function(Google) {
  var user = null;

  this.login = function(successCallback, errorCallback) {
    Google.getAccessToken(function(accessToken) {
      Google.getUser(accessToken, function(userData) {
        user = userData;
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
    return this;
  }

  this.get = function() {
    return user;
  };
}]);

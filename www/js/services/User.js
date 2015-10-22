'use strict';

angular.module('app.Services').factory('User', ['Google', function(Google) {
  return {
    login: function(successCallback, errorCallback) {
      Google.getAccessToken(function(accessToken) {
        Google.getUser(accessToken, function(user) {
          successCallback(user);
        }, function(error) {
          errorCallback(error.message);
        });
      }, function(error) {
        errorCallback(error);
      });
    }
  };
}]);

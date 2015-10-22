'use strict';

angular.module('app.Services').factory('Google', ['$http', '$cordovaOauth', 'GOOGLE_CLIENT_ID',
 function($http, $cordovaOauth, GOOGLE_CLIENT_ID) {
  return {
    getAccessToken: function(successCallback, errorCallback) {
      $cordovaOauth
        .google(GOOGLE_CLIENT_ID, ['https://www.googleapis.com/auth/userinfo.email'])
        .then(function(response) {
          successCallback(response.access_token);
        }, errorCallback);
    },

    getUser: function(accessToken, successCallback, errorCallback) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;

      $http.get('https://www.googleapis.com/oauth2/v2/userinfo').then(function(response) {
        successCallback(response.data);
      }, function(response) {
        errorCallback(response.data.error);
      });
    }
  };
}]);

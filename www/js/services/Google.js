'use strict';

angular.module('app.Services').factory('Google', ['$rootScope', '$http', '$cordovaOauth', 'GOOGLE_CLIENT_ID',
 function($rootScope, $http, $cordovaOauth, GOOGLE_CLIENT_ID) {
  return {
    login: function(successCallback, errorCallback) {
      this.logout();

      $cordovaOauth.google(GOOGLE_CLIENT_ID, ['https://www.googleapis.com/auth/userinfo.email']).then(function(response) {
        $rootScope.accessToken = response.access_token;
        successCallback(response.access_token);
      }, function(error) {
        errorCallback(error);
      });
    },

    logout: function() {
      $rootScope.accessToken = null;
      $rootScope.user = null;
    },

    getUser: function(successCallback, errorCallback) {
      $rootScope.user = null;
      $http.defaults.headers.common.Authorization = 'Bearer ' + $rootScope.accessToken;

      $http.get('https://www.googleapis.com/oauth2/v2/userinfo').then(function(response) {
        $rootScope.user = response.data;
        successCallback(response.data);
      }, function(response) {
        errorCallback(response.data);
      });
    }
  };
}]);

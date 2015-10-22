'use strict';

angular.module('app.Controllers').controller('LoginCtrl',
 ['$rootScope', '$scope', 'Google', function($rootScope, $scope, Google) {

  $scope.login = function() {
    Google.login(function(accessToken) {
      getUser();
    }, function(error) {
      alert(error);
    });
  };

  $scope.logout = function() {
    Google.logout();
  }

  var getUser = function() {
    Google.getUser(function(data) {
      console.log(data);
    }, function(data) {
      alert(data.error.message);
    });
  };

}]);

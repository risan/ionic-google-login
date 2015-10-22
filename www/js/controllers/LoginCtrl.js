'use strict';

angular.module('app.Controllers').controller('LoginCtrl', ['$scope', 'User', function($scope, User) {

  $scope.login = function() {
    User.login(function(user) {
      $scope.user = user;
    }, function(error) {
      alert(error);
    });
  };

  $scope.logout = function() {
    $scope.user = null;
  }

}]);

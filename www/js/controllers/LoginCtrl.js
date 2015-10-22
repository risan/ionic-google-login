'use strict';

angular.module('app.Controllers').controller('LoginCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
  $scope.login = function() {
    User.login(function(user) {
      $state.go('dashboard');
    }, function(error) {
      alert(error);
    });
  };
}]);

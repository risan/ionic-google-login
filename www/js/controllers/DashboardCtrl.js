'use strict';

angular.module('app.Controllers').controller('DashboardCtrl', ['$scope', '$state', 'User', function($scope, $state, User) {
  $scope.user = User.get();

  $scope.logout = function() {
    User.logout();
    $state.go('login');
  }
}]);

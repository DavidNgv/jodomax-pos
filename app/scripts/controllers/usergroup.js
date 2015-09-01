'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:UsergroupCtrl
 * @description
 * # UsergroupCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('UserGroupCtrl', [
    '$scope',
    'UserGroupListModel',
    function (
      $scope,
      UserGroupListModel
    ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.saveUserGroup = function() {
      $scope.userGroupList.saveCurrentItem($scope);
    };

    $scope.selectUserGroup = function(item) {
      $scope.userGroupList.selectItem(item);
    };

    $scope.userGroupList = new UserGroupListModel();
    $scope.userGroupList.fetchList($scope);
    $scope.userGroupList.newItem();
  }]);

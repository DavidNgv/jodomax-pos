'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('UserCtrl', [
    '$scope',
    'UserListModel',
    'dbService',
    function (
      $scope,
      UserListModel,
      dbService
    ) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.loadUserGroupList = function() {
        var db = dbService.getDb();
        db.UserGroup.toArray(function(items){
          $scope.userGroup = _.map(items, function(el){
            return el.initData;
          });
        });
      };

      $scope.saveUser = function() {
        $scope.userList.saveCurrentItem($scope);
      };

      $scope.selectUser = function(item) {
        $scope.userList.selectItem(item);
      };

      $scope.loadUserGroupList();
      $scope.userList = new UserListModel();
      $scope.userList.fetchList($scope);
      $scope.userList.newItem();
  }]);

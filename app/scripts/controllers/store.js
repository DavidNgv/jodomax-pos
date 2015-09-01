'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:StoreCtrl
 * @description
 * # StoreCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('StoreCtrl', [
    '$scope',
    'StoreListModel',
    function (
      $scope,
      StoreListModel
    ) {

      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.saveStore = function() {
        $scope.storeList.saveCurrentItem($scope);
      };

      $scope.selectStore = function(item) {
        $scope.storeList.selectItem(item);
      };

      $scope.storeList = new StoreListModel();
      $scope.storeList.fetchList($scope);
      $scope.storeList.newItem();
  }]);

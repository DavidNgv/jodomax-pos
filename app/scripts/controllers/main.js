'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('MainCtrl', [
    '$scope',
    '$mdSidenav',
    'ProductListModel',
    function (
      $scope,
      $mdSidenav,
      ProductListModel
    ) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.fruitNames = ['Apple', 'Banana', 'Orange'];

      $scope.sideToggle = function () {
        // console.log('come 1');

        $mdSidenav('left').toggle();
      };

      $scope.productList = new ProductListModel();
      $scope.productList.fetchList($scope);
  }]);

'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:DiscountCtrl
 * @description
 * # DiscountCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('DiscountCtrl', [
    '$scope',
    'DiscountListModel',
    'dbService',
    function (
      $scope,
      DiscountListModel,
      dbService
    ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.saveDiscount = function() {
      $scope.discountList.saveCurrentItem($scope);
    };

    $scope.selectDiscount = function(item) {
      $scope.discountList.selectItem(item);
    };

    $scope.discountList = new DiscountListModel();
    $scope.discountList.fetchList($scope);
    $scope.discountList.newItem();

  }]);

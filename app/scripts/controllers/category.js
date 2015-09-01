'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('CategoryCtrl', [
    '$scope',
    'CategoryListModel',
    function (
      $scope,
      CategoryListModel
    ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.saveCategory = function() {
      $scope.categoryList.saveCurrentItem($scope);
    };

    $scope.selectCategory = function(cat) {
      $scope.categoryList.selectItem(cat);
    };

    $scope.categoryList = new CategoryListModel();
    $scope.categoryList.fetchList($scope);
    $scope.categoryList.newItem();

  }]);

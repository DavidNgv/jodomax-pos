'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:AttributegroupCtrl
 * @description
 * # AttributegroupCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('AttributeGroupCtrl', [
    '$scope',
    'AttributeGroupListModel',
    function (
      $scope,
      AttributeGroupListModel
    ) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.saveAttributeGroup = function() {
      $scope.attributeGroupList.saveCurrentItem($scope);
    };

    $scope.selectAttributeGroup = function(item) {
      $scope.attributeGroupList.selectItem(item);
    };

    $scope.attributeGroupList = new AttributeGroupListModel();
    $scope.attributeGroupList.fetchList($scope);
    $scope.attributeGroupList.newItem();

  }]);

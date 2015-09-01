'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:AttributeCtrl
 * @description
 * # AttributeCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('AttributeCtrl', [
    '$scope',
    'AttributeListModel',
    'dbService',
    function (
      $scope,
      AttributeListModel,
      dbService
    ) {

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.loadAttributeGroupList = function() {
      var db = dbService.getDb();
      db.AttributeGroup.toArray(function(items){
        $scope.attributeGroup = _.map(items, function(el){
          return el.initData;
        });
      });
    };

    $scope.saveAttribute = function() {
      $scope.attributeList.saveCurrentItem($scope);
    };

    $scope.selectAttribute = function(item) {
      $scope.attributeList.selectItem(item);
    };

    $scope.loadAttributeGroupList();
    $scope.attributeList = new AttributeListModel();
    $scope.attributeList.fetchList($scope);
    $scope.attributeList.newItem();

  }]);

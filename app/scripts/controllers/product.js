'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:ProductCtrl
 * @description
 * # ProductCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('ProductCtrl', [
    '$scope',
    'ProductListModel',
    'dbService',
    'Upload',
    function (
      $scope,
      ProductListModel,
      dbService,
      Upload
    ) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.loadCatList = function() {
        var db = dbService.getDb();
        db.Category.toArray(function(cats){
          $scope.catList = _.map(cats, function(el){
            return el.initData;
          });
          //console.log($scope.catList);
        });
      };

      $scope.loadDiscountList = function() {
        var db = dbService.getDb();
        db.Discount.toArray(function(items){
          $scope.discountList = _.map(items, function(el){
            return el.initData;
          });
          //console.log($scope.catList);
        });
      };

      $scope.$watch('productList.currentItem.Category', function(newVal, oldVal) {
        if ($scope.productList.currentItem.Category!=undefined) {
          $scope.productList.currentItem.categoryChange();
        }
      }, true);



      $scope.saveProduct = function() {
        $scope.productList.saveCurrentItem($scope);
      };

      $scope.selectProduct = function(cat) {
        $scope.productList.selectItem(cat);
      };

      $scope.filterList = function() {
        if ($scope.filter==undefined || $scope.filter.FK_category==undefined) {
          return;
        }

        var filterFn = function(item){
          return (item.FK_category == this.categoryId);
        };

        var filterData = {
          categoryId: $scope.filter.FK_category
        };

        $scope.productList.fetchList($scope, filterFn, filterData);
      };

      $scope.$watch('filter.FK_category', function(newVal, oldVal) {
        $scope.filterList();
      }, true);

      $scope.logFilePath = function(){
        console.log($scope.filePath);
      };

      $scope.filePath = 'file:///D://JodoMax Fashion//JodoMax Fashion//NHH_5404.JPG';

      $scope.upload = function (files) {
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            Upload.upload({
              url: 'http://localhost:3000/upload',
              fields: {'tableName': 'Products'},
              file: file
            }).progress(function (evt) {
              var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
              console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
            }).success(function (data, status, headers, config) {
              console.log('file ' + config.file.name + 'uploaded. Response: ');
              console.log(data);
              //$scope.filePath = 'http://localhost:3000/' + data.url
              $scope.productList.currentItem.Image = data.url;
            });
          }
        }
      };

      $scope.loadCatList();
      $scope.loadDiscountList();
      $scope.productList = new ProductListModel();
      $scope.productList.fetchList($scope);
      $scope.productList.newItem();

  }]);

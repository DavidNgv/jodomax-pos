'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:StockinCtrl
 * @description
 * # StockinCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('StockinCtrl', [
    '$scope',
    '$routeParams',
    'dbService',
    '$mdToast',
    '$location',
    'AppUtils',
    'AttributeGroup',
    'StockInModel',
    'StockInListModel',
    '$mdDialog',
    '$mdSidenav',
    '$log',
    '$q',
    'SupplierModel',
    'Auth',
    function (
      $scope,
      $routeParams,
      dbService,
      $mdToast,
      $location,
      AppUtils,
      AttributeGroup,
      StockInModel,
      StockInListModel,
      $mdDialog,
      $mdSidenav,
      $log,
      $q,
      SupplierModel,
      Auth
    ) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.onCodeKeyPress = function($event) {
        if ($event.charCode==13) {
          var itemCode = $scope.stockIn.stockInDetailList.currentItem.Code;
          var db = dbService.getDb();

          db.Product.first("it.Code=='" + itemCode + "'",{},function(prod){
            $scope.stockIn.stockInDetailList.currentItem.applyProduct(prod, $scope);
          });
        }
      };

      $scope.onQtyKeyPress = function($event) {
        if ($event.charCode==13) {
          var data = $scope.stockIn.stockInDetailList.currentItem;
          var isNewItem = $scope.stockIn.stockInDetailList.isNewItem;

          if (data.FK_product>0 && isNewItem) {
            $scope.stockIn.stockInDetailList.newItem({Id: 0, Qty: 1}, true, function () {
              $scope.stockIn.calculateBill();
            });

            $scope.focusOnCode();
          }
        }
      };

      $scope.focusOnCode = function() {
        var $code = $('#item-code');
        $code.focus();
      };

      $scope.stockInDetailSelect = function(item, $event) {
        $scope.stockIn.stockInDetailList.selectItem(item);
      };

      $scope.$watch('stockIn.stockInDetailList.currentItem.Qty', function(newVal, oldVal) {
        $scope.stockIn.calculateBill();
      }, true);

      $scope.querySearch = function(query) {
        $log.info('Query: ' + query);

        var deferred;

        deferred = $q.defer();
        var db = dbService.getDb();

        db.Supplier.filter("Mobile", ".startsWith", query).toArray(function(items){
          var res = _.map(items, function(el){
            return el.initData;
          });

          if (res.length>0)
            deferred.resolve(res);
          else {
            console.log('come here: ', res);
            deferred.reject();
          }
        });


        return deferred.promise;
      };

      $scope.searchTextChange = function(text) {
        //$log.info('Text changed to ' + text);
      };

      $scope.selectedItemChange = function(item) {
        console.log('selectedItemchange');

        //$log.info('Item changed to ' + JSON.stringify(item));
        if (item!=null && item!=undefined) {
          $scope.stockIn.FK_supplier = item.Id;
          $log.info($scope.stockIn.FK_supplier);
        } else {
          $scope.stockIn.FK_supplier = 0;
          $log.info($scope.stockIn.FK_supplier);
        }
      };

      $scope.addSupplier = function(ev) {
        $mdDialog.show({
          controller: SupplierDialogController,
          templateUrl: 'views/supplierdialog.html',
          targetEvent: ev
        })
          .then(function(answer) {
            //console.log(answer);
            answer.Id = 0;

            var supplier = new SupplierModel(answer);
            supplier.save(function(isNewItem, item){
              //console.log(customer);
              $scope.$apply(function(){
                $scope.setSupplier(supplier);
              });
            });
          }, function() {
            console.log('You cancelled the dialog.');
          });
      };

      $scope.setSupplier = function(sup){
        $scope.selectedSupplier = sup;
      };

      $scope.clearSupplier = function() {
        console.log('clearSupplier');
        $scope.selectedSupplier = undefined;
      };


      $scope.newStockIn = function() {
        $scope.stockIn = new StockInModel({
          Id: 0,
          FK_supplier: 0,
          FK_store: 0,
          FK_user: Auth.getLoginId(),
          totalAmount : 0
        });

        $scope.newStockInDetail();

        //$scope.setSupplier(null);
        $scope.clearSupplier(null);
      };

      $scope.newStockInDetail = function() {
        $scope.stockIn.stockInDetailList.newItem({Id: 0, Qty: 1});
        $scope.focusOnCode();
      };

      $scope.loadStoreList = function() {
        var db = dbService.getDb();

        var filterFn = function(item){
          return (item.IsStockIn == this.isStockIn);
        };

        var filterData = {
          isStockIn: true
        };

        var _listPromise = db.Store.filter(filterFn, filterData).toArray();

        $.when(_listPromise).then(function(items){
          $scope.storeList = _.map(items, function(el){
            return el.initData;
          });
        });

        /*db.Store.toArray(function(items){
          $scope.storeList = _.map(items, function(el){
            return el.initData;
          });
        });*/
      };

      $scope.saveStockIn = function() {
        $scope.stockIn.saveStockIn(function(){
          $scope.stockIn.printInvoice();
          $scope.$apply(function(){
            $scope.newStockIn();
          });
        });
      };

      $scope.printStockIn = function(ev) {
        $scope.stockIn.printInvoice();
      };

      $scope.listStockIn = function() {
        $mdSidenav('left').toggle();
      };

      $scope.selectStockIn = function(it) {
        console.log(it);

        $mdSidenav('left').toggle();

        it.fetchDetail($scope);

        var supplierId = it.FK_supplier;
        if (supplierId>0) {
          var db = dbService.getDb();

          db.Supplier.find(supplierId).then(function(item){
            var supplier = item.initData;
            $scope.$apply(function(){
              $scope.setSupplier(supplier);
            });
          });
        }

        $scope.stockIn = it;
      };

      $scope.stockInList = new StockInListModel();
      $scope.stockInList.fetchList($scope);
      $scope.newStockIn();
      $scope.loadStoreList();
  }]);

function SupplierDialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}
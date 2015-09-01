'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:PosCtrl
 * @description
 * # PosCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('PosCtrl', [
    '$scope',
    '$routeParams',
    'dbService',
    '$mdToast',
    '$location',
    'SalesDetail',
    'Sales',
    'AppUtils',
    'AttributeGroup',
    'SalesModel',
    '$mdDialog',
    '$mdSidenav',
    'SalesListModel',
    '$log',
    '$q',
    'CustomerModel',
    'Auth',
    function (
      $scope,
      $routeParams,
      dbService,
      $mdToast,
      $location,
      SalesDetail,
      Sales,
      AppUtils,
      AttributeGroup,
      SalesModel,
      $mdDialog,
      $mdSidenav,
      SalesListModel,
      $log,
      $q,
      CustomerModel,
      Auth
    ) {

      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.onCodeKeyPress = function($event) {
        if ($event.charCode==13) {
          var itemCode = $scope.sales.salesDetailList.currentItem.Code;
          switch (itemCode) {
            case '001':
              $scope.sales.salesDetailList.currentItem.isRoomChargeHour = true;
              var prod = {
                Id: 999999,
                Code: '001',
                Title: 'Tiền phòng',
                Price: 120000,
                Disc: 0,
                Attributes: []
              };
              $scope.sales.salesDetailList.currentItem.applyRoomCharge(prod);
              break;
            case '002':
              $scope.sales.salesDetailList.currentItem.isRoomChargeDay = true;
              break;
            default:
              $scope.sales.salesDetailList.currentItem.isRoomChargeHour = false;
              var db = dbService.getDb();
              db.Product.first("it.Code=='" + itemCode + "'",{},function(prod){
                $scope.sales.salesDetailList.currentItem.applyProduct(prod, $scope);
              });
              break;
          }
        }
      };

      $scope.onQtyKeyPress = function($event) {
        if ($event.charCode==13) {
          var data = $scope.sales.salesDetailList.currentItem;
          var isNewItem = $scope.sales.salesDetailList.isNewItem;

          if (data.FK_product>0 && isNewItem) {
            $scope.sales.salesDetailList.newItem({Id: 0, Qty: 1}, true, function () {
              $scope.sales.calculateBill();
            });

            $scope.focusOnCode();
          }
        }
      };

      $scope.focusOnCode = function() {
        var $code = $('#item-code');
        $code.focus();
      };

      $scope.salesDetailSelect = function(item, $event) {
        $scope.sales.salesDetailList.selectItem(item);
      };

      $scope.newSales = function() {
        $scope.sales = new SalesModel({
          Id: 0,
          FK_user: Auth.getLoginId(),
          FK_customer: 0,
          FK_store: 0,
          discPercent : 0,
          discAmount : 0,
          paymentCash : 0,
          paymentCreditCard : 0,
          paymentAdvanceCash : 0,
          paymentAdvanceCreditCard : 0
        });

        $scope.newSalesDetail();

        $scope.setCustomer(null);
      };

      $scope.newSalesDetail = function() {
        $scope.sales.salesDetailList.newItem({Id: 0, Qty: 1});
        $scope.focusOnCode();
      };

      $scope.saveSales = function() {
        $scope.sales.saveSales(function(){
          $scope.sales.printInvoice();
          $scope.$apply(function(){
            $scope.newSales();
          });
        });
      };

      $scope.printSales = function(ev) {
        $scope.sales.printInvoice();
      };

      $scope.listSales = function() {
        $mdSidenav('left').toggle();
      };

      $scope.selectSales = function(it) {
        console.log(it);

        $mdSidenav('left').toggle();

        it.fetchSalesDetail($scope);

        var customerId = it.FK_customer;
        if (customerId>0) {
          var db = dbService.getDb();

          db.Customer.find(customerId).then(function(item){
            var customer = item.initData;
            $scope.$apply(function(){
              $scope.setCustomer(customer);
            });
          });
        }

        $scope.sales = it;
      };

      $scope.$watch('sales.discPercent', function(newVal, oldVal) {
        $scope.sales.calculateBill();
      }, true);

      $scope.$watch('sales.discAmount', function(newVal, oldVal) {
        $scope.sales.calculateBill();
      }, true);

      $scope.$watch('sales.paymentCreditCard', function(newVal, oldVal) {
        $scope.sales.calculateBill();
      }, true);

      $scope.$watch('sales.paymentAdvanceCash', function(newVal, oldVal) {
        $scope.sales.calculateBill();
      }, true);

      $scope.$watch('sales.paymentAdvanceCreditCard', function(newVal, oldVal) {
        $scope.sales.calculateBill();
      }, true);

      $scope.$watch('sales.salesDetailList.currentItem.Qty', function(newVal, oldVal) {
        $scope.sales.calculateBill();
      }, true);


      $scope.querySearch = function(query) {
        //$log.info('Query: ' + query);

        var deferred;

        deferred = $q.defer();
        var db = dbService.getDb();

        db.Customer.filter("Mobile", ".startsWith", query).toArray(function(items){
          var res = _.map(items, function(el){
            return el.initData;
          });
          deferred.resolve(res);
        });


        return deferred.promise;
      };

      $scope.searchTextChange = function(text) {
        //$log.info('Text changed to ' + text);
      };

      $scope.selectedItemChange = function(item) {
        console.log('selectedItemchange');

        //$log.info('Item changed to ' + JSON.stringify(item));
        if (item!=null) {
          $scope.sales.FK_customer = item.Id;
          $log.info($scope.sales.FK_customer);
        }
      };

      $scope.addCustomer = function(ev) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'views/customerdialog.html',
          targetEvent: ev
        })
          .then(function(answer) {
            //console.log(answer);
            answer.Id = 0;

            var customer = new CustomerModel(answer);
            customer.save(function(isNewItem, item){
              //console.log(customer);
              $scope.$apply(function(){
                $scope.setCustomer(customer);
              });
            });
          }, function() {
            console.log('You cancelled the dialog.');
          });
      };

      $scope.setCustomer = function(customer){
        $scope.selectedCustomer = customer;
      };

      $scope.clearCustomer = function() {
        $scope.selectedCustomer = null;
      };

      $scope.loadStoreList = function() {
        var db = dbService.getDb();

        var filterFn = function(item){
          return (item.IsSales == this.isSales);
        };

        var filterData = {
          isSales: true
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

      $scope.salesList = new SalesListModel();
      $scope.salesList.fetchList($scope);
      $scope.newSales();
      $scope.loadStoreList();
  }]);

function DialogController($scope, $mdDialog) {
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
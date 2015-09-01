'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.Sales
 * @description
 * # Sales
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('Sales', ['SalesDetail', function (SalesDetail) {
    // Service logic
    // ...
    var Sales = function(tableName, data) {
      this.omitFields = ['omitFields', 'tableName', 'cid'];
      this.tableName = tableName;

      var me = this;
      angular.extend(me, data);

      this.newSalesDetail();
    };

    Sales.prototype.fetch = function() {
    };

    Sales.prototype.save = function(callback) {
    };

    Sales.prototype.destroy = function(callback) {
    };

    Sales.prototype.calculateBill = function(callback) {
      var salesDetailList = this.salesDetailList;

      var discPercent = this.discPercent;
      var paymentCreditCard = this.paymentCreditCard;
      var paymentCash = this.paymentCash;
      var paymentAdvanceCash = this.paymentAdvanceCash;
      var paymentAdvanceCreditCard = this.paymentAdvanceCreditCard;

      var salesDetailSummary = {
        totalCharged: 0,
        totalPromo: 0,
        totalAmount: 0,
        totalAmountNotPromo: 0
      };

      salesDetailSummary = _.reduce(salesDetailList, function(sum, el){
        sum.totalCharged += el.getAmountCharged();
        sum.totalPromo += el.getPromo();
        sum.totalAmount += el.getAmount();
        sum.totalAmountNotPromo += el.getAmountNotDisc();

        return sum;
      }, salesDetailSummary);

      var billDisc = salesDetailSummary.totalAmountNotPromo * discPercent / 100;
      var totalDue = salesDetailSummary.totalAmount - billDisc;
      var totalDueLeft = 0;

      if (paymentAdvanceCash>0 || paymentAdvanceCreditCard>0) {
        paymentCash = 0;
        paymentCreditCard = 0;
        totalDueLeft = totalDue - paymentAdvanceCash - paymentAdvanceCreditCard;
      } else {
        paymentCash = totalDue - paymentCreditCard;
      }



      this.totalCharged = salesDetailSummary.totalCharged;
      this.totalPromo = salesDetailSummary.totalPromo;
      this.totalAmount = salesDetailSummary.totalAmount;
      this.billDisc = billDisc;
      this.totalDue = totalDue;
      this.totalDueLeft = totalDueLeft;

      this.paymentCash = paymentCash;
      this.paymentCreditCard = paymentCreditCard;
    };

    Sales.prototype.newSalesDetail = function() {
      this.currentSalesDetail = new SalesDetail('SalesDetail', {
        Id: 0,
        Code: '',
        Title: '',
        Qty: 1,
        Price: 0,
        Disc: 0,
        Attributes: []
      });
      this.newItem = true;
    };

    Sales.prototype.addNewSalesDetail = function() {
      this.salesDetailList.push(this.currentSalesDetail);
      this.newSalesDetail();
    };

    return Sales;
  }]);

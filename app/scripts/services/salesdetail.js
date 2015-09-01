'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.SalesDetail
 * @description
 * # SalesDetail
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('SalesDetail', [function () {
    // Service logic
    // ...
    var SalesDetail = function(tableName, data) {
      this.omitFields = ['omitFields', 'tableName', 'cid'];
      this.tableName = tableName;
      //this.cid = window.uuid.v4();

      var me = this;
      angular.extend(me, data);
    };

    SalesDetail.prototype.fetch = function() {
    };

    SalesDetail.prototype.save = function(callback) {
    };

    SalesDetail.prototype.destroy = function(callback) {
    };

    SalesDetail.prototype.getPriceText = function() {
      return this.Price;
    };

    SalesDetail.prototype.getAmountText = function() {
      return (this.Price * this.Qty);
    };

    SalesDetail.prototype.getAmountCharged = function() {
      return (this.Price * this.Qty);
    };

    SalesDetail.prototype.getAmount = function() {
      return (this.Price * this.Qty)*(100-this.Disc)/100;
    };

    SalesDetail.prototype.getPromo = function() {
      return (this.Price * this.Qty)*(this.Disc)/100;
    };

    SalesDetail.prototype.getAmountNotDisc = function() {
      var res = 0;
      if (this.Disc==0)
        res = (this.Price * this.Qty);

      return res;
    };

    return SalesDetail;

  }]);

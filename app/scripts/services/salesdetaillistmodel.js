'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.SalesDetailListModel
 * @description
 * # SalesDetailListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('SalesDetailListModel', [
    'AppUtils',
    'BaseListModel',
    'SalesDetailModel',
    function (
      AppUtils,
      BaseListModel,
      SalesDetailModel
    ) {
    // Service logic

    var SalesDetailListModel = (function(superClass) {
      AppUtils.extend(SalesDetailListModel, superClass);

      function SalesDetailListModel() {
        return SalesDetailListModel.__super__.constructor.apply(this, arguments);
      }

      SalesDetailListModel.tableName = 'SalesDetail';
      SalesDetailListModel.ModelClass = SalesDetailModel;

      SalesDetailListModel.prototype.saveList = function(newSalesId, callback){
        var _this = this;

        _.each(_this.itemList, function(el){
          el.FK_sales = newSalesId;
        });

        async.mapSeries(_this.itemList, function(el, cb){
          //console.log(el);
          el.save(function(isNewEl, saveEl){
            cb(null, saveEl);
          });
        }, function(err, results){
          //console.log(results);
          callback(err, results);
        });
      };


      return SalesDetailListModel;
    })(BaseListModel);

    return SalesDetailListModel;
  }]);

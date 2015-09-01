'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.StockInDetailListModel
 * @description
 * # StockInDetailListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('StockInDetailListModel', [
    'AppUtils',
    'BaseListModel',
    'StockInDetailModel',
    function (
      AppUtils,
      BaseListModel,
      StockInDetailModel
    ) {
    // Service logic

    var StockInDetailListModel = (function(superClass) {
      AppUtils.extend(StockInDetailListModel, superClass);

      function StockInDetailListModel() {
        return StockInDetailListModel.__super__.constructor.apply(this, arguments);
      }

      StockInDetailListModel.tableName = 'StockInDetail';
      StockInDetailListModel.ModelClass = StockInDetailModel;

      StockInDetailListModel.prototype.saveList = function(newId, callback){
        var _this = this;

        _.each(_this.itemList, function(el){
          el.FK_stockin = newId;
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


      return StockInDetailListModel;
    })(BaseListModel);

    return StockInDetailListModel;
  }]);

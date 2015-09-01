'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.StockInListModel
 * @description
 * # StockInListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('StockInListModel', [
    'AppUtils',
    'BaseListModel',
    'StockInModel',
    function (
      AppUtils,
      BaseListModel,
      StockInModel
    ) {
    // Service logic

      var StockInListModel = (function(superClass) {
        AppUtils.extend(StockInListModel, superClass);

        function StockInListModel() {
          return StockInListModel.__super__.constructor.apply(this, arguments);
        }

        StockInListModel.tableName = 'StockIn';
        StockInListModel.ModelClass = StockInModel;

        return StockInListModel;
      })(BaseListModel);

      return StockInListModel;
  }]);

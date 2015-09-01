'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.SalesListModel
 * @description
 * # SalesListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('SalesListModel', [
    'AppUtils',
    'BaseListModel',
    'SalesModel',
    function (
      AppUtils,
      BaseListModel,
      SalesModel
    ) {
    // Service logic
      var SalesListModel = (function(superClass) {
        AppUtils.extend(SalesListModel, superClass);

        function SalesListModel() {
          return SalesListModel.__super__.constructor.apply(this, arguments);
        }

        SalesListModel.tableName = 'Sales';
        SalesListModel.ModelClass = SalesModel;

        return SalesListModel;
      })(BaseListModel);

      return SalesListModel;
  }]);

'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.StoreListModel
 * @description
 * # StoreListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('StoreListModel', [
    'AppUtils',
    'BaseListModel',
    'StoreModel',
    function (
      AppUtils,
      BaseListModel,
      StoreModel
    ) {
    // Service logic

      var StoreListModel = (function(superClass) {
        AppUtils.extend(StoreListModel, superClass);

        function StoreListModel() {
          return StoreListModel.__super__.constructor.apply(this, arguments);
        }

        StoreListModel.tableName = 'Store';
        StoreListModel.ModelClass = StoreModel;

        return StoreListModel;
      })(BaseListModel);

      return StoreListModel;
  }]);

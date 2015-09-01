'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.StoreModel
 * @description
 * # StoreModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('StoreModel', [
    'dbService',
    'AppUtils',
    'BaseModel',
    function (
      dbService,
      AppUtils,
      BaseModel
    ) {
    // Service logic

      var StoreModel = (function(superClass) {
        AppUtils.extend(StoreModel, superClass);

        function StoreModel() {
          return StoreModel.__super__.constructor.apply(this, arguments);
        }

        StoreModel.tableName = 'Store';

        StoreModel.prototype.afterExtendData = function() {

        };

        StoreModel.prototype.beforeSave = function() {

        };


        return StoreModel;
      })(BaseModel);

      return StoreModel;
  }]);

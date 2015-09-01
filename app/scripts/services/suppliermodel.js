'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.SupplierModel
 * @description
 * # SupplierModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('SupplierModel', [
    'dbService',
    'AppUtils',
    'BaseModel',
    function (
      dbService,
      AppUtils,
      BaseModel
    ) {
    // Service logic

      var SupplierModel = (function(superClass) {
        AppUtils.extend(SupplierModel, superClass);

        function SupplierModel() {
          return SupplierModel.__super__.constructor.apply(this, arguments);
        }

        SupplierModel.tableName = 'Supplier';

        SupplierModel.prototype.afterExtendData = function() {

        };

        SupplierModel.prototype.beforeSave = function() {

        };


        return SupplierModel;
      })(BaseModel);

      return SupplierModel;
  }]);

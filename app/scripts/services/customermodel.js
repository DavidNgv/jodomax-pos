'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.CustomerModel
 * @description
 * # CustomerModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('CustomerModel', [
    'dbService',
    'AppUtils',
    'BaseModel',
    function (
      dbService,
      AppUtils,
      BaseModel
    ) {
    // Service logic

      var CustomerModel = (function(superClass) {
        AppUtils.extend(CustomerModel, superClass);

        function CustomerModel() {
          return CustomerModel.__super__.constructor.apply(this, arguments);
        }

        CustomerModel.tableName = 'Customer';

        CustomerModel.prototype.afterExtendData = function() {

        };

        CustomerModel.prototype.beforeSave = function() {

        };


        return CustomerModel;
      })(BaseModel);

      return CustomerModel;
  }]);

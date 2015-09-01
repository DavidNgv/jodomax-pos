'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.DiscountModel
 * @description
 * # DiscountModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('DiscountModel', [
    'dbService',
    '$mdToast',
    'AppUtils',
    'BaseModel',
    function (
      dbService,
      $mdToast,
      AppUtils,
      BaseModel
    ) {
    // Service logic

    var DiscountModel = (function(superClass) {
      AppUtils.extend(DiscountModel, superClass);

      function DiscountModel() {
        return DiscountModel.__super__.constructor.apply(this, arguments);
      }

      DiscountModel.tableName = 'Discount';

      DiscountModel.prototype.afterExtendData = function() {

      };

      DiscountModel.prototype.beforeSave = function() {

      };

      return DiscountModel;
    })(BaseModel);

    return DiscountModel;
  }]);

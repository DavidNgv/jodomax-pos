'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.DiscountListModel
 * @description
 * # DiscountListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('DiscountListModel', [
    'AppUtils',
    'BaseListModel',
    'DiscountModel',
    function (
      AppUtils,
      BaseListModel,
      DiscountModel
    ) {
    // Service logic

    var DiscountListModel = (function(superClass) {
      AppUtils.extend(DiscountListModel, superClass);

      function DiscountListModel() {
        return DiscountListModel.__super__.constructor.apply(this, arguments);
      }

      DiscountListModel.tableName = 'Discount';
      DiscountListModel.ModelClass = DiscountModel;

      return DiscountListModel;
    })(BaseListModel);

    return DiscountListModel;
  }]);

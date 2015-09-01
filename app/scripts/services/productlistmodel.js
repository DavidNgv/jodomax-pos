'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.ProductListModel
 * @description
 * # ProductListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('ProductListModel', [
    'AppUtils',
    'BaseListModel',
    'ProductModel',
    function (
      AppUtils,
      BaseListModel,
      ProductModel
    ) {
    // Service logic
    var ProductListModel = (function(superClass) {
      AppUtils.extend(ProductListModel, superClass);

      function ProductListModel() {
        return ProductListModel.__super__.constructor.apply(this, arguments);
      };

      ProductListModel.tableName = 'Product';
      //ProductListModel.including = 'Category';
      ProductListModel.ModelClass = ProductModel;

      return ProductListModel;
    })(BaseListModel);

    return ProductListModel;
  }]);

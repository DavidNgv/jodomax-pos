'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.CategoryListModel
 * @description
 * # CategoryListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('CategoryListModel', [
    'AppUtils',
    'BaseListModel',
    'CategoryModel',
    function (
      AppUtils,
      BaseListModel,
      CategoryModel
    ) {
    // Service logic

    var CategoryListModel = (function(superClass) {
      AppUtils.extend(CategoryListModel, superClass);

      function CategoryListModel() {
        return CategoryListModel.__super__.constructor.apply(this, arguments);
      };

      CategoryListModel.tableName = 'Category';
      CategoryListModel.ModelClass = CategoryModel;

      return CategoryListModel;
    })(BaseListModel);

    return CategoryListModel;
  }]);

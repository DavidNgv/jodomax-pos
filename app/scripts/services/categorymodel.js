'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.Category
 * @description
 * # Category
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('CategoryModel', [
    'dbService',
    '$mdToast',
    'AppUtils',
    'AttributeCategory',
    'BaseModel',
    'AttributeGroup',
    function (
      dbService,
      $mdToast,
      AppUtils,
      AttributeCategory,
      BaseModel,
      AttributeGroup
    ) {

    // Service logic

    var CategoryModel = (function(superClass) {
      AppUtils.extend(CategoryModel, superClass);

      function CategoryModel() {
        return CategoryModel.__super__.constructor.apply(this, arguments);
      }

      CategoryModel.tableName = 'Category';

      CategoryModel.prototype.afterExtendData = function() {
        this.Attributes = this.deserializeAttribute(this.Attributes);
      };

      CategoryModel.prototype.beforeSave = function() {
        this.saveData.Attributes = AppUtils.serializeAttribute(this.saveData.Attributes);
      };

      CategoryModel.prototype.deserializeAttribute = function(itemAttributeCategory) {
        var selected = 'Selected';
        var attributeCategory = AppUtils.deserializeAttribute(itemAttributeCategory);

        var ag = AttributeGroup.attributeGroup;
        var attrCate = AppUtils.mapAttribute(angular.copy(ag), attributeCategory, selected);

        return attrCate;
      };

      return CategoryModel;
    })(BaseModel);

    return CategoryModel;
  }]);

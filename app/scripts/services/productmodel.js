'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.ProductModel
 * @description
 * # ProductModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('ProductModel', [
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

    var ProductModel = (function(superClass) {
      AppUtils.extend(ProductModel, superClass);

      function ProductModel() {
        return ProductModel.__super__.constructor.apply(this, arguments);
      }

      ProductModel.tableName = 'Product';

      ProductModel.prototype.afterExtendData = function() {
        var _this = this;
        var categoryId = _this.FK_category;
        if (_this.Id>0 && categoryId>0) {
          dbService.find('Category', categoryId, function(category){
            var itemAttributeCategory = category.Attributes;
            var prodAttributeCategory = _this.Attributes;
            _this.Category = category.initData;
            _this.AttributeCategory = _this.deserializeAttribute(itemAttributeCategory, prodAttributeCategory);
          });
        };
      };

      ProductModel.prototype.beforeSave = function() {
        var _this = this;

        _this.saveData.Attributes = AppUtils.serializeAttribute(_this.AttributeCategory);
        _this.Attributes = _this.saveData.Attributes;
      };

      ProductModel.prototype.deserializeAttribute = function(catAttributes, prodAttributes) {
        if (catAttributes==undefined) return [];

        var selected = 'Selected';

        var catAttributeArr = AppUtils.deserializeAttribute(catAttributes);
        var prodAttributeArr = AppUtils.deserializeAttribute(prodAttributes);

        var ag = AttributeGroup.attributeGroup;
        var attrCate = angular.copy(ag);

        attrCate = AppUtils.reduceAttribute(attrCate, catAttributeArr);

        if (prodAttributes=='') return attrCate;

        attrCate = AppUtils.mapAttribute(attrCate, prodAttributeArr, selected);
        return attrCate;
      };

      ProductModel.prototype.categoryChange = function() {
        var _this = this;
        var catAttributes = _this.Category.Attributes;
        var prodAttributes = _this.Attributes;

        _this.FK_category = _this.Category.Id;
        _this.AttributeCategory = _this.deserializeAttribute(catAttributes, prodAttributes);
      };

      ProductModel.prototype.getImagePath = function () {
        return ('http://localhost:3000/' + this.Image);
      };

      return ProductModel;
    })(BaseModel);

    return ProductModel;
  }]);

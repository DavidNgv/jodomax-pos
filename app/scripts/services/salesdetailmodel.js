'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.SalesDetailModel
 * @description
 * # SalesDetailModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('SalesDetailModel', [
    'dbService',
    '$mdToast',
    'AppUtils',
    'BaseModel',
    'AttributeGroup',
    function (
      dbService,
      $mdToast,
      AppUtils,
      BaseModel,
      AttributeGroup
    ) {
    // Service logic

    var SalesDetailModel = (function(superClass) {
      AppUtils.extend(SalesDetailModel, superClass);

      function SalesDetailModel() {
        return SalesDetailModel.__super__.constructor.apply(this, arguments);
      }

      SalesDetailModel.tableName = 'SalesDetail';

      SalesDetailModel.prototype.afterExtendData = function() {
        var _this = this;
        var _oldAttr = _this.Attributes;
        _this.Attributes = [];
        this.deserializeAttribute(_oldAttr, function(res){
          _this.Attributes = res;
        });
      };

      SalesDetailModel.prototype.beforeSave = function() {
        var _this = this;
        var attributes = _this.Attributes;

        attributes = _.map(attributes, function(attr){
          return attr.Value;
        });

        attributes = _.reduce(attributes, function(start, el){
          if (start=='') {
            start = el.FK_group + ':' + el.Id;
          } else {
            start += ',' + el.FK_group + ':' + el.Id;
          }
          return start;
        }, '');

        this.saveData.Attributes = attributes;
      };

      SalesDetailModel.prototype.deserializeAttribute = function(attributes, cb) {
        var _this = this;
        if (_this.Id>0 && _this.FK_product>0) {
          dbService.find('Product', _this.FK_product, function(prod){
            var attributeArr = AppUtils.deserializeAttribute(attributes);
            var prodAttributeArr = _this.deserializeProductAttribute(prod.Attributes);

            var res = _.map(prodAttributeArr, function(el) {
              var el_id = el.Id;

              var foundAc = _.find(attributeArr, function(ac) {
                return (ac.Id==el_id);
              });

              var attributes = el.Attributes;
              _.each(attributes, function(elAttr){
                if (foundAc!=undefined) {
                  var foundAttr = _.find(foundAc.AttributeId, function(attr_id){
                    return (elAttr.Id==attr_id);
                  });
                  if (foundAttr!=undefined){
                    el.Value = angular.copy(elAttr);
                  }
                }
              });

              return el;
            });

            cb(res);
          });
        } else {
            //cb([]);
        }
      };

      SalesDetailModel.prototype.deserializeProductAttribute = function(attributes) {
        var attributeArr = AppUtils.deserializeAttribute(attributes);

        var attrCate = angular.copy(AttributeGroup.attributeGroup);
        attrCate = AppUtils.reduceAttribute(attrCate, attributeArr);

        return attrCate;
      };

      SalesDetailModel.prototype.applyProduct = function(prod, $scope) {
        var _this = this;

        var attributes = prod.Attributes;
        var attributeArr = this.deserializeProductAttribute(attributes);
        var FK_discount = prod.FK_discount;

        if (FK_discount) {
          dbService.find('Discount', FK_discount, function(disc){
            var percent = disc.Percent;

            $scope.$apply(function(){
              _this.FK_product = prod.Id;
              _this.Code = prod.Code;
              _this.Title = prod.Title;
              _this.Price = prod.Price;
              _this.Disc = percent;
              _this.Attributes = attributeArr;
            });
          });
        } else {
          $scope.$apply(function(){
            _this.FK_product = prod.Id;
            _this.Code = prod.Code;
            _this.Title = prod.Title;
            _this.Price = prod.Price;
            _this.Disc = 0;
            _this.Attributes = attributeArr;
          });
        }
      };

      SalesDetailModel.prototype.applyRoomCharge = function(prod) {
        var _this = this;
        _this.FK_product = prod.Id;
        _this.Code = prod.Code;
        _this.Title = prod.Title;
        _this.Price = prod.Price;
        _this.Disc = 0;
        _this.Attributes = prod.Attributes;
      };

      SalesDetailModel.prototype.getPriceText = function() {
        return AppUtils.formatMoney(this.Price, 0, ',', '.');
      };

      SalesDetailModel.prototype.getAmountText = function() {
        return AppUtils.formatMoney(this.getAmount(), 0, ',', '.');
      };

      SalesDetailModel.prototype.getAmountCharged = function() {
        return (this.Price * this.Qty);
      };

      SalesDetailModel.prototype.getAmount = function() {
        return (this.Price * this.Qty)*(100-this.Disc)/100;
      };

      SalesDetailModel.prototype.getPromo = function() {
        return (this.Price * this.Qty)*(this.Disc)/100;
      };

      SalesDetailModel.prototype.getAmountNotDisc = function() {
        var res = 0;
        if (this.Disc==0)
          res = (this.Price * this.Qty);

        return res;
      };


      return SalesDetailModel;
    })(BaseModel);

    return SalesDetailModel;

  }]);

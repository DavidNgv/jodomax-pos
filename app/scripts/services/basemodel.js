'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.BaseModel
 * @description
 * # BaseModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('BaseModel', ['dbService', '$mdToast', function (dbService, $mdToast) {
    // Service logic

    var BaseModel = function(data) {
      //this.cid = window.uuid.v4();
      this.omitFields = ['tableName', 'Id', 'Category', 'AttributeCategory'];
      this.db = dbService.getDb();

      var _this = this;
      angular.extend(_this, data);
      _this.afterExtendData();
    };

    BaseModel.prototype.save = function(callback) {
      var _this = this;
      var _tableName = _this.constructor.tableName;

      var _TableClass = window[_tableName];

      var _table = _this.db[_tableName];

      var itemId = _this.Id;
      var isNewItem = (itemId == 0);

      _this.saveData = window._.omit(_this, _this.omitFields);

      _this.beforeSave();

      if (isNewItem) {
        var newItem = new _TableClass(_this.saveData);
        _table.add(newItem);
        _table.saveChanges().then(function() {
          //$mdToast.show($mdToast.simple().content('Insert new ' + _this.tableName).hideDelay(400));
          _this.Id = newItem.Id;
          callback(isNewItem, newItem);
        });
      } else {
        _table.find(itemId).then(function(item){
          _table.attach(item);
          _.each(_this.saveData, function(value, key, obj){
            item[key] = _this.saveData[key];
          });
          _table.saveChanges().then(function(){
            //$mdToast.show($mdToast.simple().content('Save ' + _this.tableName).hideDelay(500));
            callback(isNewItem, item);
          });
        });
      }
    };

    BaseModel.prototype.destroy = function(callback) {
    };

    return BaseModel;
  }]);

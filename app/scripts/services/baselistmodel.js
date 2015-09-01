'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.BaseListModel
 * @description
 * # BaseListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('BaseListModel', ['dbService', function (dbService) {
    // Service logic
    var BaseListModel = function(data) {
      var _this = this;
      var _tableName = _this.constructor.tableName;

      _this.ModelClass = _this.constructor.ModelClass;

      _this.omitFields = ['tableName', 'Id'];

      _this.db = dbService.getDb();
      _this.TableClass = window[_tableName];
      _this.table = this.db[_tableName];


      _this.itemList = [];
      _this.isNewItem = false;
      _this.currentItem = null;

      angular.extend(_this, data);

      //_this.afterExtendData();
    };

    BaseListModel.prototype.fetchList = function($scope, filterFn, filterData, cb) {
      var _this = this;
      var _listPromise;

      if (filterFn && filterData) {
        _listPromise = _this.table.filter(filterFn, filterData).toArray();
      } else {
        _listPromise = _this.table.toArray();
      }

      $.when(_listPromise).then(function(items){
        var _data = _.map(items, function(el){
          //console.log(el.initData);
          return el.initData;
        });
        var _list = _.map(_data, function(el){
          return new _this.ModelClass(el);
        });
        $scope.$apply(function(){
          //_this.currentItem = null;
          _this.itemList = _list;
        });
        if (cb) {
          cb();
        }
      });

/*
      _this.table.toArray(function(items){
        var _data = _.map(items, function(el){
          //console.log(el.initData);
          return el.initData;
        });
        var _list = _.map(_data, function(el){
          return new _this.ModelClass(el);
        });
        $scope.$apply(function(){
          _this.itemList = _list;
        });
      });
*/
    };

    BaseListModel.prototype.fetchRawData = function(cb) {
      var _this = this;
      _this.table.toArray(function(items){
        var _data = _.map(items, function(el){
          //console.log(el.initData);
          return el.initData;
        });
        cb(_data);
      });
    };

    BaseListModel.prototype.newItem = function(defaultNewData, addCurrentItemToList, cb) {
      defaultNewData = defaultNewData || {Id : 0};
      addCurrentItemToList = addCurrentItemToList || false;

      var _this = this;

      //var _data = new _this.TableClass({Id : 0});
      var _data = new _this.TableClass(defaultNewData);
      var _item = new _this.ModelClass(_data.initData);

      console.log(_item);

      if (addCurrentItemToList) {
        _this.itemList.push(_this.currentItem);
      }

      if (cb) {
        cb();
      }

      _this.currentItem = _item;
      _this.isNewItem = true;

    };

    BaseListModel.prototype.saveCurrentItem = function($scope) {
      var _this = this;

      _this.currentItem.save(function(isNewItem, item){
        if (isNewItem) {
          $scope.$apply(function(){
            _this.itemList.push(_this.currentItem);
          });
        }
        $scope.$apply(function(){
          _this.newItem();
        });
      });
    };

    BaseListModel.prototype.selectItem = function(item) {
      console.log(item);
      var _this = this;
      _this.currentItem = item;
      _this.isNewItem = false;
    };


    // Public API here
    return BaseListModel;
  }]);

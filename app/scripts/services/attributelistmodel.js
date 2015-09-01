'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.AttributeListModel
 * @description
 * # AttributeListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('AttributeListModel', [
    'AppUtils',
    'BaseListModel',
    'AttributeModel',
    function (
      AppUtils,
      BaseListModel,
      AttributeModel
    ) {
    // Service logic

    var AttributeListModel = (function(superClass) {
      AppUtils.extend(AttributeListModel, superClass);

      function AttributeListModel() {
        return AttributeListModel.__super__.constructor.apply(this, arguments);
      }

      AttributeListModel.tableName = 'Attribute';
      AttributeListModel.ModelClass = AttributeModel;

      return AttributeListModel;
    })(BaseListModel);

    return AttributeListModel;

  }]);

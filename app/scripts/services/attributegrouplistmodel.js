'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.AttributeGroupListModel
 * @description
 * # AttributeGroupListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('AttributeGroupListModel', [
    'AppUtils',
    'BaseListModel',
    'AttributeGroupModel',
    function (
      AppUtils,
      BaseListModel,
      AttributeGroupModel
    ) {
    // Service logic

    var AttributeGroupListModel = (function(superClass) {
      AppUtils.extend(AttributeGroupListModel, superClass);

      function AttributeGroupListModel() {
        return AttributeGroupListModel.__super__.constructor.apply(this, arguments);
      };

      AttributeGroupListModel.tableName = 'AttributeGroup';
      AttributeGroupListModel.ModelClass = AttributeGroupModel;

      return AttributeGroupListModel;
    })(BaseListModel);

    return AttributeGroupListModel;

  }]);

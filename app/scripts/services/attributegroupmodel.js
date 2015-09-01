'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.AttributeGroupModel
 * @description
 * # AttributeGroupModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('AttributeGroupModel', [
    'dbService',
    '$mdToast',
    'AppUtils',
    'BaseModel',
    function (
      dbService,
      $mdToast,
      AppUtils,
      BaseModel
    ) {
    // Service logic

    var AttributeGroupModel = (function(superClass) {
      AppUtils.extend(AttributeGroupModel, superClass);

      function AttributeGroupModel() {
        return AttributeGroupModel.__super__.constructor.apply(this, arguments);
      }

      AttributeGroupModel.tableName = 'AttributeGroup';

      AttributeGroupModel.prototype.afterExtendData = function() {

      };

      AttributeGroupModel.prototype.beforeSave = function() {

      };

      return AttributeGroupModel;
    })(BaseModel);

    return AttributeGroupModel;
  }]);

'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.AttributeModel
 * @description
 * # AttributeModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('AttributeModel', [
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

    var AttributeModel = (function(superClass) {
      AppUtils.extend(AttributeModel, superClass);

      function AttributeModel() {
        return AttributeModel.__super__.constructor.apply(this, arguments);
      }

      AttributeModel.tableName = 'Attribute';

      AttributeModel.prototype.afterExtendData = function() {

      };

      AttributeModel.prototype.beforeSave = function() {

      };

      return AttributeModel;
    })(BaseModel);

    return AttributeModel;

  }]);

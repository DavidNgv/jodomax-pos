'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.UserGroupModel
 * @description
 * # UserGroupModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('UserGroupModel', [
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

    var UserGroupModel = (function(superClass) {
      AppUtils.extend(UserGroupModel, superClass);

      function UserGroupModel() {
        return UserGroupModel.__super__.constructor.apply(this, arguments);
      }

      UserGroupModel.tableName = 'UserGroup';

      UserGroupModel.prototype.afterExtendData = function() {

      };

      UserGroupModel.prototype.beforeSave = function() {

      };

      return UserGroupModel;
    })(BaseModel);

    return UserGroupModel;
  }]);

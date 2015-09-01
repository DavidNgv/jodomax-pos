'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.UserModel
 * @description
 * # UserModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('UserModel', [
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

    var UserModel = (function(superClass) {
      AppUtils.extend(UserModel, superClass);

      function UserModel() {
        return UserModel.__super__.constructor.apply(this, arguments);
      }

      UserModel.tableName = 'User';

      UserModel.prototype.afterExtendData = function() {

      };

      UserModel.prototype.beforeSave = function() {

      };

      return UserModel;
    })(BaseModel);

    return UserModel;
  }]);

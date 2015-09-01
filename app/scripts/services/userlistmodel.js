'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.UserListModel
 * @description
 * # UserListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('UserListModel', [
    'AppUtils',
    'BaseListModel',
    'UserModel',
    function (
      AppUtils,
      BaseListModel,
      UserModel
    ) {
    // Service logic

    var UserListModel = (function(superClass) {
      AppUtils.extend(UserListModel, superClass);

      function UserListModel() {
        return UserListModel.__super__.constructor.apply(this, arguments);
      };

      UserListModel.tableName = 'User';
      UserListModel.ModelClass = UserModel;

      return UserListModel;
    })(BaseListModel);

    return UserListModel;
  }]);

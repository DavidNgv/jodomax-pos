'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.UserGroupListModel
 * @description
 * # UserGroupListModel
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('UserGroupListModel', [
    'AppUtils',
    'BaseListModel',
    'UserGroupModel',
    function (
      AppUtils,
      BaseListModel,
      UserGroupModel
    ) {
    // Service logic

    var UserGroupListModel = (function(superClass) {
      AppUtils.extend(UserGroupListModel, superClass);

      function UserGroupListModel() {
        return UserGroupListModel.__super__.constructor.apply(this, arguments);
      }

      UserGroupListModel.tableName = 'UserGroup';
      UserGroupListModel.ModelClass = UserGroupModel;

      return UserGroupListModel;
    })(BaseListModel);

    return UserGroupListModel;
  }]);

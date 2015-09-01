'use strict';

/**
 * @ngdoc service
 * @name jodomaxApp.Auth
 * @description
 * # Auth
 * Factory in the jodomaxApp.
 */
angular.module('jodomaxApp')
  .factory('Auth', [
    '$cookies',
    function (
      $cookies
  ) {
    // Service logic
    var keyName = 'loggedUser';

    // Public API here
    return {
      isLogin: function () {
        var user = $cookies.getObject(keyName);
        return (user !=null && user !=undefined);
      },

      setLogin: function(user) {
        $cookies.putObject(keyName, user);
      },

      getLogin: function() {
        return $cookies.getObject(keyName);
      },

      clearLogin: function() {
        $cookies.remove(keyName);
      },

      getLoginId: function() {
        var user = this.getLogin();
        if (user) return user.Id;
        else return false;
      },

      getLoginName: function() {
        var user = this.getLogin();
        if (user) return user.FullName;
        else return '';
      }
    };
  }]);

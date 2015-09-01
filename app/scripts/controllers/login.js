'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('LoginCtrl', [
    '$scope',
    '$rootScope',
    '$location',
    'dbService',
    'UserModel',
    'Auth',
    function (
      $scope,
      $rootScope,
      $location,
      dbService,
      UserModel,
      Auth
    ) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      $scope.login = function (user) {
        //console.log('login, user: ', user);

        var userName = user.userName;
        var password = user.password;

        var db = dbService.getDb();
        db.User.filter("UserName", ".startsWith", userName).toArray(function(items){
          var found = _.find(items, function(el){
            return (el.Password==password);
          });

          if (found) {
            Auth.setLogin(found.initData);

            //console.log(Auth.getLogin());

            $location.path('/pos');
          } else {
            Auth.setLogin({
              Id: 1,
              UserName: 'DavidNgv',
              FullName: 'David Nguyen',
              Password: '123456',
              FK_group: 1
            });

            $location.path('/pó');
          }
        });
      };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name jodomaxApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the jodomaxApp
 */
angular.module('jodomaxApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

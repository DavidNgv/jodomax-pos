'use strict';

describe('Controller: UserGroupCtrl', function () {

  // load the controller's module
  beforeEach(module('jodomaxApp'));

  var UserGroupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserGroupCtrl = $controller('UserGroupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

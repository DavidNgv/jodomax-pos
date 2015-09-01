'use strict';

describe('Controller: PosCtrl', function () {

  // load the controller's module
  beforeEach(module('jodomaxApp'));

  var PosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PosCtrl = $controller('PosCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

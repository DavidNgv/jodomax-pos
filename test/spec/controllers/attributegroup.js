'use strict';

describe('Controller: AttributegroupCtrl', function () {

  // load the controller's module
  beforeEach(module('jodomaxApp'));

  var AttributeGroupCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AttributeGroupCtrl = $controller('AttributegroupCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

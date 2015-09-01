'use strict';

describe('Controller: AttributeCtrl', function () {

  // load the controller's module
  beforeEach(module('jodomaxApp'));

  var AttributeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AttributeCtrl = $controller('AttributeCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

'use strict';

describe('Service: AttributeModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var AttributeModel;
  beforeEach(inject(function (_AttributeModel_) {
    AttributeModel = _AttributeModel_;
  }));

  it('should do something', function () {
    expect(!!AttributeModel).toBe(true);
  });

});

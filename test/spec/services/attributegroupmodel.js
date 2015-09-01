'use strict';

describe('Service: AttributeGroupModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var AttributeGroupModel;
  beforeEach(inject(function (_AttributeGroupModel_) {
    AttributeGroupModel = _AttributeGroupModel_;
  }));

  it('should do something', function () {
    expect(!!AttributeGroupModel).toBe(true);
  });

});

'use strict';

describe('Service: AttributeGroup', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var AttributeGroup;
  beforeEach(inject(function (_AttributeGroup_) {
    AttributeGroup = _AttributeGroup_;
  }));

  it('should do something', function () {
    expect(!!AttributeGroup).toBe(true);
  });

});

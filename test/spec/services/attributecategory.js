'use strict';

describe('Service: AttributeCategory', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var AttributeCategory;
  beforeEach(inject(function (_AttributeCategory_) {
    AttributeCategory = _AttributeCategory_;
  }));

  it('should do something', function () {
    expect(!!AttributeCategory).toBe(true);
  });

});

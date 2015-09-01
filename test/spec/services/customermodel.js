'use strict';

describe('Service: CustomerModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var CustomerModel;
  beforeEach(inject(function (_CustomerModel_) {
    CustomerModel = _CustomerModel_;
  }));

  it('should do something', function () {
    expect(!!CustomerModel).toBe(true);
  });

});

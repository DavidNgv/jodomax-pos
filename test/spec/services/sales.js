'use strict';

describe('Service: Sales', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var Sales;
  beforeEach(inject(function (_Sales_) {
    Sales = _Sales_;
  }));

  it('should do something', function () {
    expect(!!Sales).toBe(true);
  });

});

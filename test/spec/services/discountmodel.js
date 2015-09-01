'use strict';

describe('Service: DiscountModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var DiscountModel;
  beforeEach(inject(function (_DiscountModel_) {
    DiscountModel = _DiscountModel_;
  }));

  it('should do something', function () {
    expect(!!DiscountModel).toBe(true);
  });

});

'use strict';

describe('Service: DiscountListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var DiscountListModel;
  beforeEach(inject(function (_DiscountListModel_) {
    DiscountListModel = _DiscountListModel_;
  }));

  it('should do something', function () {
    expect(!!DiscountListModel).toBe(true);
  });

});

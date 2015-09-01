'use strict';

describe('Service: SalesDetailModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var SalesDetailModel;
  beforeEach(inject(function (_SalesDetailModel_) {
    SalesDetailModel = _SalesDetailModel_;
  }));

  it('should do something', function () {
    expect(!!SalesDetailModel).toBe(true);
  });

});

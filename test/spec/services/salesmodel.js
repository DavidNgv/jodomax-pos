'use strict';

describe('Service: SalesModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var SalesModel;
  beforeEach(inject(function (_SalesModel_) {
    SalesModel = _SalesModel_;
  }));

  it('should do something', function () {
    expect(!!SalesModel).toBe(true);
  });

});

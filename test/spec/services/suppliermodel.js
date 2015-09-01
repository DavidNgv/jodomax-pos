'use strict';

describe('Service: SupplierModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var SupplierModel;
  beforeEach(inject(function (_SupplierModel_) {
    SupplierModel = _SupplierModel_;
  }));

  it('should do something', function () {
    expect(!!SupplierModel).toBe(true);
  });

});

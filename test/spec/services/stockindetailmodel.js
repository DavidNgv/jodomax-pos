'use strict';

describe('Service: StockInDetailModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var StockInDetailModel;
  beforeEach(inject(function (_StockInDetailModel_) {
    StockInDetailModel = _StockInDetailModel_;
  }));

  it('should do something', function () {
    expect(!!StockInDetailModel).toBe(true);
  });

});

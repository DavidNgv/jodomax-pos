'use strict';

describe('Service: StockInModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var StockInModel;
  beforeEach(inject(function (_StockInModel_) {
    StockInModel = _StockInModel_;
  }));

  it('should do something', function () {
    expect(!!StockInModel).toBe(true);
  });

});

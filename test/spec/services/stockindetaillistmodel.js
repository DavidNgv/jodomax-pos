'use strict';

describe('Service: StockInDetailListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var StockInDetailListModel;
  beforeEach(inject(function (_StockInDetailListModel_) {
    StockInDetailListModel = _StockInDetailListModel_;
  }));

  it('should do something', function () {
    expect(!!StockInDetailListModel).toBe(true);
  });

});

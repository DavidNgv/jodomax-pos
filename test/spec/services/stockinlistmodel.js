'use strict';

describe('Service: StockInListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var StockInListModel;
  beforeEach(inject(function (_StockInListModel_) {
    StockInListModel = _StockInListModel_;
  }));

  it('should do something', function () {
    expect(!!StockInListModel).toBe(true);
  });

});

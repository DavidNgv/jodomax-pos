'use strict';

describe('Service: SalesDetailListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var SalesDetailListModel;
  beforeEach(inject(function (_SalesDetailListModel_) {
    SalesDetailListModel = _SalesDetailListModel_;
  }));

  it('should do something', function () {
    expect(!!SalesDetailListModel).toBe(true);
  });

});

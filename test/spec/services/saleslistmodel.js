'use strict';

describe('Service: SalesListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var SalesListModel;
  beforeEach(inject(function (_SalesListModel_) {
    SalesListModel = _SalesListModel_;
  }));

  it('should do something', function () {
    expect(!!SalesListModel).toBe(true);
  });

});

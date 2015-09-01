'use strict';

describe('Service: SalesDetail', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var SalesDetail;
  beforeEach(inject(function (_SalesDetail_) {
    SalesDetail = _SalesDetail_;
  }));

  it('should do something', function () {
    expect(!!SalesDetail).toBe(true);
  });

});

'use strict';

describe('Service: AppUtils', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var AppUtils;
  beforeEach(inject(function (_AppUtils_) {
    AppUtils = _AppUtils_;
  }));

  it('should do something', function () {
    expect(!!AppUtils).toBe(true);
  });

});

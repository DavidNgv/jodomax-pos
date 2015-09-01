'use strict';

describe('Service: StoreModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var StoreModel;
  beforeEach(inject(function (_StoreModel_) {
    StoreModel = _StoreModel_;
  }));

  it('should do something', function () {
    expect(!!StoreModel).toBe(true);
  });

});

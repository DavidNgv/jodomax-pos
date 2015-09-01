'use strict';

describe('Service: StoreListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var StoreListModel;
  beforeEach(inject(function (_StoreListModel_) {
    StoreListModel = _StoreListModel_;
  }));

  it('should do something', function () {
    expect(!!StoreListModel).toBe(true);
  });

});

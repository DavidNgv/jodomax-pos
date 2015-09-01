'use strict';

describe('Service: ProductListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var ProductListModel;
  beforeEach(inject(function (_ProductListModel_) {
    ProductListModel = _ProductListModel_;
  }));

  it('should do something', function () {
    expect(!!ProductListModel).toBe(true);
  });

});

'use strict';

describe('Service: CategoryListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var CategoryListModel;
  beforeEach(inject(function (_CategoryListModel_) {
    CategoryListModel = _CategoryListModel_;
  }));

  it('should do something', function () {
    expect(!!CategoryListModel).toBe(true);
  });

});

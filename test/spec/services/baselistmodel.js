'use strict';

describe('Service: BaseListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var BaseListModel;
  beforeEach(inject(function (_BaseListModel_) {
    BaseListModel = _BaseListModel_;
  }));

  it('should do something', function () {
    expect(!!BaseListModel).toBe(true);
  });

});

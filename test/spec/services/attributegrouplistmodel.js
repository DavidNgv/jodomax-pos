'use strict';

describe('Service: AttributeGroupListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var AttributeGroupListModel;
  beforeEach(inject(function (_AttributeGroupListModel_) {
    AttributeGroupListModel = _AttributeGroupListModel_;
  }));

  it('should do something', function () {
    expect(!!AttributeGroupListModel).toBe(true);
  });

});

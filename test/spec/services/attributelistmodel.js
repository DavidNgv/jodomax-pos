'use strict';

describe('Service: AttributeListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var AttributeListModel;
  beforeEach(inject(function (_AttributeListModel_) {
    AttributeListModel = _AttributeListModel_;
  }));

  it('should do something', function () {
    expect(!!AttributeListModel).toBe(true);
  });

});

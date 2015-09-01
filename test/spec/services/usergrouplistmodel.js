'use strict';

describe('Service: UserGroupListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var UserGroupListModel;
  beforeEach(inject(function (_UserGroupListModel_) {
    UserGroupListModel = _UserGroupListModel_;
  }));

  it('should do something', function () {
    expect(!!UserGroupListModel).toBe(true);
  });

});

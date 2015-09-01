'use strict';

describe('Service: UserListModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var UserListModel;
  beforeEach(inject(function (_UserListModel_) {
    UserListModel = _UserListModel_;
  }));

  it('should do something', function () {
    expect(!!UserListModel).toBe(true);
  });

});

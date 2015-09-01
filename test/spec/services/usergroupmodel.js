'use strict';

describe('Service: UserGroupModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var UserGroupModel;
  beforeEach(inject(function (_UserGroupModel_) {
    UserGroupModel = _UserGroupModel_;
  }));

  it('should do something', function () {
    expect(!!UserGroupModel).toBe(true);
  });

});

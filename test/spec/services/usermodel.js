'use strict';

describe('Service: UserModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var UserModel;
  beforeEach(inject(function (_UserModel_) {
    UserModel = _UserModel_;
  }));

  it('should do something', function () {
    expect(!!UserModel).toBe(true);
  });

});

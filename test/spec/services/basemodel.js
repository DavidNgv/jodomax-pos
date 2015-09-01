'use strict';

describe('Service: BaseModel', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var BaseModel;
  beforeEach(inject(function (_BaseModel_) {
    BaseModel = _BaseModel_;
  }));

  it('should do something', function () {
    expect(!!BaseModel).toBe(true);
  });

});

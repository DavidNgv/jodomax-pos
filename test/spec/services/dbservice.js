'use strict';

describe('Service: dbService', function () {

  // load the service's module
  beforeEach(module('jodomaxApp'));

  // instantiate service
  var dbService;
  beforeEach(inject(function (_dbService_) {
    dbService = _dbService_;
  }));

  it('should do something', function () {
    expect(!!dbService).toBe(true);
  });

});

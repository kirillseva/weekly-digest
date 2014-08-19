'use strict';

describe('Service: EightTracks', function () {

  // load the service's module
  beforeEach(module('weeklyDigestApp'));

  // instantiate service
  var EightTracks;
  beforeEach(inject(function (_EightTracks_) {
    EightTracks = _EightTracks_;
  }));

  it('should do something', function () {
    expect(!!EightTracks).toBe(true);
  });

});

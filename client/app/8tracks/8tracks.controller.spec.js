'use strict';

describe('Controller: 8tracksCtrl', function () {
  // load the controller's module
  beforeEach(module('weeklyDigestApp'));
  var c8tracksCtrl, scope;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    c8tracksCtrl = $controller('8tracksCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

'use strict';

describe('Controller: MixesCtrl', function () {

  // load the controller's module
  beforeEach(module('weeklyDigestApp'));

  var MixesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MixesCtrl = $controller('MixesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

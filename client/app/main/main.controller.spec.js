'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('weeklyDigestApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('http://8tracks.com/sets/new.json?api_key=8a19d841543a1017318d5afbc73b2fb120101e54?api_version=3')

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));
});

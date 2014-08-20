'use strict';


angular.module('weeklyDigestApp')
.controller('MainCtrl', function ($scope, $http, EightTracks) {
  $scope.EightTracks = EightTracks;

});

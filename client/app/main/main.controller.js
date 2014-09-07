'use strict';


angular.module('weeklyDigestApp')
.controller('MainCtrl', function ($scope, $http, EightTracks, Audio) {
  // first, create a play token for the user
  EightTracks.getPlayToken()
  .success(function(data) {
    $scope.playToken = data.play_token;
  })
  .error(function() {
    console.log('Unable to create play token.');
  });


  $scope.Audio = Audio;
});

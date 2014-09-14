'use strict';

angular.module('weeklyDigestApp')
  .controller('DescriptionCtrl', function ($rootScope, $scope, $http, EightTracks, Player) {
    $scope.about = '';

    $rootScope.$watch('currentMix', function(newVal, oldVal) {
      if(newVal !== null && newVal!==oldVal) {
        console.log("hello!");
        EightTracks.getSet($rootScope.currentMix.id)
        .success(function(data) {
          $rootScope.set = data.set;
          $rootScope.atLastTrack = data.set.at_last_track;
          if($rootScope.playing) {
            Player.startTrack(data.set.track);
            $rootScope.currentSkips = $rootScope.skips;
          }
        })
        .error(function() {
          console.log('Unable to retrieve set.');
        });
      }
    });

    $http.get('/api/descriptions').success(function(about) {
      $scope.about = about.desc;
    });
  });

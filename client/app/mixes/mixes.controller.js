'use strict';

angular.module('weeklyDigestApp')
  .controller('MixesCtrl', function ($rootScope, $scope, $location, $document, Player, EightTracks) {

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

    $scope.selectMix = function(mix) {
      $rootScope.currentMix = mix;
      $rootScope.albumArt = decodeURIComponent($rootScope.currentMix.cover_urls.sq500);
      $location.path("/");
    };

});

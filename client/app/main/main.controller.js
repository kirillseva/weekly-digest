'use strict';


angular.module('weeklyDigestApp')
.controller('MainCtrl', function ($document, $rootScope, $scope, $http, EightTracks, Audio, Player) {
  //get the mixes
  //for now 200 mixes maximum. If need be, will extend to 300
  // if($rootScope.mixes.length === 0) {
  //   EightTracks.getMixes(1)
  //   .success(function(data) {
  //     $rootScope.mixes = data.mix_set.mixes;
  //     $rootScope.currentMix = data.mix_set.mixes[0];
  //     // console.log($rootScope.currentMix);
  //     $rootScope.albumArt = decodeURIComponent($rootScope.currentMix.cover_urls.sq500);
  //   })
  //   .error(function() {
  //     console.log('Unable to retrieve mix.');
  //   })
  //   .then(function() {
  //     EightTracks.getMixes(2)
  //     .success(function(data) {
  //       $rootScope.mixes = $rootScope.mixes.concat(data.mixes);
  //     })
  //     .error(function() {
  //       console.log('Unable to retrieve mix.');
  //     })
  //   });
  // }

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

  $scope.pauseTrack = function() {
    Player.pause();
  };

  $scope.playTrack = function() {
    Player.play();
  };

  $scope.mute = function() {
    Player.mute();
  }

  $scope.unmute = function() {
    Player.unmute();
  }

  $scope.skipTrack = function() {
    if($rootScope.atLastTrack) {
      var index = $rootScope.mixes.indexOf($rootScope.currentMix);
      $rootScope.$apply(function() {
        if(index === $rootScope.mixes.length-1) {
          EightTracks.createNewPlayToken()
            .success(function(data) {
              //restart brah
              $rootScope.playToken = data.play_token;
              $rootScope.currentMix = $rootScope.mixes[0];
              $rootScope.albumArt = decodeURIComponent($rootScope.currentMix.cover_urls.sq500);
            })
            .error(function() {
              console.log('Unable to create play token.');
            });
        } else {
          $rootScope.currentMix = $rootScope.mixes[index+1];
          $rootScope.albumArt = decodeURIComponent($rootScope.currentMix.cover_urls.sq500);
        }
      });
    } else {
      EightTracks.skip($rootScope.currentMix.id)
        .success(function(data) {
          $rootScope.currentSkips--;
          $rootScope.set = data.set;
          $rootScope.atLastTrack = data.set.at_last_track;
          Player.startTrack(data.set.track);
        })
        .error(function(data) {
          console.log(data.notices);
        });
    }
  };

  $document.bind('keypress', function(e) {
    if(e.keyCode == 32 && $rootScope.playing) {
      Player.pause();
      $scope.$apply();
    } else if(e.keyCode == 32) {
      Player.play();
      $scope.$apply();
    }
  });


});

angular.module('weeklyDigestApp')
.run(function($rootScope, EightTracks) {
  $rootScope.mixes = [];
  $rootScope.currentMix = null;
  $rootScope.aside = false;
  $rootScope.set = null;
  $rootScope.playing = false;
  $rootScope.atLastTrack = false;
  $rootScope.skips = 3;
  $rootScope.currentSkips = 3;
  $rootScope.name = "";
  $rootScope.progress = 0;
  $rootScope.muted = false;

  EightTracks.getPlayToken()
  .success(function(data) {
    $rootScope.playToken = data.play_token;
    //for now 200 mixes maximum. If need be, will extend to 300
    if($rootScope.mixes.length === 0) {
      EightTracks.getMixes(1)
      .success(function(data) {
        $rootScope.mixes = data.mix_set.mixes;
        // delete $rootScope.mixes.length;
        console.log($rootScope.mixes);
        $rootScope.currentMix = data.mix_set.mixes[0];
        // console.log($rootScope.currentMix);
        $rootScope.albumArt = decodeURIComponent($rootScope.currentMix.cover_urls.sq500);
      })
      .error(function() {
        console.log('Unable to retrieve mix.');
      })
      .then(function() {
        EightTracks.getMixes(2)
        .success(function(data) {
          $rootScope.mixes = $rootScope.mixes.concat(data.mixes);
        })
        .error(function() {
          console.log('Unable to retrieve mix.');
        })
      });
    }
  })
  .error(function() {
    console.log('Unable to create play token.');
  });
});

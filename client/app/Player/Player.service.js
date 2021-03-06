  'use strict';

  angular.module('weeklyDigestApp')
  .service('Player', function ($rootScope, $document, Audio, EightTracks) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var player = {
      startTrack: function(track) {
        Audio.pause();
        Audio.src = track.track_file_stream_url;
        Audio.play();
        $rootScope.name = track.performer + " - " + track.name;
        $rootScope.playing = true;
        track.reported = false;
      },
      play: function() {
        if($rootScope.progress > 0) {
          Audio.play();
          $rootScope.playing = true;
        } else {
          this.startTrack($rootScope.set.track);
        }
      },
      pause: function() {
        $rootScope.playing = false;
        Audio.pause();
      },
      mute: function() {
        $rootScope.muted = true;
        Audio.volume = 0;
      },
      unmute: function() {
        $rootScope.muted = false;
        Audio.volume = 1;
      },
      onTimeUpdate: function() {
        $rootScope.progress = (this.currentTime / this.duration) * 100;
        if ($document[0].getElementById('progress') != null) {
          $document[0].getElementById('progress').style.width = $rootScope.progress.toString() + "%";
        };
        if(Math.floor(this.currentTime) === 30 && $rootScope.set.track.reported === false) {
          EightTracks.reportSong($rootScope.set.track.id, $rootScope.currentMix.id);
          $rootScope.set.track.reported = true;
          console.log("logged");
          console.log($rootScope.set.track.id, $rootScope.currentMix.id);
        }
      },
      next: function() {
        console.log("next song!");
        if($rootScope.atLastTrack) {
          var index = $rootScope.mixes.indexOf($rootScope.currentMix);
          $rootScope.$apply(function() {
            if(index === $rootScope.mixes.length-1) {
              //restart
              EightTracks.createNewPlayToken()
              .success(function(data) {
                $rootScope.playToken = data.play_token;
                $rootScope.currentMix = $rootScope.mixes[0];
                $rootScope.albumArt = decodeURIComponent($rootScope.currentMix.cover_urls.sq500);
              })
              .error(function() {
                console.log('Unable to create play token.');
              });
            } else {
              //next mix
              console.log("next mix!");
              $rootScope.currentMix = $rootScope.mixes[index+1];
              $rootScope.albumArt = decodeURIComponent($rootScope.currentMix.cover_urls.sq500);
            }
          });
        } else {
          EightTracks.next($rootScope.currentMix.id)
          .success(function(data) {
            $rootScope.set = data.set;
            $rootScope.playing = true;
            $rootScope.atLastTrack = data.set.at_last_track;
            Audio.src = data.set.track.track_file_stream_url;
            $rootScope.name = data.set.track.performer + " - " + data.set.track.name;
            Audio.play();
          })
          .error(function() {
            console.log('Unable to go to the next song.');
          });
        }
      }
    };

    Audio.addEventListener('timeupdate', player.onTimeUpdate);
    Audio.addEventListener('ended', player.next);
    return player;
  });

'use strict';
var api = '8a19d841543a1017318d5afbc73b2fb120101e54';
var username = 'kirillseva';
var smart_id = 'dj:9338738';

angular.module('weeklyDigestApp')
  .service('EightTracks', function ($http, $document, Audio) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var EightTracks = {};
    $http.get('http://8tracks.com/users/'+ username +'/mixes.json?api_key=' + api + '?api_version=3').success(function(all_mixes) {
      var latest_mix = all_mixes.mix_set.mixes[1];
      var mix_id = latest_mix.id;
      EightTracks.name = latest_mix.name;
      EightTracks.picture = latest_mix.cover_urls.sq250;
      // in order to play songs, we need to create a token
      $http.get('http://8tracks.com/sets/new.json?api_key=' + api + '?api_version=3').success(function(new_scope) {
        // Now, time to get the mix itself
        var token = new_scope.play_token;
        $http.get('http://8tracks.com/sets/'+ token +'/play.json?mix_id='+mix_id+'?api_key=' + api + '?api_version=3').success(function(mix) {
          // EightTracks.resp = mix;
          var url = mix.set.track.track_file_stream_url;
          // EightTracks.resp = url;
          EightTracks.audio = Audio;
          EightTracks.audio.src = url;          
        });
      });


    });


    return EightTracks;
  });

'use strict';
var api = 'api_key=8a19d841543a1017318d5afbc73b2fb120101e54?api_version=3';
var username = 'kirillseva';
var djId = 'dj:9338738';

angular.module('weeklyDigestApp')
.service('EightTracks', function ($rootScope, $http, $document) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var EightTracks = {
    getPlayToken: function() {
      return $http.get("http://8tracks.com/sets/new.json?" + api)
    },
    getMixes: function(page) {
      return $http.get("http://8tracks.com/mix_sets/" + djId + ".json?include=mixes&page=" + page + "&per_page=100&" + api);
    },
    getSet: function(mix) {
      return $http.get("http://8tracks.com/sets/" + $rootScope.playToken + "/play.json?mix_id=" + mix + "&" + api);
    },
    skip: function(mix) {
      return $http.get("http://8tracks.com/sets/" + $rootScope.playToken + "/skip.json?mix_id=" + mix + "&" + api);
    },
    next: function(mix) {
      return $http.get("http://8tracks.com/sets/" + $rootScope.playToken + "/next.json?mix_id=" + mix + "&" + api);
    },
    reportSong: function(track_id, mix_id) {
      return $http.get("http://8tracks.com/sets/" + $rootScope.playToken + "/report.xml?track_id=" + track_id + "&mix_id=" + mix_id);
    }
  };
  return EightTracks;
});

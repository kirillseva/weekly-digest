'use strict';
var api = '8a19d841543a1017318d5afbc73b2fb120101e54';
var username = 'kirillseva';
var smart_id = 'dj:9338738';

angular.module('weeklyDigestApp')
.controller('MainCtrl', function ($scope, $http) {
  $scope.resp = "";
  $scope.picture = "";

  $http.get('http://8tracks.com/users/'+ username +'/mixes.json?api_key=' + api + '?api_version=3').success(function(all_mixes) {
    var latest_mix = all_mixes.mix_set.mixes[1];
    var mix_id = latest_mix.id;
    $scope.name = latest_mix.name;
    $scope.picture = latest_mix.cover_urls.sq500;

    // Now, time to get the mix itself
    $http.get('http://8tracks.com/mixes/'+ mix_id +'.json?api_key=' + api + '?api_version=3').success(function(mix) {
      $scope.resp = mix;
    });

  });
});

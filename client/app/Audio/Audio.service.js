'use strict';

angular.module('weeklyDigestApp')
  .service('Audio', function ($document) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var audio = $document[0].getElementById("music-player");
    if (audio === null) {
      audio = $document[0].createElement('audio');
      audio.setAttribute('id', 'music-player');
      $document[0].getElementsByTagName('body')[0].appendChild(audio);
    }
    return audio;
  });

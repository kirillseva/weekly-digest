'use strict';

angular.module('weeklyDigestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('mixes', {
        url: '/mixes',
        templateUrl: 'app/mixes/mixes.html',
        controller: 'MixesCtrl'
      });
  });
'use strict';

angular.module('weeklyDigestApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('description', {
        url: '/about',
        templateUrl: 'app/description/description.html',
        controller: 'DescriptionCtrl'
      });
  });
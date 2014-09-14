'use strict';

angular.module('weeklyDigestApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    {
      'title': 'Player',
      'link': '/'
    },
    {
      'title': 'Mixes',
      'link': '/mixes'
    },
    {
      'title': 'About',
      'link': '/about'
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

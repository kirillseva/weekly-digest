'use strict';

angular.module('weeklyDigestApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [
    {
      'title': 'About',
      'link': '#'
    },
    {
      'title': 'Blog',
      'link': '#'
    },
    {
      'title': 'Donate',
      'link': '#'
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });

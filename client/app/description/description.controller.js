'use strict';

angular.module('weeklyDigestApp')
  .controller('DescriptionCtrl', function ($scope, $http) {
    $scope.about = '';

    $http.get('/api/descriptions').success(function(about) {
      $scope.about = about.desc;
    });
  });

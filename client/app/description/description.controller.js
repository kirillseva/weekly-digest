'use strict';

angular.module('weeklyDigestApp')
  .controller('DescriptionCtrl', function ($scope, $http) {
    $scope.about = 'Hello';

    $http.get('/api/descriptions').success(function(about) {
      $scope.about = about.desc;
    });
  });

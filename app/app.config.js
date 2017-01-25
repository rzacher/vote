angular.
  module('personApp').
  config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/voteform', {
          template: '<voteform></voteform>'
        }).
        when('/vote', {
          template: '<vote></vote>'
        }).
        when('/admin', {
          template: '<admin></admin>'
        }).
        otherwise('/voteform');
    }
  ]);
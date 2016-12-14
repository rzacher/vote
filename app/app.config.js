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
        when('/save_data', {
          //console.log("in save_data"); 
          template: '<vote></vote>'
        }).
        otherwise('/voteform');
    }
  ]);
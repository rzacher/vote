'use strict';

// Define the `phonecatApp` module
var personApp = angular.module('personApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
personApp.controller('PersonListController', function PersonListController($scope) {
  $scope.persons = [
    {
      name: 'Bob',
      value: '10'
    }, {
      name: 'Murry',
      value: '8'
    }, {
      name: 'Scott',
      value: '9'
    }
  ];
});

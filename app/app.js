'use strict';

// Define the `phonecatApp` module
var personApp = angular.module('personApp', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
personApp.controller('PersonListController', function PersonListController($scope) {
  $scope.persons = [
    {
      name: 'Bob',
      value: 10
    }, {
      name: 'Murry',
      value: 8
    }, {
      name: 'Scott',
      value: 9
    }, {
      name: 'Lester',
      value: 11
    }
  ];


  $scope.getTotal = function() {
		var total = 0;
		for(var i = 0; i < $scope.persons.length; i++) {
		    total += $scope.persons[i].value;
		}
		var length = $scope.persons.length;
        return total/length; 
   }

});

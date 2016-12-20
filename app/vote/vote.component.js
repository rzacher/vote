'use strict';

// Define the `phonecatApp` module
angular.
module('vote').
component('vote', {
  templateUrl: 'vote/vote.template.html',

// Define the `PhoneListController` controller on the `personApp` module
controller: ['$routeParams', function VoteController($routeParams) {
   var self = this; 
   this.firstName = '1-test';
   var foo = JSON.stringify($routeParams);
   console.log("foo: " + foo);
 
   console.log("name1: " + this.firstName);
   this.persons = [
    {
      name: this.firstName,
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

   this.getTotal = function() {
      var total = 0;
       for (var i = 0; i < this.persons.length; i++) {
           total += this.persons[i].value;
       }
       var length = this.persons.length;
           return total/length; 
    }
  }] // end controller
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


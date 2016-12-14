'use strict';

// Define the `phonecatApp` module
angular.
module('vote').
component('vote', {
  templateUrl: 'vote/vote.template.html',

// Define the `PhoneListController` controller on the `personApp` module
controller: function VoteController() {
   this.persons = [
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

   this.getTotal = function() {
      var total = 0;
       for (var i = 0; i < this.persons.length; i++) {
           total += this.persons[i].value;
       }
       var length = this.persons.length;
           return total/length; 
    }
  } // end controller
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


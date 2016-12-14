'use strict';

// Define the `phonecatApp` module
angular.module('voteform').
component('voteform', {
  templateUrl: 'voteform/voteform.template.html',
  controller: ['$routeParams',
     function voteformController($routeParams) {
        //this.phoneId = $routeParams.phoneId;
      }  
  ]
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


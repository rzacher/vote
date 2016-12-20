'use strict';

// Define the `phonecatApp` module
angular.module('voteform').
component('voteform', {
  templateUrl: 'voteform/voteform.template.html',
  controller: ['$routeParams', 
     function voteformController($routeParams) {
     	var self = this; 

     	self.reset = function reset() {
     		    //$log.debug('reset');
     			self.name = "bob";
     			self.value = "";
     	}; 
     	
        //this.phoneId = $routeParams.phoneId;
      }  
  ]
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


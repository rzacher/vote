'use strict';

// Define the `phonecatApp` module
angular.module('voteform').
component('voteform', {
  templateUrl: 'voteform/voteform.template.html',
  controller: ['$routeParams', '$log',
     function voteformController($routeParams, $log) {
     	var self = this; 

     	self.reset = function reset() {
     		    //$log.debug('reset');
     			self.name = "bob";
     			self.value = "58";
     			$log.debug("reset function called"); 
     	}; 
     	
        //this.phoneId = $routeParams.phoneId;
      }  
  ]
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


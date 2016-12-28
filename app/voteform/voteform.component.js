'use strict';

// Define the `phonecatApp` module
angular.module('voteform').
component('voteform', {
  templateUrl: 'voteform/voteform.template.html',
  controller: ['$routeParams', '$log', '$http', '$window',
     function voteformController($routeParams, $log, $http, $window) {
       	var self = this; 
       	self.reset = function reset() {
          var url = 'http://localhost:8081/save_data?name=' + self.name + '\&value='+self.value;
          console.log(url); 
          $http.get(url).then(function(response) {
              console.log(JSON.stringify(response.data.data));
              $window.location.href = '/#!/vote';
          });
       		//$log.debug('reset');
       	$log.debug("reset function called"); 
       	}; 
      }  
  ]
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


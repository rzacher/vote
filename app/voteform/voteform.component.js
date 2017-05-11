'use strict';

// Define the `phonecatApp` module
angular.module('voteform').
component('voteform', {
  templateUrl: 'voteform/voteform.template.html',
  controller: ['$routeParams', '$log', '$http', '$window',
     function voteformController($routeParams, $log, $http, $window) {
       	var self = this; 
       	self.save = function reset() {
          $log.debug("client rest call on save_data");
          var url = 'votes';
          $log.debug(url); 
          var dataObj = {
            name: self.name,
            value: self.value
          };
          //console.log(JSON.stringify(dataObj));

          var postObject = new Object();
          postObject.name = self.name;
          postObject.value = self.value;
          $log.debug(postObject);
        // $http({
        //   url: 'save_data',
        //   dataType: 'json',
        //   method: 'POST',
        //   data: postObject,
        //   headers: {
        //       "Content-Type": "application/json"
        //   }
        // }).success(function(response) {
        //   $log.debug(response);
        //   console.log(JSON.stringify(response.data.data));
        //   $window.location.href = '/#!/vote';
        // }).error(function(error){
        //     $log.debug(error);
        // });


          var res = $http({
            url: 'votes',
            dataType: 'json',
            method: 'POST',
            data: postObject,
            headers: {
                "Content-Type": "application/json"
            }
          }).then(function(response) {
              //console.log(JSON.stringify(response.data.data));
              $window.location.href = '/#!/vote';
          });
          res.success(function(data, status, headers, config) {
                $scope.message = data;
              });
          res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
           }); 

       	$log.debug("save function called"); 
       	}; 
      }  
  ]
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


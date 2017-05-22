'use strict';

// Define the `phonecatApp` module
angular.module('login').
component('login', {
  templateUrl: 'login/login.template.html',
  controller: ['$routeParams', '$log', '$http', '$window',
     function loginController($routeParams, $log, $http, $window) {
       	var self = this; 

//myApp.controller('UserCtrl', function ($scope, $http, $window) {
  //$scope.user = {username: 'john.doe', password: 'foobar'};
  // self.message = '';
  // $scope.submit = function () {
  //   $http
  //     .post('/authenticate', $scope.user)
  //     .success(function (data, status, headers, config) {
  //       $window.sessionStorage.token = data.token;
  //       $scope.message = 'Welcome';
  //     })
  //     .error(function (data, status, headers, config) {
  //       // Erase the token if the user fails to log in
  //       delete $window.sessionStorage.token;

  //       // Handle login errors here
  //       $scope.message = 'Error: Invalid user or password';
  //     });
  // };



   self.submit = function submit() { 
     console.log("POST /users/login ");
     $log.info("POST /users/login");
     alert( " POST /users/login " +  self.username + " " + self.password);

     var postObject = new Object();
          postObject.email = self.username;
          postObject.password = self.password;
    
    var res = $http({
            url: "users/login",
            dataType: 'json',
            method: 'POST',
            data: postObject,
            headers: {
                "Content-Type": "application/json",
            }
          });

        //res.then(function(response) {
          res.then(function(response) {
                 //alert(JSON.stringify(headers)); 

                 alert("login succeeded" + JSON.stringify(response.data));
                 //alert(JSON.stringify(response.headers()));
                 
                 var headers = response.headers();
                 alert("headers:" +JSON.stringify(headers));
                 var token = headers["auth"];
                 console.log(JSON.stringify(token));
                 alert("auth:" + JSON.stringify(token));
                  
                 $window.sessionStorage.token = token;
          });

          //   console.log("login response");
          //     console.log(JSON.stringify(response.data.data));
          //     alert(JSON.stringify(response.data.headers));)
          //     alert(JSON.stringify(response.Headers.Auth)); 
          //     //$window.sessionStorage.token = response.data.token;
          //     //$window.location.href = '/#!/vote';
          // }).success(function(data, status, headers, config) {
          //        alert("login succeeded");
          //        alert(JSON.stringify(headers)); 
          //        $window.sessionStorage.token = data.token;
          // }).error(function(data, status, headers, config) {
          //       alert( "failure message: " + JSON.stringify({data: data}));
          //       delete $window.sessionStorage.token;
          //  }); 



     // $http
     //  .post('/users/login', postObject)
     //  .success(function (data, status, headers, config) {
     //    alert("login succeeded "  + JSON.stringify(data));
     //    alert("data.headers"  + JSON.stringify(data.headers()) );
     //    alert("login succeeded "  + JSON.stringify(headers));
     //    alert("login succeeded "  + JSON.stringify(status));
     //    alert("login succeeded "  + JSON.stringify(config.headers));
     //    //$window.sessionStorage.token = data.token;
     //    //$scope.message = 'Welcome';
     //  })
     //  .error(function (data, status, headers, config) {
     //    // Erase the token if the user fails to log in
     //    delete $window.sessionStorage.token;

     //    // Handle login errors here
     //    //$scope.message = 'Error: Invalid user or password';
     //  });
     console.log("POST completed");
    };




  //         $log.debug("client rest call on save_data");
  //         var url = 'votes';
  //         $log.debug(url); 
  //         var dataObj = {
  //           name: self.name,
  //           value: self.value
  //         };
  //         //console.log(JSON.stringify(dataObj));

  //         var postObject = new Object();
  //         postObject.name = self.name;
  //         postObject.value = self.value;
  //         $log.debug(postObject);
  //       // $http({
  //       //   url: 'save_data',
  //       //   dataType: 'json',
  //       //   method: 'POST',
  //       //   data: postObject,
  //       //   headers: {
  //       //       "Content-Type": "application/json"
  //       //   }
  //       // }).success(function(response) {
  //       //   $log.debug(response);
  //       //   console.log(JSON.stringify(response.data.data));
  //       //   $window.location.href = '/#!/vote';
  //       // }).error(function(error){
  //       //     $log.debug(error);
  //       // });

         
  //         var res = $http({
  //           url: 'votes',
  //           dataType: 'json',
  //           method: 'POST',
  //           data: postObject,
  //           headers: {
  //               "Content-Type": "application/json",
  //               "Auth": token
  //           }
  //         }).then(function(response) {
  //             //console.log(JSON.stringify(response.data.data));
  //             $window.location.href = '/#!/vote';
  //         });
  //         res.success(function(data, status, headers, config) {
  //               $scope.message = data;
  //             });
  //         res.error(function(data, status, headers, config) {
  //               alert( "failure message: " + JSON.stringify({data: data}));
  //          }); 

  //      	$log.debug("save function called"); 
  //      	}; 
       }  
   ]
});
 
  //$scope.addUser = function() {
 //   storage.setItemSync('persons', $scope.persons); 
 // }


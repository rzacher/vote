'use strict';


// Define the `phonecatApp` module
angular.
module('vote').
component('vote', {
  templateUrl: 'vote/vote.template.html',
 //require: {
 //   parent: '^node-persist'
 // }, 

// Define the `PhoneListController` controller on the `personApp` module
// To call this use http://localhost:8000/#!/save_data/bob
controller: ['$routeParams', '$localStorage', '$http',  function VoteController($routeParams, $localStorage, $http) {
   var self = this; 

   //self.storage.initSync(); 

   this.firstName = '1-test';
   
   var foo = JSON.stringify($routeParams);
   console.log("foo: " + foo);
 
   console.log("name1: " + this.firstName);

   //this.createData(foo.name, 58);

   
   $http.get('http://localhost:8081/get_data').then(function(response) {
        console.log(JSON.stringify(response.data.data));
        self.persons = response.data.data; 
        self.total = 0; 
        var i; 
        for (i=0; i < self.persons.length; i++) {
          self.total += Number(self.persons[i].value);
          self.average = self.total/self.persons.length; 
        }
       // self.persons = [{name: response.data[0].name, 
        //                  value: 10
         //           }];
        console.log(self.persons);
   });
   

   
/**
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
  **/
/**
  this.createData = function createData(name, value) {
    var data = storage.getItemSync("data");
    console.log(data);
    if (data === undefined) {
      data = []; 
    }
    var entry = {name: name, value: value}
    console.log(entry);
    data.push(entry); 
    
    storage.setItemSync("data", data);
  }
**/


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


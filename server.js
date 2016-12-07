console.log('starting persist');

var storage = require('node-persist');
var express = require('express');
var app = express();

storage.initSync(); 

app.get('/index.html', function (req, res) {
   console.log("in get")
   res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/', function (req, res) {
   res.send('persist app');
})

function createData(name, value) {
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

function readData(name) {
   var data = storage.getItemSync("data");
   if (name === undefined) {
      return data; 
   } else {
      return data; // Find the data for name here
   }
}

function testData() {
	console.log("Data in");
	console.log(data);
	createData('Bob', 10);
	var data = readData();
	console.log("Data out");
	console.log(data);
}


app.get('/save_data', function (req, res) {
   // Prepare output in JSON format
   var name = req.query.name;
   var value = req.query.value
   console.log("name:" + name + " value: " + value);
   response = {
      name:req.query.name,
      value:req.query.value
   };
   console.log(response);
   createData(name, value);
   var data = readData(name);
   res.end(JSON.stringify(data));
})

app.get('/get_data', function (req, res) {
	var name = req.query.name;
	var data = readData(name);
	console.log(data); 
   // Prepare output in JSON format
   response = {
      name:name,
      data:data
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})
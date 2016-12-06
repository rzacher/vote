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

function createData(name, data) {
  storage.setItemSync(name, data);
}

function readData(name) {
   var data = storage.getItemSync(name);
   return data; 
}

function testData() {
	data = {name: 'Bob', vote: 10};

	console.log("Data in");
	console.log(data);
	createData(data);
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
   res.end(JSON.stringify(response));
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
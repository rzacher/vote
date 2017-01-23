console.log('starting persist');

var storage = require('node-persist');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var _ = require('underscore');
var app = express();
app.use(express.static(__dirname + "/app"));
app.use(bodyParser.json());
app.use(methodOverride());

storage.initSync(); 

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

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


function deleteData() {
  // Set the data to an empty array
  storage.setItemSync("data", []);
}

function testData() {
	console.log("Data in");
	console.log(data);
	createData('Bob', 10);
	var data = readData();
	console.log("Data out");
	console.log(data);
}


app.post('/save_data', function (req, res) {
   // Prepare output in JSON format
   console.log("req");
   console.log(req);
   var body = req.body;
   console.log('in save_data');
   //console.log(JSON.stringify(body)); 
   // use _.pick to only pick description and completed. 
   body = _.pick(body, 'name', 'value');
   console.log("name:" + body.name + " value: " + body.value);
   response = {
      name:body.name,
      value:body.value
   };
   res.header("Access-Control-Allow-Origin", "*");
   console.log(response);
   createData(body.name, body.value);
   var data = readData(body.name);
   res.end(JSON.stringify(data));
})

app.get('/get_data', function (req, res) {
	var name = req.query.name;
	var data = readData(name);
	console.log(data); 
   // Prepare output in JSON format
   response = {
      name:"get_data",
      data:data
   };
   res.header("Access-Control-Allow-Origin", "*"); 

   console.log(response);
   res.end(JSON.stringify(response));
})

app.get('/delete_data', function (req, res) {
  console.log("delete_data");
  deleteData(); 
  var response = "Data deleted";
  res.header("Access-Control-Allow-Origin", "*"); 
  res.end(response);
})

 
   app.get('*', function(req, res) {
       res.sendFile('/app/index.html', {root: __dirname}); // load the single view file (angular will handle the page changes on the front-end)
   });

var server = app.listen(process.env.PORT || 3000, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)

})

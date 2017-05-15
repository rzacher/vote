console.log('starting vote app');
// Old
var storage = require('node-persist');
//var express = require('express');
//var bodyParser = require('body-parser');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var _ = require('underscore');
//var app = express();
//app.use(express.static(__dirname + "/app"));
//app.use(bodyParser.json());
//app.use(methodOverride());

storage.initSync(); 

// new
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore'); 
var db = require('./db.js');
var bcrypt = require('bcrypt');
var middleware = require('./middleware.js')(db);

var app = express();
app.use(express.static(__dirname + "/app"));
//app.use(bodyParser.json());
app.use(methodOverride());
var PORT = process.env.PORT || 3000;

var votes = [];
var voteNextId = 1;

app.use(bodyParser.json());

// Get /
app.get('/', function(req, res) {
 
  res.send('vote API root'); 
});

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

/*
function createData(name, value) {
  var data = storage.getItemSync("data");
  console.log(data);
  if (data === undefined) {
    data = []; 
  }
  var lastId = storage.getItemSync("lastId");
  if (lastId === undefined) {
    lastId = -1; 
  }
  lastId = lastId + 1;
  console.log("lastId:" + lastId);
  var id = lastId; 
  console.log("id:" + id);
  var entry = {id: id, name: name, value: value}
  console.log(entry);
  data.push(entry); 
  
  storage.setItemSync("data", data);
  storage.setItemSync("lastId", id);
}

function readData(id) {
   var p = new Promise(function(resolve, reject) {
      var data = storage.getItemSync("data");
      if (id === undefined) {
          resolve(data); 
      } else {
          data.forEach(function(entry) {
            //console.log("entry: " + entry.id + " id: " + id); 
            if (entry.id === parseInt(id)) {
              console.log("id match: " + id + " entry: " + JSON.stringify(entry)); 
              return resolve(entry); 
            } 
          });
      }
      reject("No vote found for id"); 
   });
   return p; 
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
   //console.log("req");
   //console.log(req);
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

app.get('/votes/:id', function (req, res) {
  var id = req.params.id;
  console.log("id: " + id);
	var name = req.query.name;
	readData(id).then(function(data) {
    console.log("return from readData: " + data); 
   // Prepare output in JSON format
   response = data;
   res.header("Access-Control-Allow-Origin", "*"); 
   //res.header("Access-Control-Allow-Origin: editor.swagger.io", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

   console.log(data);
   res.end(JSON.stringify(data));
     
  }).catch(function() {
    //  error
     console.log("erorr in votes/id"); 
  });

  
})

app.get('/votes', function (req, res) {
  var name = req.query.name;
  readData().then(function(data) {
    var data_array = data
    console.log(data); 
     // Prepare output in JSON format
     response = data_array;
     res.header("Access-Control-Allow-Origin", "*"); 
     //res.header("Access-Control-Allow-Origin: editor.swagger.io", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

     console.log(data_array);
     res.end(JSON.stringify(data_array));
   }).catch(function() {
     // error 
     console.log("erorr in votes"); 
  });
})




app.delete('/votes/:id', function (req, res) {
  console.log("delete_data");
  deleteData(); 
  var response = "Data deleted";
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Origin: editor.swagger.io", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end(response);
})

app.delete('/votes', function (req, res) {
  console.log("delete_data");
  deleteData(); 
  var response = "Data deleted";
  res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Origin: editor.swagger.io", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.end(response);
})
*/
// New stuff based on todo-api
// GET /votes?completed = true&q=house
//app.get('/votes', middleware.requireAuthentication, function (req, res) {
app.get('/votes', middleware.requireAuthentication,  function (req, res) {
  var query = req.query; 
  var where = {
    userId: req.user.get('id')
  };

  // if (query.hasOwnProperty('name') && query.name !== undefined) {
  //   where.name = name;
  // } 

    // if (query.hasOwnProperty('q') && query.q.length > 0) {
    //   where.description = {
    //       $like: '%' + query.q + '%'
    //     };
    // }

  db.vote.findAll({where: where}).then(function (votes) {
           res.header("Access-Control-Allow-Origin", "*"); 
           res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
           res.json(votes);
       }, function (e) {
         res.status(500).send(); 
     });
});
// GET /votes/:id
//app.get('/votes/:id', middleware.requireAuthentication, function (req, res) {
app.get('/votes/:id', middleware.requireAuthentication, function (req, res) {
  var voteId = parseInt(req.params.id, 10);
  var where = {
    userId: req.user.get('id'),
    id: voteId
  };

   db.vote.findOne({where: where}).then(function (vote) {
     if (!!vote) {
           res.header("Access-Control-Allow-Origin", "*"); 
           res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
           res.json(vote.toJSON());
         } else {
          res.status(404).send(); 
         }
       }, function (e) {
         res.status(500).json(e).send();
         console.log(e); 
     });

});

// POST /votes
//app.post('/votes', middleware.requireAuthentication, function(req, res) {
app.post('/votes', middleware.requireAuthentication,  function(req, res) {

  console.log('start votes');
  // use _.pick to only pick description and completed. 
  var body = _.pick(req.body, 'name', 'value');
  console.log("in app.post");
  console.log(body);  
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    db.vote.create(body).then(function (vote) {
               req.user.addVote(vote).then( function() {
                 return vote.reload();
               }).then(function(vote){
                 res.json(vote.toJSON());
               })
            }, function (e) {
              res.status(400).json(e);
              console.log(e); 
            });
});

// DELETE /votes/:id
//app.delete('/votes/:id', middleware.requireAuthentication, function (req, res) {
app.delete('/votes/:id', middleware.requireAuthentication, function (req, res) {
  var voteId = parseInt(req.params.id, 10);
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  db.vote.destroy({
    where: {
      userId: req.user.get('id'),
      id:voteId
    }
  }).then(function (rowsDeleted) {
    if (rowsDeleted === 0) {
      res.status(404).json({
        error: 'No vote with id'
      });
    } else {
      res.status(204).send(); 
    }
  }, function (e) {
    res.status(500).send();
  }); 
});

// DELETE /votes
//app.delete('/votes/, middleware.requireAuthentication, function (req, res) {
app.delete('/votes', middleware.requireAuthentication, function (req, res) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
  var body = _.pick(req.body, 'password');
  console.log("in votes delete: pw:" + body.password);
  
  db.vote.destroy({
    where: {
      userId: req.user.get('id'),
    }
  }).then(function (rowsDeleted) {
    if (rowsDeleted === 0) {
      res.status(404).json({
        error: 'No vote with id'
      });
    } else {
      res.status(204).send(); 
    }
  }, function (e) {
    res.status(500).send();
  }); 
});


// PUT  /votes/:id
//app.put('/votes/:id', middleware.requireAuthentication, function(req, res) {
app.put('/votes/:id',  middleware.requireAuthentication, function(req, res) {
  console.log("entering put"); 
  var voteId = parseInt(req.params.id, 10);
  body = _.pick(req.body, 'name', 'value');
  var attributes = {}; 

  console.log("input: " + req.body.name + ", " + req.body.value); 
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (body.hasOwnProperty('name')) {
    attributes.name = body.name; 
  } 

  if (body.hasOwnProperty('value')) {
    attributes.value = body.value; 
  } 
 
    db.vote.findOne({
      where: {
        userId: req.user.get('id'),
      id:voteId
      }
    }).then(function(vote) {
      if (vote) {
          vote.update(attributes).then(function(vote) {
            res.json(vote.toJSON());
          }, function(e) {
          res.status(400).json(e);;
          });
      } else {
        res.status(404).send();
      }
    }, function() {
       res.status(500).send();
    });
});

 
app.get('*', function(req, res) {
  res.sendFile('/app/index.html', {root: __dirname}); // load the single view file (angular will handle the page changes on the front-end)
});

// var server = app.listen(process.env.PORT || 3000, function () {
//    var host = server.address().address;
//    var port = server.address().port;
//    console.log("Example app listening at http://%s:%s", host, port);
// })


// POST /votes
app.post('/users', function(req, res) {
  console.log('post users');
  // use _.pick to only pick description and completed. 
  var body = _.pick(req.body, 'email', 'password');
  console.log(body);  

    db.user.create(body).then(function (user) {
               res.json(user.toPublicJSON());
            }, function (e) {
              res.status(400).json(e);
              console.log(e); 
            });
});

// POST /users/login
app.post('/users/login', function(req, res) {
  var where = {};
  console.log('post /users/login');
  // use _.pick to only pick description and completed. 
  var body = _.pick(req.body, 'email', 'password');
    var userInstance; 

    db.user.authenticate(body).then(function (user) {
    console.log(user.toPublicJSON());
    var token = user.generateToken('authentication');
    userInstance = user; 

    return db.token.create({
        token: token
    });
  }).then(function(tokenInstance) {
     console.log("token:");
     console.log(tokenInstance.get('token'));
       res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
  }).catch(function() {
      res.status(401).send(); 
  });
});

//DELETE /users/login
app.delete('/users/login', middleware.requireAuthentication,  function (req,res) {
   req.token.destroy().then(function () {
     res.status(204).send(); 
   }).catch(function() {
      res.status(500).send(); 
   }); 
}); 

//db.sequelize.sync({force:true}).then(function() {
db.sequelize.sync().then(function() { 
  app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!');
  });
});

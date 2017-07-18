require('dotenv').config();
var express = require('express'),
    jwt     = require('jsonwebtoken'),
    cors    = require('cors'),
    secrets = require('./config/secrets'),
    app     = express(),
    port    = process.env.PORT || 8080,
    mongoose= require('mongoose'),
    bodyParser = require('body-parser'),
    db      = require('./config/db'),
    router = express.Router(),
    api    = require('./app/routes/api')(router);
    path = require('path'),
    morgan  = require('morgan');

db.dbconnect();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));



// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://127.0.0.1:27017/numii', function(err){
//   if (err){
//     console.log('Not Connected to DB'+ err);
//   }else {
//     console.log('Connected to DB');
//   }
// });

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.use('/api', api);

app.get('*', function(req, res, next){

  res.sendFile(path.resolve(__dirname + '/public/app/views/index.html'));
});
app.listen(port, function(){
  console.log('Running on port ' + port);
});

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
    path = require('path'),
    multer = require('multer'),
    api    = require('./app/routes/api')(router);
    morgan  = require('morgan');


db.dbconnect();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.use('/api', api);

app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function() {
  console.log('Running on port ' + port);
});

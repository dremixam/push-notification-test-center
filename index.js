'use strict';
// imports =====================================================================

var config = require('./config.json');

// Ces imports sont utiles pour le système de logging
var log4js = require('log4js');
log4js.replaceConsole();

var log = log4js.getLogger('index.js');

// Évidemment on a besoin de express et de socket.io
var express = require('express'); // load express
var app = express(); // create express app
var server = require('http').createServer(app); // create webserver
var bodyParser = require('body-parser')

app.use(log4js.connectLogger(log, {
  level: 'auto'
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));

// routes ======================================================================
require('./app/')(app);


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/www/index.html');
});

// listen (start app with node server.js) ======================================
server.listen(config.port, config.ip);
log.info('App listening on ' + config.ip + ':' + config.port);

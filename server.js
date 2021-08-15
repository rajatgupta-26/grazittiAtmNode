'use strict';
//dependencies
const express = require('express'),
  bodyParser = require('body-parser');

const routes = require('./routes.js'),
  envConfig = require('./config/environment.js');

const app = express();
const router = express.Router();
try {
  routes.initRoutes(router);
} catch (err) {
  console.error('Error while initiating the application. Routing Error', err);
}

app.use(bodyParser.json({ limit: '5mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
// NOTE: used for CORS
app.all('*', function(req, res, next) {
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  if ('OPTIONS' === req.method) return res.send(200);
  next();
});

app.use('/', router);

app.use(express.static('public'));

app.listen(envConfig.port, function() {
  console.log('Server started and listening on port: ' + envConfig.port);
});
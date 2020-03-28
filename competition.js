// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const passport = require('passport');
// Get our API routes
const api = require('./server/routes/api');
const app = express();

require('events').EventEmitter.prototype._maxListeners = 100;

// Parsers for POST data
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use(passport.initialize());

// Set our api routes
app.use('/api', passport.authenticate('jwt', { session: false }), api);

require('./server/middleware/authentication').init(app,passport,express);
require('./server/middleware/configuration').init(passport);

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
// Catch all other routes and return the index file
app.get('*',(req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Création Serveur 
const port = process.env.PORT || '3009';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => 
{
  console.log(`API on localhost:${port}/api`)
  console.log(`Client web on localhost:${port}`)
});




const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router/router');

const app = express();


// APP SETUP
app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*'}));
router(app);

// SERVER SETUP
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on: ', port);
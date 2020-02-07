const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const router = require('./routes/routes');

const app = express();
const mongoDB = 'mongodb://127.0.0.1/blog_database';
const hostname = '127.0.0.1';
const port = 3001;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(__dirname + '/public/css' );
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public/css/'));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
//app.use(express.json());
app.use(router);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
})
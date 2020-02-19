const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const flash = require('req-flash');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const expressLayout = require('express-ejs-layouts');

const router = require('./routes/routes');

const app = express();
const mongoDB = 'mongodb://127.0.0.1/blog_database';
const hostname = '127.0.0.1';
const port = 3001;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
  if(err) {
    console.log('Error: Database connection can not established..!');
  } else {
    console.log('Database connection established...!')
  }
});

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(expressLayout)
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));
app.use(flash());
app.use('/users', router);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/users/login`);
})
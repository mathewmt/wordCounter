var express = require('express');
var app = express();
var fs = require('fs');
var session = require('express-session');
app.set('view engine','jade');
app.use(express.static('public'));
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require('mongoose');
var count = require('word-count');

var request = require("request")
     cheerio = require("cheerio")


app.use(session({ secret: 'keyboard cat',proxy: true,resave: true,saveUninitialized: true, cookie: { maxAge: 600000 }}));
mongoose.connect('mongodb://localhost/Word',{useUnifiedTopology: true,useNewUrlParser: true});
var Schema = mongoose.Schema;

require('./app/routes/users.route.js')(app);
require('./app/routes/user.route.js')(app);

    

 

app.get('/', (req, res) => res.send('Hello World!'))
var server = app.listen(5000, function () 
{
    console.log('Node server is running..');
});
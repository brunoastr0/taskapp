"use strict";

//var
var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var handlebars = require('express-handlebars');

var session = require("express-session");

var flash = require("connect-flash");

var path = require('path');

var admin = require('./routes/admin');

var mongoose = require('mongoose');

require('../task_project/model/task');

var Task = mongoose.model('task'); //config
//app.use() = middlewares
//session

app.use(session({
  secret: 'doralinajesus1',
  resave: true,
  saveUninitialized: true
}));
app.use(flash()); //midlewares

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
}); //body parser

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); //handlebars

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars'); //mongoose

mongoose.Promise = global.Promise; //const db = 'mongodb://localhost/taskapp'

var db = 'mongodb+srv://taskapp:iwenttothebeach2020@cluster0.wccpn.mongodb.net/taskapp?retryWrites=true&w=majority';
mongoose.connect(db).then(function () {
  console.log("database`s up");
})["catch"](function (error) {
  console.log("error ao contecting to database; ".concat(error));
}); //public/css/js

app.use(express["static"](path.join(__dirname, 'public')));
/*app.use((req,res,next)=>{
    console.log("Middleware")
    next()
})*/
//Routes

app.get('/', function (req, res) {
  Task.find().populate('task').lean().sort({
    data: 'desc'
  }).then(function (tasks) {
    res.render('index', {
      tasks: tasks
    });
  })["catch"](function (error) {
    req.flash('error_msg', 'Houve um erro interno');
    res.redirect('/404');
  });
});
app.get('/404', function (req, res) {
  res.send('error 404');
});
app.use('/admin', admin); //others

var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("server connected...");
});
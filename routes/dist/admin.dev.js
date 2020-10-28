"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var express = require('express');

var router = express.Router();

var mongoose = require('mongoose');

var flash = require('connect-flash');

require('../model/task');

var Task = mongoose.model('task');
router.get('/', function (req, res) {
  res.render('task');
});
router.get('/task', function (req, res) {
  Task.find().lean().then(function (tasks) {
    res.render('admin/task', {
      tasks: tasks
    });
  })["catch"](function (error) {
    req.flash('error_msg', 'Houve um erro ao listar as task');
    res.redirect("/admin");
  });
});
router.get('/task/add', function (req, res) {
  res.render('admin/addtask');
});
router.post('/task/nova', function (req, res) {
  var errors = [];

  if (!req.body.task || _typeof(req.body.task) == undefined || req.body.task == null) {
    errors.push({
      text: 'task invalido'
    });
  }

  if (!req.body.cliente || _typeof(req.body.cliente) == undefined || req.body.cliente == null) {
    errors.push({
      text: 'cliente invalido'
    });
  }

  if (!req.body.time || _typeof(req.body.time) == undefined || req.body.time == null) {
    errors.push({
      text: 'tempo invalido'
    });
  }

  if (errors.length > 0) {
    res.render('admin/addtask', {
      errors: errors
    });
  } else {
    var novaTask = {
      seccao: req.body.seccao,
      trabalho: req.body.task,
      cliente: req.body.cliente,
      data: req.body.time
    };
    new Task(novaTask).save().then(function () {
      req.flash('success_msg', 'Task adicionada com successo');
      res.redirect('/admin/task');
    })["catch"](function (error) {
      console.log(error);
      req.flash('error_msg', 'Houve um erro ao adicionar task');
      res.redirect('/admin');
    });
  }
});
router.get('/task/edit/:id', function (req, res) {
  Task.findOne({
    _id: req.params.id
  }).lean().then(function (tasks) {
    res.render('admin/edittask', {
      tasks: tasks
    });
  })["catch"](function (error) {
    req.flash("error_msg", "Esta task nao existe");
    res.redirect('/admin/task');
  });
});
/*router.get('/show/:id',(req,res)=>{
    Task.findOne({_id:req.params.id}).lean().then((tasks)=>{
        res.render('taskShow',{tasks:tasks})
    }).catch((error)=>{
        req.flash("error_msg","Erro ao encontar a tarefa pretendida")
        res.redirect('/')
    })
})*/

router.post('/task/edit', function (req, res) {
  Task.findById(req.body.id).then(function (tasks) {
    console.log();
    tasks.seccao = req.body.seccao;
    tasks.trabalho = req.body.task;
    tasks.cliente = req.body.cliente;
    Task.save().then(function () {
      req.flash("success_msg", "task editada com sucesso");
      res.redirect("/admin/task");
    })["catch"](function (error) {
      req.flash('error_msg', 'houve um erro interno ao editar a task');
    });
  })["catch"](function (error) {
    console.log(error);
    req.flash("error_msg", "Houve um erro ao editar a task");
    res.redirect('/admin/task');
  });
});
router.post('/task/delete', function (req, res) {
  Task.remove({
    _id: req.body.id
  }).then(function () {
    req.flash("success_msg", "task apagda com sucesso");
    res.redirect('/admin/task');
  })["catch"](function (error) {
    req.flash("erro_msg", 'Houve um erro ao apagar a task');
    res.redirect('/admin/task');
  });
});
module.exports = router;
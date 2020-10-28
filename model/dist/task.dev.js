"use strict";

var _require = require('console'),
    time = _require.time;

var mongoose = require('mongoose');

var schema = mongoose.Schema;
var Task = new schema({
  seccao: {
    type: String,
    required: true
  },
  trabalho: {
    type: String,
    required: true
  },
  cliente: {
    type: String,
    required: true
  },
  data: {
    type: Date
  },
  obs: {
    type: String
  }
});
mongoose.model('task', Task);
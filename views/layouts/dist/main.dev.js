"use strict";

function updatechar() {
  var zone = document.getElementById("selectBox");

  if (zone.value == "Serigrafia") {
    zone.style.backgroundColor = "green";
    zone.style.color = "white";
  }

  if (zone.value == "Plotter") {
    zone.style.backgroundColor = "blue";
    zone.style.color = "white";
  }

  if (zone.value == "Design") {
    zone.style.backgroundColor = "orange";
    zone.style.color = "white";
  }

  if (zone.value == "Front-Office") {
    zone.style.backgroundColor = "yellow";
    zone.style.color = "white";
  }

  if (zone.value == "Grafica") {
    zone.style.backgroundColor = "red";
    zone.style.color = "white";
  }
}

var seccao = document.querySelectorAll("#seccao");
updateBG();

function updateBG() {
  seccao.forEach(function (text) {
    if (text.innerHTML == "Design") {
      color = text.style.backgroundColor = "orange";
    }

    if (text.innerHTML == "Plotter") {
      color = text.style.backgroundColor = "blue";
    }

    if (text.innerHTML == "Grafica") {
      color = text.style.backgroundColor = "red";
    }

    if (text.innerHTML == "Serigrafia") {
      color = text.style.backgroundColor = "green";
    }

    if (text.innerHTML == "Front-Office") {
      color = text.style.backgroundColor = "yellow";
    }
  });
}

var hora = document.querySelectorAll('#coluna3');

var mongoose = require('mongoose');

var Task = mongoose.model('task');

require('../model/task');

function Temporestante() {
  hora.forEach(function (time) {
    Task.find().lean().then(function (tasks) {
      var data = tasks.data;
    })["catch"](function (error) {
      console.log(error);
    });
    var now = new Date();
    var eventDate = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    var currentTime = now.getTime();
    var eventTime = eventDate.getTime();
    var remTime = eventTime - currentTime;
    var s = Math.floor(remTime / 1000);
    var m = Math.floor(s / 60);
    var h = Math.floor(m / 60);
    var d = Math.floor(h / 24);
    h %= 24;
    m %= 60;
    s %= 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    tempoR = "".concat(d, " DIAS, ").concat(h, ":").concat(m, ":").concat(s);
    console.log(hora.item(0));
    time.textContent = tempoR; //setTimeout(Temporestante,1000)
    //setInterval(Temporestante,1000)
  });
}

Temporestante();
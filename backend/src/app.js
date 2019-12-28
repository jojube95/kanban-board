const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const logsRoutes = require('./routes/logs');
const boardsRoutes = require('./routes/boards');
const tasksRoutes = require('./routes/tasks');
const projectsRoutes = require('./routes/projects');
const columnsRoutes = require('./routes/columns');
const io = require('socket.io-client');

const app  = express();

mongoose.connect("mongodb+srv://root:root@cluster0-1wtgi.mongodb.net/kanban", {useNewUrlParser: true, useUnifiedTopology: true}).then( () => {
  console.log('Connected to database!');
}).catch(() => {
  console.log('Connection to database failed!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

const socketServer = io('http://localhost:5000');

app.use(function(req, res, next) {
  req.socketServer = socketServer;
  next();
});


app.use('/api/logs', logsRoutes);

app.use('/api/boards', boardsRoutes);

app.use('/api/tasks', tasksRoutes);

app.use('/api/projects', projectsRoutes);

app.use('/api/columns', columnsRoutes);

module.exports = app;



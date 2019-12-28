const express = require('express');

const MODEL_PATH = '../models/';
const Task = require(MODEL_PATH + 'task');

const router = express.Router();

module.exports = function(io) {
  return router;
};

router.get('/get', (req, res, next) => {
  Task.find().then(result =>{
    res.status(200).json({
      message: "Success",
      tasks: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});


router.post('/add', (req, res, next) => {
  console.log('Try to add task to db');
  const task = new Task({
    name: req.body.task.name,
    description: req.body.task.description,
    timeSpend: req.body.task.timeSpend,
    columnId: req.body.task.columnId,
    projectId: req.body.task.projectId,
    projectName: req.body.task.projectName
  });
  task.save().then(createdTask => {
    res.status(201).json({
      message: "Task added successfully",
      taskId: createdTask._id
    });
  });
});

router.post('/delete', (req, res, next) => {
  console.log('Try to delete task to db');

  Task.deleteOne({ _id: req.body.taskId }).then(result => {
    res.status(200).json({ message: "Task deleted!" });
  });
});


module.exports = router;

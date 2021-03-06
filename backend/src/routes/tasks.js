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

router.post('/moveTask', (req, res, next) => {
  Task.updateOne({'_id': req.body.taskId}, { $set: { columnId: req.body.columnId}}).then(result => {
    res.status(200).json({
      message: 'Task moved successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err

    });
  });
});

router.post('/update', (req, res, next) => {
  Task.updateOne({'_id': req.body._id}, { $set: { name: req.body.name, description: req.body.description, projectId: req.body.projectId}}).then(result => {
    res.status(200).json({
      message: 'Task updated successfully',
      result: result
    });
  }).catch(err => {
    res.status(500).json({
      error: err

    });
  });
});

router.get('/getByColumn:id', (req, res, next) => {
  Task.find({ columnId: req.params.id }).then(result =>{
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
    name: req.body.name,
    description: req.body.description,
    timeSpend: req.body.timeSpend,
    timeStopwatch: req.body.timeStopwatch,
    timeRunning: req.body.timeRunning,
    columnId: req.body.columnId,
    projectId: req.body.projectId
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

  Task.deleteOne({ _id: req.body._id }).then(result => {
    res.status(200).json({ message: "Task deleted!" });
  });
});


module.exports = router;

const express = require('express');

const MODEL_PATH = '../models/';
const Log = require(MODEL_PATH + 'log');

const router = express.Router();

router.get('/get', (req, res, next) => {
  Log.find().then(result =>{
    res.status(200).json({
      message: "Success",
      logs: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});


router.post('/add', (req, res, next) => {
  console.log('Try to add log to db');
  const log = new Log({
    projectName: req.body.log.projectName,
    taskName: req.body.log.taskName,
    date: req.body.log.date,
    duration: req.body.log.duration,
  });
  log.save().then(createdLog => {
    res.status(201).json({
      message: "Log added successfully",
      logId: createdLog._id
    });
  });
});

router.post('/delete', (req, res, next) => {
  console.log('Try to delete log to db');

  Log.deleteOne({ _id: req.body.logId }).then(result => {
    res.status(200).json({ message: "Log deleted!" });
  });
});

module.exports = router;




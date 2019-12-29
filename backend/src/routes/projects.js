const express = require('express');

const MODEL_PATH = '../models/';
const Project = require(MODEL_PATH + 'project');

const router = express.Router();

module.exports = function(io) {
  return router;
};

router.get('/get', (req, res, next) => {
  Project.find().then(result =>{
    res.status(200).json({
      message: "Success",
      projects: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});

router.get('/getByTask:id', (req, res, next) => {
  Project.find({ _id: req.params.id }).then(result =>{
    res.status(200).json({
      message: "Success",
      project: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});

router.get('/getById:id', (req, res, next) => {
  Project.find({ _id: req.params.id }).then(result =>{
    res.status(200).json({
      message: "Success",
      project: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});


router.post('/add', (req, res, next) => {
  console.log('Try to add project to db');
  const project = new Project({
    name: req.body.project.name,
    favourite: req.body.project.favourite,
    color: req.body.project.color
  });
  project.save().then(createdProject => {
    res.status(201).json({
      message: "Log added successfully",
      projectId: createdProject._id
    });
  });
});

router.post('/delete', (req, res, next) => {
  console.log('Try to delete log to db');

  Project.deleteOne({ _id: req.body.projectId }).then(result => {
    res.status(200).json({ message: "Project deleted!" });
  });
});



module.exports = router;

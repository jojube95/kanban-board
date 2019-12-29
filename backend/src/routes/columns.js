const express = require('express');

const MODEL_PATH = '../models/';
const Column = require(MODEL_PATH + 'column');

const router = express.Router();

module.exports = function(io) {
  return router;
};

router.get('/get', (req, res, next) => {
  Column.find().then(result =>{
    res.status(200).json({
      message: "Success",
      columns: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});

router.get('/getByBoard:id', (req, res, next) => {
  Column.find({ boardId: req.params.id }).then(result =>{
    console.log(result);
    res.status(200).json({
      message: "Success",
      columns: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});


router.post('/add', (req, res, next) => {
  const column = new Column({
    name: req.body.column.name,
    tasks: req.body.column.tasks,
    boardId: req.body.column.boardId
  });
  column.save().then(createdColumn => {
    res.status(201).json({
      message: "Column added successfully",
      columnId: createdColumn._id
    });
  });
});

router.post('/delete', (req, res, next) => {
  console.log('Try to delete column to db');

  Column.deleteOne({ _id: req.body.columnId }).then(result => {
    res.status(200).json({ message: "Column deleted!" });
  });
});

module.exports = router;

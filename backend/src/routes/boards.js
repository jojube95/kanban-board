const express = require('express');

const MODEL_PATH = '../models/';
const Board = require(MODEL_PATH + 'board');

const router = express.Router();

module.exports = function(io) {
  return router;
};


router.get('/get', (req, res, next) => {
  Board.find().then(result =>{
    res.status(200).json({
      message: "Success",
      boards: result
    });
  }).catch(err => {
    res.status(500).json({
      error : err
    })
  });
});


router.post('/add', (req, res, next) => {
  console.log('Try to add board to db');
  const board = new Board({
    name: req.body.board.name
  });
  board.save().then(createdBoard => {
    res.status(201).json({
      message: "Board added successfully",
      boardId: createdBoard._id
    });
  });
});

router.post('/delete', (req, res, next) => {
  console.log('Try to delete board to db');

  Board.deleteOne({ _id: req.body.boardId }).then(result => {
    res.status(200).json({ message: "Board deleted!" });
  });
});

module.exports = router;

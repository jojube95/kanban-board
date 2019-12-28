const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');

const boards = [
  { _id: '0', name: 'Board1',favourite: true },
  { _id: '1', name: 'Board2', favourite: false }
];

const columns = [
  { _id: '0', name: 'To do', boardId: '0' },
  { _id: '1', name: 'Doing', boardId: '0' },
  { _id: '2', name: 'Done', boardId: '0' },
  { _id: '3', name: 'To do2', boardId: '1' },
  { _id: '4', name: 'Doing2', boardId: '1' },
  { _id: '5', name: 'Done2', boardId: '1' }
];

const tasks = [
  { _id: '1', name: 'Task1', description: 'Task1Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '0', projectId: '1' },
  { _id: '2', name: 'Task2', description: 'Task2Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '1', projectId: '0' },
  { _id: '3', name: 'Task3', description: 'Task3Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '1', projectId: '1' },
  { _id: '4', name: 'Task4', description: 'Task4Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '2', projectId: '0' },
  { _id: '5', name: 'Task5', description: 'Task5Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '2', projectId: '1' },
  { _id: '6', name: 'Task6', description: 'Task6Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '3', projectId: '1' },
  { _id: '7', name: 'Task7', description: 'Task7Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '4', projectId: '0' },
  { _id: '8', name: 'Task8', description: 'Task8Description', timeSpend: 0, timeStopwatch: 0, timeRunning: false, columnId: '5', projectId: '1' }
];

let taskLastId = 8;

io.on('connection', socket => {
    socket.on('getColumns', boardId => {
      let columnsToSend = [];
      columns.forEach(column => {
        if(column.boardId == boardId){
          columnsToSend.push(column);
        }
      });
      socket.emit('columns', columnsToSend);
    });

    // socket.on('addColumn', column => {
    //     //Add column to database
    //
    //     //Retrieve and emit boards
    //     io.emit('boards', board);
    //
    //     //Retrieve and emit columns
    //     socket.emit('columns', columns);
    // });

    // socket.on('editColumn', columns => {
    //     //Update column to database
    //
    //     //Send data only to column_id reader user
    //     socket.to(column._id).emit('columns', columns);
    // });

    socket.on('getTasks', columnId => {
      let tasksToSend = [];
      tasks.forEach(task => {
        if(task.columnId == columnId){
          tasksToSend.push(task);
        }
      });
      socket.emit('tasks' + columnId, tasksToSend);
    });

    socket.on('updateTask', task => {
      //Update task on database
      tasks.forEach((taskAux, index) => {
        if(task._id == taskAux._id ){
          tasks[index] = task;
        }
      });

      //Iterate columns and emit('tasks' + columnId)
      columns.forEach(column => {
        //Send data to everyone except sender
        socket.broadcast.emit('tasks' + column._id, tasks.filter(task => task.columnId == column._id));
      });
    });

  socket.on('addTask', task => {
    //Add task database
    task._id = taskLastId++;
    tasks.push(task);

    //Iterate columns and emit('tasks' + columnId)
    columns.forEach(column => {
      //Send data to everyone
      io.emit('tasks' + column._id, tasks.filter(task => task.columnId == column._id));
    });
  });

    io.emit('boards', boards);

    console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});

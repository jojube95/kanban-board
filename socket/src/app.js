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
    socket.on('getColumnsByBoard', boardId => {
      //Get columns by boardID
      request('http://localhost:3000/api/columns/getByBoard' + boardId, function (error, response, body) {
        if (!error) {
          //Send the data to socket
          const data = JSON.parse(body);
          socket.emit('columns', data.columns);
        }
        else{
          console.log(error)
        }
      });

    });

    socket.on('getTasks', columnId => {
      //Get tasks bu columnId
      request('http://localhost:3000/api/tasks/getByColumn' + columnId, function (error, response, body) {
        if (!error) {
          //Send the data to socket
          const data = JSON.parse(body);
          socket.emit('tasks' + columnId, data.tasks);
        }
        else{
          console.log(error)
        }
      });
    });

    socket.on('getProject', task => {
      //Get tasks bu columnId
      request('http://localhost:3000/api/projects/getByTask' + task.projectId, function (error, response, body) {
        if (!error) {
          //Send the data to socket
          const data = JSON.parse(body);
          console.log(data.project[0]);
          socket.emit('project' + task._id, data.project);
        }
        else{
          console.log(error)
        }
      });
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
        //Get tasks by columnId
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
        //Get tasks by columnId
        //Send data to everyone
        io.emit('tasks' + column._id, tasks.filter(task => task.columnId == column._id));
      });
    });

    //Get boards from database and emmit
    request('http://localhost:3000/api/boards/get', function (error, response, body) {
      if (!error) {
        //Send the data to socket
        const data = JSON.parse(body);
        io.emit('boards', data.boards);
      }
      else{
        console.log(error)
      }
    });


    console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});

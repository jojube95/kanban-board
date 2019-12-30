const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');

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
          socket.emit('project' + task._id, data.project[0]);
        }
        else{
          console.log(error)
        }
      });
    });

    socket.on('moveTask', data => {

      console.log('User ' + socket.id + ' trying move task');

      //console.log(data);
      //Update task on database
      var options = {
        uri: 'http://localhost:3000/api/tasks/moveTask',
        method: 'POST',
        json: {taskId: data.taskId, columnId: data.columnDestinyId}
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          request('http://localhost:3000/api/tasks/getByColumn' + data.columnOriginId, function (error, response, body) {
            if (!error) {
              //Send the data to socket
              const data1 = JSON.parse(body);
              socket.broadcast.emit('tasks' + data.columnOriginId, data1.tasks);
            }
            else{
              console.log(error)
            }
          });

          request('http://localhost:3000/api/tasks/getByColumn' + data.columnDestinyId, function (error, response, body) {
            if (!error) {
              //Send the data to socket
              const data2 = JSON.parse(body);
              socket.broadcast.emit('tasks' + data.columnDestinyId, data2.tasks);
            }
            else{
              console.log(error)
            }
          });
        }
        else{
          console.log(error)
        }
      });
    });

    // socket.on('addTask', task => {
    //   //Add task database
    //   task._id = taskLastId++;
    //   tasks.push(task);
    //
    //   //Iterate columns and emit('tasks' + columnId)
    //   columns.forEach(column => {
    //     //Get tasks by columnId
    //     //Send data to everyone
    //     io.emit('tasks' + column._id, tasks.filter(task => task.columnId == column._id));
    //   });
    // });

    //Get boards from database and emmit
    request('http://localhost:3000/api/boards/get', function (error, response, body) {
      if (!error) {
        //Send the data to socket
        const data = JSON.parse(body);
        socket.emit('boards', data.boards);
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

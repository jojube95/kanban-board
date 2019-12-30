const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');

let intervals = [];

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

    socket.on('addTask', task => {
      var options = {
        uri: 'http://localhost:3000/api/tasks/add',
        method: 'POST',
        json: task
      };
      request.post(options, function (error, response, body) {
        if (!error) {
          //Get tasks by columnId
          request('http://localhost:3000/api/tasks/getByColumn' + task.columnId, function (error, response, body) {
            if (!error) {
              //Send the data to socket
              const data1 = JSON.parse(body);
              io.emit('tasks' + task.columnId, data1.tasks);
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

    socket.on('editTask', data => {

      console.log('User ' + socket.id + ' trying edit task');

      //console.log(data);
      //Update task on database
      var options = {
        uri: 'http://localhost:3000/api/tasks/update',
        method: 'POST',
        json: {_id: data._id, name: data.name, description: data.description, projectId: data.projectId}
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          request('http://localhost:3000/api/tasks/getByColumn' + data.columnId, function (error, response, body) {
            if (!error) {
              //Send the data to socket
              const data1 = JSON.parse(body);
              socket.broadcast.emit('tasks' + data.columnId, data1.tasks);
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

    socket.on('deleteTask', data => {

      console.log('User ' + socket.id + ' trying delete task');

      //console.log(data);
      //Update task on database
      var options = {
        uri: 'http://localhost:3000/api/tasks/delete',
        method: 'POST',
        json: {_id: data._id}
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          request('http://localhost:3000/api/tasks/getByColumn' + data.columnId, function (error, response, body) {
            if (!error) {
              //Send the data to socket
              const data1 = JSON.parse(body);
              io.emit('tasks' + data.columnId, data1.tasks);
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


    socket.on('getProjects', () =>{
      //Get projects from database and emmit
      request('http://localhost:3000/api/projects/get', function (error, response, body) {
        if (!error) {
          //Send the data to socket
          const data = JSON.parse(body);
          socket.emit('projects', data.projects);
        }
        else{
          console.log(error)
        }
      });
    });

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

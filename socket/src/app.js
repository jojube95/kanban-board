const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const request = require('request');

let semaforo = true;
let movements = 0;

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

      while(!semaforo){
        console.log('User ' + socket.id + ' waiting');
      }
      console.log('User ' + socket.id + ' trying move task');
      semaforo = false;
      //console.log('User ' + socket.id + ' set semaforo to false');
      //Update task on database
      var options = {
        uri: 'http://localhost:3000/api/tasks/moveTask',
        method: 'POST',
        json: {taskId: data.taskId, columnId: data.columnId}
      };

      request.post(options, function (error, response, body) {
        if (!error) {
          //Get columns of current board
          request('http://localhost:3000/api/columns/getByBoard' + data.boardId, function (error, response, body) {
            if (!error) {
              //Send the data to socket
              const columns = JSON.parse(body).columns;
              //Iterate columns and emit('tasks' + columnId)
              columns.forEach(column => {
                //Get tasks by columnId
                //Send data to everyone except sender
                request('http://localhost:3000/api/tasks/getByColumn' + column._id, function (error, response, body) {
                  if (!error) {
                    //Send the data to socket
                    const data = JSON.parse(body);
                    io.emit('tasks' + column._id, data.tasks);
                  }
                  else{
                    console.log(error)
                  }
                });

              });
              //console.log('User ' + socket.id + ' set semaforo to true');
              semaforo = true;
              //console.log(movements++);
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

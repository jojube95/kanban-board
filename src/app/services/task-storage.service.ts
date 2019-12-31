import { Injectable } from '@angular/core';
import {Task} from '../models/task';
import { Column } from '../models/column';
import {interval, Observable} from 'rxjs';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {

  tasks = this.socket.fromEvent<Task[]>('tasks');

  doingTasks: Task[] = [];

  constructor(private socket: Socket) { }

  public addTask(task: Task) {
    this.socket.emit('addTask', task);
  }

  public getTasks(): Observable<Task[]> {
   return this.tasks;
  }

  public getTasksByColumn(column: Column) {
    this.socket.emit('getTasks', column._id);
  }

  public moveTask(boardId: string, columnOriginId: string,columnDestinyId: string, taskId: string){
    this.socket.emit('moveTask', {boardId: boardId, columnOriginId: columnOriginId, columnDestinyId: columnDestinyId, taskId: taskId});
  }

  public editTask(task: Task){
    this.socket.emit('editTask', {_id: task._id, name: task.name, description: task.description, projectId: task.projectId, columnId: task.columnId});
  }

  public deleteTask(task: Task){
    this.socket.emit('deleteTask', {_id: task._id, columnId: task.columnId});
  }

  public addTaskToDoing(task: Task){
    this.doingTasks.push(task);
  }

  public popTaskFromDoing(task: Task){
    this.doingTasks.splice( this.doingTasks.indexOf(task), 1 );
  }

}

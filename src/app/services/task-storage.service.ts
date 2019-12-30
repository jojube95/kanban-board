import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Column } from '../models/column';
import { Observable } from 'rxjs';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {

  tasks = this.socket.fromEvent<Task[]>('tasks');

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

  public moveTask(boardId: string, columnId: string, taskId: string){
    this.socket.emit('moveTask', {boardId: boardId, columnId: columnId, taskId: taskId});
  }
}

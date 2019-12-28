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
    // task._id = String(++this.lastid);
    //
    // this.tasks.subscribe(tasks => {
    //   tasks.push(task);
    // });
  }

  public getTasks(): Observable<Task[]> {
   return this.tasks;
  }

  public getTasksByColumn(column: Column) {
    this.socket.emit('getTasks', column._id);
  }

  public updateTask(task: Task){
    this.socket.emit('updateTask', task);
  }
}

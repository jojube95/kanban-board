import { Injectable } from '@angular/core';
import {Task} from "../models/task";

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  tasks: Object = {};
  lastid = -1;

  constructor() { }

  _addTask(task: Task) {
    task.id = String(++this.lastid);
    this.tasks[task.id] = task;
    return (task.id);
  }

  getTask(taskId: string) {
    return this.tasks[taskId];
  }

  newTask(description: string): string {
    const task = new Task();
    task.description = description;
    return (this._addTask(task));
  }
}

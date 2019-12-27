import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Column } from '../models/column';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  tasks: Task[] = [
    {
      _id: '0',
      name: 'Task1',
      description: 'Task1Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '0',
      projectId: '1'
    },
    {
      _id: '1',
      name: 'Task2',
      description: 'Task2Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '1',
      projectId: '0'
    },
    {
      _id: '2',
      name: 'Task3',
      description: 'Task3Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '1',
      projectId: '1'
    },
    {
      _id: '3',
      name: 'Task4',
      description: 'Task4Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '2',
      projectId: '0'
    },
    {
      _id: '4',
      name: 'Task5',
      description: 'Task5Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '2',
      projectId: '1'
    },
    {
      _id: '5',
      name: 'Task6',
      description: 'Task6Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '3',
      projectId: '1'
    },
    {
      _id: '6',
      name: 'Task7',
      description: 'Task7Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '4',
      projectId: '0'
    },
    {
      _id: '7',
      name: 'Task8',
      description: 'Task8Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '5',
      projectId: '1'
    }

  ];

  lastid = 4;

  constructor() { }

  _addTask(task: Task) {
    task._id = String(++this.lastid);
    this.tasks[task._id] = task;
    return (task._id);
  }

  getTask(taskId: string) {
    return this.tasks[taskId];
  }

  newTask(task: Task): string {
    return (this._addTask(task));
  }

  public getTasks(): Observable<Task[]> {
    const tasksObservable = new Observable<Task[]>(observer => {
      observer.next(this.tasks);
    });
    return tasksObservable;
  }

  public getTasksByColumn(column: Column): Observable<Task[]>{
    return of(this.tasks.filter(task => task.columnId === column._id));
  }
}

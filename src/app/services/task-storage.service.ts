import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Column } from '../models/column';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskStorageService {
  tasks: Observable<Task[]> = of([
    {
      _id: '1',
      name: 'Task1',
      description: 'Task1Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '0',
      projectId: '1'
    },
    {
      _id: '2',
      name: 'Task2',
      description: 'Task2Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '1',
      projectId: '0'
    },
    {
      _id: '3',
      name: 'Task3',
      description: 'Task3Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '1',
      projectId: '1'
    },
    {
      _id: '4',
      name: 'Task4',
      description: 'Task4Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '2',
      projectId: '0'
    },
    {
      _id: '5',
      name: 'Task5',
      description: 'Task5Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '2',
      projectId: '1'
    },
    {
      _id: '6',
      name: 'Task6',
      description: 'Task6Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '3',
      projectId: '1'
    },
    {
      _id: '7',
      name: 'Task7',
      description: 'Task7Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '4',
      projectId: '0'
    },
    {
      _id: '8',
      name: 'Task8',
      description: 'Task8Description',
      timeSpend: 0,
      timeStopwatch: 0,
      timeRunning: false,
      columnId: '5',
      projectId: '1'
    }

  ]);

  lastid = 8;

  constructor() { }

  public addTask(task: Task) {
    task._id = String(++this.lastid);

    this.tasks.subscribe(tasks => {
      tasks.push(task);
    });
  }

  public getTasks(): Observable<Task[]> {
   return this.tasks;
  }

  public getTasksByColumn(column: Column): Observable<Task[]>{
    return this.tasks.pipe(map(tasks => tasks.filter(task => task.columnId === column._id)));
  }
}

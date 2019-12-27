import { Injectable } from '@angular/core';
import { Task } from "../models/task";
import { Column } from '../models/column';
import { Board } from '../models/board';
import { Project } from '../models/project';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectStorageService {
  projects: Project[] = [
    {
      _id: '0',
      name: 'Project1',
      color: '#f7ff00'
    },
    {
      _id: '1',
      name: 'Project2',
      color: '#00ffff'
    }
  ];

  public getProjects(): Observable<Project[]> {
    const projectsObservable = new Observable<Project[]>(observer => {
          setTimeout(() => {
              observer.next(this.projects);
          }, 1000);
    });
    return projectsObservable;
  }

  getProjectByTask(task: Task): Observable<Project[]>{
    const projectsObservable = new Observable<Project[]>(observer => {
          setTimeout(() => {
              observer.next(this.projects);
          }, 1000);
    });
    return projectsObservable;
  }
}

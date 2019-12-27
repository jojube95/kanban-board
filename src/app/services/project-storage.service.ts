import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Project } from '../models/project';
import {Observable, of} from 'rxjs';

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
      observer.next(this.projects);
    });
    return projectsObservable;
  }

  getProjectByTask(task: Task): Observable<Project>{
    return of(this.projects.filter(project => task.projectId === project._id).pop());
  }
}

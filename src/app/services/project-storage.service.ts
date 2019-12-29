import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Project } from '../models/project';
import {Observable, of} from 'rxjs';
import {Column} from '../models/column';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ProjectStorageService {

  constructor(private socket: Socket){

  }

  public getProjects(): Observable<Project[]> {
    const projectsObservable = new Observable<Project[]>(observer => {
      //observer.next(this.projects);
    });
    return projectsObservable;
  }

  getProjectByTask(task: Task){
    this.socket.emit('getProject', task);
  }

}

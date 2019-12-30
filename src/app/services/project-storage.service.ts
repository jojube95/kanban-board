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

  projects = this.socket.fromEvent<Project[]>('projects');

  constructor(private socket: Socket){

  }

  public getProjects() {
    this.socket.emit('getProjects');
  }

  getProjectByTask(task: Task){
    this.socket.emit('getProject', task);
  }

}

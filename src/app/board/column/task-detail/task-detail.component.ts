import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import {Project} from '../../../models/project';
import {ProjectStorageService} from '../../../services/project-storage.service';
import {Observable, of} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {TaskStorageService} from '../../../services/task-storage.service';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {
  project: Observable<Project>;
  projects: Observable<Project[]>;

  constructor(private socket: Socket, private taskStorageService: TaskStorageService, private projectStorageService: ProjectStorageService, public dialogRef: MatDialogRef<TaskDetailComponent>, @Inject(MAT_DIALOG_DATA) public task: any) {

  }

  ngOnInit() {
    document.getElementById('modal-component').setAttribute("style", "padding: 0;");
    this.project = this.socket.fromEvent<Project>('project' + this.task._id);
    this.projectStorageService.getProjectByTask(this.task);
    this.projects = this.projectStorageService.projects;
    this.projectStorageService.getProjects();
  }


  edit(){
    this.taskStorageService.editTask(this.task);
  }

  deleteTask(){
    this.taskStorageService.deleteTask(this.task);
    this.dialogRef.close();
  }

  onClickClose() {
    this.dialogRef.close();
  }

  saveDescription(value){
    if(value != this.task.description){
      this.task.description = value;
      this.edit();
    }
   }

  saveName(value){
    if(value != this.task.name){
      this.task.name = value;
      this.edit();
    }
  }

  onSelectProject(project: Project){
    this.project = of(project);
    if(project._id != this.task.projectId){
      this.task.projectId = project._id;
      this.edit();
    }
  }
}

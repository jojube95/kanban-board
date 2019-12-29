import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import {Project} from '../../../models/project';
import {ProjectStorageService} from '../../../services/project-storage.service';
import {Observable, of} from 'rxjs';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {
  project: Observable<Project>;
  projects: Observable<Project[]>;

  constructor(private socket: Socket, private projectStorageService: ProjectStorageService, public dialogRef: MatDialogRef<TaskDetailComponent>, @Inject(MAT_DIALOG_DATA) public task: any) {

  }

  ngOnInit() {
    document.getElementById('modal-component').setAttribute("style", "padding: 0;");
    this.project = this.socket.fromEvent<Project>('project' + this.task._id);
    this.projectStorageService.getProjectByTask(this.task);
    this.projects = this.projectStorageService.getProjects();
  }


  edit(){
    this.dialogRef.close();
  }

  onClickClose() {
    this.dialogRef.close();
  }

  saveDescription(value){
    this.task.description = value;
  }

  saveName(value){
    this.task.name = value;
  }

  onSelectProject(project: Project){
    this.project = of(project);
    this.task.projectId = project._id;
  }
}

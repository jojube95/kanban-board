import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import {Project} from '../../../models/project';
import {ProjectStorageService} from '../../../services/project-storage.service';
import {Observable, of} from 'rxjs';
import {Task} from '../../../models/task';
import {Column} from '../../../models/column';
import {TaskStorageService} from '../../../services/task-storage.service';

@Component({
  selector: 'task-add',
  templateUrl: './task-add.component.html',
})
export class TaskAddComponent implements OnInit {
  project: Observable<Project>;
  projects: Observable<Project[]>;
  taskAdd: Task;

  constructor(private taskStorageService: TaskStorageService, private projectStorageService: ProjectStorageService, public dialogRef: MatDialogRef<TaskAddComponent>, @Inject(MAT_DIALOG_DATA) public column: Column) {

  }

  ngOnInit() {
    document.getElementById('modal-component').setAttribute("style", "padding: 0;");
    this.projects = this.projectStorageService.projects;
    this.projectStorageService.getProjects();
    this.project = of(new Project('Select project', 'rgb(66, 73, 73)'));
    this.taskAdd = new Task('Name', 'Description', '', '', 0, 0, false);
  }

  addTask(){
    this.taskAdd.columnId = this.column._id;
    this.taskStorageService.addTask(this.taskAdd);
    this.onClickClose();
  }


  edit(){
    this.dialogRef.close();
  }

  onClickClose() {
    this.dialogRef.close();
  }

  saveDescription(value){
    this.taskAdd.description = value;
  }

  saveName(value){
    this.taskAdd.name = value;
  }

  onSelectProject(project: Project){
    this.project = of(project);
    this.taskAdd.projectId = project._id;
  }
}

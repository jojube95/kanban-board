import { Component, OnInit,Input } from '@angular/core';
import {Column} from "../../models/column";
import {TaskStorageService} from "../../services/task-storage.service";
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {TaskAddComponent} from './task-add/task-add.component';
import {Socket} from 'ngx-socket-io';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  tasks: Observable<Task[]>;
  displayAddTask = false;

  constructor(private matDialog: MatDialog, private taskStorageService: TaskStorageService, private socket: Socket) { }

  toggleDisplayAddTask() {
    this.displayAddTask = ! this.displayAddTask;
  }
  ngOnInit(): void {
    this.tasks = this.socket.fromEvent<Task[]>('tasks' + this.column._id);
    this.taskStorageService.getTasksByColumn(this.column);
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event) {
    $event.preventDefault();
    //Catched element Id
    const data = $event.dataTransfer.getData('text');

    const taskData = JSON.parse($event.dataTransfer.getData('task'));

    //Element target
    let target = $event.target;

    //Class of element target
    const targetClassName = target.className;

    while( target.className !== 'board-column') {
      target = target.parentNode;
    }

    target = target.querySelector('.tasks-container');

    if(targetClassName === 'tasks-container') {
      $event.target.parentNode.insertBefore(document.getElementById(data), $event.target);
    }
    else if(targetClassName === 'column-title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      }else {
        target.appendChild(document.getElementById(data));
      }
    }
    else {
      target.appendChild(document.getElementById(data));
    }

    if(taskData.columnId != this.column._id){
      //Update task values
      taskData.columnId = this.column._id;
      //Call service
      this.taskStorageService.updateTask(taskData);
    }

  }

  openModalTaskDetail(task: Task) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "300px";
    dialogConfig.width = "600px";
    dialogConfig.data = task;

    this.matDialog.open(TaskDetailComponent, dialogConfig);
  }

  openModalTaskAdd() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "300px";
    dialogConfig.width = "600px";
    dialogConfig.data = this.column;
    this.matDialog.open(TaskAddComponent, dialogConfig);
  }

}

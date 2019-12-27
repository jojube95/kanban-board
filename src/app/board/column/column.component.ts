import { Component, OnInit,Input } from '@angular/core';
import {Column} from "../../models/column";
import {TaskStorageService} from "../../services/task-storage.service";
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import {MatDialogConfig} from '@angular/material';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {MatDialog} from '@angular/material/typings/dialog';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  tasks: Observable<Task[]>;
  displayAddTask = false;

  constructor(private matDialog: MatDialog, private taskStorageService: TaskStorageService) { }

  toggleDisplayAddTask() {
    this.displayAddTask = ! this.displayAddTask;
  }
  ngOnInit(): void {
    this.tasks =  this.taskStorageService.getTasksByColumn(this.column);
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event) {
    $event.preventDefault();
    //Catched element Id
    const data = $event.dataTransfer.getData('text');

    //Element target
    let target = $event.target;

    //Class of element target
    const targetClassName = target.className;

    while( target.className !== 'board-column') {
      target = target.parentNode;
    }

    console.log(target);
    target = target.querySelector('.tasks-container');
    console.log(target);

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

  }

  onEnter(value: string) {
    const taskId =  this.taskStorageService.newTask(new Task(value, value, '0', this.column._id, 0));
  }

  openModal(task: Task) {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "300px";
    dialogConfig.width = "600px";
    dialogConfig.data = task;

    this.matDialog.open(TaskDetailComponent, dialogConfig);
  }

}

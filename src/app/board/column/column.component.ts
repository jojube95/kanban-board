import { Component, OnInit,Input } from '@angular/core';
import {Column} from "../../models/column";
import {TaskStorageService} from "../../services/task-storage.service";
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {TaskDetailComponent} from './task-detail/task-detail.component';
import {TaskAddComponent} from './task-add/task-add.component';
import {Socket} from 'ngx-socket-io';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  tasks: Observable<Task[]>;

  constructor(private matDialog: MatDialog, private taskStorageService: TaskStorageService, private socket: Socket) { }

  ngOnInit(): void {
    this.tasks = this.socket.fromEvent<Task[]>('tasks' + this.column._id);

    this.taskStorageService.getTasksByColumn(this.column);
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

  drop(event: CdkDragDrop<string[]>) {

    this.taskStorageService.moveTask(this.column.boardId, event.previousContainer.id, event.container.id, event.item.data._id);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}

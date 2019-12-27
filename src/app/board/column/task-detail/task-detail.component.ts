import {Component, Inject, Input, OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html',
})
export class TaskDetailComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TaskDetailComponent>, @Inject(MAT_DIALOG_DATA) public task: any) {

  }

  ngOnInit() {
    document.getElementById('modal-component').setAttribute("style", "padding: 0;");
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
}

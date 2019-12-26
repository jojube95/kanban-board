import { Component, OnInit,Input } from '@angular/core';
import {Column} from "../../models/column";
import {TaskStorageService} from "../../services/task-storage.service";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  @Input() taskStorage: TaskStorageService;
  displayAddTask = false;

  constructor() { }

  toggleDisplayAddTask() {
    this.displayAddTask = ! this.displayAddTask;
  }
  ngOnInit(): void {
  }

  allowDrop($event) {
    $event.preventDefault();
  }

  drop($event) {
    $event.preventDefault();
    const data = $event.dataTransfer.getData('text');

    let target = $event.target;
    const targetClassName = target.className;

    while( target.className !== 'list') {
      target = target.parentNode;
    }
    target = target.querySelector('.tasks');

    if(targetClassName === 'task') {
      $event.target.parentNode.insertBefore(document.getElementById(data), $event.target);
    } else if(targetClassName === 'list__title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      }else {
        target.appendChild(document.getElementById(data));
      }
    } else {
      target.appendChild(document.getElementById(data));
    }

  }

  onEnter(value: string) {
    const taskId =  this.taskStorage.newTask(value);
    this.column.tasks.push(taskId);
  }

}

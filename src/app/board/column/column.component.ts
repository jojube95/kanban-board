import { Component, OnInit,Input } from '@angular/core';
import {Column} from "../../models/column";
import {TaskStorageService} from "../../services/task-storage.service";
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() column: Column;
  tasks: Observable<Task[]>;
  displayAddTask = false;

  constructor(private taskStorageService: TaskStorageService) { }

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
    const data = $event.dataTransfer.getData('text');

    let target = $event.target;
    const targetClassName = target.className;

    while( target.className !== 'board-column') {
      target = target.parentNode;
    }
    target = target.querySelector('.tasks-container');

    if(targetClassName === 'tasks-container') {
      $event.target.parentNode.insertBefore(document.getElementById(data), $event.target);
    } else if(targetClassName === 'column-title') {
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
    const taskId =  this.taskStorageService.newTask(new Task(value, value, '0', this.column._id, 0));
  }

}

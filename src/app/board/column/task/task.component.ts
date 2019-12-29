import {Component, OnInit, Input} from '@angular/core';
import {Task} from "../../../models/task";
import {Project} from "../../../models/project";
import {ProjectStorageService} from "../../../services/project-storage.service";
import {Observable} from "rxjs";
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  project: Observable<Project>;
  constructor(private socket: Socket, private projectStorageService: ProjectStorageService) { }

  ngOnInit() {
    this.project = this.socket.fromEvent<Project>('project' + this.task._id);
    this.projectStorageService.getProjectByTask(this.task);
  }

  dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    ev.dataTransfer.setData('task', JSON.stringify(this.task));
    //console.log('Origin column: ' + this.task.columnId);
  }

  dragEnd($event) {
    $event.preventDefault();

    //Search the column element and get the columnId
    let columnId = document.getElementById(this.task._id).parentElement.parentElement.id;

    if(columnId == ''){
      columnId = document.getElementById(this.task._id).parentElement.parentElement.children[0].id;
    }

    //Set the columnId to the droped task
    this.task.columnId = columnId;
    document.getElementById(this.task._id).remove();
  }

}

import {Component, OnInit, Input, OnChanges, OnDestroy} from '@angular/core';
import {Task} from "../../../models/task";
import {Project} from "../../../models/project";
import {ProjectStorageService} from "../../../services/project-storage.service";
import {interval, Observable, Subscription, timer} from 'rxjs';
import {Socket} from 'ngx-socket-io';
import {TaskStorageService} from '../../../services/task-storage.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  @Input() task: Task;
  project: Observable<Project>;
  timer;

  constructor(private socket: Socket, private projectStorageService: ProjectStorageService, private taskStorageService: TaskStorageService) { }


  ngOnInit() {

    this.project = this.socket.fromEvent<Project>('project' + this.task._id);
    this.projectStorageService.getProjectByTask(this.task);

    //If the column is doing, subscribe to timer
    if(this.task.columnId == '5dff7030dc453c1866b44d19'){
      this.timer = interval(60000).subscribe(() => {
        this.task.timeStopwatch++;
        console.log(this.task.timeStopwatch);
      });
    }

  }

  ngOnDestroy() {
    //The element changed column, if they started a suscribe to timer, then unsubscribe
    if(this.timer != undefined){
      this.timer.unsubscribe();
    }
  }

}

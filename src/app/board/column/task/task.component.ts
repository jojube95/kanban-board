import { Component, OnInit,Input } from '@angular/core';
import {Task} from "../../../models/task";
import {Project} from "../../../models/project";
import {ProjectStorageService} from "../../../services/project-storage.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @Input() task: Task;
  project: Observable<Project>;

  constructor(private projectStorageService: ProjectStorageService) { }

  ngOnInit() {
    this.project = this.projectStorageService.getProjectByTask(this.task);
  }

  dragStart(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
    ev.dataTransfer.setData('task', JSON.stringify(this.task));
  }

}

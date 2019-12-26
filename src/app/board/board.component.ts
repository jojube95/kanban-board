import { Component, OnInit } from '@angular/core';
import {TaskStorageService} from "../services/task-storage.service";
import {Column} from "../models/column";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  taskStorage: TaskStorageService;
  columns: Column[];
  
  constructor() { }

  setMockData(): void {
    this.taskStorage = new TaskStorageService();
    const columns: Column[] = [
      {
        name: 'To Do',
        tasks: []
      },
      {
        name: 'Doing',
        tasks: []
      },
      {
        name: 'Done',
        tasks: []
      }
    ];
    this.columns = columns;
  }

  ngOnInit() {
    this.setMockData();
  }
}

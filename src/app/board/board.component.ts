import { Component, OnInit } from '@angular/core';
import {Column} from "../models/column";
import { Observable } from 'rxjs';
import { ColumnStorageService } from '../services/column-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  columns: Observable<Column[]>;

  constructor(private columnStorageService: ColumnStorageService) { }

  setMockData(): void {
    this.columns = this.columnStorageService.getColumns();
  }

  ngOnInit() {
    this.setMockData();
  }
}

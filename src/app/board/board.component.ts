import {Component, OnInit} from '@angular/core';
import {Column} from "../models/column";
import { Observable } from 'rxjs';
import { ColumnStorageService } from '../services/column-storage.service';
import {Board} from "../models/board";
import {BoardStorageService} from "../services/board-storage.service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  boards: Observable<Board[]>;
  columns: Observable<Column[]>;

  constructor(private boardStorageService: BoardStorageService, private columnStorageService: ColumnStorageService) { }

  ngOnInit() {
    this.boards = this.boardStorageService.getBoards();
  }

  onClickBoard(board: Board){
    this.columns = this.columnStorageService.getColumnsByBoard(board);
  }
}

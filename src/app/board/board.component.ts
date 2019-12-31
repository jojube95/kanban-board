import {Component, OnInit} from '@angular/core';
import {Column} from "../models/column";
import { Observable } from 'rxjs';
import { ColumnStorageService } from '../services/column-storage.service';
import {Board} from "../models/board";
import {Task} from "../models/task";
import {BoardStorageService} from "../services/board-storage.service";
import {TaskStorageService} from '../services/task-storage.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  selectedBoard: Board;
  boards: Observable<Board[]>;
  columns: Observable<Column[]>;

  constructor(private boardStorageService: BoardStorageService, private columnStorageService: ColumnStorageService, public taskStorageService: TaskStorageService) { }

  ngOnInit() {
    this.selectedBoard = new Board('Select board', false);
    this.boards = this.boardStorageService.boards;
    this.columns = this.columnStorageService.columns;
    this.boards.subscribe(boards => {
      boards.forEach(board => {
        if(board.favourite){
          this.onClickBoard(board);
        }
      });
    });

    //this.taskStorageService.addTaskToDoing(new Task('Doing1', 'Doing1', '0', '0', 0, 0, false))

  }

  onClickBoard(board: Board){
    this.columnStorageService.getColumnsByBoard(board);
    this.selectedBoard = board;
  }

}

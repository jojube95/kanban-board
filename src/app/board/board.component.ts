import {Component, OnInit} from '@angular/core';
import {Column} from "../models/column";
import { Observable } from 'rxjs';
import { ColumnStorageService } from '../services/column-storage.service';
import {Board} from "../models/board";
import {BoardStorageService} from "../services/board-storage.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  selectedBoard: Board;
  boards: Observable<Board[]>;
  columns: Observable<Column[]>;

  constructor(private boardStorageService: BoardStorageService, private columnStorageService: ColumnStorageService) { }

  ngOnInit() {
    this.boards = this.boardStorageService.getBoards();
    this.boards.subscribe(boards => {
      boards.forEach(board => {
        if(board.favourite){
          this.onClickBoard(board);
        }
      });
    });
  }

  onClickBoard(board: Board){
    this.columns = this.columnStorageService.getColumnsByBoard(board);
    this.selectedBoard = board;
  }

  drop($event) {
    $event.preventDefault();
    //Catched element Id
    const data = $event.dataTransfer.getData('text');

    //Element target
    let target = $event.target;

    //Class of element target
    const targetClassName = target.className;

    while( target.className !== 'board-column') {
      target = target.parentNode;
    }

    console.log(target);
    target = target.querySelector('.tasks-container');
    console.log(target);

    if(targetClassName === 'tasks-container') {
      $event.target.parentNode.insertBefore(document.getElementById(data), $event.target);
    }
    else if(targetClassName === 'column-title') {
      if (target.children.length) {
        target.insertBefore(document.getElementById(data), target.children[0]);
      }else {
        target.appendChild(document.getElementById(data));
      }
    }
    else {
      target.appendChild(document.getElementById(data));
    }

  }
}

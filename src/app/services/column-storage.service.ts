import { Injectable } from '@angular/core';
import { Column } from '../models/column';
import { Board } from '../models/board';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnStorageService {
  columns: Column[] =[
    {
      _id: '0',
      name: 'To do',
      boardId: '0'
    },
    {
      _id: '1',
      name: 'Doing',
      boardId: '0'
    },
    {
      _id: '2',
      name: 'Done',
      boardId: '0'
    },
    {
      _id: '3',
      name: 'To do',
      boardId: '1'
    },
    {
      _id: '4',
      name: 'Doing',
      boardId: '1'
    },
    {
      _id: '5',
      name: 'Done',
      boardId: '1'
    }
  ];

  public getColumns(): Observable<Column[]> {
    const columnsObservable = new Observable<Column[]>(observer => {
      observer.next(this.columns);
    });
    return columnsObservable;
  }

  public getColumnsByBoard(board: Board): Observable<Column[]>{
    return of(this.columns.filter(column => column.boardId === board._id));
  }
}

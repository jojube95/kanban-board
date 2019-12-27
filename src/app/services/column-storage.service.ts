import { Injectable } from '@angular/core';
import {Task} from "../models/task";
import { Column } from '../models/column';
import { Board } from '../models/board';
import {Observable} from 'rxjs';

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
  ];

  public getColumns(): Observable<Column[]> {
    const columnsObservable = new Observable<Column[]>(observer => {
          setTimeout(() => {
              observer.next(this.columns);
          }, 1000);
    });
    return columnsObservable;
  }

  public getColumnsByBoard(board: Board): Observable<Column[]>{
    const columnsObservable = new Observable<Column[]>(observer => {
          setTimeout(() => {
              observer.next(this.columns);
          }, 1000);
    });
    return columnsObservable;
  }
}

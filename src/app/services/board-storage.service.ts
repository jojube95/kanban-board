import { Injectable } from '@angular/core';
import {Task} from "../models/task";
import { Column } from '../models/column';
import { Board } from '../models/board';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardStorageService {
  boards: Board[] = [
    {
      _id: '0',
      name: 'Board1',
      favourite: true
    }
  ];

  public getBoards(): Observable<Board[]> {
    const boardsObservable = new Observable<Board[]>(observer => {
          setTimeout(() => {
              observer.next(this.boards);
          }, 1000);
    });
    return boardsObservable;
  }
}

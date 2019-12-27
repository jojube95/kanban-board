import { Injectable } from '@angular/core';
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
    },
    {
      _id: '1',
      name: 'Board2',
      favourite: false
    }
  ];

  public getBoards(): Observable<Board[]> {
    const boardsObservable = new Observable<Board[]>(observer => {
      observer.next(this.boards);
    });
    return boardsObservable;
  }
}

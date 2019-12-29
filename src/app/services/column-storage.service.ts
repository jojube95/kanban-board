import { Injectable } from '@angular/core';
import { Board } from '../models/board';
import { Socket } from 'ngx-socket-io';
import { Column } from '../models/column';

@Injectable({
  providedIn: 'root'
})
export class ColumnStorageService {

  columns = this.socket.fromEvent<Column[]>('columns');

  constructor(private socket: Socket) {

  }

  public getColumnsByBoard(board: Board){
    this.socket.emit('getColumnsByBoard', board._id);
  }
}

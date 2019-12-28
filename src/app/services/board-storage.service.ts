import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import {Board} from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class BoardStorageService {

  boards = this.socket.fromEvent<Board[]>('boards');

  constructor(private socket: Socket){

  }
}

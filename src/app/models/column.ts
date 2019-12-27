export class Column {
  _id: string;
  name: string;
  boardId: string;

  constructor(name: string, boardId?: string) {
    this.name = name;
    this.boardId = boardId || null;
  }
}

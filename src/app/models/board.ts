export class Board {
  _id: string;
  name: string;
  favourite: boolean;

  constructor(name: string, favourite: boolean) {
    this.name = name;
    this.favourite = favourite;
  }
}

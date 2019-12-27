export class Project {
  _id: string;
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

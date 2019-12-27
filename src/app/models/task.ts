export class Task {
  _id: string;
  name: string;
  description: string;
  timeSpend: Number;
  timeStopwatch: Number;
  timeRunning: boolean;
  columnId: string;
  projectId: string;

  constructor(name: string, description: string, projectId: string,  columnId: string, timeSpend: Number) {
    this.name = name;
    this.description = description;
    this.timeSpend = timeSpend;
    this.columnId = columnId;
    this.projectId = projectId;
  }
}

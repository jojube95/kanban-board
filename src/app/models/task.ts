export class Task {
  _id: string;
  name: string;
  description: string;
  timeSpend: Number;
  timeStopwatch: any;
  timeRunning: boolean;
  columnId: string;
  projectId: string;

  constructor(name: string, description: string, projectId: string,  columnId: string, timeSpend: Number, timeStopwatch: Number, timeRunning: boolean) {
    this.name = name;
    this.description = description;
    this.timeSpend = timeSpend;
    this.timeStopwatch = timeStopwatch;
    this.timeRunning = timeRunning;
    this.columnId = columnId;
    this.projectId = projectId;
  }

}

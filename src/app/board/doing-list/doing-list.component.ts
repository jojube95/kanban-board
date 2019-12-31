import {Component, Input, OnInit} from '@angular/core';
import {Task} from 'protractor/built/taskScheduler';

@Component({
  selector: 'app-doing-list',
  templateUrl: './doing-list.component.html',
  styleUrls: ['./doing-list.component.scss']
})
export class DoingListComponent implements OnInit {
  @Input() tasks: [];
  constructor() { }

  ngOnInit() {
  }

}

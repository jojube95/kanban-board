import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './board/board.component';
import { ColumnComponent } from './board/column/column.component';
import { TaskComponent } from './board/column/task/task.component';
import { TaskDetailComponent } from './board/column/task-detail/task-detail.component';
import { EditInputComponent } from './board/column/task-detail/edit-input/edit-input.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { TaskAddComponent } from './board/column/task-add/task-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ColumnComponent,
    TaskComponent,
    TaskDetailComponent,
    EditInputComponent,
    TaskAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatDialogModule,
    NoopAnimationsModule,
    FormsModule
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    TaskDetailComponent,
    TaskAddComponent]
})
export class AppModule { }

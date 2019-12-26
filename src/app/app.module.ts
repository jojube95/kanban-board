import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './board/board.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ColumnComponent } from './board/column/column.component';
import { TaskComponent } from './board/column/task/task.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    NavbarComponent,
    ColumnComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

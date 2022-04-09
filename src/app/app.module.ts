import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { ScrollComponent } from './parts/scroll/scroll.component';
import { MenutoolbarComponent } from './parts/menutoolbar/menutoolbar.component';
import { MenupageComponent } from './parts/menupagelink/menupage.component';
import { MenusettingComponent } from './parts/menusetting/menusetting.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { TaskListComponent } from './page/task-list/task-list.component';
import { TaskInputComponent } from './parts/task-input/task-input.component'
import { TaskDetailComponent } from './page/task-detail/task-detail.component';
import { MemoListComponent } from './page/memo-list/memo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ScrollComponent,
    DashboardComponent,
    MenutoolbarComponent,
    MenupageComponent,
    MenusettingComponent,
    TaskDetailComponent,
    MemoListComponent,
    TaskListComponent,
    TaskInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

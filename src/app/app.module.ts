import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

import { HttpClientModule } from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { MenutoolbarComponent } from './parts/menutoolbar/menutoolbar.component';
import { MenupageComponent } from './parts/menupagelink/menupage.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { TaskListComponent } from './page/task-list/task-list.component';
import { TaskInputComponent } from './parts/task-input/task-input.component'
import { TaskDetailComponent } from './page/task-detail/task-detail.component';
import { MemoListComponent } from './page/memo-list/memo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MenutoolbarComponent,
    MenupageComponent,
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
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

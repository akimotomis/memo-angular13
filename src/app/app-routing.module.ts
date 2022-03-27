import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { TaskDetailComponent } from './page/task-detail/task-detail.component';
import { MemoListComponent } from './page/memo-list/memo-list.component';
import { TaskListComponent } from './page/task-list/task-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'memolist', component: MemoListComponent },
  { path: 'tasklist', component: TaskListComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

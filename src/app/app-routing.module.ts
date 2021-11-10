import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './page/dashboard/dashboard.component';
import { TaskDetailComponent } from './page/task-detail/task-detail.component';
import { MemoListComponent } from './page/memo-list/memo-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'list', component: MemoListComponent },
  { path: 'detail/:id', component: TaskDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { TaskService } from './../../service/task.service';
import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-menusetting',
  templateUrl: './menusetting.component.html',
  styleUrls: ['./menusetting.component.scss']
})
export class MenusettingComponent implements OnInit {

  constructor(private taskServise: TaskService) { }

  ngOnInit() {
  }

  /**
   * データベースをリセットする（deleteDatabase削除＋location.reload()再接続）
   *
   * @memberof TaskListDataSource
   */
   onResetButtonClick(): void {
    this.taskServise.deleteDB().subscribe()
  }
}

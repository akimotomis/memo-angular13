import { TaskService } from './../../service/task.service';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TaskListDataSource } from './task-list-datasource';
import { TaskListItem } from 'src/app/model/task';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  dataSource!: TaskListDataSource
  displayedColumns = ['id', 'title', 'updatedAt']

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<TaskListItem>;

  /** */
  // allTasks: TaskListItem[] = []
  statusName: string = 'all'
  statusList = [
    { name: 'all', status: true },
    { name: 'new', status: false },
    { name: 'wip', status: false },
    { name: 'done', status: false },
    { name: 'pending', status: false }
  ]
  /**
   * 入力検査結果（ボタン活性/非活性）
   *
   * @type {boolean}
   * @memberof TaskListComponent
   */
  isButtonDisabled: boolean = true

  constructor(
    private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.dataSource = new TaskListDataSource(this.taskService);
    this.dataSource.load()
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  /**
   * コンポーネントのビューを完全に初期化した後に呼び出されるライフサイクルフック。
   *
   * @memberof TaskListComponent
   */
  ngAfterViewInit(): void {

    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // sortChangeとpaginator入力Observableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.dataSource.getPage(this.paginator, this.sort))
      )
      .subscribe();

  }

  /**
   * 入力を検証する
   *
   * @param {string} inputText
   * @memberof TaskListComponent
   */
  validateInput(inputText: string): void {
    if (!inputText) {
      this.isButtonDisabled = true
    } else {
      this.isButtonDisabled = false
    }
  }

  addTask(inText: string): void {
    this.isButtonDisabled = true
    this.dataSource.add(inText)
  }
}

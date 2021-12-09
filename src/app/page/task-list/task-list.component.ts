import { TaskService } from './../../service/task.service';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TaskListDataSource } from './task-list-datasource';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {

  dataSource!: TaskListDataSource
  displayedColumns = ['id', 'title', 'updatedAt', 'createdAt', 'delbtn']

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort
  // @ViewChild(MatTable) table!: MatTable<TaskListItem>
  selectedrow: number = 0

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
    // Before render
    this.dataSource = new TaskListDataSource(this.taskService)
    this.selectedrow = this.taskService.EditId
}
  /**
   * コンポーネントのビューを完全に初期化した後に呼び出されるライフサイクルフック。
   *
   * @memberof TaskListComponent
   */
  ngAfterViewInit(): void {

    this.dataSource.load(this.paginator, this.sort)

    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)

    // sortChangeとpaginator入力Observableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.dataSource.getPage(this.paginator, this.sort))
      )
      .subscribe(
        () => {
          console.log('After merge complete')
        }
      );

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

  onAdd(inText: string): void {
    this.isButtonDisabled = true
    this.dataSource.add(inText)
  }

  onDelete(id: number): void {
    this.taskService.EditId = '';
    this.dataSource.del(id)
  }
}

import { TaskService } from './../../service/task.service';
import { OnInit, AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { TaskListDataSource } from './task-list-datasource';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  // @ViewChild(MatTable) table!: MatTable<TaskListItem>

  // properties
  public dataSource: TaskListDataSource = new TaskListDataSource(this.taskService)
  public selectedrow: number = this.taskService.SelectedRow
  public pageIndex: number = this.taskService.PageIndex
  public pageSize: number = this.taskService.PageSize
  public sortState: Sort = this.taskService.SortState
  // public sortActive:string = this.taskService.SortAactive
  // public sortDirection:SortDirection = this.taskService.SortDirection

  public displayedColumns = ['id', 'title', 'updatedAt', 'createdAt', 'delbtn']

  // statusName: string = 'all'
  // statusList = [
  //   { name: 'all', status: true },
  //   { name: 'new', status: false },
  //   { name: 'wip', status: false },
  //   { name: 'done', status: false },
  //   { name: 'pending', status: false }
  // ]
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
    // detailからの戻りの場合、編集対象のIDでListを復元する
    if (this.selectedrow) {
      console.log('selectedrow::' + this.taskService.SelectedRow)
      this.taskService.SelectedRow = 0
      this.dataSource.dataLength = this.taskService.Data.length
      this.dataSource.getPage(this.paginator, this.sort)
    } else {
      this.dataSource.load()
    }
  }
  /**
   * コンポーネントのビューを完全に初期化した後に呼び出されるライフサイクルフック。
   *
   * @memberof TaskListComponent
   */
  ngAfterViewInit(): void {

    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)

    // sortChangeとpaginator入力Observableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(
        () => {
          // List復元用のpaginator設定値を退避する
          if (this.sort.active) {
            this.taskService.SortState.active = this.sort.active
            this.taskService.SortState.direction = this.sort.direction
          }
          if (this.paginator.page) {
            this.taskService.PageIndex = this.paginator.pageIndex
            this.taskService.PageSize = this.paginator.pageSize
          }

          this.dataSource.getPage(this.paginator, this.sort)
        })
      )
      .subscribe(
        () => {
          console.log('After merge complete')
        }
      )

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
    this.taskService.SelectedRow = '';
    this.dataSource.del(id)
  }
}

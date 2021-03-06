import { OnInit, AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { DOCUMENT, ViewportScroller } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { fromEvent, map, merge, Observable, tap } from 'rxjs';
import { TaskService } from './../../service/task.service';
import { TaskListDataSource } from './task-list-datasource';

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
  public displayedColumns = ['No', 'title', 'updatedAt', 'createdAt', 'delbtn']
  public selectedrow: number = this.taskService.Share.SelectedRow
  public pageIndex: number = this.taskService.Share.PageIndex
  public pageSize: number = this.taskService.Share.PageSize
  public pageSizeOptions: number[] = this.taskService.Share.pageSizeOptions;

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
  public isButtonDisabled: boolean = true
  public readonly showScroll$: Observable<boolean> = fromEvent(
    this.document,
    'scroll'
  ).pipe(
    map(() => this.viewport.getScrollPosition()?.[1] > 0)
  );

  constructor(@Inject(DOCUMENT)
    private readonly document: Document,
    private readonly viewport: ViewportScroller,
    private taskService: TaskService) {
  }

  ngOnInit(): void {
    // detailからの戻りの場合、編集対象のIDでListを復元する
    this.selectedrow = parseInt(this.taskService.Share.SelectedRow, 10);
    if (this.taskService.Share.Data.length) {
      console.log('selectedrow::' + this.selectedrow);
      this.dataSource.dataLength = this.taskService.Share.Data.length;
      this.dataSource.getPage();
    } else {
      this.dataSource.load();
    }
    //  if (this.selectedrow) {
    //     console.log('selectedrow::' + this.taskService.Share.SelectedRow)
    //     this.taskService.Share.SelectedRow = ''
    //     this.dataSource.dataLength = this.taskService.Share.Data.length
    //     this.dataSource.getPage()
    //   } else {
    //     this.dataSource.load()
    //   }
  }
  /**
   * コンポーネントのビューを完全に初期化した後に呼び出されるライフサイクルフック。
   *
   * @memberof TaskListComponent
   */
  ngAfterViewInit(): void {
    // 選択行をリセットする
    this.taskService.Share.SelectedRow = 0;

    // ソート後にページネーターをリセットする
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0)

    // sortChangeとpaginator入力Observableを一つにする
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(
        () => {
          // List復元用のpaginator設定値を退避する
          if (this.sort.active) {
            this.taskService.Share.SortActive = this.sort.active
            this.taskService.Share.SortDirection = this.sort.direction
          }
          if (this.paginator.page) {
            this.taskService.Share.PageIndex = this.paginator.pageIndex
            this.taskService.Share.PageSize = this.paginator.pageSize
          }

          this.dataSource.getPage()
        })
      )
      .subscribe(
        () => {
          console.log('ngAfterViewInit merge complete')
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

  inputAdd(inText: string): void {
    this.isButtonDisabled = true
    this.dataSource.add(inText)
  }

  onDelete(id: number): void {
    this.taskService.Share.SelectedRow = '';
    this.dataSource.del(id)
  }

  onScrollToTop(): void {
    this.viewport.scrollToPosition([0, 0]);
  }
}

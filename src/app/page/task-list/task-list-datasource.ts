import { TaskService } from './../../service/task.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, map, tap } from 'rxjs/operators';
import { Observable, of as observableOf, merge, BehaviorSubject, of } from 'rxjs';
import { TaskListItem } from './../../model/task';
import { TaskAddItem } from './../../model/task';

const DEFAULT_ADD: TaskAddItem = {
  status: '',
  title: '',
  content: '',
  createdAt: '',
  updatedAt: ''
}
const DEFAUL_LIST: TaskListItem = {
  id: 0,
  status: '',
  title: '',
  content: '',
  createdAt: '',
  updatedAt: ''
}

/**
 * TaskListビューのデータソース
 * データを操作するロジックをカプセル化します。
 * (including sorting, pagination, and filtering).
 */
export class TaskListDataSource implements DataSource<TaskListItem> {
  public data: TaskListItem[] = [];
  private paginator!: MatPaginator;
  private sort!: MatSort;

  private subject = new BehaviorSubject<TaskListItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();


  constructor(private taskServise: TaskService) {
    // super();
  }

  /**
   * 全データをロードする
   *
   * @memberof TaskListDataSource
   */
  load(): void {
    this.loadingSubject.next(true);

    this.taskServise.get().pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(tasks => {
         this.subject.next(tasks)
         this.data = tasks
        });
    // .subscribe(tasks => { this.data = tasks });
  }

  connect(collectionViewer: CollectionViewer): Observable<TaskListItem[]> {
    console.log("Connecting data source");
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
    this.loadingSubject.complete();
  }

  add(title: string): void {
    let addItem: TaskAddItem = DEFAULT_ADD
    addItem.title = title
    Object.assign(DEFAUL_LIST, addItem)
    this.taskServise.post(addItem).subscribe(id => {
      DEFAUL_LIST.id = id
      this.data.push(DEFAUL_LIST)
    })
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  getPage(paginator: MatPaginator, sort: MatSort): void {
    this.paginator = paginator;
    this.sort = sort;
    this.data= this.getPagedData(this.getSortedData([...this.data]));
    this.subject.next(this.data);

  }

  private getPagedData(data: TaskListItem[]): TaskListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TaskListItem[]): TaskListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'updatedAt': return compare(a.updatedAt, b.updatedAt, isAsc);
        case 'title': return compare(a.title, b.title, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

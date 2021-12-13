import { Injectable } from '@angular/core';
import { TaskListItem } from '../model/task';

import { Observable, Observer, ReplaySubject, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /** InexDBをRxjsでラップする  */
  private db: Subject<IDBDatabase> = new ReplaySubject<IDBDatabase>(1);

  private dbSettings = {
    name: 'todos-vue',
    version: 1
  }
  private storeSettings = {
    name: 'tasks',
    storeOptions: { keyPath: 'id', autoIncrement: true },
    indexes: [
      // { indexName: 'comment', unique: false },
      { indexName: 'status', unique: false },
      { indexName: 'title', unique: false },
      { indexName: 'content', unique: false },
      { indexName: 'createdAt', unique: false },
      { indexName: 'updatedAt', unique: false }
    ]
  }
  /**
   * List表示位置復元のための情報（ID等）を共有保持する
   *
   * @memberof TaskService
   */
  public SelectedRow: any = 0
  public PageIndex: number = 0
  public PageSize: number = 10
  // public SortAactive: string = 'ID'
  public SortState: Sort = { active: 'ID', direction: 'asc' }
  public Data: TaskListItem[] = []

  constructor() {
    /**データベースをオープンする */
    const request = indexedDB.open(this.dbSettings.name)

    request.onsuccess = (event: any) => {
      const db: IDBDatabase = event.target.result
      this.db.next(db)
    }

    request.onerror = (error) => {
      this.db.error(error)
      this.db.complete()
    }

    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result

      //object storeが存在する場合削除して作り直し(auto incrementをリセットするため)
      if (Array.from(db.objectStoreNames).includes(this.storeSettings.name)) {
        db.deleteObjectStore(this.storeSettings.name)
      }

      const objectStore = db.createObjectStore(this.storeSettings.name, this.storeSettings.storeOptions)
      this.storeSettings.indexes.forEach((obj) => {
        objectStore.createIndex(obj.indexName, obj.indexName, { unique: obj.unique })
      })
    }
  }


  /** task取得 */
  get(id?: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.db.pipe(
          take(1)
        ).subscribe(db => {
          const transaction = db.transaction(this.storeSettings.name, "readonly")
          const objectStore = transaction.objectStore(this.storeSettings.name)
          let request;

          if (id) {
            request = objectStore.get(parseInt(id))
          } else {
            request = objectStore.getAll()
          }

          request.onsuccess = (event: any) => {
            if (!id) {
              this.Data = event.target.result
            }
            observer.next(event.target.result)
            observer.complete()
          }

          request.onerror = (event: any) => observer.error(event.target.error)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  /** task追加 */
  post(task: TaskListItem): Observable<number> {
    return new Observable((observer: Observer<number>) => {
      try {
        this.db.pipe(
          take(1)
        ).subscribe(db => {
          const transaction = db.transaction(this.storeSettings.name, "readwrite");
          const objectStore = transaction.objectStore(this.storeSettings.name)
          const request = objectStore.add(task)

          request.onsuccess = (event: any) => {
            observer.next(event.target.result)
            observer.complete()
          }

          request.onerror = (event: any) => observer.error(event.target.error)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  /** task更新 */
  put(task: TaskListItem): Observable<TaskListItem> {
    return new Observable((observer: Observer<TaskListItem>) => {
      try {
        this.db.pipe(
          take(1)
        ).subscribe(db => {
          const transaction = db.transaction(this.storeSettings.name, "readwrite");
          const objectStore = transaction.objectStore(this.storeSettings.name)
          const request = objectStore.put(task)

          request.onsuccess = (event: any) => {
            observer.next(event.target.result)
            observer.complete()
          }

          request.onerror = (event: any) => observer.error(event.target.error)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  /** task削除 */
  delete(id: any): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.db.pipe(
          take(1)
        ).subscribe(db => {
          const transaction = db.transaction(this.storeSettings.name, "readwrite")
          const objectStore = transaction.objectStore(this.storeSettings.name)
          const request = objectStore.delete(parseInt(id))

          request.onsuccess = (event: any) => {
            observer.next(event.type)
            observer.complete()
          }

          request.onerror = (event: any) => observer.error(event.target.error)
        })
      } catch (error) {
        observer.error(error)
      }
    })
  }

  deleteDB(): Observable<any> {
    return new Observable((observer: Observer<any>) => {
      try {
        this.db.pipe(
          take(1)
        ).subscribe(db => {
          const request = indexedDB.deleteDatabase(this.dbSettings.name)
          db.close()

          request.onsuccess = (event) => {
            document.location.reload()
            observer.next(event.type)
            observer.complete()
          }

          request.onblocked = () => {
            alert('errror! 複数タブでは実行できません。 タブを閉じてください')
          }

          request.onerror = (event: any) => observer.error(event.target.error)
        })
      } catch {

      }
    })
  }
}

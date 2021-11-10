import { Injectable } from '@angular/core';
// import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService {

  createDb() {
    const tasks = [
      {id: 1, comment:'task1', status: 'new'},
      {id: 2, comment:'task2', status: 'new'},
      {id: 3, comment:'task3', status: 'new'},
      {id: 4, comment:'task4', status: 'new'},
      {id: 5, comment:'task5', status: 'new'},
      {id: 6, comment:'task6', status: 'new'},
      {id: 7, comment:'task7', status: 'new'},
      {id: 8, comment:'task8', status: 'pending'},
      {id: 9, comment:'task9', status: 'wip'},
      {id: 10, comment:'task10', status: 'done'}
    ]

    return { tasks }
  }

  genID(tasks: Task[]): number {
    return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 11;
  }
 }

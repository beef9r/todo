import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListItem } from '../domain/list-item';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  private subject = new Subject<any>();

  change(todos: ListItem[], dones: ListItem[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('dones', JSON.stringify(dones));

    this.subject.next({ todos, dones });
  }

  onChange(): Observable<any> {
    this.restore();

    return this.subject.asObservable();
  }

  restore(): void {
    const todos: ListItem[] = JSON.parse(localStorage.getItem('todos')) || [];
    const dones: ListItem[] = JSON.parse(localStorage.getItem('dones')) || [];

    this.subject.next({ todos, dones });
  }

  clear(): void {
    localStorage.removeItem('todos');
    localStorage.removeItem('dones');

    this.subject.next({ todos: [], dones: [] });
  }
}

import { Component, OnDestroy } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { ListItem } from './../../domain/list-item';
import { TodoService } from './../../services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnDestroy {
  subscription: Subscription;
  new: string;
  editing: string;
  todoItems: ListItem[] = [];
  doneItems: ListItem[] = [];

  constructor(private todoService: TodoService) {
    this.subscription = this.todoService.onChange().subscribe((obj) => {
      console.log(obj);
      if (obj) {
        this.todoItems = obj.todos;
        this.doneItems = obj.dones;
      }
    });
    this.todoService.restore();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /*angular material cdk example*/
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.todoService.change(this.todoItems, this.doneItems);
  }

  add(event: Event): void {
    if (this.new.trim().length === 0) {
      return;
    }
    const newItem: ListItem = {
      uuid: uuidv4(),
      text: this.new,
      editing: false,
    };
    this.todoItems.push(newItem);
    this.new = '';
    this.todoService.change(this.todoItems, this.doneItems);
  }

  startEditing(item: ListItem): void {
    this.todoItems.filter((n) => n.editing).forEach((n) => (n.editing = false));
    this.doneItems.filter((n) => n.editing).forEach((n) => (n.editing = false));
    this.editing = item.text;
    item.editing = true;
    this.todoService.change(this.todoItems, this.doneItems);
  }

  edit(event: Event, item: ListItem): void {
    if (this.editing.trim().length === 0) {
      return;
    }
    item.text = this.editing;
    this.editing = '';
    item.editing = false;
    this.todoService.change(this.todoItems, this.doneItems);
  }

  cancelEditing(item: ListItem): void {
    this.editing = '';
    item.editing = false;
    this.todoService.change(this.todoItems, this.doneItems);
  }

  delete(list: string[], index: number): void {
    list.splice(index, 1);
    this.todoService.change(this.todoItems, this.doneItems);
  }
}

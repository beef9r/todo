import { OnDestroy } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from './../../services/todo.service';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnDestroy {
  subscription: Subscription;
  todoCount: number;

  constructor(private todoService: TodoService) {
    this.subscription = this.todoService.onChange().subscribe((obj) => {
      if (obj) {
        this.todoCount = obj.todos.length;
      }
    });
    this.todoService.restore();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clear(): void {
    this.todoService.clear();
  }
}

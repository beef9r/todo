import { Component } from '@angular/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public activeLink: string;
  public links: any = [
    { name: '/welcome', displayText: 'Willkommen' },
    { name: '/todos', displayText: 'Aufgabenliste' },
  ];
}

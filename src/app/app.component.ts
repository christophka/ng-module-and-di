import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/shared/message-bus/messenger.service';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-module-and-di';

  constructor(
    private messenger: MessengerService,
    private appService: AppService
  ) {
    this.messenger.broadcast('AppComponent constructor');
  }

  ngOnInit(): void {
    this.messenger.broadcast('AppComponent ngOnInit');
  }
}

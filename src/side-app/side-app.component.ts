import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/shared/message-bus/messenger.service';
import { SideAppService } from './services/side-app.service';

@Component({
  selector: 'side-app-root',
  templateUrl: './side-app.component.html',
  styleUrls: ['./side-app.component.scss'],
})
export class SideAppComponent implements OnInit {
  title = 'side-app';
  protected clicks = 0;

  constructor(
    private messenger: MessengerService,
    private sideAppService: SideAppService
  ) {
    this.messenger.broadcast('SideAppComponent constructor called');
  }

  ngOnInit(): void {
    this.messenger.broadcast('SideAppComponent ngOnInit');
  }
}

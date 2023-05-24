import { Component, OnDestroy } from '@angular/core';
import { MessengerService } from 'src/shared/message-bus/messenger.service';

@Component({
  template: '<shared-click-count-button></shared-click-count-button>',
})
export class AppClickCountPage implements OnDestroy {
  constructor(private messenger: MessengerService) {
    this.messenger.broadcast('side-app-navigation', { url: '/count' });
  }

  ngOnDestroy(): void {
    this.messenger.broadcast('side-app-navigation', { url: '/' });
  }
}

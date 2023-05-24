import { Component, HostBinding, OnInit } from '@angular/core';
import { MessengerService } from 'src/shared/message-bus/messenger.service';
import { SideAppService } from './services/side-app.service';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { Message } from 'src/shared/message-bus/message-bus.service';
import { filter, first } from 'rxjs';
import { SideAppEmptyPageComponent } from './pages/empty.page.component';

@Component({
  selector: 'side-app-root',
  templateUrl: './side-app.component.html',
  styleUrls: ['./side-app.component.scss'],
})
export class SideAppComponent implements OnInit {
  title = 'side-app';

  @HostBinding('class.is-visible')
  protected isVisible = false;

  constructor(
    private messenger: MessengerService,
    private sideAppService: SideAppService,
    private router: Router
  ) {
    this.messenger.broadcast('SideAppComponent constructor called');
    this.router.events
      .pipe(
        filter((ev): ev is ActivationEnd => ev instanceof ActivationEnd),
        first()
      )
      .subscribe((ev) => {
        this.sideAppService.setHasContent(
          ev.snapshot.component !== SideAppEmptyPageComponent
        );
      });

    // Listen for messages
    this.messenger.message$.subscribe((msg) => {
      this.onMessage(msg);
    });

    // Update visibility
    this.sideAppService.hasContent$.subscribe((hasContent) => {
      this.isVisible = hasContent;
    });
  }

  ngOnInit(): void {
    this.messenger.broadcast('SideAppComponent ngOnInit');
  }

  private onMessage({ message, data }: Message<unknown>) {
    switch (message) {
      case 'side-app-navigation':
        const url = (data as any)?.url;
        typeof url === 'string' && this.onNavigate(url);
        break;
    }
  }

  private onNavigate(url: string) {
    void this.router.navigateByUrl(url);
  }
}

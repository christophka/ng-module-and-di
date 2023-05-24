import { ChangeDetectorRef, Component } from '@angular/core';
import { ClickCountDirective } from './click-count.directive';

@Component({
  standalone: true,
  selector: 'shared-click-count-button',
  template: `
    <div><strong>Clicks: </strong> {{ clicks }}</div>
    <button count-clicks (clicksChanged)="clicks = $event; detectChanges()">
      count click
    </button>
  `,
  imports: [ClickCountDirective],
})
export class ClickCountButton {
  protected clicks = 0;

  constructor(private cd: ChangeDetectorRef) {}

  protected detectChanges() {
    this.cd.detectChanges();
  }
}

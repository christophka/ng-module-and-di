import { Component, OnDestroy } from '@angular/core';
import { SideAppService } from '../services/side-app.service';

@Component({
  template: '',
})
export class SideAppEmptyPageComponent implements OnDestroy {
  constructor(private sideAppService: SideAppService) {
    this.sideAppService.setHasContent(false);
  }

  ngOnDestroy(): void {
    this.sideAppService.setHasContent(true);
  }
}

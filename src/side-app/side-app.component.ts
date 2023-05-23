import { Component } from '@angular/core';
import { SideAppService } from './services/side-app.service';

@Component({
  selector: 'side-app-root',
  templateUrl: './side-app.component.html',
  styleUrls: ['./side-app.component.scss'],
})
export class SideAppComponent {
  title = 'side-app';

  constructor(private sideAppService: SideAppService) {}
}

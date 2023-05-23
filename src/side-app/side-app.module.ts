import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SideAppRoutingModule } from './side-app-routing.module';
import { SideAppComponent } from './side-app.component';

@NgModule({
  declarations: [SideAppComponent],
  imports: [BrowserModule, SideAppRoutingModule],
  providers: [],
  bootstrap: [SideAppComponent],
})
export class SideAppModule {}

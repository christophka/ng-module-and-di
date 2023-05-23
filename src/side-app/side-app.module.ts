import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickCountDirective } from 'src/shared/click-count/click-count.directive';
import { SideAppRoutingModule } from './side-app-routing.module';
import { SideAppComponent } from './side-app.component';

@NgModule({
  declarations: [SideAppComponent],
  imports: [BrowserModule, SideAppRoutingModule, ClickCountDirective],
  providers: [],
  bootstrap: [SideAppComponent],
})
export class SideAppModule {}

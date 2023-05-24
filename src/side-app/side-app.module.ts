import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickCountButton } from 'src/shared/click-count/click-count-button.component';
import { SideAppClickCountPage } from './pages/side-app-click-count.page.component';
import { SideAppRoutingModule } from './side-app-routing.module';
import { SideAppComponent } from './side-app.component';

@NgModule({
  declarations: [SideAppComponent, SideAppClickCountPage],
  imports: [BrowserModule, SideAppRoutingModule, ClickCountButton],
  providers: [],
  bootstrap: [SideAppComponent],
})
export class SideAppModule {}

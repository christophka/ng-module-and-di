import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickCountButton } from 'src/shared/click-count/click-count-button.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppClickCountPage } from './pages/app-click-count.page.component';

@NgModule({
  declarations: [AppComponent, AppClickCountPage],
  imports: [BrowserModule, AppRoutingModule, ClickCountButton],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClickCountDirective } from 'src/shared/click-count/click-count.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ClickCountDirective],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

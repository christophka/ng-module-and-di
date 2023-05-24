import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppClickCountPage } from './pages/app-click-count.page.component';

const routes: Routes = [
  {
    path: 'count',
    component: AppClickCountPage,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

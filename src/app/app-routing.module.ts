import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppClickCountPage } from './pages/app-click-count.page.component';
import { GardenPageComponent } from './pages/garden.page.component';

const routes: Routes = [
  {
    path: 'count',
    component: AppClickCountPage,
  },
  {
    path: 'garden',
    component: GardenPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

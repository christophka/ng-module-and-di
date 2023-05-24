import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideAppClickCountPage } from './pages/side-app-click-count.page.component';
import { SideAppEmptyPageComponent } from './pages/empty.page.component';

const routes: Routes = [
  {
    path: 'count',
    component: SideAppClickCountPage,
  },
  {
    path: '**',
    component: SideAppEmptyPageComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledNonBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class SideAppRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegTrabPage } from './reg-trab.page';

const routes: Routes = [
  {
    path: '',
    component: RegTrabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegTrabPageRoutingModule {}

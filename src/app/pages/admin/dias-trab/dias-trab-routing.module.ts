import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiasTrabPage } from './dias-trab.page';

const routes: Routes = [
  {
    path: '',
    component: DiasTrabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiasTrabPageRoutingModule {}

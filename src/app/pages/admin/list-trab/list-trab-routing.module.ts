import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListTrabPage } from './list-trab.page';

const routes: Routes = [
  {
    path: '',
    component: ListTrabPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListTrabPageRoutingModule {}

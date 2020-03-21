import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JaulasPage } from './jaulas.page';

const routes: Routes = [
  {
    path: '',
    component: JaulasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JaulasPageRoutingModule {}

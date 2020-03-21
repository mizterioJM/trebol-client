import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkingPage } from './working.page';

const routes: Routes = [
  {
    path: '',
    component: WorkingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkingPageRoutingModule {}

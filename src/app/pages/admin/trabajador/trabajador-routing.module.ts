import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrabajadorPage } from './trabajador.page';

const routes: Routes = [
  {
    path: 'trabajador',
    component: TrabajadorPage,
    children: [
      {
        path: 'list-trab',
        loadChildren: () =>
          import('../list-trab/list-trab.module').then(
            (m) => m.ListTrabPageModule,
          ),
      },
      {
        path: 'reg-trab',
        loadChildren: () =>
          import('../reg-trab/reg-trab.module').then(
            (m) => m.RegTrabPageModule,
          ),
      },
      {
        path: 'dias-trab',
        loadChildren: () =>
          import('../dias-trab/dias-trab.module').then(
            (m) => m.DiasTrabPageModule,
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'trabajador/list-trab',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabajadorPageRoutingModule {}

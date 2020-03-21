import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminPage,
    children: [
      {
        path: 'servicios',
        loadChildren: () =>
          import('./servicios/servicios.module').then(
            (m) => m.ServiciosPageModule,
          ),
      },
      {
        path: 'trabajador',
        loadChildren: () =>
          import('./trabajador/trabajador.module').then(
            (m) => m.TrabajadorPageModule,
          ),
      },
      {
        path: 'vehiculo',
        loadChildren: () =>
          import('./vehiculo/vehiculo.module').then(
            (m) => m.VehiculoPageModule,
          ),
      },
      {
        path: 'rutas',
        loadChildren: () =>
          import('./rutas/rutas.module').then((m) => m.RutasPageModule),
      },
      {
        path: 'jaulas',
        loadChildren: () =>
          import('./jaulas/jaulas.module').then((m) => m.JaulasPageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'admin/servicios',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}

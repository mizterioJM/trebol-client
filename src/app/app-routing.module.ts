import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@myapp-guards/auth.guard';
import { Role } from '@myapp-enums/role.enum';
import { ServicioResolver } from '@myapp-resolver/servicio.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminPageModule),
    canActivate: [AuthGuard],
    data: {
      role: Role.ROLE_ADM,
    },
    resolve: {
      servicios: ServicioResolver,
    },
  },
  {
    path: 'working/:userId',
    loadChildren: () =>
      import('./pages/working/working.module').then((m) => m.WorkingPageModule),
    canActivate: [AuthGuard],
    data: {
      role: Role.ROLE_USER,
    },
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

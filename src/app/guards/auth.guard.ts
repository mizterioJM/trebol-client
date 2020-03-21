import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@myapp-services/auth.service';
import { take, map } from 'rxjs/operators';
import { UIService } from '@myapp-services/ui.service';
import { Role } from '@myapp-enums/role.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly router: Router,
    private readonly _uiService: UIService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    const expectedRole = route.data.role;
    return this._authService.user.pipe(
      take(1),
      map((user) => {
        if (user) {
          const roles = this._authService.getRoles();
          let roleExist: boolean;
          roles.map((role: any) => {
            if (role === expectedRole) {
              roleExist = true;
              return roleExist;
            }
          });

          if (!roleExist) {
            this._uiService.showAlert(
              'NO AUTORIZADO',
              'No tiene permiso para ingresar.',
            );

            roles.map((role: any) => {
              if (role === Role.ROLE_ADM) {
                this.router.navigateByUrl('/admin');
              } else if (role === Role.ROLE_USER) {
                this.router.navigateByUrl('/working');
              }
            });
            roleExist = false;
          }

          return roleExist;
        } else {
          this._uiService.showAlert(
            'NO AUTORIZADO',
            'No tienes permiso para ingresar.',
          );
          this.router.navigateByUrl('/');
          return false;
        }
      }),
    );
  }
}

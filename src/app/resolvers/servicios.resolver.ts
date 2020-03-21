import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { ServicioService } from '@myapp-services/servicio.service';
import * as moment from 'moment';
import { AuthService } from '@myapp-services/auth.service';
import { catchError } from 'rxjs/operators';
import { RutaService } from '@myapp-services/ruta.service';
import { JaulaService } from '@myapp-services/jaula.service';
import { VehiculoService } from '@myapp-services/vehiculo.service';
import { UserService } from '@myapp-services/user.service';

@Injectable({
  providedIn: 'root',
})
export class ServiciosResolver implements Resolve<Observable<any>> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    const userId = route.paramMap.get('userId');
    // return of(
    //   this._servicioSevice.getServicioFecha(fecha).pipe(
    //     catchError((err) => {
    //       console.log(err);
    //       return err.status;
    //     }),
    //   ),
    // );

    return forkJoin(
      this._rutaService.getRutas(),
      this._jaulaService.getJaulas(),
      this._vehiculoService.getVehicles(),
      this._userService.getUser(userId),
      this._userService.getUsersApoyo(),
    );
  }

  constructor(
    private readonly _rutaService: RutaService,
    private readonly _jaulaService: JaulaService,
    private readonly _vehiculoService: VehiculoService,
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}
}

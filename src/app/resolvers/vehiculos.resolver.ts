import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { VehiculoService } from '@myapp-services/vehiculo.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehiculosResolver implements Resolve<Observable<any>> {
  constructor(private readonly _vehiculoService: VehiculoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return of(
      this._vehiculoService.getVehicles().pipe(
        catchError((err) => {
          console.log(err.status);
          return err.status;
        }),
      ),
    );
  }
}

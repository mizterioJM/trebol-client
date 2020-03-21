import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { empty, of } from 'rxjs';
import { ServicioService } from '@myapp-services/servicio.service';

import * as moment from 'moment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServicioResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const fecha = moment().format('YYYY-MM-DD');
    return of(
      this._servicioService.getServicioFecha(fecha).pipe(
        catchError((err) => {
          console.log(err.status);
          return err.status;
        }),
      ),
    );
  }

  constructor(private readonly _servicioService: ServicioService) {}
}

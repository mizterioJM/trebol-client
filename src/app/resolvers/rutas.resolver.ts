import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RutaService } from '@myapp-services/ruta.service';
import { catchError, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RutasResolver implements Resolve<any> {
  constructor(private readonly _rutaService: RutaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return of(
      this._rutaService.getRutas().pipe(
        take(2),
        catchError((err) => {
          console.log(err.status);
          return err.status;
        }),
      ),
    );
  }
}

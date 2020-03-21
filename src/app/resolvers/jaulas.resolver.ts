import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, interval } from 'rxjs';
import { JaulaService } from '@myapp-services/jaula.service';
import { catchError, timeInterval, tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JaulasResolver implements Resolve<Observable<any>> {
  constructor(private readonly _jaulaService: JaulaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return of(
      this._jaulaService.getJaulas().pipe(
        take(2),
        catchError((err) => {
          console.log(err.status);
          return err.status;
        }),
      ),
    );
  }
}

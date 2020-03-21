import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { UserService } from '@myapp-services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<Observable<any>> {
  constructor(private readonly _userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    if (route.paramMap.has('userId')) {
      return of(
        this._userService.getUser(route.paramMap.get('userId')).pipe(
          catchError((err) => {
            console.log(err);
            return err.status;
          }),
        ),
      );
    } else {
      return EMPTY;
    }
  }
}

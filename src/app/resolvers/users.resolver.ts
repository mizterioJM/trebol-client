import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '@myapp-services/user.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersResolver implements Resolve<Observable<any>> {
  constructor(private readonly _userService: UserService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return of(
      this._userService.getUsersApoyo().pipe(
        catchError((err) => {
          console.log(err.status);
          return err.status;
        }),
      ),
    );
  }
}

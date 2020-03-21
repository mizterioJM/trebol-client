import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { Storage } from '@ionic/storage';
import { TOKEN } from '@myapp-enums/token.enum';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  token: string;
  constructor(private readonly _storage: Storage) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const tokenPromise = this._storage.get(TOKEN.TOKEN_KEY);

    return from(tokenPromise).pipe(
      mergeMap((token) => {
        if (token) {
          request = request.clone({
            headers: request.headers
              .set('Access-Control-Allow-Origin', '*')
              .set(
                'Access-Control-Allow-Methods',
                'POST, GET, PUT, PATCH, DELETE, OPTIONS',
              )
              .set('Access-Control-Allow-Credentials', 'false')
              .set('Access-Control-Max-Age', '86400')
              .set(
                'Access-Control-Allow-Headers',
                'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
              )
              .set('Content-Type', 'application/json')
              .set('Authorization', 'Bearer ' + token),
          });
        }

        // if (!request.headers.has('Content-Type')) {
        //   request = request.clone({
        //     headers: request.headers.set('Content-Type', 'application/json'),
        //   });
        // }

        // request = request.clone({
        //   headers: request.headers.set('Accept', 'application/json'),
        // });

        return next.handle(request);
      }),
    );
  }
}

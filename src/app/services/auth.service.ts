import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';
import { TOKEN } from '@myapp-enums/token.enum';
import { ILogin } from '@myapp-interfaces/login.interface';
import { environment } from 'environments/environment';
import { IToken } from '@myapp-interfaces/token.interface';
import { UIService } from './ui.service';

const _helper = new JwtHelperService();
const URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(
    private readonly _storage: Storage,
    private readonly _http: HttpClient,
    private readonly plt: Platform,
    private readonly router: Router,
    private readonly _uiService: UIService,
  ) {
    this.loadStoredToken();
  }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this._storage.get(TOKEN.TOKEN_KEY));
      }),
      map((res) => {
        if (res) {
          let decoded = _helper.decodeToken(res);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      }),
    );
  }

  login(credentials: ILogin) {
    return this._http.post(`${URL}/auth/login`, credentials).pipe(
      take(1),
      map((res: IToken) => {
        return res.token;
      }),
      switchMap((token) => {
        let decoded = _helper.decodeToken(token);
        this.userData.next(decoded);
        let storageObs = from(this._storage.set(TOKEN.TOKEN_KEY, token));

        return storageObs;
      }),
    );
  }

  getUser() {
    return this.userData.getValue();
  }

  getRoles() {
    const roles = this.getUser();

    return roles.roles;
  }

  logout() {
    this._storage.remove(TOKEN.TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }

  async isTokenExpired() {
    const token = await this._storage.get(TOKEN.TOKEN_KEY);
    const isExpired = _helper.isTokenExpired(token);
    if (isExpired) {
      this.logout();
      this._uiService.showAlert('Tiempo Expirado', 'Vuelva a Logearse.');
    }
  }

  async getToken() {
    const token = this._storage.get(TOKEN.TOKEN_KEY);
    return token;
  }
}

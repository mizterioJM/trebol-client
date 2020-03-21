import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '@myapp-interfaces/user.interface';
import { IUserxDias } from '@myapp-interfaces/user-dias.interface';
import { IUserRegistro } from '@myapp-interfaces/user-registro.interface';

const URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUser(userId: string): Observable<IUser> {
    return this.http.get<IUser>(`${URL}/user/${userId}`);
  }

  getUsersChofer(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${URL}/user/filtro/chofer`);
  }

  getUsersApoyo(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${URL}/user/filtro/apoyo`);
  }

  getChoferxDiasTrabajo(
    fech_ini: string,
    fech_fin: string,
  ): Observable<IUserxDias[]> {
    return this.http.get<IUserxDias[]>(
      `${URL}/user/chofer/fecha/${fech_ini}/${fech_fin}`,
    );
  }

  getApoyoxDiasTrabajo(
    fech_ini: string,
    fech_fin: string,
  ): Observable<IUserxDias[]> {
    return this.http.get<IUserxDias[]>(
      `${URL}/user/apoyo/fecha/${fech_ini}/${fech_fin}`,
    );
  }

  regUser(userData: IUserRegistro) {
    return this.http.post<IUserRegistro>(`${URL}/auth/registro`, userData);
  }

  editarTrabajador(userId: string, trabajador: IUser) {
    return this.http.patch<IUser>(`${URL}/user/${userId}`, trabajador);
  }

  borrarTrabajador(userId: string) {
    return this.http.delete(`${URL}/user/${userId}`);
  }
}

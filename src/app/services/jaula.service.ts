import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IJaula } from '@myapp-interfaces/jaula.interface';
import { environment } from 'environments/environment';

const URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class JaulaService {
  constructor(private readonly http: HttpClient) {}

  getJaula(jaulaId: string): Observable<IJaula> {
    return this.http.get<IJaula>(`${URL}/jaula/${jaulaId}`);
  }

  getJaulas(): Observable<IJaula[]> {
    return this.http.get<IJaula[]>(`${URL}/jaula`);
  }

  registrarJaula(jaulaData: IJaula) {
    return this.http.post<IJaula>(`${URL}/jaula`, jaulaData);
  }

  eliminarJaula(jaulaId: string) {
    return this.http.delete(`${URL}/jaula/${jaulaId}`);
  }
}

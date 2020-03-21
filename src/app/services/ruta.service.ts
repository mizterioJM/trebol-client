import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { IRuta } from '@myapp-interfaces/ruta.interface';

const URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class RutaService {
  constructor(private readonly http: HttpClient) {}

  getRuta(rutaId: string): Observable<IRuta> {
    return this.http.get<IRuta>(`${URL}/ruta/${rutaId}`);
  }

  getRutas(): Observable<IRuta[]> {
    return this.http.get<IRuta[]>(`${URL}/ruta`);
  }

  registrarRuta(rutaData: IRuta) {
    return this.http.post<IRuta>(`${URL}/ruta`, rutaData);
  }

  deleteRuta(rutaId: string) {
    return this.http.delete(`${URL}/ruta/${rutaId}`);
  }
}

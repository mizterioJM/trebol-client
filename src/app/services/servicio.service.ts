import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { IServicio } from '@myapp-interfaces/servicio.interface';

const URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  constructor(private readonly http: HttpClient) {}

  getServicioFecha(date: string) {
    return this.http.get<any>(`${URL}/servicio/fech/${date}`);
  }

  crearRegServicio(registro: IServicio) {
    return this.http.post<IServicio>(`${URL}/servicio`, registro);
  }

  editarServicio(servicioId: string, servicio: IServicio) {
    console.log(servicioId, ' ', servicio);
    return this.http.patch<IServicio>(
      `${URL}/servicio/${servicioId}`,
      servicio,
    );
  }
}

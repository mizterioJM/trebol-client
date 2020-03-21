import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVehicle } from '@myapp-interfaces/vehicle.interface';
import { environment } from 'environments/environment';

const URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class VehiculoService {
  constructor(private readonly http: HttpClient) {}

  getVehicle(vehicleId: string): Observable<IVehicle> {
    return this.http.get<IVehicle>(`${URL}/vehicle/${vehicleId}`);
  }

  getVehicles(): Observable<IVehicle[]> {
    return this.http.get<IVehicle[]>(`${URL}/vehicle`);
  }

  createVehiculo(vehicleData: IVehicle) {
    return this.http.post<IVehicle>(`${URL}/vehicle`, vehicleData);
  }

  deleteVehicle(vehicleId: string) {
    return this.http.delete(`${URL}/vehicle/${vehicleId}`);
  }
}

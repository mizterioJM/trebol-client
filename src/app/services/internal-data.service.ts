import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu } from '@myapp-interfaces/menu.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InternalDataService {
  constructor(private readonly http: HttpClient) {}

  getMenuOpts(): Observable<Menu[]> {
    return this.http.get<Menu[]>('/assets/data/pages.json');
  }

  getMonths() {
    return this.http.get('/assets/data/meses.json');
  }
}
